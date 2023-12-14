import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { INewsElement } from "@/types/news-types";
import useSWR from "swr";

interface NewsFilters {
  search?: string;
  premium?: boolean;
  category?: string[];
  sortByDate?: "asc" | "desc";
}

export const useNews = (filters: NewsFilters) => {
  const { search, premium, category, sortByDate } = filters;

  let url = `${BASE_URL}/news?`;
  if (search) url += `q=${search}&`;
  if (premium !== undefined) url += `isPremium=${premium}&`;
  if (category && category.length > 0) url += `category=${category.join(",")}`;
  if (sortByDate) url += `&_sort=created_at&_order=${sortByDate}`;

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
