import React from "react";
import { Stack, Box, Typography } from "@mui/material";

const SearchSectionTitle = () => (
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
);

export default SearchSectionTitle;
