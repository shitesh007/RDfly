import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { supabase } from '@/lib/supabase';

const HF_MODEL_URL = "https://api-inference.huggingface.co/models/prithivMLmods/Augmented-Waste-Classifier-SigLIP2";

// Helper for checking if waste is strictly dry
function isDryWaste(label: string): boolean {
  const labelLower = label.toLowerCase();
  const dryKeywords = ['plastic', 'paper', 'cardboard', 'metal', 'glass', 'can', 'bottle', 'dry', 'recyclable', 'trash', 'waste'];
  const organicKeywords = ['organic', 'food', 'wet', 'hazardous', 'medical', 'battery', 'biological', 'mixed'];
  
  // If it explicitly contains organic/wet keywords, fail it immediately
  if (organicKeywords.some(kw => labelLower.includes(kw))) {
    return false;
  }
  
  // Otherwise, if it has dry keywords, pass it
  if (dryKeywords.some(kw => labelLower.includes(kw))) {
    return true;
  }
  
  // Default to fail for unknown to be safe (strict 100% dry rule)
  return false;
}

export async function POST(request: Request) {
  try {
    const { imageBase64 } = await request.json();
    
    if (!imageBase64) {
      return NextResponse.json({ status: 'error', message: 'No image provided' }, { status: 400 });
    }

    // Attempt to parse base64
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Make HF API Call
    const hfToken = process.env.HF_ACCESS_TOKEN;
    if (!hfToken) {
      console.warn("HF_ACCESS_TOKEN not set. Running in fallback simulation mode.");
      // Fallback for development if token is missing
      const isSuccess = Math.random() > 0.3;
      return generateResponse(isSuccess, isSuccess ? "plastic (simulated)" : "mixed waste (simulated)", 0.99);
    }

    const response = await fetch(HF_MODEL_URL, {
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/octet-stream",
      },
      method: "POST",
      body: imageBuffer,
    });

    if (!response.ok) {
      console.error("HF API Error:", await response.text());
      return NextResponse.json({ status: 'error', message: 'Error from HF API (Model might be loading)' }, { status: 502 });
    }

    const result = await response.json();
    // Result should be an array of { label: string, score: number }
    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json({ status: 'error', message: 'Invalid response from model' }, { status: 500 });
    }

    const topPrediction = result[0];
    const isSuccess = isDryWaste(topPrediction.label);

    return generateResponse(isSuccess, topPrediction.label, topPrediction.score);

  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ status: 'error', message: 'Internal server error processing image' }, { status: 500 });
  }
}

async function generateResponse(isSuccess: boolean, detectedLabel: string, confidence: number) {
  const confidencePercent = Math.round(confidence * 100);
  const penalty = isSuccess ? 0 : 10000;

  try {
    const { error } = await supabase.from('waste_logs').insert({
      compliance_status: isSuccess,
      detected_label: detectedLabel,
      confidence_score: confidence,
      penalty_amount: penalty,
      tonnage: 0.5, // Mock tonnage for certificate
    });

    if (error) throw error;
  } catch (err) {
    console.error("Supabase Log Error:", err);
  }

  if (isSuccess) {
    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    page.drawText('EBWGR Compliance Certificate', { 
      x: 50, y: 330, size: 28, color: rgb(0.1, 0.4, 0.1), font: helveticaFont 
    });
    
    page.drawText('SC Order 6174/2023 - Bhopal Municipal Corporation', { 
      x: 50, y: 300, size: 14, color: rgb(0.3, 0.3, 0.3), font: helveticaRegular 
    });

    page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 50, y: 250, size: 12 });
    page.drawText(`Status: 100% Segregated Dry Waste`, { x: 50, y: 220, size: 14, color: rgb(0, 0.5, 0) });
    page.drawText(`Confidence: ${confidencePercent}%`, { x: 50, y: 190, size: 12 });
    page.drawText(`Approval: GRANTED`, { x: 50, y: 150, size: 16, font: helveticaFont });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
    
    return NextResponse.json({
      status: 'success',
      confidence: confidencePercent,
      message: '100% Segregated. Approved for EBWGR Certificate.',
      pdfBase64: `data:application/pdf;base64,${pdfBase64}`
    });
  } else {
    return NextResponse.json({
      status: 'failed',
      confidence: confidencePercent,
      message: `Penalty Flagged: Mixed waste detected (${detectedLabel}). Penalty: ₹10,000.`
    });
  }
}
