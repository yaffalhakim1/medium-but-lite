import PostForm from "@/components/ProductForm";
import { BASE_URL } from "@/config/api";
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
  content: string;
  updated_at: Date;
  category: string[];
  like: number;
}

export const getServerSideProps: GetServerSideProps<{
  data: INews;
}> = async (context) => {
  const id = context.query.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

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

const EditForm = (product: { data: INews }) => {
  const data = product;

  return (
    <>
      <PostForm data={data.data} />
    </>
  );
};
export default EditForm;
