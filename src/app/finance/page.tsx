"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, IndianRupee, Leaf, Info, PieChart, TrendingUp, ShieldCheck, Landmark } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Cell as ReCell,
} from 'recharts';

const capexData = [
  { name: 'Core Setup', value: 32.40 },
  { name: 'Upgradations', value: 8.00 },
];

const revenueProjections = [
  { year: '2026', revenue: 12.4 },
  { year: '2027', revenue: 18.2 },
  { year: '2028', revenue: 24.5 },
  { year: '2029', revenue: 31.8 },
  { year: '2030', revenue: 42.0 },
];

const COLORS = ['#10b981', '#3b82f6'];

export default function ProjectFinance() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Project Finance & Carbon</h1>
          <p className="text-neutral-400 text-lg">Detailed Plant Economics & GHG Offset Registry</p>
        </div>
        <div className="flex gap-4">
           <Card className="px-6 py-4 bg-emerald-500/10 border-emerald-500/20 text-center">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">GHG Emissions Avoided</p>
              <p className="text-2xl font-black text-white tracking-tighter font-mono">1,70,000 <span className="text-xs">tCO2e</span></p>
              <p className="text-[8px] text-neutral-500 font-bold uppercase mt-1">Ref: Indore Municipality Model</p>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Plant CAPEX Section */}
        <Card className="lg:col-span-2 border-white/5 bg-white/5 overflow-hidden">
           <CardHeader>
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <CardTitle className="text-xl font-black text-white uppercase tracking-tighter">100 TPD CBG Plant CAPEX</CardTitle>
                    <CardDescription className="text-xs text-neutral-500">Total Project Cost: ₹40.40 Crore</CardDescription>
                 </div>
                 <Badge variant="outline" className="border-blue-500/30 text-blue-400 font-black tracking-widest text-[10px]">
                    <Landmark className="w-3 h-3 mr-2" /> SATAT LOI ISSUED
                 </Badge>
              </div>
           </CardHeader>
           <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
                 <div className="relative">
                    <ResponsiveContainer width="100%" height="100%">
                       <RePieChart>
                          <Pie
                             data={capexData}
                             cx="50%"
                             cy="50%"
                             innerRadius={60}
                             outerRadius={80}
                             fill="#8884d8"
                             paddingAngle={5}
                             dataKey="value"
                             stroke="none"
                          >
                             {capexData.map((entry, index) => (
                                <ReCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                          </Pie>
                          <RechartsTooltip 
                             contentStyle={{ backgroundColor: '#000', border: '1px solid #262626', color: '#fff' }}
                             itemStyle={{ fontSize: '10px' }}
                          />
                       </RePieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <p className="text-[8px] font-black text-neutral-500 uppercase">Total</p>
                       <p className="text-xl font-black text-white tracking-tighter">₹40.4Cr</p>
                    </div>
                 </div>
                 <div className="space-y-4 flex flex-col justify-center">
                    <div className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-1">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-emerald-500 uppercase font-mono">Main Installation</span>
                          <span className="text-xs font-bold text-white">₹32.40 Cr</span>
                       </div>
                       <p className="text-[10px] text-neutral-600 leading-relaxed italic">Biogas digesters, pre-treatment units & civil construction.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-1">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-blue-500 uppercase font-mono">Upgradations</span>
                          <span className="text-xs font-bold text-white">₹8.00 Cr</span>
                       </div>
                       <p className="text-[10px] text-neutral-600 leading-relaxed italic">High-pressure compression (250 bar) & CO2 scrubbing.</p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { label: 'Plant Life', val: '20 Yrs' },
                   { label: 'ROI Term', val: '6.2 Yrs' },
                   { label: 'Govt Subsidy', val: '₹4.0 Cr' },
                 ].map((stat, i) => (
                   <div key={i} className="p-4 rounded-xl border border-white/5 bg-black/40 text-center">
                      <p className="text-[8px] font-black text-neutral-500 uppercase font-mono mb-1">{stat.label}</p>
                      <p className="text-lg font-black text-white tracking-tighter">{stat.val}</p>
                   </div>
                 ))}
              </div>
           </CardContent>
        </Card>

        {/* Projections Sidebar */}
        <div className="space-y-6">
           <Card className="border-white/5 bg-white/5 overflow-hidden">
              <CardHeader>
                 <CardTitle className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Revenue (₹ Cr)
                 </CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueProjections}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                       <XAxis dataKey="year" stroke="#525252" fontSize={8} />
                       <YAxis stroke="#525252" fontSize={8} />
                       <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #262626', color: '#fff' }}
                          itemStyle={{ fontSize: '10px' }}
                       />
                       <Bar dataKey="revenue" fill="#10b981" radius={[2, 2, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </CardContent>
           </Card>

           <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardHeader>
                 <CardTitle className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                    <Leaf className="w-4 h-4" /> Carbon Credit Alpha
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <p className="text-xs text-neutral-400 leading-relaxed">
                   "Registering the plant under **Verra (VCS)** or **Gold Standard** can generate additional revenue of approx. **₹1.2 Cr/Year** through carbon certificate trading."
                 </p>
                 <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-[8px] text-neutral-500 uppercase font-black tracking-widest">Market Status</span>
                       <Badge className="text-[8px] h-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 uppercase tracking-[0.2em]">Bullish</Badge>
                    </div>
                    <p className="text-lg font-black text-white tracking-widest font-mono italic">RD-OFF-BHO-01</p>
                 </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                 <div className="w-full h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[65%] animate-pulse" />
                 </div>
              </CardFooter>
           </Card>
        </div>
      </div>
    </div>
  );
}
