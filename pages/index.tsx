import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import React from "react";
import { GetServerSideProps } from "next";
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import Cookie from "js-cookie";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { TrendingUp } from "@/components/Icons";

export const getServerSideProps: GetServerSideProps = async () => {
  // most like and most recent

  const response = await fetch(`${BASE_URL}/news?_sort=likes&_order=desc`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } };
};

const NewsList = ({ data }: { data: INewsElement[] }) => {
  const token = Cookie.get("token");
  const authed = useAuthStore((state) => state.isLoggedIn);
  const setAuthed = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    if (token) {
      setAuthed(true);
    }
  }, [setAuthed, token]);

  return (
    <>
      {!authed && (
        <section className="">
          <div className="mx-auto  px-4 py-32 lg:flex lg:min-h-screen lg:items-center">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-extrabold sm:text-5xl leading-relaxed">
                Stay on top of your business with our{" "}
                <strong className="font-extrabold text-red-700 sm:block">
                  {""}
                  News
                </strong>
              </h1>

              <p className="mt-4 sm:text-xl/relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt illo tenetur fuga ducimus numquam ea!
              </p>

              <button className="btn btn-neutral no-animation mt-6">
                Get Started
              </button>
            </div>
          </div>
        </section>
      )}
      <div className="flex items-center space-x-2 mt-9">
        <TrendingUp />
        <p className="text-2xl font-semibold ">Trending on Medium Lite</p>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-3   items-center space-y-3 md:space-y-0 mt-5">
        {data.map((item) => (
          <div key={item.id} className="">
            <Link href={`news/${item.id}`}>
              <NewsCard
                title={item.title}
                content={item.content}
                isPremium={item.isPremium}
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 mt-9">
        <p className="text-2xl font-semibold ">Selected For You</p>
      </div>
      <div className="items-center space-y-3 mt-5">
        {data.map((item) => (
          <div key={item.id} className="">
            <Link href={`news/${item.id}`}>
              <NewsCard
                title={item.title}
                image={item.img}
                content={item.content}
                category={item.category}
                isPremium={item.isPremium}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsList;
