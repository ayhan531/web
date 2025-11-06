'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Özet', href: '/admin' },
  { name: 'Bannerlar', href: '/admin/banners' },
  { name: 'Haberler', href: '/admin/news' },
  { name: 'Piyasalar', href: '/admin/markets' },
  { name: 'Kur Alarmları', href: '/admin/alerts' },
  { name: 'Kullanıcılar', href: '/admin/users' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--surface)]">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-72 border-r bg-white/90 backdrop-blur">
        <div className="border-b p-5">
          <h1 className="text-xl font-bold text-[var(--primary)]">YatırımPRO Admin</h1>
          <p className="mt-1 text-xs text-gray-500">Yönetim Paneli</p>
        </div>
        <nav className="mt-3 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group mb-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-l-4 border-[var(--primary)] bg-[color:oklch(0.64_0.23_27.86)/0.06] text-[var(--primary)]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--primary)]'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-72 border-t p-4">
          <Link
            href="/"
            className="flex items-center text-sm text-gray-600 transition-colors hover:text-[var(--primary)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
            Siteye Dön
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {navigation.find((item) => item.href === pathname)?.name || 'Admin Panel'}
            </h2>
          </div>
        </header>
        <main className="p-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}