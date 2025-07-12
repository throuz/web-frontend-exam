import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { useTheme } from "@mui/material/styles";

const JobCard = ({
  companyName = "弈樂科技",
  jobTitle = "前端工程師 Frontend Engineer",
  education = "學歷",
  salary = "薪水範圍",
  preview = "負責設計、開發和維護技術方案，解決複雜的問題。擁有卓越的問題解決能力和創新思維，熟練應用科技工具，確保項目高效…",
  onDetailClick = () => {},
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: "16px",
        border: `1px solid ${theme.palette.gray[400]}`,
        boxShadow: "none",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 4px 24px 0 rgba(51,51,51,0.12)",
        },
        p: { xs: 2, sm: 3 },
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: theme.palette.gray[1100],
            fontSize: theme.typography.body6,
            mb: 1,
          }}
        >
          {companyName}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
          <PersonOutlineIcon
            sx={{
              color: theme.palette.gray[700],
              fontSize: theme.typography.body4,
            }}
          />
          <Typography
            sx={{
              color: theme.palette.gray[700],
              fontSize: theme.typography.body3,
            }}
          >
            {jobTitle}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
          <MenuBookOutlinedIcon
            sx={{
              color: theme.palette.gray[700],
              fontSize: theme.typography.body4,
            }}
          />
          <Typography
            sx={{
              color: theme.palette.gray[700],
              fontSize: theme.typography.body3,
            }}
          >
            {education}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <PaidOutlinedIcon
            sx={{
              color: theme.palette.gray[1100],
              fontSize: theme.typography.body4,
              fontWeight: 700,
            }}
          />
          <Typography
            sx={{
              color: theme.palette.gray[1100],
              fontWeight: 700,
              fontSize: theme.typography.body3,
            }}
          >
            {salary}
          </Typography>
        </Stack>
        <Typography
          sx={{
            color: theme.palette.gray[1100],
            fontSize: theme.typography.body3,
            mb: 2,
            minHeight: "3.5em",
            lineHeight: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {preview}
        </Typography>
        <Box textAlign="center">
          <Button
            variant="text"
            sx={{
              color: theme.palette.orange[700],
              fontWeight: 700,
              fontSize: theme.typography.body3,
              p: 0,
              minWidth: 0,
              "&:hover": {
                background: "none",
                color: theme.palette.orange[800],
              },
            }}
            onClick={onDetailClick}
          >
            查看細節
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
