import React from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  CircularProgress,
} from "@mui/material";
import JobCard from "./JobCard";

const JobListSection = ({ jobList, loading, total, page, onPageChange }) => {
  if (loading) {
    return (
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
        <CircularProgress color="warning" />
      </Box>
    );
  }
  if (!jobList || jobList.length === 0) {
    return (
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
    );
  }
  return (
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
        onChange={onPageChange}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </>
  );
};

export default JobListSection;
