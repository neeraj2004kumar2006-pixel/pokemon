import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface ParticleTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ParticleText: React.FC<ParticleTextProps> = ({ children, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let isActive = true;
    let localHoverState = false;

    const initCanvas = async () => {
      if (!isActive) return;
      
      // Wait a moment for fonts and any layout shifts to settle
      await new Promise(r => setTimeout(r, 800));
      if (!isActive) return;

      try {
        const dpr = window.devicePixelRatio || 1;
        const renderedCanvas = await html2canvas(container, {
          backgroundColor: null,
          scale: dpr,
          logging: false
        });

        if (!isActive) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const width = renderedCanvas.width;
        const height = renderedCanvas.height;

        canvas.width = width;
        canvas.height = height;
        
        // Match the container's layout size perfectly
        canvas.style.width = `${width / dpr}px`;
        canvas.style.height = `${height / dpr}px`;

        const tempCtx = renderedCanvas.getContext('2d');
        if (!tempCtx) return;
        
        const imageData = tempCtx.getImageData(0, 0, width, height);
        const data = imageData.data;
        particles = [];

        // Extremely fine grains for high density shatter
        const step = Math.max(1, Math.round(dpr)); 
        
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const index = (y * width + x) * 4;
            const alpha = data[index + 3];
            
            // Capture any visible pixel, allowing mixed colors and gradients
            if (alpha > 10) { 
              particles.push({
                x: x,
                y: y,
                originX: x,
                originY: y,
                color: `rgba(${data[index]}, ${data[index+1]}, ${data[index+2]}, ${alpha/255})`,
                vx: 0,
                vy: 0
              });
            }
          }
        }

        if (particles.length > 0) {
          setIsReady(true);
          animate();
        }
      } catch (e) {
        console.error("Particle effect failed to initialize", e);
      }
    };

    const animate = () => {
      if (!isActive) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let allSettled = true;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        if (localHoverState) {
           allSettled = false;
           // Fine particles vibrate and drift rapidly
           p.vx += (Math.random() - 0.5) * 3;
           p.vy += (Math.random() - 0.5) * 3;
           p.vx *= 0.93;
           p.vy *= 0.93;
           p.x += p.vx;
           p.y += p.vy;
        } else {
           // Spring back
           p.vx += (p.originX - p.x) * 0.15;
           p.vy += (p.originY - p.y) * 0.15;
           p.vx *= 0.8;
           p.vy *= 0.8;
           p.x += p.vx;
           p.y += p.vy;
           
           if (Math.abs(p.x - p.originX) > 0.5 || Math.abs(p.y - p.originY) > 0.5 || Math.abs(p.vx) > 0.5 || Math.abs(p.vy) > 0.5) {
             allSettled = false;
           }
        }

        ctx.fillStyle = p.color;
        // Super fine particles
        ctx.fillRect(p.x, p.y, Math.max(1, window.devicePixelRatio * 0.8), Math.max(1, window.devicePixelRatio * 0.8));
      }
      
      // Manage DOM visibility based on animation state
      if (!localHoverState && allSettled) {
        if (canvas.style.opacity !== '0') {
          canvas.style.opacity = '0';
          container.style.opacity = '1';
        }
      } else if (localHoverState || !allSettled) {
        if (canvas.style.opacity !== '1') {
          canvas.style.opacity = '1';
          container.style.opacity = '0';
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize after a delay
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initCanvas);
    } else {
      initCanvas();
    }

    const handleMouseEnter = () => {
      if (!isReady) return;
      localHoverState = true;
      particles.forEach(p => {
        p.vx = (Math.random() - 0.5) * 30;
        p.vy = (Math.random() - 0.5) * 30;
      });
    };
    
    const handleMouseLeave = () => {
      localHoverState = false;
    };

    const wrapper = container.parentElement;
    if (wrapper) {
      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
      wrapper.addEventListener('touchstart', handleMouseEnter, {passive: true});
      wrapper.addEventListener('touchend', handleMouseLeave);
    }

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', handleMouseEnter);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
        wrapper.removeEventListener('touchstart', handleMouseEnter);
        wrapper.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className={`relative inline-block cursor-crosshair ${className}`}>
      <div 
        ref={containerRef}
        className="transition-opacity duration-300"
      >
        {children}
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 pointer-events-none transition-opacity duration-300 opacity-0"
        style={{ zIndex: 10 }}
      />
    </div>
  );
};
