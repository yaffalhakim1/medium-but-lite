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
      <div className="flex flex-col justify-center items-center">
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <p>{user?.phone}</p>
        <p>{user?.address}</p>
        <div>
          Subscription Status:{" "}
          {user?.isPremiumUser ? (
            <p className="badge badge-success px-2 py-3 text-white text-sm">
              Active
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
    </>
  );
};

export default ProfilePage;
