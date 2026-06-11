import React, { useEffect, useRef } from 'react';

interface ParticleTextProps {
  text: string;
  className?: string;
}

export const ParticleText: React.FC<ParticleTextProps> = ({ text, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let isHovered = false;

    // Use a large font size for crisp resolution, then scale it down with CSS
    const fontSize = 120;
    
    const setupCanvas = () => {
      ctx.font = `900 ${fontSize}px Inter, sans-serif`;
      const metrics = ctx.measureText(text);
      // Give some padding so particles don't clip when they explode
      const padding = 150;
      const width = metrics.width + padding * 2;
      const height = fontSize + padding * 2;

      canvas.width = width;
      canvas.height = height;

      // Draw text
      ctx.clearRect(0, 0, width, height);
      ctx.font = `900 ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Match the CSS gradient (.text-gradient)
      // from-brand-primary (#3b82f6) to brand-secondary (#8b5cf6)
      const gradient = ctx.createLinearGradient(padding, 0, width - padding, 0);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = gradient;
      
      // Slight vertical adjustment to perfectly center standard caps
      ctx.fillText(text, width / 2, height / 2 + fontSize * 0.1);

      // Extract pixels
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      particles = [];

      // Step dictates particle density (3 = fine grains)
      const step = 3; 
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 128) {
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
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        if (isHovered) {
           // float around randomly like sand blowing
           p.vx += (Math.random() - 0.5) * 1.5;
           p.vy += (Math.random() - 0.5) * 1.5;
           p.vx *= 0.92;
           p.vy *= 0.92;
           p.x += p.vx;
           p.y += p.vy;
        } else {
          // Spring back to original position
          p.vx += (p.originX - p.x) * 0.08;
          p.vy += (p.originY - p.y) * 0.08;
          
          // Friction to settle down
          p.vx *= 0.85;
          p.vy *= 0.85;

          p.x += p.vx;
          p.y += p.vy;
        }

        ctx.fillStyle = p.color;
        // Draw the grain (2x2 square)
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    setupCanvas();
    animate();

    const handleMouseEnter = () => {
      if (isHovered) return;
      isHovered = true;
      // Initial burst
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
    
    // Also trigger on touch for mobile support
    canvas.addEventListener('touchstart', handleMouseEnter, {passive: true});
    canvas.addEventListener('touchend', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleMouseEnter);
      canvas.removeEventListener('touchend', handleMouseLeave);
    };
  }, [text]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`inline-block cursor-crosshair select-none ${className}`}
      style={{ 
        // We rendered it large with lots of padding. 
        // Let's scale it so it visually matches normal text line-height.
        height: '1.8em', 
        verticalAlign: 'middle',
        marginTop: '-0.4em',
        marginBottom: '-0.4em',
        marginLeft: '-0.8em',
        marginRight: '-0.8em'
      }}
      aria-label={text}
    />
  );
};
