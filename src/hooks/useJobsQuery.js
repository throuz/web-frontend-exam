import useQuery from "./useQuery";

export default function useJobsQuery(params, options = {}) {
  return useQuery({ url: "/api/v1/jobs", params, ...options });
}
