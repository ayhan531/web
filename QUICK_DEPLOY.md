# 🚀 SÜRÜKLE-BIRAK DEPLOY REHBERİ

## En Kolay Yöntem: Vercel Drop

### Adım 1: Build Yap (TAMAMLANDI ✅)

```bash
npm run build
```

### Adım 2: Vercel Drop'a Git

👉 **https://vercel.com/new**

1. "Continue with GitHub" ile giriş yap
2. VEYA "Import Project" yerine altta **"Deploy without Git"** seç
3. **".next" klasörünü sürükle-bırak**

### Klasör Yolu:

```
C:\Users\Cem\Desktop\web 2\web\web-app\.next
```

---

## Alternatif 1: Netlify Drop

👉 **https://app.netlify.com/drop**

1. Giriş yap (ücretsiz hesap oluştur)
2. **"out" veya ".next" klasörünü sürükle**
3. Bitti! 🎉

---

## Alternatif 2: Render.com (Kolay)

👉 **https://render.com**

1. "New Static Site" seç
2. Build Command: `npm run build`
3. Publish Directory: `.next`
4. Deploy!

---

## Alternatif 3: Railway.app (En Kolay - Önerilen)

👉 **https://railway.app**

1. "Deploy from GitHub" VEYA "Empty Project"
2. Root directory'yi seç
3. Otomatik detect eder
4. Deploy! (database dahil ücretsiz)

---

## ⚡ Hızlı Test için: Surge.sh

```bash
npm install -g surge
cd .next
surge
```

Sadece email ver, domain seç, enter! 🚀

---

## 🎯 EN KOLAY 3 YÖNTEM:

### 1️⃣ **Railway** (Önerilen)

- ✅ Database dahil
- ✅ Otomatik HTTPS
- ✅ GitHub gerekmez
- 👉 https://railway.app

### 2️⃣ **Netlify Drop**

- ✅ Sürükle-bırak
- ✅ Anında yayın
- ✅ Ücretsiz SSL
- 👉 https://app.netlify.com/drop

### 3️⃣ **Vercel (GitHub olmadan)**

- ✅ Next.js için optimize
- ✅ Global CDN
- ✅ Anında deploy
- 👉 https://vercel.com/new

---

## 📁 Hangi Klasörü Yükleyeceğim?

**Seçenek A**: Tüm proje (önerilen)

```
C:\Users\Cem\Desktop\web 2\web\web-app
```

(package.json, next.config.ts, src, prisma dahil HER ŞEY)

**Seçenek B**: Sadece build çıktısı

```
C:\Users\Cem\Desktop\web 2\web\web-app\.next
```

(Statik siteler için)

---

## 🔥 TAVSİYEM: Railway

1. https://railway.app aç
2. GitHub ile giriş yap
3. "New Project" → "Deploy from GitHub"
4. VEYA "Empty Project" → dosyaları upload et
5. 2 dakika bekle
6. HAZIR! 🎉

Ücretsiz:

- 500 saat/ay çalışma
- PostgreSQL database
- SSL sertifikası
- Özel domain

Hangisini deneyelim?
