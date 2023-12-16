/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import useSWR from "swr";
import Card from "@/components/Card";

interface NewsProps {
  news: INewsElement;
}

const NewsDetailPage = ({ news }: NewsProps) => {
  const router = useRouter();
  const user_id = Cookie.get("user_id");
  const { id } = router.query;
  const user_status = Cookie.get("user_status");
  const isLiked = news.likes?.findIndex((item) => item === Number(user_id));

  async function handleLike() {
    try {
      if (isLiked === -1) {
        const response = await fetch(`${BASE_URL}/news/${news.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            likes: [...news.likes, Number(user_id)],
          }),
        });
      } else {
        const like = news.likes?.filter((item) => item !== Number(user_id));
        const response = await fetch(`${BASE_URL}/news/${news.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likes: like,
          }),
        });
      }
    } catch (error) {
      console.log(error, "error from catch");
    }
  }

  async function handleLikeInLikedNews() {
    try {
      const response = await fetch(`${BASE_URL}/news/${news.id}`);
    } catch (error) {}
  }

  async function handleShares() {
    try {
      const res = await fetch(`${BASE_URL}/news/${news.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shares: news.shares + 1,
        }),
      });
    } catch (error) {
      console.log(error, "error from catch");
    }
  }

  async function fetchLikedNews(profileId: number) {
    const response = await fetch(`${BASE_URL}/likedNews`);
    const data = await response.json();
    return data[profileId] || [];
  }

  async function fetchNewsById(newsId: number) {
    const response = await fetch(`${BASE_URL}/news/${newsId}`);
    const data = await response.json();
    return data;
  }

  async function recommendNewsForUser() {
    try {
      const likedNews = await fetchLikedNews(Number(user_id));

      let recommendedNews: any[] = [];

      for (const id of likedNews) {
        const news = await fetchNewsById(id);

        const recommended = (await fetchAllNews()).filter(
          (rec: any) =>
            rec.category[0] === news.category[0] && !likedNews.includes(rec.id)
        );

        recommendedNews = recommendedNews.concat(recommended.slice(0, 3));
      }

      return recommendedNews;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function fetchAllNews() {
    const response = await fetch(`${BASE_URL}/news`);
    const data = await response.json();
    return data;
  }

  const { data: recommendedNews } = useSWR(
    user_id ? ["recommendNews", user_id] : null,
    recommendNewsForUser
  );
  console.log(recommendedNews, "recommended news");

  return (
    <>
      <div>
        <img src={news.img} alt="" className="w-60" />
        <h2 className="text-3xl font-semibold">{news.title}</h2>

        {user_status === "premium" ? (
          <p className="text-lg leading-relaxed">{news.content}</p>
        ) : (
          <>
            <p className="text-lg line-clamp-3">{news.content}</p>
            <button onClick={() => router.push("/plans")}>
              Subscribe to see the full post
            </button>
          </>
        )}

        <div>
          <button onClick={handleLike} className="btn btn-neutral">
            like this post
          </button>
          <p>{news.likes?.length}</p>

          <button className="btn btn-neutral" onClick={handleShares}>
            share this post
          </button>
          <p>{news.shares}</p>
        </div>
      </div>

      <div>
        <h2>Recommended News</h2>
        <ul className="flex justify-evenly">
          {recommendedNews?.map((item) => (
            <li key={item.id}>
              <Card
                className="flex"
                news={{
                  title: item.title,
                  image: item.img,
                  isPremium: item.isPremium,
                }}
                classNames={{
                  image: "object-cover w-56",
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NewsDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${BASE_URL}/news`);
  const news: INewsElement[] = await response.json();

  const paths = news.map((item) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<NewsProps> = async (context) => {
  const id = context.params?.id?.toString()!;
  if (!id) {
    return { notFound: true };
  }

  const response = await fetch(`${BASE_URL}/news/${id}`);
  const news: INewsElement = await response.json();

  if (!news) {
    return { notFound: true };
  }

  return {
    props: {
      news,
    },
    revalidate: 1,
  };
};
