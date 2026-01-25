import React from 'react'
import SlideSwiper from '../helpers/SlideSwiper'
import Shipping from './shipping/Shipping'
import Intro from './intro/Intro'
import Services from './services/Services'
import Hero from './hero/Hero'

import { DeliveryComparisonTable } from '../helpers/DelieveryTable'

import DeliveryForm from '../DelieveryForm'
import ShippingMethod from '../ShippingMethod'
import HeroSection from '../HeroSection'
import CurrencyConverter from '../CurrensyConverter';
import NorthernFoxNavbar from '../NavbarSection'
import WhyChooseUsEnhanced from '../WhyChooseUs'
import ServicesPage from '../ServicesPage'


function Home() {
  return (
    <div className=' antialiased font-feature-settings letter-spacing: -0.05em text-[#08162F]'>
      
       <NorthernFoxNavbar />
      
        <HeroSection />
        <WhyChooseUsEnhanced />
        <ServicesPage />
        <ShippingMethod />
      
        
     
        {/* <div className='w-auto overflow-hidden mb-10 '>
         <Shipping />
        </div> */}
       
      
    
        <DeliveryForm />
        <CurrencyConverter />
       
       
      
     </div>
  )
}

export default Home