// lib/countries.ts
export interface Country {
    name: string;
    code: string;
    flag: string;
    placeholder: string;
    example: string;
  }
  
  const countries: Country[] = [
    {
      name: 'Россия',
      code: '+7',
      flag: '🇷🇺',
      placeholder: '999 123-45-67',
      example: '+7 (999) 123-45-67'
    },
    {
      name: 'Казахстан',
      code: '+7',
      flag: '🇰🇿',
      placeholder: '701 123-45-67',
      example: '+7 (701) 123-45-67'
    },
    {
      name: 'Беларусь',
      code: '+375',
      flag: '🇧🇾',
      placeholder: '29 123-45-67',
      example: '+375 (29) 123-45-67'
    },
    {
      name: 'Украина',
      code: '+380',
      flag: '🇺🇦',
      placeholder: '99 123-45-67',
      example: '+380 (99) 123-45-67'
    },
    {
      name: 'Кыргызстан',
      code: '+996',
      flag: '🇰🇬',
      placeholder: '700 123-456',
      example: '+996 (700) 123-456'
    },
    {
      name: 'Узбекистан',
      code: '+998',
      flag: '🇺🇿',
      placeholder: '99 123-45-67',
      example: '+998 (99) 123-45-67'
    },
    {
      name: 'США',
      code: '+1',
      flag: '🇺🇸',
      placeholder: '202 555-01-23',
      example: '+1 (202) 555-01-23'
    },
    {
      name: 'Германия',
      code: '+49',
      flag: '🇩🇪',
      placeholder: '151 123-45678',
      example: '+49 (151) 123-45678'
    },
    {
      name: 'Китай',
      code: '+86',
      flag: '🇨🇳',
      placeholder: '131 1234-5678',
      example: '+86 (131) 1234-5678'
    },
    {
      name: 'Турция',
      code: '+90',
      flag: '🇹🇷',
      placeholder: '532 123-45-67',
      example: '+90 (532) 123-45-67'
    }
  ];
  
  export default countries;