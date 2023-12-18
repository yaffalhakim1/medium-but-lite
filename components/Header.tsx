import Link from "next/link";
import React, { useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { NewsLogo } from "./Icons";
import useAuthStore from "@/store/useAuthStore";
import { useUsers } from "@/lib/useUser";

const Navbar = () => {
  const router = useRouter();
  const token = Cookie.get("token");
  const authed = useAuthStore((state) => state.isLoggedIn);
  const setAuthed = useAuthStore((state) => state.setIsLoggedIn);
  // const [isAuthed, setIsAUthed] = React.useState(false);

  useEffect(() => {
    if (token) {
      setAuthed(true);
    }
  }, [setAuthed, token]);

  function handleLogout() {
    Cookie.remove("token");
    Cookie.remove("role");
    Cookie.remove("user_id");
    Cookie.remove("isPremium");
    return router.replace("/auth/login");
  }

  return (
    <>
      <header className="">
        <div className="mx-auto max-w-screen-xl ">
          <div className="flex h-16 items-center justify-evenly">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-black" href="/">
                <NewsLogo />
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-5">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </nav>

              {authed ? (
                <>
                  <div className="flex space-x-2">
                    <div className="block ">
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="avatar placeholder"
                        >
                          <div className="bg-neutral text-neutral-content rounded-full w-10">
                            <span>SY</span>
                          </div>
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a onClick={() => router.push("/profile")}>
                              Profile
                            </a>
                          </li>
                          <li>
                            <a onClick={() => router.push("/plans")}>
                              Your Subscription
                            </a>
                          </li>
                          <li>
                            <button
                              className="btn btn-neutral btn-md"
                              onClick={handleLogout}
                            >
                              logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="sm:flex sm:gap-4">
                    <button
                      className="btn btn-neutral btn-md"
                      onClick={() => router.push("/auth/login")}
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
