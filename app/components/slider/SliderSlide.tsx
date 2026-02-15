'use client'
import Image from 'next/image'
import { Slide } from './types'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { createSlideTimeline } from './animations/slideAnimation'

interface Props{ slide:Slide; active:boolean; priority?:boolean }

export default function SliderSlide({slide,active,priority}:Props){
 const titleRef=useRef<HTMLHeadingElement>(null)
 const descRef=useRef<HTMLParagraphElement>(null)
 const imgRef=useRef<HTMLDivElement>(null)

 useEffect(()=>{
  if(!active) return
  
  gsap.killTweensOf([titleRef.current, descRef.current, imgRef.current])
  
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tl=createSlideTimeline(titleRef.current, descRef.current, imgRef.current, reduced)
  
  return ()=>{ tl?.kill() }
 },[active])

 return (
 <div className={`absolute inset-0 ${active?'opacity-100 z-10':'opacity-0 z-0'}`}>
  {/* Split layout container - side by side on ALL devices */}
  <div className='relative w-full h-full flex flex-row'>
   {/* Left side - Text content (60%) */}
   <div className='relative w-[60%] h-full bg-black/40 overflow-hidden'>
    <div className='absolute inset-0 flex items-center justify-center px-4 md:px-12'>
     <div className='max-w-2xl'>
      <h2 
       ref={titleRef} 
       className='text-xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white'
      >
       {slide.title}
      </h2>
      <p 
       ref={descRef} 
       className='text-xs md:text-lg lg:text-xl text-white/90 max-w-xl'
      >
       {slide.description}
      </p>
     </div>
    </div>
   </div>
   
   {/* Right side - Image (40%) */}
   <div className='relative w-[40%] h-full overflow-hidden'>
    <div 
     ref={imgRef} 
     className='absolute inset-0'
    >
     <Image 
      src={slide.imageUrl} 
      alt={slide.altText} 
      fill 
      priority={priority} 
      className='object-cover'
     />
    </div>
   </div>
  </div>
 </div>
 )
}