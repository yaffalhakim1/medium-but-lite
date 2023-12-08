import { SetStateAction, useState } from "react";
import Head from "next/head";

import SubscriptionPage from "./subscription";
import PostsPage from "./posts";
import TransactionPage from "./transactions";

export default function DashboardAdmin() {
  const [selectedItem, setSelectedItem] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = (item: SetStateAction<number>) => {
    setSelectedItem(item);
  };

  async function handleLogout() {}

  return (
    <>
      <Head>
        <title>Dashboard Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="  ml-4 mt-5 mr-4">
        <div className="flex  items-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-sm btn-primary drawer-button lg:hidden mr-4 capitalize"
          >
            Menu
          </label>
          <div>
            <h1 className="hidden md:flex mb-5 font-semibold">
              Dashboard Admin
            </h1>
            <div className="flex items-center space-x-3 mr-4 md:mr-0">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span className="text-md">D</span>
                </div>
              </div>
              <div>
                <div className="font-bold">{"userName"}</div>
                <div className="text-sm opacity-50">{"email"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {selectedItem === 1 && <SubscriptionPage />}
          {selectedItem === 2 && <PostsPage />}
          {selectedItem === 3 && <TransactionPage />}
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <a
                className={
                  selectedItem === 1 ? "active font-semibold text-white" : ""
                }
                onClick={() => handleClick(1)}
              >
                Subscriptions
              </a>
            </li>

            <li>
              <a
                className={
                  selectedItem === 2 ? "active font-semibold text-white" : ""
                }
                onClick={() => handleClick(2)}
              >
                Posts
              </a>
            </li>
            <li>
              <a
                className={
                  selectedItem === 3 ? "active font-semibold text-white" : ""
                }
                onClick={() => handleClick(3)}
              >
                Transactions
              </a>
            </li>

            <li className="">
              <a
                className="btn btn-error text-white mt-5 py-3 capitalize"
                onClick={handleLogout}
              >
                {loading ? (
                  <div className="flex flex-row items-center capitalize">
                    {/* <MoonLoader color="#fff" size={20} className="mr-3" /> */}
                    <span className="text-white">Loading...</span>
                  </div>
                ) : (
                  "Logout"
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
