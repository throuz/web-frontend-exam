import { useState, useEffect } from "react";

/**
 * useEyeFollow
 * 讓目標區塊內的物件（如眼球）根據滑鼠移動產生偏移效果，常用於角色眼球追蹤滑鼠。
 *
 * @param {object} ref - React ref，指向要追蹤滑鼠的區塊（如角色區塊）
 * @param {object} options - 設定物件
 *   @param {object} options.move - 最大偏移量（像素），如 { x: 4, y: 4 }
 * @returns {object} eyeOffset - { left: {x, y}, right: {x, y} }，可直接用於 transform: translate
 *
 * 用法：
 *   const eyeOffset = useEyeFollow(heroRef, { move: { x: 4, y: 4 } });
 *   <img style={{ transform: `translate(${eyeOffset.left.x}px, ${eyeOffset.left.y}px)` }} />
 */
export default function useEyeFollow(ref, { move = { x: 4, y: 4 } } = {}) {
  // 狀態：左右眼的偏移量
  const [eyeOffset, setEyeOffset] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  useEffect(() => {
    // 滑鼠移動時計算偏移
    function handleMouseMove(e) {
      if (!ref.current) return;
      if (window.innerWidth < 600) return; // 手機不動眼球
      const rect = ref.current.getBoundingClientRect();
      // 滑鼠座標
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      // 區塊中心點
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // 標準化偏移（-1 ~ 1）
      const nx = (mouseX - cx) / (rect.width / 2);
      const ny = (mouseY - cy) / (rect.height / 2);
      // 計算左右眼偏移（目前左右眼同邏輯）
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
    // 滑鼠離開時歸零
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

  // 回傳左右眼偏移
  return eyeOffset;
}
