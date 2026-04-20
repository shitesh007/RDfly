import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[85vh] space-y-12 py-12">
      <div className="space-y-6 max-w-4xl text-center">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4 tracking-wider">
          B2B Circular Economy SaaS
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Zero-Friction Waste to Energy
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A platform for Bhopal Municipal Corporation (BMC). Connecting Bulk Waste Generators (BWGs), Municipal Logistics, and RDF Markets across the city.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <Card className="flex flex-col items-start border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">📱 BWG AI Compliance</CardTitle>
            <CardDescription className="text-base text-gray-400">For Bulk Waste Generators</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-left mb-6 text-muted-foreground leading-relaxed">
              Upload bin photos. AI Vision checks for 100% segregated dry waste. Generate EBWGR Certificates automatically to avoid penalties.
            </p>
            <Link href="/bwg" className="w-full mt-auto">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Open Service Portal</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-start border-t-4 border-t-emerald-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">🚛 BMC Logistics Dash</CardTitle>
            <CardDescription className="text-base text-gray-400">For Municipal Authorities</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-left mb-6 text-muted-foreground leading-relaxed">
              Monitor 130 smart bins real-time, route verified waste directly to Material Recovery Facilities and track overall landfill diversion.
            </p>
            <Link href="/bmc" className="w-full mt-auto">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Open Dashboard</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-start border-t-4 border-t-orange-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">🏭 B2B RDF Marketplace</CardTitle>
            <CardDescription className="text-base text-gray-400">For MRFs & Buyers</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-sm text-left mb-6 text-muted-foreground leading-relaxed">
              Live automated exchange platform for Refuse-Derived Fuel. Power plants buy directly from MRFs with secure, transparent handling.
            </p>
            <Link href="/marketplace" className="w-full mt-auto">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">Enter Marketplace</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
