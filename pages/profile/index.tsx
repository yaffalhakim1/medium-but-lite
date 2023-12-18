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
        <p>
          {user?.isPremiumUser ? (
            <div className="badge badge-success px-2 py-3 text-white text-sm">
              Active
            </div>
          ) : (
            <div className="badge badge-error px-2 py-3 text-white text-sm">
              Not Active
            </div>
          )}
        </p>
        <p>{formatExpirationDate(user?.expiredDate)}</p>
      </div>
    </>
  );
};

export default ProfilePage;
