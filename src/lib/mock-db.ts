export interface Bin {
  id: string;
  name: string;
  location: string;
  fillLevel: number;
  status: 'active' | 'maintenance' | 'offline';
  lastUpdated: string;
  isVerifiedDryWaste?: boolean;
}

export interface Certificate {
  id: string;
  bwgName: string;
  dateIssued: string;
  status: 'valid' | 'expired' | 'revoked';
  wasteVolumeTonnes: number;
}

export interface RdfListing {
  id: string;
  sellerId: string;
  sellerName: string;
  volumeTonnes: number;
  calorificValueKcal: number;
  moistureContentPercent: number;
  pricePerTonne: number;
  status: 'available' | 'sold';
}

export const mockDatabase = {
  bins: [
    {
      id: 'bin-001',
      name: 'Adampur Hub - North',
      location: '23.2599, 77.4126',
      fillLevel: 85,
      status: 'active',
      lastUpdated: new Date().toISOString(),
      isVerifiedDryWaste: true,
    },
    {
      id: 'bin-002',
      name: 'MP Nagar Zone 1',
      location: '23.2324, 77.4330',
      fillLevel: 45,
      status: 'active',
      lastUpdated: new Date().toISOString(),
      isVerifiedDryWaste: false,
    },
    {
      id: 'bin-003',
      name: 'Arera Colony E-8',
      location: '23.1953, 77.4362',
      fillLevel: 65,
      status: 'active',
      lastUpdated: new Date().toISOString(),
      isVerifiedDryWaste: true,
    },
    {
      id: 'bin-004',
      name: 'BHEL Govindpura Ind. Area',
      location: '23.2500, 77.4700',
      fillLevel: 92,
      status: 'active',
      lastUpdated: new Date().toISOString(),
      isVerifiedDryWaste: true,
    },
    {
      id: 'bin-005',
      name: 'New Market Central',
      location: '23.2355, 77.4042',
      fillLevel: 25,
      status: 'maintenance',
      lastUpdated: new Date().toISOString(),
      isVerifiedDryWaste: false,
    }
  ] as Bin[],
  
  certificates: [
    {
      id: 'CERT-2026-001A',
      bwgName: 'Taj Lakefront Bhopal',
      dateIssued: '2026-03-15',
      status: 'valid',
      wasteVolumeTonnes: 12.5,
    },
    {
      id: 'CERT-2026-002B',
      bwgName: 'Courtyard by Marriott',
      dateIssued: '2026-03-20',
      status: 'valid',
      wasteVolumeTonnes: 8.2,
    },
    {
      id: 'CERT-2026-003C',
      bwgName: 'Ashima Mall Society',
      dateIssued: '2026-04-10',
      status: 'valid',
      wasteVolumeTonnes: 15.0,
    }
  ] as Certificate[],
  
  rdfListings: [
    {
      id: 'RDF-101',
      sellerId: 'mrf-bhanpur',
      sellerName: 'Bhanpur MRF',
      volumeTonnes: 50,
      calorificValueKcal: 4000,
      moistureContentPercent: 12,
      pricePerTonne: 1200,
      status: 'available',
    },
    {
      id: 'RDF-102',
      sellerId: 'mrf-adampur',
      sellerName: 'Adampur Processing Plant',
      volumeTonnes: 120,
      calorificValueKcal: 4200,
      moistureContentPercent: 10,
      pricePerTonne: 1350,
      status: 'available',
    },
    {
      id: 'RDF-103',
      sellerId: 'mrf-kolar',
      sellerName: 'Kolar Sub-MRF',
      volumeTonnes: 25,
      calorificValueKcal: 3800,
      moistureContentPercent: 15,
      pricePerTonne: 1000,
      status: 'available',
    }
  ] as RdfListing[]
};
