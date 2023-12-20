/* eslint-disable @next/next/no-img-element */
import { FilterIcons } from "@/components/Icons";
import Modal from "@/components/Modal";
import { BASE_URL } from "@/config/api";
import { useNews } from "@/lib/useNews";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { INewsElement } from "@/types/news-types";
import { Menu } from "@headlessui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export default function PostPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<boolean | undefined>();
  const [selectedCat, setSelectedCat] = useState<string[]>([]);
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  const { newsError, newsList, newsLoading, newsMutate, newsResetFilters } =
    useNews({
      search,
      premium: type,
      category: selectedCat,
      sortByDate,
      page: currentPage,
    });

  const handleResetFilters = () => {
    newsResetFilters();
    setSearch("");
    setType(undefined);
    setSelectedCat([]);
    setSortByDate("desc");
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
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
          <div className="flex ml-auto items-center space-x-2 md:mt-0 mt-5">
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn m-1">
                <FilterIcons />
                Type
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => setType(false)}>
                  <a>Free</a>
                </li>
                <li onClick={() => setType(true)}>
                  <a>Premium</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn m-1">
                <FilterIcons />
                Category
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => setSelectedCat(["Tech"])}>
                  <a>Tech</a>
                </li>
                <li onClick={() => setSelectedCat(["Anime"])}>
                  <a>Anime</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn m-1 flex">
                <FilterIcons />
                Date
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => setSortByDate("asc")}>
                  <a>Asc</a>
                </li>
                <li onClick={() => setSortByDate("desc")}>
                  <a>Desc</a>
                </li>
              </ul>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="input input-neutral input-md input-bordered"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleResetFilters}
              className="btn btn-neutral  text-white"
            >
              Reset
            </button>
          </div>
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
                {newsList?.map((item: INewsElement, idx) => (
                  <tr key={item.id}>
                    <th>{(idx += 1)}</th>
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
                      <div className="space-y-2">
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
                        <Modal
                          type="success"
                          openButton="View"
                          modalTitle={item.title}
                          modalDescription={item.desc}
                          modalButton="Close"
                        >
                          <div className="flex flex-col">
                            <div className="flex flex-col">
                              <p className="text-sm font-normal">{item.desc}</p>
                            </div>
                            <div>
                              <img
                                src={item.img ?? "https://placehold.co/400x400"}
                                alt={item.title}
                                className="w-96 h-96 object-cover"
                              />{" "}
                            </div>

                            <div className="flex flex-col mt-2">
                              <p className="text-sm font-semibold">
                                Created At
                              </p>
                              <p className="text-sm font-normal">
                                {formatExpirationDate(item.created_at)}
                              </p>
                            </div>

                            <div className="flex flex-col mt-2">
                              <p className="text-sm font-semibold">Content</p>
                              <p className="text-sm font-normal">
                                {item.content}
                              </p>
                            </div>
                            <div className="flex flex-col mt-2">
                              <p className="text-sm font-semibold">Category</p>
                              <p className="text-sm font-normal">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex space-x-1 mt-5 mx-auto">
            {currentPage >= 1 && (
              <button
                className="btn btn-primary btn-outline btn-sm capitalize"
                onClick={handlePrevPage}
              >
                Previous
              </button>
            )}
            <div className=" mx-auto items-center justify-center ">
              <div className="btn-group"></div>
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
