'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function FacebookFeed() {
  const [feedData, setFeedData] = useState<any>(null);

  useEffect(() => {
    const BEHOLD_URL = 'https://feeds.behold.so/da41IYNAa1tlsN1v7UjG'; 
    
    fetch(BEHOLD_URL)
      .then((res) => res.json())
      .then((data) => setFeedData(data))
      .catch((err) => console.error("Error fetching Behold feed:", err));
  }, []);

  if (!feedData || !feedData.posts) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#000080]"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative group">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Autoplay, Pagination, Navigation]}
        className="pb-14"
      >
        {feedData.posts.map((post: any) => (
          <SwiperSlide key={post.id}>
            <a 
              href={post.permalink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative block h-[500px] rounded-[2.5rem] overflow-hidden group shadow-xl bg-gray-100"
            >
              <img 
                src={post.mediaUrl} 
                alt="Update" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#000080]/90 via-[#000080]/40 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-all duration-500 
                              flex flex-col justify-end p-10 backdrop-blur-[2px]">
                
                <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FF9933] text-[10px] font-black text-white uppercase tracking-widest mb-4">
                    Latest Update
                  </span>
                  
                  <p className="text-white text-lg font-bold leading-snug line-clamp-4">
                    {post.caption || "View full update on social media"}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                    <span>View Social Post</span>
                    <span className="w-8 h-[1px] bg-white/30"></span>
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}