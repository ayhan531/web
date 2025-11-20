import { prisma } from './db';

// Piyasa verilerini güncellemek için mock fonksiyon
// Gerçek API ile değiştirilecek
export async function updateMarketPrices() {
  try {
    const allMarkets = await prisma.marketData.findMany();
    
    for (const market of allMarkets) {
      // Mock fiyat değişimi (gerçek API'den gelecek)
      // Volatilite: -3% ile +3% arası
      const changePercent = (Math.random() - 0.5) * 6;
      const newPrice = Math.max(market.price * (1 + changePercent / 100), 0.01);
      const change = newPrice - market.price;

      await prisma.marketData.update({
        where: { symbol: market.symbol },
        data: {
          price: newPrice,
          change,
          changePercent,
          updatedAt: new Date(),
        },
      });
    }

    console.log(`[${new Date().toISOString()}] Market prices updated for ${allMarkets.length} symbols`);
  } catch (error) {
    console.error('Error updating market prices:', error);
  }
}

// Portföy değerlerini güncellemek
export async function updatePortfolioValues() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        account: true,
      },
    });

    for (const portfolio of portfolios) {
      const marketData = await prisma.marketData.findUnique({
        where: { symbol: portfolio.symbol },
      });

      if (marketData) {
        const totalValue = portfolio.quantity * marketData.price;
        const gainLoss = totalValue - (portfolio.quantity * portfolio.averagePrice);
        const gainLossPercent = (gainLoss / (portfolio.quantity * portfolio.averagePrice)) * 100;

        await prisma.portfolio.update({
          where: { id: portfolio.id },
          data: {
            currentPrice: marketData.price,
            totalValue,
            gainLoss,
            gainLossPercent,
            updatedAt: new Date(),
          },
        });
      }
    }

    console.log(`[${new Date().toISOString()}] Portfolio values updated`);
  } catch (error) {
    console.error('Error updating portfolio values:', error);
  }
}

// Fiyat uyarılarını kontrol et
export async function checkPriceAlerts() {
  try {
    const alerts = await prisma.rateAlert.findMany({
      where: { active: true },
      include: {
        market: true,
        user: true,
      },
    });

    for (const alert of alerts) {
      const marketData = await prisma.marketData.findUnique({
        where: { symbol: alert.market.symbol },
      });

      if (marketData) {
        const alertPrice = parseFloat(alert.price);
        const shouldTrigger = 
          (alert.type === 'ABOVE' && marketData.price >= alertPrice) ||
          (alert.type === 'BELOW' && marketData.price <= alertPrice);

        if (shouldTrigger) {
          // Uyarı tetiklendi - log veya email gönder
          console.log(`Alert triggered for ${alert.user.email}: ${alert.market.symbol} ${alert.type} ${alertPrice}`);
          
          // Uyarıyı deaktif et (bir kez tetiklensin)
          await prisma.rateAlert.update({
            where: { id: alert.id },
            data: { active: false },
          });
        }
      }
    }

    console.log(`[${new Date().toISOString()}] Price alerts checked`);
  } catch (error) {
    console.error('Error checking price alerts:', error);
  }
}

// Tüm güncellemeleri çalıştır
export async function runAllUpdates() {
  await updateMarketPrices();
  await updatePortfolioValues();
  await checkPriceAlerts();
}
