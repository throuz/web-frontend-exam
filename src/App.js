import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainPage from "./components/MainPage";

const theme = createTheme({
  palette: {
    red: {
      100: "#FBEFEC",
      200: "#F7DEDA",
      300: "#F3CEC7",
      400: "#EFBDB5",
      500: "#E89D8F",
      600: "#E07C6A",
      700: "#D85B45",
      800: "#B24A38",
      900: "#8C3A2B",
      1000: "#7F3224",
      1100: "#702B1F",
      1200: "#612419",
      1300: "#521D14",
      1400: "#43160E",
    },
    orange: {
      100: "#FBE6D1",
      200: "#FADBBE",
      300: "#F8D1AB",
      400: "#F7C798",
      500: "#F4B273",
      600: "#F19E4D",
      700: "#EE8927",
      800: "#CC7520",
      900: "#AA6119",
      1000: "#884C13",
      1100: "#77420F",
      1200: "#66380C",
      1300: "#552E08",
      1400: "#442405",
    },
    gray: {
      100: "#FFFFFF",
      200: "#F2F2F2",
      300: "#E6E6E6",
      400: "#D9D9D9",
      500: "#CCCCCC",
      600: "#B3B3B3",
      700: "#999999",
      800: "#808080",
      900: "#666666",
      1000: "#4D4D4D",
      1100: "#333333",
      1200: "#262626",
      1300: "#1A1A1A",
      1400: "#0D0D0D",
      1500: "#000000",
    },
  },
  typography: {
    fontFamily: "'Noto Sans TC', 'sans-serif'",
    body9: "2.986rem",
    body8: "2.488rem",
    body7: "2.074rem",
    body6: "1.728rem",
    body5: "1.440rem",
    body4: "1.200rem",
    body3: "1rem",
    body2: "0.833rem",
    body1: "0.694rem",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
