// Comprehensive Button Functionality Test Script
// Run this in browser console to test all buttons

console.log('🔧 Starting comprehensive button functionality test...')

// Test results object
const testResults = {
  total: 0,
  working: 0,
  issues: [],
  buttonTypes: {
    navigation: { total: 0, working: 0, issues: [] },
    crud: { total: 0, working: 0, issues: [] },
    modal: { total: 0, working: 0, issues: [] },
    cart: { total: 0, working: 0, issues: [] },
    auth: { total: 0, working: 0, issues: [] },
    form: { total: 0, working: 0, issues: [] }
  }
}

// Button selectors by type
const buttonSelectors = {
  navigation: [
    'nav a', '.nav-item', '.navigation-link', '[data-navigation]',
    '.website-nav a', '.sidebar a', 'header a'
  ],
  crud: [
    '[title="Tahrirlash"]', '[title="O\'chirish"]', 
    'button:has(.lucide-edit)', 'button:has(.lucide-trash-2)',
    '.btn:contains("Edit")', '.btn:contains("Del")', '.btn:contains("Delete")'
  ],
  modal: [
    '.modal button', '.modal .btn', '[data-modal]',
    'button:contains("Saqlash")', 'button:contains("Bekor qilish")',
    'button:contains("×")', '.modal-overlay button'
  ],
  cart: [
    '[data-cart]', '.cart button', '.add-to-cart',
    'button:has(.lucide-shopping-cart)', '[title="Savat"]'
  ],
  auth: [
    'button:contains("Kirish")', 'button:contains("Chiqish")',
    'button:contains("Login")', 'button:contains("Logout")',
    '[data-auth]', '.auth-button'
  ],
  form: [
    'form button', 'form .btn', 'input[type="submit"]',
    'button[type="submit"]', 'button[type="button"]'
  ]
}

// Utility functions
const getButtonText = (button) => {
  return button.textContent?.trim() || 
         button.title || 
         button.getAttribute('aria-label') ||
         button.className ||
         'Unnamed Button'
}

const isButtonVisible = (button) => {
  const style = window.getComputedStyle(button)
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         style.opacity !== '0'
}

const hasClickHandler = (button) => {
  return !!(
    button.onclick ||
    button.getAttribute('onclick') ||
    button.getAttribute('data-enhanced') ||
    Object.keys(button).some(key => key.startsWith('__react')) ||
    button._listeners ||
    button.hasAttribute('data-action')
  )
}

const testButtonStyle = (button) => {
  const styles = window.getComputedStyle(button)
  const issues = []
  
  if (styles.cursor !== 'pointer') {
    issues.push('cursor not pointer')
  }
  
  if (styles.pointerEvents === 'none') {
    issues.push('pointer-events disabled')
  }
  
  if (styles.position === 'absolute' && styles.zIndex < 1) {
    issues.push('low z-index')
  }
  
  return issues
}

const testButton = (button, type = 'unknown') => {
  const issues = []
  const text = getButtonText(button)
  
  testResults.total++
  testResults.buttonTypes[type].total++
  
  // Skip disabled buttons
  if (button.disabled || button.classList.contains('disabled')) {
    return { issues: ['disabled'], text }
  }
  
  // Check visibility
  if (!isButtonVisible(button)) {
    issues.push('not visible')
  }
  
  // Check styles
  const styleIssues = testButtonStyle(button)
  issues.push(...styleIssues)
  
  // Check click handler
  if (!hasClickHandler(button)) {
    issues.push('no click handler')
  }
  
  // Check if button is clickable (not covered by overlay)
  try {
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const elementAtCenter = document.elementFromPoint(centerX, centerY)
    
    if (elementAtCenter !== button && !button.contains(elementAtCenter)) {
      issues.push('covered by overlay')
    }
  } catch (e) {
    issues.push('position check failed')
  }
  
  // Update results
  if (issues.length === 0) {
    testResults.working++
    testResults.buttonTypes[type].working++
  } else {
    testResults.issues.push({ text, issues, type })
    testResults.buttonTypes[type].issues.push({ text, issues })
  }
  
  return { issues, text }
}

