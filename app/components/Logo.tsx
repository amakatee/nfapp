// components/Logo.tsx
import React from 'react';

const Logo = ({ size = 'medium', variant = 'full' }: { size?: 'small' | 'medium' | 'large'; variant?: 'full' | 'icon' | 'text' }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-sm',
    large: 'text-3xl'
  };

  const hanziSizes = {
    small: 'text-sm',
    medium: 'text-sm',
    large: 'text-xl'
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      {/* 北 character in blue circle */}
      <div className="relative">
        <div className="w-7 h-9 bg-[#193060] rounded-md flex items-center justify-center shadow-lg">
          <span className={`font-bold text-white ${hanziSizes[size]} tracking-tighter`}>北</span>
          {/* Subtle shine effect */}
        </div>
      </div>

      {variant !== 'icon' && (
        <div className="ml-2">
          {/* Chinese text */}
          <div className={`font-serif font-bold text-gray-900 ${textSizes[size]} tracking-tight leading-none`}>
            北狐
          </div>
          
          {variant === 'full' && (
            <>
              {/* English text */}
              <div className={`font-sans font-medium text-sm text-gray-600 tracking-wider capitalize mt-1`}>
                Northern Fox
              </div>
            
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Alternative minimalist version
const LogoMinimal = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const sizeClasses = {
    small: 'h-10 w-10',
    medium: 'h-14 w-14',
    large: 'h-20 w-20'
  };

  const textSizes = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-5xl'
  };

  return (
    <div className={`relative ${sizeClasses[size]} bg-[#193060] rounded-full flex items-center justify-center shadow-xl`}>
      <span className={`font-bold text-white ${textSizes[size]} tracking-tighter`}>北</span>
      
      {/* Metallic border effect */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-400/20"></div>
      
      {/* Shine overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      
      {/* Corner accents */}
      <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-white/30"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-white/30"></div>
    </div>
  );
};

// Horizontal version for headers
const LogoHorizontal = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-14 h-14 bg-[#193060] rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">北</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-blue-400/50"></div>
      </div>
      
      <div className="flex flex-col">
        <div className="font-serif font-bold text-2xl text-gray-900 tracking-tight">
          北狐
        </div>
        <div className="font-sans font-light text-gray-600 text-sm tracking-widest uppercase mt-1">
          NORTHERN FOX
        </div>
      </div>
    </div>
  );
};

// Logo with tagline
const LogoWithTagline = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <LogoMinimal size="large" />
      </div>
      <div className="text-center">
        <div className="font-serif font-bold text-3xl text-gray-900 mb-2 tracking-tight">
          北狐
        </div>
        <div className="font-sans font-medium text-gray-700 text-lg tracking-wider uppercase mb-1">
          Northern Fox
        </div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto my-2"></div>
        <div className="font-sans font-light text-gray-500 text-sm tracking-widest">
          PRECISION • ELEGANCE • INNOVATION
        </div>
      </div>
    </div>
  );
};

export { Logo, LogoMinimal, LogoHorizontal, LogoWithTagline };