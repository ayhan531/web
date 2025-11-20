# 🚀 Borsa Trading Platform

Tam işlevli bir borsa trading platformu. Kullanıcılar hisse satın alabilir, satabilir, portföylerini yönetebilir ve gerçek zamanlı piyasa verilerini takip edebilirler.

## ✨ Özellikler

### 👤 Kullanıcı Özellikleri
- ✅ Kayıt ve Giriş
- ✅ Hesap Yönetimi
- ✅ Hisse Satın Alma/Satma
- ✅ Portföy Takibi
- ✅ Kazanç/Kayıp Hesaplaması
- ✅ İşlem Geçmişi
- ✅ Portföy Analizi
- ✅ Piyasa Verileri Takibi

### 👨‍💼 Admin Özellikleri
- ✅ Kullanıcı Yönetimi
- ✅ Rol Yönetimi
- ✅ Sistem İstatistikleri
- ✅ Piyasa Verileri Yönetimi

### 🔐 Güvenlik
- ✅ JWT Kimlik Doğrulama
- ✅ Şifre Hashleme
- ✅ Role-Based Access Control
- ✅ HttpOnly Cookies

## 🚀 Hızlı Başlangıç

### Kurulum

```bash
# Depoyu klonla
git clone https://github.com/ayhan531/web.git
cd web/web-app

# Bağımlılıkları yükle
npm install

# Veritabanını hazırla
npx prisma db push
npm run seed

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

### Test Hesapları

**Admin**
- Email: `admin@local`
- Şifre: `Admin123!`

**Kullanıcı**
- Email: `test@local`
- Şifre: `Test123!`
- Bakiye: $10,000

## 📚 Dokumentasyon

- [Kurulum Rehberi](./SETUP_GUIDE.md) - Detaylı kurulum adımları
- [API Dokumentasyonu](./API_DOCUMENTATION.md) - Tüm API endpoint'leri
- [Proje Özeti](../PROJE_OZETI.md) - Proje hakkında bilgi
- [Trading Platform Rehberi](./TRADING_PLATFORM.md) - Platform özellikleri

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── api/                    # API Routes
│   │   ├── account/           # Hesap yönetimi
│   │   ├── admin/             # Admin işlemleri
│   │   ├── auth/              # Kimlik doğrulama
│   │   ├── market-data/       # Piyasa verileri
│   │   ├── market-update/     # Piyasa güncellemeleri
│   │   ├── portfolio-analysis/# Portföy analizi
│   │   └── transactions/      # İşlem yönetimi
│   ├── admin/                 # Admin sayfaları
│   ├── dashboard/             # Dashboard
│   ├── portfolio-analysis/    # Portföy analizi
│   ├── trade/                 # İşlem yapma
│   └── api-test/              # API test paneli
├── components/                # React bileşenleri
├── lib/
│   ├── auth.ts               # Kimlik doğrulama
│   ├── db.ts                 # Prisma client
│   └── market-updater.ts     # Piyasa güncellemeleri
└── types/                    # TypeScript türleri

prisma/
├── schema.prisma             # Veritabanı şeması
└── seed.js                   # Başlangıç verileri
```

## 🎯 Piyasa Verileri

8 Ana Hisse Sembolü:
- **AAPL** - Apple Inc.
- **GOOGL** - Alphabet Inc.
- **MSFT** - Microsoft Corp.
- **AMZN** - Amazon.com Inc.
- **TSLA** - Tesla Inc.
- **NVDA** - NVIDIA Corp.
- **META** - Meta Platforms Inc.
- **NFLX** - Netflix Inc.

## 🔧 Komutlar

```bash
# Geliştirme
npm run dev

# Build
npm run build

# Üretim
npm start

# Linter
npm run lint

# Seed verilerini yeniden yükle
npm run seed

# Prisma Studio
npx prisma studio
```

## 🌐 Sayfalar

### Kullanıcı
- `/` - Ana sayfa
- `/dashboard` - Dashboard
- `/trade` - İşlem yapma
- `/portfolio-analysis` - Portföy analizi

### Admin
- `/admin` - Admin dashboard
- `/admin/users` - Kullanıcı yönetimi

### Geliştirme
- `/api-test` - API test paneli

## 📊 Teknoloji Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Backend:** Next.js API Routes
- **Veritabanı:** SQLite + Prisma ORM
- **Kimlik Doğrulama:** JWT + bcryptjs
- **Styling:** Tailwind CSS

## 🔄 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Kayıt
- `POST /api/auth/login` - Giriş
- `POST /api/auth/logout` - Çıkış

### Hesap
- `GET /api/account` - Hesap bilgileri
- `POST /api/account` - Hesap oluştur

### İşlemler
- `GET /api/transactions` - İşlem geçmişi
- `POST /api/transactions` - Yeni işlem

### Piyasa
- `GET /api/market-data` - Piyasa verileri
- `POST /api/market-data` - Veri güncelle
- `PUT /api/market-data` - Verileri başlat

### Admin
- `GET /api/admin/users` - Kullanıcı listesi
- `PATCH /api/admin/users` - Rol değiştir
- `DELETE /api/admin/users` - Kullanıcı sil
- `GET /api/admin/stats` - İstatistikler

Detaylı API dokumentasyonu için [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) dosyasını kontrol edin.

## 🚀 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Notlar

- Tüm veriler mock verilerdir
- Gerçek para işlemi yapılmamaktadır
- Eğitim amaçlı bir platformdur
- Üretim ortamı için ek güvenlik önlemleri gereklidir

## 🤝 Katkıda Bulunma

Katkılarınız hoş geldiniz! Lütfen bir pull request açın.

## 📄 Lisans

MIT

## 📞 İletişim

Sorularınız için lütfen iletişime geçin.

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 2025-11-20
