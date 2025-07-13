import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import SearchPanel from "./SearchPanel";

const MainPage = () => {
  const [educationOptions, setEducationOptions] = useState([]);
  const [salaryOptions, setSalaryOptions] = useState([]);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    fetch("/api/v1/educationLevelList")
      .then((res) => res.json())
      .then((data) =>
        setEducationOptions([
          { label: "不限", value: "" },
          ...data.map((item) => ({ label: item.label, value: item.id })),
        ])
      )
      .catch(() => setEducationOptions([{ label: "不限", value: "" }]));
    fetch("/api/v1/salaryLevelList")
      .then((res) => res.json())
      .then((data) =>
        setSalaryOptions([
          { label: "不限", value: "" },
          ...data.map((item) => ({ label: item.label, value: item.id })),
        ])
      )
      .catch(() => setSalaryOptions([{ label: "不限", value: "" }]));
    fetch("/api/v1/jobs")
      .then((res) => res.json())
      .then((data) => setJobList(data.data || []));
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <HeroSection />
      <SearchPanel
        educationOptions={educationOptions}
        salaryOptions={salaryOptions}
        jobList={jobList}
      />
    </Box>
  );
};

export default MainPage;
