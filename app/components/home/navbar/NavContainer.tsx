'use client'
import React from 'react'
import MobileNav from './MobileNav'
import Navbar from './Nav'
import { useState } from 'react'

const NavContainer = () => {
    const [showNav, setShowNav] = useState(false)

    const openNavHandler = () => setShowNav(true)
    const closeNavHandler = () => setShowNav(false)
    

  return (
    <div className='bg-transparent fixed z-10000'>
        <Navbar openNav={openNavHandler} showNav={showNav} closeNav={closeNavHandler}/>
        <MobileNav showNav={showNav} closeNav={closeNavHandler} />
    </div>
  )
}

export default NavContainer