# 🧪 Stock Limit Test Qilish

## ⚠️ MUHIM: Avval localStorage ni tozalang!

### 1-qadam: localStorage ni tozalash

Browser console ni oching (F12) va quyidagi komandani kiriting:

```javascript
localStorage.clear()
location.reload()
```

Yoki bu sahifaga o'ting:
**http://localhost:5173/clear-cart.html**

---

## ✅ Test Bosqichlari

### Test 1: Vertu (3 dona stock)

1. **Bosh sahifaga o'ting**
   - http://localhost:5173

2. **Vertu Signature S ni toping**
   - Narxi: 85,000,000 so'm
   - Stock: 3 dona

3. **1-chi marta qo'shing**
   - "Savatga qo'shish" tugmasini bosing
   - ✅ Savatda 1 dona ko'rinishi kerak
   - ✅ Xabar: "Mahsulot savatga qo'shildi!"

4. **2-chi marta qo'shing**
   - Yana "Savatga qo'shish" tugmasini bosing
   - ✅ Savatda 2 dona ko'rinishi kerak

5. **3-chi marta qo'shing**
   - Yana "Savatga qo'shish" tugmasini bosing
   - ✅ Savatda 3 dona ko'rinishi kerak
   - ✅ + tugma DISABLE bo'lishi kerak

6. **4-chi marta qo'shishga harakat qiling**
   - Yana "Savatga qo'shish" tugmasini bosing
   - ❌ Alert chiqishi kerak:
     ```
     ⚠️ Faqat 3 dona mavjud!
     
     Savatda: 3 dona
     Qo'shmoqchisiz: 1 dona
     Jami: 4 dona
     
     Stock: 3 dona
     ```
   - ❌ Savatda hali ham 3 dona bo'lishi kerak (4 emas!)

7. **Savatni oching**
   - Savat tugmasini bosing
   - ✅ 3 dona Vertu ko'rinishi kerak
   - ✅ + tugma DISABLE bo'lishi kerak
   - ✅ Stock: "3 dona mavjud" (qizil rangda)

8. **+ tugmani bosishga harakat qiling**
   - + tugmani bosing
   - ❌ Alert chiqishi kerak:
     ```
     ⚠️ STOCK LIMIT!
     
     Faqat 3 dona mavjud!
     
     Savatda: 3 dona
     Qo'shmoqchisiz: 1 dona
     Jami: 4 dona
     
     Bu stock limitidan oshib ketadi!
     ```

---

### Test 2: iPhone 15 Pro Max (15 dona stock)

1. **iPhone 15 Pro Max ni toping**
   - Narxi: 18,500,000 so'm
   - Stock: 15 dona

2. **5 marta qo'shing**
   - ✅ Savatda 5 dona bo'lishi kerak
   - ✅ + tugma ACTIVE bo'lishi kerak

3. **10 marta qo'shing**
   - ✅ Savatda 10 dona bo'lishi kerak
   - ✅ + tugma ACTIVE bo'lishi kerak

4. **15 marta qo'shing**
   - ✅ Savatda 15 dona bo'lishi kerak
   - ✅ + tugma DISABLE bo'lishi kerak

5. **16-chi marta qo'shishga harakat qiling**
   - ❌ Alert chiqishi kerak
   - ❌ Savatda hali ham 15 dona bo'lishi kerak

---

### Test 3: Redmi Note 13 Pro (25 dona stock)

1. **Redmi Note 13 Pro ni toping**
   - Narxi: 3,200,000 so'm
   - Stock: 25 dona

2. **20 marta qo'shing**
   - ✅ Savatda 20 dona bo'lishi kerak
   - ✅ + tugma ACTIVE bo'lishi kerak

3. **25 marta qo'shing**
   - ✅ Savatda 25 dona bo'lishi kerak
   - ✅ + tugma DISABLE bo'lishi kerak

4. **26-chi marta qo'shishga harakat qiling**
   - ❌ Alert chiqishi kerak
   - ❌ Savatda hali ham 25 dona bo'lishi kerak

---

## 🔍 Tekshirish Ro'yxati

### Bosh Sahifa:
- [ ] Stock ma'lumoti to'g'ri ko'rsatiladi (masalan: "3 dona mavjud")
- [ ] Stock kam bo'lsa sariq rangda (≤10)
- [ ] Stock ko'p bo'lsa yashil rangda (>10)
- [ ] Stock limitidan oshganda alert chiqadi
- [ ] Stock limitidan oshganda savatga qo'shilmaydi

### Savat (CartSidebar):
- [ ] Har bir mahsulotda stock ma'lumoti ko'rsatiladi
- [ ] Stock kam bo'lsa qizil rangda (≤3)
- [ ] Stock ko'p bo'lsa yashil rangda (>3)
- [ ] + tugma stock limitida disable bo'ladi
- [ ] + tugmani bosganda alert chiqadi (agar limit bo'lsa)
- [ ] - tugma har doim active
- [ ] Miqdor to'g'ri ko'rsatiladi

### Buyurtma Berish:
- [ ] Buyurtma muvaffaqiyatli beriladi
- [ ] Savat tozalanadi
- [ ] Telegram xabari yuboriladi (agar Chat ID sozlangan bo'lsa)

---

## 🐛 Agar Ishlamasa

### 1. localStorage ni tozalang:
```javascript
localStorage.clear()
location.reload()
```

### 2. Browser cache ni tozalang:
- Chrome: Ctrl + Shift + Delete
- Firefox: Ctrl + Shift + Delete
- Edge: Ctrl + Shift + Delete

### 3. Hard reload qiling:
- Chrome: Ctrl + Shift + R
- Firefox: Ctrl + Shift + R
- Edge: Ctrl + Shift + R

### 4. Incognito/Private mode da test qiling:
- Chrome: Ctrl + Shift + N
- Firefox: Ctrl + Shift + P
- Edge: Ctrl + Shift + N

### 5. Console da xatolarni tekshiring:
- F12 ni bosing
- Console tabga o'ting
- Qizil xatolar bormi tekshiring

---

## 📊 Kutilgan Natijalar

### ✅ Ishlashi Kerak:
1. Stock limitidan oshib bo'lmaydi
2. Alert xabarlari chiqadi
3. + tugma disable bo'ladi
4. Savat to'g'ri ishlaydi
5. Buyurtma berish ishlaydi

### ❌ Ishlamasligi Kerak:
1. Stock limitidan oshib qo'shilmasin
2. + tugma stock limitida active bo'lmasin
3. Stock ma'lumoti 0 yoki undefined bo'lmasin

---

## 📞 Yordam

Agar muammo bo'lsa:
1. `KAMCHILIKLAR.md` ni o'qing
2. `TUZATISHLAR_HISOBOTI.md` ni o'qing
3. Console da xatolarni tekshiring
4. localStorage ni tozalang va qayta test qiling

---

**Test Sanasi:** 01.06.2026  
**Versiya:** 2.0  
**Status:** ✅ Tayyor
