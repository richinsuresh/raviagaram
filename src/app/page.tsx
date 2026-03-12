'use client';

import { useEffect, useState } from 'react';
import { supabase } from "@/src/lib/supabase";
import FacebookFeed from "@/src/components/FacebookFeed";
import { SchemeSection } from "@/src/components/SchemeSection";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeData() {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        const allSlides = data.flatMap(event => 
          (event.media || []).map((url: string) => ({
            url,
            // Reverted to English-only title
            title: event.title,
            location: event.location
          }))
        ).filter(slide => slide.url.includes('http'));

        setSlides(allSlides.sort(() => 0.5 - Math.random()));
      }
      setLoading(false);
    }
    fetchHomeData();
  }, []); // Removed locale dependency

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides]);

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 🏛 1. THE MAIN INTRO HERO */}
      <section className="relative w-full h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            // Reverted to standard English background
            src="/B RAVI FOR AGARAM-Kannada.jpg" 
            className="w-full h-full object-cover" 
            alt="Ravi Agaram" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        {/* Scroll Indicator - Hardcoded English */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white animate-bounce z-30 drop-shadow-md">
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">
            Scroll for Updates
          </span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* 🖼 2. DYNAMIC SLIDESHOW SECTION */}
      <section className="relative w-full h-screen overflow-hidden bg-black border-y border-slate-900">
        {slides.length > 0 && slides.map((slide, i) => (
          <div 
            key={i} 
            className={`absolute inset-0 transition-all duration-[2000ms] ${
              i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <img src={slide.url} className="w-full h-full object-cover opacity-40 " alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-20" />
            <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 md:px-24 z-30">
              <h2 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                {slide.title}
              </h2>
              <Link href="/gallery" className="w-fit bg-white text-black px-10 py-5 font-black uppercase tracking-widest text-[10px] flex items-center gap-4">
                View Archive <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* 📱 3. SOCIAL & 📜 4. SCHEMES */}
      <section className="bg-white py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6">
          <FacebookFeed />
        </div>
      </section>
      
      <section className="py-24 bg-slate-50">
        <SchemeSection />
      </section>
    </main>
  );
}