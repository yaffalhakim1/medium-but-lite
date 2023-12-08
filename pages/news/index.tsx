import NewsCard from "@/components/NewsCard";
import { useNews } from "@/lib/useNews";
import { Inter } from "next/font/google";
import Link from "next/link";
import Cookie from "js-cookie";
import React from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const NewsList = () => {
  const { news, newsError, newsLoading } = useNews();
  const router = useRouter();

  if (newsLoading) {
    return (
      <div className="text-center flex justify-center items-center ">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (newsError) {
    return <div>error news</div>;
  }

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
      {news?.map((item) => (
        <div key={item.id} className="space-y-2">
          <Link href={`news/${item.id}`}>
            <NewsCard
              title={item.title}
              description={item.desc}
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
