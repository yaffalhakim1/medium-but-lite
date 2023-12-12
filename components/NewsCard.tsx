/* eslint-disable @next/next/no-img-element */
import React from "react";

interface INewsCardProps {
  title: string;
  description?: string;
  image: string;
  category?: string[];
  isPremium: boolean;
  onClick?: () => void;
}

const NewsCard = (props: INewsCardProps) => {
  return (
    <div>
      <div className=" bg-base-100  w-80">
        <figure>
          <img src={props.image} alt="Shoes" />
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
            {props.category?.map((cat, idx) => (
              <div key={idx}>
                <div className="badge badge-primary">{cat}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
