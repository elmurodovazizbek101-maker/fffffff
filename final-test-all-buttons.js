// YAKUNIY TEST - Barcha tugmalar vazifalarini bajarishi
console.log('🎯 BARCHA TUGMALARNING VAZIFALARINI YAKUNIY TEKSHIRISH');
console.log('=' .repeat(70));

// Barcha tugmalarni topish va guruhlash
function getAllButtonsWithDetails() {
  const buttons = [];
  
  // Turli xil tugmalarni qidirish
  const selectors = [
    'button',
    '.btn', 
    '[role="button"]',
    'input[type="submit"]',
    'input[type="button"]',
    'a[href]',
    'a[onclick]',
    '.clickable',
    '[data-action]'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      if (buttons.find(b => b.element === element)) return; // Skip duplicates
      
      const button = {
        element,
        selector,
        text: element.textContent?.trim() || element.title || element.getAttribute('aria-label') || 'No text',
        id: element.id,
        className: element.className,
        tagName: element.tagName,
        type: element.type,
        href: element.href,
        location: getElementLocation(element),
        function: getExpectedFunction(element),
        rect: element.getBoundingClientRect(),
        styles: window.getComputedStyle(element)
      };
      
      buttons.push(button);
    });
  });
  
  return buttons;
}

// Element qayerda joylashganini aniqlash
function getElementLocation(element) {
  if (element.closest('.modal')) return 'Modal';
  if (element.closest('nav') || element.closest('.nav') || element.closest('header')) return 'Header/Nav';
  if (element.closest('.sidebar')) return 'Sidebar';
  if (element.closest('form')) return 'Form';
  if (element.closest('.cart')) return 'Cart';
  if (element.closest('.admin-panel')) return 'Admin Panel';
  if (element.closest('.website-page')) return 'Website';
  if (element.closest('.categories-page')) return 'Categories';
  if (element.closest('.products-page')) return 'Products';
  if (element.closest('.customers-page')) return 'Customers';
  if (element.closest('.employees-page')) return 'Employees';
  return 'Other';
}

// Tugmaning vazifasini aniqlash
function getExpectedFunction(element) {
  const text = (element.textContent || '').toLowerCase();
  const className = (element.className || '').toLowerCase();
  const title = (element.title || '').toLowerCase();
  
  // Navigatsiya
  if (element.href) return `Navigate to ${element.href}`;
  if (text.includes('bosh sahifa') || text.includes('home')) return 'Bosh sahifaga o\'tish';
  if (text.includes('mahsulot') && text.includes('sahifa')) return 'Mahsulotlar sahifasiga o\'tish';
  if (text.includes('kategoriya') && text.includes('sahifa')) return 'Kategoriyalar sahifasiga o\'tish';
  if (text.includes('mijoz') && text.includes('sahifa')) return 'Mijozlar sahifasiga o\'tish';
  if (text.includes('xodim') && text.includes('sahifa')) return 'Xodimlar sahifasiga o\'tish';
  
  // CRUD operatsiyalari
  if (text.includes('qo\'shish') || text.includes('yangi') || text.includes('add') || text.includes('create')) return 'Yangi element qo\'shish';
  if (text.includes('tahrirlash') || text.includes('edit') || title.includes('tahrirlash')) return 'Element tahrirlash';
  if (text.includes('o\'chirish') || text.includes('delete') || text.includes('del') || title.includes('o\'chirish')) return 'Element o\'chirish';
  if (text.includes('saqlash') || text.includes('save')) return 'O\'zgarishlarni saqlash';
  
  // Modal operatsiyalar
  if (text.includes('yopish') || text === '×') return 'Modal/Dialog yopish';
  if (text.includes('bekor qilish') || text.includes('cancel')) return 'Operatsiyani bekor qilish';
  
  // Autentifikatsiya
  if (text.includes('kirish') || text.includes('login')) return 'Saytga kirish';
  if (text.includes('chiqish') || text.includes('logout')) return 'Saytdan chiqish';
  if (text.includes('ro\'yxat') || text.includes('register')) return 'Ro\'yxatdan o\'tish';
  
  // E-commerce
  if (text.includes('savat') || text.includes('cart')) return 'Savatni ochish';
  if (text.includes('sotib olish') || text.includes('buyurtma')) return 'Buyurtma berish';
  if (text.includes('qidirish') || text.includes('search')) return 'Qidiruv ochish';
  
  // Boshqa
  if (text.includes('maosh')) return 'Maosh to\'lash';
  if (text.includes('to\'lov')) return 'To\'lov qilish';
  if (text.includes('reset')) return 'Ma\'lumotlarni qayta tiklash';
  
  return 'Noma\'lum vazifa';
}

