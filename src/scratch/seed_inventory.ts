import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('🚀 Seeding Marketplace Inventory...');

  const listings = [
    {
      material_type: 'RDF',
      volume_tonnes: 140,
      price_per_unit: 3800,
      metric_verified: '92% Dry Factor | MoP Compliant',
      status: 'Available'
    },
    {
      material_type: 'CBG',
      volume_tonnes: 4500, // Kg for CBG as per pricing
      price_per_unit: 72,
      metric_verified: 'SATAT Certified | CH4 > 95%',
      status: 'Available'
    },
    {
      material_type: 'FOM',
      volume_tonnes: 250,
      price_per_unit: 1500,
      metric_verified: 'MDA Eligible | Govt Subsidy Ready',
      status: 'Available'
    }
  ];

  for (const item of listings) {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .insert(item)
      .select();

    if (error) {
      console.error(`❌ Error seeding ${item.material_type}:`, error.message);
    } else {
      console.log(`✅ Seeded ${item.material_type} at ₹${item.price_per_unit}`);
    }
  }

  console.log('✨ Seeding Complete!');
}

seed();
