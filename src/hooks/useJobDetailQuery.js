import useQuery from "./useQuery";

export default function useJobDetailQuery(id, options = {}) {
  return useQuery({ url: `/api/v1/jobs/${id}`, ...options, enabled: !!id });
}