// Tugma ishlashini tekshirish
function testButtonFunctionality(button) {
  const issues = [];
  
  // Disabled tugmalarni o'tkazib yuborish
  if (button.element.disabled || button.element.classList.contains('disabled')) {
    return { status: 'disabled', issues: [] };
  }
  
  // Ko'rinish tekshiruvi
  if (button.rect.width === 0 || button.rect.height === 0) {
    issues.push('element o\'lchami nol');
  }
  
  if (button.styles.display === 'none' || button.styles.visibility === 'hidden' || button.styles.opacity === '0') {
    issues.push('element ko\'rinmaydi');
  }
  
  // Cursor tekshiruvi
  if (button.styles.cursor !== 'pointer') {
    issues.push('cursor pointer emas');
  }
  
  // Pointer events tekshiruvi
  if (button.styles.pointerEvents === 'none') {
    issues.push('pointer-events o\'chirilgan');
  }
  
  // Click handler tekshiruvi
  const hasHandler = button.element.onclick ||
                    button.element.getAttribute('onclick') ||
                    button.element.href ||
                    Object.keys(button.element).some(key => key.startsWith('__react')) ||
                    button.element.type === 'submit';
                    
  if (!hasHandler && button.tagName !== 'BUTTON') {
    issues.push('click handler yo\'q');
  }
  
  // Element ustida overlay tekshiruvi
  if (button.rect.width > 0 && button.rect.height > 0) {
    try {
      const centerX = button.rect.left + button.rect.width / 2;
      const centerY = button.rect.top + button.rect.height / 2;
      const topElement = document.elementFromPoint(centerX, centerY);
      
      if (topElement && topElement !== button.element && !button.element.contains(topElement)) {
        issues.push('boshqa element bilan qoplangan');
      }
    } catch (e) {
      issues.push('pozitsiya tekshiruvida xato');
    }
  }
  
  return {
    status: issues.length === 0 ? 'working' : 'broken',
    issues
  };
}

// Asosiy test funksiyasi
function runFinalButtonTest() {
  console.log('🔍 Test boshlanyapti...\n');
  
  const allButtons = getAllButtonsWithDetails();
  console.log(`📊 Jami ${allButtons.length} ta tugma topildi\n`);
  
  const results = {
    total: allButtons.length,
    working: 0,
    broken: 0,
    disabled: 0,
    byLocation: {},
    byFunction: {},
    issues: [],
    buttons: []
  };
  
  // Har bir tugmani test qilish
  allButtons.forEach((button, index) => {
    const test = testButtonFunctionality(button);
    
    const result = {
      ...button,
      ...test,
      index: index + 1
    };
    
    results.buttons.push(result);
    
    // Statistika yangilash
    if (test.status === 'working') {
      results.working++;
      console.log(`✅ ${index + 1}. [${button.location}] "${button.text}" - ${button.function}`);
    } else if (test.status === 'broken') {
      results.broken++;
      results.issues.push(result);
      console.log(`❌ ${index + 1}. [${button.location}] "${button.text}" - MUAMMO: ${test.issues.join(', ')}`);
    } else if (test.status === 'disabled') {
      results.disabled++;
      console.log(`⏭️ ${index + 1}. [${button.location}] "${button.text}" - O'CHIRILGAN`);
    }
    
    // Joylashuv bo'yicha
    if (!results.byLocation[button.location]) {
      results.byLocation[button.location] = { total: 0, working: 0, broken: 0 };
    }
    results.byLocation[button.location].total++;
    if (test.status === 'working') results.byLocation[button.location].working++;
    if (test.status === 'broken') results.byLocation[button.location].broken++;
    
    // Vazifa bo'yicha
    if (!results.byFunction[button.function]) {
      results.byFunction[button.function] = { total: 0, working: 0, broken: 0 };
    }
    results.byFunction[button.function].total++;
    if (test.status === 'working') results.byFunction[button.function].working++;
    if (test.status === 'broken') results.byFunction[button.function].broken++;
  });
  
  return results;
}

