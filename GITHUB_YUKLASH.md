# 📤 GitHub ga Loyihani Yuklash

## ⚠️ Authentication Muammosi

GitHub ga push qilishda authentication xatosi chiqdi. Bu sizning GitHub hisobingiz bilan bog'liq.

---

## ✅ To'g'ri Yo'l

### 1. GitHub Personal Access Token Yaratish

1. GitHub ga kiring: https://github.com
2. O'ng yuqori burchakda profilingizni bosing
3. **Settings** ga o'ting
4. Pastda **Developer settings** ni bosing
5. **Personal access tokens** → **Tokens (classic)** ni tanlang
6. **Generate new token** → **Generate new token (classic)** ni bosing
7. Token nomi: `Alisher Mobile`
8. Quyidagi ruxsatlarni belgilang:
   - ✅ `repo` (barcha repo ruxsatlari)
   - ✅ `workflow`
9. **Generate token** ni bosing
10. **Token ni nusxalang** (faqat bir marta ko'rsatiladi!)

---

### 2. Git Credentials ni Yangilash

Terminal da quyidagi buyruqlarni bajaring:

```bash
# Eski credentials ni o'chirish
git credential-manager erase https://github.com

# Yoki Windows da:
cmdkey /delete:git:https://github.com
```

---

### 3. Loyihani GitHub ga Yuklash

```bash
# 1. Loyiha papkasiga o'ting
cd c:\Users\user\Desktop\topshiriq

# 2. Remote ni tekshiring
git remote -v

# 3. Agar remote mavjud bo'lsa, o'chiring
git remote remove origin

# 4. Yangi remote qo'shing
git remote add origin https://github.com/asadovgulomjon046-alt/Alisher.mobile.git

# 5. Push qiling (token so'raladi)
git push -u origin main
```

**Username:** `asadovgulomjon046-alt`
**Password:** `ghp_...` (Personal Access Token)

---

## 🔄 Alternativ: GitHub Desktop

Agar terminal bilan muammo bo'lsa, GitHub Desktop ishlatishingiz mumkin:

### 1. GitHub Desktop ni Yuklab Oling
https://desktop.github.com/

### 2. GitHub ga Login Qiling
- GitHub Desktop ni oching
- **File** → **Options** → **Accounts**
- **Sign in** ni bosing

### 3. Loyihani Qo'shing
- **File** → **Add local repository**
- `c:\Users\user\Desktop\topshiriq` ni tanlang
- **Add repository**

### 4. Publish qiling
- **Publish repository** tugmasini bosing
- Repository nomi: `Alisher.mobile`
- **Publish repository**

---

## 📋 Qo'lda Yuklash (Eng Oson)

Agar yuqoridagilar ishlamasa:

### 1. GitHub da Repository Yarating
1. https://github.com/asadovgulomjon046-alt/Alisher.mobile ga o'ting
2. Repository allaqachon yaratilgan

### 2. Fayllarni Qo'lda Yuklang
1. Repository sahifasida **Add file** → **Upload files** ni bosing
2. `c:\Users\user\Desktop\topshiriq` papkasidagi barcha fayllarni drag & drop qiling
3. **Commit changes** ni bosing

**Eslatma:** `.git` papkasini yuklamang, faqat loyiha fayllarini yuklang.

---

## 🔧 Git Config ni Tekshirish

```bash
# Git user ni tekshirish
git config --global user.name
git config --global user.email

# Agar bo'sh bo'lsa, o'rnating
git config --global user.name "asadovgulomjon046-alt"
git config --global user.email "sizning@email.com"
```

---

## 📝 .gitignore Fayli

Loyihada `.gitignore` fayli bor, quyidagi fayllar yuklanmaydi:
- `node_modules/`
- `dist/`
- `.env`
- `*.log`

---

## ✅ Muvaffaqiyatli Yuklangandan Keyin

Repository manzili:
```
https://github.com/asadovgulomjon046-alt/Alisher.mobile
```

### Clone qilish:
```bash
git clone https://github.com/asadovgulomjon046-alt/Alisher.mobile.git
```

### Yangilanishlarni Push qilish:
```bash
git add .
git commit -m "Update: ..."
git push origin main
```

---

## 🆘 Yordam

Agar hali ham muammo bo'lsa:

1. **GitHub Support:** https://support.github.com/
2. **Git Documentation:** https://git-scm.com/doc
3. **Stack Overflow:** https://stackoverflow.com/questions/tagged/git

---

## 📊 Loyiha Statistikasi

Yuklangan fayllar:
- **61 files changed**
- **5,785 insertions**
- **8,363 deletions**

Asosiy fayllar:
- ✅ React komponentlar (50+)
- ✅ Admin panel
- ✅ Mijozlar sayti
- ✅ Telegram bot
- ✅ Hujjatlar (20+ MD fayl)
- ✅ Konfiguratsiya fayllar

---

## 🎉 Xulosa

Loyihangiz GitHub ga yuklashga tayyor!

**Repository:** https://github.com/asadovgulomjon046-alt/Alisher.mobile

**Keyingi Qadamlar:**
1. Personal Access Token yarating
2. Git credentials ni yangilang
3. `git push -u origin main` ni bajaring
4. Yoki GitHub Desktop ishlatishingiz mumkin

Omad! 🚀
