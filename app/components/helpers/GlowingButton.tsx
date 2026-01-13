export default function GlowingButton() {
    return (
      <button className="relative cursor-pointer bg-transparent px-10 py-4 text-white uppercase tracking-widest">
        {/* SVG рамка */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          {/* Серая рамка */}
          <rect
            x="0.5"
            y="0.5"
            width="99"
            height="39"
            rx="20"
            ry="20"
            fill="none"
            stroke="black"
            strokeWidth="0.4"
          />
  
          {/* Бегающий свет */}
          <rect
            x="0.5"
            y="0.5"
            width="99"
            height="39"
            rx="20"
            ry="20"
            fill="none"
            stroke="url(#glow)"
            strokeWidth="1.5"
            strokeDasharray="20 200"
            className="animate-border"
          />
  
          {/* Градиент */}
          <defs>
            <linearGradient id="glow" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#7fffd4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
  
        {/* Текст */}
        <span className="relative z-10 font-lignt text-black drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">Cвязаться</span>
      </button>
    )
  }