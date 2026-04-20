"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getRdfListings, updateRdfListingStatus, createTransaction, RdfListing } from '@/lib/mock-db';
import { CheckCircle, Factory, Flame, Orbit, Loader2, IndianRupee } from 'lucide-react';

export default function Marketplace() {
  const [listings, setListings] = useState<RdfListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<RdfListing | null>(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    const data = await getRdfListings();
    setListings(data);
    setLoading(false);
  };

  const handlePurchase = async () => {
    if (!selectedListing) return;
    
    setProcessing(true);
    
    const basePrice = selectedListing.pricePerTonne * selectedListing.volumeTonnes;
    const commission = basePrice * 0.02;
    const totalAmount = basePrice + commission;

    try {
      // 1. Create the transaction record
      await createTransaction({
        buyerName: "Govindpura Thermal Plant",
        listingId: selectedListing.id,
        totalAmount: totalAmount,
        platformCommission: commission
      });

      // 2. Update listing status to sold
      await updateRdfListingStatus(selectedListing.id, 'sold');

      // 3. Refresh local listings
      await fetchListings();

      setProcessing(false);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        setSelectedListing(null);
      }, 4000);
    } catch (error) {
      console.error("Transaction failed:", error);
      setProcessing(false);
      // In a real app, we'd show an error message
    }
  };

  return (
    <div className="space-y-8 pt-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-orange-500 flex items-center gap-3 drop-shadow-sm">
          <Flame className="w-10 h-10 text-orange-500" /> B2B RDF Marketplace
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">Direct P2P exchange connecting certified Material Recovery Facilities (MRFs) with Thermal & Cement Plants for sustainable energy.</p>
      </div>

      <Card className="border-orange-500/30 bg-card/40 backdrop-blur shadow-2xl shadow-orange-500/5">
        <CardHeader className="pb-6 border-b border-orange-500/10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-orange-50">Exchange Order Book</CardTitle>
              <CardDescription className="text-base mt-1">Logged in as: <span className="font-semibold text-orange-300">Govindpura Thermal Plant</span></CardDescription>
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30 px-3 py-1 text-sm">
              <Orbit className="w-4 h-4 mr-2 animate-spin-slow" /> Live Feed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
              <p className="text-orange-300/70 font-medium">Fetching market listings...</p>
            </div>
          ) : (
            <div className="rounded-lg border border-muted/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[250px] font-semibold">Seller / MRF Facility</TableHead>
                    <TableHead className="font-semibold">Volume Available</TableHead>
                    <TableHead className="font-semibold">Calorific Value</TableHead>
                    <TableHead className="font-semibold">Market Ask (₹/Tonne)</TableHead>
                    <TableHead className="font-semibold">Trading Status</TableHead>
                    <TableHead className="text-right font-semibold">Execution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id} className="border-b-muted/30 hover:bg-muted/20 transition-colors h-16">
                      <TableCell className="font-medium flex items-center gap-3 pt-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                          <Factory className="w-4 h-4 text-orange-400" />
                        </div>
                        {listing.sellerName}
                      </TableCell>
                      <TableCell className="font-black text-lg">{listing.volumeTonnes}<span className="text-sm font-medium text-muted-foreground ml-1">T</span></TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-orange-950/40 text-orange-400 border-orange-500/30">
                          {listing.calorificValueKcal} kcal/kg
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1.5 ml-1">Moisture: {listing.moistureContentPercent}%</div>
                      </TableCell>
                      <TableCell className="font-mono text-lg text-orange-100">₹{listing.pricePerTonne.toLocaleString()}</TableCell>
                      <TableCell>
                        {listing.status === 'available' ? (
                          <Badge className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/30 font-semibold tracking-wide shadow-[0_0_10px_rgba(34,197,94,0.1)]">Active Listing</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground border-muted-foreground/30 font-semibold tracking-wide">Sold / Settled</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          disabled={listing.status === 'sold'}
                          className={`font-semibold shadow-lg border-none transition-all hover:scale-105 ${listing.status === 'sold' ? 'bg-muted text-muted-foreground' : 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-orange-500/20'}`}
                          onClick={() => setSelectedListing(listing)}
                        >
                          {listing.status === 'sold' ? 'Settled' : 'Procure RDF'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedListing} onOpenChange={(open) => !open && !processing && !success && setSelectedListing(null)}>
        <DialogContent className="sm:max-w-[450px] border-orange-500/30 bg-background/95 backdrop-blur shadow-2xl shadow-orange-500/10">
          <DialogHeader>
            <DialogTitle className="text-2xl text-orange-50">Market Settlement Invoice</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground/80">
              Generated via Smart-Fuel P2P Settlement Layer.
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && !success && !processing && (
            <div className="py-6 space-y-5">
              <div className="flex justify-between items-center text-sm border-b border-muted/30 pb-3">
                <span className="text-muted-foreground">Supplier MRF:</span>
                <span className="font-medium text-right dark:text-gray-200">{selectedListing.sellerName}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-muted/30 pb-3">
                <span className="text-muted-foreground">Volume Secured:</span>
                <span className="font-bold text-right dark:text-gray-200">{selectedListing.volumeTonnes} Tonnes</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-muted/30 pb-3">
                <span className="text-neutral-400">Unit Price:</span>
                <span className="font-mono text-right text-neutral-200">₹{selectedListing.pricePerTonne.toLocaleString()} / T</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-muted/30 pb-3">
                <span className="text-muted-foreground">Base Price:</span>
                <span className="font-mono text-right dark:text-gray-200">₹{(selectedListing.pricePerTonne * selectedListing.volumeTonnes).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-1 text-blue-400 font-medium">
                <span className="flex items-center gap-1">SaaS Commission (2%):</span>
                <span className="font-mono">₹{(selectedListing.pricePerTonne * selectedListing.volumeTonnes * 0.02).toLocaleString()}</span>
              </div>
              <div className="pt-5 border-t border-orange-500/20 flex justify-between items-center">
                <span className="text-lg text-muted-foreground">Final Settlement:</span>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-3xl font-bold text-orange-400">₹{(selectedListing.pricePerTonne * selectedListing.volumeTonnes * 1.02).toLocaleString()}</span>
                  <p className="text-[10px] text-orange-300/50 uppercase tracking-tighter mt-1">Verified via Blockchain Escrow</p>
                </div>
              </div>
            </div>
          )}

          {processing && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
              <h3 className="text-xl font-bold text-orange-400 animate-pulse">Confirming Transaction on Chain...</h3>
              <p className="text-sm text-muted-foreground">Updating RDF availability and locking funds.</p>
            </div>
          )}

          {success && (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-5">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-400">Procurement Successful</h3>
                <p className="text-sm text-green-400/70 mt-2 max-w-[280px] mx-auto">Listing updated to SOLD. Logistics orders have been auto-dispatched to MRF.</p>
              </div>
              <Button variant="outline" className="mt-4 border-green-500/30 text-green-400" onClick={() => setSelectedListing(null)}>
                Download Invoice PDF
              </Button>
            </div>
          )}
          
          <DialogFooter className="pt-2">
            {!success && !processing && (
              <Button 
                onClick={handlePurchase} 
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 shadow-[0_0_20px_rgba(234,88,12,0.3)] border-none"
              >
                Confirm Procurement
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
