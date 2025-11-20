# Borsa Trading Platform - Tam Özellikler Rehberi

## 🎯 Proje Özeti

Tam işlevli bir borsa trading platformu. Kullanıcılar hisse satın alabilir, satabilir, portföylerini yönetebilir ve gerçek zamanlı piyasa verilerini takip edebilirler. Admin paneli ile sistem yönetimi yapılabilir.

## 🚀 Başlangıç

### Kurulum

```bash
cd web-app
npm install
npx prisma db push
npm run seed
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 👤 Test Hesapları

### Admin Hesabı
- **Email:** admin@local
- **Şifre:** Admin123!
- **Rol:** Admin

### Kullanıcı Hesabı
- **Email:** test@local
- **Şifre:** Test123!
- **Rol:** User
- **Başlangıç Bakiyesi:** $10,000

## 📊 Ana Özellikler

### 1. Kullanıcı Yönetimi
- ✅ Kayıt (Register)
- ✅ Giriş (Login)
- ✅ Oturum yönetimi
- ✅ JWT tabanlı kimlik doğrulama
- ✅ Şifre hashleme (bcryptjs)

### 2. Hesap Yönetimi
- ✅ Otomatik hesap oluşturma
- ✅ Bakiye takibi
- ✅ Toplam yatırım hesaplaması
- ✅ Kazanç/Kayıp takibi

### 3. İşlem Sistemi (Trading)
- ✅ Hisse satın alma (BUY)
- ✅ Hisse satma (SELL)
- ✅ Gerçek zamanlı fiyat güncellemeleri
- ✅ İşlem komisyonu (%0.1)
- ✅ İşlem geçmişi

### 4. Portföy Yönetimi
- ✅ Hisse takibi
- ✅ Ortalama fiyat hesaplaması
- ✅ Kazanç/Kayıp hesaplaması
- ✅ Portföy değeri hesaplaması

### 5. Piyasa Verileri
- ✅ 8 Ana hisse sembolü (AAPL, GOOGL, MSFT, AMZN, TSLA, NVDA, META, NFLX)
- ✅ Gerçek zamanlı fiyat bilgisi
- ✅ Günlük değişim takibi
- ✅ Yüzdelik değişim

### 6. Admin Paneli
- ✅ Kullanıcı yönetimi
- ✅ Sistem istatistikleri
- ✅ Rol yönetimi (USER/ADMIN)
- ✅ Kullanıcı silme
- ✅ Hesap bilgileri görüntüleme

### 7. Dashboard
- ✅ Portföy özeti
- ✅ Bakiye bilgisi
- ✅ Kazanç/Kayıp özeti
- ✅ Son işlemler listesi

## 🔌 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Kayıt
- `POST /api/auth/login` - Giriş
- `POST /api/auth/logout` - Çıkış

### Hesap
- `GET /api/account` - Hesap bilgilerini getir
- `POST /api/account` - Hesap oluştur

### İşlemler
- `GET /api/transactions` - İşlem geçmişini getir
- `POST /api/transactions` - Yeni işlem oluştur

### Piyasa Verileri
- `GET /api/market-data` - Tüm piyasa verilerini getir
- `GET /api/market-data?symbol=AAPL` - Belirli sembolün verilerini getir
- `POST /api/market-data` - Piyasa verisi güncelle
- `PUT /api/market-data` - Piyasa verilerini başlat

### Admin
- `GET /api/admin/users` - Tüm kullanıcıları listele
- `PATCH /api/admin/users` - Kullanıcı rolünü güncelle
- `DELETE /api/admin/users` - Kullanıcı sil
- `GET /api/admin/stats` - Sistem istatistikleri

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── api/
│   │   ├── account/          # Hesap yönetimi
│   │   ├── admin/            # Admin işlemleri
│   │   ├── auth/             # Kimlik doğrulama
│   │   ├── market-data/      # Piyasa verileri
│   │   └── transactions/     # İşlem yönetimi
│   ├── admin/                # Admin paneli sayfaları
│   ├── dashboard/            # Kullanıcı dashboard'u
│   └── trade/                # İşlem yapma sayfası
├── components/               # React bileşenleri
├── lib/
│   ├── auth.ts              # Kimlik doğrulama fonksiyonları
│   └── db.ts                # Prisma client
└── types/                    # TypeScript türleri

prisma/
├── schema.prisma            # Veritabanı şeması
└── seed.js                  # Başlangıç verileri
```

## 🗄️ Veritabanı Modelleri

### User
- id, email, name, password, role, createdAt, updatedAt
- İlişkiler: account, sessions, alerts

### Account
- id, userId, balance, totalInvested, totalReturns
- İlişkiler: portfolio, transactions

### Portfolio
- id, accountId, symbol, quantity, averagePrice, currentPrice, totalValue, gainLoss, gainLossPercent
- Benzersiz: (accountId, symbol)

### Transaction
- id, accountId, symbol, type (BUY/SELL), quantity, price, totalAmount, commission, status

### MarketData
- id, symbol, name, price, change, changePercent, high, low, volume, marketCap

### Session
- id, userId, token, expiresAt, createdAt

## 🔐 Güvenlik Özellikleri

- ✅ JWT tabanlı kimlik doğrulama
- ✅ Şifre hashleme (bcryptjs)
- ✅ HttpOnly cookies
- ✅ CSRF koruması
- ✅ Role-based access control (RBAC)
- ✅ Token doğrulama

## 📈 Örnek İşlem Akışı

1. **Kayıt**: Kullanıcı email ve şifre ile kayıt olur
2. **Hesap Oluşturma**: Otomatik olarak $10,000 başlangıç bakiyesi ile hesap oluşturulur
3. **Piyasa Görüntüleme**: Kullanıcı piyasa verilerini görüntüler
4. **İşlem Yapma**: 
   - Satın Al: Bakiyeden tutar düşülür, portföye hisse eklenir
   - Sat: Portföyden hisse çıkarılır, bakiyeye tutar eklenir
5. **Portföy Takibi**: Kazanç/Kayıp otomatik hesaplanır

## 🔄 Gerçek Zamanlı Güncellemeler

Şu anda mock veriler kullanılmaktadır. Gerçek veriler için:

1. **Alpha Vantage API** entegrasyonu
2. **WebSocket** ile canlı fiyat güncellemeleri
3. **Cron jobs** ile periyodik veri güncellemeleri

## 📱 Sayfalar

### Kullanıcı Sayfaları
- `/` - Ana sayfa
- `/dashboard` - Dashboard
- `/trade` - İşlem yapma

### Admin Sayfaları
- `/admin` - Admin dashboard
- `/admin/users` - Kullanıcı yönetimi
- `/admin/stats` - İstatistikler

## 🚀 Sonraki Adımlar

1. **Gerçek API Entegrasyonu**
   - Alpha Vantage, IEX Cloud, vb. API'ler
   - WebSocket ile canlı fiyat güncellemeleri

2. **Gelişmiş Özellikler**
   - Teknik analiz göstergeleri
   - Fiyat uyarıları
   - Portföy analizi
   - Yatırım önerileri

3. **Mobil Uygulama**
   - React Native ile mobil app
   - Push notifications

4. **Ödeme Entegrasyonu**
   - Stripe/PayPal
   - Gerçek para işlemleri

5. **Sosyal Özellikler**
   - Kullanıcı profilleri
   - Portföy paylaşımı
   - Yatırımcı topluluğu

## 📞 Destek

Sorularınız için lütfen iletişime geçin.

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 2025-11-20
