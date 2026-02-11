import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { FC } from 'react';

interface SliderControlsProps {
  isPlaying: boolean;
  isMobile: boolean;
  onPlayToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  progress: number;
  ringColor: string;
}

const SliderControls: FC<SliderControlsProps> = ({
  isPlaying,
  isMobile,
  onPlayToggle,
  onPrev,
  onNext,
  progress,
  ringColor,
}) => {
  const circumference = 2 * Math.PI * 20;

  return (
    <>
      {/* Circular Timer Ring */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <svg 
            className="w-full h-full transform -rotate-90" 
            viewBox="0 0 50 50"
            aria-label={`Progress: ${Math.round(progress)}%`}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={ringColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              className="transition-all duration-100 ease-linear"
            />
          </svg>
          
          <button
            onClick={onPlayToggle}
            className="absolute inset-0 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            aria-pressed={!isPlaying}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {!isMobile && (
        <>
          <button
            onClick={onPrev}
            className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
          </button>
          
          <button
            onClick={onNext}
            className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
          </button>
        </>
      )}
    </>
  );
};

export default SliderControls;