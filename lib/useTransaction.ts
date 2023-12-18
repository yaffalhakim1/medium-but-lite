import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { ITransaction } from "@/types/trans-types";
import useSWR from "swr";

interface TransactionFilters {
  search?: string;
  premium?: "processed" | "success" | "cancelled";
  category?: string[];
  sortByDate?: "asc" | "desc";
}

export const useTransaction = (filters: TransactionFilters) => {
  const { search, premium, category, sortByDate } = filters;

  let url = `${BASE_URL}/transactions?`;
  if (search) url += `q=${search}&`;
  if (premium !== undefined) url += `status=${premium}&`;
  if (sortByDate) url += `&_sort=trans_date&_order=${sortByDate}`;

  const { data, error, mutate, isLoading } = useSWR<ITransaction[]>(
    url,
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

// export const useTransactionForAdmin(search? :string) => {
//   const { data, error, mutate, isLoading } = useSWR<ITransaction[]>(
//     `${BASE_URL}/`,
//     fetcher
//   );

//   return {
//     transaction: data,
//     transactionLoading: isLoading,
//     transactionError: error,
//     transactionMutate: mutate,
//   };
// }
