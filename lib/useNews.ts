import { BASE_URL } from "@/config/api";
import { fetcher } from "@/config/fetcher";
import { INewsElement } from "@/types/news-types";
import useSWR from "swr";

interface NewsFilters {
  search?: string;
  premium?: boolean;
  category?: string[];
  sortByDate?: "asc" | "desc";
  page?: number;
}

export const useNews = (filters: NewsFilters) => {
  const { search, premium, category, sortByDate, page } = filters;

  let url = `${BASE_URL}/news?`;
  if (search) url += `q=${search}&`;
  if (premium) url += `isPremium=${premium}&`;
  if (category && category.length > 0) url += `category=${category.join(",")}`;
  if (sortByDate) url += `&_sort=created_at&_order=${sortByDate}`;
  if (page) url += `&_page=${page}`;

  const { data, isLoading, error, mutate } = useSWR<INewsElement[]>(
    url,
    fetcher
  );

  const resetFilters = () => {
    mutate();
  };

  return {
    newsList: data,
    newsLoading: isLoading,
    newsError: error,
    newsMutate: mutate,
    newsResetFilters: resetFilters,
  };
};

export const useNewsDetail = (id: number) => {
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
