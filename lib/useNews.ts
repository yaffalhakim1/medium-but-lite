import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { INewsElement } from "@/types/news-types";
import useSWR from "swr";

export const useNews = (
  search?: string,
  premium?: boolean,
  page?: number,
  size?: number
) => {
  const { data, isLoading, error, mutate } = useSWR<INewsElement[]>(
    `${BASE_URL}/news?q=${search}`,
    fetcher
  );

  return {
    news: data,
    newsLoading: isLoading,
    newsError: error,
    newsMutate: mutate,
  };
};

export const useNewsDetail = (id: string) => {
  const { data, isLoading, error, mutate } = useSWR<INewsElement>(
    `${BASE_URL}/news/${id}`,
    fetcher
  );

  return {
    newsDetail: data,
    newsDetailLoading: isLoading,
    newsDetailError: error,
    newsDetailMutate: mutate,
  };
};
