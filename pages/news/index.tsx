import NewsCard from "@/components/NewsCard";
import { Inter } from "next/font/google";
import Link from "next/link";
import Cookie from "js-cookie";
import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${BASE_URL}/news`);
  const news: INewsElement[] = await response.json();
  return {
    props: {
      news,
    },
  };
};

const NewsList = (news: { news: INewsElement[] }) => {
  const router = useRouter();

  function handleLogout() {
    Cookie.remove("token");
    Cookie.remove("role");
    return router.push("/auth/login");
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button className="btn btn-error" onClick={handleLogout}>
        logout
      </button>
      <h1 className="text-5xl font-bold">News List</h1>
      {news.news.map((item) => (
        <div key={item.id} className="space-y-2">
          <Link href={`news/${item.id}`}>
            <NewsCard
              title={item.title}
              // description={item.desc}
              image="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg"
              category={item.category}
              isPremium={item.isPremium}
            />
          </Link>
        </div>
      ))}
    </main>
  );
};

export default NewsList;
