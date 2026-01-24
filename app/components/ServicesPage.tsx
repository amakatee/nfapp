// components/ServicesSection.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Minimalistic SVG Icons as React Components
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-10a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PercentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2-2m0 0l2-2m-2 2L9 9m2 2l2 2" />
  </svg>
);

interface ComparisonItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({ 
  icon, 
  title, 
  description,
  index
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const element = itemRef.current;
    
    // Set initial state
    gsap.set(element, { opacity: 0, x: -20 });

    // Create animation
    const animation = gsap.to(element, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) trigger.kill();
      });
    };
  }, [index]);

  return (
    <div 
      ref={itemRef}
      className="flex items-start gap-3 px-4 py-5 rounded-lg bg-blue-900/10 border-blue-800/39  hover:bg-blue-900/20 transition-colors duration-300"
    >
      {/* <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white">{icon}</span>
      </div> */}
      <div>
        <h4 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight tracking-tight">{title}</h4>
        <p className="text-white/80 text-lg leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Early return if refs aren't ready
    if (!sectionRef.current || !titleRef.current || !subtitleRef.current || !statsRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Stats animation
      const statsElement = statsRef.current;
      if (statsElement) {
        const statCards = Array.from(statsElement.children);
        
        statCards.forEach((card, index) => {
          gsap.fromTo(card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: statsElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const responsibilityItems = [
    { icon: <CheckIcon />, title: 'Официальный агент в Китае', description: 'Представительство с полными юридическими полномочиями' },
    { icon: <CheckIcon />, title: 'Организация экспорта с нулевой ставкой НДС', description: 'Легальная оптимизация налоговых обязательств' },
    { icon: <CheckIcon />, title: 'Подготовка полного комплекта документов', description: 'Все необходимые бумаги для таможенного оформления' },
    { icon: <CheckIcon />, title: 'Экспортное таможенное оформление', description: 'Полное сопровождение на всех этапах экспорта' }
  ];

  const benefitItems = [
    { icon: <ArrowRightIcon />, title: 'Ввоз товара как законный импортер', description: 'Полная легализация поставок в РФ' },
    { icon: <ArrowRightIcon />, title: 'Право на полный вычет НДС (20-22%)', description: 'Законная экономия на налоговых платежах' },
    { icon: <ArrowRightIcon />, title: 'Прямая экономия на налогах', description: 'Снижение себестоимости товаров' },
    { icon: <ArrowRightIcon />, title: 'Основа для масштабирования бизнеса', description: 'Стабильные поставки и прозрачная документация' }
  ];

  return (
    <section ref={sectionRef} className="relative  mt-[-2] bg-gradient-to-b from-gray-950 to-blue-950 text-white py-16 px-4">
      {/* Simple background with subtle vertical lines */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex justify-around px-8 lg:px-32">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-px h-full bg-gradient-to-b from-transparent via-blue-600/10 to-transparent"
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Комплексные решения для вашего бизнеса
          </h1>
          <p 
            ref={subtitleRef}
            className="text-blue-200/80 max-w-2xl mx-auto"
          >
            Полный спектр услуг по логистике, таможенному оформлению и налоговой оптимизации
          </p>
        </div>

        {/* Comparison Section */}
        <div className="mb-10">
          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Our Responsibility */}
            <div>
              <div className="px-3 py-8  rounded-xl ">
                <div className="flex items-center gap-3 mb-6">
                  <div >
                    <ShieldIcon />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Наша зона ответственности
                  </h3>
                </div>
                <div className="space-y-4 ">
                  {responsibilityItems.map((item, index) => (
                    <ComparisonItem
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Your Benefits */}
            <div>
              <div className="p-3  rounded-xl ">
                <div className="flex items-center gap-3 mb-6">
                  <div className="">
                    <DocumentIcon />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Ваша выгода и результат
                  </h3>
                </div>
                <div className="space-y-4">
                  {benefitItems.map((item, index) => (
                    <ComparisonItem
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      index={index + 4}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '500+', label: 'Клиентов', icon: <UsersIcon /> },
            { value: '99.8%', label: 'Успешных поставок', icon: <CheckIcon /> },
            { value: '48ч', label: 'Среднее время оформления', icon: <ClockIcon /> },
            { value: '20-22%', label: 'Экономия на НДС', icon: <PercentIcon /> }
          ].map((stat, index) => (
            <div 
              key={index}
              className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30 hover:border-cyan-500/30 transition-colors duration-300 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-cyan-400">
                  {stat.icon}
                </span>
                <div className="text-2xl font-bold text-cyan-300">
                  {stat.value}
                </div>
              </div>
              <div className="text-sm text-blue-200">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;