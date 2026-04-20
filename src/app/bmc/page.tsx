"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getBins, Bin } from '@/lib/mock-db';
import { ArrowRight, Truck, TrendingUp, TrendingDown, Building2, Map, Globe, RefreshCw, Navigation, Navigation2, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { toast } from 'sonner';

const chartData = [
  { day: 'Mon', diverted: 45 },
  { day: 'Tue', diverted: 62 },
  { day: 'Wed', diverted: 90 },
  { day: 'Thu', diverted: 110 },
  { day: 'Fri', diverted: 130 },
  { day: 'Sat', diverted: 138 },
  { day: 'Sun', diverted: 142 },
];

const activeTrucks = [
  { id: 'MP04-AB-1234', load: '4 Tonnes', destination: 'Bhanpur MRF', route: 'MP Nagar -> Bhanpur' },
  { id: 'MP04-CD-5678', load: '3.2 Tonnes', destination: 'Adampur Plant', route: 'Arera Colony -> Adampur' },
  { id: 'MP04-GH-9012', load: '5 Tonnes', destination: 'Bhanpur MRF', route: 'New Market -> Bhanpur' },
];

export default function BmcDashboard() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBins();
      setBins(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleGovSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      toast.success("Sync Successful", {
        description: "Daily returns successfully synced with GOBARdhan Portal & SBM(U) Centralised Portal.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 pt-6 pb-12 animate-in fade-in duration-500 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-500">BMC Logistics Hub</h1>
          <p className="text-muted-foreground text-lg">City-wide overview of AI smart bins and national portal compliance.</p>
        </div>
        <Button 
          onClick={handleGovSync}
          disabled={syncing}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 h-12 px-6 font-bold flex gap-2"
        >
          {syncing ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Globe className="w-5 h-5" />
          )}
          {syncing ? 'Syncing to National Portals...' : 'Sync to National Govt Portals'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recharts Component Card */}
        <Card className="bg-emerald-950/10 backdrop-blur border-emerald-500/20 shadow-lg md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">Daily Waste Diverted</CardTitle>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent className="h-32 px-2 relative overflow-visible">
             <div className="text-3xl font-black text-emerald-400 absolute ml-4 z-10 top-0">142<span className="text-xl text-emerald-400/70 ml-1">TPD</span></div>
             <p className="text-xs text-muted-foreground ml-4 absolute z-10 top-10 font-medium">Target: 850 TPD</p>
             <div className="absolute inset-x-0 bottom-0 top-14">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <Line type="monotone" dataKey="diverted" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} />
                    <Tooltip cursor={false} contentStyle={{ backgroundColor: '#064e3b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                  </LineChart>
               </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        {/* KPI: Active Smart Bins */}
        <Card className="bg-blue-950/10 backdrop-blur border-blue-500/20 shadow-lg shadow-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Active Smart Bins</CardTitle>
            <Building2 className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-blue-400">150 <span className="text-lg text-blue-400/50">/ 2000</span></div>
            <p className="text-sm text-blue-300 mt-2 font-medium flex items-center gap-1">
              <span className="text-green-400">↑ Phase 1</span> implementation active
            </p>
          </CardContent>
        </Card>

        {/* KPI: Transport Distance Saved */}
        <Card className="bg-orange-950/10 backdrop-blur border-orange-500/20 shadow-lg shadow-orange-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Distance Saved via AI</CardTitle>
            <Map className="h-5 w-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-orange-400">22,000<span className="text-xl text-orange-400/70 ml-1">km</span></div>
            <p className="text-sm text-muted-foreground mt-2 font-medium flex items-center gap-1">
               <TrendingDown className="w-4 h-4 text-green-400" /> <span className="text-green-400">Daily</span> reduction in fuel cost
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Telemetry Table */}
        <Card className="border-emerald-500/20 shadow-xl bg-card/40 backdrop-blur lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Live Bin Telemetry</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-3">
                  <div className="h-10 bg-muted/60 rounded w-full"></div>
                  <div className="h-10 bg-muted/60 rounded w-full"></div>
                  <div className="h-10 bg-muted/60 rounded w-full"></div>
              </div>
            ) : (
              <div className="rounded-md border border-muted/50 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bins.slice(0, 5).map((bin) => (
                      <TableRow key={bin.id} className="border-b-muted/30 hover:bg-muted/10 transition-colors">
                        <TableCell className="font-semibold text-xs md:text-sm">{bin.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${bin.fillLevel > 80 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                            {bin.fillLevel}%
                          </span>
                        </TableCell>
                        <TableCell>
                          {bin.isVerifiedDryWaste ? (
                            <Badge className="bg-blue-500/10 text-blue-400 text-[10px] border-blue-500/30">Dry</Badge>
                          ) : (
                            <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 text-[10px]">Mixed</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CAQM GPS Tracking Simulation */}
        <Card className="border-blue-500/20 shadow-xl bg-blue-950/5 backdrop-blur">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Navigation2 className="w-5 h-5 text-blue-400" /> Logistics
              </CardTitle>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-2 py-0">CAQM Compliant</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTrucks.map((truck, idx) => (
              <div key={truck.id} className="relative p-3 rounded-xl border border-blue-500/10 bg-blue-500/5 flex flex-col gap-2 overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500"></div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-100">
                    <Truck className="w-4 h-4 text-blue-400" /> {truck.id}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-tighter">GPS: Active</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                   <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                     <CheckCircle2 className="w-3 h-3 text-blue-400/50" /> {truck.load} Dry Waste
                   </p>
                   <p className="text-[11px] text-blue-200/80 font-medium">Dest: {truck.destination}</p>
                </div>
                <div className="mt-1 h-0.5 w-full bg-blue-500/10 rounded-full relative overflow-hidden">
                   <div className="absolute h-full bg-blue-500 left-[-100%] w-full animate-progress-slide"></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
