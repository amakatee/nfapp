import React from 'react'
import { SERVICES } from '@/app/constant/constant'
import GlowingButton from '@/app/components/helpers/GlowingButton'
import Card from '@/app/components/helpers/Card'

const Services = () => {
  return (
    <section className='w-screen h-auto text-black '>
      
        <div className='flex  flex-wrap px-[2rem] space-x-4 py-[3rem]  '>
             {SERVICES.map((service, index) => (
               <Card key={index} title={service.title} desc={service.description} />
                 
             ))}
          
        </div>
    </section>
  )
}

export default Services