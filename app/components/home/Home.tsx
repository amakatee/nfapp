import React from 'react'
import SlideSwiper from '../helpers/SlideSwiper'
import Shipping from './shipping/Shipping'
import Intro from './intro/Intro'
import Services from './services/Services'
import Hero from './hero/Hero'
function Home() {
  return (
    <div className=' antialiased font-feature-settings letter-spacing: -0.05em text-[#08162F]'>
     
        <Hero />
        <div className='pl-8 '> 
        <Intro />
        </div>
       
        <div className='w-auto overflow-hidden mb-10 '>
         <Shipping />
        </div>
        <Services />
       
       
      
     </div>
  )
}

export default Home