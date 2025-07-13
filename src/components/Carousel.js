import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Box } from "@mui/material";

function Carousel({
  images = [],
  autoPlay = true,
  interval = 3000,
  showDots = true,
}) {
  const [current, setCurrent] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const autoPlayRef = useRef();
  const dragRef = useRef();
  const startX = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const realLen = images.length;
  const imgWidth = 250;
  const imgHeight = 150;
  const gap = 8; // px

  // 監聽 container 寬度
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (dragRef.current) setContainerWidth(dragRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 計算可見圖片數（可為小數）
  const visibleCount = Math.max(1, (containerWidth + gap) / (imgWidth + gap));
  const maxTranslate = Math.max(
    0,
    realLen * (imgWidth + gap) - gap - containerWidth
  );

  // Auto play
  useEffect(() => {
    if (!autoPlay || realLen <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= realLen - 1) return 0;
        return prev + 1;
      });
    }, interval);
    return () => clearInterval(autoPlayRef.current);
  }, [autoPlay, interval, realLen]);

  // Drag/Swipe handlers
  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };
  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    setDragOffset(x - startX.current);
  };
  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(dragOffset) > 40 && realLen > visibleCount) {
      if (dragOffset < 0 && current < realLen - 1) {
        setCurrent((prev) => Math.min(prev + 1, realLen - 1));
      } else if (dragOffset > 0 && current > 0) {
        setCurrent((prev) => Math.max(prev - 1, 0));
      }
    }
    setDragOffset(0);
  };

  // Dots click
  const handleDotClick = (idx) => setCurrent(idx);

  // 計算 translateX，確保左右貼齊
  const getTranslateX = () => {
    if (realLen <= visibleCount) return 0;
    // 讓 current 盡量置中，但不超過邊界
    const centerOffset = (containerWidth - imgWidth) / 2;
    let translate = -(current * (imgWidth + gap)) + centerOffset;
    // 左邊界
    if (translate > 0) translate = 0;
    // 右邊界
    if (translate < -maxTranslate) translate = -maxTranslate;
    return translate + dragOffset;
  };

  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: imgHeight,
          mx: "auto",
          overflow: "hidden",
          borderRadius: 1,
          bgcolor: (theme) => theme.palette.gray[200],
        }}
        ref={dragRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        tabIndex={-1}
      >
        <Box
          sx={{
            display: "flex",
            height: imgHeight,
            transition: isDragging.current
              ? "none"
              : "transform 0.4s cubic-bezier(.4,0,.2,1)",
            transform: `translateX(${getTranslateX()}px)`,
            gap: `${gap}px`,
            willChange: "transform",
          }}
        >
          {images.map((url, idx) => (
            <Box
              key={idx}
              component="img"
              src={url}
              sx={{
                width: imgWidth,
                height: imgHeight,
                objectFit: "cover",
                borderRadius: 1,
                flexShrink: 0,
                userSelect: "none",
                pointerEvents: "none",
              }}
              alt="carousel-img"
              draggable={false}
            />
          ))}
        </Box>
      </Box>
      {/* Dots區塊，正常文流，與圖片間距10px */}
      {showDots && (
        <Box
          sx={{
            mt: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {images.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => handleDotClick(idx)}
              sx={{
                width: idx === current ? 24 : 6,
                height: 6,
                borderRadius: 3,
                bgcolor:
                  idx === current
                    ? (theme) => theme.palette.orange[700]
                    : (theme) => theme.palette.gray[500],
                cursor: "pointer",
                transition: "background 0.2s, width 0.2s",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Carousel;
