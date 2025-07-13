import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Autocomplete,
} from "@mui/material";
import bgImg from "../images/background.jpg";
import characterWhiteImg from "../images/character-white.png";
import characterImg from "../images/character.png";
import leftEyeImg from "../images/left-eye.png";
import rightEyeImg from "../images/right-eye.png";
import logoImg from "../images/logo.png";

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
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 238, md: 823 },
          overflow: "hidden",
        }}
      >
        {/* background.jpg */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            // backgroundImage: `url(${bgImg})`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            zIndex: 1,
          }}
          component="img"
          src={bgImg}
        />
        {/* character-white.png */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "100%",
            // backgroundImage: `url(${characterWhiteImg})`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "contain",
            // backgroundPosition: "left bottom",
            zIndex: 2,
          }}
          component="img"
          src={characterWhiteImg}
        />
        {/* character.png */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "100%",
            // backgroundImage: `url(${characterImg})`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "contain",
            // backgroundPosition: "left bottom",
            zIndex: 4,
          }}
          component="img"
          src={characterImg}
        />
        {/* left-eye.png */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 88, md: 307.82 },
            left: { xs: 166, md: 582.04 },
            width: { xs: 15, md: 44 },
            // backgroundImage: `url(${leftEyeImg})`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "contain",
            zIndex: 3,
          }}
          component="img"
          src={leftEyeImg}
        />
        {/* right-eye.png */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 87, md: 302 },
            left: { xs: 210, md: 729 },
            width: { xs: 12, md: 40 },
            // backgroundImage: `url(${rightEyeImg})`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "contain",
            zIndex: 3,
          }}
          component="img"
          src={rightEyeImg}
        />
        {/* logo.png */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 133, md: 350 },
            left: { xs: 227, md: 817 },
            width: { xs: 137, md: 540 },
            // backgroundImage: `url(${logoImg})`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "contain",
            // backgroundPosition: "right top",
            zIndex: 2,
          }}
          component="img"
          src={logoImg}
        />
      </Box>
      {/* Main Card 浮在圖片上方 */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: { xs: 238, md: 700 },
          transform: "translateX(-50%)",
          width: "100%",
          zIndex: 20,
          px: 2,
        }}
      >
        <Paper elevation={1} sx={{ borderRadius: 2, p: 3 }}>
          {/* Search Form */}
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                bgcolor: (theme) => theme.palette.orange[700],
                borderRadius: "50%",
                mr: 1,
                display: "inline-block",
              }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: (theme) => theme.typography.body4,
                color: (theme) => theme.palette.gray[1100],
              }}
            >
              適合前端工程師的好工作
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            mb={2}
            alignItems="stretch"
          >
            <Box sx={{ flex: 2 }}>
              <TextField
                fullWidth
                placeholder="請輸入公司名稱"
                label="公司名稱／關鍵字"
                variant="outlined"
                sx={{ bgcolor: (theme) => theme.palette.gray[100], height: 56 }}
                InputProps={{ sx: { height: 56 } }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Autocomplete
                disablePortal
                options={educationOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="教育程度"
                    sx={{ height: 56 }}
                    InputProps={{ ...params.InputProps, sx: { height: 56 } }}
                  />
                )}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Autocomplete
                disablePortal
                options={salaryOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="薪水範圍"
                    sx={{ height: 56 }}
                    InputProps={{ ...params.InputProps, sx: { height: 56 } }}
                  />
                )}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "stretch" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: (theme) => theme.palette.gray[500],
                  color: (theme) => theme.palette.gray[100],
                  fontWeight: 700,
                  fontSize: (theme) => theme.typography.body3,
                  borderRadius: 1,
                  boxShadow: "none",
                  height: 56,
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.gray[600],
                  },
                }}
                fullWidth
              >
                條件搜尋
              </Button>
            </Box>
          </Stack>
          {/* Data Section */}
          <Box
            sx={{
              minHeight: 280,
              bgcolor: (theme) => theme.palette.gray[100],
              borderRadius: 1,
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.gray[700],
                fontSize: (theme) => theme.typography.body3,
              }}
            >
              無資料
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MainPage;
