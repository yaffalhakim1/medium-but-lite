import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { User } from "@/types/user-types";
import useSWR from "swr";

export const useUsers = () => {
  const { data, isLoading, error, mutate } = useSWR<User[]>(
    `${BASE_URL}/profile`,
    fetcher
  );

  return {
    users: data,
    usersLoading: isLoading,
    usersError: error,
    usersMutate: mutate,
  };
};
