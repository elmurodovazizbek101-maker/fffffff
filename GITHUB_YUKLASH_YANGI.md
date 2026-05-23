# GitHub'ga Loyihani Yuklash - Yangilangan Ko'rsatma

## Muammo
Git sizning kompyuteringizda boshqa GitHub akkaunt bilan autentifikatsiya qilingan.
Siz `asadovgulomjon046-alt` akkauntiga yuklashingiz kerak.

## ✅ Yechim 1: Personal Access Token (Eng Oson)

### 1-qadam: Token yaratish
1. GitHub'ga kiring: https://github.com/login
2. **Akkaunt**: `asadovgulomjon046-alt` bilan kiring
3. Ushbu linkni oching: https://github.com/settings/tokens/new
4. Token sozlamalari:
   - **Note**: `Alisher Mobile Upload`
   - **Expiration**: `90 days` (yoki `No expiration`)
   - **Scopes**: Faqat `repo` ni belgilang ✅
5. **Generate token** tugmasini bosing
6. **Token nusxalang** (faqat bir marta ko'rsatiladi!)
   - Masalan: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2-qadam: Token bilan yuklash
Quyidagi buyruqni terminalda bajaring (TOKEN o'rniga o'z tokeningizni qo'ying):

```bash
git push https://TOKEN@github.com/asadovgulomjon046-alt/Alisher.mobile.git main
```

**Misol:**
```bash
git push https://ghp_1234567890abcdefghijklmnopqrstuvwxyz@github.com/asadovgulomjon046-alt/Alisher.mobile.git main
```

---

## ✅ Yechim 2: Git Credential Manager

### Windows uchun:
```bash
# Eski kredensiallarni o'chirish
git credential-manager-core erase https://github.com

# Yoki
cmdkey /delete:git:https://github.com
```

Keyin qayta push qiling:
```bash
git push -u origin main
```

Brauzer ochiladi va `asadovgulomjon046-alt` akkaunt bilan kiring.

---

## ✅ Yechim 3: GitHub Desktop (Eng Qulay)

1. **GitHub Desktop** yuklab oling: https://desktop.github.com/
2. Dasturni oching va `asadovgulomjon046-alt` akkaunt bilan kiring
3. **File → Add Local Repository** → `C:\Users\user\Desktop\topshiriq` papkasini tanlang
4. **Publish repository** tugmasini bosing
5. Repository nomi: `Alisher.mobile`
6. **Publish Repository** tugmasini bosing

---

## ✅ Yechim 4: SSH Key (Kelajak uchun eng yaxshi)

### 1. SSH key yaratish:
```bash
ssh-keygen -t ed25519 -C "asadovgulomjon046@gmail.com"
```

### 2. SSH key nusxalash:
```bash
type %USERPROFILE%\.ssh\id_ed25519.pub
```

### 3. GitHub'ga qo'shish:
1. https://github.com/settings/ssh/new
2. Key ni joylashtiring
3. **Add SSH key** tugmasini bosing

### 4. Remote URL o'zgartirish:
```bash
git remote set-url origin git@github.com:asadovgulomjon046-alt/Alisher.mobile.git
git push -u origin main
```

---

## 📊 Loyiha Statistikasi

- **Jami fayllar**: 61 ta
- **Kod qatorlari**: 5,785+
- **Komponentlar**: 30+ React komponent
- **Sahifalar**: 12 admin + 4 website sahifa
- **Xususiyatlar**:
  - ✅ Admin panel (mahsulotlar, sotuvlar, xarajatlar, qarzdorlar)
  - ✅ E-commerce website (katalog, savatcha, buyurtma)
  - ✅ Telegram bot integratsiyasi
  - ✅ Dark mode
  - ✅ PWA support
  - ✅ Responsive dizayn
  - ✅ LocalStorage ma'lumotlar bazasi

---

## 🔗 Repository Manzili
https://github.com/asadovgulomjon046-alt/Alisher.mobile

## 📞 Yordam Kerakmi?
Agar yuqoridagi usullardan biri ishlamasa, menga xabar bering!
