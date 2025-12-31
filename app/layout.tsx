'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Luxury Beach Resort - Your Paradise Destination</title>
        <meta name="description" content="Experience the ultimate luxury at our beachfront resort with world-class amenities, stunning ocean views, and exceptional service." />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          {!isAdminRoute && <Header />}
          <main>{children}</main>
          {!isAdminRoute && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
