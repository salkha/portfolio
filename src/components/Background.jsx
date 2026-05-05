import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Configuration for "Subtle Infinity" effect
    const particles = [];
    const particleCount = 40;
    const gridLines = 15;
    let scrollPos = 0;

    const handleScroll = () => {
      scrollPos = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.0005;
      const centerY = canvas.height * 0.5;
      const centerX = canvas.width * 0.5;

      // Draw subtle perspective grid (The "Infinity" feel)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)'; // Very subtle secondary color
      ctx.lineWidth = 1;

      // Horizontal lines converging
      for (let i = 0; i < gridLines; i++) {
        const y = (i / gridLines) * canvas.height;
        const offset = (scrollPos * 0.1) % (canvas.height / gridLines);
        const finalY = (y + offset);
        
        ctx.beginPath();
        ctx.moveTo(0, finalY);
        ctx.lineTo(canvas.width, finalY);
        ctx.stroke();
      }

      // Vertical lines converging to center
      for (let i = 0; i <= gridLines; i++) {
        const x = (i / gridLines) * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(centerX + (x - centerX) * 0.1, centerY); // Fake perspective
        ctx.stroke();
      }

      // Draw subtle particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Move with scroll
        const scrollOffset = scrollPos * 0.05;
        const drawY = (p.y - scrollOffset) % canvas.height;
        const finalY = drawY < 0 ? drawY + canvas.height : drawY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity * 0.15})`; // Very subtle primary color
        ctx.beginPath();
        ctx.arc(p.x, finalY, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle glow at the center/top
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.6);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
};

export default Background;
