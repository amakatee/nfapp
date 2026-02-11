'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader2, Sparkles, ChevronUp, Package, Globe, Shield, Clock } from 'lucide-react';
import gsap from 'gsap';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIHelperWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Я AI-помощник логистической компании "Северный Лис". Помогу с доставкой из Китая в РФ, таможенным оформлением, расчетом стоимости и другими вопросами логистики.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // GSAP动画初始化
  useEffect(() => {
    if (isOpen) {
      // 窗口打开动画
      gsap.fromTo(widgetRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 20
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.2)"
        }
      );

      // 输入框焦点动画
      gsap.fromTo(inputRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, delay: 0.2 }
      );

      // 建议问题动画
      if (showSuggestions && suggestionsRef.current) {
        gsap.fromTo(suggestionsRef.current.children,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.3,
            delay: 0.4
          }
        );
      }

      // 消息气泡动画
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.sender === 'ai') {
        gsap.fromTo(`[data-message-id="${lastMessage.id}"]`,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      }
    } else {
      // 关闭时按钮动画
      gsap.to(buttonRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isOpen, messages, showSuggestions]);

  // 滚动到底部
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      gsap.to(messagesEndRef.current, {
        scrollIntoView: { align: 'end' },
        duration: 0.3,
        delay: 0.1
      });
    }
  }, [messages, isOpen]);

  // 输入框自动聚焦
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        gsap.to(inputRef.current, {
          duration: 0.3,
          borderColor: 'rgba(59, 130, 246, 0.5)',
          boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.2)'
        });
        inputRef.current?.focus();
      }, 400);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    // 用户消息动画
    setMessages(prev => [...prev, userMessage]);
    gsap.fromTo(`[data-message-id="${userMessage.id}"]`,
      { scale: 0.9, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.3 }
    );

    setInputText('');
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        
        // AI回复动画
        setTimeout(() => {
          gsap.fromTo(`[data-message-id="${aiMessage.id}"]`,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        }, 100);
      }, 800);

    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.',
        sender: 'ai',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (query: string): Promise<string> => {
    const responses = {
      'цена|стоимость|расчет|сколько': `💰 **Расчет стоимости доставки от "Северный Лис"**\n\n📊 Средние цены:\n• Морская доставка 20' контейнера: $1,800 - $2,400\n• Ж/Д контейнер: $3,200 - $4,000\n• Автоперевозка: от $3.5 за кг\n• Авиадоставка: от $6.5 за кг\n\n🎯 Для точного расчета:\n1. Заполните форму на сайте\n2. Отправьте запрос на почту calc@northernfox.ru\n3. Получите индивидуальный расчет за 1 час`,
      'срок|время|доставк|сколько дней': `⏰ **Сроки доставки "Северный Лис"**\n\n🚢 Морской транспорт:\n• Китай-Владивосток: 12-18 дней\n• Владивосток-Москва: 20-25 дней\n• Итого: 35-45 дней\n\n🚂 Железная дорога:\n• Китай-Москва: 18-22 дня\n• Срочные поезда: 14-16 дней\n\n🚚 Автоперевозка:\n• Стандартная: 14-18 дней\n• Экспресс: 10-12 дней\n\n✈️ Авиадоставка:\n• Грузовая: 5-7 дней\n• Экспресс: 3-4 дня`,
      'тамож|оформление|декларация': `📋 **Таможенное оформление "Северный Лис"**\n\n✅ Полный комплекс услуг:\n• Декларирование всех типов грузов\n• Классификация ТН ВЭД (точность 99.8%)\n• Сертификация и разрешения\n• Предварительное оформление\n• Консультации по НДС 20%\n\n💼 Наши преимущества:\n• Собственный таможенный брокер\n• Среднее время оформления: 2-4 часа\n• Гарантия прохождения\n• Отсрочка таможенных платежей`,
      'ндс|налог|возврат': `🏦 **Возврат НДС 20% от "Северный Лис"**\n\n📊 Мы поможем вернуть 20-22% НДС:\n\n📋 Требуемые документы:\n1. Контракт с поставщиком\n2. Инвойс и упаковочный лист\n3. Транспортные документы\n4. Таможенная декларация\n5. Счет-фактура\n\n⏱️ Сроки возврата:\n• Стандартный: 45-60 дней\n• Экспресс: 30 дней\n• Минимальная сумма: от ₽100,000\n\n📞 Консультация бухгалтера: +7 (495) 123-45-67`,
      'китай|поставщик|производитель': `🇨🇳 **Работа с Китаем от "Северный Лис"**\n\n🔍 Услуги поиска поставщиков:\n• Поиск по 50+ китайским площадкам\n• Проверка надежности поставщика\n• Выездная инспекция на завод\n• Переговоры и согласование условий\n\n📦 Дополнительные услуги:\n• Консолидация грузов на складе в Гуанчжоу\n• Контроль качества перед отгрузкой\n• Фото- и видеоотчеты\n• Страхование груза\n\n🏢 Офисы в Китае: Шанхай, Гуанчжоу, Иу`,
      'документ|бумаг|сертификат': `📄 **Документы для импорта от "Северный Лис"**\n\n📋 Основной пакет:\n1. Договор международной купли-продажи\n2. Коммерческий инвойс\n3. Упаковочный лист\n4. Транспортная накладная\n5. Сертификат происхождения формы СТ-1\n\n📑 Дополнительно:\n• Разрешительные документы\n• Сертификаты соответствия\n• Ветеринарные/фитосанитарные сертификаты\n• Лицензии\n\n⚡ Услуга "Полный документооборот" — мы подготовим все документы!`,
      'отследить|трекинг|где груз': `📍 **Трекинг грузов "Северный Лис"**\n\n🎯 Реальное отслеживание 24/7:\n• GPS-мониторинг автотранспорта\n• Онлайн-трекинг морских контейнеров\n• SMS-уведомления о статусе\n• Фотоотчет при передаче груза\n\n🌐 Доступные способы:\n1. Личный кабинет на сайте\n2. Мобильное приложение\n3. Telegram-бот\n4. Ежедневные отчеты на почту\n\n📞 Служба поддержки: +7 (800) 555-35-35`,
      'страхование|страховка': `🛡️ **Страхование грузов "Северный Лис"**\n\n✅ Полное покрытие рисков:\n• Утрата и повреждение\n• Хищение и грабеж\n• Стихийные бедствия\n• Задержки в доставке\n• Таможенные риски\n\n💸 Тарифы:\n• Стандарт: 0.15% от стоимости груза\n• Премиум: 0.25% (расширенное покрытие)\n• Минимальная сумма: ₽50,000\n\n📋 Оформление за 1 час онлайн!`,
      'контакт|связаться|телефон': `📞 **Контакты "Северный Лис"**\n\n🏢 Москва:\n• Тел: +7 (495) 123-45-67\n• Адрес: ул. Логистическая, 15\n• Почта: info@northernfox.ru\n\n🏢 Санкт-Петербург:\n• Тел: +7 (812) 987-65-43\n\n🏢 Владивосток:\n• Тел: +7 (423) 456-78-90\n\n🌐 Онлайн:\n• Сайт: www.northernfox.ru\n• Telegram: @northernfox_support\n• WhatsApp: +7 (999) 123-45-67\n\n⏰ Режим работы: 24/7`,
      'default': `🦊 **"Северный Лис" — ваш надежный логистический партнер!**\n\n✨ Преимущества компании:\n• 12 лет на рынке логистики\n• 98.7% грузов доставляются вовремя\n• Собственный автопарк 50+ машин\n• Персональный менеджер для каждого клиента\n• Складские комплексы в Москве, СПб, Владивостоке\n\n📋 Я могу помочь с:\n• Расчетом стоимости доставки из Китая\n• Таможенным оформлением\n• Возвратом НДС 20%\n• Поиском китайских поставщиков\n• Трекингом груза в реальном времени\n• Подготовкой всех документов`
    };

    const queryLower = query.toLowerCase();
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    for (const [key, response] of Object.entries(responses)) {
      const keywords = key.split('|');
      if (keywords.some(keyword => queryLower.includes(keyword))) {
        return response;
      }
    }
    
    return responses.default;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'Рассчитать стоимость доставки',
    'Сроки доставки из Китая',
    'Как вернуть НДС?',
    'Таможенное оформление',
  ];

  const handleSuggestionClick = (question: string) => {
    gsap.to(suggestionsRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        setInputText(question);
        setShowSuggestions(false);
        setTimeout(() => {
          inputRef.current?.focus();
          handleSend();
        }, 200);
      }
    });
  };

  const toggleWidget = () => {
    if (isOpen) {
      gsap.to(widgetRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
      gsap.to(buttonRef.current, {
        scale: 1.1,
        rotation: 180,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
    }
  };

  return (
    <>
      {/* Основная кнопка - синий градиент */}
      <button
        ref={buttonRef}
        onClick={toggleWidget}
        className="fixed z-40 flex items-center justify-center
                   w-14 h-14 md:w-16 md:h-16 rounded-full
                   bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
                   shadow-xl hover:shadow-2xl 
                   border-2 border-white/30
                   transition-all duration-300
                   hover:scale-105 active:scale-95
                   bottom-20 right-6 md:bottom-8 md:right-8
                   group cursor-pointer"
        aria-label="AI помощник Северный Лис"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)'
        }}
      >
        <div className="relative">
          {/* Анимированное свечение */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-cyan-400/30 
                         animate-pulse blur-md group-hover:animate-none" />
          
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <>
                <div className="relative">
                  <MessageCircle size={24} className="text-white drop-shadow-lg" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 
                                 rounded-full border-2 border-white animate-ping opacity-70"></span>
                </div>
              </>
            )}
          </div>
          
          {/* Мини логотип с синим фоном */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-blue-700 
                        rounded-full p-1.5 border-2 border-white shadow-md">
            <span className="text-[10px] font-bold text-white">SL</span>
          </div>
        </div>
        
        {/* Текстовый индикатор при наведении */}
        <div className="absolute -left-40 top-1/2 transform -translate-y-1/2 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm 
                        px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            AI Помощник Северный Лис
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 
                          w-2 h-2 rotate-45 bg-blue-700"></div>
          </div>
        </div>
      </button>

      {/* Чат виджет - синяя тема */}
      {isOpen && (
        <div
          ref={widgetRef}
          className="fixed z-50 flex flex-col
                     bottom-28 md:bottom-32 right-6 md:right-8
                     w-[calc(100vw-48px)] md:w-96
                     h-[550px] md:h-[600px]
                     bg-gradient-to-b from-white via-white to-blue-50/50
                     rounded-2xl shadow-2xl overflow-hidden
                     border border-blue-200/70"
          style={{
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 140px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.25)'
          }}
        >
          {/* Шапка с синим градиентом */}
          <div className="relative px-5 py-4 border-b border-blue-200/60
                         bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r 
                           from-cyan-400/60 via-white/40 to-cyan-400/60" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-xl blur-sm" />
                  <div className="relative p-2 bg-white rounded-xl shadow-lg">
                    <Sparkles size={18} className="text-blue-600" />
                  </div>
                </div>
                <div className="text-white">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 
                                    rounded-full animate-pulse"></div>
                      <h3 className="font-bold text-lg drop-shadow-sm">Северный Лис</h3>
                    </div>
                    <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full 
                                   backdrop-blur-sm">AI Помощник</span>
                  </div>
                  <p className="text-xs text-white/90">Профессиональная логистика 24/7</p>
                </div>
              </div>
              
              {/* Статистика компании */}
              <div className="hidden md:flex items-center gap-3 text-xs">
                <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="font-bold text-white">12 лет</div>
                  <div className="text-white/80 text-[10px]">на рынке</div>
                </div>
                <div className="h-8 w-px bg-white/30"></div>
                <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="font-bold text-white">98.7%</div>
                  <div className="text-white/80 text-[10px]">в срок</div>
                </div>
              </div>
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-blue-50/30">
            {messages.map((message) => (
              <div
                key={message.id}
                data-message-id={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 backdrop-blur-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-white/90 border border-blue-100 text-gray-800 shadow-sm'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 
                                    rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-blue-600">Северный Лис AI</span>
                      <span className="text-xs text-blue-400">• Эксперт по логистике</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.text}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      {message.sender === 'ai' && (
                        <div className="flex gap-1.5">
                          <Package size={12} className="text-blue-500" />
                          <Globe size={12} className="text-blue-500" />
                          <Shield size={12} className="text-blue-500" />
                          <Clock size={12} className="text-blue-500" />
                        </div>
                      )}
                    </div>
                    <span className={`text-xs ${message.sender === 'user' ? 'text-white/80' : 'text-blue-600/70'}`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-4 bg-white/90 border border-blue-100 shadow-sm 
                              backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
                                    rounded-full blur-sm animate-pulse"></div>
                      <Loader2 size={16} className="relative animate-spin text-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-700 font-medium">Анализируем ваш запрос...</span>
                      <div className="flex gap-1 mt-1">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 
                                      rounded-full animate-bounce" 
                             style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 
                                      rounded-full animate-bounce" 
                             style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 
                                      rounded-full animate-bounce" 
                             style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Рекомендуемые вопросы */}
          {showSuggestions && messages.length <= 3 && (
            <div 
              ref={suggestionsRef}
              className="px-4 py-3 border-t border-blue-200/60 bg-gradient-to-r from-blue-50/80 to-white/80"
            >
              <p className="text-xs text-blue-600 mb-3 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 
                               rounded-full animate-pulse"></span>
                Популярные вопросы клиентов:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="px-3 py-2.5 text-sm bg-white border border-blue-200 
                             hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white
                             text-gray-700 hover:text-blue-700
                             rounded-xl transition-all duration-200
                             hover:scale-[1.02] active:scale-95
                             shadow-sm hover:shadow flex flex-col items-center justify-center
                             group/suggestion"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {index === 0 && (
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
                          <Package size={14} className="text-blue-600" />
                        </div>
                      )}
                      {index === 1 && (
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
                          <Clock size={14} className="text-blue-600" />
                        </div>
                      )}
                      {index === 2 && (
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
                          <Shield size={14} className="text-blue-600" />
                        </div>
                      )}
                      {index === 3 && (
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
                          <Globe size={14} className="text-blue-600" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-center font-medium">{question}</span>
                    <div className="w-0 group-hover/suggestion:w-full h-0.5 bg-gradient-to-r 
                                  from-blue-500 to-cyan-500 rounded-full mt-1.5 
                                  transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Поле ввода */}
          <div className="p-4 border-t border-blue-200/60 bg-gradient-to-r from-white to-blue-50/50">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 
                              rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 
                              transition-opacity duration-300"></div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    if (e.target.value.trim()) {
                      setShowSuggestions(false);
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос по логистике..."
                  className="relative w-full px-4 py-3 bg-white/90 border border-blue-300/50 
                           focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                           text-gray-900 placeholder:text-gray-500/70
                           rounded-xl outline-none transition-all duration-200
                           text-sm backdrop-blur-sm
                           shadow-sm focus:shadow-md"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="relative p-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 
                         hover:from-blue-700 hover:to-blue-800
                         disabled:from-gray-300 disabled:to-gray-400
                         text-white shadow-lg hover:shadow-xl
                         transition-all duration-200
                         disabled:cursor-not-allowed
                         hover:scale-105 active:scale-95
                         flex items-center justify-center group/send
                         border border-blue-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 
                              rounded-xl blur-sm opacity-0 group-hover/send:opacity-100 
                              transition-opacity duration-300"></div>
                
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="relative animate-spin" />
                  </>
                ) : (
                  <>
                    <Send size={18} className="relative" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-white 
                                  rounded-full opacity-0 group-hover/send:opacity-100 
                                  transition-opacity shadow-md"></div>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full 
                              animate-pulse"></div>
                <p className="text-xs text-blue-600">
                  <span className="font-semibold">Онлайн</span> • Ответ в течение 1 минуты
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-blue-600/70 hidden md:block">
                  Горячая линия: <span className="font-semibold">+7 (495) 123-45-67</span>
                </p>
                <div className="h-3 w-px bg-blue-300/50"></div>
                <p className="text-xs text-blue-600/70">
                  Enter ↵
                </p>
              </div>
            </div>
          </div>
          
          {/* Футер с логотипом */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50/70 to-white border-t border-blue-200/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-800 
                              rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-white">NF</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-800">Северный Лис</span>
                  <p className="text-[10px] text-blue-600/70">Northern Fox Logistics</p>
                </div>
              </div>
              <div className="text-xs text-blue-600/60">
                © 2024
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Фоновый декоративный элемент */}
      {isOpen && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 
                        bg-gradient-to-br from-blue-400/5 to-cyan-400/5 
                        rounded-full blur-3xl"></div>
        </div>
      )}
    </>
  );
};

export default AIHelperWidget;