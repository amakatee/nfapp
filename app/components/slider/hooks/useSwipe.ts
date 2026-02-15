import { useCallback,useRef } from 'react'
export const useSwipe=(onLeft:()=>void,onRight:()=>void)=>{
 const startX=useRef(0)
 const onTouchStart=useCallback((e:any)=>{startX.current=e.touches[0].clientX},[])
 const onTouchEnd=useCallback((e:any)=>{
  const delta=e.changedTouches[0].clientX-startX.current
  if(Math.abs(delta)>50){ delta<0?onLeft():onRight() }
 },[onLeft,onRight])
 return {onTouchStart,onTouchEnd}
}