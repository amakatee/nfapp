import { useCallback,useMemo,useState } from 'react'
export const useSlider=(length:number,infinite=true)=>{
 const [index,setIndex]=useState(0)
 const [paused,setPaused]=useState(false)
 const next=useCallback(()=>{
  setIndex(i=> infinite ? (i+1)%length : Math.min(i+1,length-1))
 },[length,infinite])
 const prev=useCallback(()=>{
  setIndex(i=> infinite ? (i-1+length)%length : Math.max(i-1,0))
 },[length,infinite])
 const goTo=useCallback((i:number)=>setIndex(i),[])
 return useMemo(()=>({index,paused,setPaused,next,prev,goTo}),[index,paused,next,prev,goTo])
}