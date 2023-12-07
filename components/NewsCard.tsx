/* eslint-disable @next/next/no-img-element */
import React from "react";

interface INewsCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  isPremium: boolean;
}

const NewsCard = (props: INewsCardProps) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {props.title}
            {props.isPremium && (
              <div className="badge badge-secondary">PREMIUM</div>
            )}
          </h2>
          <p>{props.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
