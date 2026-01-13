import React from 'react'
import Card from '../../helpers/Card'

const Intro = () => {
  return (
    <div>
        <div className=' w-full pt-10  text-[#08162F]  antialiased font-feature-settings letter-spacing: -0.05em  flex flex-wrap items-center  space-x-10  py-4 mb-7'  > 
                 
                 <p className='font-bold lg:px-40 text-xl/6 pb-6'>
                 Мы обеспечиваем легальный ввоз , что дает вам полный пакет документов для вычета НДС в России.
                 Наш статус в Китае позволяет нам оптимизировать стоимость закупки и предлагать вам лучшие цены.
                 </p>
                 <div className='flex justify-evenly flex-wrap justify-evenly w-[100%]  pr-8 '>
                 <Card title="Наша зона ответственности:" desc="Мы выступаем как ваш официальный агент в Китае. Организуем экспорт с нулевой ставкой НДС и готовим для вас полный комплект таможенных документов: контракт, инвойс, упаковочный лист."/>
                 <Card title="Ваша выгода и действие:" desc="Вы ввозите товар как законный импортер. Уплатив таможенный НДС (20%-22%), вы получаете право на его полный вычет. Это прямая экономия и основа для масштабирования бизнеса с любыми ритейлерами и маркетплейсами."/>
                 </div>
                 

                 
                 
         </div>
    </div>
  )
}

export default Intro