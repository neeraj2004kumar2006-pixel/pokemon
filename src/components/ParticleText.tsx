import React, { useEffect, useRef, useState } from 'react';

interface ParticleTextProps {
  text: string;
  className?: string;
}

export const ParticleText: React.FC<ParticleTextProps> = ({ text, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let isHovered = false;
    let isActive = true;

    const fontSize = 100;
    
    const setupCanvas = () => {
      if (!isActive) return;
      
      ctx.font = `900 ${fontSize}px Inter, sans-serif`;
      const metrics = ctx.measureText(text);
      
      // Use moderate padding to keep canvas size reasonable
      const padding = 60;
      const width = Math.max(metrics.width, 50) + padding * 2;
      const height = fontSize + padding * 2;

      canvas.width = width;
      canvas.height = height;

      // Draw text to extract pixels
      ctx.clearRect(0, 0, width, height);
      ctx.font = `900 ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Match the CSS gradient exactly
      const gradient = ctx.createLinearGradient(padding, 0, width - padding, 0);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = gradient;
      
      // Draw perfectly centered
      ctx.fillText(text, width / 2, height / 2);

      // Extract pixels
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      particles = [];

      // Step dictates grain size (lower = more grains, but heavier)
      const step = 3; 
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];
          // Even faintly visible pixels become grains
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
        // If font wasn't loaded, text might be invisible. Retry in 500ms.
        setTimeout(setupCanvas, 500);
      }
    };

    const animate = () => {
      if (!isActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        if (isHovered) {
           // Particles drift and vibrate like sand blowing away
           p.vx += (Math.random() - 0.5) * 1.5;
           p.vy += (Math.random() - 0.5) * 1.5;
           p.vx *= 0.92;
           p.vy *= 0.92;
           p.x += p.vx;
           p.y += p.vy;
        } else {
           // Spring back to origin perfectly
           p.vx += (p.originX - p.x) * 0.08;
           p.vy += (p.originY - p.y) * 0.08;
           p.vx *= 0.85; // dampening
           p.vy *= 0.85;
           p.x += p.vx;
           p.y += p.vy;
        }

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Wait for document fonts to load to prevent invisible text measurement
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Small delay to ensure browser render tree is updated
        setTimeout(setupCanvas, 100);
      });
    } else {
      setupCanvas();
    }

    const handleMouseEnter = () => {
      if (isHovered) return;
      isHovered = true;
      // Explosive initial burst on touch/hover
      particles.forEach(p => {
        p.vx = (Math.random() - 0.5) * 25;
        p.vy = (Math.random() - 0.5) * 25;
      });
    };
    
    const handleMouseLeave = () => {
      isHovered = false;
    };

    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleMouseEnter, {passive: true});
    canvas.addEventListener('touchend', handleMouseLeave);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleMouseEnter);
      canvas.removeEventListener('touchend', handleMouseLeave);
    };
  }, [text]);

  return (
    <span className={`inline-block relative ${className}`}>
      {/* Fallback standard text while canvas is preparing or if it fails */}
      {!isReady && (
        <span className="text-gradient">{text}</span>
      )}
      <canvas 
        ref={canvasRef} 
        className={`cursor-crosshair select-none ${isReady ? 'inline-block' : 'hidden'}`}
        style={{ 
          height: '1.4em', 
          verticalAlign: 'middle',
          margin: '-0.2em -0.5em'
        }}
        aria-label={text}
      />
    </span>
  );
};
