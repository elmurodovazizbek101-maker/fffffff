# 🚀 Render.com ga Deploy Qilish Qo'llanmasi

## 📋 1. Supabase Database O'rnatish (Birinchi Qadam!)

### 1.1 Supabase Loyiha Yaratish
1. [supabase.com](https://supabase.com) ga kiring
2. **"New Project"** tugmasini bosing
3. Loyiha ma'lumotlarini kiriting:
   - **Name**: `alisher-mobile-db`
   - **Database Password**: Kuchli parol yarating (saqlang!)
   - **Region**: `Southeast Asia (Singapore)` yoki `Central EU (Frankfurt)`
4. **"Create new project"** tugmasini bosing
5. 2-3 daqiqa kuting

### 1.2 Database Schema O'rnatish
1. Supabase dashboard da **"SQL Editor"** ga o'ting
2. **"New query"** tugmasini bosing
3. Loyihadagi `database/schema.sql` faylini oching
4. Barcha SQL kodni nusxalab, SQL Editor ga joylashtiring
5. **"Run"** tugmasini bosing
6. ✅ "Success. No rows returned" xabarini ko'ring

### 1.3 API Kalitlarini Olish
1. **"Settings"** → **"API"** ga o'ting
2. Quyidagi ma'lumotlarni nusxalang (keyin kerak bo'ladi):
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 🌐 2. Render.com ga Deploy Qilish

