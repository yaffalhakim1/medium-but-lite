/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import useSWR from "swr";
import Card from "@/components/Card";
import { useUser } from "@/lib/useUser";
import { useNewsDetail } from "@/lib/useNews";
import Link from "next/link";
import { Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

interface NewsProps {
  news: INewsElement;
}

const NewsDetailPage = ({ news }: NewsProps) => {
  const router = useRouter();
  const user_id = Cookie.get("user_id");
  const { user } = useUser(Number(user_id));
  const { id } = router.query;
  const { newsDetail, newsDetailMutate } = useNewsDetail(Number(id));

  // Derive initial like state from the data instead of an undefined default
  // (previously the heart always rendered as "liked").
  const [isThisNewsLiked, setIsThisNewsLiked] = useState<boolean>(
    news.likes?.includes(Number(user_id)) ?? false
  );

  async function handleLike() {
    if (!user_id) return;
    try {
      setIsThisNewsLiked(true);
      const likedSet = new Set([...(news.likes ?? []), Number(user_id)]);
      await fetch(`${BASE_URL}/news/${news.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: [...likedSet],
        }),
      });

      const userLikedSet = new Set([...(user?.likes ?? []), Number(id)]);
      await fetch(`${BASE_URL}/profile/${Number(user_id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: [...userLikedSet],
        }),
      });

      newsDetailMutate(newsDetail);
      toast.success("liked!");
    } catch (error) {
      console.log(error, "error from catch");
    }
  }

  async function handleUnlike() {
    if (!user_id) return;
    try {
      const like = (news.likes ?? []).filter(
        (item) => item !== Number(user_id)
      );
      const userLike = (user?.likes ?? []).filter(
        (item) => item !== Number(id)
      );
      setIsThisNewsLiked(false);
      await fetch(`${BASE_URL}/news/${news.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: like,
        }),
      });
      await fetch(`${BASE_URL}/profile/${Number(user_id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: userLike,
        }),
      });
      newsDetailMutate(newsDetail);
      toast.success("unliked!");
    } catch (error) {
      console.log(error, "error from catch");
    }
  }

  async function handleShares() {
    try {
      const shares = (news.shares ?? 0) + 1;
      await fetch(`${BASE_URL}/news/${news.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shares,
        }),
      });
      newsDetailMutate(newsDetail);
      toast.success("link copied!");
    } catch (error) {
      console.log(error, "error from catch");
    }
  }

  async function fetchLikedNews(profileId: number) {
    const response = await fetch(`${BASE_URL}/profile/${profileId}`);
    const data = await response.json();
    return data.likes || [];
  }

  async function fetchAllNews() {
    const response = await fetch(`${BASE_URL}/news`);
    const data = await response.json();
    return data;
  }

  async function recommendNewsForUser() {
    if (!user_id) return [];
    try {
      // Single round trip: fetch liked ids + all news once, then filter
      // in memory (previously: N+1 fetches per liked article).
      const [likedNews, allNews] = await Promise.all([
        fetchLikedNews(Number(user_id)),
        fetchAllNews(),
      ]);
      if (!likedNews.length) return [];

      const likedSet = new Set(likedNews);
      const likedNewsItems = allNews.filter((n: any) => likedSet.has(n.id));
      const recommended = allNews.filter(
        (rec: any) =>
          !likedSet.has(rec.id) &&
          likedNewsItems.some(
            (liked: any) => liked.category?.[0] === rec.category?.[0]
          )
      );
      return recommended.slice(0, 3);
    } catch (error) {
      return [];
    }
  }

  const { data: recommendedNews } = useSWR(
    user_id ? ["recommendNews", user_id] : null,
    recommendNewsForUser
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className=" ">
          {news.isPremium ? (
            <div>
              <span className="px-2 py-1 text-xs font-bold uppercase bg-yellow-500 text-white rounded-full">
                Premium News
              </span>
            </div>
          ) : (
            <></>
          )}
          <img src={news.img} alt="" className="w-60 mx-auto" />
          <h2 className="text-3xl font-semibold text-center">{news?.title}</h2>
        </div>

        {user?.isPremiumUser === true ? (
          <p className="text-lg leading-relaxed mt-10">{news.content}</p>
        ) : (
          <>
            <p className="text-lg line-clamp-3 mt-10 text-center md:text-start ">
              {news?.content}
            </p>
            <div className="backdrop-blur-sm">
              <button
                onClick={() => router.push("/plans")}
                className="text-xl mt-8 md:mt-0 no-animation"
              >
                Become a member - and all the best content coming to you only on{" "}
                <br />
                <span className="font-semibold">🌟 Medium Lite 🌟</span>
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center space-x-2 mt-8">
        {isThisNewsLiked === false ? (
          <Heart onClick={handleLike} className="cursor-pointer   " />
        ) : (
          <Heart
            onClick={handleUnlike}
            className="cursor-pointer text-red-900"
          />
        )}

        <p>{newsDetail?.likes?.length}</p>
        <Share2 onClick={handleShares} className="cursor-pointer" />
        <p>{newsDetail?.shares}</p>
      </div>

      <div>
        <h2 className="text-xl mt-10 font-semibold">
          Recommended from Medium Lite
        </h2>
        <ul className="md:grid md:grid-cols-3 md:gap-3 items-center space-y-3 md:space-y-clear0 mt-5 mb-10">
          {recommendedNews
            ?.map((item: INewsElement) => (
              <li key={item.id}>
                <Link href={`/news/${item.id}`}>
                  <Card
                    className=""
                    news={{
                      title: item.title,
                      image: item.img,
                      isPremium: item.isPremium,
                      content: item.content,
                    }}
                    classNames={{
                      title: "font-semibold mt-3",
                      image: "object-cover w-65 h-56",
                      content: "line-clamp-1",
                      premium: "mt-3",
                    }}
                  />
                </Link>
              </li>
            ))
            .slice(0, 3)}
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

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<NewsProps> = async (context) => {
  const id = context.params?.id?.toString();
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
    revalidate: 5,
  };
};
