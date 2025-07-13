import React, { useState, useEffect, useRef } from "react";
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

function JobDetailDialog({ open, jobId, onClose }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  // Carousel state
  const [current, setCurrent] = useState(0);
  const autoPlayRef = useRef();
  const dragRef = useRef();
  const startX = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Reset carousel when job changes
  useEffect(() => {
    setCurrent(0);
    setDragOffset(0);
  }, [job]);

  // Fetch job detail
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

  // Auto play
  useEffect(() => {
    if (!job || !job.companyPhoto || job.companyPhoto.length <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % job.companyPhoto.length);
    }, 3000);
    return () => clearInterval(autoPlayRef.current);
  }, [job]);

  // Drag/Swipe handlers
  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };
  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    setDragOffset(x - startX.current);
  };
  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(dragOffset) > 40 && job && job.companyPhoto.length > 1) {
      if (dragOffset < 0) {
        setCurrent((prev) => (prev + 1) % job.companyPhoto.length);
      } else {
        setCurrent(
          (prev) =>
            (prev - 1 + job.companyPhoto.length) % job.companyPhoto.length
        );
      }
    }
    setDragOffset(0);
  };

  // Dots click
  const handleDotClick = (idx) => setCurrent(idx);

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
            {/* Carousel Start */}
            <Box
              sx={{
                position: "relative",
                width: 370,
                height: 80,
                mb: 2,
                mx: "auto",
                overflow: "hidden",
                borderRadius: 1,
                bgcolor: (theme) => theme.palette.gray[200],
              }}
              ref={dragRef}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              tabIndex={-1}
            >
              <Box
                sx={{
                  display: "flex",
                  height: 80,
                  transition: isDragging.current
                    ? "none"
                    : "transform 0.4s cubic-bezier(.4,0,.2,1)",
                  transform: `translateX(calc(${
                    -current * 120 + dragOffset
                  }px))`,
                }}
              >
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
                      flexShrink: 0,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                    alt="公司照片"
                    draggable={false}
                  />
                ))}
              </Box>
              {/* Dots */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 4,
                  left: 0,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {(job.companyPhoto || []).map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor:
                        idx === current
                          ? (theme) => theme.palette.orange[600]
                          : (theme) => theme.palette.gray[400],
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  />
                ))}
              </Box>
            </Box>
            {/* Carousel End */}
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
