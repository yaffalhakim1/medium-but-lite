import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { INewsElement } from "@/types/news-types";
import useSWR from "swr";

export const useNews = () => {
  const { data, isLoading, error, mutate } = useSWR<INewsElement[]>(
    `${BASE_URL}/news`,
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
