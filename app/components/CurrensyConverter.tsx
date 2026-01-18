// components/CurrencyConverterMobileFixed.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ExchangeRateData {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export default function CurrencyConverterMobileFixed() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(11.5);
  const [converted, setConverted] = useState<number>(0);
  const [convertedWithCommission, setConvertedWithCommission] = useState<number>(0);
  const [direction, setDirection] = useState<'CNY→RUB' | 'RUB→CNY'>('CNY→RUB');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [apiError, setApiError] = useState<string | null>(null);
  const commissionFee = 0.02; // 2% commission
  const containerRef = useRef<HTMLDivElement>(null);
  
  // API URL for ExchangeRate-API (free tier)
  const API_URL = 'https://api.exchangerate-api.com/v4/latest/CNY';

  // Fetch real exchange rate from API
  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const data: ExchangeRateData = await response.json();
        
        if (data.rates && data.rates.RUB) {
          setRate(parseFloat(data.rates.RUB.toFixed(3)));
          setLastUpdated(new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit'
          }));
        } else {
          throw new Error('RUB rate not found in response');
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        setApiError('Не удалось загрузить курс');
        // Fallback rate
        setRate(11.5);
        setLastUpdated('оффлайн');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
    // Update rate every 5 minutes (free tier has limits)
    const interval = setInterval(fetchExchangeRate, 300000);
    return () => clearInterval(interval);
  }, []);

  // Calculate converted amount with commission
  useEffect(() => {
    let baseConverted;
    if (direction === 'CNY→RUB') {
      baseConverted = amount * rate;
    } else {
      baseConverted = amount / rate;
    }
    
    // Apply 2% commission fee
    const commissionAmount = baseConverted * commissionFee;
    const finalAmount = baseConverted - commissionAmount;
    
    setConverted(parseFloat(baseConverted.toFixed(2)));
    setConvertedWithCommission(parseFloat(finalAmount.toFixed(2)));
  }, [amount, rate, direction, commissionFee]);

  const quickAmounts = [500, 1000, 5000, 10000];

  const toggleDirection = () => {
    setDirection(prev => prev === 'CNY→RUB' ? 'RUB→CNY' : 'CNY→RUB');
    const newAmount = convertedWithCommission;
    setAmount(parseFloat(newAmount.toFixed(2)));
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Only digits
    const numValue = parseFloat(value) || 0;
    setAmount(numValue);
  };

  const calculateCommissionAmount = () => {
    return converted * commissionFee;
  };

  // Prevent body scroll when expanded on mobile
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  // Close converter when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && 
          containerRef.current && 
          !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside as EventListener);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
    };
  }, [isExpanded]);

  return (
    <>
      {/* Mobile Fixed Bottom Container */}
      <div 
        ref={containerRef}
        className={`
          fixed  left-0 right-0 top-[92vh] z-9000
          md:relative md:bottom-auto md:left-auto md:right-auto
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'h-[85vh] md:h-auto' : 'h-auto'}
        `}
      >
        {/* Compact Header - Always visible */}
        <div 
          className={`
            bg-gradient-to-r from-blue-600 to-blue-700 text-white
            md:from-gray-50 md:to-white md:text-gray-800
            border-t md:border-b border-blue-800 md:border-gray-200
            shadow-lg md:shadow-none
            flex items-center cursor-pointer
            touch-manipulation select-none
            ${isExpanded ? 'rounded-t-lg md:rounded-none' : ''}
          `}
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          aria-expanded={isExpanded}
          aria-label="Конвертер валют"
        >
          <div className="w-full px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Left side - Currency info */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="bg-white/20 md:bg-blue-100 p-1.5 rounded-lg">
                    <span className="font-bold text-lg text-white md:text-blue-700">¥</span>
                  </div>
                  <div className="text-white/70 md:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div className="bg-white/20 md:bg-blue-100 p-1.5 rounded-lg">
                    <span className="font-bold text-lg text-white md:text-blue-700">₽</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-white/90 md:text-gray-600">
                    1 CNY = <span className="font-semibold">{rate.toFixed(3)} RUB</span>
                  </div>
                  <div className="text-xs text-white/70 md:text-gray-500 flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isLoading ? 'bg-yellow-300 animate-pulse' : apiError ? 'bg-red-300' : 'bg-green-300'}`}></span>
                    {isLoading ? 'Загрузка...' : apiError ? 'Оффлайн' : 'Реальный курс'}
                  </div>
                </div>
              </div>

              {/* Right side - Amount and arrow */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-base font-bold text-white md:text-gray-800">
                    {direction === 'CNY→RUB' 
                      ? `${amount.toLocaleString('ru-RU')} ¥`
                      : `${amount.toLocaleString('ru-RU')} ₽`
                    }
                  </div>
                  <div className="text-xs text-white/80 md:text-gray-600">
                    = {convertedWithCommission.toLocaleString('ru-RU')} {direction === 'CNY→RUB' ? '₽' : '¥'}
                  </div>
                </div>
                
                <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-white md:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content - Scrollable on mobile */}
        <div 
          className={`
            absolute inset-x-0 bottom-full md:relative md:bottom-auto
            bg-white shadow-lg md:shadow-none
            transition-all duration-300 ease-in-out
            overflow-y-auto overscroll-contain
            ${isExpanded ? 'max-h-[calc(85vh-64px)] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4 pointer-events-none'}
            md:max-h-[400px] md:opacity-100 md:translate-y-0
            md:border-b md:border-gray-200
          `}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Hide scrollbar but keep functionality */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="p-4 md:p-6">
            {/* Header with direction toggle */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Конвертер валют</h3>
              <button
                onClick={toggleDirection}
                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium active:scale-95 touch-manipulation"
              >
                <span>{direction === 'CNY→RUB' ? 'CNY → RUB' : 'RUB → CNY'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* Input Section */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {direction === 'CNY→RUB' ? 'Китайский юань (CNY)' : 'Российский рубль (RUB)'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount.toLocaleString('ru-RU')}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    className="w-full pl-4 pr-12 py-3 text-lg border border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-700 font-bold">
                      {direction === 'CNY→RUB' ? '¥' : '₽'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Amounts */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Быстрые суммы</label>
                  <span className="text-xs text-gray-500">Нажмите для выбора</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => handleAmountChange(quickAmount)}
                      className={`
                        py-3 rounded-lg font-medium transition-all active:scale-95 touch-manipulation
                        ${amount === quickAmount 
                          ? 'bg-blue-600 text-white border-2 border-blue-600' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        }
                      `}
                    >
                      {quickAmount.toLocaleString('ru-RU')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Commission Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700 font-bold text-sm">2%</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Комиссия 2% включена</h4>
                  <p className="text-sm text-blue-700">
                    Все расчеты уже включают комиссию за конвертацию. Вы получите точную сумму после вычета комиссии.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Подробный расчет
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Сумма для конвертации:</span>
                  <span className="font-semibold">
                    {amount.toLocaleString('ru-RU')} {direction === 'CNY→RUB' ? 'CNY' : 'RUB'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Базовый курс:</span>
                  <span className="font-semibold">
                    1 CNY = {rate.toFixed(3)} RUB
                  </span>
                </div>
                
                <div className="pt-2 border-t border-gray-300 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Без комиссии:</span>
                    <span className="font-medium">
                      {converted.toLocaleString('ru-RU')} {direction === 'CNY→RUB' ? 'RUB' : 'CNY'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Комиссия (2%):</span>
                    <span className="font-medium text-red-600">
                      -{calculateCommissionAmount().toFixed(2)} {direction === 'CNY→RUB' ? 'RUB' : 'CNY'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-800">Итого к получению:</span>
                    <span className="text-lg font-bold text-green-700">
                      {convertedWithCommission.toLocaleString('ru-RU')} {direction === 'CNY→RUB' ? 'RUB' : 'CNY'}
                    </span>
                  </div>
                  <div className='w-[100%]  grid items-center'>
                  <button className={`
                        py-3 px-13 mt-3  bg-blue-600 text-white border-2 border-blue-600 rounded-lg font-medium transition-all active:scale-95 touch-manipulation
                        
                      `}
                    >
                      Cвязаться
                    </button>
                    </div>
                </div>
              </div>
            </div>
            

            {/* Footer with API status */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 gap-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : apiError ? 'bg-red-400' : 'bg-green-400'}`}></div>
                  <div>
                    <span className="font-medium">
                      {isLoading ? 'Загрузка курса...' : apiError ? 'Курс оффлайн' : 'Реальный курс'}
                    </span>
                    {!isLoading && !apiError && (
                      <span className="text-xs text-gray-500 ml-2">обновлен {lastUpdated}</span>
                    )}
                  </div>
                </div>
                
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${amount} ${direction === 'CNY→RUB' ? 'CNY' : 'RUB'} = ${convertedWithCommission} ${direction === 'CNY→RUB' ? 'RUB' : 'CNY'}`
                      );
                    }}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm active:scale-95 touch-manipulation"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Копировать</span>
                  </button>
                  
                  <a 
                    href="https://www.exchangerate-api.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 text-xs"
                  >
                    
                  </a>
                </div>
              </div>
            </div>
          </div>
         
          
        </div>
        

        {/* Mobile overlay */}
        {isExpanded && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsExpanded(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );
}