import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";
import useQueryParams from "../hooks/useQueryParams";

const MainPage = () => {
  // 使用 useQueryParams 管理 query string 狀態
  const [query, setQuery] = useQueryParams({
    companyName: "",
    educationLevel: "",
    salaryLevel: "",
    page: 1,
  });

  // 搜尋事件
  const handleSearch = (values) => {
    setQuery({ ...values, page: 1 });
  };

  // 分頁事件
  const handlePageChange = (newPage) => {
    setQuery({ page: newPage });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <HeroSection />
      <SearchPanel
        page={query.page}
        searchValues={{
          companyName: query.companyName,
          educationLevel: query.educationLevel,
          salaryLevel: query.salaryLevel,
        }}
        setQuery={setQuery}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default MainPage;
