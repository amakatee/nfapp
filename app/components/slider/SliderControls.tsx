'use client'
import SliderDot from './SliderDot'
import SliderArrow from './SliderArrow'

interface Props{count:number;active:number;onDot:(i:number)=>void;onPrev:()=>void;onNext:()=>void}

export default function SliderControls({count,active,onDot,onPrev,onNext}:Props){
 return (
  <>
    {/* Dots - Bottom center for all devices */}
    <div className='absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2 md:gap-3'>
     {Array.from({length:count}).map((_,i)=>(
       <SliderDot key={i} index={i} active={i===active} onClick={()=>onDot(i)}/>
     ))}
    </div>
    
    {/* Arrows - Desktop only - positioned on edges */}
    <div className='absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block'>
     <SliderArrow direction='left' onClick={onPrev}/>
    </div>
    <div className='absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block'>
     <SliderArrow direction='right' onClick={onNext}/>
    </div>
  </>
 )
}