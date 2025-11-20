# 🚀 Kurulum Rehberi

## Ön Koşullar

- Node.js 18+
- npm veya yarn
- Git

## Adım 1: Depoyu Klonla

```bash
git clone https://github.com/ayhan531/web.git
cd web/web-app
```

## Adım 2: Bağımlılıkları Yükle

```bash
npm install
```

## Adım 3: Ortam Değişkenlerini Ayarla

`.env.local` dosyası oluştur:

```env
# Veritabanı
DATABASE_URL="file:./prisma/dev.db"

# JWT Konfigürasyonu
JWT_SECRET="your-super-secret-key-change-in-production"
ADMIN_JWT_SECRET="admin-secret-key-change-in-production"

# Market Update API Key
MARKET_UPDATE_API_KEY="your-market-update-api-key"

# Node Ortamı
NODE_ENV="development"
```

## Adım 4: Veritabanını Hazırla

```bash
# Veritabanı şemasını oluştur
npx prisma db push

# Başlangıç verilerini yükle
npm run seed
```

## Adım 5: Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 📝 Test Hesapları

### Admin
- **Email:** admin@local
- **Şifre:** Admin123!

### Kullanıcı
- **Email:** test@local
- **Şifre:** Test123!

## 📁 Önemli Dosyalar

- `prisma/schema.prisma` - Veritabanı şeması
- `prisma/seed.js` - Başlangıç verileri
- `src/app/api/` - API routes
- `src/lib/auth.ts` - Kimlik doğrulama
- `src/lib/db.ts` - Prisma client

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Build
npm run build

# Üretim sunucusu
npm start

# Linter
npm run lint

# Prisma Studio (Veritabanı GUI)
npx prisma studio

# Seed verilerini yeniden yükle
npm run seed
```

## 🗄️ Veritabanı Yönetimi

### Veritabanını Sıfırla

```bash
npx prisma migrate reset
```

### Veritabanını Görüntüle

```bash
npx prisma studio
```

### Migration Oluştur

```bash
npx prisma migrate dev --name migration_name
```

## 🔐 Güvenlik Ayarları

### Üretim Ortamında

1. **JWT_SECRET** değiştir - Güçlü bir anahtar kullan
2. **ADMIN_JWT_SECRET** değiştir
3. **MARKET_UPDATE_API_KEY** değiştir
4. **DATABASE_URL** - Güvenli bir veritabanı kullan (PostgreSQL, MySQL, vb.)
5. **NODE_ENV** = "production" ayarla

### HTTPS Etkinleştir

Üretim ortamında HTTPS zorunludur.

## 📊 Piyasa Verilerini Güncelle

### Manuel Güncelleme

```bash
curl -X POST http://localhost:3000/api/market-update \
  -H "x-api-key: your-market-update-api-key"
```

### Otomatik Güncelleme (Cron Job)

Vercel Cron Jobs veya harici cron servisi kullan:

```bash
# Her 5 dakikada bir
*/5 * * * * curl -X POST https://your-domain.com/api/market-update \
  -H "x-api-key: your-market-update-api-key"
```

## 🚀 Deployment

### Vercel'e Deploy

```bash
npm i -g vercel
vercel
```

### Docker ile Deploy

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

## 🐛 Sorun Giderme

### "Prisma Client not found" hatası

```bash
npx prisma generate
```

### Veritabanı bağlantı hatası

```bash
# Veritabanını sıfırla
npx prisma migrate reset

# Seed'i yeniden çalıştır
npm run seed
```

### Port 3000 zaten kullanımda

```bash
# Farklı port kullan
PORT=3001 npm run dev
```

## 📚 Kaynaklar

- [Next.js Dokumentasyon](https://nextjs.org/docs)
- [Prisma Dokumentasyon](https://www.prisma.io/docs)
- [React Dokumentasyon](https://react.dev)
- [TypeScript Dokumentasyon](https://www.typescriptlang.org/docs)

## 💬 Destek

Sorularınız için GitHub Issues'ı kullanın.

---

**Son Güncelleme:** 2025-11-20
