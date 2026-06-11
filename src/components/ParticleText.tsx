import React, { useEffect, useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';

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
      
      // Wait 1.5 seconds to ensure Framer Motion animations have completely finished
      // before capturing the DOM, otherwise we might capture a 0-opacity element!
      await new Promise(r => setTimeout(r, 1500));
      if (!isActive) return;

      try {
        const dpr = window.devicePixelRatio || 1;
        
        // html-to-image uses SVG foreignObject, which flawlessly captures CSS text-gradients
        const renderedCanvas = await htmlToImage.toCanvas(container, {
          backgroundColor: 'rgba(0,0,0,0)',
          pixelRatio: dpr,
          skipFonts: false
        });

        if (!isActive) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const width = renderedCanvas.width;
        const height = renderedCanvas.height;

        canvas.width = width;
        canvas.height = height;
        
        // Match the container's physical layout size
        canvas.style.width = `${width / dpr}px`;
        canvas.style.height = `${height / dpr}px`;

        const tempCtx = renderedCanvas.getContext('2d');
        if (!tempCtx) return;
        
        const imageData = tempCtx.getImageData(0, 0, width, height);
        const data = imageData.data;
        particles = [];

        // Dense grains for perfect recreation of the DOM text
        const step = Math.max(1, Math.round(dpr)); 
        
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const index = (y * width + x) * 4;
            const alpha = data[index + 3];
            
            // Only capture non-transparent pixels
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
        } else {
          // If capture was blank (maybe framer motion delayed), retry once
          setTimeout(initCanvas, 1000);
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
           p.vx += (Math.random() - 0.5) * 3;
           p.vy += (Math.random() - 0.5) * 3;
           p.vx *= 0.93;
           p.vy *= 0.93;
           p.x += p.vx;
           p.y += p.vy;
        } else {
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
        // Draw exact 1px particle (scaled by DPR)
        ctx.fillRect(p.x, p.y, Math.max(1, window.devicePixelRatio * 0.8), Math.max(1, window.devicePixelRatio * 0.8));
      }
      
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

    // Give browser time to parse fonts and layout
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initCanvas);
    } else {
      initCanvas();
    }

    const handleMouseEnter = () => {
      if (!isReady) return;
      localHoverState = true;
      particles.forEach(p => {
        p.vx = (Math.random() - 0.5) * 35; // Explosive scatter
        p.vy = (Math.random() - 0.5) * 35;
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
