// SAYTNING BARCHA TUGMALARINI TEKSHIRISH
// Ushbu skriptni brauzer konsolida ishga tushiring: copy(code) -> paste -> Enter

console.log('🚀 ALISHER MOBILE SAYTINING BARCHA TUGMALARINI TEKSHIRISH');
console.log('=' .repeat(70));

// 1. Barcha tugmalarni topish
const findAllButtons = () => {
  const selectors = [
    'button',
    '.btn',
    '[role="button"]',
    'input[type="submit"]',
    'input[type="button"]',
    'a[onclick]',
    '.clickable',
    '[data-action]',
    '.navigation-link',
    '.nav-item',
    '.sidebar a',
    'nav a'
  ];

  const buttons = new Set();
  
  selectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(element => {
        buttons.add(element);
      });
    } catch (e) {
      console.warn(`Selector xatosi: ${selector}`);
    }
  });
  
  return Array.from(buttons);
};

// 2. Tugma haqida ma'lumot olish
const getButtonInfo = (button) => {
  const rect = button.getBoundingClientRect();
  const styles = window.getComputedStyle(button);
  
  return {
    text: button.textContent?.trim() || 
          button.title || 
          button.getAttribute('aria-label') || 
          button.className ||
          'Nomsiz tugma',
    tagName: button.tagName,
    className: button.className,
    id: button.id,
    type: button.type,
    disabled: button.disabled || button.classList.contains('disabled'),
    visible: rect.width > 0 && rect.height > 0 && 
             styles.display !== 'none' && 
             styles.visibility !== 'hidden' && 
             styles.opacity !== '0',
    position: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
    styles: {
      cursor: styles.cursor,
      pointerEvents: styles.pointerEvents,
      zIndex: styles.zIndex
    },
    hasClickHandler: !!(button.onclick || 
                       button.getAttribute('onclick') || 
                       button.getAttribute('href') ||
                       Object.keys(button).some(key => key.startsWith('__react'))),
    parent: button.parentElement?.tagName,
    location: getButtonLocation(button)
  };
};

// 3. Tugma qayerda joylashganini aniqlash
const getButtonLocation = (button) => {
  if (button.closest('.modal')) return 'Modal';
  if (button.closest('nav') || button.closest('.nav') || button.closest('header')) return 'Navigation';
  if (button.closest('.sidebar')) return 'Sidebar';
  if (button.closest('form')) return 'Form';
  if (button.closest('.cart')) return 'Cart';
  if (button.closest('.admin-panel')) return 'Admin Panel';
  if (button.closest('.website-page')) return 'Website';
  if (button.classList.contains('edit-btn') || button.title?.includes('tahrirlash')) return 'Edit';
  if (button.classList.contains('delete-btn') || button.title?.includes('o\'chir')) return 'Delete';
  return 'Other';
};

// 4. Tugmani test qilish
const testButton = (button) => {
  const info = getButtonInfo(button);
  const issues = [];
  
  // Faol emas tugmalarni o'tkazib yuborish
  if (info.disabled) {
    return { ...info, issues: ['disabled'], status: 'skipped' };
  }
  
  // Ko'rinish tekshiruvi
  if (!info.visible) {
    issues.push('ko\'rinmaydi');
  }
  
  // Stil tekshiruvi
  if (info.styles.cursor !== 'pointer') {
    issues.push('cursor xato');
  }
  
  if (info.styles.pointerEvents === 'none') {
    issues.push('pointer-events o\'chirilgan');
  }
  
  // Click handler tekshiruvi
  if (!info.hasClickHandler && info.tagName !== 'BUTTON' && !info.type) {
    issues.push('click handler yo\'q');
  }
  
  // Overlay tekshiruvi (faqat ko'rinadigan tugmalar uchun)
  if (info.visible && info.position.width > 0) {
    try {
      const centerX = info.position.x + info.position.width / 2;
      const centerY = info.position.y + info.position.height / 2;
      const elementAtCenter = document.elementFromPoint(centerX, centerY);
      
      if (elementAtCenter && elementAtCenter !== button && !button.contains(elementAtCenter)) {
        issues.push('boshqa element bilan qoplangan');
      }
    } catch (e) {
      issues.push('pozitsiya tekshiruvida xato');
    }
  }
  
  return {
    ...info,
    issues,
    status: issues.length === 0 ? 'working' : 'broken'
  };
};

