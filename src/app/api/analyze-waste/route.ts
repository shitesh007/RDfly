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
    const { imageBase64, fileName } = await request.json();
    
    if (!imageBase64) {
      return NextResponse.json({ status: 'error', message: 'No image provided' }, { status: 400 });
    }

    // --- FILENAME FAILSAFE (PLAN B) ---
    if (fileName) {
      const nameLower = fileName.toLowerCase();
      if (nameLower.includes('demo-pass')) {
        console.log("FAILSAFE: demo-pass detected. Forcing success.");
        return generateResponse(true, "Validated Plastic (Demo)", 0.99);
      }
      if (nameLower.includes('demo-fail')) {
        console.log("FAILSAFE: demo-fail detected. Forcing penalty.");
        return generateResponse(false, "Mixed Organic Waste (Demo)", 0.99);
      }
    }

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const hfToken = process.env.HF_ACCESS_TOKEN;

    let isSuccess = false;
    let finalLabel = "Unknown";
    let finalScore = 0;

    if (hfToken) {
      try {
        const response = await fetch(HF_MODEL_URL, {
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/octet-stream",
          },
          method: "POST",
          body: imageBuffer,
        });

        if (response.ok) {
          const result = await response.json();
          if (Array.isArray(result) && result.length > 0) {
            const topPrediction = result[0];
            console.log("HF Model Result:", topPrediction);
            
            finalLabel = topPrediction.label;
            finalScore = topPrediction.score;
            isSuccess = isDryWaste(finalLabel);
          }
        } else {
           console.log("HF API Error. response not ok.");
        }
      } catch (err) {
        console.log("HF Fetch failed.", err);
      }
    }

    return generateResponse(isSuccess, finalLabel, finalScore);

  } catch (error) {
    console.error("Analysis Error:", error);
    return generateResponse(false, "System Error (Mixed)", 0.5);
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
      user_id: "00000000-0000-0000-0000-000000000000" // Hardcoded for demo node
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
    // Generate Penalty PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    page.drawText('STATUTORY PENALTY INVOICE', { 
      x: 50, y: 330, size: 28, color: rgb(0.8, 0.1, 0.1), font: helveticaFont 
    });
    
    page.drawText('SC Order 6174/2023 Enforcement', { x: 50, y: 300, size: 14, color: rgb(0.3, 0.3, 0.3) });
    page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 50, y: 250, size: 12 });
    page.drawText(`Violation: Mixed waste detected in dry stream`, { x: 50, y: 220, size: 14, color: rgb(0.5, 0, 0) });
    page.drawText(`Penalty Amount: INR 10,000`, { x: 50, y: 190, size: 16, font: helveticaFont });
    page.drawText(`Status: DUE`, { x: 50, y: 150, size: 16, color: rgb(0.8, 0.1, 0.1) });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return NextResponse.json({
      status: 'failed',
      confidence: confidencePercent,
      message: `Penalty Flagged: Mixed waste detected (${detectedLabel}). Penalty: ₹10,000.`,
      pdfBase64: `data:application/pdf;base64,${pdfBase64}`
    });
  }
}
