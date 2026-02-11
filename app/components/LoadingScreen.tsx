'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoadingDone, setIsLoadingDone] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState(0);

  useEffect(() => {
    // Reveal letters one by one
    if (revealedLetters < 2) {
      const letterTimer = setTimeout(() => {
        setRevealedLetters(prev => prev + 1);
      }, 400);
      return () => clearTimeout(letterTimer);
    }
  }, [revealedLetters]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 20);

    const actualLoadTimer = setTimeout(() => {
      setIsLoadingDone(true);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(actualLoadTimer);
    };
  }, []);

  const shouldHide = isComplete && isLoadingDone;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700 ${shouldHide ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex flex-col items-center space-y-8">
        {/* Main Logo/Text with letter reveal */}
        <div className="relative">
          <h1 className="text-5xl font-light tracking-[0.3em] text-[#0B2D4A]">
            <span className={`transition-opacity duration-500 ${revealedLetters >= 1 ? 'opacity-100' : 'opacity-0'}`}>北</span>
            <span className={`transition-opacity duration-500 delay-200 ${revealedLetters >= 2 ? 'opacity-100' : 'opacity-0'}`}>狐</span>
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
            <span className="text-xs tracking-[0.5em] text-[#5D7A8C] font-light uppercase">
              NORTHERN FOX
            </span>
          </div>
        </div>

        {/* Minimal progress indicator - navy accent */}
        <div className="w-48 pt-4">
          <div className="relative">
            <div className="h-px w-full bg-gray-100">
              <div 
                className="h-full w-0 bg-[#0B2D4A] transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Single moving dot - navy */}
            <div 
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#0B2D4A] transition-all duration-150 ease-out"
              style={{ 
                left: `${progress}%`,
                transform: `translateY(-50%) translateX(-50%) scale(${progress === 100 ? 0 : 1})`,
                opacity: progress === 100 ? 0 : 1
              }}
            />
          </div>
        </div>

        {/* Animated text */}
        {/* <div className="h-6 overflow-hidden">
          <div 
            className="flex flex-col items-center transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(${isComplete ? '-24px' : '0px'})` }}
          >
            <span className="text-xs text-[#5D7A8C] font-light">
              {progress < 30 && "preparing the hunt..."}
              {progress >= 30 && progress < 60 && "tracking through snow..."}
              {progress >= 60 && progress < 90 && "silent footsteps..."}
              {progress >= 90 && progress < 100 && "northern lights appear..."}
              {progress === 100 && "enter the arctic"}
            </span>
            <span className="text-xs text-[#0B2D4A] font-medium mt-1.5 tracking-wider">
              NORTHERN FOX
            </span>
          </div>
        </div> */}
      </div>

      {/* Navy fox icon ornaments */}
      <div className="absolute bottom-8 left-8 opacity-30">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0L24.49 15.51L40 20L24.49 24.49L20 40L15.51 24.49L0 20L15.51 15.51L20 0Z" fill="#0B2D4A"/>
        </svg>
      </div>
      <div className="absolute top-8 right-8 opacity-30 rotate-45">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.694 9.306L24 12L14.694 14.694L12 24L9.306 14.694L0 12L9.306 9.306L12 0Z" fill="#0B2D4A"/>
        </svg>
      </div>
      
      {/* Additional subtle fox footprint ornaments */}
      <div className="absolute bottom-12 right-12 opacity-20">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="2" fill="#0B2D4A"/>
          <circle cx="8" cy="16" r="1.5" fill="#0B2D4A" opacity="0.6"/>
          <circle cx="24" cy="16" r="1.5" fill="#0B2D4A" opacity="0.6"/>
          <circle cx="16" cy="24" r="1.5" fill="#0B2D4A" opacity="0.6"/>
          <circle cx="16" cy="8" r="1.5" fill="#0B2D4A" opacity="0.6"/>
        </svg>
      </div>
    </div>
  );
}