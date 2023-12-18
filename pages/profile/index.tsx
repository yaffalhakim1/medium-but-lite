import { useUser } from "@/lib/useUser";
import React from "react";
import Cookie from "js-cookie";
import { formatExpirationDate } from "@/lib/utils/user-subs";

const ProfilePage = () => {
  // including  phone number, and address.

  const profileId = Cookie.get("user_id");
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
        <p>Valid until :{formatExpirationDate(user?.expiredDate)}</p>
      </div>
    </>
  );
};

export default ProfilePage;
