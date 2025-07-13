import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import JobCard from "./JobCard";

function JobDetailDialog({ open, job, onClose }) {
  if (!job) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ fontWeight: 700, fontSize: 20, color: "gray.1100", pb: 1 }}
      >
        詳細資訊
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 1 }}>
          {job.companyName} {job.jobTitle}
        </Typography>
        {/* 圖片輪播簡化為橫向排列 */}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {(job.companyPhoto || []).slice(0, 3).map((url, idx) => (
            <Box
              key={idx}
              component="img"
              src={url}
              sx={{
                width: 120,
                height: 80,
                objectFit: "cover",
                borderRadius: 1,
              }}
              alt="公司照片"
            />
          ))}
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 0.5 }}>
            工作內容
          </Typography>
          <Box sx={{ color: "gray.900", fontSize: 15 }}>
            <div dangerouslySetInnerHTML={{ __html: job.description || "" }} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const JobListSection = ({ jobList, loading, total, page, onPageChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleDetailClick = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

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
              onDetailClick={() => handleDetailClick(job)}
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
      <JobDetailDialog open={open} job={selectedJob} onClose={handleClose} />
    </>
  );
};

export default JobListSection;
