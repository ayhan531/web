// BIST (Borsa İstanbul) canlı veri servisi
// Yahoo Finance API kullanarak gerçek zamanlı endeks ve hisse verileri

export interface BISTIndex {
  symbol: string;
  name: string;
  value: string;
  change: string;
  changePercent: string;
  volume?: string;
  lastUpdate: string;
}

export interface BISTStock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume?: string;
  lastUpdate: string;
}

// BIST endeksleri için Yahoo Finance sembolleri
const BIST_INDICES = [
  { symbol: 'XU100.IS', name: 'BIST 100' },
  { symbol: 'XU030.IS', name: 'BIST 30' },
  { symbol: 'XBANK.IS', name: 'Bankacılık' },
  { symbol: 'XUSIN.IS', name: 'Sınai' },
  { symbol: 'XUHIZ.IS', name: 'Hizmetler' },
  { symbol: 'XUTEK.IS', name: 'Teknoloji' },
];

// Popüler BIST hisseleri
const POPULAR_STOCKS = [
  { symbol: 'THYAO.IS', name: 'Türk Hava Yolları' },
  { symbol: 'AKBNK.IS', name: 'Akbank' },
  { symbol: 'GARAN.IS', name: 'Garanti BBVA' },
  { symbol: 'ISCTR.IS', name: 'İş Bankası (C)' },
  { symbol: 'YKBNK.IS', name: 'Yapı Kredi' },
  { symbol: 'TUPRS.IS', name: 'Tüpraş' },
  { symbol: 'ASELS.IS', name: 'Aselsan' },
  { symbol: 'BIMAS.IS', name: 'BİM' },
  { symbol: 'EREGL.IS', name: 'Ereğli Demir Çelik' },
  { symbol: 'KCHOL.IS', name: 'Koç Holding' },
];

/**
 * Yahoo Finance'ten tek bir sembol için veri çeker
 */
async function fetchYahooQuote(symbol: string): Promise<any> {
  try {
    // Yahoo Finance v8 API endpoint
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      next: { revalidate: 60 }, // 1 dakika cache
    });

    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`);
    }

    const data = await response.json();
    return data.chart.result[0];
  } catch (error) {
    console.error(`Yahoo Finance fetch error for ${symbol}:`, error);
    return null;
  }
}

/**
 * BIST endekslerini canlı olarak çeker
 */
export async function fetchBISTIndices(): Promise<BISTIndex[]> {
  const lastUpdate = new Date().toLocaleString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const results = await Promise.all(
    BIST_INDICES.map(async (index) => {
      const data = await fetchYahooQuote(index.symbol);
      
      if (!data || !data.meta) {
        // Fallback: Demo veri
        return {
          symbol: index.symbol,
          name: index.name,
          value: '0.00',
          change: '0.00',
          changePercent: '+0.00%',
          volume: 'N/A',
          lastUpdate,
        };
      }

      const meta = data.meta;
      const currentPrice = meta.regularMarketPrice || 0;
      const previousClose = meta.chartPreviousClose || currentPrice;
      const change = currentPrice - previousClose;
      const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;
      const volume = meta.regularMarketVolume || 0;

      return {
        symbol: index.symbol,
        name: index.name,
        value: currentPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: change.toFixed(2),
        changePercent: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
        volume: volume > 0 ? `${(volume / 1_000_000_000).toFixed(1)} Milyar ₺` : 'N/A',
        lastUpdate,
      };
    })
  );

  return results;
}

/**
 * Popüler BIST hisselerini canlı olarak çeker
 */
export async function fetchBISTStocks(limit: number = 10): Promise<BISTStock[]> {
  const lastUpdate = new Date().toLocaleString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const stocksToFetch = POPULAR_STOCKS.slice(0, limit);

  const results = await Promise.all(
    stocksToFetch.map(async (stock) => {
      const data = await fetchYahooQuote(stock.symbol);
      
      if (!data || !data.meta) {
        // Fallback: Demo veri
        return {
          symbol: stock.symbol.replace('.IS', ''),
          name: stock.name,
          price: '0.00',
          change: '0.00',
          changePercent: '+0.00%',
          volume: 'N/A',
          lastUpdate,
        };
      }

      const meta = data.meta;
      const currentPrice = meta.regularMarketPrice || 0;
      const previousClose = meta.chartPreviousClose || currentPrice;
      const change = currentPrice - previousClose;
      const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;
      const volume = meta.regularMarketVolume || 0;

      return {
        symbol: stock.symbol.replace('.IS', ''),
        name: stock.name,
        price: currentPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: change.toFixed(2),
        changePercent: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
        volume: volume > 0 ? `${(volume / 1_000_000).toFixed(1)} Milyon` : 'N/A',
        lastUpdate,
      };
    })
  );

  return results;
}
