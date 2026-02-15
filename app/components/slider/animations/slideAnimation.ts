import gsap from "gsap";

export const createSlideTimeline = (
  titleEl: HTMLElement | null, 
  descEl: HTMLElement | null, 
  imgEl: HTMLElement | null, 
  reduced: boolean
) => {
  if(!titleEl || !descEl || !imgEl) return null;
  
  // Set initial positions - OUTSIDE the container
  gsap.set(titleEl, { 
    y: -200,           // Start far above container
    opacity: 0,
    visibility: 'visible'
  });
  
  gsap.set(descEl, { 
    x: -300,           // Start far left of container
    opacity: 0,
    visibility: 'visible'
  });
  
  gsap.set(imgEl, { 
    y: 300,            // Start far below container
    opacity: 0,
    visibility: 'visible'
  });

  if(reduced) { 
    gsap.set([titleEl, descEl, imgEl], {
      opacity: 1,
      x: 0,
      y: 0
    }); 
    return null; 
  }

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1.0
    }
  });
  
  tl.to(titleEl, {
    y: 0,
    opacity: 1,
    duration: 1.0
  }, 0)
  .to(descEl, {
    x: 0,
    opacity: 1,
    duration: 1.0
  }, 0.2)
  .to(imgEl, {
    y: 0,
    opacity: 1,
    duration: 1.0
  }, 0.3);
  
  return tl;
}