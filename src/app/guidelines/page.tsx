"use client";

import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Gavel, Scale, AlertCircle, Download, Bookmark, Landmark, ShieldCheck } from 'lucide-react';

const policies = [
  {
    id: 'POL-01',
    title: 'Solid Waste Management Rules 2026',
    desc: 'Statutory updates for decentralized waste management and zero-landfill mandates.',
    ref: 'SWM-2026-BHO',
    color: 'border-emerald-500/20 bg-emerald-500/5',
    iconColor: 'text-emerald-500'
  },
  {
    id: 'POL-02',
    title: 'Supreme Court Order 6174/2023',
    desc: 'Mandatory 4-stream segregation and EBWGR certification for all bulk generators.',
    ref: 'SC-6174-ORDER',
    color: 'border-red-500/20 bg-red-500/5',
    iconColor: 'text-red-500'
  },
  {
    id: 'POL-03',
    title: 'SBM Urban Advisory (July 2025)',
    desc: 'Guidelines for setting up decentralized CBG plants with Satat integration.',
    ref: 'SBMU-ADV-07',
    color: 'border-blue-500/20 bg-blue-500/5',
    iconColor: 'text-blue-400'
  },
  {
    id: 'POL-04',
    title: '5% Biomass Co-firing Policy',
    desc: 'Ministry of Power directive for RDF inclusion in thermal energy mix.',
    ref: 'MOP-CO-FIRE-05',
    color: 'border-orange-500/20 bg-orange-500/5',
    iconColor: 'text-orange-500'
  }
];

export default function KnowledgeHub() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] px-6 py-1">
          Policy & Knowledge Node
        </Badge>
        <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">The RDfly Registry</h1>
        <p className="text-neutral-400 text-lg leading-relaxed italic">
          Access the statutory legal framework, government advisories, and technical standards defining Bhopal&apos;s circular economy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies.map((policy) => (
          <Card key={policy.id} className={`group border transition-all hover:scale-[1.01] ${policy.color}`}>
            <CardHeader className="p-8">
              <div className="flex justify-between items-start mb-6">
                 <div className={`w-12 h-12 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center ${policy.iconColor} group-hover:scale-110 transition-transform`}>
                    <FileText className="w-6 h-6" />
                 </div>
                 <Badge variant="outline" className="text-[8px] font-mono border-white/10 text-neutral-500 uppercase tracking-widest">{policy.ref}</Badge>
              </div>
              <CardTitle className="text-2xl font-black text-white tracking-tighter uppercase mb-4 leading-tight">{policy.title}</CardTitle>
              <CardDescription className="text-neutral-400 leading-relaxed font-medium italic">
                {policy.desc}
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-8 pt-0 flex gap-2">
               <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white font-bold uppercase tracking-widest text-[10px] h-10 transition-all">
                  <Download className="w-3 h-3 mr-2" /> PDF Gazette
               </Button>
               <Button variant="ghost" className="h-10 w-10 p-0 border border-white/5 hover:bg-white/5 text-neutral-500 hover:text-white">
                  <Bookmark className="w-4 h-4" />
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Compliance Standard Detail Section */}
      <section className="rounded-3xl border border-white/5 bg-white/5 p-8 lg:p-12 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Scale className="w-32 h-32 text-white" />
        </div>
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Technical Specification Index
           </div>
           <h2 className="text-3xl font-black text-white tracking-tighter uppercase">National SWM Standards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
           <div className="space-y-4">
              <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest border-b border-blue-500/20 pb-2 flex items-center gap-2">
                 <Landmark className="w-3 h-3" /> CAQM MOISTURE CTR
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed italic">
                 All RDF material listings must maintain a minimum calorific value of **2,500 kcal/kg** with {'<'}15% moisture index as per CAQM Direction 97.
              </p>
           </div>
           <div className="space-y-4">
              <h3 className="text-xs font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-500/20 pb-2 flex items-center gap-2">
                 <Gavel className="w-3 h-3" /> SEGREGATION DEPTH
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed italic">
                 Mandatory Binary Segregation (Dry/Wet) verified daily via spectral analysis or visual confirmation at node entry points.
              </p>
           </div>
           <div className="space-y-4">
              <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest border-b border-orange-500/20 pb-2 flex items-center gap-2">
                 <AlertCircle className="w-3 h-3" /> PENALTY ESCROW
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed italic">
                 Funds collected via SC-6174 violations are auto-settled to the Municipal Green Fund for waste-to-energy upgradation.
              </p>
           </div>
        </div>
      </section>

      <div className="flex justify-center italic text-neutral-600 text-[10px] font-mono tracking-tighter uppercase">
         Last Index Update: 2026-04-21 00:01 // RD-HUB-BHO-POLICY-V4
      </div>
    </div>
  );
}
