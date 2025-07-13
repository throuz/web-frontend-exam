import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";
import bgImg from "../images/background.jpg";
import characterWhiteImg from "../images/character-white.png";
import characterImg from "../images/character.png";
import leftEyeImg from "../images/left-eye.png";
import rightEyeImg from "../images/right-eye.png";
import logoImg from "../images/logo.png";

const HeroSection = () => {
  const heroRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });
  const EYE_MOVE = { x: 4, y: 4 };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (mouseX - cx) / (rect.width / 2);
      const ny = (mouseY - cy) / (rect.height / 2);
      setEyeOffset({
        left: {
          x: Math.max(-1, Math.min(1, nx)) * EYE_MOVE.x,
          y: Math.max(-1, Math.min(1, ny)) * EYE_MOVE.y,
        },
        right: {
          x: Math.max(-1, Math.min(1, nx)) * EYE_MOVE.x,
          y: Math.max(-1, Math.min(1, ny)) * EYE_MOVE.y,
        },
      });
    };
    const handleMouseLeave = () => {
      setEyeOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [EYE_MOVE.x, EYE_MOVE.y]);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 238, md: 823 },
        overflow: "hidden",
      }}
    >
      {/* background.jpg */}
      <Box
        component="img"
        src={bgImg}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "right bottom",
          zIndex: 1,
        }}
      />
      {/* character-white.png */}
      <Box
        component="img"
        src={characterWhiteImg}
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "100%",
          zIndex: 2,
        }}
      />
      {/* character.png */}
      <Box
        component="img"
        src={characterImg}
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "100%",
          zIndex: 4,
        }}
      />
      {/* left-eye.png */}
      <Box
        component="img"
        src={leftEyeImg}
        sx={{
          position: "absolute",
          top: { xs: 88, md: 304 },
          left: { xs: 166, md: 582.04 },
          width: { xs: 15, md: 44 },
          zIndex: 3,
          transform: `translate(${eyeOffset.left.x}px, ${eyeOffset.left.y}px)`,
        }}
      />
      {/* right-eye.png */}
      <Box
        component="img"
        src={rightEyeImg}
        sx={{
          position: "absolute",
          top: { xs: 87, md: 300 },
          left: { xs: 210, md: 729 },
          width: { xs: 12, md: 40 },
          zIndex: 3,
          transform: `translate(${eyeOffset.right.x}px, ${eyeOffset.right.y}px)`,
        }}
      />
      {/* logo.png */}
      <Box
        component="img"
        src={logoImg}
        sx={{
          position: "absolute",
          top: { xs: 133, md: 350 },
          right: { xs: 11, md: 83 },
          width: { xs: 137, md: 540 },
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default HeroSection;
