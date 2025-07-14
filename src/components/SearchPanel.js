import React from "react";
import { Box, Paper } from "@mui/material";
import SearchForm from "./SearchForm";
import SearchSectionTitle from "./SearchSectionTitle";
import JobListSection from "./JobListSection";
import useEducationList from "../hooks/useEducationList";
import useSalaryList from "../hooks/useSalaryList";
import useJobs from "../hooks/useJobs";
import useJobOptions from "../hooks/useJobOptions";
import useJobListMapping from "../hooks/useJobListMapping";
import useQueryParams from "../hooks/useQueryParams";

const SearchPanel = () => {
  // 直接在內部管理查詢參數
  const [query, setQuery] = useQueryParams({
    companyName: "",
    educationLevel: "",
    salaryLevel: "",
    page: 1,
  });
  const page = query.page;

  // hooks 取得資料
  const { data: educationData, loading: educationLoading } = useEducationList();
  const { data: salaryData, loading: salaryLoading } = useSalaryList();
  // 直接用 query 查詢
  const { data: jobsData, loading: jobsLoading } = useJobs({
    company_name: query.companyName,
    education_level: query.educationLevel,
    salary_level: query.salaryLevel,
    page,
    pre_page: window.innerWidth < 600 ? 4 : 6,
  });

  // 使用 custom hook 處理 options
  const { educationOptions, salaryOptions } = useJobOptions(
    educationData,
    salaryData
  );
  // 使用 custom hook 處理 jobList mapping
  const { jobList, total } = useJobListMapping(
    jobsData,
    educationOptions,
    salaryOptions
  );
  const loading = educationLoading || salaryLoading || jobsLoading;

  // 條件搜尋
  const handleSearch = (values) => {
    setQuery({ ...values, page: 1 });
  };

  // 分頁切換
  const handlePageChange = (_, value) => {
    setQuery({ ...query, page: value });
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
        px: { xs: 0, md: 3.5 },
        pb: { xs: 0, md: 3.5 },
        boxSizing: "border-box",
      }}
    >
      <Paper elevation={1} sx={{ borderRadius: { xs: 0, md: 2 }, p: 3 }}>
        {/* Search Title (手機與桌機都顯示) */}
        <SearchSectionTitle />
        {/* Search Form (桌機顯示) */}
        <SearchForm
          companyName={query.companyName}
          educationLevel={query.educationLevel}
          salaryLevel={query.salaryLevel}
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