// Natijalarni ko'rsatish
function showResults(results) {
  console.log('\n' + '='.repeat(70));
  console.log('📊 YAKUNIY NATIJALAR:');
  console.log('='.repeat(70));
  console.log(`Jami tugmalar: ${results.total}`);
  console.log(`✅ Ishlayapti: ${results.working}`);
  console.log(`❌ Ishlamayapti: ${results.broken}`);
  console.log(`⏭️ O'chirilgan: ${results.disabled}`);
  
  const activeButtons = results.total - results.disabled;
  const successRate = activeButtons > 0 ? ((results.working / activeButtons) * 100).toFixed(1) : '0';
  console.log(`📈 Muvaffaqiyat darajasi: ${successRate}%`);
  
  // Joylashuv bo'yicha natijalar
  console.log('\n📍 JOYLASHUV BO\'YICHA:');
  console.log('-'.repeat(50));
  Object.entries(results.byLocation).forEach(([location, data]) => {
    const rate = data.total > 0 ? ((data.working / data.total) * 100).toFixed(1) : '0';
    console.log(`${location}: ${data.working}/${data.total} (${rate}%)`);
  });
  
  // Muammoli tugmalar
  if (results.issues.length > 0) {
    console.log('\n🚨 MUAMMOLI TUGMALAR:');
    console.log('-'.repeat(50));
    results.issues.forEach(issue => {
      console.log(`❌ [${issue.location}] "${issue.text}"`);
      console.log(`   Vazifasi: ${issue.function}`);
      console.log(`   Muammolar: ${issue.issues.join(', ')}`);
      console.log('');
    });
  }
  
  // Tavsiyalar
  console.log('💡 TAVSIYALAR:');
  console.log('-'.repeat(50));
  if (parseFloat(successRate) < 80) {
    console.log('🚨 JIDDIY MUAMMO: Ko\'p tugmalar ishlamayapti!');
    console.log('   1. fixAllButtons() funksiyasini chaqiring');
    console.log('   2. CSS stillarni tekshiring');
    console.log('   3. JavaScript xatolarini ko\'ring');
  } else if (parseFloat(successRate) < 95) {
    console.log('⚠️ Ba\'zi tugmalar muammoli:');
    console.log('   1. Muammoli tugmalarni alohida tekshiring');
    console.log('   2. Event handlerlarni tekshiring');
  } else {
    console.log('🎉 BARCHA TUGMALAR YAXSHI ISHLAYAPTI!');
    console.log('   Saytingiz foydalanish uchun tayyor.');
  }
  
  return results;
}

// Tuzatish funksiyasi
function fixAllButtons() {
  console.log('🔧 BARCHA TUGMALARNI TUZATISH...');
  
  let fixed = 0;
  const allElements = document.querySelectorAll('button, .btn, [role="button"], input[type="submit"], input[type="button"], a[onclick]');
  
  allElements.forEach(element => {
    try {
      // CSS tuzatish
      element.style.cssText += `
        cursor: pointer !important;
        pointer-events: auto !important;
        user-select: none !important;
        position: relative !important;
        z-index: 10 !important;
      `;
      
      // Parent tuzatish
      if (element.parentElement) {
        element.parentElement.style.pointerEvents = 'auto';
      }
      
      // Child elementlar
      element.querySelectorAll('*').forEach(child => {
        child.style.pointerEvents = 'none';
      });
      
      fixed++;
    } catch (e) {
      console.error('Tuzatish xatosi:', e);
    }
  });
  
  console.log(`✅ ${fixed} ta element tuzatildi`);
  return fixed;
}

// Testni ishga tushirish
const testResults = runFinalButtonTest();
const finalResults = showResults(testResults);

// Global funksiyalar
window.fixAllButtons = fixAllButtons;
window.runFinalButtonTest = runFinalButtonTest;
window.lastTestResults = finalResults;

console.log('\n🔧 FOYDALI BUYRUQLAR:');
console.log('fixAllButtons() - Barcha tugmalarni tuzatish');
console.log('runFinalButtonTest() - Testni qayta ishga tushirish');
console.log('window.lastTestResults - Oxirgi test natijalari');

return finalResults;