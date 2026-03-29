export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  specs: {
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    display?: string;
  };
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const CATEGORIES = [
  { id: 'gaming-laptops', name: 'Gaming Laptops', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80' },
  { id: 'business-laptops', name: 'Business Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
  { id: 'student-laptops', name: 'Student Laptops', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80' },
  { id: 'creator-laptops', name: 'Creator Laptops', image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'lap-1',
    name: 'Bon Prix Stealth 15',
    category: 'gaming-laptops',
    price: 149000,
    originalPrice: 175000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80'
    ],
    specs: {
      cpu: 'AMD Ryzen 7 7840HS',
      gpu: 'NVIDIA RTX 4060 8GB',
      ram: '16GB DDR5',
      storage: '1TB NVMe SSD',
      display: '15.6" QHD 165Hz',
    },
    description: 'Thin, light, and incredibly powerful. The perfect balance of portability and gaming performance.',
    stock: 5,
    rating: 4.8,
    reviews: 124,
    isBestSeller: true,
  },
  {
    id: 'lap-2',
    name: 'WorkBook Pro 14',
    category: 'business-laptops',
    price: 121000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i7-1355U',
      gpu: 'Intel Iris Xe',
      ram: '16GB LPDDR5',
      storage: '512GB NVMe SSD',
      display: '14" FHD+ IPS',
    },
    description: 'Premium aluminum chassis, all-day battery life, and a gorgeous display for professionals on the go.',
    stock: 15,
    rating: 4.7,
    reviews: 89,
    isBestSeller: true,
  },
  {
    id: 'lap-3',
    name: 'Campus Book 13',
    category: 'student-laptops',
    price: 67000,
    originalPrice: 81000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i5-1235U',
      gpu: 'Intel UHD Graphics',
      ram: '8GB DDR4',
      storage: '256GB NVMe SSD',
      display: '13.3" FHD',
    },
    description: 'Lightweight and affordable. Perfect for taking notes, writing essays, and browsing the web.',
    stock: 20,
    rating: 4.5,
    reviews: 210,
  },
  {
    id: 'lap-4',
    name: 'Studio Pro 16',
    category: 'creator-laptops',
    price: 256000,
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i9-13900H',
      gpu: 'NVIDIA RTX 4070 8GB',
      ram: '32GB DDR5',
      storage: '2TB NVMe Gen4 SSD',
      display: '16" 4K OLED 100% DCI-P3',
    },
    description: 'Color-accurate 4K OLED display and massive processing power for video editing and 3D rendering.',
    stock: 8,
    rating: 4.9,
    reviews: 56,
    isNew: true,
  },
  {
    id: 'lap-5',
    name: 'Titan RTX 17',
    category: 'gaming-laptops',
    price: 337000,
    originalPrice: 378000,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80'
    ],
    specs: {
      cpu: 'AMD Ryzen 9 7945HX',
      gpu: 'NVIDIA RTX 4080 12GB',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
      display: '17.3" QHD 240Hz',
    },
    description: 'Desktop-class performance in a laptop form factor. Dominate any game at maximum settings.',
    stock: 3,
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 'lap-6',
    name: 'Flex 2-in-1',
    category: 'student-laptops',
    price: 101000,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'
    ],
    specs: {
      cpu: 'AMD Ryzen 5 7530U',
      gpu: 'AMD Radeon Graphics',
      ram: '16GB LPDDR4x',
      storage: '512GB NVMe SSD',
      display: '14" FHD Touchscreen',
    },
    description: 'Versatile 2-in-1 design with a touchscreen. Use it as a laptop or a tablet for ultimate flexibility.',
    stock: 12,
    rating: 4.6,
    reviews: 115,
    isBestSeller: true,
  }
];
