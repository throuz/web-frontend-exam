import { useMemo } from "react";

export default function useJobListMapping(
  jobsData,
  educationOptions,
  salaryOptions
) {
  const eduMap = useMemo(
    () =>
      Object.fromEntries(
        (educationOptions || [])
          .filter((e) => e.value !== "")
          .map((e) => [e.value, e.label])
      ),
    [educationOptions]
  );
  const salMap = useMemo(
    () =>
      Object.fromEntries(
        (salaryOptions || [])
          .filter((s) => s.value !== "")
          .map((s) => [s.value, s.label])
      ),
    [salaryOptions]
  );
  const jobList = useMemo(
    () =>
      (jobsData?.data || []).map((job) => ({
        ...job,
        educationLabel: eduMap[job.educationId] || "學歷",
        salaryLabel: salMap[job.salaryId] || "薪水範圍",
      })),
    [jobsData, eduMap, salMap]
  );
  const total = jobsData?.total || 0;
  return { jobList, total };
}
