// TEZKOR TUGMA TESTI - Brauzer konsolida ishga tushiring
console.log('🔍 TEZKOR TUGMA TESTI BOSHLANYAPTI...');

// 1. Barcha tugmalarni sanash
const buttons = document.querySelectorAll('button, .btn, [role="button"], input[type="submit"]');
console.log(`📊 Jami ${buttons.length} ta tugma topildi`);

// 2. Har bir tugmani tekshirish
let working = 0;
let broken = 0;
const issues = [];

buttons.forEach((btn, i) => {
  const text = btn.textContent?.trim() || btn.className || `Button ${i+1}`;
  const styles = getComputedStyle(btn);
  
  const problems = [];
  
  // Asosiy tekshiruvlar
  if (btn.disabled) return; // Skip disabled
  
  if (styles.cursor !== 'pointer') problems.push('cursor xato');
  if (styles.pointerEvents === 'none') problems.push('pointer-events o\'chirilgan');
  if (styles.display === 'none') problems.push('ko\'rinmaydi');
  
  // Click handler tekshirishi
  const hasClick = btn.onclick || btn.getAttribute('onclick') || btn.getAttribute('href');
  if (!hasClick && btn.tagName !== 'BUTTON' && !btn.type) problems.push('click handler yo\'q');
  
  if (problems.length === 0) {
    working++;
    console.log(`✅ ${i+1}. "${text}" - ISHLAYDI`);
  } else {
    broken++;
    issues.push({text, problems});
    console.log(`❌ ${i+1}. "${text}" - MUAMMO: ${problems.join(', ')}`);
  }
});

// 3. Natijalar
console.log('\n📊 NATIJALAR:');
console.log(`Jami: ${buttons.length}`);
console.log(`✅ Ishlaydigan: ${working}`);
console.log(`❌ Muammoli: ${broken}`);
const rate = buttons.length > 0 ? ((working/buttons.length)*100).toFixed(1) : 0;
console.log(`📈 Muvaffaqiyat: ${rate}%`);

// 4. Tavsiyalar
if (rate < 80) {
  console.log('\n🚨 JIDDIY MUAMMO! Tuzatish kerak:');
  console.log('window.emergencyButtonFix() ni ishga tushiring');
} else if (rate < 95) {
  console.log('\n⚠️ Ba\'zi tugmalar muammoli');
} else {
  console.log('\n🎉 Tugmalar yaxshi ishlayapti!');
}

// 5. Favqulodda tuzatish funksiyasi
window.emergencyButtonFix = () => {
  console.log('🚨 FAVQULODDA TUZATISH...');
  let fixed = 0;
  
  document.querySelectorAll('button, .btn, [role="button"], input[type="submit"]').forEach(btn => {
    btn.style.cssText += `
      cursor: pointer !important;
      pointer-events: auto !important;
      user-select: none !important;
      z-index: 999 !important;
    `;
    
    // Child elementlarni bloklash
    btn.querySelectorAll('*').forEach(child => {
      child.style.pointerEvents = 'none';
    });
    
    fixed++;
  });
  
  console.log(`✅ ${fixed} ta tugma tuzatildi`);
};

return { total: buttons.length, working, broken, rate };