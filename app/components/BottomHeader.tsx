'use client'
import { useState, useEffect, useRef } from 'react';

interface FlowPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const BottomHeader = () => {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const principles = [
    {
      title: "观察形势",
      description: "深入理解当前环境与条件变化",
      icon: "👁️"
    },
    {
      title: "灵活调整",
      description: "根据实际情况制定适宜策略",
      icon: "🔄"
    },
    {
      title: "顺势而为",
      description: "借助趋势力量达成目标",
      icon: "⚡"
    },
    {
      title: "持续优化",
      description: "在动态变化中不断改进方法",
      icon: "📈"
    }
  ];

  // 初始化动画
  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActivePrinciple(prev => (prev + 1) % principles.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [principles.length]);

  // 画布动画效果
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置画布尺寸
    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 创建流动点
    const points: FlowPoint[] = [];
    const pointCount = Math.min(30, Math.floor(canvas.width / 30));
    
    for (let i = 0; i < pointCount; i++) {
      points.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }
    
    // 动画循环
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制连接线
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.15)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }
      
      // 更新并绘制点
      points.forEach(point => {
        // 更新位置
        point.x += point.speedX;
        point.y += point.speedY;
        
        // 边界检查
        if (point.x <= 0 || point.x >= canvas.width) point.speedX *= -1;
        if (point.y <= 0 || point.y >= canvas.height) point.speedY *= -1;
        
        // 绘制点
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 px-4 py-16"
    >
      {/* 背景画布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* 内容容器 */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* 主标题区域 */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-slate-900 dark:text-white">
              因势利导
            </h1>
           </div>
       </div>
      </div>
     </section>
  );
};

export default BottomHeader;