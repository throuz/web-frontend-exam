import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import SearchForm from "./SearchForm";
import JobListSection from "./JobListSection";

const SearchPanel = ({
  educationOptions,
  salaryOptions,
  jobList,
  onSearch,
  total,
  page,
  onPageChange,
  searchValues,
  loading,
}) => {
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
        {/* Search Form */}
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
