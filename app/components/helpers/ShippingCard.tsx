import React from 'react'
import Image from 'next/image'

type Props = {
  title: string;
  bestChoiceFor: string;
  timing: string;
  restrictions: string;
  bestUsefor: string;
  image: string;
  bestUsefor2: string[];
  }

const ShippingCard = ({title, bestUsefor, bestChoiceFor, timing, restrictions, image, bestUsefor2} : Props) => {
  return (
    <div className='
    group
    cursor-pointer
    h-full
    grid
    grid-rows-[auto_1fr_auto] min-h-[400px]
    md:min-h-[410px]
    relative 
    snap-start
    rounded-lg
    bg-white
    overflow-hidden
    border 
    border-[#08162F]/10 
    shadow-[0_1px_3px_rgba(0,0,0,0.02), 0_1px_2px_rgba(0,0,0,0.04)] 
    transition-shadow
    hover:border-[#08162F]/20
    hover:shadow-[0_4px_12px_rgba(0,0,0,0.02), 0_1px_2px_rgba(0,0,0,0.05)]

    
  
    '>
       
        <div className='relative overflow-hidden aspect-[5/3] cursor-pointer '>
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-103 pointer-events-none"
        />
        </div>
        <div className='p-4 bg-white  text-[#08162F] flex flex-col justify-evenly'>
            <div className='flex '>
                <span className='text-xs rounded-md bg-[#08162F]/5 px-2 py-1'>{timing}</span>
            </div>
            <h3 className='text-lg  font-semibold leading-snug '>{title}</h3>
           
           <div className='text-sm   '>
             <h4>Идеально подходит для:</h4>
             <ul className='pl-5'>
               {bestUsefor2.map((item, index) => (
                 <li key={index}>• {item}</li>
               ))}
             </ul>
           </div>

        </div>
        </div>
   
  )
}

export default ShippingCard