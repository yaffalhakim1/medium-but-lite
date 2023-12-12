import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { ITransaction } from "@/types/trans-types";
import useSWR from "swr";

export const useTransaction = (search?: string) => {
  const { data, error, mutate, isLoading } = useSWR<ITransaction[]>(
    `${BASE_URL}/transaction?search=${search}`,
    fetcher
  );

  return {
    transaction: data,
    transactionLoading: isLoading,
    transactionError: error,
    transactionMutate: mutate,
  };
};
