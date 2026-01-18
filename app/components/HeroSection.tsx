'use client';

import { useState } from 'react';
import { 
  Search, 
  Truck, 
  FileText, 
  ShieldCheck, 
  Building2, 
  Home, 
  CheckCircle,
  Send,
  Globe,
  Package,
  Calculator
} from 'lucide-react';


export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        
        {/* Subtle Accent Shapes */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-50 rounded-full opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-50 rounded-full opacity-30" />
        
        {/* NorthernFox Logo Watermark */}
        <div className="absolute bottom-10 right-10 opacity-5">
          <div className="text-9xl font-bold text-gray-800">北狐</div>
        </div>
      </div>

   
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-100 mb-6">
              <div className="w-2 h-2 bg-red-600 rounded-full" />
              <span className="text-red-700 text-sm font-semibold">
                Полный цикл логистики из Китая
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Логистика из Китая{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-700">
                  «под ключ»
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-red-100 -z-10" />
              </span>
            </h1>

            <p className="text-gray-600 text-xl mb-8 leading-relaxed">
              От поиска поставщика до вашего порога с возвратом НДС.<br />
              Специализируемся на логистических решениях между Китаем и Россией.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <FeatureItem
                icon={<Search className="w-6 h-6" />}
                title="Поиск поставщиков"
                description="Находим проверенных производителей в Китае"
                color="red"
              />
              <FeatureItem
                icon={<Truck className="w-6 h-6" />}
                title="Доставка до порога"
                description="Полная цепочка от Китая до вашего склада"
                color="blue"
              />
              <FeatureItem
                icon={<Calculator className="w-6 h-6" />}
                title="Возврат НДС"
                description="Оформление и возврат НДС под ключ"
                color="green"
              />
              <FeatureItem
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Таможенное оформление"
                description="Полное таможенное сопровождение"
                color="amber"
              />
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-700 to-red-600 text-white font-semibold px-8 py-4 rounded-lg hover:shadow-xl hover:shadow-red-100 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                <span>Оставить заявку</span>
              </button>
              <button className="inline-flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-lg hover:border-red-600 hover:text-red-700 transition-colors duration-300">
                <Globe className="w-5 h-5" />
                <span>Узнать больше</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-8 text-gray-500">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10+</div>
                  <div className="text-sm">лет на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm">клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm">поддержка</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="flex-1 max-w-2xl">
            <LogisticsVisual />
          </div>
        </div>
      </div>

      {/* Request Form Modal */}
    
    </div>
  );
}

// Sub-components
function FeatureItem({ 
  icon, 
  title, 
  description,
  color = "red" 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
}) {
  const colorClasses = {
    red: 'bg-red-50 text-red-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700',
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-red-200 transition-colors">
      <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function LogisticsVisual() {
  return (
    <div className="relative h-[500px] bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      {/* Map Outline */}
      <div className="absolute inset-8 border-2 border-gray-100 rounded-xl" />
      
      {/* Route */}
      <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 rounded-full">
        {/* Moving Vehicle */}
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white border-2 border-red-600 rounded-full -translate-y-1/2 -translate-x-1/2 shadow-lg">
          <Truck className="w-4 h-4 text-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* China Point */}
        <div className="absolute top-1/2 left-0 w-6 h-6 bg-red-600 rounded-full -translate-y-1/2 -translate-x-1/2 shadow-lg">
          <Building2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Russia Point */}
        <div className="absolute top-1/2 right-0 w-6 h-6 bg-blue-600 rounded-full -translate-y-1/2 translate-x-1/2 shadow-lg">
          <Home className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2">
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full" />
            <span className="font-semibold text-gray-900">Китай</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">Поставщик</div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2">
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
            <span className="font-semibold text-gray-900">Россия</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">Ваш склад</div>
        </div>
      </div>

      {/* VAT Badge */}
      <div className="absolute top-10 right-10">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <div className="font-bold text-gray-900">Возврат НДС</div>
              <div className="text-sm text-gray-600">включен в стоимость</div>
            </div>
          </div>
        </div>
      </div>

      {/* Icons */}
      <div className="absolute top-20 left-20">
        <Package className="w-10 h-10 text-gray-300" />
      </div>
      <div className="absolute bottom-20 right-20">
        <ShieldCheck className="w-10 h-10 text-gray-300" />
      </div>
    </div>
  );
}