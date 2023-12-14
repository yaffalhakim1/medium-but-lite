/* eslint-disable @next/next/no-img-element */
import React from "react";

interface INewsCardProps {
  title: string;
  description?: string;
  image: string;
  category?: string[];
  isPremium: boolean;
  onClick?: () => void;
  content?: string;
}

const NewsCard = (props: INewsCardProps) => {
  return (
    <article className="flex bg-white transition hover:shadow-xl">
      <div className="hidden sm:block sm:basis-56">
        <img
          alt="Guitar"
          src={props.image}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <button>
            <h3 className="font-bold uppercase text-gray-900">
              {props.title}
              {props.isPremium && (
                <div className="ml-5 badge badge-primary">PREMIUM</div>
              )}
            </h3>
          </button>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {props.content}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <button className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400">
            Read Blog
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
