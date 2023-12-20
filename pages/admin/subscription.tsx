import { FilterIcons } from "@/components/Icons";
import Modal from "@/components/Modal";
import { BASE_URL } from "@/config/api";
import { useTransaction } from "@/lib/useTransaction";
import { useUsers } from "@/lib/useUser";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { User } from "@/types/user-types";
import { Menu } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function SubscriptionPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<boolean | undefined>();
  const [page, setPage] = useState(1);

  const { users, usersMutate, usersResetFilter } = useUsers({
    search,
    premium: type,
    page: page,
  });

  const { transaction } = useTransaction({});

  const handleResetFilters = () => {
    usersResetFilter();
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

  const lastElement = transaction?.[transaction.length - 1];

  const handleSubscriptionToggle = async (
    id: number,
    trans_id: number,
    isPremiumUser: boolean
  ) => {
    try {
      const newStatus = !isPremiumUser;
      let newExpiredDate = "";

      const res = await axios.patch<User>(
        `${BASE_URL}/profile/${id}`,
        {
          isPremiumUser: newStatus,
          subscriptionPlan: {
            type: "",
            expired_date: "",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const changeInTrans = await axios.patch(
        `${BASE_URL}/transactions/${trans_id}`,
        {
          status: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      usersMutate(users);
      toast.success(
        `User subscription ${newStatus ? "activated" : "deactivated"}`
      );
    } catch (err) {
      toast.error("Failed to update user subscription");
    }
  };

  return (
    <>
      <div className="container px-6  pt-2 pb-6 h-full">
        <p className="text-2xl font-semibold mb-2">Subscriptions</p>
        <p className="text-md font-normal mb-4">
          Manage your users subscription here
        </p>
        <div className="md:flex md:justify-between">
          <div className="flex space-x-2 ml-auto items-center">
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
                  <th>Email</th>
                  <th>Premium Status</th>
                  <th>Expiring Date</th>
                  <th>Action</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item: User, idx) => (
                  <tr key={item.id}>
                    <th>{(idx += 1)}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.isPremiumUser ? (
                        <div className="badge badge-success px-2 py-3 text-white text-sm">
                          Active
                        </div>
                      ) : (
                        <div className="badge badge-error px-2 py-3 text-white text-sm">
                          Not Active
                        </div>
                      )}
                    </td>
                    <td>{formatExpirationDate(item.expiredDate)}</td>
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
                              openButton={"Deactivate Subs"}
                              modalTitle={`Are you sure you want to deactivate ${item.name} subs?`}
                              modalButton={"Change"}
                              onSubmit={() =>
                                handleSubscriptionToggle(
                                  item.id,
                                  lastElement?.id!,
                                  item.isPremiumUser
                                )
                              }
                            ></Modal>
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
}
