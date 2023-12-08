import { BASE_URL } from "@/config/api";
import { useUsers } from "@/lib/useUser";
import { User } from "@/types/user-types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import useSWR, { mutate } from "swr";

interface Item {
  id: number;
  name: string;
}

export default function SubscriptionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [deact, setDeact] = useState(false);
  const { users, usersLoading, usersError } = useUsers();

  let index = 1;
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  // handle subscription status user (active or not)
  async function handleDeactivate(id: number) {
    setDeact(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/${id}`,
        {
          expired_subs: false,
          isPremiumUser: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      toast.success("User subscription deactivated");
      mutate(`${BASE_URL}/profile/${id}`);
    } catch (err) {
      toast.error("Failed to deactivate user subscription");
    }
  }

  function handleSearch() {
    const filteredItems = items.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }

  return (
    <>
      <div className="container px-6  pt-2 pb-6 h-full">
        <p className="text-2xl font-semibold mb-2">Subscriptions</p>
        <p className="text-md font-normal mb-8">
          Manage your users subscription here
        </p>
        <div className="md:flex md:justify-between">
          {/* <AddDocument onSuccess={mutate} /> */}
          <div className="form-control"></div>
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="overflow-x-auto">
            <table className="table table-compact lg:10/12 w-full whitespace-normal">
              <thead>
                <tr className="[&_th]:font-semibold [&_th]:capitalize">
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subs</th>
                  <th>Action</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item: User) => (
                  <tr key={item.id}>
                    <th>{index++}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.expired_subs ? (
                        <div className="badge badge-success px-2 py-3 text-white text-sm">
                          Active
                        </div>
                      ) : (
                        <div className="badge badge-error px-2 py-3 text-white text-sm">
                          Not Active
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn btn-sm">
                          Actions
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52"
                        >
                          <li>
                            <a onClick={() => handleDeactivate(item.id)}>
                              Deactivate
                            </a>
                          </li>
                          <li>
                            <a>Item 2</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td></td>
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
