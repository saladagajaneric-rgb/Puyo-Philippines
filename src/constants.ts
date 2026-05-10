import { Property, TeamMember, HousingInsight } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 'yanessa-country-homes',
    name: 'Yanessa Country Homes',
    location: 'Brgy. Tolo-Tolo, Consolacion, Cebu',
    price: 'PHP 1,000,000',
    type: 'For Sale',
    specs: ['100sqm', 'Phase 1', 'Prime Estate'],
    description: 'A beautiful lot for sale located in the heart of Consolacion. Perfect for building your dream home in a peaceful and growing community.',
    images: [
      '/images/yanessa1.jpg',
      '/images/yanessa2.jpg',
      '/images/yanessa3.jpg'
    ],
    category: 'Lot',
    mapUrl: 'https://www.google.com/maps/place/Barangay+Tolotolo+Consolacion/@10.376758,123.9596196,17z/data=!4m14!1m7!3m6!1s0x33a9a2b092035605:0xa70c280b2c5eaf4f!2sBarangay+Tolotolo+Consolacion!8m2!3d10.3767993!4d123.9602165!16s%2Fg%2F11t5_94mfk!3m5!1s0x33a9a2b092035605:0xa70c280b2c5eaf4f!8m2!3d10.3767993!4d123.9602165!16s%2Fg%2F11t5_94mfk?entry=ttu',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.3644917637827!2d123.95802777583693!3d10.37679928974868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9a2b092035605%3A0xa70c280b2c5eaf4f!2sBarangay%20Tolotolo%20Consolacion!5e0!3m2!1sen!2sph!4v1715070562696!5m2!1sen!2sph',
    nearbyLandmarks: [
      { name: 'Consolacion SM City Mall', image: '/images/SM-City-Consolacion-banner.jpeg' },
      { name: 'CityMall Consolacion', image: '/images/citymall.webp' }
    ]
  },
  {
    id: 'puyo-modern-condo',
    name: 'Puyo Modern Suites',
    location: 'Lahug, Cebu City',
    price: 'PHP 35,000 / mo',
    type: 'For Rent',
    specs: ['2 Bedrooms', 'Fully Furnished', 'Balcony View'],
    description: 'Experience luxury living in the city center. This modern condo offers breathtaking views of the Cebu skyline.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop'
    ],
    category: 'Condo'
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Jane Claire Saladaga',
    role: 'Project Manager',
    image: '/images/jane.puyo.jpg'
  },
  {
    name: 'Marilou "Malou" Janson',
    role: 'Project Manager',
    image: '/images/malou.jpg'
  }
];

export const HOUSING_INSIGHTS: HousingInsight[] = [
  {
    title: 'Investment Value',
    content: "Cebu's real estate market is expanding rapidly, making it the perfect time for long-term investments."
  },
  {
    title: 'Location is Key',
    content: "Properties in Consolacion offer the perfect balance between suburban peace and urban accessibility."
  },
  {
    title: 'Sustainable Living',
    content: "We focus on developments that harmonize with the natural landscape of the Philippine islands."
  }
];

export const CONTACT_INFO = {
  email: 'puyophilippinescebu@gmail.com',
  instagram: 'https://www.instagram.com/puyophilippines',
  facebook: 'https://www.facebook.com/puyophilippines',
  phone: '09429347156'
};
