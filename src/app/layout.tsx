import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YatırımPRO - Borsa İstanbul Yatırım Platformu",
  description: "Borsa İstanbul'da gerçek zamanlı yatırım yapın. Profesyonel analiz araçları, güvenilir işlem platformu ve uzman danışmanlık hizmetleri.",
  keywords: "borsa, yatırım, BIST, hisse senedi, döviz, altın, teknik analiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
