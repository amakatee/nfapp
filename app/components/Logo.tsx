// components/NavbarLogo.tsx
import React from 'react';

interface NavbarLogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'full' | 'compact' | 'icon';
}




export const Logo = () => (
  <svg
    width="100"
    height="32"
    viewBox="0 0 120 32"
    className="text-black-900 dark:text-black"
    fill="#193060"
    xmlns="http://www.w3.org/2000/svg"
  >
   
    <text x="10" y="17" fontSize="21" fontWeight="600">北狐</text>
    <text x="10" y="33" fontSize="13" letterSpacing="0.5">NORTHERN FOX</text>
  </svg>
);

export default Logo;