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
      { title: 'Hoşgeldiniz', content: 'Ana sayfa kampanyası örneği', order: 1, published: true },
      { title: 'Kampanya: 0 Komisyon', content: 'Belirli işlemlerde komisyon yok', order: 2, published: true },
    ],
  });

  await prisma.news.deleteMany();
  await prisma.news.createMany({
    data: [
      { title: 'Site Yayında', slug: 'site-yayinda', excerpt: 'Yeni demo site yayına alındı.' },
      { title: 'Kampanya Duyurusu', slug: 'kampanya-duyuru', excerpt: 'Yeni kampanyalar için admin panelini kullanın.' },
    ],
  });

  await prisma.market.deleteMany();
  await prisma.market.createMany({
    data: [
      { symbol: 'USDTRY', price: '42.09', change: '0.06' },
      { symbol: 'EURTRY', price: '48.39', change: '0.25' },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