### 2.1 Render Account Yaratish
1. [render.com](https://render.com) ga o'ting
2. **"Get Started"** tugmasini bosing
3. GitHub orqali ro'yxatdan o'ting

### 2.2 GitHub Repository Ulash
1. Render dashboard da **"New +"** tugmasini bosing
2. **"Web Service"** ni tanlang
3. **"Connect a repository"** tugmasini bosing
4. GitHub da `elmurodovazizbek101-maker/fffffff` repository ni tanlang
5. Agar ko'rinmasa, **"Configure account"** orqali ruxsat bering

### 2.3 Service Sozlamalari
Quyidagi ma'lumotlarni kiriting:

**Basic Settings:**
- **Name**: `alisher-mobile` (yoki o'zingiz xohlagan nom)
- **Region**: `Singapore` (yoki yaqin region)
- **Branch**: `main`
- **Root Directory**: (bo'sh qoldiring)

**Build Settings:**
- **Runtime**: `Static Site`
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```
- **Publish Directory**: 
  ```
  dist
  ```

**Advanced Settings:**
- **Auto-Deploy**: `Yes` (har safar push qilganda avtomatik deploy)

### 2.4 Environment Variables Qo'shish
**"Environment"** bo'limida quyidagi o'zgaruvchilarni qo'shing:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
VITE_APP_NAME=Alisher Mobile
VITE_ENVIRONMENT=production
```

⚠️ **Muhim**: Supabase URL va Key ni 1.3 qadamda nusxalagan ma'lumotlardan oling!

### 2.5 Deploy Qilish
1. **"Create Web Service"** tugmasini bosing
2. Deploy jarayoni boshlanadi (5-10 daqiqa)
3. Logs da quyidagi xabarlarni ko'ring:
   ```
   ==> Installing dependencies...
   ==> Building...
   ==> Build successful!
   ==> Your service is live 🎉
   ```

### 2.6 Saytni Ochish
1. Deploy tugagach, **"Your service is live at https://alisher-mobile.onrender.com"** havolasini ko'ring
2. Havolani bosib saytni oching
3. ✅ Sayt ishlayotganini tekshiring

---

## 🔧 3. Sozlamalar va Tekshirish

### 3.1 Custom Domain (Ixtiyoriy)
1. Render dashboard da **"Settings"** → **"Custom Domain"** ga o'ting
2. O'z domeningizni qo'shing (masalan: `alishermobi le.uz`)
3. DNS sozlamalarini yangilang

### 3.2 SSL Certificate
- ✅ Render avtomatik HTTPS (SSL) beradi
- Hech narsa qilish shart emas!

### 3.3 Saytni Tekshirish
Browser da saytni oching va quyidagilarni tekshiring:

**Frontend:**
- ✅ Bosh sahifa ochiladi
- ✅ Mahsulotlar ko'rinadi
- ✅ Kategoriyalar ishlaydi
- ✅ Qidiruv ishlaydi

**Admin Panel:**
- ✅ `/admin` ga kiring
- ✅ Login: `superadmin`
- ✅ Parol: `Admin@2024!Secure`
- ✅ Dashboard statistikalari ko'rinadi

**Database:**
- Browser Console (F12) ni oching
- Quyidagi xabarni ko'ring:
  ```
  ✅ Supabase database ulandi
  ```

---

## 🔄 4. Yangilanishlarni Deploy Qilish

### 4.1 Kod O'zgartirish
```bash
# Kodni o'zgartiring
# Masalan: src/components/Header.jsx

# Git ga commit qiling
git add .
git commit -m "Header yangilandi"
git push origin main
```

### 4.2 Avtomatik Deploy
- ✅ Render avtomatik yangi versiyani deploy qiladi
- ✅ 5-10 daqiqada yangilanish jonli bo'ladi
- ✅ Email orqali xabar keladi

---

## 🚨 5. Muammolarni Hal Qilish

### 5.1 Build Xatoliklari

**Xato: "Module not found"**
```bash
# Mahalliy kompyuterda test qiling:
npm install
npm run build
npm run preview
```

**Xato: "Out of memory"**
- Render dashboard da **"Settings"** → **"Instance Type"**
- Free plan yetarli bo'lishi kerak, lekin katta loyihalar uchun upgrade qiling

### 5.2 Database Ulanish Muammolari

**Xato: "Invalid API key"**
- Environment variables ni tekshiring
- Supabase kalitlarini qayta nusxalang

**Xato: "Table doesn't exist"**
- Supabase SQL Editor da `database/schema.sql` ni qayta ishga tushiring

### 5.3 Sahifa 404 Xatosi

**Muammo**: React Router sahifalari 404 qaytaradi

**Yechim**: `render.yaml` faylida rewrite rules mavjud:
```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

Agar ishlamasa, Render dashboard da **"Redirects/Rewrites"** qo'shing:
- **Source**: `/*`
- **Destination**: `/index.html`
- **Status**: `200`

---

## 📊 6. Monitoring va Analytics

### 6.1 Render Metrics
- **Dashboard** → **"Metrics"** da:
  - Request count
  - Response time
  - Bandwidth usage

### 6.2 Supabase Monitoring
- **Supabase Dashboard** → **"Database"** → **"Usage"**:
  - Database size
  - API requests
  - Active connections

### 6.3 Logs
```bash
# Render logs ko'rish
# Dashboard → "Logs" → "Deploy Logs" yoki "Runtime Logs"
```

---

## 💰 7. Narxlar va Limitlar

### 7.1 Render Free Plan
- ✅ 750 soat/oy (1 ta sayt uchun yetarli)
- ✅ 100 GB bandwidth/oy
- ✅ Avtomatik SSL
- ⚠️ 15 daqiqa inactivity dan keyin sleep mode

### 7.2 Supabase Free Plan
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 50,000 monthly active users
- ✅ 2 GB bandwidth

### 7.3 Upgrade (Kerak bo'lsa)
- **Render Starter**: $7/oy - Always on, custom domain
- **Supabase Pro**: $25/oy - 8 GB database, 100 GB bandwidth

---

## ✅ 8. Deploy Checklist

Quyidagi barcha qadamlarni bajaring:

- [ ] Supabase loyiha yaratildi
- [ ] Database schema o'rnatildi (`schema.sql`)
- [ ] Supabase API kalitlari olindi
- [ ] GitHub repository tayyor
- [ ] Render account yaratildi
- [ ] Repository Render ga ulandi
- [ ] Environment variables qo'shildi
- [ ] Deploy muvaffaqiyatli tugadi
- [ ] Sayt ochiladi va ishlaydi
- [ ] Admin panel ishlaydi
- [ ] Database ulanish ishlaydi
- [ ] Mahsulotlar ko'rinadi

---

## 🎉 Tayyor!

Saytingiz endi jonli: **https://alisher-mobile.onrender.com**

**Keyingi qadamlar:**
1. Custom domain qo'shing (ixtiyoriy)
2. Google Analytics qo'shing
3. SEO optimizatsiya qiling
4. Social media ulang

**Yordam kerakmi?**
- Render Docs: https://render.com/docs
- Supabase Docs: https://supabase.com/docs
- GitHub Issues: Repository da issue oching

---

**Omad! 🚀**
