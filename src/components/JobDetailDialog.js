import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import Carousel from "./Carousel";
import useJobDetailQuery from "../hooks/useJobDetailQuery";

function JobDetailDialog({ open, jobId, onClose }) {
  const { data: job, loading } = useJobDetailQuery(open ? jobId : null);

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
          <Stack spacing={2.25}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: (theme) => theme.typography.body5,
                  color: (theme) => theme.palette.gray[1000],
                }}
              >
                {job.companyName}
              </Typography>
              <Typography
                sx={{
                  fontSize: (theme) => theme.typography.body4,
                  color: (theme) => theme.palette.gray[1000],
                }}
              >
                {job.jobTitle}
              </Typography>
            </Stack>
            {/* Carousel 共用組件 */}
            <Carousel images={job.companyPhoto || []} autoPlay showDots />
            <Stack spacing={1}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: (theme) => theme.typography.body4,
                  color: (theme) => theme.palette.gray[1100],
                }}
              >
                工作內容
              </Typography>
              <Box
                sx={{
                  fontSize: (theme) => theme.typography.body3,
                  color: (theme) => theme.palette.gray[800],
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: job.description || "" }}
                />
              </Box>
            </Stack>
          </Stack>
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

export default JobDetailDialog;
