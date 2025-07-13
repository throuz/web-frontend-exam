import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";

const MainPage = () => {
  const [educationOptions, setEducationOptions] = useState([]);
  const [salaryOptions, setSalaryOptions] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchValues, setSearchValues] = useState({
    companyName: "",
    educationLevel: "",
    salaryLevel: "",
  });

  // 取得下拉選單
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/v1/educationLevelList").then((res) => res.json()),
      fetch("/api/v1/salaryLevelList").then((res) => res.json()),
    ])
      .then(([education, salary]) => {
        const educationData = [
          { label: "不限", value: "" },
          ...education.map((item) => ({ label: item.label, value: item.id })),
        ];
        const salaryData = [
          { label: "不限", value: "" },
          ...salary.map((item) => ({ label: item.label, value: item.id })),
        ];
        setEducationOptions(educationData);
        setSalaryOptions(salaryData);
      })
      .finally(() => setLoading(false));
  }, []);

  // 取得職缺資料
  const fetchJobs = (params = {}) => {
    setLoading(true);
    const {
      companyName,
      educationLevel,
      salaryLevel,
      page: pageNum,
    } = {
      ...searchValues,
      ...params,
    };
    const query = [
      `pre_page=6`,
      `page=${pageNum || 1}`,
      companyName ? `company_name=${encodeURIComponent(companyName)}` : "",
      educationLevel ? `education_level=${educationLevel}` : "",
      salaryLevel ? `salary_level=${salaryLevel}` : "",
    ]
      .filter(Boolean)
      .join("&");
    fetch(`/api/v1/jobs?${query}`)
      .then((res) => res.json())
      .then((data) => {
        // mapping
        const eduMap = Object.fromEntries(
          educationOptions
            .filter((e) => e.value !== "")
            .map((e) => [e.value, e.label])
        );
        const salMap = Object.fromEntries(
          salaryOptions
            .filter((s) => s.value !== "")
            .map((s) => [s.value, s.label])
        );
        const mappedJobs = (data.data || []).map((job) => ({
          ...job,
          educationLabel: eduMap[job.educationId] || "學歷",
          salaryLabel: salMap[job.salaryId] || "薪水範圍",
        }));
        setJobList(mappedJobs);
        setTotal(data.total || 0);
      })
      .finally(() => setLoading(false));
  };

  // 初次載入與條件/分頁變動時取得資料
  useEffect(() => {
    fetchJobs({ page });
    // eslint-disable-next-line
  }, [educationOptions, salaryOptions, page, searchValues]);

  // 搜尋事件
  const handleSearch = (values) => {
    setSearchValues(values);
    setPage(1);
    fetchJobs({ ...values, page: 1 });
  };

  // 分頁事件
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchJobs({ page: newPage });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <HeroSection />
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: { xs: 238, md: 700 },
            transform: "translateX(-50%)",
            width: "100%",
            zIndex: 20,
            px: 3.5,
            pb: 3.5,
            boxSizing: "border-box",
          }}
        >
          <Paper elevation={1} sx={{ borderRadius: 2, p: 3, height: "60vh" }}>
            <CircularProgress
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Paper>
        </Box>
      ) : (
        <SearchPanel
          educationOptions={educationOptions}
          salaryOptions={salaryOptions}
          jobList={jobList}
          onSearch={handleSearch}
          total={total}
          page={page}
          onPageChange={handlePageChange}
          searchValues={searchValues}
        />
      )}
    </Box>
  );
};

export default MainPage;
