const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const password = await bcrypt.hash('Admin123!', 10);

  const existing = await prisma.user.findUnique({ where: { email: 'admin@local' } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email: 'admin@local',
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

  // Market Data ekle
  await prisma.marketData.deleteMany();
  await prisma.marketData.createMany({
    data: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5, changePercent: 1.69 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 140.80, change: -1.2, changePercent: -0.84 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 380.50, change: 5.2, changePercent: 1.38 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 170.45, change: 3.1, changePercent: 1.85 },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.30, change: -4.5, changePercent: -1.83 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.20, change: 12.5, changePercent: 1.45 },
      { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.75, change: 8.3, changePercent: 1.73 },
      { symbol: 'NFLX', name: 'Netflix Inc.', price: 245.60, change: 2.8, changePercent: 1.15 },
    ],
  });

  // Test kullanıcısı ve hesap oluştur
  const testUser = await prisma.user.create({
    data: {
      email: 'test@local',
      password: await bcrypt.hash('Test123!', 10),
      name: 'Test Kullanıcı',
      role: 'USER',
    },
  });

  // Test kullanıcısı için hesap oluştur
  await prisma.account.create({
    data: {
      userId: testUser.id,
      balance: 10000.0,
    },
  });

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
