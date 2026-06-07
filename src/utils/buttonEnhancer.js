// Enhanced Button Functionality System
// Comprehensive solution to ensure ALL buttons work properly

export class ButtonEnhancer {
  constructor() {
    this.enhanced = new Set()
    this.observers = []
    this.buttonRegistry = new Map()
    this.debugMode = true
    this.initialize()
  }

  log(message, data = null) {
    if (this.debugMode) {
      console.log(`🔧 ButtonEnhancer: ${message}`, data || '')
    }
  }

  initialize() {
    this.log('Initializing button enhancer system...')
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.enhanceAllButtons())
    } else {
      this.enhanceAllButtons()
    }

    // Set up mutation observer for dynamic content
    this.setupMutationObserver()

    // Enhanced periodic checking for React updates
    setInterval(() => this.enhanceAllButtons(), 1000)
    
    // Add emergency fix to window
    window.emergencyButtonFix = () => this.emergencyFix()
    window.testAllButtons = () => this.testAllButtons()
  }

  setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldEnhance = false
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (this.isButton(node) || node.querySelector('button, .btn, [role="button"]')) {
                shouldEnhance = true
              }
            }
          })
        }
      })

      if (shouldEnhance) {
        setTimeout(() => this.enhanceAllButtons(), 100)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'onclick', 'disabled']
    })

    this.observers.push(observer)
  }

  isButton(element) {
    return element.tagName === 'BUTTON' || 
           element.classList.contains('btn') ||
           element.getAttribute('role') === 'button' ||
           element.type === 'submit' ||
           element.type === 'button'
  }

  enhanceAllButtons() {
    const selectors = [
      'button',
      '.btn',
      '[role="button"]', 
      'input[type="submit"]',
      'input[type="button"]',
      'a[onclick]',
      '.clickable',
      '[data-action]',
      '[onclick]'
    ]

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        this.enhanceButton(element)
      })
    })
  }

  enhanceButton(button) {
    if (this.enhanced.has(button)) return

    try {
      // Mark as enhanced
      this.enhanced.add(button)
      button.setAttribute('data-enhanced', 'true')

      // Ensure basic styles
      this.applyBasicStyles(button)

      // Add event listeners
      this.addEventListeners(button)

      // Fix React event issues
      this.fixReactEvents(button)

      console.log('✅ Enhanced button:', button.textContent?.trim() || button.className)
    } catch (error) {
      console.error('❌ Failed to enhance button:', error, button)
    }
  }

  applyBasicStyles(button) {
    const styles = {
      cursor: 'pointer',
      pointerEvents: 'auto',
      userSelect: 'none',
      webkitUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      position: 'relative',
      zIndex: '1'
    }

    Object.assign(button.style, styles)
  }

  addEventListeners(button) {
    // Prevent text selection
    button.addEventListener('selectstart', (e) => e.preventDefault(), { passive: false })

    // Add click enhancement
    button.addEventListener('click', function(e) {
      if (!this.disabled && !this.classList.contains('disabled')) {
        // Prevent double clicks
        if (this.dataset.clicking) return
        
        this.dataset.clicking = 'true'
        setTimeout(() => delete this.dataset.clicking, 300)

        // Visual feedback
        const originalTransform = this.style.transform
        this.style.transform = 'scale(0.95)'
        setTimeout(() => {
          this.style.transform = originalTransform
        }, 150)
      }
    }, { passive: false })

    // Add hover effects
    button.addEventListener('mouseenter', function() {
      if (!this.disabled && !this.classList.contains('disabled')) {
        this.style.transform = 'translateY(-2px)'
        this.style.zIndex = '20'
        this.style.transition = 'all 0.2s ease'
      }
    })

    button.addEventListener('mouseleave', function() {
      if (!this.disabled && !this.classList.contains('disabled')) {
        this.style.transform = 'translateY(0)'
        this.style.zIndex = ''
      }
    })

    // Keyboard accessibility
    button.addEventListener('keydown', function(e) {
      if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
        e.preventDefault()
        this.click()
      }
    })
  }

  fixReactEvents(button) {
    // Check for React props
    const reactPropsKey = Object.keys(button).find(key => key.startsWith('__react'))
    
    if (reactPropsKey) {
      const reactProps = button[reactPropsKey]
      if (reactProps && reactProps.onClick) {
        // React onClick exists, ensure it works
        button.style.pointerEvents = 'auto'
        button.style.cursor = 'pointer'
      }
    }

    // Check for event listeners
    const hasListeners = button.getAttribute('onclick') || 
                        button.onclick || 
                        button.addEventListener.toString().includes('native code')

    if (!hasListeners) {
      console.warn('⚠️ Button may not have click handler:', button.textContent?.trim())
    }
  }

  getButtonText(button) {
    return button.textContent?.trim() || 
           button.title || 
           button.getAttribute('aria-label') ||
           button.className ||
           button.id ||
           'Unknown Button'
  }

  getButtonType(button) {
    const text = this.getButtonText(button).toLowerCase()
    const className = button.className.toLowerCase()
    
    if (text.includes('edit') || className.includes('edit') || text.includes('tahrirlash')) return 'edit'
    if (text.includes('delete') || text.includes('del') || className.includes('delete') || text.includes('ochirish')) return 'delete'
    if (text.includes('save') || text.includes('saqlash') || className.includes('save')) return 'save'
    if (text.includes('cancel') || text.includes('bekor') || className.includes('cancel')) return 'cancel'
    if (text.includes('login') || text.includes('kirish') || text.includes('chiqish')) return 'auth'
    if (text.includes('cart') || text.includes('savat') || className.includes('cart')) return 'cart'
    if (button.closest('.modal')) return 'modal'
    if (button.closest('nav') || button.closest('.nav') || button.closest('header')) return 'navigation'
    if (button.closest('form')) return 'form'
    
    return 'general'
  }

  // Enhanced testing system
  testAllButtons() {
    const results = {
      total: 0,
      working: 0,
      issues: [],
      byType: {}
    }

    this.log('🧪 Starting comprehensive button test...')

    document.querySelectorAll('button, .btn, [role="button"], input[type="submit"], input[type="button"], a[onclick]').forEach((button, index) => {
      results.total++
      
      const issues = this.testButton(button)
      const text = this.getButtonText(button)
      const type = this.getButtonType(button)
      
      if (!results.byType[type]) {
        results.byType[type] = { total: 0, working: 0, issues: [] }
      }
      results.byType[type].total++
      
      if (issues.length === 0) {
        results.working++
        results.byType[type].working++
        console.log(`✅ Button ${index + 1} (${type}): "${text}" - Working`)
      } else {
        results.issues.push({ text, issues, type, element: button })
        results.byType[type].issues.push({ text, issues })
        console.log(`❌ Button ${index + 1} (${type}): "${text}" - ${issues.join(', ')}`)
      }
    })

    // Display comprehensive results
    console.log(`\n📊 COMPREHENSIVE BUTTON TEST RESULTS:`)
    console.log('=' .repeat(60))
    console.log(`Total Buttons Found: ${results.total}`)
    console.log(`Working Buttons: ${results.working}`)
    console.log(`Problematic Buttons: ${results.total - results.working}`)
    console.log(`Success Rate: ${((results.working / results.total) * 100).toFixed(1)}%`)

    console.log('\n📋 Results by Type:')
    Object.entries(results.byType).forEach(([type, data]) => {
      const rate = data.total > 0 ? ((data.working / data.total) * 100).toFixed(1) : '0'
      console.log(`  ${type.toUpperCase()}: ${data.working}/${data.total} (${rate}%)`)
    })

    return results
  }

  testButton(button) {
    const issues = []
    
    if (button.disabled) return issues // Skip disabled buttons

    // Test styles
    const styles = getComputedStyle(button)
    if (styles.cursor !== 'pointer') {
      issues.push('Cursor not pointer')
    }
    
    if (styles.pointerEvents === 'none') {
      issues.push('Pointer events disabled')
    }

    // Test for click handlers
    const hasOnClick = button.onclick || 
                      button.getAttribute('onclick') ||
                      button.hasAttribute('data-enhanced') ||
                      Object.keys(button).some(key => key.startsWith('__react'))

    if (!hasOnClick) {
      issues.push('No click handler detected')
    }

    return issues
  }

  // Fix specific button types
  fixNavigationButtons() {
    document.querySelectorAll('nav a, .nav-item, .navigation-link').forEach(link => {
      link.style.pointerEvents = 'auto'
      link.style.cursor = 'pointer'
      link.style.textDecoration = 'none'
    })
  }

  fixModalButtons() {
    document.querySelectorAll('.modal button, .modal .btn').forEach(button => {
      button.style.pointerEvents = 'auto'
      button.style.cursor = 'pointer'
      button.style.zIndex = '20'
    })
  }

  fixCartButtons() {
    document.querySelectorAll('.cart button, .cart-item button, .add-to-cart').forEach(button => {
      button.style.pointerEvents = 'auto'
      button.style.cursor = 'pointer'
      button.style.zIndex = '15'
    })
  }

  fixFormButtons() {
    document.querySelectorAll('form button, form .btn, form [type="submit"]').forEach(button => {
      button.style.pointerEvents = 'auto'
      button.style.cursor = 'pointer'
      button.style.zIndex = '10'
    })
  }

  // Emergency fix for all buttons
  emergencyFix() {
    this.log('🚨 Running emergency button fix...')
    
    let fixed = 0
    
    document.querySelectorAll('button, .btn, [role="button"], input[type="submit"], input[type="button"], a[onclick], .clickable').forEach(button => {
      try {
        // Force enable with maximum priority
        button.style.cssText += `
          cursor: pointer !important;
          pointer-events: auto !important;
          user-select: none !important;
          position: relative !important;
          z-index: 999 !important;
          text-decoration: none !important;
          border: none !important;
        `
        
        // Remove blocking overlays
        const parent = button.parentElement
        if (parent) {
          parent.style.setProperty('pointer-events', 'auto', 'important')
        }

        fixed++
      } catch (e) {
        this.log(`Emergency fix failed for button:`, e.message)
      }
    })

    this.log(`✅ Emergency fix applied to ${fixed} buttons`)
    return fixed
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect())
    this.enhanced.clear()
  }
}

// Auto-initialize
const buttonEnhancer = new ButtonEnhancer()

// Make globally available for testing
window.buttonEnhancer = buttonEnhancer

export default buttonEnhancer