'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Döviz Kurları', href: '/doviz' },
  { name: 'Altın Fiyatları', href: '/altin' },
  { name: 'Borsa', href: '/borsa' },
  { name: 'Haberler', href: '/haberler' },
  { name: 'Analiz', href: '/analiz' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Ana navigasyon">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[var(--primary)]">YatırımPRO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? 'text-[var(--primary)] font-semibold'
                    : 'text-gray-500 hover:text-[var(--primary)]'
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/giris"
              className="ml-8 inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--primary-dark)]"
            >
              Giriş Yap
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Menüyü aç</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-gray-100 text-[var(--primary)]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[var(--primary)]'
                  } block rounded-md px-3 py-2 text-base font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/giris"
                className="block w-full text-center mt-4 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--primary-dark)]"
                onClick={() => setIsOpen(false)}
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}