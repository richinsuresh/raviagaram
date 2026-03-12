'use client';

import { CheckCircle, Zap, Bus, Utensils, GraduationCap, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const SCHEMES = [
  {
    name: "Gruha Lakshmi",
    benefit: "₹2,000 Monthly",
    description: "Financial assistance for the woman head of every household in Karnataka to help manage family expenses.",
    icon: <CheckCircle className="w-8 h-8 text-[#FF9933]" />,
    eligibility: "Woman head of household with BPL/APL/Antyodaya cards.",
  },
  {
    name: "Gruha Jyothi",
    benefit: "200 Units Free",
    description: "Provides up to 200 units of free electricity per month for domestic households to ease the burden of utility bills.",
    icon: <Zap className="w-8 h-8 text-[#000080]" />,
    eligibility: "All domestic consumers in Karnataka (registration required).",
  },
  {
    name: "Shakti Scheme",
    benefit: "Free Bus Travel",
    description: "Empowering women with free travel in non-luxury Karnataka State Road Transport buses across the state.",
    icon: <Bus className="w-8 h-8 text-[#138808]" />,
    eligibility: "All women and transgender persons residing in Karnataka.",
  },
  {
    name: "Anna Bhagya",
    benefit: "10kg Free Rice",
    description: "Ensuring food security by providing 10kg of free food grains per person to eligible families.",
    icon: <Utensils className="w-8 h-8 text-[#FF9933]" />,
    eligibility: "Members of BPL and Antyodaya households.",
  },
  {
    name: "Yuva Nidhi",
    benefit: "Up to ₹3,000",
    description: "Financial support for unemployed graduates and diploma holders to sustain while searching for jobs.",
    icon: <GraduationCap className="w-8 h-8 text-[#138808]" />,
    eligibility: "Karnataka graduates (₹3,000) and diploma holders (₹1,500) unemployed for 6 months.",
  }
];

export default function SchemesPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden font-sans">
      
      {/* BACKGROUND ASSETS - Responsive Positioning */}
      <img 
        src="/mla-transparent.png" 
        className="fixed bottom-0 top-10 
                   -left-[40%] sm:-left-[30%] md:-left-60 
                   w-[500px] md:w-[700px] 
                   opacity-10 md:opacity-30 
                   pointer-events-none z-0 transition-all duration-700"
        alt=""
      />
      <img 
        src="/ravi-transparent.png" 
        className="fixed bottom-0 
                   -right-[20%] sm:-right-[10%] md:-right-20 
                   w-[300px] md:w-[400px] 
                   opacity-20 md:opacity-60 
                   pointer-events-none z-0 transition-all duration-700"
        alt=""
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER - Responsive Text Sizes */}
        <div className="max-w-3xl mb-12 md:mb-20 border-b-2 border-black pb-8">
          <span className="text-[9px] md:text-[10px] font-black text-[#FF9933] uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 block">
            Government Initiatives
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-[#000080] uppercase tracking-tighter leading-none">
            Guarantee <span className="text-slate-200">Schemes</span>
          </h1>
        </div>

        {/* SCHEMES GRID - Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {SCHEMES.map((scheme, i) => (
            <div key={i} className="group bg-white p-8 md:p-10 hover:bg-[#F8FAFC] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="mb-6 md:mb-8 text-[#000080]">
                  {scheme.icon}
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-[#000080] uppercase tracking-tighter mb-2 italic">
                  {scheme.name}
                </h3>
                
                <div className="inline-block px-3 py-1 border border-[#138808] text-[#138808] text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-6">
                  {scheme.benefit}
                </div>
                
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                  {scheme.description}
                </p>
              </div>
              
              <div className="pt-6 md:pt-8 border-t border-slate-100">
                <h4 className="text-[8px] md:text-[9px] font-black text-slate-300 uppercase tracking-widest mb-3">
                  Eligibility Criteria
                </h4>
                <p className="text-xs text-slate-600 font-bold leading-snug">
                  {scheme.eligibility}
                </p>
              </div>
            </div>
          ))}

          {/* SQUARED HELP CARD - Responsive Padding */}
          <div className="bg-[#000080] p-10 md:p-12 text-white flex flex-col justify-center border border-[#000080]">
            <HelpCircle size={32} className="text-[#FF9933] mb-6 md:mb-8 md:scale-125 origin-left" />
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight mb-6">
              Assistance & <br className="hidden md:block" /> Registration
            </h3>
            <p className="text-slate-300 text-xs font-medium leading-relaxed mb-10">
              Visit our office for direct assistance with Seva Sindhu registration and document verification. We ensure every eligible resident receives their benefits.
            </p>
            <Link 
              href="/contact" 
              className="w-full bg-white text-[#000080] py-5 text-center font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-[#FF9933] hover:text-white transition-all flex items-center justify-center gap-3"
            >
              Contact Office <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}