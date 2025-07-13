import React, { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Pagination,
  Grid,
} from "@mui/material";
import JobCard from "./JobCard";

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
        <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
          <Box
            component="span"
            sx={{
              width: 4,
              height: 16,
              bgcolor: (theme) => theme.palette.orange[700],
              borderRadius: 4,
            }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: (theme) => theme.typography.body5,
              color: (theme) => theme.palette.gray[1000],
            }}
          >
            適合前端工程師的好工作
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.25}
          mb={2.5}
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
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Autocomplete
              disablePortal
              options={educationOptions}
              value={
                educationOptions.find((opt) => opt.value === educationLevel) ||
                null
              }
              onChange={(_, val) => setEducationLevel(val?.value || "")}
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
              value={
                salaryOptions.find((opt) => opt.value === salaryLevel) || null
              }
              onChange={(_, val) => setSalaryLevel(val?.value || "")}
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
                bgcolor: (theme) => theme.palette.gray[700],
                color: (theme) => theme.palette.gray[100],
                fontWeight: 700,
                fontSize: (theme) => theme.typography.body3,
                borderRadius: 0.5,
                boxShadow: "none",
                height: 56,
                "&:hover": {
                  bgcolor: (theme) => theme.palette.gray[600],
                },
              }}
              fullWidth
              onClick={handleSearch}
            >
              條件搜尋
            </Button>
          </Box>
        </Stack>
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
