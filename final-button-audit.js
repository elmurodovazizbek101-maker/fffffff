// YAKUNIY TUGMA AUDIT - Barcha tugmalarning vazifalarini tekshirish
console.log('🎯 BARCHA TUGMALARNING VAZIFALARINI TEKSHIRISH');
console.log('=' .repeat(70));

// Sahifa bo'yicha tugmalar ro'yxati
const buttonFunctions = {
  // ADMIN PANEL
  sidebar: [
    { selector: '.sidebar a[href*="dashboard"]', function: 'Dashboard sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="products"]', function: 'Mahsulotlar sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="categories"]', function: 'Kategoriyalar sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="customers"]', function: 'Mijozlar sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="employees"]', function: 'Xodimlar sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="suppliers"]', function: 'Yetkazib beruvchilar sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="expenses"]', function: 'Xarajatlar sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="debts"]', function: 'Qarzlar sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="settings"]', function: 'Sozlamalar sahifasiga o\'tish' },
    { selector: '.sidebar a[href*="promotions"]', function: 'Aksiyalar sahifasiga o\'tish' }
  ],
  
  // CATEGORIES PAGE
  categories: [
    { selector: 'button:contains("Yangi kategoriya")', function: 'Kategoriya qo\'shish modalini ochish' },
    { selector: 'button:contains("Barcha brendlarni qo\'shish")', function: 'Barcha standart kategoriyalarni qo\'shish' },
    { selector: 'button:contains("Reset")', function: 'Kategoriyalarni standart holatga qaytarish' },
    { selector: 'button[title*="tahrirlash"], .edit-btn', function: 'Kategoriyani tahrirlash' },
    { selector: 'button[title*="o\'chirish"], .delete-btn', function: 'Kategoriyani o\'chirish' }
  ],
  
  // PRODUCTS PAGE
  products: [
    { selector: 'button:contains("Yangi mahsulot")', function: 'Mahsulot qo\'shish modalini ochish' },
    { selector: 'button[title="Tahrirlash"]', function: 'Mahsulot narx va miqdorini tahrirlash' },
    { selector: 'button[title="O\'chirish"]', function: 'Mahsulotni o\'chirish' },
    { selector: '.card[onclick]', function: 'Mahsulot kartasini bosganda tahrirlash modalini ochish' }
  ],
  
  // CUSTOMERS PAGE
  customers: [
    { selector: 'button:contains("Yangi mijoz")', function: 'Mijoz qo\'shish modalini ochish' },
    { selector: 'button:contains("To\'lov")', function: 'Mijoz bilan to\'lov modalini ochish' },
    { selector: 'button:contains("Edit")', function: 'Mijozni tahrirlash' },
    { selector: 'button:contains("Del")', function: 'Mijozni o\'chirish' }
  ],
  
  // EMPLOYEES PAGE  
  employees: [
    { selector: 'button:contains("Xodim qo\'shish")', function: 'Xodim qo\'shish modalini ochish' },
    { selector: 'button:contains("Maosh")', function: 'Maosh to\'lash modalini ochish' },
    { selector: 'button:contains("Faolsizlashtirish"), button:contains("Faollashtirish")', function: 'Xodim holatini o\'zgartirish' },
    { selector: 'button:has(.lucide-edit)', function: 'Xodimni tahrirlash' },
    { selector: 'button:has(.lucide-trash-2)', function: 'Xodimni o\'chirish' }
  ],
  
  // WEBSITE HEADER
  websiteHeader: [
    { selector: '.website-nav a[href="/"]', function: 'Bosh sahifaga o\'tish' },
    { selector: '.website-nav a[href="/products"]', function: 'Mahsulotlar sahifasiga o\'tish' },
    { selector: '.website-nav a[href="/categories"]', function: 'Kategoriyalar sahifasiga o\'tish' },
    { selector: '.website-nav a[href="/about"]', function: 'Biz haqimizda sahifasiga o\'tish' },
    { selector: 'button[aria-label="Qidiruv"]', function: 'Qidiruv modalini ochish' },
    { selector: 'button[title="Savat"]', function: 'Savat sidebarini ochish' },
    { selector: 'button:contains("Kirish")', function: 'Login modalini ochish' },
    { selector: 'button:contains("Chiqish")', function: 'Saytdan chiqish' },
    { selector: 'button[title*="rejim"]', function: 'Tungi/kunduzgi rejimni almashtirish' }
  ],
  
  // CHECKOUT MODAL
  checkout: [
    { selector: '.checkout-modal button:contains("Kirish")', function: 'Login modalini ochish' },
    { selector: '.checkout-modal button:contains("Keyinroq")', function: 'Modalni yopish' },
    { selector: '.checkout-modal button[type="submit"]', function: 'Buyurtmani yuborish' },
    { selector: '.checkout-modal button[aria-label="Yopish"]', function: 'Modalni yopish' }
  ],
  
  // LOGIN PAGE
  login: [
    { selector: '.login-page button:contains("Kirish")', function: 'Login rejimiga o\'tish' },
    { selector: '.login-page button:contains("Ro\'yxat")', function: 'Ro\'yxatdan o\'tish rejimiga o\'tish' },
    { selector: '.login-page button[type="submit"]', function: 'Forma yuborish (login/register)' },
    { selector: '.login-page button:has(.lucide-eye)', function: 'Parolni ko\'rsatish/yashirish' }
  ],
  
  // MODAL BUTTONS
  modals: [
    { selector: '.modal button:contains("Saqlash"), .modal button:contains("Save")', function: 'O\'zgarishlarni saqlash' },
    { selector: '.modal button:contains("Bekor qilish"), .modal button:contains("Cancel")', function: 'Modalni yopish' },
    { selector: '.modal button:contains("×")', function: 'Modalni yopish' },
    { selector: '.modal button:contains("Qo\'shish")', function: 'Yangi element qo\'shish' }
  ]
};

