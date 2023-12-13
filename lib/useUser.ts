import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { User } from "@/types/user-types";
import useSWR from "swr";

export const useUsers = (search?: string, premium?: boolean) => {
  const url =
    premium !== undefined
      ? `${BASE_URL}/profile?q=${search}&isPremiumUser=${premium}`
      : `${BASE_URL}/profile?q=${search}`;

  const { data, isLoading, error, mutate } = useSWR<User[]>(url, fetcher);

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
