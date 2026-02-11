'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Инициализируем массив refs
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  const benefits = [
    {
      title: 'Быстрые и надежные услуги',
      description: 'Гарантируем своевременную доставку ваших грузов с эффективностью, на которую можно положиться.',
    },
    {
      title: 'Безопасность грузов',
      description: 'Ставим безопасность вашего товара на первое место, принимая все меры предосторожности на каждом этапе пути.',
    },
    {
      title: 'Доступные цены',
      description: 'Предлагаем конкурентоспособные тарифы без ущерба для качества, обеспечивая лучшее соотношение цены и качества.',
    },
    {
      title: 'Услуги на зарубежном рынке',
      description: 'Обеспечиваем профессиональную логистическую поддержку для ваших международных бизнес-проектов, помогая легко расширить границы.',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Анимация заголовка
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Анимация подчеркивания
      if (underlineRef.current) {
        gsap.from(underlineRef.current, {
          scaleX: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: underlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Анимация карточек
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        });

        // Hover анимация
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Очистка event listeners
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

      // Анимация изображения
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          x: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Плавная анимация декоративных элементов
      gsap.to('.floating-bg-1', {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.floating-bg-2', {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full   overflow-hidden">
      {/* Декоративные элементы фона */}
      
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#003f7f] to-transparent opacity-50 mt-10 lg:hidden"></div>
      <h2 ref={titleRef} className="text-3xl pl-7 lg:pt-10 md:text-2xl  lg:text-5xl  font-bold text-[#003f7f] mb-4 mt-8 md:mt-15 md:mb-8 tracking-tighter">
            Почему выбирают нас
          </h2>
      <div className="floating-bg-2 absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-[100vw]  bg-gradient-to-br from-[#003f7f] via-[#0050a0] to-[#0066cc]  z-10">
        {/* Заголовок секции */}
        <div className="flex flex-col  lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Левая часть: Преимущества */}
          <div className="w-full lg:w-2/3">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  ref={setCardRef(index)}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-3xl group-hover:blur-2xl transition-all duration-500" />
                   <div className="relative p-7 rounded-3xl sgroup-hover:border-white/30 transition-all duration-500">
                   <h3 className="text-2xl md:text-2xl font-bold text-white mb-4 leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-white/80 text-lg leading-relaxed font-light">
                      {item.description}
                    </p>
                    
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая часть: Изображение */}
          <div ref={imageRef} className="w-full lg:w-1/3 ">
            <div className="relative h-[500px] md:h-[550px] w-full  overflow-hidden shadow-2xl group">
              <Image
                src="/images/air.JPG"
                alt="Логистика и доставка грузов"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
               <div className="absolute inset-0 bg-gradient-to-b from-[#0066cc]/15 to-gray-950" />
              
           
            </div>
          </div>
        </div>

       
      </div>

    </section>
  );
}