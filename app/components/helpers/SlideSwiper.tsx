'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, FreeMode } from 'swiper/modules'
import { SHIPPING } from '@/app/constant/constant'
import ShippingCard from './ShippingCard'


export default function SlideSwiper() {
  return (
    <div className="relative  overflow-hidden">
      <Swiper
        modules={[Mousewheel, FreeMode]}
        spaceBetween={16}
        slidesPerView={1.4}
        freeMode
        grabCursor
        mousewheel={{ forceToAxis: true }}
        touchStartPreventDefault={false}
        breakpoints={{
          640: {
            slidesPerView: 1.3, 
            spaceBetween:20
           
          },
          768: {
            slidesPerView: 2.4,   // 💻 desktop
          },
          1024: {
            slidesPerView: 4,   // 💻 desktop
          },
          1280: {
            slidesPerView: 4,   // 💻 desktop
          },
        }}
        className="touch-pan-x h-full"
        
      >
        {SHIPPING.map((item, i) => (
          <SwiperSlide  key={i}>
            <ShippingCard key={item.id}  title={item.title} bestChoiceFor={item.bestChoiceFor} timing={item.timing} restrictions={item.restrictions} bestUsefor={item.bestUsefor} image={item.image} bestUsefor2={item.bestUseFor2} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}