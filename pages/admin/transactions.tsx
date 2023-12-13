import Modal from "@/components/Modal";
import { useTransaction } from "@/lib/useTransaction";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { ITransaction } from "@/types/trans-types";
import { User } from "@/types/user-types";
import { Menu } from "@headlessui/react";
import React, { useState } from "react";

const TransactionPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<boolean>();
  const { transaction } = useTransaction();
  const [page, setPage] = useState(1);
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="container px-6  pt-2 pb-6 h-full">
        <p className="text-2xl font-semibold mb-2">Subscriptions</p>
        <p className="text-md font-normal mb-4">
          Manage your users subscription here
        </p>
        <div className="md:flex md:justify-between">
          <div className="space-x-2 ml-auto items-center">
            <input
              type="text"
              placeholder="Search"
              className="input input-neutral input-md input-bordered"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* use Menu from headless */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <span className="ml-2 text-black">Filter</span>
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => setStatus(true)}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Premium
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => setStatus(false)}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Free
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <div className="flex flex-col h-full w-full mt-4">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="">
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Premium Status</th>
                  <th>Expiring Date</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transaction?.map((item: ITransaction, idx) => (
                  <tr key={item.id}>
                    <th>{idx++}</th>
                    <td>{item.status}</td>
                    <td>{item.trans_id}</td>
                    <td>
                      {/* {item.isPremiumUser ? (
                        <div className="badge badge-success px-2 py-3 text-white text-sm">
                          Active
                        </div>
                      ) : (
                        <div className="badge badge-error px-2 py-3 text-white text-sm">
                          Not Active
                        </div>
                      )} */}
                    </td>
                    <td>{formatExpirationDate(item.trans_date)}</td>
                    <td>
                      <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="" className="btn btn-sm">
                          Actions
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52"
                        >
                          <li>
                            <Modal
                              openButton={"Change Subs"}
                              modalTitle={
                                "Are you sure you want to change user subs?"
                              }
                              modalButton={"Change"}
                            >
                              <div className="space-x-3 mb-5">
                                <button className="btn btn-primary btn-sm capitalize">
                                  Monthly
                                </button>
                                <button className="btn btn-primary btn-sm capitalize">
                                  Yearly
                                </button>
                              </div>
                            </Modal>
                          </li>
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
};

export default TransactionPage;
