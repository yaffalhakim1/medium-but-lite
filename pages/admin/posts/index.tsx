import Modal from "@/components/Modal";
import { BASE_URL } from "@/config/api";
import { useNews } from "@/lib/useNews";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { INewsElement } from "@/types/news-types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export default function PostPage() {
  const { newsError, news, newsLoading, newsMutate } = useNews();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${BASE_URL}/news/${id}`);
      toast.success("News deleted successfully");
      newsMutate();
    } catch (error) {
      toast.error("News deleted failed");
    }
  };

  return (
    <>
      <div className="container px-6  pt-2 pb-6 h-full">
        <p className="text-2xl font-semibold mb-2">Posts</p>
        <p className="text-md font-normal ">Manage your posts here</p>
        <div className="md:flex md:justify-between mt-4">
          <button
            onClick={() => router.push("admin/posts/create")}
            className="btn btn-neutral btn-sm text-white"
          >
            Create New Post
          </button>
          <div className="form-control"></div>
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="overflow-x-auto">
            <table className="table mt-2">
              <thead>
                <tr className="">
                  <th>No</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {news?.map((item: INewsElement, idx) => (
                  <tr key={item.id}>
                    <th>{idx++}</th>
                    <td>{item.title}</td>
                    <td>
                      {item.isPremium ? (
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          Premium
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                          Free
                        </div>
                      )}
                    </td>
                    <td>{formatExpirationDate(item.created_at)}</td>
                    <td>
                      <div className="space-x-2">
                        <Modal
                          type="danger"
                          openButton="Delete"
                          modalTitle="Delete Post"
                          modalDescription={`are you sure you want to delete "${item.title}" ?`}
                          modalButton="Delete"
                          onSubmit={() => handleDelete(item.id)}
                        ></Modal>
                        <Link href={`/admin/posts/create/edit/${item.id}`}>
                          <p>Edit</p>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex space-x-1 mt-5 mx-auto">
            {page >= 1 && (
              <button
                className="btn btn-primary btn-outline btn-sm capitalize"
                onClick={handlePrevPage}
              >
                Previous
              </button>
            )}
            <div className=" mx-auto items-center justify-center ">
              <div className="btn-group">
                {/* {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    disabled={pageNumber === page}
                    className={`btn btn-outline btn-primary btn-sm ${
                      pageNumber === page ? "btn-active" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))} */}
              </div>
            </div>

            <button
              onClick={handleNextPage}
              className="btn btn-primary btn-outline btn-sm capitalize"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
