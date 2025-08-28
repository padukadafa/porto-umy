"use client";
import { useEffect, useRef, useState } from "react";

interface StarfieldProps {
  density?: number;
}

export function Starfield({ density = 250 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const stars = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      r: Math.random() * 0.9 + 0.1,
      s: Math.random() * 0.0008 + 0.0002,
    }));

    const resize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      const newDpr = devicePixelRatio || 1;
      setDpr(newDpr);
      canvas.width = innerWidth * newDpr;
      canvas.height = innerHeight * newDpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#0b1020";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= s.s;
        if (s.z <= 0) {
          s.x = Math.random();
          s.y = Math.random();
          s.z = 1;
        }
        const sx = (s.x - 0.5) * w + w / 2;
        const sy = (s.y - 0.5) * h + h / 2;
        const size = (1 - s.z) * 2.2 * dpr + s.r;
        const alpha = Math.max(0.2, 1 - s.z);
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [density, dpr]);

  return <canvas ref={canvasRef} aria-hidden className="fixed inset-0 -z-10 block" />;
}
