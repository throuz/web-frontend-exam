import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import JobCard from "./JobCard";

function JobDetailDialog({ open, jobId, onClose }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !jobId) {
      setJob(null);
      return;
    }
    setLoading(true);
    fetch(`/api/v1/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .finally(() => setLoading(false));
  }, [open, jobId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: (theme) => theme.typography.body5,
          color: (theme) => theme.palette.gray[1000],
        }}
      >
        詳細資訊
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress color="warning" />
          </Box>
        ) : job ? (
          <>
            <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 1 }}>
              {job.companyName} {job.jobTitle}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              {(job.companyPhoto || []).map((url, idx) => (
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
                <div
                  dangerouslySetInnerHTML={{ __html: job.description || "" }}
                />
              </Box>
            </Box>
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.gray[1000],
            fontSize: (theme) => theme.typography.body3,
          }}
        >
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const JobListSection = ({ jobList, loading, total, page, onPageChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleDetailClick = (job) => {
    setSelectedJobId(job.id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedJobId(null);
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
      <JobDetailDialog
        open={open}
        jobId={selectedJobId}
        onClose={handleClose}
      />
    </>
  );
};

export default JobListSection;
