import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import SearchForm from "./SearchForm";
import SearchSectionTitle from "./SearchSectionTitle";
import JobListSection from "./JobListSection";
import useEducationList from "../hooks/useEducationList";
import useSalaryList from "../hooks/useSalaryList";
import useJobs from "../hooks/useJobs";

const SearchPanel = ({ onSearch, page, onPageChange, searchValues }) => {
  // 受控表單狀態
  const [companyName, setCompanyName] = useState(
    searchValues?.companyName || ""
  );
  const [educationLevel, setEducationLevel] = useState(
    searchValues?.educationLevel || ""
  );
  const [salaryLevel, setSalaryLevel] = useState(
    searchValues?.salaryLevel || ""
  );

  // 當 searchValues 變動時同步表單狀態（如 query string 變動）
  useEffect(() => {
    setCompanyName(searchValues?.companyName || "");
    setEducationLevel(searchValues?.educationLevel || "");
    setSalaryLevel(searchValues?.salaryLevel || "");
  }, [searchValues]);

  // hooks 取得資料
  const { data: educationData, loading: educationLoading } = useEducationList();
  const { data: salaryData, loading: salaryLoading } = useSalaryList();
  const { data: jobsData, loading: jobsLoading } = useJobs({
    company_name: companyName,
    education_level: educationLevel,
    salary_level: salaryLevel,
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
  const loading = educationLoading || salaryLoading || jobsLoading;

  // 條件搜尋
  const handleSearch = () => {
    onSearch &&
      onSearch({
        companyName,
        educationLevel,
        salaryLevel,
        page: 1,
      });
  };

  // 分頁切換
  const handlePageChange = (_, value) => {
    onPageChange && onPageChange(value);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: { xs: 238, md: 700 },
        transform: "translateX(-50%)",
        width: "100%",
        zIndex: 20,
        px: 3.5,
        pb: 3.5,
        boxSizing: "border-box",
      }}
    >
      <Paper elevation={1} sx={{ borderRadius: 2, p: 3 }}>
        {/* Search Title (手機與桌機都顯示) */}
        <SearchSectionTitle />
        {/* Search Form (桌機顯示) */}
        <SearchForm
          companyName={companyName}
          setCompanyName={setCompanyName}
          educationLevel={educationLevel}
          setEducationLevel={setEducationLevel}
          salaryLevel={salaryLevel}
          setSalaryLevel={setSalaryLevel}
          educationOptions={educationOptions}
          salaryOptions={salaryOptions}
          onSearch={handleSearch}
        />
        {/* Data Section */}
        <JobListSection
          jobList={jobList}
          loading={loading}
          total={total}
          page={page}
          onPageChange={handlePageChange}
        />
      </Paper>
    </Box>
  );
};

export default SearchPanel;
