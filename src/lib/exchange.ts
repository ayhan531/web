import { XMLParser } from 'fast-xml-parser';
import type { ExchangeRate, TCMBResponse } from '@/types/exchange';

const TCMB_URL = 'https://www.tcmb.gov.tr/kurlar/today.xml';
const parser = new XMLParser({ ignoreAttributes: false });

export async function fetchExchangeRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch(TCMB_URL);
    if (!response.ok) throw new Error('TCMB API yanıt vermedi');
    
    const xmlData = await response.text();
    const result = parser.parse(xmlData);
    const data = result.Tarih_Date as TCMBResponse;

    // Son güncelleme zamanını al
    const lastUpdate = new Date().toLocaleString('tr-TR');

    return data.Currency
      .filter(curr => curr.ForexBuying[0] !== '0') // Aktif olan kurları filtrele
      .map(curr => {
        const buying = parseFloat(curr.ForexBuying[0]);
        const selling = parseFloat(curr.ForexSelling[0]);
        
        // Bir önceki değerle karşılaştırarak değişim yüzdesini hesapla
        // Bu örnek için sabit bir değişim kullanıyoruz, gerçek uygulamada önceki değerler saklanmalı
        const change = ((selling - buying) / buying * 100).toFixed(2);
        
        return {
          code: curr.$.CurrencyCode,
          name: curr.Isim[0],
          buying: buying.toFixed(4),
          selling: selling.toFixed(4),
          change: change.startsWith('-') ? change : `+${change}`,
          lastUpdate
        };
      });
  } catch (error) {
    console.error('Döviz kurları çekilemedi:', error);
    throw new Error('Döviz kurları şu anda alınamıyor');
  }
}