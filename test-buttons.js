// TUGMALAR TEKSHIRISH SKRIPTI
// Ushbu skriptni brauzer konsolida ishga tushiring

console.log('🔍 BARCHA TUGMALARNI TEKSHIRISHNI BOSHLAYAPMAN...')
console.log('=' .repeat(60))

// Tugmalarni turlariga bo'lib tekshirish
const buttonTypes = {
  navigation: {
    selectors: ['nav a', '.nav-item', '.navigation-link', '.website-nav a', 'header a'],
    name: 'NAVIGATSIYA TUGMALARI'
  },
  admin: {
    selectors: ['.sidebar a', '.admin-panel button', '.admin-page button'],
    name: 'ADMIN PANEL TUGMALARI'
  },
  crud: {
    selectors: ['[title="Tahrirlash"]', '[title="O\'chirish"]', '.edit-btn', '.delete-btn', 'button:has(.lucide-edit)', 'button:has(.lucide-trash-2)'],
    name: 'CRUD TUGMALARI (Tahrirlash/O\'chirish)'
  },
  modal: {
    selectors: ['.modal button', '.modal .btn', 'button:contains("Saqlash")', 'button:contains("Bekor qilish")', 'button:contains("×")'],
    name: 'MODAL TUGMALARI'
  },
  cart: {
    selectors: ['.cart button', '.add-to-cart', '.buy-now', 'button[title="Savat"]'],
    name: 'SAVAT TUGMALARI'
  },
  auth: {
    selectors: ['button:contains("Kirish")', 'button:contains("Chiqish")', '.login-btn', '.logout-btn'],
    name: 'AUTENTIFIKATSIYA TUGMALARI'
  },
  form: {
    selectors: ['form button', 'input[type="submit"]', 'button[type="submit"]'],
    name: 'FORMA TUGMALARI'
  }
}

// Yordamchi funksiyalar
function getButtonText(button) {
  return button.textContent?.trim() || 
         button.title || 
         button.getAttribute('aria-label') ||
         button.className ||
         'Nomsiz tugma'
}

function testButtonFunctionality(button) {
  const issues = []
  const text = getButtonText(button)
  
  // Faol bo'lmagan tugmalarni o'tkazib yuborish
  if (button.disabled || button.classList.contains('disabled')) {
    return { text, issues: ['o\'chirilgan'], working: true }
  }
  
  // Ko'rinish tekshiruvi
  const styles = window.getComputedStyle(button)
  if (styles.display === 'none' || styles.visibility === 'hidden' || styles.opacity === '0') {
    issues.push('ko\'rinmaydi')
  }
  
  // Stil tekshiruvi
  if (styles.cursor !== 'pointer') {
    issues.push('cursor xato')
  }
  
  if (styles.pointerEvents === 'none') {
    issues.push('pointer-events o\'chirilgan')
  }
  
  // Click handler tekshiruvi
  const hasClickHandler = button.onclick || 
                         button.getAttribute('onclick') ||
                         button.getAttribute('href') ||
                         Object.keys(button).some(key => key.startsWith('__react')) ||
                         button.type === 'submit'
  
  if (!hasClickHandler && button.tagName !== 'BUTTON') {
    issues.push('click handler yo\'q')
  }
  
  // Overlay tekshiruvi
  try {
    const rect = button.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const elementAtCenter = document.elementFromPoint(centerX, centerY)
      
      if (elementAtCenter && elementAtCenter !== button && !button.contains(elementAtCenter)) {
        issues.push('boshqa element tomonidan yashirilgan')
      }
    }
  } catch (e) {
    issues.push('pozitsiya xatosi')
  }
  
  return {
    text,
    issues,
    working: issues.length === 0,
    element: button
  }
}

// Har bir tur bo'yicha tekshirish
const allResults = {
  total: 0,
  working: 0,
  broken: 0,
  details: {}
}

Object.entries(buttonTypes).forEach(([typeKey, typeInfo]) => {
  console.log(`\n🔍 ${typeInfo.name} tekshirilmoqda...`)
  
  const buttons = new Set()
  
  // Selectorlar orqali tugmalarni topish
  typeInfo.selectors.forEach(selector => {
    try {
      // jQuery-style selectorlarni oddiy CSS selectorlarga o'girish
      if (selector.includes(':contains(')) {
        const text = selector.match(/:contains\("(.+?)"\)/)?.[1]
        if (text) {
          document.querySelectorAll('button, .btn').forEach(btn => {
            if (btn.textContent.includes(text)) {
              buttons.add(btn)
            }
          })
        }
      } else if (selector.includes(':has(')) {
        const innerSelector = selector.match(/:has\((.+?)\)/)?.[1]
        if (innerSelector) {
          document.querySelectorAll('button, .btn').forEach(btn => {
            if (btn.querySelector(innerSelector)) {
              buttons.add(btn)
            }
          })
        }
      } else {
        document.querySelectorAll(selector).forEach(element => {
          if (element.tagName === 'BUTTON' || 
              element.classList.contains('btn') || 
              element.getAttribute('role') === 'button' ||
              element.tagName === 'A' ||
              element.type === 'submit') {
            buttons.add(element)
          }
        })
      }
    } catch (e) {
      console.warn(`Selector xatosi (${selector}):`, e.message)
    }
  })
  
  // Tugmalarni tekshirish
  const typeResults = {
    total: buttons.size,
    working: 0,
    broken: 0,
    issues: []
  }
  
  buttons.forEach((button, index) => {
    const result = testButtonFunctionality(button)
    
    allResults.total++
    typeResults.total++
    
    if (result.working) {
      allResults.working++
      typeResults.working++
      console.log(`  ✅ ${index + 1}. "${result.text}" - ISHLAYDI`)
    } else {
      allResults.broken++
      typeResults.broken++
      typeResults.issues.push(result)
      console.log(`  ❌ ${index + 1}. "${result.text}" - MUAMMO: ${result.issues.join(', ')}`)
    }
  })
  
  allResults.details[typeKey] = typeResults
  
  // Tur bo'yicha natijalar
  if (typeResults.total > 0) {
    const successRate = ((typeResults.working / typeResults.total) * 100).toFixed(1)
    console.log(`  📊 ${typeInfo.name}: ${typeResults.working}/${typeResults.total} (${successRate}%)`)
  } else {
    console.log(`  📊 ${typeInfo.name}: Tugmalar topilmadi`)
  }
})

