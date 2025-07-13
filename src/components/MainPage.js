import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";

const educationOptions = [
  { label: "不限", value: "" },
  { label: "國小", value: "1" },
  { label: "國中", value: "2" },
  { label: "高中", value: "3" },
  { label: "大學", value: "4" },
  { label: "碩士", value: "5" },
  { label: "博士", value: "6" },
];
const salaryOptions = [
  { label: "不限", value: "" },
  { label: "待遇面議", value: "1" },
  { label: "月薪 40,000 ~ 60,000 元", value: "2" },
  { label: "月薪 70,000 ~ 10,000 元", value: "3" },
  { label: "年薪 800,000 ~ 1,000,000 元", value: "4" },
  { label: "年薪 800,000 ~ 1,500,000 元", value: "5" },
  { label: "年薪 1,500,000 ~ 2,000,000 元", value: "6" },
  { label: "年薪 2,000,000 ~ 2,500,000 元", value: "7" },
];

const MainPage = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <HeroSection />
      <SearchPanel
        educationOptions={educationOptions}
        salaryOptions={salaryOptions}
      />
    </Box>
  );
};

export default MainPage;
