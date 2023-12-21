/* eslint-disable @next/next/no-img-element */
import { useUser } from "@/lib/useUser";
import React from "react";
import Cookie from "js-cookie";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const profileId = Cookie.get("user_id");
  const router = useRouter();
  const { user } = useUser(Number(profileId));
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg mt-5"
              src="https://fakeimg.pl/120x120?font=bebas"
              alt=""
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 ">
              {user?.name}
            </h5>
            <span className="text-sm text-gray-500 ">{user?.email}</span>
            <span className="text-sm text-gray-500 ">{user?.phone}</span>
            <span className="text-sm text-gray-500 ">{user?.address}</span>
            <div>
              {user?.isPremiumUser ? (
                <p className="badge badge-success px-2 py-3 text-white text-sm">
                  Premium
                </p>
              ) : (
                <p className="badge badge-error px-2 py-3 text-white text-sm">
                  Not Active
                </p>
              )}
            </div>
            <p>
              Valid until :
              {formatExpirationDate(user?.subscriptionPlan.expired_date)}
            </p>
            <div className="flex mt-4 md:mt-6">
              {!user?.isPremiumUser && (
                <div>
                  <h2
                    onClick={() => router.push("/plans")}
                    className="cursor-pointer"
                  >
                    Become a member to enjoy our best quality news!
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
