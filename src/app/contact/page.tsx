'use client';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

export default function ContactPage() {
  const whatsappNumber = "919986000100";
  const whatsappMsg = encodeURIComponent("Hello Ravi Sir, I need assistance regarding...");

  return (
    <main className="min-h-screen bg-white relative overflow-x-hidden pt-20 pb-20">
      
      {/* 🏛 MLA Background - Dynamic Scale & Position */}
      <img 
        src="/mla-transparent.png" 
        className="fixed top-0 
                   -left-[10%] sm:-left-[30%] md:-left-[15%] lg:-left-90 
                   w-[700px] md:w-[1000px] 
                   opacity-20 sm:opacity-40 lg:opacity-100 
                   pointer-events-none transition-all duration-700 z-0"
        alt=""
      />

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: CONTACT INFORMATION */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-black text-[#000080] uppercase tracking-tighter mb-2">
                Get In <span className="text-gray-300">Touch</span>
              </h1>
              <p className="text-gray-500 font-medium">Office of Ravi Agaram</p>
            </div>

            <div className="grid gap-4">
              {/* WhatsApp Card */}
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                className="group flex items-center gap-5 md:gap-6 bg-white/80 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#25D366] transition-all"
              >
                <div className="bg-[#25D366] p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                  <MessageCircle fill="currentColor" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chat Now</p>
                  <p className="text-lg md:text-xl font-bold text-gray-800">WhatsApp Support</p>
                </div>
              </a>

              {/* Phone Card */}
              <a 
                href="tel:+919986000100"
                className="group flex items-center gap-5 md:gap-6 bg-white/80 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#000080] transition-all"
              >
                <div className="bg-[#000080] p-4 rounded-2xl text-white shadow-lg">
                  <Phone fill="currentColor" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Call Office</p>
                  <p className="text-lg md:text-xl font-bold text-gray-800">+91 99860 00100</p>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:contact@raviagaram.in"
                className="group flex items-center gap-5 md:gap-6 bg-white/80 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#FF9933] transition-all"
              >
                <div className="bg-[#FF9933] p-4 rounded-2xl text-white shadow-lg">
                  <Mail fill="currentColor" size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Email</p>
                  <p className="text-xl font-bold text-gray-800">contact@raviagaram.in</p>
                </div>
              </a>
            </div>

            {/* Ravi Sir Portrait - Centered on mobile */}
            <div className="relative pt-6 flex flex-col items-center lg:items-start">
               <img 
                 src="/ravi-sir.png" 
                 className="w-48 md:w-60 opacity-100 transition-all" 
                 alt="" 
               />
               <p className="text-[10px] md:text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">
                 RAVI AGARAM | JOGUPALYA
               </p>
            </div>
          </div>

          {/* RIGHT SIDE: MAP & ADDRESS (STAYS AT BOTTOM ON MOBILE) */}
          <div className="space-y-6 pt-10 lg:pt-0">
            <div className="p-2 bg-slate-50/50 backdrop-blur-sm rounded-[2.8rem] border border-slate-200 shadow-2xl">
              
              {/* Map Container */}
              <div className="overflow-hidden rounded-[2.3rem] bg-white">
                <iframe 
                  src="https://www.google.in/maps/embed?pb=!1m18!1m12!1m3!1d3887.9760502918048!2d77.6286228!3d12.9733836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17001801a1cf%3A0x922b27a0e12d6881!2sRavi%20Jogupalya%20Congress%20Office!5e0!3m2!1sen!2sin!4v1773300732324!5m2!1sen!2sin"
                  width="100%"
                  height="350" 
                  className="block h-[300px] sm:h-[350px] md:h-[400px]"
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              {/* Address Section */}
              <div className="mt-2 p-6 md:p-8 bg-[#000080] rounded-[2.3rem] text-white">
                <div className="flex gap-4 items-start">
                  <MapPin className="text-[#FF9933] shrink-0" size={24} />
                  <div>
                    <h3 className="font-black text-base md:text-lg mb-2 uppercase tracking-tight">Office Address</h3>
                    <p className="text-blue-100/70 text-xs md:text-sm leading-relaxed font-medium">
                      Agaram Ward Office, <br />
                      Halasuru, Udani Layout, <br />
                      Bengaluru, Karnataka 560008
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
              Open in Google Maps for Navigation
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
