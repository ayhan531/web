# 📚 API Dokumentasyonu

## Base URL

```
http://localhost:3000/api
```

## Kimlik Doğrulama

Tüm korumalı endpoint'ler için `auth-token` cookie'si gereklidir.

```bash
curl -H "Cookie: auth-token=YOUR_TOKEN" http://localhost:3000/api/account
```

## Endpoints

### 🔐 Kimlik Doğrulama (Auth)

#### Kayıt
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}

Response (200):
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

#### Giriş
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response (200):
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

#### Çıkış
```
POST /auth/logout

Response (200):
{
  "message": "Logged out successfully"
}
```

---

### 💼 Hesap Yönetimi (Account)

#### Hesap Bilgilerini Getir
```
GET /account
Authorization: Cookie (auth-token)

Response (200):
{
  "id": 1,
  "userId": 1,
  "balance": 10000.00,
  "totalInvested": 1500.00,
  "totalReturns": 150.00,
  "createdAt": "2025-11-20T00:00:00Z",
  "updatedAt": "2025-11-20T00:00:00Z",
  "portfolio": [...],
  "transactions": [...]
}
```

#### Hesap Oluştur
```
POST /account
Authorization: Cookie (auth-token)

Response (200):
{
  "id": 1,
  "userId": 1,
  "balance": 10000.00,
  "totalInvested": 0.00,
  "totalReturns": 0.00,
  "createdAt": "2025-11-20T00:00:00Z"
}
```

---

### 📊 İşlemler (Transactions)

#### İşlem Geçmişini Getir
```
GET /transactions
Authorization: Cookie (auth-token)

Response (200):
[
  {
    "id": 1,
    "accountId": 1,
    "symbol": "AAPL",
    "type": "BUY",
    "quantity": 10,
    "price": 150.25,
    "totalAmount": 1502.50,
    "commission": 1.50,
    "status": "COMPLETED",
    "createdAt": "2025-11-20T00:00:00Z"
  }
]
```

#### Yeni İşlem Oluştur
```
POST /transactions
Authorization: Cookie (auth-token)
Content-Type: application/json

{
  "symbol": "AAPL",
  "type": "BUY",
  "quantity": 10,
  "price": 150.25
}

Response (200):
{
  "id": 1,
  "accountId": 1,
  "symbol": "AAPL",
  "type": "BUY",
  "quantity": 10,
  "price": 150.25,
  "totalAmount": 1502.50,
  "commission": 1.50,
  "status": "COMPLETED",
  "createdAt": "2025-11-20T00:00:00Z"
}

Error (400):
{
  "error": "Insufficient balance"
}
```

---

### 📈 Piyasa Verileri (Market Data)

#### Tüm Piyasa Verilerini Getir
```
GET /market-data

Response (200):
[
  {
    "id": 1,
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 150.25,
    "change": 2.50,
    "changePercent": 1.69,
    "high": 152.00,
    "low": 148.50,
    "volume": 1000000,
    "marketCap": "2.5T",
    "lastUpdated": "2025-11-20T00:00:00Z",
    "updatedAt": "2025-11-20T00:00:00Z"
  }
]
```

#### Belirli Sembolün Verilerini Getir
```
GET /market-data?symbol=AAPL

Response (200):
{
  "id": 1,
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "price": 150.25,
  "change": 2.50,
  "changePercent": 1.69,
  "high": 152.00,
  "low": 148.50,
  "volume": 1000000,
  "marketCap": "2.5T",
  "lastUpdated": "2025-11-20T00:00:00Z",
  "updatedAt": "2025-11-20T00:00:00Z"
}
```

#### Piyasa Verisi Güncelle
```
POST /market-data
Content-Type: application/json

{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "price": 150.25,
  "change": 2.50,
  "changePercent": 1.69,
  "high": 152.00,
  "low": 148.50,
  "volume": 1000000
}

Response (200):
{
  "id": 1,
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "price": 150.25,
  "change": 2.50,
  "changePercent": 1.69,
  "high": 152.00,
  "low": 148.50,
  "volume": 1000000,
  "marketCap": null,
  "lastUpdated": "2025-11-20T00:00:00Z",
  "updatedAt": "2025-11-20T00:00:00Z"
}
```

#### Piyasa Verilerini Başlat
```
PUT /market-data

Response (200):
{
  "message": "Market data initialized"
}
```

