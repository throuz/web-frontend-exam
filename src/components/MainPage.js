import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    companyName: params.get("companyName") || "",
    educationLevel: params.get("educationLevel") || "",
    salaryLevel: params.get("salaryLevel") || "",
    page: parseInt(params.get("page"), 10) || 1,
  };
}

function setQueryParams({ companyName, educationLevel, salaryLevel, page }) {
  const params = new URLSearchParams();
  if (companyName) params.set("companyName", companyName);
  if (educationLevel) params.set("educationLevel", educationLevel);
  if (salaryLevel) params.set("salaryLevel", salaryLevel);
  if (page && page !== 1) params.set("page", page);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

const MainPage = () => {
  // 讀取 query string 作為初始值
  const initialQuery = getQueryParams();
  const [page, setPage] = useState(initialQuery.page);
  const [searchValues, setSearchValues] = useState({
    companyName: initialQuery.companyName,
    educationLevel: initialQuery.educationLevel,
    salaryLevel: initialQuery.salaryLevel,
  });

  // 監聽搜尋條件/分頁變動時，同步 query string
  useEffect(() => {
    setQueryParams({ ...searchValues, page });
    // eslint-disable-next-line
  }, [page, searchValues]);

  // 搜尋事件
  const handleSearch = (values) => {
    setSearchValues(values);
    setPage(1);
  };

  // 分頁事件
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <HeroSection />
      <SearchPanel
        page={page}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        searchValues={searchValues}
      />
    </Box>
  );
};

export default MainPage;
