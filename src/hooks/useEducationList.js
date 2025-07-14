import useQuery from "./useQuery";

export default function useEducationList(options = {}) {
  return useQuery({ url: "/api/v1/educationLevelList", ...options });
}
