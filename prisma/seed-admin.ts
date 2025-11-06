import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yatirim.com' },
    update: {},
    create: {
      email: 'admin@yatirim.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('📧 Email: admin@yatirim.com');
  console.log('🔑 Password: admin123');

  // Create sample banners
  await prisma.banner.createMany({
    data: [
      {
        title: 'Yeni Hesap Açın, 500 TL Hediye Çeki Kazanın!',
        content: 'İlk işleminizi yapın, anında hesabınıza 500 TL yatırılsın. Kampanya 31 Aralık\'a kadar geçerli.',
        published: true,
        order: 1,
      },
      {
        title: 'Altın Yatırımında Komisyon Avantajı',
        content: 'Gram altın alım-satımlarında %0 komisyon fırsatı. Dijital altın hesabınızı hemen açın.',
        published: true,
        order: 2,
      },
      {
        title: 'Profesyonel Analiz Araçları Artık Ücretsiz',
        content: 'Teknik analiz, canlı grafikler ve uzman yorumlarına ücretsiz erişim. Premium üyelik hediye!',
        published: true,
        order: 3,
      },
    ],
  });

  // Create sample news
  await prisma.news.createMany({
    data: [
      {
        title: 'TCMB Faiz Kararı Piyasaları Nasıl Etkiledi?',
        slug: 'tcmb-faiz-karari-piyasalari-nasil-etkiledi',
        excerpt: 'Merkez Bankası\'nın faiz kararı sonrası dolar/TL kurunda hareketlilik yaşandı. Uzmanlar önümüzdeki dönem için değerlendirmelerini paylaştı.',
        content: 'TCMB\'nin son toplantısında politika faizini sabit tutma kararı piyasalarda karışık tepkilere yol açtı. Dolar/TL kuru açıklamanın ardından 32.50 seviyesine yükselirken, BIST 100 endeksi %1.2 değer kaybetti.',
        published: true,
      },
      {
        title: 'Altın Fiyatları Rekor Kırdı: Gram Altın 2.800 TL\'yi Aştı',
        slug: 'altin-fiyatlari-rekor-kirdi',
        excerpt: 'Küresel piyasalardaki belirsizlikler ve güvenli liman arayışı gram altın fiyatlarını tarihi zirveye taşıdı.',
        content: 'Gram altın fiyatları bugün 2.850 TL seviyesini görerek tarihi rekorunu yeniledi. Uzmanlar, Fed\'in faiz politikası ve jeopolitik riskler nedeniyle altının yükseliş trendinin devam edebileceğini belirtiyor.',
        published: true,
      },
      {
        title: 'BIST 100 Endeksi 10.000 Puanı Test Ediyor',
        slug: 'bist-100-endeksi-10000-puani-test-ediyor',
        excerpt: 'Borsa İstanbul\'da yükseliş trendi devam ediyor. Bankacılık ve holding hisseleri endeksi yukarı taşıyor.',
        content: 'BIST 100 endeksi bugün 9.850 puanla güne başladı ve gün içinde 10.000 puan seviyesini test etti. Bankacılık endeksi %2.5 yükselirken, yabancı yatırımcılar net alıcı konumunda.',
        published: true,
      },
      {
        title: 'Kripto Para Piyasalarında Hareketli Günler',
        slug: 'kripto-para-piyasalarinda-hareketli-gunler',
        excerpt: 'Bitcoin 70.000 dolar direncini test ederken, Ethereum\'da da yükseliş beklentileri artıyor.',
        content: 'Bitcoin fiyatı 68.500 dolar seviyesinde işlem görürken, analistler 70.000 dolar direncinin aşılması halinde yeni rekorların gelebileceğini öngörüyor. Ethereum ise 3.800 dolar civarında.',
        published: true,
      },
      {
        title: 'Döviz Tevdiat Hesaplarında Yeni Düzenleme',
        slug: 'doviz-tevdiat-hesaplarinda-yeni-duzenleme',
        excerpt: 'BDDK\'nın yeni kararı ile döviz tevdiat hesaplarında faiz oranları güncellendi.',
        content: 'Bankacılık Düzenleme ve Denetleme Kurumu, döviz tevdiat hesaplarına uygulanacak azami faiz oranlarını yeniden belirledi. Yeni düzenleme 1 Aralık\'tan itibaren yürürlüğe girecek.',
        published: true,
      },
      {
        title: 'Enflasyon Verileri Açıklandı: Yıllık %65.5',
        slug: 'enflasyon-verileri-aciklandi',
        excerpt: 'TÜİK\'in kasım ayı enflasyon rakamları beklentilerin üzerinde geldi. Gıda ve enerji fiyatları öne çıktı.',
        content: 'Türkiye İstatistik Kurumu\'nun açıkladığı verilere göre yıllık enflasyon %65.5 olarak gerçekleşti. Aylık bazda ise artış %3.2 oldu. Gıda grubunda %4.5, ulaştırmada %3.8 artış kaydedildi.',
        published: true,
      },
    ],
  });

  console.log('✅ Sample data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
