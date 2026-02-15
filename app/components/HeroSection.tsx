'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeaderSlider from './HeaderSlider'
export default function NorthernFoxHeroAnimated() {
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use GSAP context for easier cleanup
    const ctx = gsap.context(() => {
      // Animate images with staggered effect - filter out null values
      const images = [image1Ref.current, image2Ref.current, image3Ref.current].filter(
        (img): img is HTMLDivElement => img !== null
      );
      
      if (images.length > 0) {
        gsap.from(images, {
          y: 200,
          opacity: 0,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.3
        });
      }
      
      // Animate text content with null check
      if (contentRef.current && contentRef.current.children) {
        gsap.from(contentRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.8
        });
      }
    });

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <div className=" bg-white  ">
     <div 
ref={image1Ref}
className="flex-1 min-h-[35vh] relative overflow-hidden bg-white border-[2px] border-[#050b1e]"
>
<div className="absolute inset-0 flex items-center justify-center">
  <div className="relative w-[100vw] md:w-[60vw] h-[60vh] max-w-4xl">
    <Image
      src="/images/msk1.PNG" 
      alt="Northern Fox Digital Agency"
      fill
      sizes="(max-width: 768px) 90vw, 60vw"
      className="object-cover rounded-lg shadow-2xl"
      priority
      quality={90}
    />
    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div> */}
{/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded-lg"></div> */}
    {/* Overlay text */}
    {/* <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
      <div className="text-center z-10 p-6">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Логистика из Китая «под ключ»</div>
        <div className="text-white/90 text-lg uppercase tracking-widest font-medium drop-shadow-lg">Полный цикл логистики из Китая</div>
      </div>
    </div> */}
  </div>
</div>
</div>

{/* Second image container - 1/3 of 80vh */}
<div  ref={containerRef}

className="w-full flex flex-wrap min-h-[50vh] "
>
{/* Image Section - Takes full width on mobile, 50% on medium+ screens */}
<div 
ref={image2Ref}
className="w-full md:w-1/2 min-h-[30vh] md:min-h-full relative overflow-hidden bg-gradient-to-r from-black to-gray-900 order-1"
>
<Image
      src="/images/gz.JPG" 
      alt="Northern Fox Digital Agency"
      fill
      sizes="(max-width: 768px) 90vw, 60vw"
      className="object-cover  shadow-2xl"
      priority
      quality={90}
    />
    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div> */}
{/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded-lg"></div> */}
<div className="absolute inset-0 flex items-center justify-center">
<div className="text-center text-white p-8">
  <div className="text-4xl md:text-5xl font-bold mb-4">因势利导</div>
  {/* <div className="text-white/80 text-lg mb-8">kakoi to text</div> */}
  
</div>
</div>
</div>

{/* Content Section - Takes full width on mobile, 50% on medium+ screens */}
<div 
ref={contentRef}
className="w-full md:w-1/2 min-h-[45vh] md:min-h-full flex items-center justify-center  bg-white p-8 md:p-12 order-2 md:order-2"
>
<div className="max-w-lg">
<h2 className="text-4xl md:text-4xl lg:text-5xl  font-bold text-[#050b1e] mb-8 leading-tight tracking-tight">
Бизнес-логистика из Китая
</h2>


{/* Description with clean minimal spacing */}
<div className="space-y-6">
<p className="text-[#050b1e] text-lg md:text-xl leading-relaxed font-medium tracking-normal">
Экспертный подбор поставщиков с полным due diligence, юридическое сопровождение контрактов, 
страхование груза на 100% стоимости, легальное таможенное оформление и премиальная доставка 
с end-to-end контролем.
</p>
</div>



</div>
</div>


</div>
     
    </div>
  );
}


// <div 
// ref={image1Ref}
// className="flex-1 min-h-[35vh] relative overflow-hidden bg-white border-[2px] border-[#050b1e]"
// >
// <div className="absolute inset-0 flex items-center justify-center">
//   <div className="relative w-[100vw] md:w-[60vw] h-[60vh] max-w-4xl">
//     <Image
//       src="/images/msk1.PNG" 
//       alt="Northern Fox Digital Agency"
//       fill
//       sizes="(max-width: 768px) 90vw, 60vw"
//       className="object-cover rounded-lg shadow-2xl"
//       priority
//       quality={90}
//     />
//     {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div> */}
// {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded-lg"></div> */}
//     {/* Overlay text */}
//     {/* <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
//       <div className="text-center z-10 p-6">
//         <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Логистика из Китая «под ключ»</div>
//         <div className="text-white/90 text-lg uppercase tracking-widest font-medium drop-shadow-lg">Полный цикл логистики из Китая</div>
//       </div>
//     </div> */}
//   </div>
// </div>
// </div>

// {/* Second image container - 1/3 of 80vh */}
// <div  ref={containerRef}

// className="w-full flex flex-wrap min-h-[50vh] "
// >
// {/* Image Section - Takes full width on mobile, 50% on medium+ screens */}
// <div 
// ref={image2Ref}
// className="w-full md:w-1/2 min-h-[30vh] md:min-h-full relative overflow-hidden bg-gradient-to-r from-black to-gray-900 order-1"
// >
// <Image
//       src="/images/gz.JPG" 
//       alt="Northern Fox Digital Agency"
//       fill
//       sizes="(max-width: 768px) 90vw, 60vw"
//       className="object-cover  shadow-2xl"
//       priority
//       quality={90}
//     />
//     {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div> */}
// {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded-lg"></div> */}
// <div className="absolute inset-0 flex items-center justify-center">
// <div className="text-center text-white p-8">
//   <div className="text-4xl md:text-5xl font-bold mb-4">因势利导</div>
//   {/* <div className="text-white/80 text-lg mb-8">kakoi to text</div> */}
  
// </div>
// </div>
// </div>

// {/* Content Section - Takes full width on mobile, 50% on medium+ screens */}
// <div 
// ref={contentRef}
// className="w-full md:w-1/2 min-h-[45vh] md:min-h-full flex items-center justify-center  bg-white p-8 md:p-12 order-2 md:order-2"
// >
// <div className="max-w-lg">
// <h2 className="text-4xl md:text-4xl lg:text-5xl  font-bold text-[#050b1e] mb-8 leading-tight tracking-tight">
// Бизнес-логистика из Китая
// </h2>


// {/* Description with clean minimal spacing */}
// <div className="space-y-6">
// <p className="text-[#050b1e] text-lg md:text-xl leading-relaxed font-medium tracking-normal">
// Экспертный подбор поставщиков с полным due diligence, юридическое сопровождение контрактов, 
// страхование груза на 100% стоимости, легальное таможенное оформление и премиальная доставка 
// с end-to-end контролем.
// </p>
// </div>



// </div>
// </div>


// </div>