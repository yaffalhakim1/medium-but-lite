import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { User } from "@/types/user-types";
import useSWR from "swr";

export const useUsers = (search?: string, premium?: boolean) => {
  const { data, isLoading, error, mutate } = useSWR<User[]>(
    `${BASE_URL}/profile?q=${search}&isPremiumUser=${premium}`,
    fetcher
  );

  return {
    users: data,
    usersLoading: isLoading,
    usersError: error,
    usersMutate: mutate,
  };
};
