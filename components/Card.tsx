import { cn } from "@/lib/utils/classname";
import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */
type News = {
  title: string;
  description?: string;
  image?: string;
  category?: string[];
  isPremium: boolean;
  onClick?: () => void;
  content?: string;
  publishDate?: string;
};

type CardProps = {
  news: News;
  classNames?: {
    title?: string;
    image?: string;
    content?: string;
    premium?: string;
  };
} & React.ComponentPropsWithoutRef<"div">;

export default function Card({
  news,
  className,
  classNames,
  ...rest
}: CardProps) {
  return (
    <>
      <article className={clsx(className)} {...rest}>
        {news.image && (
          <div>
            <img src={news.image} alt="" className={cn(classNames?.image)} />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between">
          <div className=" border-gray-900/10  sm:border-l-transparent">
            <h3 className={cn(classNames?.title)}>{news.title}</h3>
            <p
              className={
                classNames?.content
                  ? classNames?.content
                  : "mt-2 line-clamp-3 text-sm/relaxed text-gray-700 mb-2"
              }
            >
              {news.content}
            </p>
            <div className="flex items-center">
              {news.isPremium && (
                <span
                  className={cn(
                    "px-2 py-1 text-xs font-bold uppercase bg-yellow-500 text-white rounded-full",
                    classNames?.premium
                  )}
                >
                  Premium
                </span>
              )}
              <div className="flex justify-center ">
                {news.category?.map((item) => (
                  <div
                    key={item}
                    className="px-2 py-1 mt-4 ml-2 text-xs font-bold uppercase bg-gray-900/10 rounded-full"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <span className="ml-auto text-gray-500 text-xs">
                {news.publishDate}
              </span>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
