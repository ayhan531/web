export interface ExchangeRate {
  code: string;        // USD, EUR, GBP gibi
  name: string;        // Amerikan Doları, Euro gibi
  buying: string;      // Alış fiyatı
  selling: string;     // Satış fiyatı
  change: string;      // Değişim yüzdesi
  lastUpdate: string;  // Son güncelleme zamanı
}

export interface TCMBResponse {
  $: {
    tarih: string;
    bulten_no: string;
    date: string;
  };
  Currency: Array<{
    $: {
      CrossOrder: string;
      Kod: string;
      CurrencyCode: string;
    };
    Unit: [string];
    Isim: [string];
    CurrencyName: [string];
    ForexBuying: [string];
    ForexSelling: [string];
    BanknoteBuying: [string];
    BanknoteSelling: [string];
  }>;
}