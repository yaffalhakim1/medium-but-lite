import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { INewsElement } from "@/types/news-types";
import useSWR from "swr";

export const useNews = (
  search?: string,
  premium?: boolean,
  // like?: number[],
  category?: string[]
) => {
  const base = `${BASE_URL}/news`;

  const url =
    premium && category
      ? `${BASE_URL}/news?q=${search}&_isPremium=${premium}&_category=${category.join(
          ","
        )}`
      : base;

  const { data, isLoading, error, mutate } = useSWR<INewsElement[]>(
    url,
    fetcher
  );

  return {
    newsList: data,
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