---

### 📊 Portföy Analizi (Portfolio Analysis)

#### Portföy Analizi Getir
```
GET /portfolio-analysis
Authorization: Cookie (auth-token)

Response (200):
{
  "summary": {
    "totalBalance": 8497.50,
    "totalPortfolioValue": 1502.50,
    "totalInvested": 1502.50,
    "totalGainLoss": 0.00,
    "gainLossPercent": 0.00,
    "totalReturns": 0.00
  },
  "allocation": [
    {
      "symbol": "AAPL",
      "value": 1502.50,
      "percentage": 100.00
    }
  ],
  "performance": {
    "bestPerformer": {
      "symbol": "AAPL",
      "gainLossPercent": 0.00,
      "gainLoss": 0.00
    },
    "worstPerformer": {
      "symbol": "AAPL",
      "gainLossPercent": 0.00,
      "gainLoss": 0.00
    }
  },
  "transactions": {
    "total": 1,
    "buy": 1,
    "sell": 0,
    "avgValue": 1502.50
  },
  "diversification": {
    "holdingCount": 1,
    "concentration": 100.00
  }
}
```

---

### 👥 Admin - Kullanıcı Yönetimi (Admin Users)

#### Tüm Kullanıcıları Listele
```
GET /admin/users
Authorization: Cookie (auth-token, ADMIN role required)

Response (200):
[
  {
    "id": 1,
    "email": "admin@local",
    "name": null,
    "role": "ADMIN",
    "createdAt": "2025-11-20T00:00:00Z",
    "account": {
      "balance": 10000.00,
      "totalInvested": 0.00,
      "totalReturns": 0.00
    }
  }
]
```

#### Kullanıcı Rolünü Değiştir
```
PATCH /admin/users
Authorization: Cookie (auth-token, ADMIN role required)
Content-Type: application/json

{
  "userId": 2,
  "role": "ADMIN"
}

Response (200):
{
  "id": 2,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "ADMIN"
}
```

#### Kullanıcı Sil
```
DELETE /admin/users
Authorization: Cookie (auth-token, ADMIN role required)
Content-Type: application/json

{
  "userId": 2
}

Response (200):
{
  "message": "User deleted"
}
```

---

### 📊 Admin - İstatistikler (Admin Stats)

#### Sistem İstatistiklerini Getir
```
GET /admin/stats
Authorization: Cookie (auth-token, ADMIN role required)

Response (200):
{
  "users": {
    "total": 2,
    "admins": 1,
    "regularUsers": 1
  },
  "accounts": {
    "total": 2,
    "totalBalance": 20000.00,
    "totalInvested": 1500.00,
    "totalReturns": 150.00,
    "averageBalance": 10000.00
  },
  "transactions": {
    "total": 1,
    "buy": 1,
    "sell": 0
  },
  "market": {
    "activeSymbols": 8
  }
}
```

---

### 🔄 Piyasa Güncellemeleri (Market Update)

#### Piyasa Verilerini Güncelle (Cron Job)
```
POST /market-update
X-API-Key: your-market-update-api-key

Response (200):
{
  "success": true,
  "message": "Market data updated successfully",
  "timestamp": "2025-11-20T00:00:00Z"
}
```

---

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | Başarılı |
| 400 | Geçersiz istek |
| 401 | Yetkisiz (kimlik doğrulama gerekli) |
| 403 | Yasak (yetki yetersiz) |
| 404 | Bulunamadı |
| 500 | Sunucu hatası |

---

## Örnek Requests

### cURL ile

```bash
# Kayıt
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "name": "John Doe"
  }'

# Giriş
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }' \
  -c cookies.txt

# Hesap Bilgileri
curl -X GET http://localhost:3000/api/account \
  -b cookies.txt

# İşlem Oluştur
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "symbol": "AAPL",
    "type": "BUY",
    "quantity": 10,
    "price": 150.25
  }'
```

### JavaScript ile

```javascript
// Kayıt
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePassword123!',
    name: 'John Doe'
  })
});

// İşlem Oluştur
const txResponse = await fetch('/api/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    symbol: 'AAPL',
    type: 'BUY',
    quantity: 10,
    price: 150.25
  })
});
```

---

**Son Güncelleme:** 2025-11-20
