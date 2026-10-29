"use client";

import React, { useEffect, useRef } from "react";

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Mouse va Touch pozitsiyasi
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isActive: false,
      radius: 130,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Katak o'lchami (grid spacing)
    const spacing = 38;
    let time = 0;

    const render = () => {
      time += 0.02;

      // Mouse koordinatasini silliq yetkazish (lerp)
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.2;
        mouse.y += (mouse.targetY - mouse.y) * 0.2;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      }

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Asosiy nozik katak chiziqlari (Light mode)
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.beginPath();

      for (let x = 0; x <= width; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Kesishgan nuqtalar (intersections) va Mouse interaktiv effekti
      for (let x = 0; x <= width; x += spacing) {
        for (let y = 0; y <= height; y += spacing) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Mobil uchun engil ambient to'lqin effekti
          const ambientWave = Math.sin(time + (x + y) * 0.01) * 0.5 + 0.5;

          if (mouse.isActive && dist < mouse.radius) {
            const factor = 1 - dist / mouse.radius; // 0 dan 1 gacha

            // Sichqoncha yaqinidagi nuqtani kattalashtirish va ranglantirish
            const size = 3 + factor * 5;
            ctx.fillStyle = `rgba(22, 163, 74, ${0.3 + factor * 0.65})`; // Alpha Soft yashil rangi

            // Nozik krestik (+) chizish
            ctx.strokeStyle = `rgba(22, 163, 74, ${0.4 + factor * 0.5})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x - size, y);
            ctx.lineTo(x + size, y);
            ctx.moveTo(x, y - size);
            ctx.lineTo(x, y + size);
            ctx.stroke();

            // Sichqoncha markaziga yaqin bo'lgan 2-3 nuqtaga nozik ulanish chizig'i
            if (dist < 70) {
              ctx.strokeStyle = `rgba(22, 163, 74, ${(1 - dist / 70) * 0.25})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(x, y);
              ctx.stroke();
            }
          } else {
            // Oddiy holatdagi mikro nuqta
            const baseAlpha = 0.12 + ambientWave * 0.08;
            ctx.fillStyle = `rgba(0, 0, 0, ${baseAlpha})`;
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
