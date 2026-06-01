// Haqiqiy mobil telefonlar ma'lumotlari
export const realProducts = [
  // iPhone seriyasi
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'Apple',
    price: 18500000,
    originalPrice: 19500000,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&sat=-100',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'Eng yangi iPhone 15 Pro Max - professional foydalanuvchilar uchun',
    specifications: {
      display: '6.7" Super Retina XDR OLED',
      processor: 'A17 Pro chip',
      storage: '256GB',
      camera: '48MP + 12MP + 12MP',
      battery: '4441 mAh',
      os: 'iOS 17',
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
    },
    features: [
      'Titanium korpus',
      'ProRAW va ProRes video',
      'Action Button',
      'USB-C port',
      '5G aloqa',
      'Face ID',
      'MagSafe wireless charging'
    ],
    stock: 15,
    rating: 4.9,
    reviews: 127,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'Apple',
    price: 13500000,
    originalPrice: 14000000,
    discount: 4,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&hue=60',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&hue=60',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&hue=120',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop&hue=240'
    ],
    description: 'iPhone 15 - kundalik foydalanish uchun mukammal tanlov',
    specifications: {
      display: '6.1" Super Retina XDR OLED',
      processor: 'A16 Bionic chip',
      storage: '128GB',
      camera: '48MP + 12MP',
      battery: '3349 mAh',
      os: 'iOS 17',
      colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black']
    },
    features: [
      'Aluminum korpus',
      'Dynamic Island',
      'USB-C port',
      '5G aloqa',
      'Face ID',
      'MagSafe wireless charging'
    ],
    stock: 25,
    rating: 4.7,
    reviews: 89,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  
  // Samsung Galaxy seriyasi
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Samsung',
    price: 16800000,
    originalPrice: 17500000,
    discount: 4,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'Galaxy S24 Ultra - S Pen bilan professional imkoniyatlar',
    specifications: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      storage: '256GB',
      camera: '200MP + 50MP + 12MP + 10MP',
      battery: '5000 mAh',
      os: 'Android 14, One UI 6.1',
      colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow']
    },
    features: [
      'S Pen qalam',
      'AI kamera funksiyalari',
      '100x Space Zoom',
      'Titanium korpus',
      '5G aloqa',
      'Ultrasonic fingerprint',
      '45W fast charging'
    ],
    stock: 12,
    rating: 4.8,
    reviews: 156,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'samsung-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    category: 'Samsung',
    price: 11200000,
    originalPrice: 11800000,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&hue=60',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop&hue=60',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop&hue=120',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop&hue=240'
    ],
    description: 'Galaxy S24 - AI bilan yangi tajriba',
    specifications: {
      display: '6.2" Dynamic AMOLED 2X',
      processor: 'Exynos 2400',
      storage: '128GB',
      camera: '50MP + 12MP + 10MP',
      battery: '4000 mAh',
      os: 'Android 14, One UI 6.1',
      colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow']
    },
    features: [
      'AI foto tahrirlash',
      'Circle to Search',
      'Live Translate',
      'Aluminum korpus',
      '5G aloqa',
      'Ultrasonic fingerprint',
      '25W fast charging'
    ],
    stock: 20,
    rating: 4.6,
    reviews: 94,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: true,
    isFeatured: false
  },

  // Xiaomi seriyasi
  {
    id: 'xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    category: 'Xiaomi',
    price: 14500000,
    originalPrice: 15200000,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'Xiaomi 14 Ultra - Leica kamera bilan professional suratga olish',
    specifications: {
      display: '6.73" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      storage: '512GB',
      camera: '50MP + 50MP + 50MP + 50MP',
      battery: '5300 mAh',
      os: 'Android 14, HyperOS',
      colors: ['Black', 'White']
    },
    features: [
      'Leica kamera',
      'Professional foto rejimi',
      '90W fast charging',
      '50W wireless charging',
      'IP68 himoya',
      '5G aloqa',
      'Dolby Vision HDR'
    ],
    stock: 8,
    rating: 4.7,
    reviews: 67,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: true,
    isFeatured: true
  },

  // Redmi seriyasi
  {
    id: 'redmi-note-13-pro',
    name: 'Redmi Note 13 Pro',
    brand: 'Redmi',
    category: 'Redmi',
    price: 3200000,
    originalPrice: 3500000,
    discount: 9,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'Redmi Note 13 Pro - eng yaxshi narx-sifat nisbati',
    specifications: {
      display: '6.67" AMOLED',
      processor: 'Snapdragon 7s Gen 2',
      storage: '256GB',
      camera: '200MP + 8MP + 2MP',
      battery: '5000 mAh',
      os: 'Android 13, MIUI 14',
      colors: ['Midnight Black', 'Lavender Purple', 'Ice Blue']
    },
    features: [
      '200MP kamera',
      '67W fast charging',
      'IP54 himoya',
      'Stereo speakers',
      '5G aloqa',
      'Side fingerprint'
    ],
    stock: 25,
    rating: 4.6,
    reviews: 156,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: true,
    isFeatured: true
  },

  // ROG Phone seriyasi (Gaming)
  {
    id: 'rog-phone-7',
    name: 'ROG Phone 7 Ultimate',
    brand: 'ASUS',
    category: 'ROG',
    price: 16500000,
    originalPrice: 17500000,
    discount: 6,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'ROG Phone 7 Ultimate - eng kuchli gaming telefon',
    specifications: {
      display: '6.78" AMOLED 165Hz',
      processor: 'Snapdragon 8 Gen 2',
      storage: '512GB',
      camera: '50MP + 13MP + 5MP',
      battery: '6000 mAh',
      os: 'Android 13, ROG UI',
      colors: ['Storm White', 'Phantom Black']
    },
    features: [
      '165Hz display',
      'AirTrigger 7',
      'GameCool 7 cooling',
      '65W HyperCharge',
      'RGB lighting',
      'Dual front speakers'
    ],
    stock: 8,
    rating: 4.9,
    reviews: 89,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: true,
    isFeatured: true
  },

  // Vertu seriyasi (Luxury)
  {
    id: 'vertu-signature-s',
    name: 'Vertu Signature S',
    brand: 'Vertu',
    category: 'Vertu',
    price: 85000000,
    originalPrice: 90000000,
    discount: 6,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'Vertu Signature S - luxury premium telefon',
    specifications: {
      display: '6.67" AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      storage: '512GB',
      camera: '50MP + 50MP + 8MP',
      battery: '4600 mAh',
      os: 'Android 13',
      colors: ['Black Alligator', 'Red Gold', 'Titanium']
    },
    features: [
      'Qo\'lda ishlangan',
      'Sapphire crystal',
      'Titanium korpus',
      'Alligator teri',
      '24/7 Concierge',
      'Lifetime warranty'
    ],
    stock: 3,
    rating: 5.0,
    reviews: 12,
    warranty: 'Umrbod kafolat',
    inStock: true,
    isNew: true,
    isFeatured: true
  }
];

