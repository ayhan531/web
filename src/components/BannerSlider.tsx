'use client';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import type { Banner } from '@/types';

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  if (!banners?.length) return null;
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full w-full">
              {banner.image ? (
                <>
                  <img 
                    src={banner.image} 
                    alt={banner.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <h2 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">{banner.title}</h2>
                    <p className="text-lg md:text-xl opacity-90 drop-shadow-md max-w-3xl">{banner.content ?? ''}</p>
                  </div>
                </>
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-8 md:p-12">
                  <div className="text-white text-center max-w-4xl">
                    <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold">{banner.title}</h2>
                    <p className="text-lg md:text-xl opacity-90">{banner.content ?? ''}</p>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
