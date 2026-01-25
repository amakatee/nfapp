'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import TextLogoSVG from './NFLogo';
import {Logo} from './Logo'

interface SubMenuItem {
  id: number;
  title: string;
  href: string;
}

interface MenuItem {
  id: number;
  title: string;
  href?: string;
  subItems?: SubMenuItem[];
}

export default function NorthernFoxNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isUpperNavVisible, setIsUpperNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navbarRef = useRef<HTMLDivElement>(null);
  const upperNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Menu items data structure
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Услуги',
      subItems: [
        { id: 11, title: 'Поиск поставщиков', href: '/services/suppliers' },
        { id: 12, title: 'Таможенное оформление', href: '/services/customs' },
        { id: 13, title: 'Доставка "от двери до двери"', href: '/services/delivery' },
        { id: 14, title: 'Страхование груза', href: '/services/insurance' },
        { id: 15, title: 'Сертификация', href: '/services/certification' },
      ]
    },
    {
      id: 2,
      title: 'Этапы работы',
      href: '/process'
    },
    {
      id: 3,
      title: 'О компании',
      href: '/about'
    },
    {
      id: 4,
      title: 'Кейсы',
      href: '/cases'
    },
    {
      id: 5,
      title: 'Блог',
      href: '/blog'
    },
    {
      id: 6,
      title: 'Контакты',
      href: '/contact'
    },
  ];

  // Upper navbar contact info
  const contactInfo = {
    phone: '+7 (495) 123-45-67',
    email: 'info@northernfox.ru',
    hours: '9:00-18:00 Пн-Пт'
  };

  // Handle scroll effect - main navbar hide/show with animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle upper nav visibility - only show at top 0
      if (currentScrollY === 0 && !isUpperNavVisible) {
        setIsUpperNavVisible(true);
        if (upperNavRef.current) {
          gsap.fromTo(upperNavRef.current,
            { y: -40, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 0.4,
              ease: 'power3.out'
            }
          );
        }
      } else if (currentScrollY > 0 && isUpperNavVisible) {
        setIsUpperNavVisible(false);
        if (upperNavRef.current) {
          gsap.to(upperNavRef.current, {
            y: -40,
            opacity: 0,
            duration: 0.3,
            ease: 'power3.in'
          });
        }
      }
      
      // Handle main navbar visibility - original behavior
      if (currentScrollY < lastScrollY) {
        // Scrolling UP - show navbar from top
        if (!isNavbarVisible) {
          setIsNavbarVisible(true);
          if (navbarRef.current) {
            gsap.fromTo(navbarRef.current,
              { y: -100, opacity: 0 },
              { 
                y: 0, 
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out'
              }
            );
          }
        }
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN and past threshold - hide navbar to top
        if (isNavbarVisible) {
          setIsNavbarVisible(false);
          if (navbarRef.current) {
            gsap.to(navbarRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.3,
              ease: 'power3.in'
            });
          }
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isNavbarVisible, isUpperNavVisible]);

  // Reset both navbars when at top of page
  useEffect(() => {
    const checkTopOfPage = () => {
      if (window.scrollY === 0) {
        // Show upper nav at top
        if (!isUpperNavVisible) {
          setIsUpperNavVisible(true);
          if (upperNavRef.current) {
            gsap.set(upperNavRef.current, { y: 0, opacity: 1 });
          }
        }
        
        // Show main nav at top
        if (!isNavbarVisible) {
          setIsNavbarVisible(true);
          if (navbarRef.current) {
            gsap.set(navbarRef.current, { y: 0, opacity: 1 });
          }
        }
      }
    };

    window.addEventListener('scroll', checkTopOfPage);
    return () => window.removeEventListener('scroll', checkTopOfPage);
  }, [isNavbarVisible, isUpperNavVisible]);

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If a dropdown is open and user clicks outside of all dropdowns, close it
      if (openDropdown !== null) {
        let isClickInsideDropdown = false;
        
        // Check if click is inside any dropdown
        dropdownRefs.current.forEach((dropdownElement) => {
          if (dropdownElement && dropdownElement.contains(event.target as Node)) {
            isClickInsideDropdown = true;
          }
        });

        // Check if click is on a dropdown button
        const dropdownButtons = document.querySelectorAll('[data-dropdown-button]');
        dropdownButtons.forEach(button => {
          if (button.contains(event.target as Node)) {
            isClickInsideDropdown = true;
          }
        });

        if (!isClickInsideDropdown) {
          closeDesktopDropdown(openDropdown);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Handle mobile menu animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      // Show overlay
      if (mobileOverlayRef.current) {
        mobileOverlayRef.current.style.display = 'block';
        gsap.to(mobileOverlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      
      // Animate mobile menu from LEFT to RIGHT
      if (mobileMenuRef.current) {
        gsap.fromTo(mobileMenuRef.current,
          { x: '-100%' },
          { 
            x: 0,
            duration: 0.4,
            ease: 'power3.out'
          }
        );
      }
      
      // Animate menu items in
      const items = mobileMenuRef.current?.querySelectorAll('.mobile-menu-item');
      if (items) {
        gsap.fromTo(items,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.1
          }
        );
      }
    } else {
      // Close mobile menu
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          x: '-100%',
          duration: 0.3,
          ease: 'power3.in'
        });
      }
      
      // Hide overlay
      if (mobileOverlayRef.current) {
        gsap.to(mobileOverlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            if (mobileOverlayRef.current) {
              mobileOverlayRef.current.style.display = 'none';
            }
            document.body.style.overflow = 'auto';
          }
        });
      }
      
      // Close mobile dropdown when menu closes
      setOpenMobileDropdown(null);
    }
  }, [isMenuOpen]);

  // Animate desktop dropdown
  const animateDesktopDropdown = useCallback((itemId: number, show: boolean) => {
    const dropdown = dropdownRefs.current.get(itemId);
    if (!dropdown) return;

    if (show) {
      gsap.fromTo(dropdown,
        { 
          opacity: 0,
          y: -10,
          scale: 0.95,
          display: 'none'
        },
        { 
          opacity: 1,
          y: 0,
          scale: 1,
          display: 'block',
          duration: 0.3,
          ease: 'power3.out'
        }
      );
    } else {
      gsap.to(dropdown, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          dropdown.style.display = 'none';
        }
      });
    }
  }, []);

  // Close desktop dropdown
  const closeDesktopDropdown = useCallback((itemId: number) => {
    setOpenDropdown(null);
    animateDesktopDropdown(itemId, false);
  }, [animateDesktopDropdown]);

  // Handle desktop dropdown toggle
  const handleDesktopDropdown = useCallback((itemId: number) => {
    if (openDropdown === itemId) {
      closeDesktopDropdown(itemId);
    } else {
      // Close any previously open dropdown
      if (openDropdown !== null) {
        closeDesktopDropdown(openDropdown);
      }
      
      setOpenDropdown(itemId);
      animateDesktopDropdown(itemId, true);
    }
  }, [openDropdown, closeDesktopDropdown, animateDesktopDropdown]);

  // Handle mobile dropdown toggle
  const handleMobileDropdown = useCallback((itemId: number) => {
    setOpenMobileDropdown(openMobileDropdown === itemId ? null : itemId);
  }, [openMobileDropdown]);

  // Handle mobile menu close
  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  }, []);

  // Handle nav item click
  const handleNavClick = useCallback((href?: string) => {
    if (href && href.startsWith('/')) {
      setIsMenuOpen(false);
      setOpenDropdown(null);
      setOpenMobileDropdown(null);
    }
  }, []);

  // Store dropdown ref
  const setDropdownRef = useCallback((itemId: number, element: HTMLDivElement | null) => {
    if (element) {
      dropdownRefs.current.set(itemId, element);
    } else {
      dropdownRefs.current.delete(itemId);
    }
  }, []);

  return (
    <>
      {/* Upper Navbar - Contact Info (Only shows at scroll position 0) */}
      {isUpperNavVisible && (
  <div 
    ref={upperNavRef}
    className="fixed top-0 left-0 right-0 z-50 bg-[#193060]"
  >
    <div className="container mx-auto px-4">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between h-10">
        {/* Left: Company Name and Contact Info */}
        <div className="flex items-center space-x-6 md:space-x-8 text-sm">
          {/* Phone Number */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-white">+13232813</span>
          </div>
          
          {/* Email */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-white">info@northenfox.com</span>
          </div>
          
          {/* Address */}
          <div className="hidden lg:flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white">Guanzhou tianhe</span>
          </div>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center space-x-3">
          {/* Empty for now */}
        </div>
      </div>

      {/* Mobile Layout - Column Design */}
      <div className="md:hidden py-1">
        <div className="flex flex-col items-center space-y-1">
          {/* Phone and Email on same line */}
          <div className="flex flex-wrap items-center  gap-x-4 gap-y-1">
            {/* Phone */}
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-white text-xs">+123243423</span>
            </div>
            
            {/* Email */}
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-white text-xs">info@northenfox.com</span>
            </div>
          </div>
          
          {/* Address on next line */}
          <div className="flex items-start gap-1">
            <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white text-xs">Guangzhou tian he</span>
          </div>

         
        </div>
      </div>
    </div>
  </div>
)}

      {/* Main Navbar - Original behavior */}
      <nav 
        ref={navbarRef}
        className={`fixed ${isUpperNavVisible ? 'top-12' : 'top-0'} left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-top duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight"
                onClick={() => handleNavClick('/')}
              >
               <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.subItems ? (
                    <>
                      <button
                        data-dropdown-button
                        onClick={() => handleDesktopDropdown(item.id)}
                        className="text-[#003f7f] hover:text-gray-900 text-sm font-medium tracking-wide transition-colors duration-200 flex items-center gap-1 group outline-none"
                      >
                        {item.title}
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${openDropdown === item.id ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                      </button>
                      
                      {/* Desktop Dropdown */}
                      <div
                        ref={(el) => setDropdownRef(item.id, el)}
                        id={`dropdown-${item.id}`}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                        style={{ display: 'none' }}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className="block px-4 py-3 text-[#003f7f] hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150 text-sm"
                            onClick={() => {
                              closeDesktopDropdown(item.id);
                              handleNavClick(subItem.href);
                            }}
                          >
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-100 mr-3 transition-all duration-200 group-hover:bg-blue-500"></div>
                              {subItem.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="text-[#003f7f] hover:text-gray-900 text-sm font-medium tracking-wide transition-colors duration-200 relative group outline-none"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.title}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* CTA Button */}
              <button 
                className="px-6 py-2 bg-[#193060] text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 outline-none"
              >
                Рассчитать стоимость
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`w-6 h-[1px] bg-[#003f7f] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-[1px] bg-[#003f7f] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-[1px] bg-[#003f7f] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Dynamic spacer for fixed navbar */}
      <div className={`${isUpperNavVisible ? 'h-26 md:h-30' : 'h-16 md:h-20'}`} />

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileOverlayRef}
        className="fixed inset-0 z-40 bg-black/40 md:hidden opacity-0"
        style={{ display: 'none' }}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed ${isUpperNavVisible ? 'top-26' : 'top-16'} left-0 h-[calc(100vh-6.5rem)] w-full bg-white z-40 transform -translate-x-full md:hidden`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Menu Items */}
          <div className="flex-1 p-6">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.id} className="mobile-menu-item border-b border-gray-100 last:border-b-0">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => handleMobileDropdown(item.id)}
                        className="w-full text-left py-5 flex items-center justify-between outline-none"
                      >
                        <span className="text-xl  font-medium text-gray-900">
                          {item.title}
                        </span>
                        <svg 
                          className={`w-5 h-5 transition-transform duration-300 ${openMobileDropdown === item.id ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Mobile Dropdown Content */}
                      {openMobileDropdown === item.id && (
                        <div className="pl-4 pb-4">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.href}
                              className="block py-4 text-lg text-gray-700 border-b border-gray-100 last:border-b-0 outline-none hover:text-blue-600"
                              onClick={closeMobileMenu}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="block py-5 text-xl font-medium text-gray-900 outline-none hover:text-blue-600"
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#193060] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{contactInfo.phone}</p>
                    <p className="text-sm text-gray-600">Телефон для связи</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#193060] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{contactInfo.email}</p>
                    <p className="text-sm text-gray-600">Электронная почта</p>
                  </div>
                </div>
              </div>

              {/* Mobile CTA */}
              <button 
                onClick={closeMobileMenu}
                className="w-full py-4 bg-[#193060] text-white text-lg font-medium rounded-lg mb-4 outline-none hover:from-blue-700 hover:to-cyan-700"
              >
                Рассчитать стоимость
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t mb-15 border-gray-100 bg-gray-50">
            <div className="text-gray-500">
              <p className="font-medium">© {new Date().getFullYear()} Northern Fox Logistics</p>
              <p className="mt-1 text-sm">Логистика из Китая в Россию</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}