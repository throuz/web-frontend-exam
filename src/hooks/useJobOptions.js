import { useMemo } from "react";

export default function useJobOptions(educationData, salaryData) {
  const educationOptions = useMemo(
    () =>
      educationData
        ? [
            { label: "不限", value: "" },
            ...educationData.map((item) => ({
              label: item.label,
              value: item.id,
            })),
          ]
        : [],
    [educationData]
  );
  const salaryOptions = useMemo(
    () =>
      salaryData
        ? [
            { label: "不限", value: "" },
            ...salaryData.map((item) => ({
              label: item.label,
              value: item.id,
            })),
          ]
        : [],
    [salaryData]
  );
  return { educationOptions, salaryOptions };
}
