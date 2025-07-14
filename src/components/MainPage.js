import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";

const MainPage = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <HeroSection />
      <SearchPanel />
    </Box>
  );
};

export default MainPage;
