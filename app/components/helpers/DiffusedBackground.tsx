// components/DiffusedBackground.tsx
interface DiffusedBackgroundProps {
    children: React.ReactNode;
    colors?: string[];
    intensity?: number;
  }
  
  export default function DiffusedBackground({
    children,
    colors = ['#3b8226', '#8b5cf', '#ec499'],
    intensity = 0.15
  }: DiffusedBackgroundProps) {
    const [color1, color2, color3] = colors;
    
    return (
      <div className="relative w-[300px] h-[450px] bg-white/10 overflow-hidden">
        {/* Динамические градиенты */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${color1}${Math.floor(intensity * 100)}, transparent 50%),
                        radial-gradient(circle at 80% 20%, ${color2}${Math.floor(intensity * 100)}, transparent 50%),
                        radial-gradient(circle at 40% 80%, ${color3}${Math.floor(intensity * 100)}, transparent 50%)`,
          }}
        />
        
        {/* Размытие */}
        <div className="absolute inset-0 backdrop-blur-2xl bg-black/5" />
        
        {/* Виньетка */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        
        {/* Сетка */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Контент */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }