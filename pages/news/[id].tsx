/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

interface NewsProps {
  news: INewsElement;
}

const NewsDetailPage = ({ news }: NewsProps) => {
  const handleLike = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          like: news.like + 1,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <img src="" alt="" />
        <h2>{news.title}</h2>
        <p>{news.desc}</p>

        <button className="btn" onClick={() => handleLike(news.id)}>
          Button
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <p>{news.like}</p>
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
    revalidate: 10,
  };
};
