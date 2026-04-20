"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Cpu, ArrowRight, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Mock credentials for the Hackathon Demo
// In a real app, these would be in the Supabase Users table
const DEMO_USERS = [
  { email: 'bwg@rdfly.in', role: 'BWG_ENTITY', redirect: '/bwg', label: 'Bulk Generator Node' },
  { email: 'bmc@rdfly.in', role: 'BMC_ADMIN', redirect: '/bmc', label: 'Municipal Control' },
  { email: 'buyer@rdfly.in', role: 'MRF_BUYER', redirect: '/marketplace', label: 'Industrial Buyer' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For Demo: Use the DEMO_USERS logic if creds match
      const demoUser = DEMO_USERS.find(u => u.email === email);
      
      if (demoUser) {
        // Log in to Supabase (simulated sign-in for the demo dashboard)
        // In reality, you'd use supabase.auth.signInWithPassword()
        // For Demo: Set RBAC Cookie
        document.cookie = `rdfly_role=${demoUser.role}; path=/; max-age=3600`;

        toast.success(`Welcome back, ${demoUser.label}`, {
          description: `Authorized as ${demoUser.role}. Redirecting to system node...`
        });
        
        // Small delay for effect
        setTimeout(() => {
          router.push(demoUser.redirect);
        }, 1500);
      } else {
        toast.error("Access Denied", {
          description: "Invalid credentials for RDfly Eco-OS Node."
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Auth Fail", {
        description: "Could not connect to Supabase Auth Gateway."
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">
            <Lock className="w-3 h-3" /> Secure Gateway Alpha
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">RDfly Eco-OS</h1>
          <p className="text-neutral-500 text-sm italic font-medium uppercase tracking-widest">Authorized Access Only</p>
        </div>

        <Card className="border-white/5 bg-black/40 backdrop-blur-xl border-2 hover:border-emerald-500/20 transition-all shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-black text-white uppercase tracking-tighter">Identity Sync</CardTitle>
            <CardDescription className="text-neutral-500 text-xs">Verify your credentials to access the Bhopal Hub.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Digital ID (Email)</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
                  <Input 
                    placeholder="name@rdfly.in" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-black/40 border-white/5 text-white h-12 focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Access Key (Password)</Label>
                <Lock className="absolute left-3 top-[103px] w-4 h-4 text-emerald-500/50 hidden" /> {/* Structural note */}
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/40 border-white/5 text-white h-12 focus:border-emerald-500/50 transition-all font-mono"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/10 transition-all active:scale-95"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                Decrypt & Connect
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-white/5 p-6 bg-white/5">
             <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-tighter">
                Demo Accounts (Hackathon Shortcut)
             </div>
             <div className="grid grid-cols-1 gap-2 w-full">
                {DEMO_USERS.map((user) => (
                  <button 
                    key={user.role} 
                    onClick={() => { setEmail(user.email); setPassword('password123'); }}
                    className="flex items-center justify-between p-2 rounded-lg border border-white/5 bg-black/40 hover:bg-white/5 text-left transition-all group"
                  >
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{user.label}</span>
                       <span className="text-[10px] text-neutral-500 font-mono">{user.email}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-neutral-700 group-hover:text-white transition-colors" />
                  </button>
                ))}
             </div>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-[10px] text-neutral-700 font-mono uppercase tracking-[0.2em]">
          RDfly Protocol v1.0.4 | Bhopal Hub
        </p>
      </div>
    </div>
  );
}
