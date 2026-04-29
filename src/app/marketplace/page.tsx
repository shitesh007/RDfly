"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Calculator, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  type: string;
  seller: string;
  unit: string;
  price: number;
  details: string;
  metric: string;
  stock: string;
}

export default function MarketplacePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'summary'>('details');
  const [loading, setLoading] = useState(false);
  const [liveListings, setLiveListings] = useState<Product[]>([]);
  const [ledger, setLedger] = useState<any[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('marketplace_listings')
          .select('*')
          .eq('status', 'Available');

        if (error) throw error;

        setLiveListings(data.map((item) => ({
          id: item.id,
          type: item.material_type,
          seller: item.seller_name || 'Bhopal Central Hub',
          unit: item.material_type === 'CBG' ? 'Kg' : 'MT',
          price: item.price_per_unit,
          details: item.metric_verified,
          metric: 'Verified Quality',
          stock: `${item.volume_tonnes} ${item.material_type === 'CBG' ? 'Kg' : 'MT'}`
        })));
      } catch (err) {
        console.error("Listing Fetch Error:", err);
      }
    };

    const fetchLedger = async () => {
      const { data } = await supabase
        .from('rdf_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (data) setLedger(data);
    };

    fetchListings();
    fetchLedger();
  }, []);

  const baseAmount = selectedProduct ? selectedProduct.price * quantity : 0;
  const commission = baseAmount * 0.02;
  const totalAmount = baseAmount + commission;

  const handleTrade = async () => {
    if (!selectedProduct) return;
    setLoading(true);

    try {
      // 1. Log Transaction in Supabase
      const { data: newTx, error: txError } = await supabase
        .from('rdf_transactions')
        .insert({
          buyer_name: "Industrial Node A-1", // Demo buyer
          listing_id: selectedProduct.id,
          total_amount: totalAmount,
          commission: commission
        })
        .select()
        .single();

      if (txError) throw txError;

      // 2. Update Listing Status in Supabase
      const { error: updateError } = await supabase
        .from('marketplace_listings')
        .update({ status: 'Sold' })
        .eq('id', selectedProduct.id);
      
      if (updateError) throw updateError;

      toast.success("Trade Executed", {
        description: `Order successfully logged in the RDfly protocol. Transaction ID: TXN-${newTx.id.substring(0, 8).toUpperCase()}`
      });
      
      setSelectedProduct(null);
      setLiveListings(prev => prev.filter(l => l.id !== selectedProduct.id));
      
      // Update ledger UI
      setLedger(prev => [newTx, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error("Trade Error:", error);
      toast.error("Trade Failed", {
        description: "Could not finalize settlement on the live protocol."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Circular Fuel Marketplace</h1>
          <p className="text-neutral-400 text-lg italic">B2B Sustainable Resources Exchange - Bhopal Hub</p>
        </div>
        <div className="flex gap-4">
           <Card className="px-4 py-2 bg-emerald-500/10 border-emerald-500/20">
              <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">MoP Co-firing Mandate</p>
              <p className="text-sm font-black text-white">5% BIOMASS REQ.</p>
           </Card>
           <Card className="px-4 py-2 bg-blue-500/10 border-blue-500/20">
              <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest">SATAT Pricing</p>
              <p className="text-sm font-black text-white">₹72/kg FIXED</p>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {liveListings.map((item) => (
           <Card key={item.id} className="group border-white/5 bg-white/5 hover:border-emerald-500/30 transition-all flex flex-col">
              <CardHeader className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="text-[10px] border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-bold uppercase tracking-widest">
                       {item.metric}
                    </Badge>
                    <span className="text-[10px] font-mono text-neutral-600">ID: {item.id}</span>
                 </div>
                 <CardTitle className="text-2xl font-black text-white tracking-tighter uppercase mb-1">{item.type}</CardTitle>
                 <CardDescription className="text-emerald-500/60 font-bold italic text-sm">{item.seller}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-1 space-y-6">
                 <p className="text-sm text-neutral-400 leading-relaxed min-h-[40px]">
                    {item.details}
                 </p>
                 <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-black/40">
                    <div className="flex-1">
                       <p className="text-[8px] text-neutral-500 uppercase font-black mb-1">Market Price</p>
                       <p className="text-2xl font-black text-white tracking-tighter">₹{item.price.toLocaleString()} <span className="text-[10px] text-neutral-500">/{item.unit}</span></p>
                    </div>
                    <div className="w-px bg-white/5" />
                    <div className="flex-1">
                       <p className="text-[8px] text-neutral-500 uppercase font-black mb-1">Available</p>
                       <p className="text-lg font-bold text-neutral-300 tracking-tighter">{item.stock}</p>
                    </div>
                 </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-white/5">
                 <Button 
                   onClick={() => { setSelectedProduct(item); setCheckoutStep('details'); }}
                   className="w-full bg-emerald-500 font-black uppercase tracking-widest text-xs h-10 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/10"
                 >
                    Procure Resource
                 </Button>
              </CardFooter>
           </Card>
         ))}
      </div>

      {/* NEW: Live Settlement Ledger Section */}
      <section className="space-y-6 pt-12 border-t border-white/5">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Settlement Ledger
               </h2>
               <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Real-time P2P Settlement Feed • Bhopal Node</p>
            </div>
            <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
               {ledger.length} TRADES LOGGED
            </Badge>
         </div>

         <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
            <table className="w-full text-left text-[10px] uppercase font-bold tracking-widest">
               <thead>
                  <tr className="bg-white/5 text-neutral-500">
                     <th className="px-6 py-4">Transaction ID</th>
                     <th className="px-6 py-4">Counterparty</th>
                     <th className="px-6 py-4">Resource ID</th>
                     <th className="px-6 py-4">Amount</th>
                     <th className="px-6 py-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {ledger.length === 0 ? (
                    <tr>
                       <td colSpan={5} className="px-6 py-12 text-center text-neutral-700 italic">No trades executed in current session...</td>
                    </tr>
                  ) : (
                    ledger.slice().reverse().map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                         <td className="px-6 py-4 font-mono text-emerald-500">{tx.id.substring(0, 12)}...</td>
                         <td className="px-6 py-4 text-white">{tx.buyer_name}</td>
                         <td className="px-6 py-4 text-neutral-400">{tx.listing_id}</td>
                         <td className="px-6 py-4 text-white">₹{tx.total_amount.toLocaleString()}</td>
                         <td className="px-6 py-4">
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20 text-[8px]">SETTLED</Badge>
                         </td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
         </div>
      </section>


      {/* Procurement Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-md bg-black border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
          <DialogHeader className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                   <ShoppingBag className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                   <DialogTitle className="text-2xl font-black text-white uppercase tracking-tighter">Procurement Order</DialogTitle>
                   <DialogDescription className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Order ID: RD-TXN-REFERENCE</DialogDescription>
                </div>
             </div>
          </DialogHeader>

          {checkoutStep === 'details' ? (
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-white/1)0 bg-white/5">
                  <p className="text-[10px] text-neutral-500 uppercase font-black mb-4">Select Quantity ({selectedProduct?.unit})</p>
                  <div className="flex gap-4">
                    <Input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="bg-black border-white/10 h-12 text-white font-black text-lg" 
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-xs text-neutral-400">Inventory Status:</p>
                      <p className="text-xs font-bold text-emerald-500 italic">AVAILABLE IN NODE</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-3">
                   <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold uppercase">
                      <span>Unit Cost</span>
                      <span className="text-white">₹{selectedProduct?.price.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold uppercase">
                      <span>Logistics Fee</span>
                      <span className="text-blue-400">GOVT SUBSIDIZED</span>
                   </div>
                </div>
              </div>
              <Button onClick={() => setCheckoutStep('summary')} className="w-full h-12 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-neutral-200">Review Calculation</Button>
            </div>
          ) : (
            <div className="py-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest mb-4">
                   <Calculator className="w-4 h-4" /> Settlement Breakdown
                </div>
                <div className="space-y-4 border-y border-white/5 py-6">
                   <div className="flex justify-between text-neutral-400 text-sm font-bold">
                      <span>Base Procurement ({quantity} {selectedProduct?.unit})</span>
                      <span className="text-white font-mono">₹{baseAmount.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-neutral-400 text-sm font-bold items-center">
                      <span className="flex items-center gap-2">SaaS Platform Commission <Badge className="text-[8px] bg-blue-500/10 text-blue-400 border-blue-500/20 uppercase">Statutory 2%</Badge></span>
                      <span className="text-blue-400 font-mono">₹{commission.toLocaleString()}</span>
                   </div>
                </div>
                <div className="flex justify-between items-end pt-4">
                   <div className="space-y-1">
                      <p className="text-[10px] text-neutral-500 uppercase font-black">Total P2P Settlement</p>
                      <p className="text-4xl font-black text-white tracking-tighter">₹{totalAmount.toLocaleString()}</p>
                   </div>
                   <p className="text-[10px] text-neutral-500 lowercase font-mono opacity-60">incl. all cess & mda</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <Button variant="ghost" className="flex-1 text-neutral-500 hover:text-white" onClick={() => setCheckoutStep('details')}>Back</Button>
                 <Button 
                   disabled={loading}
                   onClick={handleTrade}
                   className="flex-[2] h-12 bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20"
                 >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Confirm & Execute Trade
                 </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
