import { useEffect, useRef } from "react";

const InteractiveBackground = ({
  color = "237, 237, 5",
  linkDistance = 130,
  mouseRadius = 160,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: null, y: null };
    let w = 0;
    let h = 0;
    let particles = [];
    let raf = 0;

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.floor((w * h) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 1.8 + 0.8,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reduceMotion) {
          if (mouse.x !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseRadius && dist > 0) {
              const force = (mouseRadius - dist) / mouseRadius;
              p.x += (dx / dist) * force * 2.5;
              p.y += (dy / dist) * force * 2.5;
            }
          }

          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.6)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${color}, ${0.22 * (1 - dist / linkDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < mouseRadius * 1.3) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${color}, ${0.35 * (1 - dist / (mouseRadius * 1.3))})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    const onResize = () => {
      init();
      if (reduceMotion) frame();
    };

    init();
    frame();

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [color, linkDistance, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default InteractiveBackground;