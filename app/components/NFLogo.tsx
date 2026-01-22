// components/TextLogoSVG.tsx
import React from 'react';

interface TextLogoSVGProps {
  className?: string;
  width?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const TextLogoSVG: React.FC<TextLogoSVGProps> = ({
  className = '',
  width = 180,
  height = 80,
  primaryColor = '#003f7f',
  secondaryColor = '#4b5563' 
}) => {
  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chinese Characters - Stylized */}
        <text
          x="10"
          y="55"
          fontFamily="'Noto Sans SC', 'Microsoft YaHei', sans-serif"
          fontSize="48"
          fontWeight="700"
          fill={primaryColor}
        >
          北狐
        </text>
        
        {/* Vertical Separator */}
        <line
          x1="110"
          y1="15"
          x2="110"
          y2="65"
          stroke={secondaryColor}
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        
        {/* English Text */}
        <g>
          <text
            x="130"
            y="35"
            fontFamily="'Inter', 'Segoe UI', sans-serif"
            fontSize="28"
            fontWeight="600"
            letterSpacing="2"
            fill={primaryColor}
            
          >
            Northern
          </text>
          <text
            x="130"
            y="60"
            fontFamily="'Inter', 'Segoe UI', sans-serif"
            fontSize="24"
            fontWeight="300"
            letterSpacing="3"
            fill={primaryColor}
            
          >
            Fox
          </text>
        </g>
        
        {/* Tagline */}
        {/* <text
          x="10"
          y="75"
          fontFamily="'Inter', sans-serif"
          fontSize="12"
          fontWeight="300"
          letterSpacing="4"
          fill={secondaryColor}
         
        >
          GLOBAL LOGISTICS
        </text> */}
      </svg>
    </div>
  );
};

export const TextLogoMinimal: React.FC<TextLogoSVGProps> = (props) => {
  return (
    <div className={props.className}>
      <svg
        width={props.width || 200}
        height={props.height || 60}
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Compact version */}
        <text
          x="10"
          y="40"
          fontFamily="'Noto Sans SC', sans-serif"
          fontSize="36"
          fontWeight="700"
          fill={props.primaryColor || '#1e40af'}
        >
          北狐
        </text>
        
        <g>
          <text
            x="90"
            y="28"
            fontFamily="'Inter', sans-serif"
            fontSize="20"
            fontWeight="600"
            letterSpacing="1"
            fill={props.primaryColor || '#1e40af'}
          >
            NORTHERN
          </text>
          <text
            x="90"
            y="48"
            fontFamily="'Inter', sans-serif"
            fontSize="18"
            fontWeight="300"
            letterSpacing="2"
            fill={props.primaryColor || '#1e40af'}
          >
            FOX
          </text>
        </g>
      </svg>
    </div>
  );
};

export default TextLogoSVG;