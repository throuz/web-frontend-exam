import useQuery from "./useQuery";

export default function useEducationListQuery(options = {}) {
  return useQuery({ url: "/api/v1/educationLevelList", ...options });
}
