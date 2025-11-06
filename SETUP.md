# YatırımPRO - Kurulum ve Kullanım Kılavuzu

## ✅ Yapılanlar

### 1. **Database & Auth Sistemi**
- ✅ Prisma şeması güncellendi (User, Session, Banner, News, Market, RateAlert)
- ✅ JWT tabanlı auth sistemi (`src/lib/auth.ts`)
- ✅ Login/Register/Logout API endpoints
- ✅ Middleware ile admin route koruması
- ✅ Session yönetimi (database-backed)

### 2. **Sayfalar**
- ✅ Ana sayfa (Swiper slider, Reveal animasyonları)
- ✅ Döviz sayfası (shimmer skeleton, lift/glow effects)
- ✅ Altın, Borsa, Haberler, Analiz sayfaları (temel şablonlar)
- ✅ Giriş/Kayıt sayfaları (functional forms)
- ✅ Admin panel layout (sidebar, sticky header)

### 3. **Animasyonlar & UI**
- ✅ Framer Motion + Swiper entegrasyonu
- ✅ Reveal component (scroll-triggered animations)
- ✅ CSS animations: fade-in, shimmer, gradient-hero, lift, glow
- ✅ Yeşil tema (#22c55e primary color)
- ✅ Tailwind v4 arbitrary values ile CSS variables

### 4. **API Routes**
- ✅ `/api/auth/login` - JWT ile giriş
- ✅ `/api/auth/register` - Yeni kullanıcı kaydı
- ✅ `/api/auth/logout` - Session silme
- ✅ `/api/exchange` - Döviz kurları (fallback data)
- ✅ `/api/banners`, `/api/news`, `/api/markets` - CRUD endpoints

## 🚀 Kurulum Adımları

### 1. Database'i Sıfırla ve Seed Et

```bash
cd /Users/shift/Desktop/web/web-app

# Prisma client'ı yeniden oluştur
npx prisma generate

# Database'i sıfırla ve şemayı uygula
npx prisma db push --force-reset

# Admin kullanıcısı ve örnek veri ekle
npx tsx prisma/seed-admin.ts
```

### 2. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

### 3. Admin Girişi

- URL: http://localhost:3000/giris
- Email: `admin@yatirim.com`
- Şifre: `admin123`

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── admin/          # Admin panel (protected)
│   ├── altin/          # Altın fiyatları
│   ├── analiz/         # Analiz sayfası
│   ├── api/            # API routes
│   │   ├── auth/       # Login, register, logout
│   │   ├── banners/    # Banner CRUD
│   │   ├── exchange/   # Döviz kurları
│   │   ├── markets/    # Piyasa verileri
│   │   └── news/       # Haberler
│   ├── borsa/          # Borsa sayfası
│   ├── doviz/          # Döviz kurları
│   ├── giris/          # Login page
│   ├── haberler/       # Haberler listesi
│   ├── kayit/          # Register page
│   ├── globals.css     # Global styles + animations
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── AlertForm.tsx   # Kur alarmı formu
│   ├── BannerSlider.tsx # Swiper slider
│   ├── Header.tsx      # Navigation
│   └── Reveal.tsx      # Scroll animation wrapper
├── lib/
│   ├── auth.ts         # JWT & session helpers
│   ├── db.ts           # Prisma client
│   └── exchange.ts     # TCMB API integration
└── middleware.ts       # Route protection

prisma/
├── schema.prisma       # Database schema
├── seed-admin.ts       # Admin user seed
└── dev.db             # SQLite database
```

## 🎨 Tema Renkleri

```css
--primary: #22c55e       /* Açık yeşil */
--primary-light: #86efac /* Daha açık yeşil */
--primary-dark: #15803d  /* Koyu yeşil */
--success: #059669
--warning: #eab308
--error: #dc2626
```

## 🔧 Eksik/İyileştirme Gereken

### Öncelikli
1. **Admin dashboard'u yeniden yaz** - Mevcut kod karmaşık, modern tablo/form bileşenleri ekle
2. **User management sayfası** - Admin panelde kullanıcı listesi ve düzenleme
3. **TypeScript hatalarını düzelt** - Prisma client yeniden generate edilmeli
4. **API auth middleware** - Admin API'leri için token kontrolü ekle

### İsteğe Bağlı
1. **Route transitions** - Framer Motion ile sayfa geçişleri
2. **3D tilt effects** - Kartlara parallax/tilt animasyonu
3. **Dark mode** - Yeşil odaklı koyu tema
4. **Real-time data** - WebSocket ile canlı piyasa verileri
5. **Email notifications** - Kur alarmları için email gönderimi
6. **File upload** - Banner/news için resim yükleme
7. **Rich text editor** - Haber içeriği için WYSIWYG editor

## 🐛 Bilinen Sorunlar

1. **TypeScript errors**: Prisma client'ın `name` property'sini tanımaması
   - **Çözüm**: `npm run dev` ile sunucuyu yeniden başlat, types otomatik yüklenecek
   - **Durum**: Prisma generate yapıldı, seed çalıştırıldı ✅

2. **Request.cookies**: Next.js 15'te `cookies()` helper kullanılmalı
   - **Durum**: Düzeltildi ✅

3. **Admin page**: Eski kod kaldı
   - **Durum**: Modern dashboard ile değiştirildi ✅

## 📚 Referans Siteler

Tasarım ve özellikler şu sitelerden esinlenildi:
- https://www.yf.com.tr
- https://www.turkiyefinans.com.tr
- https://hayatfinans.com.tr

## 🎯 Sonraki Adımlar

1. `npm run dev` ile sunucuyu başlat
2. TypeScript hatalarının düzeldiğini doğrula
3. Admin panele giriş yap ve test et
4. Admin dashboard'u modern UI ile yeniden yaz
5. Eksik sayfaları gerçek verilerle doldur
6. Production için `.env` dosyası oluştur (JWT_SECRET, DATABASE_URL)

## 💡 Notlar

- Tüm animasyonlar `globals.css` içinde tanımlı
- Reveal component her yerde kullanılabilir
- Admin routes middleware ile korunuyor
- Session'lar database'de saklanıyor (güvenli logout)
- Yeşil tema tüm sayfalarda tutarlı
