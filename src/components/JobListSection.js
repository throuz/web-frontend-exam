import React from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <span style={{ height: 32 }} />
          <svg width="40" height="40" viewBox="0 0 40 40" style={{ margin: 8 }}>
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#FF9800"
              strokeWidth="4"
              fill="none"
              strokeDasharray="113"
              strokeDashoffset="60"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </Box>
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
