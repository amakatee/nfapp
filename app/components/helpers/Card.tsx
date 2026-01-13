import React from 'react'
type Card ={
    title:string,
    desc:string,
}

const Card = ({title, desc} : Card) => {
  return (
    <div className='  lg:1/2   py-4 mb-7 border-b-[.5px] border-gray-300' > 
    <h4 className='font-medium tracking-whide pb-1'>{title}</h4>
    <p className='font-light tracking-wide'>{desc}</p>
   </div>
  )
}

export default Card