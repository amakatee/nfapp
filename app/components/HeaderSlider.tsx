"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Controller } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import "swiper/css";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: string;
  ringColor: string;
  accentColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Northern Fox ",
    subtitle: "Shipping",
    buttonText: "Подробнее",
    bgColor: "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
    ringColor: "#ef4444",
    accentColor: "text-red-400",
  },
  {
    id: 2,
    title: "From china",
    subtitle: "To russia",
    buttonText: "Подробнее",
    bgColor: "bg-gradient-to-br from-blue-800 via-blue-900 to-black",
    ringColor: "#60a5fa",
    accentColor: "text-blue-400",
  },
 
 
];

export default function HeaderSlider() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circumference = 2 * Math.PI * 18;

  // GSAP Animation for slide content
  const animateContent = useCallback((index: number) => {
    const content = contentRefs.current[index];
    if (!content) return;

    const badge = content.querySelector(".slide-badge");
    const title = content.querySelector(".slide-title");
    const subtitle = content.querySelector(".slide-subtitle");
    const button = content.querySelector(".slide-button");

    gsap.fromTo(
      [badge, title, subtitle, button],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, []);

  // Progress ring animation
  const startProgress = useCallback(() => {
    if (!isPlaying) return;
    stopProgress();

    const duration = 5000;
    const steps = 100;
    const stepDuration = duration / steps;
    let step = 0;

    setProgress(0);
    progressRef.current = setInterval(() => {
      step += 1;
      setProgress((step / steps) * 100);
      if (step >= steps) stopProgress();
    }, stepDuration);
  }, [isPlaying]);

  const stopProgress = () => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) startProgress();
      else stopProgress();
      return next;
    });
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
    setProgress(0);
    if (isPlaying) {
      stopProgress();
      startProgress();
    }
    animateContent(swiper.realIndex);
  };

  useEffect(() => {
    animateContent(0);
    if (isPlaying) startProgress();
    return () => stopProgress();
  }, []);

  const setContentRef = (index: number) => (el: HTMLDivElement | null) => {
    contentRefs.current[index] = el;
  };

  return (
    <>
      {/* Inject custom styles for mobile pagination */}
      <style jsx global>{`
        .header-slider-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
        }
        
        .header-slider-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: transparent;
          padding: 0;
          margin: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .header-slider-dot.active {
          border: 1px solid rgba(42, 97, 161, 1);
          background: transparent;
          border-color: white;
        }
        
        @media (min-width: 768px) {
          .header-slider-pagination {
            gap: 10px;
            bottom: 16px;
          }
          
          .header-slider-dot {
            width: 12px;
            height: 12px;
            border-width: 2px;
          }
        }
        @media (min-width: 0px) and (max-width: 768px) {
          .header-slider-pagination {
            gap: 10px;
            bottom: 16px;
            
          }
          
          .header-slider-dot {
            width: 1px ;
            height: 1px;
          
            
            border-width: 2px;
          }
        }
      `}</style>

      <div className="relative w-full h-[50vh] min-h-[320px] overflow-hidden bg-black md:h-[65vh] md:min-h-[450px]">
        <Swiper
          modules={[Autoplay, Navigation, Controller]}
          autoplay={
            isPlaying
              ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          speed={700}
          loop
          onSwiper={(swiper: any) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="relative">
              <div className={`w-full h-full ${slide.bgColor}`}>
                {/* Subtle background glow */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${slide.ringColor}30 0%, transparent 50%)`,
                  }}
                />

                {/* Content */}
                <div
                  ref={setContentRef(index)}
                  className="relative z-10 flex h-full flex-col items-center justify-center px-6 md:px-12"
                >
                  <div className="max-w-4xl text-center">
                    <span
                      className={`slide-badge mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm ${slide.accentColor}`}
                    >
                      Northern Fox
                    </span>

                    <h1 className="slide-title mb-2 text-2xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <h2
                      className={`slide-subtitle mb-6 text-base font-medium md:text-2xl lg:text-3xl ${slide.accentColor}`}
                    >
                      {slide.subtitle}
                    </h2>

                    <button className="slide-button group relative rounded-lg bg-white px-6 py-2 text-sm font-medium text-gray-900 shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-base">
                      {slide.buttonText}
                      <span className="absolute inset-0 -translate-x-full rounded-lg bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                  </div>
                </div>

               
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Progress Ring with Play/Pause */}
        <div className="absolute right-3 top-3 z-20 md:right-8 md:top-6">
          <div className="relative h-9 w-9 md:h-12 md:w-12">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke={slides[currentSlide]?.ringColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                className="transition-all duration-100 ease-linear"
              />
            </svg>
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center text-white transition-transform hover:scale-110"
            >
              {/* {isPlaying ? (
                <Pause className="h-3 w-3 md:h-4 md:w-4" />
              ) : (
                <Play className="ml-0.5 h-3 w-3 md:h-4 md:w-4" />
              )} */}
            </button>
          </div>
        </div>

        {/* Navigation Arrows - Desktop only */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:flex"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-white/20 md:flex"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

        {/* Custom Pagination - Mobile optimized */}
        {/* <div className="header-slider-pagination">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className={`header-slider-dot ${index === currentSlide ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}

        
      </div>
    </>
  );
}