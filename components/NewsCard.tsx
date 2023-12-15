/* eslint-disable @next/next/no-img-element */
import React from "react";

interface INewsCardProps {
  title: string;
  description?: string;
  image?: string;
  category?: string[];
  isPremium: boolean;
  onClick?: () => void;
  content?: string;
  publishDate?: string;
}

const NewsCard = (props: INewsCardProps) => {
  return (
    <article className="flex bg-white transition  py-4">
      {props.image && (
        <div className="hidden sm:block sm:basis-56">
          <img alt="" src={props.image} className="object-cover w-56" />
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between">
        <div className=" border-gray-900/10  sm:border-l-transparent">
          <h3 className="text-2xl font-bold uppercase text-black">
            {props.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 mb-2 ">
            {props.content}
          </p>
          {props.isPremium && (
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700 ">
              Premium
            </span>
          )}
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <div className="flex flex-wrap justify-center sm:justify-end">
            {props.category?.map((item) => (
              <div
                key={item}
                className="px-2 py-1 mt-2 mr-2 text-xs font-bold uppercase bg-gray-900/10 rounded-full"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
