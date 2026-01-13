import React from 'react'
import Image from 'next/image'
import GlowingButton from '../../helpers/GlowingButton'

const Hero = () => {
  return (
    <div className='relative pt-[8vh] h-[57vh] px-5 md:h-[60vh] flex items-center  w-screen bg-[#08162F] overflow-hidden'>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B3C8F] via-[#0A2A5E] to-[#08162F]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10    antialiased font-feature-settings letter-spacing: -0.05em mx-auto text-white"></div>

      {/* <Image src="/images/air.JPG"  sizes="100vw" fill priority className='object-cover z-[-1]' quality={90} alt="img"/> */}
      {/* <video className='object-cover  min-w-full min-h-full absolute   z-[-1]  top-0 left-0 ' loop muted autoPlay playsInline >
        <source src="/images/world.mp4" type="video/mp4"></source>
        

      </video> */}
      
        <div className='mx-auto px-10 flex items-center  items-center'>
            {/* textcontent */}
            
            <div className=' flex flex-col items-center space-y-10 justify-between md:px-[12rem] lg:px-[16rem]  z-800'>
              <div className='flex flex-col space-y-[-1rem]  text-white/90  font-bold drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]'>
                <h1 className='text-2xl md:text-3xl text-start '>
                  <span>Логистика из Китая под ключ: </span> 
                  <span className='font-medium'>от поиска поставщика до вашего порога с возвратом НДС.</span>
                  </h1>
                </div>
                <button
        className="
          relative
          px-12 py-2
          rounded-full
          bg-white
          text-[#08162F]
          md:text-lg
           font-medium
          shadow-[0_0_0_1px_rgba(255,255,255,0.6)]
          transition-all
          hover:scale-[1.03]
          hover:shadow-[0_0_40px_rgba(96,165,250,0.35)]
          focus:outline-none
        "
      >
        <span className="flex items-center gap-3">
         Оставить заявку
        </span>

        {/* Glow */}
       
      </button>
               
            
            </div>
            
            
            {/* image content */}
            {/* <div className='absolute top-0 right-48 hidden lg:block'>
                <Image src="/images/fox2.AVIF" width={550} height={550} alt="img"/>
            </div> */}

        </div>
       
        
      </div>
  )
}

export default Hero



// text-outline-2 backdrop-invert shadow-lg bg-white/20 text-gray-900 text-black 
//text-transparent bg-clip-text  [-webkit-text-stroke:0.4px_white]