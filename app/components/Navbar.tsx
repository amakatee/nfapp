'use client'
import { useState, useEffect, FC } from 'react';
import { Menu, X, Truck, ChevronDown, Phone, Globe, LucideIcon } from 'lucide-react';

// Type Definitions
interface DropdownItem {
  name: string;
  desc: string;
  icon?: LucideIcon;
}

interface NavItem {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

interface NavbarProps {
  companyName?: string;
  tagline?: string;
  phoneNumber?: string;
  onGetQuote?: () => void;
}

const Navbar: FC<NavbarProps> = ({
  companyName = "北狐｜Northern Fox",
  tagline = "Logistics Worldwide",
  phoneNumber = "+1 (800) LOG-ISTC",
  onGetQuote
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (isClient) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isClient]);

  // Navigation items data
  const navItems: NavItem[] = [
    { 
      name: 'Услуги', 
      href: '#',
      dropdown: [
        { name: 'Доставка груза', desc: '' },
        { name: 'Страхование груза', desc: '' },
        
      ]
    },
    { 
      name: 'Виды доставки', 
      href: '#',
      dropdown: [
        { name: 'Авиаперевозки', desc: '3–10 дней' },
        
      ]
    },
    { name: 'Обмен валюты', href: '#' },
    { name: 'Контакты', href: '#' }
  ];

  // Dropdown Component
  const Dropdown: FC<{ items: DropdownItem[]; onClose?: () => void }> = ({ items, onClose }) => (
    <div 
      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-2xl rounded-lg overflow-hidden transform origin-top transition-all duration-300 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 border border-gray-100 z-50"
      onMouseLeave={onClose}
    >
      {items.map((item, index) => (
        <a
          key={`${item.name}-${index}`}
          href="#"
          className="block px-6 py-4 hover:bg-blue-50 transition-all duration-300 group/item border-b border-gray-50 last:border-b-0"
          style={{ transitionDelay: `${index * 50}ms` }}
          onClick={(e) => {
            e.preventDefault();
            onClose?.();
          }}
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 group-hover/item:text-blue-600 transition-colors">
              {item.name}
            </span>
            <span className="text-sm text-gray-500 mt-1 group-hover/item:text-gray-700">
              {item.desc}
            </span>
          </div>
          <div className="h-0.5 w-0 group-hover/item:w-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 mt-2"></div>
        </a>
      ))}
    </div>
  );

  // Mobile Dropdown Component
  const MobileDropdown: FC<{ items: DropdownItem[] }> = ({ items }) => (
    <div className="pl-4 pb-2 space-y-2">
      {items.map((item, index) => (
        <a
          key={`mobile-${item.name}-${index}`}
          href="#"
          className="block py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors group"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        >
          <div className="font-medium text-gray-800 group-hover:text-blue-600">
            {item.name}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {item.desc}
          </div>
        </a>
      ))}
    </div>
  );

  // Handle mobile dropdown toggle
  const handleMobileDropdownToggle = (itemName: string): void => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  // Handle get quote click
  const handleGetQuote = (): void => {
    if (onGetQuote) {
      onGetQuote();
    } else {
      console.log('Get Quote clicked');
      // Default behavior: scroll to contact section
      const contactSection = document.querySelector('#contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle phone click
  const handlePhoneClick = (): void => {
    window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
  };

  if (!isClient) {
    // Return a placeholder during SSR
    return (
      <nav className="fixed w-full z-50 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo placeholder */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-40 bg-gray-200 rounded"></div>
            </div>
            {/* Menu button placeholder */}
            <div className="h-6 w-6 bg-gray-200 rounded lg:hidden"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' 
          : 'bg-gradient-to-b from-white to-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-md">北</span>
            </div>
            <div>
            <div className="text-sm text-gray-600">北狐</div>
            <div className="text-xl font-bold text-gray-900">NorthernFox</div>
              
            </div>
          </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div 
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group flex items-center"
                    onClick={(e) => {
                      if (item.dropdown) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className="inline-block ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    {/* Hover underline effect */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  
                  {item.dropdown && activeDropdown === item.name && (
                    <Dropdown 
                      items={item.dropdown} 
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </div>
              ))}
              
              {/* CTA Buttons */}
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                
                <button 
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={handleGetQuote}
                  aria-label="Get a quote"
                >
                  <Phone className="h-4 w-4" />
                  <span>Cвязаться</span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700 hover:text-blue-600 focus:outline-none transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white shadow-xl rounded-b-xl   mt-2 overflow-hidden animate-slideDown">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                  <button
                    className="flex justify-between items-center w-full py-4 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => {
                      if (item.dropdown) {
                        handleMobileDropdownToggle(item.name);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    aria-expanded={activeDropdown === item.name}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {item.dropdown && activeDropdown === item.name && (
                    <MobileDropdown items={item.dropdown} />
                  )}
                </div>
              ))}
              
              <div className="pt-4 space-y-3">
                
                <button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center space-x-2"
                  onClick={() => {
                    handleGetQuote();
                    setIsOpen(false);
                  }}
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-semibold">Cвязаться</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-24"></div>

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        /* Custom scrollbar for dropdowns */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }

        /* Focus styles for accessibility */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default Navbar;