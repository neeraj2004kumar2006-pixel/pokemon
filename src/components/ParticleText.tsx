import React, { useEffect, useRef, useState } from 'react';

interface ParticleTextProps {
  text: string;
  className?: string;
}

export const ParticleText: React.FC<ParticleTextProps> = ({ text, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let isHovered = false;
    let isActive = true;

    const setupCanvas = () => {
      if (!isActive) return;

      // Get exact font styles from the container to match layout perfectly
      const computedStyle = window.getComputedStyle(container);
      const fontSize = parseFloat(computedStyle.fontSize) || 48;
      const fontWeight = computedStyle.fontWeight || 'bold';
      const fontFamily = computedStyle.fontFamily || 'Inter, sans-serif';
      
      const dpr = window.devicePixelRatio || 1;
      
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      const metrics = ctx.measureText(text);
      
      // Exact padding needed for the explosion without clipping
      const padding = 40;
      
      // Calculate logical CSS pixels
      const logicalWidth = Math.max(metrics.width, 10) + padding * 2;
      const logicalHeight = fontSize * 1.5 + padding * 2;

      // Set actual canvas resolution (multiplied by DPR for retina sharpness)
      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;
      
      // Set CSS dimensions
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;

      // Scale context to match DPR
      ctx.scale(dpr, dpr);

      // Draw text
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Recreate CSS gradient: from-brand-primary (#3b82f6) to brand-secondary (#8b5cf6)
      const gradient = ctx.createLinearGradient(padding, 0, logicalWidth - padding, 0);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = gradient;
      
      // Draw centered
      ctx.fillText(text, logicalWidth / 2, logicalHeight / 2);

      // Extract pixels (we must read the full DPR resolution)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      particles = [];

      // Step size depends on DPR to keep particle count reasonable
      const step = Math.round(2 * dpr); 
      
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          
          if (alpha > 10) { 
            // Store logical coordinates (divide by DPR)
            const logicalX = x / dpr;
            const logicalY = y / dpr;
            particles.push({
              x: logicalX,
              y: logicalY,
              originX: logicalX,
              originY: logicalY,
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
        setTimeout(setupCanvas, 500);
      }
    };

    const animate = () => {
      if (!isActive) return;
      
      // Clear logical area
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        if (isHovered) {
           p.vx += (Math.random() - 0.5) * 1.5;
           p.vy += (Math.random() - 0.5) * 1.5;
           p.vx *= 0.92;
           p.vy *= 0.92;
           p.x += p.vx;
           p.y += p.vy;
        } else {
           p.vx += (p.originX - p.x) * 0.1;
           p.vy += (p.originY - p.y) * 0.1;
           p.vx *= 0.82;
           p.vy *= 0.82;
           p.x += p.vx;
           p.y += p.vy;
        }

        ctx.fillStyle = p.color;
        // Draw particle (1.5 logical pixels is crisp and visible)
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setTimeout(setupCanvas, 100));
    } else {
      setTimeout(setupCanvas, 100);
    }

    const handleMouseEnter = () => {
      if (isHovered) return;
      isHovered = true;
      particles.forEach(p => {
        p.vx = (Math.random() - 0.5) * 20;
        p.vy = (Math.random() - 0.5) * 20;
      });
    };
    
    const handleMouseLeave = () => {
      isHovered = false;
    };

    const canvasEl = canvas;
    canvasEl.addEventListener('mouseenter', handleMouseEnter);
    canvasEl.addEventListener('mouseleave', handleMouseLeave);
    canvasEl.addEventListener('touchstart', handleMouseEnter, {passive: true});
    canvasEl.addEventListener('touchend', handleMouseLeave);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      canvasEl.removeEventListener('mouseenter', handleMouseEnter);
      canvasEl.removeEventListener('mouseleave', handleMouseLeave);
      canvasEl.removeEventListener('touchstart', handleMouseEnter);
      canvasEl.removeEventListener('touchend', handleMouseLeave);
    };
  }, [text]);

  return (
    <span 
      ref={containerRef} 
      className={`inline-flex items-center justify-center relative ${className}`}
      style={{ verticalAlign: 'middle' }}
    >
      <span className={`text-gradient transition-opacity duration-300 ${isReady ? 'opacity-0' : 'opacity-100'}`}>
        {text}
      </span>
      <canvas 
        ref={canvasRef} 
        className={`cursor-crosshair select-none absolute transition-opacity duration-300 ${isReady ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-label={text}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}
      />
    </span>
  );
};
