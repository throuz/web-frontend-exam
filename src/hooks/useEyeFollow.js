import { useState, useEffect } from "react";

export default function useEyeFollow(ref, { move = { x: 4, y: 4 } } = {}) {
  const [eyeOffset, setEyeOffset] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  useEffect(() => {
    function handleMouseMove(e) {
      if (!ref.current) return;
      if (window.innerWidth < 600) return; // 手機不動
      const rect = ref.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (mouseX - cx) / (rect.width / 2);
      const ny = (mouseY - cy) / (rect.height / 2);
      setEyeOffset({
        left: {
          x: Math.max(-1, Math.min(1, nx)) * move.x,
          y: Math.max(-1, Math.min(1, ny)) * move.y,
        },
        right: {
          x: Math.max(-1, Math.min(1, nx)) * move.x,
          y: Math.max(-1, Math.min(1, ny)) * move.y,
        },
      });
    }
    function handleMouseLeave() {
      setEyeOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, move.x, move.y]);

  return eyeOffset;
}
