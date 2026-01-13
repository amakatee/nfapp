import React from 'react'
type Props = {
  className: string,
}
const Arrowdown = ({className}:Props) => {
  return (
    <svg
      width="8"
      height="40"
      viewBox="0 -15 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 8 L32 36 L60 8"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
       
       
      />
    </svg>
  )
}

export default Arrowdown