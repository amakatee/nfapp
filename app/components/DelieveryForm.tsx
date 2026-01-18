// app/components/DeliveryForm.tsx
'use client';

import { useState } from 'react';
import { Truck, Package, Mail, Phone, CheckCircle } from 'lucide-react';

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
    productName: '',
    weight: '',
    volume: '',
    deliveryType: '',
    email: 'email@example.com',
    phone: '+7 (999) 999-99-99',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryOptions = [
    { value: 'express', label: 'Экспресс доставка' },
    { value: 'standard', label: 'Стандартная доставка' },
    { value: 'economy', label: 'Экономичная доставка' },
    { value: 'pickup', label: 'Самовывоз' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Введите наименование товара';
    }
    
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = 'Введите корректную массу';
    }
    
    if (!formData.volume || parseFloat(formData.volume) <= 0) {
      newErrors.volume = 'Введите корректный объём';
    }
    
    if (!formData.deliveryType) {
      newErrors.deliveryType = 'Выберите способ доставки';
    }
    
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          productName: '',
          weight: '',
          volume: '',
          deliveryType: '',
          email: 'email@example.com',
          phone: '+7 (999) 999-99-99',
        });
      }, 3000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, '');
    
    // Format as +7 (XXX) XXX-XX-XX
    if (numbers.length === 0) return '+7 (';
    if (numbers.length <= 1) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (value: string) => {
    handleInputChange('phone', formatPhoneNumber(value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Рассчитать доставку
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Заполните форму, и наш менеджер вас проконсультирует
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left side - Form */}
            <div className="md:w-2/3 p-8 md:p-12">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Заявка отправлена!
                  </h3>
                  <p className="text-gray-600">
                    Наш менеджер свяжется с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Наименование товара
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => handleInputChange('productName', e.target.value)}
                      placeholder="Например: Электронные компоненты"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
                        errors.productName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.productName && (
                      <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
                    )}
                  </div>

                  {/* Weight and Volume Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Weight */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Масса, кг
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="decimal"
                          pattern="[0-9]*\.?[0-9]*"
                          value={formData.weight}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            handleInputChange('weight', value);
                          }}
                          placeholder="0.00"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
                            errors.weight ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                          кг
                        </span>
                      </div>
                      {errors.weight && (
                        <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                      )}
                    </div>

                    {/* Volume */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Общий объём груза, м³
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="decimal"
                          pattern="[0-9]*\.?[0-9]*"
                          value={formData.volume}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            handleInputChange('volume', value);
                          }}
                          placeholder="0.00"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
                            errors.volume ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                          м³
                        </span>
                      </div>
                      {errors.volume && (
                        <p className="mt-1 text-sm text-red-600">{errors.volume}</p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Вид доставки
                      </span>
                    </label>
                    <select
                      value={formData.deliveryType}
                      onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 appearance-none bg-white ${
                        errors.deliveryType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Выберите способ доставки</option>
                      {deliveryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.deliveryType && (
                      <p className="mt-1 text-sm text-red-600">{errors.deliveryType}</p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Ваш email
                        </span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Ваш телефон <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        inputMode="tel"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
                  >
                    Рассчитать доставку
                  </button>

                  {/* Consent Text */}
                  <p className="text-center text-gray-500 text-sm mt-6">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              )}
            </div>

            {/* Right side - Info Panel */}
            <div className="md:w-1/3 bg-gradient-to-b from-blue-50 to-indigo-50 p-8 md:p-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Преимущества работы с нами
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Truck className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">
                        Быстрая доставка по всей России
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">
                        Страхование груза
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">
                        Отслеживание в реальном времени
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-blue-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Контактная информация
                  </h4>
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      +7 (495) 123-45-67
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      info@delivery.ru
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-blue-100">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600 italic">
                      "Расчёт стоимости доставки займет не более 15 минут после отправки формы"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}