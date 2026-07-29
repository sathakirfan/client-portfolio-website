'use client';

import React, { useEffect, useRef } from 'react';

export const Warehouse3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Box particles simulation
    const boxes: {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
      color: string;
      label: string;
    }[] = [];

    const colors = ['rgba(6, 182, 212, 0.4)', 'rgba(34, 197, 94, 0.35)', 'rgba(30, 41, 59, 0.6)'];
    const labels = ['SKU-8849', 'SAP-EWM', 'LOT-9921', 'AMZ-UAE', 'DHL-EXP', 'OTIF-99%'];

    for (let i = 0; i < 28; i++) {
      boxes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 200 + 50,
        size: Math.random() * 35 + 25,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        color: colors[i % colors.length],
        label: labels[i % labels.length]
      });
    }

    let scanLineY = 0;
    let scanDirection = 1;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Warehouse Grid Lines (Floor Perspective)
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.lineWidth = 1;

      const perspectiveY = height * 0.6;
      for (let x = -width; x < width * 2; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(width / 2 + (x - width / 2) * 0.1, perspectiveY);
        ctx.stroke();
      }

      for (let y = perspectiveY; y <= height; y += 25) {
        const ratio = (y - perspectiveY) / (height - perspectiveY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.05 + ratio * 0.1})`;
        ctx.stroke();
      }

      // Render 3D Floating Freight Boxes
      boxes.forEach((box) => {
        box.x += box.speedX;
        box.y += box.speedY;
        box.rotation += box.rotSpeed;

        if (box.x < -50) box.x = width + 50;
        if (box.x > width + 50) box.x = -50;
        if (box.y < -50) box.y = height + 50;
        if (box.y > height + 50) box.y = -50;

        ctx.save();
        ctx.translate(box.x, box.y);
        ctx.rotate(box.rotation);

        // Draw 3D Box Wireframe / Glass Card
        ctx.fillStyle = box.color;
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1.5;

        // Front Face
        ctx.fillRect(-box.size / 2, -box.size / 2, box.size, box.size);
        ctx.strokeRect(-box.size / 2, -box.size / 2, box.size, box.size);

        // Isometric offset lines for 3D depth
        const depth = box.size * 0.3;
        ctx.beginPath();
        ctx.moveTo(-box.size / 2, -box.size / 2);
        ctx.lineTo(-box.size / 2 + depth, -box.size / 2 - depth);
        ctx.lineTo(box.size / 2 + depth, -box.size / 2 - depth);
        ctx.lineTo(box.size / 2, -box.size / 2);

        ctx.moveTo(box.size / 2, -box.size / 2);
        ctx.lineTo(box.size / 2 + depth, -box.size / 2 - depth);
        ctx.lineTo(box.size / 2 + depth, box.size / 2 - depth);
        ctx.lineTo(box.size / 2, box.size / 2);
        ctx.stroke();

        // Label on box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '9px monospace';
        ctx.fillText(box.label, -box.size / 2.5, 3);

        ctx.restore();
      });

      // Render Laser Barcode Scanner Beam
      scanLineY += 1.8 * scanDirection;
      if (scanLineY > height) scanDirection = -1;
      if (scanLineY < 0) scanDirection = 1;

      const grad = ctx.createLinearGradient(0, scanLineY - 15, 0, scanLineY + 15);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
      grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)');
      grad.addColorStop(1, 'rgba(34, 197, 94, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, scanLineY - 15, width, 30);

      // Core Laser Line
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(width, scanLineY);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
