'useclient'
import React, { useState } from 'react'
import Link from "next/link"
import Arrowdown from '../../helpers/Arrowdown'
import { NAVLINKS } from '@/app/constant/constant'
type Props = {
  showNav:boolean,
  closeNav:() => void
}
const MobileNav = ({showNav, closeNav}: Props) => {
  const navOpenStyles = showNav ? 'translate-y-[0%]' : 'translate-y-[-100%]'
  const mobileNav = showNav ? 'translate-y-[0]' : 'translate-y-[100%]'
  const[isOpen, setIsOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index : number | null) => {
    setOpenIndex(openIndex === index ? null : index)
  }
console.log(openIndex )


  return (
    <nav className={` ${navOpenStyles} h-full w-screen py-[8vh] antialiased font-feature-settings letter-spacing: -0.05em  duration-600 z-1002  lg:hidden  w-screen   `} >
        {showNav && (
       <div  className={`  fixed  
        w-[80%] text-black sm:w-[60%] bg-[#9f7c4e]   z-1050 `}> 
            <ul className=' bg-white text-[#08162F] fixed flex flex-col justify-evenly 
          w-[100%] sm:w-[100%] py-5 space-y-2    '>
           {/* ____ */}
              {NAVLINKS.map((item, index) => (
                <li key={item.title} className={`  rounded-md  mx-5  h-auto  `}>
                  <button 
                  className={`${ item.dropdown && openIndex === index &&' bg-[#0B3C8F]/10 p-2  mb-2' } cursor-pointer  
                  rounded-sm  text-left w-full px-3 
                  flex items-center space-x-1  ` }
                  onClick={() => toggle(index)}>
                     <h2 className=' text-2xl   font-bold  '>{item.title}</h2>
                    <span className="transform transition-transform  ">
                      {item.dropdown &&  <Arrowdown  className={`${openIndex === index ? 'rotate-180' : 'rotate-[-90]' } 
                       w-[10px] transition-transform duration-200`}/>}
                    </span>
                  </button>
                  {item.dropdown && openIndex === index && (
                  <ul 
                    className={`                    
                    flex flex-col cursor-pointer 
                    items-start justify-between  rounded-md
                    px-5 space-y-3 overflow-hidden transition-all duration-500 ease-out nav-open
                    mb-3
                    ` }>
                     
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.title}  >
                          <Link className=' cursor-pointer  font-bold text-xl  ' href={subItem.slug}>  {subItem.title}</Link>
                        </li>

                      ))}
                    </ul>
                    
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
   
      
    </nav>
  )
 
}

export default MobileNav



// ${
//   openIndex === index
//      ? 'opacity-100 translate-y-0 max-h-96'
//      : 'opacity-0 -translate-y-3 max-h-0 pointer-events-none'
//  }