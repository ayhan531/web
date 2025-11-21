# YatırımPRO - Vercel Deploy Rehberi

## 🚀 Vercel'e Deploy Adımları

### 1. GitHub Repository Oluştur
1. [GitHub.com](https://github.com) adresine git
2. Yeni repository oluştur: "yatirim-pro"
3. Public veya Private seç (ücretsiz için Public önerilidir)

### 2. Kodu GitHub'a Pushla

Bu komutları terminalde çalıştır:

```bash
git remote add origin https://github.com/KULLANICI_ADIN/yatirim-pro.git
git branch -M main
git push -u origin main
```

### 3. Vercel'e Deploy

#### Option A: Vercel Dashboard (Önerilen)

1. [vercel.com](https://vercel.com) adresine git
2. "Sign Up" ile GitHub hesabınla giriş yap
3. "New Project" butonuna tıkla
4. GitHub repository'ni seç (yatirim-pro)
5. Ayarlar:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `prisma generate && npm run build`
   - **Output Directory**: `.next`

6. Environment Variables ekle:
   ```
   DATABASE_URL=file:./prod.db
   JWT_SECRET=rastgele-guclu-sifre-123456789
   ```

7. "Deploy" butonuna tıkla
8. 2-3 dakika bekle ✨

#### Option B: Vercel CLI

```bash
# Vercel'e login ol (tarayıcı açılacak)
vercel login

# Deploy et
vercel --prod
```

### 4. Domain Ayarları (Opsiyonel)

Deploy sonrası Vercel size ücretsiz domain verir:
- `https://yatirim-pro.vercel.app`
- `https://yatirim-pro-cemcanavar.vercel.app`

Kendi domain'ini bağlamak için:
1. Vercel Dashboard → Settings → Domains
2. Domain ekle (örn: yatirimpro.com)
3. DNS kayıtlarını güncelle

## 📊 Deploy Edilen Sayfalar

✅ Ana Sayfa - `/`
✅ Hakkımızda - `/hakkimizda`
✅ İnsan Kaynakları - `/insan-kaynaklari`
✅ Yatırımcı İlişkileri - `/yatirimci-iliskileri`
✅ Portföy Yönetimi - `/portfoy-yonetimi`
✅ Kurumsal Finansman - `/kurumsal-finansman`
✅ Yatırım Danışmanlığı - `/yatirim-danismanligi`
✅ İletişim - `/iletisim`
✅ Giriş - `/giris`
✅ Kayıt - `/kayit`
✅ Dashboard - `/dashboard`

## 🔧 Önemli Notlar

### Database
- SQLite production'da çalışmaz
- Vercel'de PostgreSQL kullanmalısınız (ücretsiz: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))

Alternatif ücretsiz database seçenekleri:
- **Neon** (PostgreSQL) - [neon.tech](https://neon.tech)
- **Supabase** (PostgreSQL) - [supabase.com](https://supabase.com)
- **PlanetScale** (MySQL) - [planetscale.com](https://planetscale.com)

### Environment Variables
Vercel Dashboard'da şunları ekle:
```
DATABASE_URL=postgresql://...
JWT_SECRET=super-secret-key-change-this
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

### File Uploads
Vercel'de dosya yükleme kalıcı değil. Cloud storage kullanın:
- **Cloudflare R2** (S3 uyumlu, ücretsiz 10GB)
- **Vercel Blob Storage** (1GB ücretsiz)
- **AWS S3** (5GB ücretsiz)

## 🎯 Deployment Özellikleri

✅ **Otomatik HTTPS**
✅ **Global CDN**
✅ **Automatic Deploys** (GitHub push'ta otomatik)
✅ **Preview Deployments** (her PR için)
✅ **Edge Functions** (hızlı API)
✅ **Analytics** (ücretsiz traffic analizi)

## 🔄 Güncellemeler

Kod değiştirdikçe:
```bash
git add .
git commit -m "Update message"
git push
```

Vercel otomatik deploy eder!

## 📞 Destek

Sorun yaşarsan:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deploy Guide](https://nextjs.org/docs/deployment)
- [Vercel Discord](https://vercel.com/discord)

---

**Not**: İlk deploy 2-3 dakika sürer. Sonraki deploylar 30-60 saniyedir.
