// app/components/ShippingMethodsMinimal.tsx
'use client';

import { useState } from 'react';
import { 
  Plane, 
  Train, 
  Truck, 
  Ship,
  ChevronDown,
  Clock,
  Package,
  DollarSign,
  Check
} from 'lucide-react';

interface ShippingMethod {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  timeRange: string;
  timeDetails: string;
  description: string;
  suitableFor: string[];
  price: string;
  reliability: string;
  color: string;
}

export default function ShippingMethodsMinimal() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const shippingMethods: ShippingMethod[] = [
    {
      id: 'air',
      title: 'Авиаперевозки',
      subtitle: 'Самый быстрый способ',
      icon: <Plane className="w-5 h-5" />,
      timeRange: '3-7 дн.',
      timeDetails: 'Срок доставки: 3–7 дней',
      description: 'Идеально для срочных и ценных грузов, требующих максимальной скорости доставки.',
      suitableFor: ['Образцы', 'Электроника', 'Мед. товары', 'Документы'],
      price: 'Высокая',
      reliability: 'Очень высокая',
      color: 'text-blue-600'
    },
    {
      id: 'rail',
      title: 'Железнодорожные (FCL/LCL)',
      subtitle: 'Баланс цены и скорости',
      icon: <Train className="w-5 h-5" />,
      timeRange: '18-40 дн.',
      timeDetails: 'Срок доставки: 18–40 дней',
      description: 'Экономичное решение для крупных партий с оптимальным балансом стоимости и времени.',
      suitableFor: ['Контейнеры FCL', 'Сборные грузы LCL', 'Оборудование', 'Строительные материалы'],
      price: 'Средняя',
      reliability: 'Высокая',
      color: 'text-emerald-600'
    },
    {
      id: 'road',
      title: 'Автомобильные перевозки',
      subtitle: 'Гибкий и универсальный',
      icon: <Truck className="w-5 h-5" />,
      timeRange: '14-25 дн.',
      timeDetails: 'Срок доставки: 14–25 дней',
      description: 'Гибкая логистика с возможностью доставки "от двери до двери".',
      suitableFor: ['Региональные перевозки', 'Междугородные', 'Температурный контроль', 'Частичные загрузки'],
      price: 'Средняя',
      reliability: 'Высокая',
      color: 'text-amber-600'
    },
    {
      id: 'sea',
      title: 'Морские контейнерные (FCL/LCL)',
      subtitle: 'Самый экономичный',
      icon: <Ship className="w-5 h-5" />,
      timeRange: '30-60 дн.',
      timeDetails: 'Срок доставки: 30–60 дней',
      description: 'Наиболее экономичный способ для международных перевозок крупных партий товаров.',
      suitableFor: ['Международные', 'Консолидация', 'Крупногабаритные', 'Сырье'],
      price: 'Низкая',
      reliability: 'Средняя',
      color: 'text-indigo-600'
    }
  ];

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
            Способы доставки
          </h1>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                    Способ доставки
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                    Срок
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                    Подходящие грузы
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                    Стоимость
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                    Надежность
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shippingMethods.map((method) => (
                  <tr 
                    key={method.id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-md ${method.color} bg-opacity-10`}>
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-normal text-gray-900">
                            {method.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {method.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium  text-gray-900">
                          {method.timeRange}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-wrap gap-1.5">
                        {method.suitableFor.map((item, index) => (
                          <span 
                            key={index}
                            className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`px-3 py-1.5 text-sm rounded-full ${
                        method.price === 'Высокая' ? 'bg-red-50 text-red-700' :
                        method.price === 'Средняя' ? 'bg-amber-50 text-amber-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}>
                        {method.price}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-gray-700 font-medium">
                        {method.reliability}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                        Рассчитать
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="lg:hidden space-y-4">
          {shippingMethods.map((method) => (
            <div 
              key={method.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Card Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCard(method.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-md ${method.color} bg-opacity-10`}>
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {method.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {method.timeRange}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        expandedCard === method.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {expandedCard === method.id && (
                <div className="border-t border-gray-200">
                  <div className="p-4 space-y-4">
                    {/* Description */}
                    <div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {method.description}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Стоимость</p>
                        <p className={`font-medium ${
                          method.price === 'Высокая' ? 'text-red-600' :
                          method.price === 'Средняя' ? 'text-amber-600' :
                          'text-emerald-600'
                        }`}>
                          {method.price}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Надежность</p>
                        <p className="font-medium text-gray-900">
                          {method.reliability}
                        </p>
                      </div>
                    </div>

                    {/* Suitable For */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <p className="text-xs font-medium text-gray-700">
                          Подходящие грузы:
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {method.suitableFor.map((item, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-1.5"
                          >
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">

                      Рассчитать стоимость
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Footer */}
        <div className="mt-8">
          <div className="border-t border-gray-200 pt-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Все способы доставки включают страховку и отслеживание
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
                
                Сравнить стоимость всех способов
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}