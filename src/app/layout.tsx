import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import ChatOverlay from "@/src/components/ChatOverlay";
import SocialOverlay from "@/src/components/SocialOverlay";
import FloatingPortraits from "@/src/components/FloatingPortraits";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased relative bg-white`}>
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
      </body>
    </html>
  );
}