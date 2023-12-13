import { useUser, useUsers } from "@/lib/useUser";
import Link from "next/link";
import React from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { NewsLogo } from "./Icons";

const Navbar = () => {
  const router = useRouter();

  function handleLogout() {
    Cookie.remove("token");
    Cookie.remove("role");
    return router.push("/auth/login");
  }

  return (
    <>
      <header className="">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-black" href="/">
                <span className="sr-only">Home</span>
                <NewsLogo />
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      About{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      History{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      Projects{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      {" "}
                      Blog{" "}
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <button
                    className="btn btn-neutral btn-md"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </button>
                  {/* <button
                    className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button> */}
                  {/* {loggedin ? (
                    <button
                      onClick={handleLogout}
                      className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                        // href="/"
                        onClick={() => router.push("/auth/login")}
                      >
                        Login
                      </button>
                      <div className="hidden sm:flex ">
                        <button
                          className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                          // href="/"
                          onClick={() => router.push("/auth/register")}
                        >
                          Register
                        </button>
                      </div>
                    </>
                  )} */}
                </div>

                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
