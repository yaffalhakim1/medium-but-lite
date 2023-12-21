import Link from "next/link";
import React, { Suspense, useState } from "react";
import { GetServerSideProps } from "next";
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import Cookie from "js-cookie";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { TrendingUp } from "@/components/Icons";
import { useNews } from "@/lib/useNews";
import Card from "@/components/Card";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { useUser } from "@/lib/useUser";
import { toast } from "sonner";
import { SlidersHorizontal } from "lucide-react";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    `${BASE_URL}/news?_sort=likes&_order=desc&_limit=5`
  );
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
  const userId = Cookie.get("user_id");

  const LIMIT = 6;
  const authed = useAuthStore((state) => state.isLoggedIn);
  const setAuthed = useAuthStore((state) => state.setIsLoggedIn);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<boolean | undefined>();
  const [selectedCat, setSelectedCat] = useState<string[]>([]);
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { newsList, newsLoading, newsResetFilters } = useNews({
    search,
    premium: type,
    category: selectedCat,
    sortByDate,
    page: currentPage,
  });

  const { user } = useUser(Number(userId));

  useEffect(() => {
    if (token) {
      setAuthed(true);
    }
  }, [setAuthed, token]);

  if (newsLoading) {
    return <p>Loading...</p>;
  }

  const handleResetFilters = () => {
    newsResetFilters();
    setSearch("");
    setType(undefined);
    setSelectedCat([]);
    setSortByDate("desc");
  };

  async function handleNewsCountEverytimeUserOpenIt(newsId: number) {
    try {
      const res = await fetch(`${BASE_URL}/profile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          news: [...user?.news!, newsId],
        }),
      });
    } catch (error) {
      toast.error(`error ${error}`);
    }
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      {!authed && (
        <section className=" animate-fade-up">
          <div className="mx-auto  px-4 py-32 lg:flex lg:min-h-screen lg:items-center">
            <div className="mx-auto max-w-xl text-center">
              <h1
                data-testid="hero-section"
                className="text-3xl font-extrabold sm:text-5xl leading-relaxed"
              >
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
      <div className="flex items-center space-x-2 mt-9 animate-fade-up">
        <TrendingUp />
        <p className="text-2xl font-semibold ">Trending on Medium Lite</p>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-3 animate-fade-up  items-center space-y-3 md:space-y-0 mt-5">
        {data?.map((item) => (
          <div key={item.id} className="">
            <Link href={`news/${item.id}`}>
              <Card
                news={{
                  title: item.title,
                  content: item.content,
                  isPremium: item.isPremium,
                }}
                classNames={{
                  image: "object-cover w-56 h-56",
                  title: "font-bold uppercase text-gray-900",
                }}
              />
            </Link>
          </div>
        ))}
      </div>

      <div className=" items-center mt-9 justify-between animate-fade-up">
        <p className="text-2xl font-semibold ">News Your Selection</p>
        <div className="flex items-center space-x-2 md:mt-3 mt-5">
          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm rounded-sm m-1"
            >
              <SlidersHorizontal size={16} className="md:block hidden  " /> Type
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1]  menu p-2 shadow bg-base-100 rounded-sm w-52"
            >
              <li onClick={() => setType(false)}>
                <a>Free</a>
              </li>
              <li onClick={() => setType(true)}>
                <a>Premium</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm rounded-sm m-1"
            >
              <SlidersHorizontal size={16} className="md:block hidden" />
              Category
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-sm w-52"
            >
              <li onClick={() => setSelectedCat(["Tech"])}>
                <a>Tech</a>
              </li>
              <li onClick={() => setSelectedCat(["Anime"])}>
                <a>Anime</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm m-1 rounded-sm"
            >
              <SlidersHorizontal size={16} className="md:block hidden" />
              Date
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content  z-[1] menu p-2 shadow bg-base-100 rounded-sm w-52"
            >
              <li onClick={() => setSortByDate("asc")}>
                <a>Asc</a>
              </li>
              <li onClick={() => setSortByDate("desc")}>
                <a>Desc</a>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-sm btn-neutral"
            onClick={handleResetFilters}
          >
            Reset Filter
          </button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="input input-neutral input-sm input-bordered mt-5"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="items-center space-y-3 mt-5 animate-fade-up">
        {newsList?.map((item) => (
          <div key={item.id} className="" data-testid="news-list">
            <Link href={`news/${item.id}`}>
              <Card
                onClick={() => handleNewsCountEverytimeUserOpenIt(item.id)}
                className="md:flex transition md:space-y-2 "
                news={{
                  title: item.title,
                  content: item.content,
                  image: item.img,
                  category: item.category,
                  isPremium: item.isPremium,
                  publishDate: formatExpirationDate(item.created_at),
                }}
                classNames={{
                  image: "object-cover w-56 h-56",
                  title: "font-bold uppercase text-black md:ml-4 line-clamp-3",
                  content: "md:ml-4 line-clamp-3",
                  premium: "mt-4 md:ml-4",
                }}
              />
            </Link>
          </div>
        ))}
        <div className="flex justify-center space-x-1 mt-5 mx-auto pb-3">
          {currentPage >= 2 && (
            <button
              className="btn btn-neutral btn-outline btn-sm capitalize"
              onClick={handlePrevPage}
            >
              Previous
            </button>
          )}
          <div className=" mx-auto items-center justify-center ">
            <div className="btn-group"></div>
          </div>

          <button
            onClick={handleNextPage}
            className="btn btn-neutral btn-outline btn-sm capitalize"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsList;
