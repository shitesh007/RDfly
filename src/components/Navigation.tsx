"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, ShieldCheck, Truck, ShoppingBag, BarChart3, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Compliance', href: '/bwg', icon: ShieldCheck },
  { name: 'Logistics', href: '/bmc', icon: Truck },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { name: 'Finance', href: '/finance', icon: BarChart3 },
  { name: 'Policy', href: '/guidelines', icon: HelpCircle },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
            <Leaf className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white leading-none">RDfly</span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Bhopal Eco-OS</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex h-10 items-center gap-1.5 px-3 rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-tighter">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Live Network: Adampur Hub
          </div>
          <button className="h-10 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-widest transition-all">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
