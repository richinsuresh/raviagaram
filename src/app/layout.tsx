import "./globals.css";
import Navbar from "@/src/components/Navbar";
import ChatOverlay from "@/src/components/ChatOverlay";
import FloatingPortraits from "@/src/components/FloatingPortraits"; // Import here

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased relative bg-white">
        <Navbar />
        <FloatingPortraits /> {/* This sits in the background */}
        <div className="relative z-10"> {/* This ensures text stays on top */}
          {children}
        </div>
        <ChatOverlay />
      </body>
    </html>
  );
}