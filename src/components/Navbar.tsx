'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Schemes', href: '/schemes' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-200 h-[100px] md:h-[130px]">
      <div className="max-w-[1600px] mx-auto h-full px-4 md:px-6 flex items-center justify-between relative z-[101]">
        
        {/* LEFT: LOGO + TITLES */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-16 h-16 md:w-28 md:h-28 flex items-center justify-center">
              <img src="/ravi-logo.png" className="w-full h-full object-contain" alt="Ravi Agaram Logo" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-black text-[#000080] uppercase tracking-tighter leading-[0.8] mb-1">
                Ravi Agaram
              </h1>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-[14px] font-black text-[#FF9933] uppercase tracking-widest leading-tight">
                  Minority Block President Domlur
                </span>
                <span className="text-[8px] md:text-[11px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
                  Govt of Karnataka | Guarantee Scheme Member
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* RIGHT: DESKTOP NAVIGATION + CONGRESS LOGO */}
        <div className="flex items-center gap-6">
          {/* Desktop Links - Visible on Laptop (md and above) */}
          <div className="hidden md:flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors hover:text-[#000080] ${
                  pathname === link.href ? 'text-[#000080] border-b-2 border-[#000080] pb-1' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Desktop Contact Button */}
            <Link 
              href="/contact" 
              className="bg-[#000080] text-white px-6 py-3 text-[9px] font-black uppercase tracking-widest hover:bg-[#FF9933] transition-all shadow-lg active:scale-95"
            >
              Contact Office
            </Link>
          </div>

          <img src="/congress-logo.png" className="h-10 md:h-16 w-auto object-contain hidden sm:block" alt="INC" />
          
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-3 bg-slate-50 border border-slate-200">
            {isMenuOpen ? <X size={28} className="text-red-600" /> : <Menu size={28} className="text-[#000080]" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      <div className={`fixed inset-0 z-[150] md:hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />

        <div className="relative z-[160] flex flex-col h-full p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-16 pt-4">
            <img src="/ravi-logo.png" className="h-12 w-auto" alt="" />
            <button onClick={() => setIsMenuOpen(false)} className="p-3 border border-slate-200 bg-white shadow-sm">
              <X size={28} className="text-[#000080]" />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            <span className="text-[10px] font-black text-[#FF9933] uppercase tracking-[0.5em] mb-4">Navigations</span>
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-6xl font-black uppercase tracking-tighter flex items-center justify-between transition-all ${
                  pathname === link.href ? 'text-[#000080]' : 'text-slate-300'
                }`}
              >
                <span>{link.name}</span>
                {pathname === link.href && <ArrowRight size={40} className="text-[#FF9933]" />}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-slate-100">
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-[#000080] text-white py-6 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs shadow-xl"
            >
              Contact Office <ArrowRight size={16} />
            </Link>
            
            <div className="mt-8 flex justify-center gap-6 opacity-100">
              <img src="/congress-logo.png" className="h-8 w-auto" alt="" />
              <img src="/ravi-logo.png" className="h-8 w-auto" alt="" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}