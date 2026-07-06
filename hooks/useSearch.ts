import useSWR from "swr";
import { SearchUser } from "@/model/user";

export default function useSearch(keyword: string) {
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search?keyword=${keyword}`);

  return { users, isLoading, error };
}
