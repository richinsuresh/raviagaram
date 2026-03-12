import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/src/components/Navbar";
import ChatOverlay from "@/src/components/ChatOverlay";
import SocialOverlay from "@/src/components/SocialOverlay";
import FloatingPortraits from "@/src/components/FloatingPortraits";
import LanguageModal from "@/src/components/LanguageModal";

// i18n Imports
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ravi Agaram | Minority Block President Domlur",
  description: "Official portal of Ravi Agaram. Serving the people of Jogupalya and Agaram Ward. Government of Karnataka Guarantee Scheme Member.",
  icons: {
    icon: "/ravi-logo.png",
    apple: "/ravi-logo.png",
  },
  openGraph: {
    title: "Ravi Agaram | Public Representative",
    description: "Official Visual Archive and Service Portal",
    images: [{ url: "/fb-cover.jpg" }],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params for Next.js 15 compatibility
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Receive messages provided in i18n/request.ts
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.className} antialiased relative bg-white`}>
        <NextIntlClientProvider messages={messages}>
          {/* Language selection logic */}
          <LanguageModal />
          
          {/* Fixed Header */}
          <Navbar />
          
          {/* Background Visual Layer */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <FloatingPortraits />
          </div>

          {/* Main Content Area */}
          <main className="relative z-10 min-h-screen flex flex-col">
            {children}
          </main>

          {/* Global UI Overlays */}
          <SocialOverlay />
          <ChatOverlay />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}