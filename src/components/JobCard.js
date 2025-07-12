import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { ReactComponent as PersonOutlineIcon } from "../icons/person-outline.svg";
import { ReactComponent as MenuBookOutlinedIcon } from "../icons/book-outline.svg";
import { ReactComponent as PaidOutlinedIcon } from "../icons/salary-range.svg";
import { useTheme } from "@mui/material/styles";

const JobCard = ({
  companyName = "弈樂科技",
  jobTitle = "前端工程師 Frontend Engineer",
  education = "學歷",
  salary = "薪水範圍",
  preview = "負責設計、開發和維護技術方案，解決複雜的問題。擁有卓越的問題解決能力和創新思維，熟練應用科技工具，確保項目高效實施。具備協作精神，致力於推動科技進步。",
  onDetailClick = () => {},
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.gray[100],
        borderRadius: "6px",
        border: `1px solid ${theme.palette.gray[500]}`,
        boxShadow: "none",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0px 0px 8px #00000059",
        },
        p: 2, // 16px
      }}
    >
      <CardContent
        sx={{
          p: 0,
          "&:last-child": {
            pb: 0,
          },
        }}
      >
        <Stack direction="column" spacing={1.25}>
          <Typography
            sx={{
              fontWeight: 700,
              color: theme.palette.gray[1000],
              fontSize: theme.typography.body5,
            }}
          >
            {companyName}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonOutlineIcon
              sx={{
                color: theme.palette.gray[800],
                fontSize: theme.typography.body2,
              }}
            />
            <Typography
              sx={{
                color: theme.palette.gray[800],
                fontSize: theme.typography.body2,
              }}
            >
              {jobTitle}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MenuBookOutlinedIcon
              sx={{
                color: theme.palette.gray[800],
                fontSize: theme.typography.body2,
              }}
            />
            <Typography
              sx={{
                color: theme.palette.gray[800],
                fontSize: theme.typography.body2,
              }}
            >
              {education}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PaidOutlinedIcon
              sx={{
                color: theme.palette.gray[800],
                fontSize: theme.typography.body2,
              }}
            />
            <Typography
              sx={{
                color: theme.palette.gray[800],
                fontSize: theme.typography.body2,
              }}
            >
              {salary}
            </Typography>
          </Stack>
          <Typography
            sx={{
              color: theme.palette.gray[1000],
              fontSize: theme.typography.body2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal",
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
                fontSize: theme.typography.body2,
                p: "0 10px",
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
        </Stack>
      </CardContent>
    </Card>
  );
};

export default JobCard;
