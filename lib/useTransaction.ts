import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { ITransaction } from "@/types/trans-types";
import { User } from "@/types/user-types";
import useSWR from "swr";

export const useTransaction = (search?: string) => {
  const { data, error, mutate, isLoading } = useSWR<User[]>(
    `${BASE_URL}/profile`,
    fetcher
  );

  return {
    transaction: data,
    transactionLoading: isLoading,
    transactionError: error,
    transactionMutate: mutate,
  };
};
