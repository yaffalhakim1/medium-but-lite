import { XCircle } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const FailedPayPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <XCircle className="w-40 h-40 text-red-600" />
          <h3 className="text-5xl mt-6">Your Payment is Failed</h3>
          <button
            className="btn btn-primary mt-8"
            onClick={() => router.replace("/plans")}
          >
            Order Again
          </button>
        </div>
      </div>
    </>
  );
};

export default FailedPayPage;
