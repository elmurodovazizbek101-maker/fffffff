// Haqiqiy mobil telefonlar ma'lumotlari
export const realProducts = [
  // iPhone seriyasi
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'iPhone',
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
    category: 'iPhone',
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

  // Honor seriyasi
  {
    id: 'honor-magic-6-pro',
    name: 'Honor Magic 6 Pro',
    brand: 'Honor',
    category: 'Honor',
    price: 12800000,
    originalPrice: 13500000,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'Honor Magic 6 Pro - AI bilan kuchaytirilgan performance',
    specifications: {
      display: '6.8" LTPO OLED',
      processor: 'Snapdragon 8 Gen 3',
      storage: '256GB',
      camera: '50MP + 180MP + 50MP',
      battery: '5600 mAh',
      os: 'Android 14, MagicOS 8.0',
      colors: ['Epi Green', 'Black', 'White']
    },
    features: [
      'AI Magic Portal',
      '180MP periscope kamera',
      '80W fast charging',
      '66W wireless charging',
      'IP68 himoya',
      '5G aloqa',
      'Magic Capsule'
    ],
    stock: 10,
    rating: 4.5,
    reviews: 43,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: true,
    isFeatured: false
  },

  // Vivo seriyasi
  {
    id: 'vivo-x100-pro',
    name: 'Vivo X100 Pro',
    brand: 'Vivo',
    category: 'Vivo',
    price: 11500000,
    originalPrice: 12000000,
    discount: 4,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'Vivo X100 Pro - Zeiss optika bilan professional kamera',
    specifications: {
      display: '6.78" LTPO AMOLED',
      processor: 'MediaTek Dimensity 9300',
      storage: '256GB',
      camera: '50MP + 50MP + 50MP',
      battery: '5400 mAh',
      os: 'Android 14, OriginOS 4',
      colors: ['Asteroid Black', 'Sunset Orange', 'White']
    },
    features: [
      'Zeiss kamera',
      'V3 imaging chip',
      '100W fast charging',
      '50W wireless charging',
      'IP68 himoya',
      '5G aloqa',
      'Professional portrait'
    ],
    stock: 15,
    rating: 4.4,
    reviews: 38,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: false,
    isFeatured: false
  },

  // OnePlus seriyasi
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    category: 'OnePlus',
    price: 10800000,
    originalPrice: 11300000,
    discount: 4,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'OnePlus 12 - Never Settle, tez va kuchli performance',
    specifications: {
      display: '6.82" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      storage: '256GB',
      camera: '50MP + 64MP + 48MP',
      battery: '5400 mAh',
      os: 'Android 14, OxygenOS 14',
      colors: ['Silky Black', 'Flowy Emerald', 'White']
    },
    features: [
      'Hasselblad kamera',
      '100W SuperVOOC charging',
      '50W wireless charging',
      'Alert Slider',
      '5G aloqa',
      'In-display fingerprint',
      'Dolby Atmos'
    ],
    stock: 18,
    rating: 4.6,
    reviews: 72,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: false,
    isFeatured: false
  },

  // Google Pixel seriyasi
  {
    id: 'google-pixel-8-pro',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'Google',
    price: 13200000,
    originalPrice: 13800000,
    discount: 4,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop&sat=-50',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop&hue=180'
    ],
    description: 'Google Pixel 8 Pro - AI bilan eng yaxshi Android tajriba',
    specifications: {
      display: '6.7" LTPO OLED',
      processor: 'Google Tensor G3',
      storage: '128GB',
      camera: '50MP + 48MP + 48MP',
      battery: '5050 mAh',
      os: 'Android 14',
      colors: ['Obsidian', 'Porcelain', 'Bay']
    },
    features: [
      'Pure Android',
      'Magic Eraser',
      'Call Screen',
      'Live Translate',
      '5G aloqa',
      'Titan M security',
      '7 yil yangilanish'
    ],
    stock: 12,
    rating: 4.5,
    reviews: 85,
    warranty: '1 yil rasmiy kafolat',
    inStock: true,
    isNew: false,
    isFeatured: false
  }
];

// Kategoriyalar
export const categories = [
  {
    id: 'iphone',
    name: 'iPhone',
    description: 'Apple iPhone seriyasi',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=200&fit=crop',
    count: 2
  },
  {
    id: 'samsung',
    name: 'Samsung',
    description: 'Samsung Galaxy seriyasi',
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
    id: 'honor',
    name: 'Honor',
    description: 'Honor Magic seriyasi',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
    count: 1
  },
  {
    id: 'vivo',
    name: 'Vivo',
    description: 'Vivo X seriyasi',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=200&fit=crop',
    count: 1
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    description: 'OnePlus flagman telefonlar',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=200&fit=crop',
    count: 1
  },
  {
    id: 'google',
    name: 'Google',
    description: 'Google Pixel seriyasi',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop',
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