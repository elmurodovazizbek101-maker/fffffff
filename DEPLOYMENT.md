# Deployment Guide - Alisher Mobile

Bu qo'llanma saytni turli platformalarga deploy qilish bo'yicha to'liq ko'rsatmalar beradi.

## 📋 Pre-Deployment Checklist

- [ ] Barcha testlar o'tdi
- [ ] Production build muvaffaqiyatli yaratildi
- [ ] Environment variables to'g'ri sozlangan
- [ ] Bot server ishlamoqda
- [ ] PWA iconlari mavjud
- [ ] SEO meta taglari to'ldirilgan
- [ ] Analytics kodi qo'shilgan (agar kerak bo'lsa)

## 🚀 Vercel Deployment

### Automatic Deployment (Recommended)

1. **GitHub Repository yarating:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/alisher-mobile.git
git push -u origin main
```

2. **Vercel ga ulaning:**
- [vercel.com](https://vercel.com) ga kiring
- "Import Project" tugmasini bosing
- GitHub repository ni tanlang
- "Deploy" tugmasini bosing

3. **Environment Variables:**
Vercel dashboard da quyidagilarni qo'shing:
```
VITE_BOT_TOKEN=8861308673:AAFEhBUx20ZABW1xLJ-C1SQ0P_u_yeabvWY
VITE_ADMIN_ID=7504516430
```

### Manual Deployment

```bash
# Vercel CLI o'rnating
npm i -g vercel

# Login qiling
vercel login

# Deploy qiling
vercel

# Production ga deploy
vercel --prod
```

## 🌐 Netlify Deployment

### Drag & Drop Method

1. Build yarating:
```bash
npm run build
```

2. [app.netlify.com](https://app.netlify.com) ga kiring
3. `dist` papkasini drag & drop qiling

### Git Integration

1. **Netlify ga ulaning:**
- [app.netlify.com](https://app.netlify.com) ga kiring
- "New site from Git" tugmasini bosing
- GitHub repository ni tanlang

2. **Build Settings:**
```
Build command: npm run build
Publish directory: dist
```

3. **Environment Variables:**
```
VITE_BOT_TOKEN=8861308673:AAFEhBUx20ZABW1xLJ-C1SQ0P_u_yeabvWY
VITE_ADMIN_ID=7504516430
```

## 📱 GitHub Pages Deployment

1. **package.json ga qo'shing:**
```json
{
  "homepage": "https://username.github.io/alisher-mobile",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. **gh-pages o'rnating:**
```bash
npm install --save-dev gh-pages
```

3. **Deploy qiling:**
```bash
npm run deploy
```

## 🤖 Bot Server Deployment

### Heroku

1. **Heroku CLI o'rnating:**
```bash
npm install -g heroku
```

2. **Login va yaratish:**
```bash
heroku login
cd bot
heroku create alisher-mobile-bot
```

3. **Environment variables:**
```bash
heroku config:set BOT_TOKEN=8861308673:AAFEhBUx20ZABW1xLJ-C1SQ0P_u_yeabvWY
heroku config:set ADMIN_ID=7504516430
```

4. **Deploy:**
```bash
git add .
git commit -m "Deploy bot"
git push heroku main
```

### Railway

1. [railway.app](https://railway.app) ga kiring
2. "New Project" → "Deploy from GitHub"
3. `bot` papkasini tanlang
4. Environment variables qo'shing
5. Deploy tugmasini bosing

### VPS (Ubuntu)

```bash
# Node.js o'rnating
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 o'rnating
sudo npm install -g pm2

# Bot fayllarini yuklang
cd /var/www
git clone https://github.com/username/alisher-mobile.git
cd alisher-mobile/bot

# Dependencies o'rnating
npm install

# .env faylini yarating
nano .env
# BOT_TOKEN va ADMIN_ID ni kiriting

# PM2 bilan ishga tushiring
pm2 start index.js --name alisher-bot
pm2 save
pm2 startup
```

## 🔒 SSL Certificate (Let's Encrypt)

```bash
# Certbot o'rnating
sudo apt-get install certbot

# Certificate oling
sudo certbot certonly --standalone -d alisher-mobile.uz

# Nginx konfiguratsiyasi
sudo nano /etc/nginx/sites-available/alisher-mobile

# Quyidagini qo'shing:
server {
    listen 443 ssl http2;
    server_name alisher-mobile.uz;
    
    ssl_certificate /etc/letsencrypt/live/alisher-mobile.uz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alisher-mobile.uz/privkey.pem;
    
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Nginx restart
sudo systemctl restart nginx
```

## 📊 Performance Optimization

### Image Optimization

```bash
# Sharp o'rnating
npm install sharp

# Rasmlarni optimize qiling
node scripts/optimize-images.js
```

### Code Splitting

Vite avtomatik code splitting qiladi, lekin qo'shimcha optimizatsiya:

```javascript
// Lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Products = lazy(() => import('./pages/Products'))
```

### Caching Strategy

Service Worker avtomatik caching qiladi:
- Static assets: 1 yil
- API responses: 5 daqiqa
- HTML: Har doim yangi

## 🔍 Monitoring

### Google Analytics

```html
<!-- index.html ga qo'shing -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Sentry Error Tracking

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

## 🧪 Testing Before Deployment

```bash
# Build test
npm run build
npm run preview

# Lighthouse test
npm install -g lighthouse
lighthouse http://localhost:4173 --view

# Bundle size check
npm run build -- --report
```

## 📱 PWA Testing

1. **Chrome DevTools:**
- F12 → Application → Service Workers
- Manifest tekshirish
- Offline mode test

2. **Lighthouse PWA Audit:**
```bash
lighthouse http://localhost:4173 --preset=pwa --view
```

## 🔄 Continuous Deployment

### GitHub Actions

`.github/workflows/deploy.yml` yarating:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🆘 Troubleshooting

### Build Errors

```bash
# Cache tozalash
rm -rf node_modules package-lock.json
npm install

# Vite cache tozalash
rm -rf .vite
```

### Service Worker Issues

```bash
# Browser cache tozalash
# Chrome: Ctrl+Shift+Delete
# Service Worker unregister
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => registration.unregister())
})
```

### Bot Connection Issues

```bash
# Bot server loglarini tekshirish
pm2 logs alisher-bot

# Bot restart
pm2 restart alisher-bot
```

## 📞 Support

Muammolar bo'lsa:
- GitHub Issues: [github.com/username/alisher-mobile/issues](https://github.com/username/alisher-mobile/issues)
- Telegram: @alisher_mobile_shop_bot
- Email: support@alisher-mobile.uz

## ✅ Post-Deployment Checklist

- [ ] Sayt ochilmoqda
- [ ] PWA install qilish mumkin
- [ ] Bot xabarlar yubormoqda
- [ ] Admin panel ishlayapti
- [ ] Cart funksiyasi ishlayapti
- [ ] Checkout jarayoni to'g'ri
- [ ] Mobile responsive
- [ ] SEO meta taglari ko'rinmoqda
- [ ] SSL certificate faol
- [ ] Analytics ishlayapti

---

© 2024 Alisher Mobile. Barcha huquqlar himoyalangan.
