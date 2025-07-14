import React, { useRef } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import useEyeFollow from "../hooks/useEyeFollow";
import bgImg from "../images/background.jpg";
import characterWhiteImg from "../images/character-white.png";
import characterImg from "../images/character.png";
import leftEyeImg from "../images/left-eye.png";
import rightEyeImg from "../images/right-eye.png";
import logoImg from "../images/logo.png";

// 定義 keyframes
const logoScale = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
`;

const HeroSection = () => {
  const heroRef = useRef(null);
  const eyeOffset = useEyeFollow(heroRef, { move: { x: 4, y: 4 } });

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
          animation: `${logoScale} 1.5s infinite cubic-bezier(.4,0,.2,1)`,
        }}
      />
    </Box>
  );
};

export default HeroSection;
