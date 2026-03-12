'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from "@/src/lib/supabase";
import { Camera, X, MapPin, ChevronLeft, ChevronRight, Calendar, Maximize2, ArrowUpRight } from "lucide-react";

const GridCell = ({ event, isLarge, onClick }: { event: any; isLarge: boolean; onClick: () => void }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (event.media && event.media.length > 1) {
      const interval = setInterval(() => {
        setImgIndex((prev) => (prev + 1) % event.media.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [event.media]);

  return (
    <div 
      onClick={onClick}
      className={`group relative overflow-hidden bg-slate-900 cursor-pointer border-b md:border-b-0 ${
        isLarge ? 'md:col-span-8 aspect-video' : 'md:col-span-4 aspect-[4/5] md:aspect-square'
      }`}
    >
      {event.media?.map((img: string, idx: number) => (
        <img 
          key={idx}
          src={img} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === imgIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          } group-hover:scale-110 transition-transform duration-700`} 
          alt="" 
        />
      ))}

      <div className="absolute inset-0 bg-[#000080]/50 md:bg-[#000080]/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 backdrop-blur-[1px] p-4 md:p-8 flex flex-col justify-between pointer-events-none text-white">
        <div className="flex justify-between items-start">
           <span className="text-[8px] md:text-[9px] font-black bg-black/50 px-2 md:px-3 py-1 uppercase tracking-[0.3em]">
             {event.date}
           </span>
           <Maximize2 size={16} className="text-[#FF9933] hidden md:block" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black text-[#FF9933] uppercase tracking-widest mb-1">
            <MapPin size={10} /> {event.location || 'BENGALURU'}
          </div>
          <p className="text-sm md:text-xl font-black uppercase tracking-tighter leading-tight">
            {event.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function GalleryPage() {
  const [localEvents, setLocalEvents] = useState<any[]>([]);
  const [beholdPosts, setBeholdPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (data) setLocalEvents(data);

      try {
        const res = await fetch('https://feeds.behold.so/da41IYNAa1tlsN1v7UjG');
        const socialData = await res.json();
        setBeholdPosts(socialData.posts || []);
      } catch (err) { console.error(err); }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) closePopup();
  };

  const closePopup = () => {
    setSelectedEvent(null);
    setActivePhotoIndex(0);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-t-2 border-[#000080] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pb-20 md:pb-32 pt-32 md:pt-40 px-4 md:px-6 font-sans relative">
      
      {/* Background Portraits (Responsive) */}
      <img 
        src="/mla-transparent.png" 
        className="fixed bottom-0 -left-20 w-[600px] opacity-10 pointer-events-none grayscale z-0 hidden lg:block"
        alt=""
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Responsive Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 border-b-2 border-slate-900 pb-6 md:pb-8">
          <div>
            <span className="text-[10px] font-black text-[#FF9933] uppercase tracking-[0.4em] mb-2 block">Visual Archive</span>
            <h1 className="text-5xl md:text-8xl font-black text-[#000080] uppercase tracking-tighter leading-none">Gallery</h1>
          </div>
          <p className="text-slate-400 text-[9px] md:text-[11px] font-bold uppercase tracking-widest mt-4 md:mt-0">
            Capturing the pulse of Shantinagar
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 mb-20 md:mb-32 bg-slate-200 border border-slate-200">
          {localEvents.map((event, i) => (
            <GridCell 
              key={event.id} 
              event={event} 
              isLarge={i % 3 === 0} 
              onClick={() => setSelectedEvent(event)} 
            />
          ))}
        </div>

        {/* --- SOCIAL STREAM --- */}
        <section>
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
            <Camera size={18} className="text-[#000080]" />
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Social Media Feed</h2>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 md:gap-6 md:space-y-6">
            {beholdPosts.map((post) => (
              <div key={post.id} className="break-inside-avoid bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">
                  <img src={post.mediaUrl} className="w-full h-auto" alt="" />
                  <div className="p-4 md:p-6 space-y-3">
                    <p className="text-slate-700 text-[11px] md:text-xs font-medium leading-relaxed italic line-clamp-3">
                      {post.caption || "Official update from social media."}
                    </p>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <span className="text-[8px] md:text-[9px] font-black text-[#000080] uppercase tracking-widest">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                      <ArrowUpRight size={14} className="text-[#FF9933]" />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* --- POPUP --- */}
        {selectedEvent && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 md:p-10 bg-black/95 backdrop-blur-md" onClick={handleOverlayClick}>
            <div ref={popupRef} className="bg-white w-full max-w-6xl h-full max-h-[95vh] md:max-h-[850px] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden relative shadow-2xl">
              
              <button onClick={closePopup} className="absolute top-4 right-4 z-[160] bg-white p-2 text-[#000080] hover:bg-red-600 hover:text-white transition-all">
                <X size={24} />
              </button>
              
              <div className="relative w-full md:flex-1 bg-black flex items-center justify-center min-h-[350px] md:min-h-0">
                <img src={selectedEvent.media[activePhotoIndex]} className="max-w-full max-h-full object-contain p-2" alt="" />
                {selectedEvent.media.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setActivePhotoIndex((prev) => (prev - 1 + selectedEvent.media.length) % selectedEvent.media.length); }} className="absolute left-2 p-3 bg-white/10 text-white hover:bg-white/30"><ChevronLeft size={24} /></button>
                    <button onClick={(e) => { e.stopPropagation(); setActivePhotoIndex((prev) => (prev + 1) % selectedEvent.media.length); }} className="absolute right-2 p-3 bg-white/10 text-white hover:bg-white/30"><ChevronRight size={24} /></button>
                  </>
                )}
              </div>

              <div className="w-full md:w-[380px] p-6 md:p-12 flex flex-col justify-between bg-white border-l border-slate-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#FF9933] font-black text-[10px] uppercase tracking-widest">
                    <Calendar size={14} /> {selectedEvent.date}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#000080] leading-[0.9]">{selectedEvent.title}</h2>
                  <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed italic">"{selectedEvent.description}"</p>
                </div>
                <div className="pt-8 border-t border-slate-50 mt-10">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] mb-2">
                    <MapPin size={12} className="text-[#000080]" /> {selectedEvent.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}