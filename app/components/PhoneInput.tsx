'use client';

import { useState, useEffect } from 'react';

export function PhoneInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  // Функция форматирования номера
  const formatPhoneNumber = (inputValue: string): string => {
    // Удаляем все нецифровые символы, кроме плюса в начале
    const cleanValue = inputValue.replace(/\D/g, '');
    
    // Если нет цифр, возвращаем пустую строку
    if (!cleanValue) return '';
    
    // Ограничиваем длину (максимум 11 цифр для российского номера)
    const limitedValue = cleanValue.slice(0, 11);
    
    // Форматируем номер
    let formatted = '';
    
    if (limitedValue.length > 0) {
      formatted = '+7';
    }
    
    if (limitedValue.length > 1) {
      formatted +=  limitedValue.slice(1, 4);
    }
    
    if (limitedValue.length >= 4) {
      formatted += limitedValue.slice(4, 7);
    }
    
    if (limitedValue.length >= 7) {
      formatted += -limitedValue.slice(7, 9);
    }
    
    if (limitedValue.length >= 9) {
      formatted += -limitedValue.slice(9, 11);
    }
    
    return formatted;
  };

  // Обработчик изменения
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Если пользователь удалил плюс, добавляем его обратно
    let rawValue = inputValue;
    if (!rawValue.startsWith('+') && rawValue.length > 0) {
      // Извлекаем цифры из ввода
      const digits: string = rawValue.replace(/\D/g, '');
      rawValue = digits ? `+7 ${digits.slice(1)}` : '';
    }
    
    const formatted = formatPhoneNumber(rawValue);
    onChange(formatted);
  };

  // Обработчик для удаления символов (Backspace, Delete)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const cursorPosition = e.currentTarget.selectionStart;
    const currentValue = e.currentTarget.value;
    
    // Если нажали Backspace и курсор стоит сразу после нецифрового символа
    if (e.key === 'Backspace' && cursorPosition) {
      const charBeforeCursor = currentValue[cursorPosition - 1];
      
      // Если перед курсором не цифра, удаляем этот символ
      if (charBeforeCursor && !/\d/.test(charBeforeCursor)) {
        e.preventDefault();
        
        // Удаляем нецифровой символ
        const newValue = currentValue.slice(0, cursorPosition - 1) + 
                        currentValue.slice(cursorPosition);
        onChange(newValue);
        
        // Устанавливаем курсор на правильную позицию
        setTimeout(() => {
          e.currentTarget.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        }, 0);
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        placeholder="+7 (999) 999-99-99"
        required
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        📱
      </div>
    </div>
  );
}