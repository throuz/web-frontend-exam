import useQuery from "./useQuery";

export default function useSalaryList(options = {}) {
  return useQuery({ url: "/api/v1/salaryLevelList", ...options });
}
