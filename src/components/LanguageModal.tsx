'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if a language preference has already been set
    const hasSelected = localStorage.getItem('language-selected');
    if (!hasSelected) {
      setIsOpen(true);
    }
  }, []);

  const handleLanguageSelect = (locale: 'en' | 'kn') => {
    localStorage.setItem('language-selected', 'true');
    setIsOpen(false);

    // Redirect to the selected locale
    // Example: If at /en/gallery and user selects kn, go to /kn/gallery
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#000080]/95 backdrop-blur-xl p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white max-w-2xl w-full p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9933]/10 rounded-full -mr-16 -mt-16" />
            
            <div className="relative z-10 text-center">
              <img src="/ravi-logo.png" className="h-16 md:h-20 mx-auto mb-8" alt="Logo" />
              
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-[#000080] mb-2">
                Select Language
              </h2>
              <h2 className="text-xl md:text-3xl font-bold text-[#FF9933] mb-10">
                ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleLanguageSelect('kn')}
                  className="group relative flex flex-col items-center justify-center p-8 border-2 border-slate-100 hover:border-[#FF9933] transition-all bg-slate-50 hover:bg-white"
                >
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">ಕನ್ನಡ</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#FF9933]">Kannada</span>
                </button>

                <button
                  onClick={() => handleLanguageSelect('en')}
                  className="group relative flex flex-col items-center justify-center p-8 border-2 border-slate-100 hover:border-[#000080] transition-all bg-slate-50 hover:bg-white"
                >
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">English</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#000080]">English</span>
                </button>
              </div>

              <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Ravi Agaram Official Portal
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}