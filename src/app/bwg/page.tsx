"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cpu, ShieldCheck, Scale, FileCheck, Camera, XCircle, CheckCircle2, History } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BWGCompliance() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'fail' | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCert, setShowCert] = useState(false);

  const startScan = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setScanning(false);
      // Simulate result (50/50 for demo)
      // Simulate result
      setScanResult('success');
    }, 2500);
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Compliance Terminal</h1>
          <p className="text-neutral-400 text-lg">AI-Driven Segregation Analysis for Bulk Waste Generators</p>
        </div>
        <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-bold px-4 py-1 uppercase tracking-widest text-[10px]">
          <Scale className="w-3 h-3 mr-2" /> SC Order 6174/2023 Enforcement
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Scanner Section */}
        <Card className="lg:col-span-2 border-white/5 bg-white/5 overflow-hidden relative">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-500" /> Live Feed: Binary Bin Analysis
            </CardTitle>
            <CardDescription className="text-neutral-500 italic font-mono text-[10px]">MODEL: PRITHIVMLMODS/AUGMENTED-WASTE-CLASSIFIER-SIGLIP2</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex flex-col items-center justify-center relative bg-black/40 border-y border-white/5">
            {scanning ? (
              <div className="space-y-6 w-full max-w-sm text-center">
                <div className="relative h-64 w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                   <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-scan" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="w-12 h-12 text-emerald-500 animate-pulse" />
                   </div>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-xs text-emerald-500 tracking-[0.2em] font-black animate-pulse uppercase">Reading Spectral Signatures...</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Analysis Depth: 12-Layer Contrastive Learning</p>
                </div>
              </div>
            ) : scanResult === 'success' ? (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-emerald-400 uppercase tracking-widest">Segregation Passed</h3>
                  <p className="text-sm text-neutral-400">Moisture Index: 4.2% | Contaminants: 0.1%</p>
                </div>
                <Button onClick={() => setShowCert(true)} className="bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase tracking-widest text-xs px-8 h-10 shadow-lg">Generate EBWGR Cert</Button>
              </div>
            ) : scanResult === 'fail' ? (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-red-500 uppercase tracking-widest">Segregation Failed</h3>
                  <p className="text-sm text-neutral-400 font-mono">Found: Sanitary Waste in Dry Stream (Violation 4.1)</p>
                </div>
                <Button onClick={() => setShowInvoice(true)} className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs px-8 h-10 shadow-lg">View Statutory Invoice</Button>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div className="w-48 h-48 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 transition-all">
                  <Cpu className="w-16 h-16 text-neutral-700" />
                </div>
                <Button onClick={startScan} className="h-12 px-10 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-neutral-200 shadow-xl transition-all">
                  <Camera className="w-4 h-4 mr-2" /> Start AI Scan
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 bg-white/5 flex justify-between items-center font-mono text-[10px] text-neutral-500">
            <span>Terminal: RD-BHO-019</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> AI CORE ONLINE</span>
          </CardFooter>
        </Card>

        {/* Side Info Panel */}
        <div className="space-y-6">
          <Card className="border-white/5 bg-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest">Facility Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-white/5">
                  <span className="text-[10px] text-neutral-500 uppercase font-black">Entity</span>
                  <span className="text-xs font-bold text-white">Jehan Numa Retreat, Bhopal</span>
               </div>
               <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-white/5 text-emerald-400">
                  <span className="text-[10px] text-neutral-500 uppercase font-black">Compliance Score</span>
                  <span className="text-xs font-black">94.2%</span>
               </div>
               <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-white/5">
                  <span className="text-[10px] text-neutral-500 uppercase font-black">Last Sync</span>
                  <span className="text-xs font-mono text-neutral-300">2026-04-20 18:30</span>
               </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardHeader>
               <CardTitle className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                 <History className="w-4 h-4" /> Compliance History
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               {[
                 { date: '19 Apr', status: 'PASS', tonnage: '1.2T' },
                 { date: '18 Apr', status: 'PASS', tonnage: '1.4T' },
                 { date: '17 Apr', status: 'PASS', tonnage: '1.1T' },
               ].map((log, i) => (
                 <div key={i} className="flex justify-between items-center text-[11px] py-1 border-b border-white/5 last:border-0 opacity-70">
                    <span className="font-mono text-neutral-400 uppercase tracking-tighter">{log.date}</span>
                    <span className="font-black text-emerald-500">EBWGR-CERT-OK</span>
                    <span className="font-mono text-white">{log.tonnage}</span>
                 </div>
               ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Penalty Invoice Modal */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-md bg-black border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <DialogHeader className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Scale className="w-6 h-6 text-red-500" />
            </div>
            <DialogTitle className="text-3xl font-black text-white uppercase tracking-tighter">Statutory Penalty Invoice</DialogTitle>
            <DialogDescription className="text-red-500/80 font-bold text-xs uppercase tracking-widest">Violation ID: BHO/SWM/2026/0402</DialogDescription>
          </DialogHeader>
          <div className="py-8 space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
               <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-black">Base Fine Amount</p>
                  <p className="text-5xl font-black text-white tracking-tighter">₹10,000</p>
               </div>
               <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase tracking-widest text-[10px] h-6">SC Order 6174/2023</Badge>
            </div>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
               <p className="text-xs text-red-200/80 leading-relaxed italic">
                "Penalty generated and credited to BMC Environmental Compensation Escrow Account under statutory mandates for failed 4-stream waste segregation."
               </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs h-12 shadow-lg shadow-red-500/20">Acknowledge & Settle via GST Portal</Button>
            <Button variant="ghost" className="w-full text-neutral-500 hover:text-white" onClick={() => setShowInvoice(false)}>Download PDF Report</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* EBWGR Certificate Modal */}
      <Dialog open={showCert} onOpenChange={setShowCert}>
        <DialogContent className="max-w-md bg-black border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <DialogHeader className="space-y-4">
             <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-emerald-500" />
             </div>
             <DialogTitle className="text-3xl font-black text-white uppercase tracking-tighter">EBWGR Final Return</DialogTitle>
             <DialogDescription className="text-emerald-500/80 font-bold text-xs uppercase tracking-widest">Certification Ref: CERT-BHO-26491</DialogDescription>
          </DialogHeader>
          <div className="py-8 space-y-6">
             <div className="space-y-8">
                <div className="text-center py-6 px-4 border-2 border-emerald-500/30 border-dashed rounded-3xl bg-emerald-500/5 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 -mr-12 -mt-12 rounded-full border border-emerald-500/20" />
                   <p className="text-[10px] text-emerald-500 uppercase font-black mb-2 tracking-[0.4em]">Environmental Status</p>
                   <p className="text-4xl font-black text-white tracking-widest">CERTIFIED</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                   <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                      <p className="text-[8px] text-neutral-500 uppercase font-black">Carbon Avoided</p>
                      <p className="text-xl font-bold text-white">4.2 Kg</p>
                   </div>
                   <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                      <p className="text-[8px] text-neutral-500 uppercase font-black">Tax Rebate Cr</p>
                      <p className="text-xl font-bold text-white">₹245</p>
                   </div>
                </div>
             </div>
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase tracking-widest text-xs h-12 shadow-lg shadow-emerald-500/20" onClick={() => setShowCert(false)}>Download Official EBWGR Cert</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
