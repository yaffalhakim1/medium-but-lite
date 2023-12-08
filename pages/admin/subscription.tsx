import { useUsers } from "@/lib/useUser";
import { User } from "@/types/user-types";
import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";

import useSWR, { mutate } from "swr";

interface Item {
  id: number;
  name: string;
}

export default function SubscriptionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const { users, usersLoading, usersError } = useUsers();

  let index = 1;
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    // Increment the page number and fetch the next page of data
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    // Decrement the page number and fetch the previous page of data
    setPage((prevPage) => prevPage - 1);
  };

  // const pageNumbers = Array.from({ length: users.last_page }, (_, i) => i + 1);

  // const handleDelete = async (id: any) => {
  //   const token = Cookie.get("token") as string;
  //   setLoading(true);
  //   try {
  //     await axios.post(
  //       `https://spda.17management.my.id/api/documents/delete/${id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     mutate(data);
  //     setLoading(false);
  //     toast.success("Menunggu Persetujuan");
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("Dokumen gagal dihapus");
  //     console.error(error);
  //   }
  // };

  function handleSearch() {
    const filteredItems = items.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }

  return (
    <>
      <div className="container px-6  pt-2 pb-6 h-full">
        <p className="text-2xl font-semibold mb-2">Dashboard Dokumen</p>
        <p className="text-md font-normal mb-8">
          Lakukan perubahan data dokumen disini
        </p>
        <div className="md:flex md:justify-between">
          {/* <AddDocument onSuccess={mutate} /> */}
          <div className="form-control">
            <div className="input-group input-group-sm mb-3">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered  input-sm w-full max-w-xs"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
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
                    {/* <td>{item.expired_subs.getDa}</td> */}
                    {/* <td>{item.table}</td> */}
                    {/* <td>{item.tag.join(", ")} </td> */}

                    <td>
                      {/* <EditDocs
                        datas={{
                          name: item.name,
                          device_id: item.device_id,
                          uuid: item.uuid,
                          tag: item.tag,
                          code: item.code,
                          // uuid: item.uuid,
                          id: item.id,
                        }}
                        onSuccess={() => mutate()}
                      />

                      <DeleteDocs
                        id={item.id}
                        onSuccess={() => mutate()}
                        onClick={() => handleDelete(item.id)}
                      /> */}
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