// Test all buttons by type
const testButtonsByType = (type, selectors) => {
  console.log(`\n🔍 Testing ${type} buttons...`)
  
  const buttons = new Set()
  
  // Collect all buttons using selectors
  selectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(button => {
        if (button.tagName === 'BUTTON' || 
            button.tagName === 'A' || 
            button.tagName === 'INPUT' ||
            button.getAttribute('role') === 'button') {
          buttons.add(button)
        }
      })
    } catch (e) {
      console.warn(`Invalid selector: ${selector}`)
    }
  })
  
  // Also find buttons by text content for this type
  const textPatterns = {
    navigation: ['Bosh sahifa', 'Mahsulotlar', 'Kataloglar', 'Biz haqimizda', 'Dashboard'],
    crud: ['Edit', 'Del', 'Delete', 'Tahrirlash', 'O\'chirish', 'Yangilash'],
    modal: ['Saqlash', 'Save', 'Bekor qilish', 'Cancel', 'Close', '×'],
    cart: ['Savat', 'Cart', 'Sotib olish', 'Buy'],
    auth: ['Kirish', 'Chiqish', 'Login', 'Logout', 'Register'],
    form: ['Submit', 'Yuborish', 'Qo\'shish', 'Add', 'Create']
  }
  
  if (textPatterns[type]) {
    document.querySelectorAll('button, .btn, [role="button"], a').forEach(button => {
      const text = getButtonText(button).toLowerCase()
      if (textPatterns[type].some(pattern => text.includes(pattern.toLowerCase()))) {
        buttons.add(button)
      }
    })
  }
  
  // Test each button
  buttons.forEach((button, index) => {
    const result = testButton(button, type)
    
    if (result.issues.length === 0) {
      console.log(`✅ ${type} button ${index + 1}: "${result.text}"`)
    } else {
      console.log(`❌ ${type} button ${index + 1}: "${result.text}" - ${result.issues.join(', ')}`)
    }
  })
  
  console.log(`${type} summary: ${testResults.buttonTypes[type].working}/${testResults.buttonTypes[type].total} working`)
}

// Run tests for each button type
Object.keys(buttonSelectors).forEach(type => {
  testButtonsByType(type, buttonSelectors[type])
})

// Test remaining buttons not caught by type-specific tests
console.log('\n🔍 Testing remaining buttons...')
const allTestedButtons = new Set()
Object.values(testResults.buttonTypes).forEach(type => {
  type.issues.forEach(issue => allTestedButtons.add(issue.text))
})

document.querySelectorAll('button, .btn, [role="button"], input[type="submit"], input[type="button"]').forEach((button, index) => {
  const text = getButtonText(button)
  if (!allTestedButtons.has(text)) {
    const result = testButton(button, 'general')
    
    if (result.issues.length === 0) {
      console.log(`✅ General button ${index + 1}: "${result.text}"`)
    } else {
      console.log(`❌ General button ${index + 1}: "${result.text}" - ${result.issues.join(', ')}`)
    }
  }
})

// Display final results
console.log('\n📊 FINAL TEST RESULTS:')
console.log('=' .repeat(50))
console.log(`Total Buttons: ${testResults.total}`)
console.log(`Working: ${testResults.working}`)
console.log(`Issues: ${testResults.total - testResults.working}`)
console.log(`Success Rate: ${((testResults.working / testResults.total) * 100).toFixed(1)}%`)

console.log('\nBy Type:')
Object.entries(testResults.buttonTypes).forEach(([type, data]) => {
  if (data.total > 0) {
    const rate = ((data.working / data.total) * 100).toFixed(1)
    console.log(`  ${type}: ${data.working}/${data.total} (${rate}%)`)
  }
})

console.log('\nTop Issues:')
const issueCount = {}
testResults.issues.forEach(item => {
  item.issues.forEach(issue => {
    issueCount[issue] = (issueCount[issue] || 0) + 1
  })
})

Object.entries(issueCount)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 5)
  .forEach(([issue, count]) => {
    console.log(`  ${issue}: ${count} buttons`)
  })

console.log('\nFailed Buttons:')
testResults.issues.forEach(item => {
  console.log(`  "${item.text}" (${item.type}): ${item.issues.join(', ')}`)
})

// Emergency fix function
window.emergencyFixAllButtons = () => {
  console.log('🚨 Running emergency button fix...')
  
  document.querySelectorAll('button, .btn, [role="button"], input[type="submit"], input[type="button"]').forEach(button => {
    // Force enable
    button.style.cssText += `
      cursor: pointer !important;
      pointer-events: auto !important;
      user-select: none !important;
      position: relative !important;
      z-index: 10 !important;
    `
    
    // Remove any blocking overlays
    const parent = button.parentElement
    if (parent) {
      parent.style.pointerEvents = 'auto'
    }
    
    // Add click effect
    if (!button.dataset.emergencyFixed) {
      button.addEventListener('click', function(e) {
        console.log('Button clicked:', this.textContent?.trim() || this.className)
        
        // Visual feedback
        const originalTransform = this.style.transform
        this.style.transform = 'scale(0.95)'
        setTimeout(() => {
          this.style.transform = originalTransform
        }, 150)
      })
      
      button.dataset.emergencyFixed = 'true'
    }
  })
  
  console.log('✅ Emergency fix applied to all buttons')
}

console.log('\n🔧 Run window.emergencyFixAllButtons() to force-fix all buttons')
console.log('🔧 Run window.buttonEnhancer?.testAllButtons() to test with enhancer')

return testResults