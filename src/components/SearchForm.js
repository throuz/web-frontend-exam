import React, { useState, useEffect } from "react";
import { Stack, Box, TextField, Autocomplete, Button } from "@mui/material";

const SearchForm = ({
  companyName: initialCompanyName = "",
  educationLevel: initialEducationLevel = "",
  salaryLevel: initialSalaryLevel = "",
  educationOptions,
  salaryOptions,
  onSearch,
}) => {
  // 本地 state 管理所有欄位
  const [form, setForm] = useState({
    companyName: initialCompanyName,
    educationLevel: initialEducationLevel,
    salaryLevel: initialSalaryLevel,
  });

  // 當外部初始值變動時同步本地 state
  useEffect(() => {
    setForm({
      companyName: initialCompanyName,
      educationLevel: initialEducationLevel,
      salaryLevel: initialSalaryLevel,
    });
  }, [initialCompanyName, initialEducationLevel, initialSalaryLevel]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch(form);
  };

  return (
    <Box
      component="form"
      fullWidth
      sx={{ display: { xs: "none", md: "block" } }}
      onSubmit={handleSubmit}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2.25}
        mb={2.5}
        alignItems="stretch"
      >
        <TextField
          fullWidth
          placeholder="請輸入公司名稱"
          label="公司名稱"
          variant="outlined"
          sx={{
            flex: 2,
            bgcolor: (theme) => theme.palette.gray[100],
            height: 56,
          }}
          InputProps={{ sx: { height: 56 } }}
          value={form.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
        <Autocomplete
          disablePortal
          options={educationOptions}
          value={
            educationOptions.find((opt) => opt.value === form.educationLevel) ||
            null
          }
          onChange={(_, val) =>
            handleChange("educationLevel", val?.value || "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="教育程度"
              sx={{ height: 56 }}
              InputProps={{ ...params.InputProps, sx: { height: 56 } }}
            />
          )}
          sx={{ flex: 1, width: "100%" }}
        />
        <Autocomplete
          disablePortal
          options={salaryOptions}
          value={
            salaryOptions.find((opt) => opt.value === form.salaryLevel) || null
          }
          onChange={(_, val) => handleChange("salaryLevel", val?.value || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="薪水範圍"
              sx={{ height: 56 }}
              InputProps={{ ...params.InputProps, sx: { height: 56 } }}
            />
          )}
          sx={{ flex: 1, width: "100%" }}
        />
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
            type="submit"
          >
            條件搜尋
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default SearchForm;
