const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const password = await bcrypt.hash('Admin123', 10);

  const existing = await prisma.user.findUnique({ where: { email: 'admin@local.com' } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email: 'admin@local.com',
        password,
        role: 'ADMIN',
      },
    });
    console.log('Created admin user: admin@local / Admin123!');
  } else {
    console.log('Admin user already exists');
  }

  await prisma.banner.deleteMany();
  await prisma.banner.createMany({
    data: [
      { 
        title: 'Borsa İstanbul\'da Yeni Fırsatlar', 
        content: 'BIST 100 endeksinde yükseliş trendi devam ediyor. Profesyonel analiz araçlarımızla piyasaları takip edin.', 
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
        order: 3, 
        published: true 
      },
      { 
        title: 'Canlı Piyasa Verileri', 
        content: 'Anlık borsa verileri, teknik analizler ve uzman yorumlarıyla yatırım kararlarınızı güçlendirin.', 
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=600&fit=crop',
        order: 2, 
        published: true 
      },
      { 
        title: 'Yatırım Fırsatlarını Kaçırmayın', 
        content: 'Hisse senetleri, döviz, altın ve kripto para piyasalarında anlık işlem yapın.', 
        image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=600&fit=crop',
        order: 1, 
        published: true 
      },
    ],
  });

  await prisma.news.deleteMany();
  await prisma.news.createMany({
    data: [
      { 
        title: 'BIST 100 Endeksi Yükselişte', 
        slug: 'bist-100-yukseliste', 
        excerpt: 'Borsa İstanbul ana endeksi BIST 100, güçlü alıcı ilgisiyle yükseliş trendini sürdürüyor.',
        content: 'Piyasa uzmanları, yabancı yatırımcı ilgisinin artmasıyla birlikte endeksin yükseliş trendini devam ettireceğini öngörüyor.'
      },
      { 
        title: 'Bankacılık Hisseleri Dikkat Çekiyor', 
        slug: 'bankacilik-hisseleri', 
        excerpt: 'Bankacılık sektörü hisseleri, güçlü bilanço açıklamalarının ardından yatırımcıların radarında.',
        content: 'Özellikle büyük ölçekli bankaların hisseleri, sektör ortalamasının üzerinde performans gösteriyor.'
      },
      { 
        title: 'Dolar/TL Kurunda Son Durum', 
        slug: 'dolar-tl-kuru', 
        excerpt: 'Döviz piyasalarında Dolar/TL kuru, Merkez Bankası açıklamalarının ardından yatay seyrediyor.',
        content: 'Analistler, önümüzdeki hafta açıklanacak ekonomik verilerin kur üzerinde etkili olacağını belirtiyor.'
      },
      { 
        title: 'Altın Fiyatlarında Yükseliş Beklentisi', 
        slug: 'altin-fiyatlari', 
        excerpt: 'Küresel piyasalardaki belirsizlikler nedeniyle altın fiyatlarında yükseliş beklentisi artıyor.',
        content: 'Yatırımcılar, güvenli liman arayışıyla altına yönelmeye devam ediyor.'
      },
      { 
        title: 'Teknoloji Şirketleri Büyümeye Devam Ediyor', 
        slug: 'teknoloji-sirketleri', 
        excerpt: 'Yerli teknoloji şirketlerinin hisseleri, güçlü büyüme rakamlarıyla öne çıkıyor.',
        content: 'Dijital dönüşüm ve e-ticaret alanındaki gelişmeler, teknoloji şirketlerinin değerini artırıyor.'
      },
      { 
        title: 'Enerji Sektöründe Yeni Yatırımlar', 
        slug: 'enerji-sektoru', 
        excerpt: 'Yenilenebilir enerji yatırımları, sektörde yeni fırsatlar yaratıyor.',
        content: 'Uzmanlar, enerji sektörü hisselerinin uzun vadede değer kazanacağını öngörüyor.'
      },
    ],
  });

  await prisma.market.deleteMany();
  await prisma.market.createMany({
    data: [
      { symbol: 'USDTRY', price: '42.09', change: '0.06' },
      { symbol: 'EURTRY', price: '48.39', change: '0.25' },
    ],
  });

  // Market Data ekle - 30+ sembol
  await prisma.marketData.deleteMany();
  await prisma.marketData.createMany({
    data: [
      // Tech Giants
      { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5, changePercent: 1.69 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 140.80, change: -1.2, changePercent: -0.84 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 380.50, change: 5.2, changePercent: 1.38 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 170.45, change: 3.1, changePercent: 1.85 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.20, change: 12.5, changePercent: 1.45 },
      { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.75, change: 8.3, changePercent: 1.73 },
      
      // EV & Auto
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.30, change: -4.5, changePercent: -1.83 },
      { symbol: 'GM', name: 'General Motors', price: 42.15, change: 1.2, changePercent: 2.93 },
      { symbol: 'F', name: 'Ford Motor', price: 10.85, change: 0.3, changePercent: 2.84 },
      
      // Entertainment & Media
      { symbol: 'NFLX', name: 'Netflix Inc.', price: 245.60, change: 2.8, changePercent: 1.15 },
      { symbol: 'DIS', name: 'Walt Disney', price: 92.50, change: -1.5, changePercent: -1.60 },
      { symbol: 'PARA', name: 'Paramount Global', price: 15.20, change: 0.8, changePercent: 5.56 },
      
      // Finance & Banking
      { symbol: 'JPM', name: 'JPMorgan Chase', price: 195.75, change: 3.2, changePercent: 1.66 },
      { symbol: 'BAC', name: 'Bank of America', price: 38.45, change: 1.1, changePercent: 2.94 },
      { symbol: 'WFC', name: 'Wells Fargo', price: 72.30, change: 2.5, changePercent: 3.58 },
      { symbol: 'GS', name: 'Goldman Sachs', price: 485.20, change: 4.2, changePercent: 0.87 },
      
      // Healthcare & Pharma
      { symbol: 'JNJ', name: 'Johnson & Johnson', price: 155.80, change: 1.2, changePercent: 0.78 },
      { symbol: 'PFE', name: 'Pfizer Inc.', price: 28.45, change: -0.8, changePercent: -2.73 },
      { symbol: 'MRNA', name: 'Moderna Inc.', price: 45.30, change: 2.1, changePercent: 4.85 },
      { symbol: 'UNH', name: 'UnitedHealth Group', price: 485.60, change: 5.2, changePercent: 1.08 },
      
      // Energy
      { symbol: 'XOM', name: 'Exxon Mobil', price: 115.40, change: 2.3, changePercent: 2.03 },
      { symbol: 'CVX', name: 'Chevron Corp', price: 155.80, change: 3.1, changePercent: 2.03 },
      { symbol: 'COP', name: 'ConocoPhillips', price: 125.50, change: 2.8, changePercent: 2.28 },
      
      // Consumer & Retail
      { symbol: 'WMT', name: 'Walmart Inc.', price: 85.30, change: 1.5, changePercent: 1.79 },
      { symbol: 'COST', name: 'Costco Wholesale', price: 925.40, change: 8.2, changePercent: 0.89 },
      { symbol: 'MCD', name: 'McDonald\'s Corp', price: 295.60, change: 2.1, changePercent: 0.72 },
      { symbol: 'SBUX', name: 'Starbucks Corp', price: 98.75, change: 1.8, changePercent: 1.85 },
      
      // Industrial & Manufacturing
      { symbol: 'BA', name: 'Boeing Co.', price: 180.45, change: 3.2, changePercent: 1.80 },
      { symbol: 'CAT', name: 'Caterpillar Inc.', price: 385.20, change: 4.5, changePercent: 1.18 },
      { symbol: 'MMM', name: '3M Company', price: 102.30, change: 1.2, changePercent: 1.19 },
      
      // Communication & Telecom
      { symbol: 'VZ', name: 'Verizon Communications', price: 42.80, change: 0.8, changePercent: 1.90 },
      { symbol: 'T', name: 'AT&T Inc.', price: 22.15, change: 0.3, changePercent: 1.37 },
      
      // Crypto & Digital
      { symbol: 'COIN', name: 'Coinbase Global', price: 125.80, change: 5.2, changePercent: 4.31 },
      { symbol: 'MSTR', name: 'MicroStrategy', price: 285.40, change: 12.5, changePercent: 4.59 },
    ],
  });

  // Test kullanıcısı ve hesap oluştur
  const existingTestUser = await prisma.user.findUnique({ where: { email: 'test@local' } });
  let testUser = existingTestUser;
  
  if (!existingTestUser) {
    testUser = await prisma.user.create({
      data: {
        email: 'test@local',
        password: await bcrypt.hash('Test123!', 10),
        name: 'Test Kullanıcı',
        role: 'USER',
      },
    });
  }

  // Test kullanıcısı için hesap oluştur (varsa güncelle)
  if (testUser) {
    await prisma.account.upsert({
      where: { userId: testUser.id },
      update: {},
      create: {
        userId: testUser.id,
        balance: 10000.0,
      },
    });
  }

  console.log('Seeding finished.');
  console.log('Test user: test@local / Test123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
