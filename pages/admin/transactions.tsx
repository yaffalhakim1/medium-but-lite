import Modal from "@/components/Modal";
import { BASE_URL } from "@/config/api";
import { useTransaction } from "@/lib/useTransaction";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { ITransaction } from "@/types/trans-types";
import { Transaction, User } from "@/types/user-types";
import { Menu } from "@headlessui/react";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const TransactionPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<boolean>();
  const {
    transaction,
    transactionLoading,
    transactionError,
    transactionMutate,
  } = useTransaction(search);

  const [page, setPage] = useState(1);
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const calculateNewExpiredDateForMonthly = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    return currentDate.toISOString().split("T")[0];
  };

  const calculateNewExpiredDateForYearly = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 365);
    return currentDate.toISOString().split("T")[0];
  };

  const handleSubscriptionToggle = async (
    id: number,
    isPremiumUser: boolean,
    subsType = "monthly | yearly"
  ) => {
    try {
      const newStatus = !isPremiumUser;
      let newExpiredDate = "";
      if (subsType === "monthly") {
        newExpiredDate = calculateNewExpiredDateForMonthly();
      } else if (subsType === "yearly") {
        newExpiredDate = calculateNewExpiredDateForYearly();
      }

      const res = await axios.patch<User>(
        `${BASE_URL}/profile/${id}`,
        {
          isPremiumUser: newStatus,
          expiredDate: newExpiredDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      transactionMutate(transaction);
      toast.success(
        `User subscription ${newStatus ? "activated" : "deactivated"}`
      );
    } catch (err) {
      toast.error("Failed to update user subscription");
    }
  };

  const handleAcceptOrReject = async (
    id: number,
    status: string,
    type: string,
    trans_date: string
  ) => {
    try {
      const res = await axios.patch<ITransaction>(
        `${BASE_URL}/transactions/${id}`,
        {
          status: status,
          type: type,
          trans_date: trans_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      transactionMutate(transaction);
      toast.success(`Transaction ${status}`);
    } catch (err) {
      toast.error("Failed to update transaction");
    }
  };

  return (
    <>
      <div className="container px-6  pt-2 pb-6 h-full">
        <p className="text-2xl font-semibold mb-2">Transactions</p>
        <p className="text-md font-normal mb-4">
          Manage your users transaction here
        </p>
        <div className="md:flex md:justify-between">
          <div className="space-x-2 ml-auto items-center">
            <input
              type="text"
              placeholder="Search"
              className="input input-neutral input-md input-bordered"
              onChange={(e) => setSearch(e.target.value)}
            />
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
                  <th>Status</th>
                  <th>Premium Type</th>
                  <th>Expiring Date</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transaction?.map((item: ITransaction, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{item.profileId}</td>
                    <td>{item.status}</td>
                    <td>{item.type}</td>
                    <td>{formatExpirationDate(item.trans_date)}</td>
                    <td>
                      <Modal
                        openButton={"Change Subs"}
                        modalTitle={
                          "Are you sure you want to change user subs?"
                        }
                        modalButton={"Change"}
                        openButtonClassname="btn btn-primary btn-sm capitalize"
                      >
                        <div className="space-x-3 mb-5">
                          <button
                            onClick={
                              item.type === "monthly"
                                ? () =>
                                    handleAcceptOrReject(
                                      item.profileId,
                                      "success",
                                      "monthly",
                                      calculateNewExpiredDateForMonthly()
                                    )
                                : () =>
                                    handleAcceptOrReject(
                                      item.profileId,
                                      "success",
                                      "yearly",
                                      calculateNewExpiredDateForYearly()
                                    )
                            }
                            className="btn btn-primary btn-sm capitalize"
                          >
                            Accept Payment
                          </button>
                          <button
                            onClick={() =>
                              handleAcceptOrReject(
                                item.id,
                                "canceled",
                                "canceled",
                                "N/A"
                              )
                            }
                            className="btn btn-primary btn-sm capitalize"
                          >
                            Cancel Payment
                          </button>
                        </div>
                      </Modal>
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
