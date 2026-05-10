export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  type: 'For Sale' | 'For Rent';
  specs: string[];
  description: string;
  images: string[];
  category: 'Lot' | 'House & Lot' | 'Condo';
  mapUrl?: string;
  mapEmbedUrl?: string;
  nearbyLandmarks?: { name: string; image?: string }[];
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export interface HousingInsight {
  title: string;
  content: string;
}

export interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  property_id?: string;
  status: 'new' | 'read' | 'replied';
}
