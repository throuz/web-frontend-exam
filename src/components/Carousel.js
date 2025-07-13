import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";

function Carousel({
  images = [],
  width = "100%",
  height = 150,
  autoPlay = true,
  interval = 3000,
  showDots = true,
}) {
  const [current, setCurrent] = useState(0);
  const autoPlayRef = useRef();
  const dragRef = useRef();
  const startX = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const realLen = images.length;
  const imgWidth = 250;
  const imgHeight = 150;
  const gap = 8; // px

  // 虛擬化圖片陣列（前後各補一張）
  const getVirtualPhotos = () => {
    if (realLen === 0) return [];
    if (realLen === 1) return images;
    return [images[realLen - 1], ...images, images[0]];
  };
  const virtualPhotos = getVirtualPhotos();

  // 處理無縫切換
  useEffect(() => {
    if (realLen <= 1) return;
    if (current === -1) {
      setTimeout(() => setCurrent(realLen - 1), 20);
    } else if (current === realLen) {
      setTimeout(() => setCurrent(0), 20);
    }
  }, [current, realLen]);

  // Auto play
  useEffect(() => {
    if (!autoPlay || realLen <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
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
    if (Math.abs(dragOffset) > 40 && realLen > 1) {
      if (dragOffset < 0) {
        setCurrent((prev) => prev + 1);
      } else {
        setCurrent((prev) => prev - 1);
      }
    }
    setDragOffset(0);
  };

  // Dots click
  const handleDotClick = (idx) => setCurrent(idx);

  // 計算 carousel translateX
  const getTranslateX = () => {
    if (realLen <= 1) return 0;
    // 置中顯示：外層寬度-圖片寬度/2
    const container = dragRef.current;
    const containerWidth = container ? container.offsetWidth : 0;
    const offset = (containerWidth - imgWidth) / 2;
    return -((current + 1) * (imgWidth + gap)) + offset + dragOffset;
  };

  return (
    <Box
      sx={{
        position: "relative",
        width,
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
          transition:
            isDragging.current || current === -1 || current === realLen
              ? "none"
              : "transform 0.4s cubic-bezier(.4,0,.2,1)",
          transform: `translateX(${getTranslateX()}px)`,
          gap: `${gap}px`,
        }}
      >
        {virtualPhotos.map((url, idx) => (
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
                  idx === (current < 0 ? realLen - 1 : current % realLen)
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
