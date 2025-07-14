import useQuery from "./useQuery";

export default function useJobDetail(id, options = {}) {
  return useQuery({ url: `/api/v1/jobs/${id}`, ...options, enabled: !!id });
}
