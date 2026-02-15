'use client'
interface Props{direction:'left'|'right';onClick:()=>void}
export default function SliderArrow({direction,onClick}:Props){
 return (
  <button 
   aria-label={direction==='left'?'Previous slide':'Next slide'} 
   onClick={onClick}
   className='flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border border-white/30 text-white/80 hover:text-white hover:border-white/70 transition-all duration-300 backdrop-blur-sm'
  >
   <span className='text-2xl md:text-3xl font-light leading-none'>
    {direction==='left'?'←':'→'}
   </span>
  </button>
 )
}