import React from 'react'

type Props = {
  textColor: string,
}

const Logo = ({textColor}: Props) => {
  return (
      

        <svg
      width={180}
     // height={120}
      viewBox="0 0 420 120"
      className='z-2000'
     // xmlns="http://www.w3.org/2000/svg"
  
    >
      {/* <defs>
        <clipPath id="circleClip">
          <circle cx="60" cy="60" r="10" />
        </clipPath>
      </defs> */}

    
      {/* <circle cx="60" cy="60" r="10" fill="#000" /> */}

      {/* Fox image */}
      {/* <image
        href="/images/fox2.png"
        x="0"
        y="0"
        width="120"
        height="80"
        clipPath="url(#circleClip)"
        preserveAspectRatio="xMidYMid slice"
      /> */}

      {/* Text */}
      
      <text
        x="00"
        y="80"
        fill={textColor}
        fontSize="40"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontWeight="300"
        letterSpacing="1"
      >
        <tspan fontWeight="300"> 雪狐</tspan>
        NORTHERN
        <tspan fontWeight="600"> FOX</tspan>
      </text>
    </svg>


     
        

        
  )
}

export default Logo

// {/* <div className='flex items-center space-x-2'>
// <div className='w-10 h-10 bg-[#b69974] rounded-full flex items-centr justify-center flex-col'>
//   <h4 className='text-xl  sm:block md:text2xl text-[#d5b68c] font-bold  '> The Northen Fox</h4>
// </div>
// {/* <h4 className='text-xl hidden sm:block md:text2xl text-[#d5b68c] font-bold '> The Northen Fox</h4> */}
// </div> */}