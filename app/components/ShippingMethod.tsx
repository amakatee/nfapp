// components/ShippingMethods.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ShippingMethod {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  duration: string;
  suitableFor: string[];
  cost: string;
  reliability: number; // 1-5
  features: string[];
}

const ShippingMethods: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Custom minimalistic icons
  const AirIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
    </svg>
  );

  const TrainIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );

  const TruckIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );

  const ShipIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );

  const shippingMethods: ShippingMethod[] = [
    {
      id: 1,
      icon: <AirIcon />,
      title: 'Авиаперевозки',
      subtitle: 'Самый быстрый способ',
      duration: '3-7 дн.',
      suitableFor: ['Образцы', 'Электроника', 'Мед. товары', 'Документы'],
      cost: 'Высокая',
      reliability: 5,
      features: ['Скорость доставки', 'Безопасность', 'Трекинг в реальном времени', 'Таможенное оформление']
    },
    {
      id: 2,
      icon: <TrainIcon />,
      title: 'Железнодорожные',
      subtitle: 'Баланс цены и скорости',
      duration: '18-40 дн.',
      suitableFor: ['Контейнеры FCL', 'Сборные грузы LCL', 'Оборудование', 'Строительные материалы'],
      cost: 'Средняя',
      reliability: 4,
      features: ['Оптимальная стоимость', 'Надежность', 'Контейнерные перевозки', 'Сборные грузы']
    },
    {
      id: 3,
      icon: <TruckIcon />,
      title: 'Автомобильные',
      subtitle: 'Гибкий и универсальный',
      duration: '14-25 дн.',
      suitableFor: ['Региональные', 'Междугородные', 'Температурный контроль', 'Частичные загрузки'],
      cost: 'Средняя',
      reliability: 4,
      features: ['Гибкость маршрутов', 'Дверь-дверь', 'Экспедирование', 'Мультимодальные перевозки']
    },
    {
      id: 4,
      icon: <ShipIcon />,
      title: 'Морские контейнерные',
      subtitle: 'Самый экономичный',
      duration: '30-60 дн.',
      suitableFor: ['Международные', 'Консолидация', 'Крупногабаритные', 'Сырье'],
      cost: 'Низкая',
      reliability: 3,
      features: ['Самая низкая стоимость', 'Большие объемы', 'Международные перевозки', 'Контейнерные решения']
    }
  ];

  const calculateCost = (methodId: number) => {
    const method = shippingMethods.find(m => m.id === methodId);
    if (method) {
      alert(`Рассчитываем стоимость для ${method.title}...\nСрок: ${method.duration}\nНадежность: ${method.reliability}/5`);
    }
  };

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !subtitleRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
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

      // Subtitle animation
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleCard = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section ref={sectionRef} className="relative mt-[-1] bg-gradient-to-b from-blue-950 to-gray-950 text-white py-16 px-4">
      {/* Background with subtle vertical lines */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex justify-around px-8 lg:px-32">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-px h-full bg-gradient-to-b from-transparent via-blue-600/10 to-transparent"
            />
          ))}
        </div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Способы доставки
          </h1>
          <p 
            ref={subtitleRef}
            className="text-blue-200/80 max-w-2xl mx-auto text-lg"
          >
            Выберите оптимальный способ доставки для вашего груза
          </p>
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden lg:grid grid-cols-2 gap-6 mb-12">
          {shippingMethods.map((method) => (
            <div
              key={method.id}
              ref={(el) => {
                cardsRef.current[method.id - 1] = el;
              }}
              className="group bg-gradient-to-br from-gray-900/50 to-blue-950/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white">{method.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{method.title}</h3>
                    <p className="text-cyan-200/70 text-sm mt-1">{method.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-300">{method.duration}</div>
                  <div className="text-sm text-blue-200/60">доставка</div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Suitable For */}
                <div>
                  <h4 className="text-sm font-semibold text-blue-200 mb-3">Подходящие грузы:</h4>
                  <div className="space-y-2">
                    {method.suitableFor.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                        <span className="text-sm text-blue-200/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-200 mb-2">Стоимость:</h4>
                    <div className={`text-lg font-bold ${
                      method.cost === 'Высокая' ? 'text-red-400' :
                      method.cost === 'Средняя' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {method.cost}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-200 mb-2">Надежность:</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-sm ${
                            i < method.reliability
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                              : 'bg-blue-800/50'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-blue-200/60 ml-2">{method.reliability}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => calculateCost(method.id)}
                className="w-full py-3 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/30 hover:border-cyan-400/50 text-white font-medium rounded-lg transition-all duration-300"
              >
                Рассчитать стоимость
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Cards - Visible only on mobile */}
        <div className="lg:hidden space-y-4">
          {shippingMethods.map((method) => {
            const isExpanded = expandedId === method.id;
            
            return (
              <div
                key={method.id}
                ref={(el) => {
                  cardsRef.current[method.id - 1] = el;
                }}
                className="bg-gradient-to-br from-gray-900/50 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-800/30 overflow-hidden"
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleCard(method.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-blue-900/20 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white">{method.icon}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-white">{method.title}</h3>
                      <p className="text-sm text-cyan-200/70">{method.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-cyan-300">{method.duration}</div>
                      <div className="text-xs text-blue-200/60">доставка</div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Card Content - Collapsible */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-4 pt-0 space-y-6">
                    {/* Suitable For */}
                    <div>
                      <h4 className="text-sm font-semibold text-blue-200 mb-3">Подходящие грузы:</h4>
                      <div className="flex flex-wrap gap-2">
                        {method.suitableFor.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-blue-900/30 text-blue-200 text-xs font-medium rounded-lg border border-blue-700/30"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-200 mb-2">Стоимость:</h4>
                        <div className={`text-lg font-bold ${
                          method.cost === 'Высокая' ? 'text-red-400' :
                          method.cost === 'Средняя' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {method.cost}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-200 mb-2">Надежность:</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm ${
                                i < method.reliability
                                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                  : 'bg-blue-800/50'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-blue-200/60 ml-2">{method.reliability}/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-blue-200 mb-3">Особенности:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {method.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-blue-200/80"
                          >
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => calculateCost(method.id)}
                      className="w-full py-3 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/30 hover:border-cyan-400/50 text-white font-medium rounded-lg transition-all duration-300 active:scale-95"
                    >
                      Рассчитать стоимость
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-800/30">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <span className="text-sm text-blue-200/80">Все способы включают полное таможенное оформление</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingMethods;