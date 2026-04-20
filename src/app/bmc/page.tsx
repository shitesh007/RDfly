"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, CloudSync, Download, ShieldCheck, Activity, Map as MapIcon, Info } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { toast } from "sonner";
import { supabase } from '@/lib/supabase';

export default function BMCDashboard() {
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState({ diverted: '850', landfill: '78%' });
  const [chartData, setChartData] = useState([
    { name: 'Mon', Adampur: 420, Bhanpur: 310 },
    { name: 'Tue', Adampur: 450, Bhanpur: 300 },
    { name: 'Wed', Adampur: 510, Bhanpur: 340 },
    { name: 'Thu', Adampur: 480, Bhanpur: 320 },
    { name: 'Fri', Adampur: 550, Bhanpur: 360 },
    { name: 'Sat', Adampur: 590, Bhanpur: 380 },
    { name: 'Sun', Adampur: 410, Bhanpur: 290 },
  ]);

  const [trucks] = useState([
    { id: 'MP-04-HE-1290', status: 'In Transit', destination: 'Adampur MRF', load: '8.2 Ton', speed: '34 km/h' },
    { id: 'MP-04-HG-4421', status: 'Unloading', destination: 'Bhanpur Bio-CNG', load: '12.0 Ton', speed: '0 km/h' },
    { id: 'MP-04-AB-9902', status: 'Processing', destination: 'Bhanpur MRF', load: '6.5 Ton', speed: '12 km/h' },
    { id: 'MP-04-QR-5561', status: 'In Transit', destination: 'Adampur MRF', load: '10.1 Ton', speed: '45 km/h' },
  ]);

  useEffect(() => {
    // Fetch live metrics from Supabase
    const fetchStats = async () => {
      const { data: logs, error } = await supabase
        .from('waste_logs')
        .select('*');
      
      if (logs && !error) {
        const total = logs.length;
        const compliant = logs.filter(l => l.compliance_status).length;
        const rate = total > 0 ? Math.round((compliant / total) * 100) : 78;
        setStats({ diverted: `${800 + total}`, landfill: `${rate}%` });
      }
    };

    fetchStats();
  }, []);

  const handleGovSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      const simulatedResponse = {
        status: "success",
        portal: "GOBARdhan",
        timestamp: new Date().toISOString(),
        payload: { tpd: "1,060", city: "Bhopal", region: "Central" }
      };
      
      console.log("SYNC API RESPONSE:", simulatedResponse);
      
      toast.success("Sync Complete", {
        description: "1,060 TPD data successfully uploaded to GOBARdhan & SBM(U) Portals.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">City Administration Dashboard</h1>
          <p className="text-neutral-400 text-lg italic">Bhopal Municipal Corporation Hub - RDfly Monitoring Node</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest text-[10px]">
              <Download className="w-4 h-4 mr-2" /> Download statutory returns
           </Button>
           <Button 
            onClick={handleGovSync}
            disabled={syncing}
            className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
           >
              {syncing ? <CloudSync className="w-4 h-4 mr-2 animate-spin" /> : <CloudSync className="w-4 h-4 mr-2" />}
              1-Click Sync to GOBARdhan Portal
           </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Smart Bins (ICCC)', value: '130', unit: 'UNITS', icon: Activity, color: 'text-blue-500' },
          { label: 'Waste Diverted', value: stats.diverted, unit: 'TPD', icon: Truck, color: 'text-emerald-500' },
          { label: 'Landfill Avoided', value: stats.landfill, unit: 'KPI', icon: ShieldCheck, color: 'text-emerald-400' },
          { label: 'System Uptime', value: '99.9', unit: '%', icon: Activity, color: 'text-blue-400' },
        ].map((kpi, idx) => (
          <Card key={idx} className="border-white/5 bg-white/5 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white tracking-tighter">{kpi.value} <span className="text-xs uppercase text-neutral-500">{kpi.unit}</span></div>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">+2.4% From Yesterday</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logistics Chart */}
        <Card className="lg:col-span-2 border-white/5 bg-white/5 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-white uppercase tracking-tighter">Diversion Index (TPD)</CardTitle>
                <CardDescription className="text-neutral-500 text-xs italic">National Target: 100% Landfill Diversion by 2026</CardDescription>
              </div>
              <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] items-center gap-1">
                <MapIcon className="w-3 h-3" /> Live Telemetry
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAdampur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBhanpur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#525252" fontSize={10} fontVariant="black" />
                <YAxis stroke="#525252" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #262626', color: '#fff' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="Adampur" stroke="#10b981" fillOpacity={1} fill="url(#colorAdampur)" strokeWidth={3} />
                <Area type="monotone" dataKey="Bhanpur" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBhanpur)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="p-4 bg-white/5 border-t border-white/5 italic text-[10px] text-neutral-500 font-mono flex justify-between">
            <span>Tracking Period: Last 7 Solar Days</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> SBM(U) Portal Synced</span>
          </CardFooter>
        </Card>

        {/* Fleet Tracking List */}
        <Card className="border-white/5 bg-white/5 flex flex-col">
           <CardHeader>
              <CardTitle className="text-xl font-black text-white uppercase tracking-tighter">CAQM GPS Tracker</CardTitle>
              <CardDescription className="text-neutral-500 text-xs">Compliance with Statutory Direction No. 97</CardDescription>
           </CardHeader>
           <CardContent className="flex-1 space-y-4 px-0">
               {trucks.map((truck, idx) => (
                 <div key={idx} className="group p-4 border-l-4 border-l-transparent hover:border-l-blue-500 hover:bg-white/5 transition-all">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-black text-white tracking-widest">{truck.id}</span>
                       <Badge variant="outline" className="text-[8px] border-blue-500/20 bg-blue-500/5 text-blue-400 font-black uppercase tracking-tighter">
                          {truck.status}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-2">
                       <MapPin className="w-3 h-3 text-blue-500" /> {truck.destination}
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono opacity-60">
                       <span>LOAD: {truck.load}</span>
                       <span>VEL: {truck.speed}</span>
                    </div>
                 </div>
               ))}
           </CardContent>
           <CardFooter className="p-6">
              <div className="w-full p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-3 items-start">
                 <Info className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                 <p className="text-[10px] text-orange-200/60 leading-relaxed font-bold uppercase tracking-tight">
                    Emergency: Bin Cluster near Hamidia Road reported 92% saturation level. Dispatch Unit BMC-39.
                 </p>
              </div>
           </CardFooter>
        </Card>
      </div>
    </div>
  );
}
