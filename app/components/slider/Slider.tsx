'use client'
import { SliderProps } from './types'
import SliderSlide from './SliderSlide'
import SliderControls from './SliderControls'
import { useSlider } from './hooks/useSlider'
import { useAutoPlay } from './hooks/useAutoPlay'
import { useSwipe } from './hooks/useSwipe'
import { useKeyboard } from './hooks/useKeyboard'
import { useCallback } from 'react'

export default function Slider({slides,autoPlayInterval=5000,enableAutoPlay=true,className=''}:SliderProps){
 if(!slides?.length){return <div className='w-full h-[40vh] md:h-[60vh] flex items-center justify-center'>No slides</div>}
 
 const { index, next, prev, goTo, paused, setPaused } = useSlider(slides.length, true)
 useAutoPlay(enableAutoPlay, autoPlayInterval, paused, next)
 
 const pause = useCallback(()=>setPaused(true), [setPaused])
 const resume = useCallback(()=>setPaused(false), [setPaused])
 const swipe = useSwipe(next, prev)
 useKeyboard(next, prev, pause)
 
 return (
  <section 
   className={`relative w-full overflow-hidden h-[40vh] md:h-[60vh] ${className}`}
   style={{ overflow: 'hidden' }}
   role='region' 
   aria-roledescription='carousel' 
   aria-live='polite'
   onMouseEnter={pause} 
   onMouseLeave={resume} 
   onFocus={pause} 
   onBlur={resume}
   onWheel={(e)=>e.deltaY>0?next():prev()} 
   {...swipe}
  >
    {slides.map((s,i)=>(
      <SliderSlide key={s.id} slide={s} active={i===index} priority={i===0}/>
    ))}
    <SliderControls count={slides.length} active={index} onDot={goTo} onPrev={prev} onNext={next}/>
  </section>
 )
}