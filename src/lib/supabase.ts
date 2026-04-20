import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'BWG_ENTITY' | 'BMC_ADMIN' | 'MRF_BUYER';

export interface AppUser {
  id: string;
  full_name: string;
  role: UserRole;
  organization_name: string;
}