// Kategoriyalar
export const categories = [
  {
    id: 'apple',
    name: 'Apple',
    description: 'iPhone seriyasi',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=200&fit=crop',
    count: 2
  },
  {
    id: 'samsung',
    name: 'Samsung',
    description: 'Galaxy seriyasi',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop',
    count: 2
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    description: 'Xiaomi flagman telefonlar',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
    count: 1
  },
  {
    id: 'redmi',
    name: 'Redmi',
    description: 'Arzon va sifatli telefonlar',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=200&fit=crop',
    count: 1
  },
  {
    id: 'rog',
    name: 'ROG Phone',
    description: 'Gaming telefonlar',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300&h=200&fit=crop',
    count: 1
  },
  {
    id: 'vertu',
    name: 'Vertu',
    description: 'Luxury premium telefonlar',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    count: 1
  }
];

// Narx diapazoni
export const priceRanges = [
  { id: 'under-10m', label: '10 mln gacha', min: 0, max: 10000000 },
  { id: '10m-15m', label: '10-15 mln', min: 10000000, max: 15000000 },
  { id: '15m-20m', label: '15-20 mln', min: 15000000, max: 20000000 },
  { id: 'over-20m', label: '20 mln dan yuqori', min: 20000000, max: Infinity }
];

// Mahsulot filtrlash funksiyalari
export const filterProducts = (products, filters) => {
  let filtered = [...products];

  // Kategoriya bo'yicha filtr
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => 
      product.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // Narx diapazoni bo'yicha filtr
  if (filters.priceRange) {
    const range = priceRanges.find(r => r.id === filters.priceRange);
    if (range) {
      filtered = filtered.filter(product => 
        product.price >= range.min && product.price <= range.max
      );
    }
  }

  // Qidiruv bo'yicha filtr
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Mavjudlik bo'yicha filtr
  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock && product.stock > 0);
  }

  // Yangi mahsulotlar bo'yicha filtr
  if (filters.isNew) {
    filtered = filtered.filter(product => product.isNew);
  }

  // Saralash
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default: featured first, then by rating
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
    }
  }

  return filtered;
};

// Mahsulot ID bo'yicha topish
export const getProductById = (id) => {
  return realProducts.find(product => product.id === id);
};

// Tavsiya etiladigan mahsulotlar
export const getRecommendedProducts = (currentProductId, limit = 4) => {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return realProducts.slice(0, limit);

  // Bir xil kategoriyadan tavsiya etish
  const sameCategory = realProducts.filter(product => 
    product.id !== currentProductId && 
    product.category === currentProduct.category
  );

  // Agar bir xil kategoriyada yetarli mahsulot bo'lmasa, boshqa kategoriyalardan qo'shish
  const others = realProducts.filter(product => 
    product.id !== currentProductId && 
    product.category !== currentProduct.category
  );

  const recommended = [...sameCategory, ...others].slice(0, limit);
  return recommended;
};

export default realProducts;