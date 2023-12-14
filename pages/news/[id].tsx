/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Cookie from "js-cookie";

interface NewsProps {
  news: INewsElement;
}

const NewsDetailPage = ({ news }: NewsProps) => {
  const user_id = Cookie.get("user_id");
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

  return (
    <>
      <div>
        <img src={news.img} alt="" />
        <h2 className="text-3xl font-semibold">{news.title}</h2>
        <p className="text-lg leading-relaxed">{news.content}</p>

        <button onClick={handleLike}>like this post</button>

        <p>{news.likes?.length}</p>
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
