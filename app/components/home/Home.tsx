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
import {Slider} from "../../components/slider"

const slides =[
  {
    id:1,
    title: "Northern Fox",
    description: "hello",
    imageUrl:"/images/msc.jpeg",
    altText: "Dsfsdf"
  },
  {
    id:2,
    title: "Nortdsdhern Fox",
    description: "hello",
    imageUrl:"/images/gz.JPG",
    altText: "Dsfsdf"
  }
]

function Home() {
  return (
    <div className=' antialiased font-feature-settings letter-spacing: -0.05em text-[#08162F]'>
{/*       
       <NorthernFoxNavbar /> */}

        {/* <Slider slides={slides} /> */}
        <HeroSection />
        <WhyChooseUsEnhanced />
        <ServicesPage />
        <ShippingMethod />
      
        
     
        {/* <div className='w-auto overflow-hidden mb-10 '>
         <Shipping />
        </div> */}
       
      
    
        <DeliveryForm />
        {/* <CurrencyConverter /> */}
       
       
      
     </div>
  )
}

export default Home