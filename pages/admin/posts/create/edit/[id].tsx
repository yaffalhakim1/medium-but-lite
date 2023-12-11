import PostForm from "@/components/ProductForm";
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";

interface INews {
  id: number;
  isPremium: boolean;
  title: string;
  desc: string;
  img: string;
  created_at: Date;
  updated_at: Date;
  category: string[];
  like: number;
}
interface IPostForm {
  product?: INews;
}

export const getServerSideProps: GetServerSideProps<{
  data: INews;
}> = async (context) => {
  const id = context.query.id as string;
  const response = await axios.get(`${BASE_URL}/news/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    props: {
      data: response.data,
    },
  };
};

const EditForm = (product: { data: IPostForm }) => {
  const data = product;
  console.log(data, "from [id] edit");

  return (
    <>
      <PostForm data={product.data} />
    </>
  );
};
export default EditForm;
