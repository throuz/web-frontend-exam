import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";

const MainPage = () => {
  const [educationOptions, setEducationOptions] = useState([]);
  const [salaryOptions, setSalaryOptions] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let educationData = [];
    let salaryData = [];
    let jobsData = [];
    setLoading(true);
    Promise.all([
      fetch("/api/v1/educationLevelList").then((res) => res.json()),
      fetch("/api/v1/salaryLevelList").then((res) => res.json()),
      fetch("/api/v1/jobs").then((res) => res.json()),
    ])
      .then(([education, salary, jobs]) => {
        educationData = [
          { label: "不限", value: "" },
          ...education.map((item) => ({ label: item.label, value: item.id })),
        ];
        salaryData = [
          { label: "不限", value: "" },
          ...salary.map((item) => ({ label: item.label, value: item.id })),
        ];
        jobsData = jobs.data || [];

        // 建立 id->label 對照表
        const eduMap = Object.fromEntries(
          educationData
            .filter((e) => e.value !== "")
            .map((e) => [e.value, e.label])
        );
        const salMap = Object.fromEntries(
          salaryData
            .filter((s) => s.value !== "")
            .map((s) => [s.value, s.label])
        );

        // 對 jobList 做 mapping
        const mappedJobs = jobsData.map((job) => ({
          ...job,
          educationLabel: eduMap[job.educationId] || "學歷",
          salaryLabel: salMap[job.salaryId] || "薪水範圍",
        }));

        setEducationOptions(educationData);
        setSalaryOptions(salaryData);
        setJobList(mappedJobs);
      })
      .catch(() => {
        setEducationOptions([{ label: "不限", value: "" }]);
        setSalaryOptions([{ label: "不限", value: "" }]);
        setJobList([]);
      })
      .finally(() => setLoading(false));
  }, []);

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
        />
      )}
    </Box>
  );
};

export default MainPage;
