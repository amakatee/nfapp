// components/NFLogo.tsx
import React from 'react';

interface NFLogoProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

const NFLogo = ({ 
  className = '', 
  variant = 'default',
  size = 'sm'
}: NFLogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center ${className}`}>
        {/* Минималистичный вариант */}
        <div className="relative">
          <div className="w-9 h-9 rounded-xs bg-gradient-to-br from-blue-600 to-blue-500 shadow-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">北</span>
          </div>
        </div>
        <div className="ml-3">
          <div className="flex items-baseline">
            <span className="text-gray-900 font-bold text-xl">狐</span>
            <div className="ml-2 flex flex-col">
              <span className="text-gray-700 font-semibold text-sm -mb-1">NORTHERN</span>
              <span className="text-gray-700 font-semibold text-sm">FOX</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className={`flex items-center ${className}`}>
        {/* Иконка вариант */}
        <div className="relative group">
          <div className="w-9 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 shadow-md flex items-center justify-center transform transition-transform duration-200 group-hover:scale-105">
            <span className="text-white font-bold text-xl">北狐</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-400 opacity-50"></div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center ${className}`}>
      {/* Основной логотип */}
      <div className="relative">
        {/* Градиентный контейнер */}
        <div className={`${sizeClasses[size]} aspect-square rounded-md bg-[#193060] flex items-center justify-center overflow-hidden group hover:shadow-lg transition-shadow duration-300`}>
          {/* Внутренний блеск */}
          
          {/* Иероглиф 北 */}
          <span className="text-white font-bold relative z-10 text-md md:text-3xl group-hover:scale-105 transition-transform duration-300">
            北
          </span>
          
          {/* Тонкая рамка */}
          
        </div>
        
        {/* Декоративные элементы */}
        
      </div>
      
      {/* Текстовая часть */}
      <div className="ml-1 flex flex-col ">
        <div className="flex mt-0 items-center">
          {/* Кандзи 狐 */}
          <span className="text-[#050b1e] font-bold  text-md md:text-3xl tracking-tight">
            狐
          </span>
          
          {/* Английский текст */}
          <div className="ml-1 flex ">
            <span className="text-gray-800  font-semibold text-base md:text-lg tracking-wider -mb-1">
              Northern
            </span>
            <span className="text-gray-800 font-semibold text-[#050b1e] text-base md:text-lg tracking-wider">
              Fox
            </span>
          </div>
        </div>
        
        {/* Акцентная линия */}
        
       
      </div>
    </div>
  );
};

export default NFLogo;