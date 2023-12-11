import Modal from "@/components/Modal";
import { BASE_URL } from "@/config/api";
import { useNews } from "@/lib/useNews";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { INewsElement } from "@/types/news-types";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export default function PostPage() {
  const { newsError, news, newsLoading } = useNews();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="container px-6  pt-2 pb-6 h-full">
        <p className="text-2xl font-semibold mb-2">Posts</p>
        <p className="text-md font-normal mb-8">Manage your posts here</p>
        <div className="md:flex md:justify-between">
          {/* <AddDocument onSuccess={mutate} /> */}

          <button
            onClick={() => router.push("admin/create")}
            className="btn btn-success"
          >
            Create New Post
          </button>
          <div className="form-control"></div>
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="overflow-x-auto">
            <table className="table ">
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
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.isPremium ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        <span>{item.isPremium ? "Premium" : "Free"}</span>
                      </div>
                    </td>
                    <td>{formatExpirationDate(item.created_at)}</td>
                    <td>
                      <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="" className="btn btn-sm">
                          Actions
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52"
                        >
                          <li></li>
                        </ul>
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
