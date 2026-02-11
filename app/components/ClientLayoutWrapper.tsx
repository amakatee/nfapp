'use client';

import { useEffect, useState } from 'react';
import NavContainer from "./home/navbar/NavContainer";
import AIHelperWidget from "./AiHelperWidget";
import LoadingScreen from "./LoadingScreen";
import NorthernFoxNavbar from './NavbarSection';
export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // Проверяем, загружен ли уже DOM
    const handleLoad = () => {
      // Даем небольшую задержку для плавности
      setTimeout(() => {
        setIsLoading(false);
        // После завершения загрузки показываем навигацию
        setTimeout(() => setShowNav(true), 300);
      }, 800);
    };

    // Если страница уже загружена
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      {/* Экран загрузки */}
      {isLoading && <LoadingScreen />}
      
      {/* Основной контент - скрыт во время загрузки */}
      <div 
        className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        {/* Навигация - появляется после загрузки */}
        {showNav && <NorthernFoxNavbar />}
        
        {/* Основной контент страницы */}
        <main className="relative">
          {children}
        </main>
        
        {/* AI виджет - появляется после загрузки */}
        {showNav && <AIHelperWidget />}
      </div>
    </>
  );
}