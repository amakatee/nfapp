
import Logo from '@/app/components/helpers/Logo'
import { NAVLINKS } from '@/app/constant/constant'
import React from 'react'
import Link from 'next/link'
import Burger from '@/app/components/helpers/Burger'
import Xbutton from '@/app/components/helpers/Xbutton'
import { useState , useRef, useEffect} from 'react'; 
import DropdownMenu from '@/app/components/helpers/DropdownMenu'
import Arrowdown from '@/app/components/helpers/Arrowdown'
import { spawnSync } from 'child_process'
import { relative } from 'path'
import Tgicon from '@/app/components/helpers/Tgicon'
import Image from 'next/image'
import MailIcon from '@/app/components/helpers/MailIcon'




type Props = {
  openNav: () => void,
  showNav:boolean,
  closeNav:() => void
}

const Navbar = ({openNav, showNav, closeNav} :Props) => {
  const navStyle = showNav ? "#08162F" : "#08162F"
  const [openIndex, setOpenIndex] = useState<number | null>(null)

 
   
 
  
  return (
    <nav className={` ${navStyle } antialiased font-feature-settings letter-spacing: -0.05em h-[8vh] absolute z-2001 bg-white fixed w-[100vw]  `}>
      <div className='flex text-black/80 font-light tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]  items-center h-full justify-between w-[90%] xl:w-[90%] border-b-[0.5px] border-solid border-gray-300   mx-auto'>
        {/* logo */}
        
        <Logo textColor={navStyle} />
        
       
     
        {/* Nav links for latge screen */}
        <ul  className='hidden lg:flex bg:black h-[10v] md:pl-4  items-center space-x-5'>
          {NAVLINKS.map((item, index) => (
            <li
            key={item.title}
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
            className="relative "
            
            > <div className='flex gap-x-1 group justify-between items-center ' >
              <Link className='cursor-pointer text-l font-medium tracking-wide' href={item.slug}>{item.title}</Link>
             {item.dropdown &&  <Arrowdown className='group-hover:rotate-180 transition-transform duration-200' />}

            </div>
              {item?.dropdown && openIndex === index && (
                <ul className="absolute bg-black/90  backdrop-blur backdrop-opacity-10 w-[17rem]  h-auto flex flex-col items-start  py-3 px-2 rounded-sm  ">
                  {
                    item.dropdown.map((subItem) => (
                      <li className='hover:bg-[#329d9c]/40 text-white  hover:text-white w-full px-2 py-2 cursor-pointer text-black rounded-sm transition-colors font-bold' key={subItem.title}   >
                        <Link  href={subItem.slug}>{subItem.title}</Link>
  

                      </li>
                    )) 
                  }
                </ul>
               )}
            </li>
            
          ))}
          

        {/* Button  */}
          {/* <button className='h-full p-3 bg-[#b69974] cursor-pointer text-white font-bold'>Book a call</button> */}
        </ul>
        <div className='flex items-center space-x-3'>
          {/* <div className='flex flex-col'>
          <span className='text-sm'>northernfox.mail.ru</span>
          <span className='text-sm'>8932443223</span>
          </div> */}
        

        {/* humburger button */}
        <div onClick={showNav ? closeNav : openNav} className='lg:hidden'>
          {showNav ?   <Xbutton textColor={navStyle} /> :  <Burger textColor={navStyle}  />}
         
        </div>
        </div>
    
        
      </div>
      {/* <div className='flex flex-col bg-[#08162F]/20  max-h-30 space-y-2  w-12 
       rounded-md opacity-[0.6]  items-center absolute bottom-3 px-2 py-2  right-4 fixed'>
        <Tgicon />
        <Image src={"images/wechat.svg"} alt="wechat" width={25} height={30} />
        <MailIcon />
      </div> */}
    </nav>
  )
}

export default Navbar

