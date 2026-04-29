import React from 'react';

interface ReportProps {
  type: 'success' | 'fail';
  data: {
    detectedClass: string;
    confidence: number;
    timestamp: string;
    tonnage: number;
    imageId?: string;
    snapshot?: string;
  };
}

export const ReportTemplate: React.FC<ReportProps> = ({ type, data }) => {
  const isSuccess = type === 'success';
  const accentColor = isSuccess ? 'border-emerald-500' : 'border-red-500';
  const textColor = isSuccess ? 'text-emerald-700' : 'text-red-700';
  const bgColor = isSuccess ? 'bg-emerald-50' : 'bg-red-50';

  return (
    <div 
      id="report-pdf-template" 
      className={`w-[800px] p-12 bg-white relative overflow-hidden flex flex-col font-sans ${accentColor} border-[20px]`}
    >
      {/* Header Branding */}
      <div className="flex justify-between items-start mb-10 pb-6 border-b border-neutral-100">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            <span className="text-neutral-900">RDfly</span>
            <span className="text-emerald-600"> Eco-OS</span>
          </h1>
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">
            Bhopal Municipal Corporation | Smart-Fuel Exchange Node
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Document ID</p>
          <p className="text-sm font-mono text-neutral-900 font-bold">
            {isSuccess ? 'EBWGR' : 'PENALTY'}-{Math.random().toString(36).substring(7).toUpperCase()}
          </p>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-12">
        <h2 className={`text-5xl font-black uppercase tracking-tighter ${textColor}`}>
          {isSuccess ? 'Compliance Certificate' : 'Statutory Penalty Invoice'}
        </h2>
        <p className="text-neutral-500 text-sm italic mt-2">
            {isSuccess 
                ? 'Verified Segregated Resource Validation' 
                : 'Violation of Municipal Solid Waste Management Directives'}
        </p>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
            <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Inspection Metadata</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Detected Class:</span>
                <span className="font-bold text-neutral-900 uppercase">{data.detectedClass}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">AI Confidence:</span>
                <span className="font-bold text-neutral-900">{data.confidence}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Timestamp:</span>
                <span className="font-mono text-neutral-900">{data.timestamp}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Estimated Load:</span>
                <span className="font-bold text-neutral-900">{data.tonnage} MT</span>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border ${accentColor} ${bgColor} relative overflow-hidden`}>
            <h3 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${textColor}`}>Official Status</h3>
            <p className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
               {isSuccess ? 'EBWGR CERTIFIED' : 'PENALTY LEVIED'}
            </p>
            {isSuccess ? (
              <p className="text-xs text-emerald-800/70 mt-2 font-medium">
                Issued under the Solid Waste Management Rules, 2026 for verified 4-stream segregation.
              </p>
            ) : (
              <p className="text-xs text-red-800/70 mt-2 font-medium">
                ₹10,000 fine levied to the Environmental Compensation Escrow Account under Supreme Court Order 6174/2023.
              </p>
            )}
          </div>
        </div>

        {/* Evidence Snapshot */}
        <div className="flex flex-col">
            <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Evidence Snapshot</h3>
            <div className="flex-1 rounded-2xl bg-neutral-900 overflow-hidden border border-neutral-800 relative">
                {data.snapshot ? (
                  <img src={data.snapshot} alt="Waste Snapshot" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-[10px]">NO_IMAGE_DATA</div>
                )}
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-[8px] text-white font-mono rounded">AI_LAYER_VISUALIZED</div>
            </div>
        </div>
      </div>

      {/* Footer Legal */}
      <div className="mt-auto pt-10 border-t border-neutral-100 flex justify-between items-end">
        <div className="max-w-[400px]">
           <p className="text-[8px] text-neutral-400 uppercase font-black leading-normal tracking-wider">
             Statutory Note: This document is digitally signed by the RDfly Eco-OS Protocol Layer. 
             Fraudulent use or tampering is a punishable offense under the Information Technology Act. 
             The AI model prithivMLmods/Augmented-Waste-Classifier-SigLIP2 has 92.9M parameters at 98.4% validation accuracy.
           </p>
        </div>
        <div className="flex flex-col items-end">
            {/* Mock QR Code */}
            <div className="w-20 h-20 border-4 border-neutral-100 p-1 mb-2">
                <div className="w-full h-full bg-neutral-900 flex flex-wrap gap-1 p-1">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-20'}`} />
                    ))}
                </div>
            </div>
            <p className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest">Digital Authentication Seal</p>
        </div>
      </div>

      {/* Accents */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${isSuccess ? 'bg-emerald-500/5' : 'bg-red-500/5'} -mr-16 -mt-16 rounded-full`} />
    </div>
  );
};
