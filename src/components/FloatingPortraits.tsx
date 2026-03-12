'use client';

export default function FloatingPortraits() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10 mix-blend-multiply">
      {/* 1. MLA Cutout - Top Right */}
      <img 
        src="/mla-transparent.png" 
        className="absolute top-[10%] -right-20 w-[400px] md:w-[600px] grayscale transition-transform duration-1000 hover:scale-105"
        alt=""
      />

      {/* 2. Ravi Sir Cutout - Middle Left */}
      <img 
        src="/ravi-transparent.png" 
        className="absolute top-[40%] -left-20 w-[350px] md:w-[500px] grayscale"
        alt=""
      />

      {/* 3. Joint Action Cutout - Bottom Right */}
      <img 
        src="/joint-action.png" 
        className="absolute bottom-[5%] -right-10 w-[450px] md:w-[550px] grayscale"
        alt=""
      />
    </div>
  );
}