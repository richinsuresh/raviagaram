'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Schemes', href: '/schemes' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200 h-[70px] md:h-[80px]">
      <div className="max-w-[1600px] mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        
        {/* LEFT: RAVI LOGO + BRANDING */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <img 
              src="/ravi-logo.png" 
              alt="Ravi Agaram" 
              className="h-10 md:h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black text-[#000080] uppercase tracking-tighter leading-none">
                Ravi Agaram
              </span>
              <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">
                Public Representative
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER: NAVIGATION (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${
                pathname === link.href 
                ? 'text-[#000080] border-b-2 border-[#000080] pb-1' 
                : 'text-slate-400 hover:text-black'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT: CONGRESS LOGO & MOBILE TRIGGER */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link 
            href="/contact" 
            className="hidden lg:block text-[9px] font-black uppercase tracking-widest border border-slate-900 px-6 py-3 hover:bg-black hover:text-white transition-all"
          >
            Contact Office
          </Link>

          <img 
            src="/congress-logo.png" 
            alt="Indian National Congress" 
            className="h-8 md:h-10 w-auto object-contain"
          />

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#000080] focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 bg-white z-[110] flex flex-col transition-all duration-500 ease-in-out md:hidden ${
        isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        {/* Mobile Menu Top Bar */}
        <div className="h-[70px] px-4 flex items-center justify-between border-b border-slate-100">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Navigation</span>
          <button onClick={toggleMenu} className="p-2 text-red-500">
            <X size={28} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-5xl font-black uppercase tracking-tighter flex items-center justify-between group ${
                pathname === link.href ? 'text-[#000080]' : 'text-slate-200'
              }`}
            >
              {link.name}
              <ArrowRight className={`transition-transform duration-300 ${pathname === link.href ? 'text-[#FF9933] translate-x-0' : 'opacity-0 -translate-x-4'}`} />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Bottom Section */}
        <div className="p-8 border-t border-slate-100">
          <Link 
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="w-full bg-[#000080] text-white py-6 flex items-center justify-center font-black uppercase tracking-widest text-[11px] shadow-lg"
          >
            Contact Office
          </Link>
          <div className="mt-10 flex justify-center gap-8 opacity-20">
             <img src="/ravi-logo.png" className="h-6 w-auto grayscale" alt="" />
             <img src="/congress-logo.png" className="h-6 w-auto grayscale" alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
}