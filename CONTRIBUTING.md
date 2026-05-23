# Contributing to Alisher Mobile

Alisher Mobile loyihasiga hissa qo'shganingiz uchun rahmat! 🎉

## 📋 Code of Conduct

Ushbu loyihada ishtirok etish orqali siz bizning Code of Conduct ga rioya qilishga rozilik bildirasiz.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ o'rnatilgan bo'lishi kerak
- npm yoki yarn package manager
- Git
- Code editor (VS Code tavsiya etiladi)

### Setup

1. **Repository ni fork qiling:**
```bash
# GitHub da "Fork" tugmasini bosing
```

2. **Clone qiling:**
```bash
git clone https://github.com/your-username/alisher-mobile.git
cd alisher-mobile
```

3. **Dependencies o'rnating:**
```bash
npm install
cd bot
npm install
cd ..
```

4. **Environment variables sozlang:**
```bash
# bot/.env faylini yarating
echo "BOT_TOKEN=your_bot_token" > bot/.env
echo "ADMIN_ID=your_telegram_id" >> bot/.env
```

5. **Development server ishga tushiring:**
```bash
npm run dev
```

## 🔧 Development Workflow

### Branch Strategy

- `main` - Production-ready kod
- `develop` - Development branch
- `feature/*` - Yangi xususiyatlar
- `bugfix/*` - Bug fixlar
- `hotfix/*` - Tezkor tuzatishlar

### Creating a Branch

```bash
# Feature branch
git checkout -b feature/add-payment-gateway

# Bugfix branch
git checkout -b bugfix/fix-cart-calculation

# Hotfix branch
git checkout -b hotfix/security-patch
```

## 📝 Coding Standards

### JavaScript/React

- ES6+ sintaksisidan foydalaning
- Functional components va hooks
- PropTypes yoki TypeScript
- Meaningful variable names
- Comments faqat kerak bo'lganda

### Code Style

```javascript
// ✅ Good
const ProductCard = ({ product, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
};

// ❌ Bad
function ProductCard(props) {
  return <div className="product-card">
    <h3>{props.product.name}</h3>
    <button onClick={() => props.onAddToCart(props.product)}>Add to Cart</button>
  </div>
}
```

### CSS

- BEM metodologiyasi
- CSS variables
- Mobile-first approach
- Semantic class names

```css
/* ✅ Good */
.product-card {
  --card-padding: 1rem;
  padding: var(--card-padding);
}

.product-card__title {
  font-size: 1.5rem;
}

.product-card__button {
  background: var(--primary-color);
}

/* ❌ Bad */
.pc {
  padding: 16px;
}

.title {
  font-size: 24px;
}
```

### File Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── pages/           # Page components
│   └── website/         # Customer site components
├── context/             # React Context
├── utils/               # Utility functions
├── hooks/               # Custom hooks
└── styles/              # Global styles
```

## 🧪 Testing

### Writing Tests

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'iPhone 15',
    price: 12000000
  };

  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });

  it('calls onAddToCart when button clicked', () => {
    const handleAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

## 📦 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Yangi xususiyat
- `fix`: Bug fix
- `docs`: Documentation o'zgarishi
- `style`: Code style (formatting, semicolons, etc)
- `refactor`: Code refactoring
- `test`: Test qo'shish yoki o'zgartirish
- `chore`: Build process yoki auxiliary tools

### Examples

```bash
# Feature
git commit -m "feat(cart): add quantity selector to cart items"

# Bug fix
git commit -m "fix(checkout): resolve payment calculation error"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Style
git commit -m "style(products): format product card component"

# Refactor
git commit -m "refactor(api): simplify order service logic"

# Test
git commit -m "test(cart): add unit tests for cart context"

# Chore
git commit -m "chore(deps): update react to 18.3.0"
```

## 🔍 Pull Request Process

### Before Submitting

1. **Code review:**
   - [ ] Kod standartlarga mos
   - [ ] Testlar yozilgan va o'tmoqda
   - [ ] Documentation yangilangan
   - [ ] No console.log statements
   - [ ] No commented code

2. **Testing:**
   - [ ] Manual testing
   - [ ] Unit tests
   - [ ] Integration tests
   - [ ] Browser compatibility

3. **Build:**
   - [ ] Production build muvaffaqiyatli
   - [ ] No build warnings
   - [ ] Bundle size acceptable

### Creating Pull Request

1. **Push your branch:**
```bash
git push origin feature/your-feature-name
```

2. **Create PR on GitHub:**
   - Clear title
   - Detailed description
   - Screenshots (if UI changes)
   - Link related issues

3. **PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Browser testing done

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
```

## 🐛 Bug Reports

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

**Additional context**
Any other information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Mockups, examples, etc.
```

## 📚 Documentation

### Documentation Guidelines

- Clear and concise
- Code examples
- Screenshots where helpful
- Keep updated with code changes

### Documentation Structure

```markdown
# Feature Name

## Overview
Brief description

## Usage
How to use with examples

## API
Function signatures and parameters

## Examples
Real-world examples

## Notes
Important information
```

## 🎨 Design Guidelines

### UI/UX Principles

- **Consistency:** Bir xil elementlar bir xil ko'rinishda
- **Simplicity:** Sodda va tushunarli
- **Accessibility:** Barcha foydalanuvchilar uchun
- **Responsive:** Barcha ekranlarda ishlashi
- **Performance:** Tez yuklanishi

### Color Palette

```css
:root {
  --primary: #ef4444;
  --secondary: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --dark: #1f2937;
  --light: #f9fafb;
}
```

### Typography

```css
:root {
  --font-family: 'Inter', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
}
```

## 🔒 Security

### Security Guidelines

- Never commit sensitive data
- Use environment variables
- Validate all inputs
- Sanitize user data
- Use HTTPS
- Keep dependencies updated

### Reporting Security Issues

Security muammolarini topgan bo'lsangiz:
1. **Public issue yaratmang**
2. Email yuboring: security@alisher-mobile.uz
3. Muammoni batafsil tasvirlab bering
4. Proof of concept qo'shing (agar xavfsiz bo'lsa)

## 📞 Getting Help

### Resources

- **Documentation:** [docs.alisher-mobile.uz](https://docs.alisher-mobile.uz)
- **Discord:** [discord.gg/alisher-mobile](https://discord.gg/alisher-mobile)
- **Telegram:** @alisher_mobile_dev
- **Email:** dev@alisher-mobile.uz

### Questions

- GitHub Discussions
- Stack Overflow (tag: alisher-mobile)
- Discord community

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Featured on website (major contributions)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Rahmat! 🙏

© 2024 Alisher Mobile. Barcha huquqlar himoyalangan.
