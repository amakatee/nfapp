import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import 'swiper/css';
import 'swiper/css/free-mode';
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";

const helveticaNeue = localFont({
  src:[
    {
      path: '/fonts/HelveticaNeue-Light.otf',
      weight: '200',
      style: 'light',
    },
    {
      path: '/fonts/HelveticaNeue-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/HelveticaNeue-Medium.otf',
      weight: '600',
      style: 'medium',
    },
    {
      path: '/fonts/HelveticaNeue-Bold.otf',
      weight: '800',
      style: 'medium',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica-neue',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Northern Fox Logistics",
  description: "Премиальная логистика из Китая",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${helveticaNeue.className} ${geistMono.variable} bg-[#193060] antialiased`}
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}