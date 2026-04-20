import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is for DEMO purposes to show RBAC in action.
// In a full production app, this would use supabase.auth.getSession() via @supabase/auth-helpers-nextjs
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const role = request.cookies.get('rdfly_role')?.value;

  // Protected paths
  const bwgPaths = ['/bwg'];
  const bmcPaths = ['/bmc'];
  const marketplacePaths = ['/marketplace'];

  // 1. Check BWG Access
  if (bwgPaths.includes(path) && role !== 'BWG_ENTITY') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Check BMC Access
  if (bmcPaths.includes(path) && role !== 'BMC_ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Check Marketplace Access
  if (marketplacePaths.includes(path) && role !== 'MRF_BUYER') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bwg', '/bmc', '/marketplace'],
};
