"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, CheckCircle, AlertTriangle, UploadCloud, Loader2, FileText, Scale, Landmark } from 'lucide-react';

export default function BwgPortal() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{status: 'success'|'failed'|'error', message: string, confidence?: number, pdfBase64?: string} | null>(null);
  const [showPenalty, setShowPenalty] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setShowPenalty(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    
    try {
      const res = await fetch('/api/analyze-waste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ status: 'error', message: 'Connection error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-8 px-4 flex flex-col justify-center min-h-[85vh]">
      <Card className="border-2 border-blue-500/20 shadow-2xl shadow-blue-500/5 bg-card/60 backdrop-blur">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-2">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 flex gap-1 items-center">
              <Scale className="w-3 h-3" /> SC Order 6174/2023 Compliant
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Smart Bin Check-in</CardTitle>
          <CardDescription>Mandatory check for EBWGR Certification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          
          <div className="border-2 border-dashed border-blue-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-blue-500/5 transition-all hover:bg-blue-500/10 group min-h-[200px]">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="Bin" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
            ) : (
              <>
                <Camera className="w-14 h-14 text-blue-500/50 mb-4 group-hover:text-blue-400 transition-colors group-hover:scale-110 duration-300" />
                <p className="text-sm font-semibold text-blue-400">Tap to upload bin photo</p>
                <p className="text-xs text-muted-foreground mt-2">Only 100% dry waste allowed (plastic, paper)</p>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              capture="environment"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleImageUpload}
            />
          </div>

          {result && (
            <div className={`p-4 rounded-xl border flex flex-col gap-3 animate-in slide-in-from-bottom-2 ${result.status === 'success' ? 'bg-green-500/5 border-green-500/30' : result.status === 'error' ? 'bg-orange-500/5 border-orange-500/30' : 'bg-red-500/5 border-red-500/30'}`}>
              <div className="flex items-start gap-3">
                {result.status === 'success' ? (
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className={`w-6 h-6 shrink-0 mt-0.5 ${result.status === 'error' ? 'text-orange-500' : 'text-red-500'}`} />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold ${result.status === 'success' ? 'text-green-400' : result.status === 'error' ? 'text-orange-400' : 'text-red-400'}`}>
                    {result.status === 'success' ? 'EBWGR Certificate Approved' : result.status === 'error' ? 'Analysis Error' : 'Violation Detected'}
                  </h4>
                  <p className={`text-sm mt-1 leading-relaxed ${result.status === 'success' ? 'text-green-300/80' : result.status === 'error' ? 'text-orange-300/80' : 'text-red-300/80'}`}>
                    {result.message} {result.confidence && `(Confidence: ${result.confidence}%)`}
                  </p>
                  
                  {result.status === 'failed' && (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-red-400 font-bold mt-2 underline"
                      onClick={() => setShowPenalty(true)}
                    >
                      View Statutory Penalty Invoice
                    </Button>
                  )}
                </div>
              </div>
              
              {result.status === 'success' && result.pdfBase64 && (
                <a 
                  href={result.pdfBase64} 
                  download="EBWGR_Compliance_Certificate.pdf"
                  className="mt-2 w-full inline-block"
                >
                  <Button variant="outline" className="w-full border-green-500/30 hover:bg-green-500/10 text-green-400">
                    Download Official Certificate
                  </Button>
                </a>
              )}
            </div>
          )}

        </CardContent>
        <CardFooter className="pb-6">
          <Button 
            className="w-full text-base font-semibold h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 rounded-xl" 
            disabled={!image || loading}
            onClick={analyzeImage}
          >
            {loading ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Deep Vision Analysis...</>
            ) : (
              <><UploadCloud className="mr-2 h-5 w-5" /> Submit for Verification</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Statutory Penalty Dialog */}
      <Dialog open={showPenalty} onOpenChange={setShowPenalty}>
        <DialogContent className="sm:max-w-[425px] border-red-500/30 bg-background/95 backdrop-blur shadow-2xl shadow-red-500/10">
          <DialogHeader>
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <Scale className="w-6 h-6" />
              <DialogTitle className="text-xl">Statutory Penalty Invoice</DialogTitle>
            </div>
            <DialogDescription className="text-red-200/60 font-medium">
              Issued under Supreme Court Order 6174/2023 - Bhopal Municipal Corporation
            </DialogDescription>
          </DialogHeader>
          
          <Card className="bg-red-500/5 border-red-500/20 my-4">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-red-500/10 pb-2">
                <span className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Case Ref:</span>
                <span className="font-mono text-red-300">CA 6174/2023-BMC</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Violation Fine</p>
                  <p className="text-3xl font-black text-red-500">₹10,000</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase">Due Date</p>
                  <p className="text-sm font-bold text-red-300">Immediate</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-red-500/10">
                <div className="flex items-start gap-2 text-xs text-red-200/80 leading-relaxed">
                  <Landmark className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <p>
                    Payable to: <span className="font-bold text-white">BMC Environmental Compensation Escrow Account</span>. 
                    Non-payment will lead to immediate cancellation of BWG license.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button className="w-full bg-red-600 hover:bg-red-700 font-bold h-12" onClick={() => setShowPenalty(false)}>
              Acknowledge Violation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
