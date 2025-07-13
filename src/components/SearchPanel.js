import React, { useState } from "react";
import { Box, Paper, Typography, Pagination, Grid } from "@mui/material";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";

const SearchPanel = ({
  educationOptions,
  salaryOptions,
  jobList,
  onSearch,
  total,
  page,
  onPageChange,
  searchValues,
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
        {!jobList || jobList.length === 0 ? (
          <Box
            sx={{
              minHeight: 280,
              bgcolor: (theme) => theme.palette.gray[100],
              border: (theme) => `1px solid ${theme.palette.gray[500]}`,
              borderRadius: 0.75,
              p: 3,
              display: "flex",
              flexDirection: "column",
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
        ) : (
          <>
            <Grid container spacing={2.25} mb={1.5}>
              {jobList.map((job, idx) => (
                <Grid item xs={12} md={4} key={job.id || idx}>
                  <JobCard
                    companyName={job.companyName}
                    jobTitle={job.jobTitle}
                    education={job.educationLabel || "學歷"}
                    salary={job.salaryLabel || "薪水範圍"}
                    preview={job.preview}
                  />
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(total / 6) || 1}
              page={page}
              onChange={handlePageChange}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default SearchPanel;
