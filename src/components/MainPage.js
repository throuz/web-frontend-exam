import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";
import useEducationList from "../hooks/useEducationList";
import useSalaryList from "../hooks/useSalaryList";
import useJobs from "../hooks/useJobs";

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

  // hooks 取得資料
  const {
    data: educationData,
    loading: educationLoading,
    error: educationError,
  } = useEducationList();
  const {
    data: salaryData,
    loading: salaryLoading,
    error: salaryError,
  } = useSalaryList();
  const {
    data: jobsData,
    loading: jobsLoading,
    error: jobsError,
  } = useJobs({
    company_name: searchValues.companyName,
    education_level: searchValues.educationLevel,
    salary_level: searchValues.salaryLevel,
    page,
    pre_page: window.innerWidth < 600 ? 4 : 6,
  });

  // 下拉選單 options
  const educationOptions = educationData
    ? [
        { label: "不限", value: "" },
        ...educationData.map((item) => ({ label: item.label, value: item.id })),
      ]
    : [];
  const salaryOptions = salaryData
    ? [
        { label: "不限", value: "" },
        ...salaryData.map((item) => ({ label: item.label, value: item.id })),
      ]
    : [];

  // 職缺列表 mapping
  const eduMap = Object.fromEntries(
    educationOptions
      .filter((e) => e.value !== "")
      .map((e) => [e.value, e.label])
  );
  const salMap = Object.fromEntries(
    salaryOptions.filter((s) => s.value !== "").map((s) => [s.value, s.label])
  );
  const jobList = (jobsData?.data || []).map((job) => ({
    ...job,
    educationLabel: eduMap[job.educationId] || "學歷",
    salaryLabel: salMap[job.salaryId] || "薪水範圍",
  }));
  const total = jobsData?.total || 0;

  // loading 狀態
  const loading = educationLoading || salaryLoading || jobsLoading;

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
        educationOptions={educationOptions}
        salaryOptions={salaryOptions}
        jobList={jobList}
        onSearch={handleSearch}
        total={total}
        page={page}
        onPageChange={handlePageChange}
        searchValues={searchValues}
        loading={loading}
      />
    </Box>
  );
};

export default MainPage;
