// components/AIHelperWidget.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, Loader2, Sparkles } from 'lucide-react';

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
      text: 'Привет! Я AI-ассистент логистики. Помогу с таможенным оформлением, доставкой из Китая, НДС и другими вопросами.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Hide suggestions when typing
  useEffect(() => {
    if (inputText.trim()) {
      setShowSuggestions(false);
    }
  }, [inputText]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
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

      setMessages(prev => [...prev, aiMessage]);
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
    const mockResponses = {
      'цена|стоимость|расценки': 'Стоимость зависит от типа груза, веса, объема и маршрута. Средняя цена за морскую доставку контейнера из Китая в РФ: $1500-$3000. Заполните форму расчета для точной стоимости.',
      'доставка|логистика|перевозка': 'Мы осуществляем доставку из Китая в Россию всеми видами транспорта: морской, ж/д, авто и авиа. Средние сроки: морской - 30-45 дней, ж/д - 18-25 дней, авто - 14-20 дней.',
      'сроки|время|дней': 'Стандартные сроки доставки из Китая: Морской - 30-45 дней, Ж/Д - 18-25 дней, Авто - 14-20 дней, Авиа - 3-7 дней. Экспресс-доставка доступна за доплату.',
      'контакты|связаться|телефон': '📞 +7 (495) 123-45-67\n✉️ info@logistics.ru\n⌚ 9:00-18:00 Пн-Пт',
      'ндс|налог|вычет': 'Мы помогаем с возвратом НДС 20-22% при импорте из Китая. Требуется полный пакет документов: контракт, инвойс, УПД, сертификат происхождения.',
      'таможня|оформление|декларация': 'Полный комплекс таможенных услуг: декларирование, классификация ТН ВЭД, сертификация, получение разрешительных документов.',
      'китай|поставщик|производитель': 'Помогаем с поиском и проверкой поставщиков в Китае, организацией инспекции качества, ведением переговоров.',
      'документы|бумаги|сертификат': 'Для импорта требуется: контракт, инвойс, упаковочный лист, сертификат происхождения, товарно-транспортная накладная.',
      'отследить|трекинг|где груз': 'Предоставляем онлайн-трекинг в реальном времени через личный кабинет. Все этапы отгрузки, транзита и доставки.',
      'страхование|страховка': 'Полное страхование грузов от всех рисков: повреждение, утрата, хищение. Ставка: 0.1-0.3% от стоимости груза.',
      'default': 'Я могу помочь с:\n• Расчетом стоимости доставки\n• Таможенным оформлением\n• Возвратом НДС 20-22%\n• Поиском поставщиков в Китае\n• Трекингом груза\n• Документами для импорта'
    };

    const queryLower = query.toLowerCase();
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    for (const [key, response] of Object.entries(mockResponses)) {
      const keywords = key.split('|');
      if (keywords.some(keyword => queryLower.includes(keyword))) {
        return response;
      }
    }
    
    return mockResponses.default;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'Стоимость доставки из Китая?',
    'Как вернуть НДС?',
    'Какие документы нужны?',
    'Сроки доставки контейнера?',
  ];

  const handleSuggestionClick = (question: string) => {
    setInputText(question);
    setShowSuggestions(false);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Minimalistic Mobile Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-50 text-white rounded-full shadow-xl hover:shadow-2xl 
                   transition-all duration-300 backdrop-blur-sm
                   bottom-16 right-5 md:bottom-16 md:right-8
                   bg-gradient-to-br from-blue-950/95 via-blue-900/95 to-blue-950/95
                   border border-blue-700/50 hover:border-cyan-500/50
                   hover:scale-110 active:scale-95 mb-15 
                   group"
        aria-label="Открыть AI помощник"
        style={{ 
          bottom: '16px',
          right: '16px'
        }}
      >
        <div className="relative p-3">
          {/* Mobile: Simple icon, Desktop: Icon + text */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity"></div>
              <MessageCircle size={22} className="relative text-cyan-300" />
            </div>
            <span className="text-sm font-medium text-white hidden md:inline">AI</span>
          </div>
          
          {/* Mobile only: Minimal notification dot */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border border-blue-950/90"></div>
        </div>
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed z-50 flex flex-col border border-blue-800/50
                       bottom-20 md:bottom-32 right-4 md:right-8
                       w-[calc(100vw-32px)] md:w-96 h-[70vh] md:h-[600px]
                       bg-gradient-to-b from-blue-950/95 via-blue-900/95 to-blue-950/95
                       backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
             style={{ 
               bottom: '80px',
               right: '16px',
               maxWidth: 'calc(100vw - 32px)',
               maxHeight: 'calc(100vh - 100px)'
             }}>
          
          {/* Header */}
          <div className="relative p-4 border-b border-blue-800/50 
                         bg-gradient-to-r from-blue-900/80 to-cyan-900/80
                         backdrop-blur-md flex-shrink-0">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-60"></div>
                  <div className="relative p-2 bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg border border-cyan-500/30">
                    <Sparkles size={18} className="text-cyan-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base md:text-lg">AI Логистик</h3>
                  <p className="text-xs text-cyan-300/70 hidden md:block">Эксперт по доставке из Китая</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowSuggestions(true); // Reset suggestions when closing
                }}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 
                         border border-blue-700/30 hover:border-cyan-500/50"
                aria-label="Закрыть"
              >
                <X size={18} className="text-white/70 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Messages Container - Takes most space */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4"
            style={{ minHeight: '0' }} // Important for flexbox
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-3 md:p-4 backdrop-blur-sm border ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-700/30 to-cyan-700/30 text-white rounded-br-none border-blue-600/30'
                      : 'bg-gradient-to-r from-blue-900/30 to-blue-950/30 text-white rounded-bl-none border-blue-800/30'
                  }`}
                >
                  <p className="text-sm md:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-50 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-3 md:p-4 bg-gradient-to-r from-blue-900/30 to-blue-950/30 
                              border border-blue-800/30 rounded-bl-none">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-30"></div>
                      <Loader2 size={14} className="relative animate-spin text-cyan-400" />
                    </div>
                    <span className="text-xs md:text-sm text-white/70">AI анализирует...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions - Only show when no input and few messages */}
          {showSuggestions && messages.length <= 3 && (
            <div className="px-3 md:px-4 py-2 border-t border-blue-800/50 bg-blue-950/50 flex-shrink-0">
              <p className="text-xs text-cyan-300/70 mb-2">Частые вопросы:</p>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-xs px-2.5 py-1.5 bg-gradient-to-r from-blue-800/30 to-blue-900/30 
                             hover:from-blue-700/40 hover:to-cyan-800/40
                             text-white/90 hover:text-white
                             rounded-lg md:rounded-xl border border-blue-700/30 hover:border-cyan-500/50
                             transition-all duration-300 hover:scale-[1.02] active:scale-95
                             backdrop-blur-sm"
                  >
                    {question.length > 20 ? `${question.substring(0, 20)}...` : question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area - Fixed at bottom */}
          <div className="p-3 md:p-4 border-t border-blue-800/50 bg-blue-950/50 flex-shrink-0">
            <div className="flex gap-2 md:gap-3">
              <div className="flex-1 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg md:rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос по логистике..."
                  className="relative w-full px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-blue-900/40 to-blue-950/40 
                           text-white placeholder:text-white/40 rounded-lg md:rounded-xl border border-blue-700/50 
                           focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30
                           backdrop-blur-sm transition-all duration-300 text-sm md:text-base"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="relative p-2.5 md:p-3 rounded-lg md:rounded-xl backdrop-blur-sm transition-all duration-300
                         disabled:opacity-30 disabled:cursor-not-allowed 
                         group/send"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg md:rounded-xl blur opacity-70 
                               ${!isLoading && inputText.trim() ? 'group-hover/send:opacity-100' : ''} 
                               transition-opacity duration-300`}></div>
                
                <div className={`relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center 
                               ${isLoading ? 'animate-pulse' : ''}`}>
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin text-white" />
                  ) : (
                    <Send size={16} className="text-white" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIHelperWidget;