import { FilterIcons } from "@/components/Icons";
import Modal from "@/components/Modal";
import { BASE_URL } from "@/config/api";
import { useTransaction, useTransactionById } from "@/lib/useTransaction";
import {
  calculateNewExpiredDateForMonthly,
  calculateNewExpiredDateForYearly,
  formatExpirationDate,
} from "@/lib/utils/user-subs";
import { ITransaction } from "@/types/trans-types";
import { User } from "@/types/user-types";
import axios from "axios";
import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const TransactionPage = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"processed" | "success" | "cancelled">();
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const {
    transaction,
    transactionLoading,
    transactionError,
    transactionMutate,
    transactionResetFilter,
  } = useTransaction({
    search,
    premium: type,
    sortByDate,
    page: page,
  });

  // const lastElement = transaction?.[transaction.length - 1];

  // const { transaction, transactionMutate } = useTransactionById(Number(id));

  const handleResetFilters = () => {
    transactionResetFilter();
    setSearch("");
    setType(undefined);
    setPage(1);
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleAcceptOrReject = async (
    id: number,
    trans_id: number,
    status: string,
    type: string,
    trans_date?: string
  ) => {
    try {
      const res = await axios.patch<ITransaction>(
        `${BASE_URL}/transactions/${trans_id}`,
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

      const resp = await axios.patch<User>(
        `${BASE_URL}/profile/${id}`,
        {
          isPremiumUser: true,
          subscriptionPlan: {
            type: type,
            expired_date: trans_date,
          },
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
  if (transactionLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (transactionError) {
    return <div className="text-center">Try Refresh this page</div>;
  }
  return (
    <>
      <div className="container px-6  pt-2 pb-6 h-full">
        <p className="text-2xl font-semibold mb-2">Transactions</p>
        <p className="text-md font-normal mb-4">
          Manage your users transaction here
        </p>
        <div className="md:flex md:justify-between">
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
                <li onClick={() => setType("processed")}>
                  <a>Processed</a>
                </li>
                <li onClick={() => setType("success")}>
                  <a>Success</a>
                </li>
                <li onClick={() => setType("cancelled")}>
                  <a>Cancelled</a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn   m-1 flex">
                <SlidersHorizontal />
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
            <button onClick={handleResetFilters} className="btn btn-neutral">
              Reset
            </button>
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

                    <td>
                      {item.status === "processed" ? (
                        <div className="badge badge-warning px-2 py-3 text-white text-sm">
                          Processed
                        </div>
                      ) : item.status === "success" ? (
                        <div className="badge badge-success px-2 py-3 text-white text-sm">
                          Success
                        </div>
                      ) : (
                        <div className="badge badge-error px-2 py-3 text-white text-sm">
                          Cancelled
                        </div>
                      )}
                    </td>

                    <td>{item.type}</td>
                    <td>{formatExpirationDate(item.trans_date)}</td>
                    <td className="space-x-2">
                      {item.status === "success" && "cancelled" ? (
                        <></>
                      ) : (
                        <>
                          {item.status === "processed" && (
                            <>
                              <button
                                className="btn btn-primary no-animation text-white btn-sm"
                                onClick={
                                  item.type === "monthly"
                                    ? () =>
                                        handleAcceptOrReject(
                                          item.profileId!,
                                          item?.id!,
                                          "success",
                                          "monthly",
                                          calculateNewExpiredDateForMonthly()
                                        )
                                    : () =>
                                        handleAcceptOrReject(
                                          item.profileId!,
                                          item?.id!,

                                          "success",
                                          "yearly",
                                          calculateNewExpiredDateForYearly()
                                        )
                                }
                              >
                                Accept
                              </button>

                              <button
                                className="btn btn-error no-animation btn-sm text-white"
                                onClick={() =>
                                  handleAcceptOrReject(
                                    item.profileId!,
                                    item?.id!,

                                    "canceled",
                                    ""
                                  )
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </>
                      )}
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
