import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="font-bold text-xl text-primary flex items-center gap-2">
          <span className="text-2xl">♻️</span> Smart-Fuel Exchange
        </Link>
        <div className="flex space-x-6">
          <Link href="/bwg" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">BWG Portal</Link>
          <Link href="/bmc" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">BMC Dashboard</Link>
          <Link href="/marketplace" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">RDF Marketplace</Link>
        </div>
      </div>
    </nav>
  );
}
