'use client';

import { useState, useEffect } from 'react';
import './FlipClock.css';

interface FlipClockProps {
  value: string;
  label?: string;
}

export default function FlipClock({ value, label }: FlipClockProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (displayValue !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  return (
    <div className="flip-clock-container">
      <div className={`flip-clock ${isFlipping ? 'flipping' : ''}`}>
        <div className="flip-clock-face">
          <div className="flip-clock-front">{displayValue}</div>
          <div className="flip-clock-back">{value}</div>
        </div>
      </div>
      {label && <div className="flip-clock-label">{label}</div>}
    </div>
  );
}
