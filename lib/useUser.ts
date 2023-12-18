import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { User } from "@/types/user-types";
import useSWR from "swr";

interface UserFilters {
  search?: string;
  premium?: boolean;
  category?: string[];
  sortByDate?: "asc" | "desc";
}

export const useUsers = (filters: UserFilters) => {
  const { search, premium, category } = filters;

  let url = `${BASE_URL}/profile?`;
  if (search) url += `q=${search}&`;
  if (premium !== undefined) url += `isPremiumUser=${premium}&`;

  const { data, error, mutate, isLoading } = useSWR<User[]>(url, fetcher);

  return {
    users: data,
    usersLoading: isLoading,
    usersError: error,
    usersMutate: mutate,
  };
};

// use users details

export const useUser = (id: number) => {
  const { data, isLoading, error, mutate } = useSWR<User>(
    `${BASE_URL}/profile/${id}`,
    fetcher
  );

  return {
    user: data,
    userLoading: isLoading,
    userError: error,
    userMutate: mutate,
  };
};
