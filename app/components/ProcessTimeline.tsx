// app/components/VATSection.tsx
'use client';

import { 
  Shield,
  FileText,
  DollarSign,
  Building,
  Globe,
  Lock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Percent,
  Scale,
  Users
} from 'lucide-react';

export default function VATSection() {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Полный пакет документов',
      description: 'Все необходимые документы для вычета НДС и таможенного оформления',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Оптимизация стоимости',
      description: 'Наш статус в Китае позволяет предлагать лучшие цены на закупки',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Легальный ввоз',
      description: '100% соответствие законодательству РФ и Китая',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const responsibilities = [
    {
      title: 'Наша зона ответственности',
      icon: <Building className="w-6 h-6" />,
      items: [
        'Официальный агент в Китае',
        'Организация экспорта с нулевой ставкой НДС',
        'Подготовка полного комплекта документов',
        'Экспортное таможенное оформление'
      ]
    },
    {
      title: 'Ваша выгода и действие',
      icon: <TrendingUp className="w-6 h-6" />,
      items: [
        'Ввоз товара как законный импортер',
        'Право на полный вычет НДС (20-22%)',
        'Прямая экономия на налогах',
        'Основа для масштабирования бизнеса'
      ]
    }
  ];

  const documents = [
    'Контракт',
    'Инвойс',
    'Упаковочный лист',
    'Сертификат происхождения',
    'Товарно-транспортная накладная',
    'Таможенная декларация'
  ];

  const stats = [
    { value: '0%', label: 'НДС при экспорте', icon: <Percent className="w-5 h-5" /> },
    { value: '20-22%', label: 'Вычет НДС в РФ', icon: <DollarSign className="w-5 h-5" /> },
    { value: '100%', label: 'Легальные поставки', icon: <CheckCircle className="w-5 h-5" /> },
    { value: '48ч', label: 'Сбор документов', icon: <FileText className="w-5 h-5" /> }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
      {/* Background Pattern */}
     

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Легальный ввоз с полным вычетом НДС
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Мы обеспечиваем легальный ввоз с полным пакетом документов для вычета НДС в России и оптимизацию стоимости закупки в Китае
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                >
                  <div className={`p-3 rounded-lg ${feature.bgColor} flex-shrink-0`}>
                    <div className={feature.color}>{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-center text-gray-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Responsibilities */}
            <div className="space-y-8">
              {responsibilities.map((section, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
                <FileText className="w-4 h-4" />
                Полный комплект документов
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Документы для таможенного оформления
              </h3>
              <p className="text-gray-600">
                Все необходимое для легального ввоза и вычета НДС
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {documents.map((doc, index) => (
                <div 
                  key={index}
                  className="group relative bg-gray-50 rounded-xl p-4 text-center hover:bg-blue-50 transition-colors"
                >
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">{index + 1}</span>
                  </div>
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3 group-hover:text-blue-600 transition-colors" />
                  <span className="text-sm font-medium text-gray-900">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative px-8 py-12 lg:py-16">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                  <Scale className="w-4 h-4" />
                  Начните экономить на налогах
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                  Готовы к легальному импорту с вычетом НДС?
                </h3>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                  Получите консультацию по оптимизации налогов и организации поставок из Китая
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-0.5">
                    <Users className="w-5 h-5" />
                    Получить консультацию
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Работаем с 2018 года.
          </p>
        </div>
      </div>

      {/* Custom Styles for Grid Pattern */}
      
    </div>
  );
}