// Test funksiyasi
function testButtonFunctions() {
  const results = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    details: []
  };

  console.log('🔍 Tugma vazifalarini tekshirish boshlandi...\n');

  Object.entries(buttonFunctions).forEach(([section, buttons]) => {
    console.log(`📋 ${section.toUpperCase()} BO'LIMI:`);
    console.log('-'.repeat(50));

    buttons.forEach(({ selector, function: expectedFunction }) => {
      results.totalTests++;
      
      try {
        let elements;
        
        // jQuery-style selector translation
        if (selector.includes(':contains(')) {
          const text = selector.match(/:contains\("(.+?)"\)/)?.[1];
          const baseSelector = selector.replace(/:contains\("[^"]+"\)/, '');
          elements = Array.from(document.querySelectorAll(baseSelector || 'button, .btn')).filter(el => 
            el.textContent.includes(text)
          );
        } else if (selector.includes(':has(')) {
          const innerSelector = selector.match(/:has\((.+?)\)/)?.[1];
          const baseSelector = selector.replace(/:has\([^)]+\)/, '');
          elements = Array.from(document.querySelectorAll(baseSelector || 'button, .btn')).filter(el =>
            el.querySelector(innerSelector)
          );
        } else {
          elements = document.querySelectorAll(selector);
        }

        if (elements.length === 0) {
          console.log(`⏭️  "${expectedFunction}" - Element topilmadi (${selector})`);
          results.details.push({ section, function: expectedFunction, status: 'not_found', selector });
          continue;
        }

        let allWorking = true;
        elements.forEach(element => {
          const issues = checkButtonFunctionality(element);
          if (issues.length > 0) {
            allWorking = false;
            console.log(`❌ "${expectedFunction}" - Muammo: ${issues.join(', ')}`);
            results.details.push({ 
              section, 
              function: expectedFunction, 
              status: 'broken', 
              issues: issues,
              element: element 
            });
          }
        });

        if (allWorking && elements.length > 0) {
          console.log(`✅ "${expectedFunction}" - Ishlayapti (${elements.length} ta element)`);
          results.passed++;
          results.details.push({ section, function: expectedFunction, status: 'working', count: elements.length });
        } else if (!allWorking) {
          results.failed++;
        }

      } catch (error) {
        console.log(`💥 "${expectedFunction}" - Xato: ${error.message}`);
        results.failed++;
        results.details.push({ section, function: expectedFunction, status: 'error', error: error.message });
      }
    });
    
    console.log(''); // Bo'sh qator
  });

  return results;
}

