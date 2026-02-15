import { useEffect,useRef } from 'react'
export const useAutoPlay=(enabled:boolean,interval:number,paused:boolean,next:()=>void)=>{
 const timer=useRef<any>(null)
 useEffect(()=>{
  if(!enabled||paused) return
  timer.current=setInterval(next,interval)
  return ()=>timer.current&&clearInterval(timer.current)
 },[enabled,paused,interval,next])
}