// 5. Asosiy test funksiyasi
const runCompleteButtonTest = () => {
  const startTime = Date.now();
  console.log('🔍 Test boshlanyapti...\n');
  
  const allButtons = findAllButtons();
  console.log(`📊 Jami ${allButtons.length} ta tugma topildi\n`);
  
  const results = {
    total: allButtons.length,
    working: 0,
    broken: 0,
    skipped: 0,
    byLocation: {},
    byType: {},
    issues: {},
    buttons: []
  };
  
  // Har bir tugmani test qilish
  allButtons.forEach((button, index) => {
    const result = testButton(button);
    results.buttons.push(result);
    
    // Statistikani yangilash
    if (result.status === 'working') {
      results.working++;
    } else if (result.status === 'broken') {
      results.broken++;
    } else {
      results.skipped++;
    }
    
    // Joylashuv bo'yicha statistika
    if (!results.byLocation[result.location]) {
      results.byLocation[result.location] = { total: 0, working: 0, broken: 0 };
    }
    results.byLocation[result.location].total++;
    if (result.status === 'working') results.byLocation[result.location].working++;
    if (result.status === 'broken') results.byLocation[result.location].broken++;
    
    // Muammolar statistikasi
    result.issues.forEach(issue => {
      results.issues[issue] = (results.issues[issue] || 0) + 1;
    });
    
    // Natijani konsolga chiqarish
    const status = result.status === 'working' ? '✅' : 
                  result.status === 'broken' ? '❌' : '⏭️';
    console.log(`${status} ${index + 1}. [${result.location}] "${result.text}" ${
      result.issues.length > 0 ? `- ${result.issues.join(', ')}` : ''
    }`);
  });
  
  // Umumiy natijalar
  const duration = Date.now() - startTime;
  console.log('\n' + '='.repeat(70));
  console.log('📊 YAKUNIY NATIJALAR:');
  console.log('='.repeat(70));
  console.log(`Jami tugmalar: ${results.total}`);
  console.log(`✅ Ishlaydigan: ${results.working}`);
  console.log(`❌ Muammoli: ${results.broken}`);
  console.log(`⏭️ O'tkazib yuborilgan: ${results.skipped}`);
  
  const successRate = results.total > 0 ? 
    ((results.working / (results.total - results.skipped)) * 100).toFixed(1) : '0';
  console.log(`📈 Muvaffaqiyat darajasi: ${successRate}%`);
  console.log(`⏱️ Test vaqti: ${duration}ms\n`);
  
  // Joylashuv bo'yicha natijalar
  console.log('📍 JOYLASHUV BO\'YICHA:');
  console.log('-'.repeat(50));
  Object.entries(results.byLocation).forEach(([location, data]) => {
    const rate = data.total > 0 ? ((data.working / data.total) * 100).toFixed(1) : '0';
    console.log(`${location}: ${data.working}/${data.total} (${rate}%)`);
  });
  
  // Eng ko'p uchraydigan muammolar
  console.log('\n🚨 ENG KO\'P UCHRAYDIGAN MUAMMOLAR:');
  console.log('-'.repeat(50));
  const sortedIssues = Object.entries(results.issues)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
    
  if (sortedIssues.length === 0) {
    console.log('🎉 Hech qanday muammo topilmadi!');
  } else {
    sortedIssues.forEach(([issue, count]) => {
      console.log(`${issue}: ${count} ta tugma`);
    });
  }
  
  // Tavsiyalar
  console.log('\n💡 TAVSIYALAR:');
  console.log('-'.repeat(50));
  
  if (parseFloat(successRate) < 80) {
    console.log('🚨 JIDDIY MUAMMO: Ko\'p tugmalar ishlamayapti!');
    console.log('   - window.emergencyButtonFix() ni ishga tushiring');
    console.log('   - CSS stillarni tekshiring');
    console.log('   - React komponentlarni qayta ko\'ring');
  } else if (parseFloat(successRate) < 95) {
    console.log('⚠️ BA\'ZI TUGMALAR MUAMMOLI:');
    console.log('   - Muammoli tugmalarni qo\'lda tekshiring');
    console.log('   - Event handlerlarni tekshiring');
  } else {
    console.log('🎉 TUGMALAR YAXSHI ISHLAYAPTI!');
    console.log('   - Foydalanuvchi tajribasini yaxshilash mumkin');
  }
  
  console.log('\n🔧 FOYDALI BUYRUQLAR:');
  console.log('-'.repeat(50));
  console.log('window.emergencyButtonFix() - Favqulodda tuzatish');
  console.log('window.buttonEnhancer.testAllButtons() - ButtonEnhancer testi');
  console.log('document.querySelectorAll(\'button\').length - Tugmalar soni');
  
  return results;
};

// 6. Favqulodda tuzatish funksiyasi
window.emergencyButtonFix = () => {
  console.log('🚨 FAVQULODDA TUGMA TUZATISH ISHGA TUSHIRILDI...');
  
  let fixed = 0;
  const buttons = findAllButtons();
  
  buttons.forEach(button => {
    try {
      // Asosiy stillarni majburiy qo'llash
      button.style.cssText += `
        cursor: pointer !important;
        pointer-events: auto !important;
        user-select: none !important;
        position: relative !important;
        z-index: 999 !important;
        text-decoration: none !important;
      `;
      
      // Ota-elementga ham ta'sir qilish
      if (button.parentElement) {
        button.parentElement.style.pointerEvents = 'auto';
      }
      
      // Bola elementlarning click eventlarini o'chirish
      const children = button.querySelectorAll('*');
      children.forEach(child => {
        child.style.pointerEvents = 'none';
      });
      
      // Debug uchun click listener qo'shish
      if (!button.onclick && !button.getAttribute('onclick') && !button.href) {
        button.addEventListener('click', function(e) {
          console.log(`🔧 Favqulodda handler: "${this.textContent?.trim() || this.className}"`);
        });
      }
      
      fixed++;
    } catch (e) {
      console.error(`Tugmani tuzatishda xato:`, e);
    }
  });
  
  console.log(`✅ ${fixed} ta tugma tuzatildi`);
  
  // Tuzatishdan keyin qayta tekshirish
  setTimeout(() => {
    console.log('🔍 Tuzatishdan keyin qayta tekshirish...');
    runCompleteButtonTest();
  }, 500);
};

// Testni ishga tushirish
const testResults = runCompleteButtonTest();

// Global o'zgaruvchiga saqlash (keyinchalik foydalanish uchun)
window.lastButtonTest = testResults;

console.log('\n' + '='.repeat(70));
console.log('Test yakunlandi. window.lastButtonTest da natijalarni ko\'ring.');
console.log('Agar muammolar bo\'lsa, window.emergencyButtonFix() ni ishga tushiring.');
console.log('='.repeat(70));