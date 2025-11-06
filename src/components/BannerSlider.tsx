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
    <div className="rounded-xl bg-[var(--surface)] p-2 shadow-sm">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="rounded-lg"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="glow rounded-lg bg-[var(--primary)] p-6 text-white">
              <h3 className="mb-2 text-xl font-bold">{banner.title}</h3>
              <p className="opacity-90">{banner.content ?? ''}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
