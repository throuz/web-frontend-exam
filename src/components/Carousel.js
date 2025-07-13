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

  // 計算同時可見圖片數
  const visibleCount = Math.max(
    1,
    Math.floor((containerWidth + gap) / (imgWidth + gap))
  );
  // 最後一頁的起始 index
  const lastPageStart = Math.max(0, realLen - visibleCount);

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

  // 計算 translateX
  const getTranslateX = () => {
    if (realLen <= visibleCount) return 0;
    // 若 current < lastPageStart，左對齊；否則靠右對齊
    const leftIndex = current < lastPageStart ? current : lastPageStart;
    return -(leftIndex * (imgWidth + gap)) + dragOffset;
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: imgHeight,
        mb: 2,
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
      {/* Dots */}
      {showDots && (
        <Box
          sx={{
            position: "absolute",
            bottom: 4,
            left: 0,
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
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor:
                  idx === current
                    ? (theme) => theme.palette.orange[600]
                    : (theme) => theme.palette.gray[400],
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Carousel;
