import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import React from "react";
import { GetServerSideProps } from "next";
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${BASE_URL}/news`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } };
};

const NewsList = ({ data }: { data: INewsElement[] }) => {
  return (
    <>
      <section className="">
        <div className="mx-auto  px-4 py-32 lg:flex lg:min-h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Stay on top of your business with our{" "}
              <strong className="font-extrabold text-red-700 sm:block">
                {""}
                News
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <button className="btn btn-neutral no-animation mt-6">
              Get Started
            </button>
          </div>
        </div>
      </section>
      <div className="flex justify-center space-x-2">
        {data.map((item) => (
          <div key={item.id} className="">
            <Link href={`news/${item.id}`}>
              <NewsCard
                title={item.title}
                image="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg"
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
