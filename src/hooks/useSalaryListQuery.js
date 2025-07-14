import useQuery from "./useQuery";

export default function useSalaryListQuery(options = {}) {
  return useQuery({ url: "/api/v1/salaryLevelList", ...options });
}
