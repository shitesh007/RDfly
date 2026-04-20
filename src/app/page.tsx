import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ShieldAlert, Cpu, FileCheck, MapPin, BarChart4 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col space-y-24 py-16 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="container mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">
          <Cpu className="w-4 h-4" /> Bhopal&apos;s 1st AI-Driven Circular Economy
        </div>
        <h1 className="text-7xl lg:text-9xl font-black tracking-tighter text-white leading-none">
          RDfly <br />
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Bhopal Eco-OS</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
          The official Smart-Fuel Exchange for the City of Bhopal. 
          Transforming municipal waste into industrial value through AI vision, real-time logistics, and P2P resource trading.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/bwg" className="w-full sm:w-auto">
            <Button className="w-full h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-black font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              Establish Compliance
            </Button>
          </Link>
          <Link href="/guidelines" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full h-14 px-8 border-white/10 hover:bg-white/5 text-white font-bold text-lg transition-all">
              View Statutory Orders
            </Button>
          </Link>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="container mx-auto px-6 space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Operational Roadmap</h2>
          <div className="h-1 w-24 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'AI Scan at Source', icon: Cpu, desc: 'Real-time waste segregation analysis at Bulk Generator points.' },
            { step: '02', title: 'EBWGR Certification', icon: FileCheck, desc: 'Automated legal certification for 100% dry-waste compliance.' },
            { step: '03', title: 'GPS-Tracked Logistics', icon: MapPin, desc: 'Route-optimized transport to Bhanpur or Adampur MRFs.' },
            { step: '04', title: 'Energy Trading', icon: BarChart4, desc: 'Marketplace settlement for RDF, CBG, and Organic Manure.' },
          ].map((item, idx) => (
            <div key={idx} className="relative p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-emerald-500/30 transition-all">
              <div className="absolute top-4 right-4 text-4xl font-black text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors uppercase">{item.step}</div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Crisis & Law Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center rounded-3xl border border-red-500/20 bg-red-500/5 p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-500/10 blur-[100px]" />
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/50 bg-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest">
              <ShieldAlert className="w-3 h-3" /> Mandatory Statutory Warning
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
              Bhopal&apos;s Landfill Crisis <br />
              <span className="text-red-500 italic uppercase">SC Order 6174/2023</span>
            </h2>
            <div className="space-y-4 text-lg text-neutral-300 leading-relaxed">
              <p>
                Bhopal generates <span className="font-bold text-white underline decoration-red-500/50">1,060 TPD</span> of municipal solid waste daily. The Adampur Chhawni landfill is reaching critical capacity.
              </p>
              <p>
                Supreme Court Order 6174/2023 mandates **4-Stream Waste Segregation** (Wet, Dry, Sanitary, Special Care) for all BWGs effective from <span className="font-bold text-white">01.04.2026</span>.
              </p>
            </div>
          </div>
          <div className="grid gap-4 relative z-10">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-black text-red-500 uppercase">Daily Waste Tonnage</span>
                <p className="text-4xl font-black text-white font-mono tracking-tighter">1,060 <span className="text-lg">TPD</span></p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-black text-red-500 uppercase">Segregation Mandate</span>
                <p className="text-xl font-bold text-white">4-Stream (WDSC) Compliance</p>
                <Link href="/guidelines" className="text-xs text-red-400 font-bold hover:underline flex items-center gap-1">Read SWM Rules 2026 <ArrowRight className="w-3 h-3" /></Link>
             </div>
          </div>
        </div>
      </section>

      {/* Gateways */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/bwg" className="group">
            <Card className="h-full border-white/5 bg-white/5 hover:border-emerald-500/30 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
                  BWG Portal <ArrowRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-2 transition-transform" />
                </CardTitle>
                <CardDescription className="text-neutral-400 italic">For Hotels, Malls & Societies</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-sm text-neutral-400 leading-relaxed">Establish AI-verified compliance and generate legal EBWGR returns for your facility.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/bmc" className="group">
            <Card className="h-full border-white/5 bg-white/5 hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
                  Logistics Dash <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-2 transition-transform" />
                </CardTitle>
                <CardDescription className="text-neutral-400 italic">For Municipal Authorities</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-sm text-neutral-400 leading-relaxed">Observe city-wide fleet telemetry, smart bin saturation, and landfill diversion KPIs.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/marketplace" className="group">
            <Card className="h-full border-white/5 bg-white/5 hover:border-orange-500/30 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
                  Marketplace <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-2 transition-transform" />
                </CardTitle>
                <CardDescription className="text-neutral-400 italic">For Power Plants & MRFs</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-sm text-neutral-400 leading-relaxed">Procure certified RDF, CBG, and Organic Manure with transparent P2P settlement.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="container mx-auto px-6 border-t border-white/5 pt-12 pb-24 text-center space-y-4">
        <div className="text-2xl font-black tracking-tighter text-white">RDfly</div>
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-500">RDfly: Bhopal&apos;s Smart-Fuel Exchange Hub</p>
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest">Aida Development Node | 2026 Build Phase</p>
      </footer>
    </div>
  );
}
