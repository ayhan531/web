'use client';

import { useState, useEffect, useRef } from 'react';
import FlipClock from './FlipClock';

interface MarketData {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
}

interface MarketTickerProps {
  data: MarketData[];
}

export default function MarketTicker({ data }: MarketTickerProps) {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Veriyi 3 kez tekrarla (sonsuz kaydırma efekti için)
  const repeatedData = [...data, ...data, ...data];

  useEffect(() => {
    let currentOffset = 0;
    const itemWidth = 280; // Her item'in genişliği (px)
    const totalWidth = itemWidth * data.length;
    const speed = 0.5; // Kaydırma hızı (düşük = daha yavaş)

    const animate = () => {
      currentOffset += speed;

      // Sonsuz kaydırma için reset
      if (currentOffset >= totalWidth) {
        currentOffset = 0;
      }

      setOffset(currentOffset);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data.length]);

  if (data.length === 0) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>Piyasa Verileri Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white py-2 rounded-lg">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>

      {/* Ticker container */}
      <div
        ref={containerRef}
        className="flex items-center space-x-2 px-3"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: 'none',
        }}
      >
        {repeatedData.map((item, idx) => {
          const isPositive = item.changePercent.startsWith('+');
          return (
            <div
              key={idx}
              className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition flex-shrink-0 border border-green-200"
              style={{ minWidth: '240px' }}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-1 mb-1">
                  <span className="font-bold text-gray-900 text-xs">{item.symbol}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600 truncate">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div style={{ width: '60px', height: '28px' }}>
                    <FlipClock value={item.price} label="" />
                  </div>
                  <div
                    className={`text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-0.5 ${
                      isPositive
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                  >
                    <span>{isPositive ? '▲' : '▼'}</span>
                    <span>{item.changePercent}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
