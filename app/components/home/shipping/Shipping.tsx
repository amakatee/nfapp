
import React from 'react'
import SlideSwiper from '../../helpers/SlideSwiper'
import Card from '../../helpers/Card'


const Shipping = () => {
  return (
    <div className=' w-screen '>
      <div className='text-[#08162F] pl-8 pr-8 py-3'>      
        <Card  title='Подберем оптимальный способ доставки для вашего груза' desc='Мы учитываем все ваши пожелания и возможности — от бюджета до сроков. Наша задача не просто доставить груз, а сделать это оптимальным для вас способом.' />
     </div>
      <div className=' h-auto   text-[#08162F] pl-8  bg-white '>
      <SlideSwiper />
     
       </div>
    </div>
  )
}

export default Shipping