'use client'
interface Props{active:boolean;onClick:()=>void;index:number}
export default function SliderDot({active,onClick,index}:Props){
 return (
  <button 
   aria-label={`Go to slide ${index+1}`} 
   onClick={onClick}
   className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 
    ${active 
      ? 'bg-white scale-110' 
      : 'bg-transparent border border-white/60 hover:border-white'
    }`}
  />
 )
}