// Qo'shimcha: barcha tugmalarni umumiy tekshirish
console.log(`\n🔍 BARCHA TUGMALARNI UMUMIY TEKSHIRISH...`)
const allButtons = document.querySelectorAll('button, .btn, [role="button"], input[type="submit"], input[type="button"], a[onclick]')

console.log(`\n📊 YAKUNIY NATIJALAR:`)
console.log('=' .repeat(60))
console.log(`Jami tugmalar: ${allButtons.length}`)
console.log(`Ishlaydigan tugmalar: ${allResults.working}`)
console.log(`Muammoli tugmalar: ${allResults.broken}`)

if (allResults.total > 0) {
  const overallSuccessRate = ((allResults.working / allResults.total) * 100).toFixed(1)
  console.log(`Umumiy muvaffaqiyat darajasi: ${overallSuccessRate}%`)
} else {
  console.log(`Umumiy muvaffaqiyat darajasi: 0%`)
}

console.log(`\n📋 TURLAR BO'YICHA BATAFSIL:`)
Object.entries(allResults.details).forEach(([typeKey, data]) => {
  const typeInfo = buttonTypes[typeKey]
  if (data.total > 0) {
    const rate = ((data.working / data.total) * 100).toFixed(1)
    console.log(`  ${typeInfo.name}: ${data.working}/${data.total} (${rate}%)`)
    
    if (data.issues.length > 0) {
      console.log(`    Muammolar:`)
      data.issues.forEach(issue => {
        console.log(`      - "${issue.text}": ${issue.issues.join(', ')}`)
      })
    }
  }
})

// Eng ko'p uchraydigan muammolar
console.log(`\n🚨 ENG KO'P UCHRAYDIGAN MUAMMOLAR:`)
const issueCount = {}
Object.values(allResults.details).forEach(typeData => {
  typeData.issues.forEach(item => {
    item.issues.forEach(issue => {
      issueCount[issue] = (issueCount[issue] || 0) + 1
    })
  })
})

const sortedIssues = Object.entries(issueCount).sort(([,a], [,b]) => b - a)
if (sortedIssues.length > 0) {
  sortedIssues.forEach(([issue, count]) => {
    console.log(`  ${issue}: ${count} ta tugma`)
  })
} else {
  console.log(`  🎉 Hech qanday muammo topilmadi!`)
}

// Tavsiyalar
console.log(`\n💡 TAVSIYALAR:`)
if (allResults.working / allResults.total < 0.8) {
  console.log(`🚨 Tugmalar muvaffaqiyat darajasi past (${((allResults.working / allResults.total) * 100).toFixed(1)}%)`)
  console.log(`   - window.emergencyButtonFix() ni ishga tushiring`)
  console.log(`   - CSS stillarni tekshiring`)
  console.log(`   - React komponentlarni tekshiring`)
} else if (allResults.working / allResults.total < 0.95) {
  console.log(`⚠️  Ba'zi tugmalar ishlamayapti`)
  console.log(`   - Muammoli tugmalarni qo'lda tekshiring`)
  console.log(`   - Event handlerlarni tekshiring`)
} else {
  console.log(`🎉 Tugmalar yaxshi ishlayapti!`)
  console.log(`   - Foydalanuvchi tajribasini yaxshilash uchun animatsiyalar qo'shing`)
}

console.log(`\n🔧 QO'SHIMCHA BUYRUQLAR:`)
console.log(`  - window.buttonEnhancer.testAllButtons() - ButtonEnhancer testi`)
console.log(`  - window.emergencyButtonFix() - Favqulodda tuzatish`)
console.log(`  - document.querySelectorAll('button') - Barcha tugmalarni ko'rish`)

return {
  total: allResults.total,
  working: allResults.working,
  broken: allResults.broken,
  successRate: ((allResults.working / allResults.total) * 100).toFixed(1),
  details: allResults.details
}