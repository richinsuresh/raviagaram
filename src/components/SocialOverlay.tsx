'use client';

import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SocialOverlay() {
  const socials = [
    { 
      name: 'Facebook', 
      icon: <Facebook size={20} />, 
      href: 'https://www.facebook.com/people/Ravi-Agaram/100090473705827/', 
      color: 'hover:bg-[#1877F2]' 
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={20} />, 
      href: 'https://instagram.com/ravi_agaram', 
      color: 'hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' 
    },
  ];

  return (
    <div className="fixed left-4 bottom-24 md:left-6 md:bottom-32 z-[90] flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-4">
      
      {/* Dynamic CTA Text - Hidden on small mobile screens to save space */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="hidden md:block mb-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 [writing-mode:vertical-lr] rotate-180 mb-4">
          Follow for Updates
        </span>
      </motion.div>

      <AnimatePresence>
        {socials.map((social, index) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, scale: 0, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
          >
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative w-10 h-10 md:w-12 md:h-12 bg-white border border-slate-200 flex items-center justify-center text-slate-600 transition-all duration-300 shadow-lg hover:text-white ${social.color}`}
            >
              {social.icon}

              {/* Hover Tooltip Label - Hidden on touch devices/mobile */}
              <span className="absolute hidden md:block left-16 px-3 py-2 bg-[#000080] text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-xl">
                Follow on {social.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Visual Connector Line - Hidden on Mobile */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="hidden md:block w-[1px] h-12 bg-[#FF9933] ml-6 mt-2 origin-top" 
      />
    </div>
  );
}