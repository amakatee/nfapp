import { useEffect } from 'react'
export const useKeyboard=(next:()=>void,prev:()=>void,pause:()=>void)=>{
 useEffect(()=>{
  const h=(e:KeyboardEvent)=>{
   if(e.key==='ArrowRight') next()
   if(e.key==='ArrowLeft') prev()
   if(e.key==='Escape') pause()
  }
  window.addEventListener('keydown',h)
  return ()=>window.removeEventListener('keydown',h)
 },[next,prev,pause])
}