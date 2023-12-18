import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { ITransaction } from "@/types/trans-types";
import useSWR from "swr";

export const useTransaction = (search?: string) => {
  const { data, error, mutate, isLoading } = useSWR<ITransaction[]>(
    `${BASE_URL}/transactions`,
    fetcher
  );

  return {
    transaction: data,
    transactionLoading: isLoading,
    transactionError: error,
    transactionMutate: mutate,
  };
};

export const useTransactionById = (id: number) => {
  const { data, error, mutate, isLoading } = useSWR<ITransaction>(
    `${BASE_URL}/transactions/${id}`,
    fetcher
  );

  return {
    transaction: data,
    transactionLoading: isLoading,
    transactionError: error,
    transactionMutate: mutate,
  };
};
