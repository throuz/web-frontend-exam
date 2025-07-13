import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    companyName: params.get("companyName") || "",
    educationLevel: params.get("educationLevel") || "",
    salaryLevel: params.get("salaryLevel") || "",
    page: parseInt(params.get("page"), 10) || 1,
  };
}

function setQueryParams({ companyName, educationLevel, salaryLevel, page }) {
  const params = new URLSearchParams();
  if (companyName) params.set("companyName", companyName);
  if (educationLevel) params.set("educationLevel", educationLevel);
  if (salaryLevel) params.set("salaryLevel", salaryLevel);
  if (page && page !== 1) params.set("page", page);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

const MainPage = () => {
  const [educationOptions, setEducationOptions] = useState([]);
  const [salaryOptions, setSalaryOptions] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // 讀取 query string 作為初始值
  const initialQuery = getQueryParams();
  const [page, setPage] = useState(initialQuery.page);
  const [searchValues, setSearchValues] = useState({
    companyName: initialQuery.companyName,
    educationLevel: initialQuery.educationLevel,
    salaryLevel: initialQuery.salaryLevel,
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

  // 監聽搜尋條件/分頁變動時，同步 query string 並取得資料
  useEffect(() => {
    setQueryParams({ ...searchValues, page });
    fetchJobs({ page });
    // eslint-disable-next-line
  }, [educationOptions, salaryOptions, page, searchValues]);

  // 搜尋事件
  const handleSearch = (values) => {
    setSearchValues(values);
    setPage(1);
    // fetchJobs({ ...values, page: 1 }); // 由 useEffect 處理
  };

  // 分頁事件
  const handlePageChange = (newPage) => {
    setPage(newPage);
    // fetchJobs({ page: newPage }); // 由 useEffect 處理
  };

  return (
    <Box sx={{ position: "relative" }}>
      <HeroSection />
      <SearchPanel
        educationOptions={educationOptions}
        salaryOptions={salaryOptions}
        jobList={jobList}
        onSearch={handleSearch}
        total={total}
        page={page}
        onPageChange={handlePageChange}
        searchValues={searchValues}
        loading={loading}
      />
    </Box>
  );
};

export default MainPage;