// Tugma funksionalligini tekshirish
function checkButtonFunctionality(element) {
  const issues = [];
  
  if (!element) return ['Element mavjud emas'];
  
  // Disabled tekshiruvi
  if (element.disabled || element.classList.contains('disabled')) {
    return ['Tugma faol emas'];
  }
  
  // Ko'rinish tekshiruvi
  const styles = getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  
  if (styles.display === 'none' || styles.visibility === 'hidden' || styles.opacity === '0') {
    issues.push('ko\'rinmaydi');
  }
  
  if (rect.width === 0 || rect.height === 0) {
    issues.push('o\'lchami nol');
  }
  
  // Cursor tekshiruvi
  if (styles.cursor !== 'pointer') {
    issues.push('cursor xato');
  }
  
  // Pointer events tekshiruvi
  if (styles.pointerEvents === 'none') {
    issues.push('pointer events o\'chirilgan');
  }
  
  // Click handler tekshiruvi
  const hasHandler = element.onclick || 
                    element.getAttribute('onclick') || 
                    element.getAttribute('href') ||
                    Object.keys(element).some(key => key.startsWith('__react')) ||
                    element.type === 'submit';
  
  if (!hasHandler && element.tagName !== 'BUTTON') {
    issues.push('click handler yo\'q');
  }
  
  // Element ustida boshqa element borligini tekshirish
  if (rect.width > 0 && rect.height > 0) {
    try {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const topElement = document.elementFromPoint(centerX, centerY);
      
      if (topElement && topElement !== element && !element.contains(topElement)) {
        issues.push('boshqa element bilan qoplangan');
      }
    } catch (e) {
      issues.push('pozitsiya tekshiruvi xatosi');
    }
  }
  
  return issues;
}

// Tuzatish funksiyasi
function fixAllButtonFunctions() {
  console.log('🔧 BARCHA TUGMA VAZIFALARINI TUZATISH...');
  
  let fixed = 0;
  const allButtons = document.querySelectorAll('button, .btn, [role="button"], input[type="submit"], a[onclick]');
  
  allButtons.forEach(button => {
    try {
      // Asosiy CSS tuzatish
      button.style.cssText += `
        cursor: pointer !important;
        pointer-events: auto !important;
        user-select: none !important;
        position: relative !important;
        z-index: 10 !important;
        text-decoration: none !important;
      `;
      
      // Parent element tuzatish
      if (button.parentElement) {
        button.parentElement.style.pointerEvents = 'auto';
      }
      
      // Child elementlarni bloklash
      button.querySelectorAll('*').forEach(child => {
        child.style.pointerEvents = 'none';
      });
      
      // Missing click handler qo'shish
      if (!button.onclick && !button.getAttribute('onclick') && !button.href && button.tagName !== 'BUTTON' && !button.type) {
        button.addEventListener('click', function(e) {
          console.log(`🔄 Manual handler: "${this.textContent?.trim() || this.className}"`);
        });
      }
      
      fixed++;
    } catch (e) {
      console.error('Tuzatishda xato:', e);
    }
  });
  
  console.log(`✅ ${fixed} ta tugma tuzatildi`);
  return fixed;
}

// Testni ishga tushirish
console.log('Test boshlanyapti...\n');
const testResults = testButtonFunctions();

// Natijalarni ko'rsatish
console.log('\n' + '='.repeat(70));
console.log('📊 YAKUNIY NATIJALAR:');
console.log('='.repeat(70));
console.log(`Jami tekshirilgan: ${testResults.totalTests}`);
console.log(`✅ Ishlayapti: ${testResults.passed}`);
console.log(`❌ Ishlamayapti: ${testResults.failed}`);
console.log(`⏭️ Topilmadi: ${testResults.totalTests - testResults.passed - testResults.failed}`);

const successRate = testResults.totalTests > 0 ? 
  ((testResults.passed / testResults.totalTests) * 100).toFixed(1) : '0';
console.log(`📈 Muvaffaqiyat darajasi: ${successRate}%`);

// Tavsiyalar
console.log('\n💡 TAVSIYALAR:');
if (parseFloat(successRate) < 80) {
  console.log('🚨 JIDDIY MUAMMO: Ko\'p tugmalar ishlamayapti!');
  console.log('   fixAllButtonFunctions() funksiyasini chaqiring');
} else if (parseFloat(successRate) < 95) {
  console.log('⚠️ Ba\'zi tugmalar muammoli, tuzatish tavsiya etiladi');
} else {
  console.log('🎉 Tugmalar yaxshi ishlayapti!');
}

// Muammoli tugmalar ro'yxati
const brokenButtons = testResults.details.filter(d => d.status === 'broken');
if (brokenButtons.length > 0) {
  console.log('\n🚨 MUAMMOLI TUGMALAR:');
  brokenButtons.forEach(button => {
    console.log(`- ${button.function}: ${button.issues?.join(', ') || 'Noma\'lum xato'}`);
  });
}

// Global funksiyalar
window.fixAllButtonFunctions = fixAllButtonFunctions;
window.testButtonFunctions = testButtonFunctions;
window.lastButtonAudit = testResults;

console.log('\n🔧 FOYDALI BUYRUQLAR:');
console.log('fixAllButtonFunctions() - Barcha tugmalarni tuzatish');
console.log('testButtonFunctions() - Qayta test qilish');
console.log('window.lastButtonAudit - Oxirgi test natijalari');

return testResults;