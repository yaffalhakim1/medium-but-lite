import Modal from "@/components/Modal";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/router";

const SuccessPayPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <CheckCircle2 className="w-40 h-40 text-green-600" />
          <h3 className="text-5xl mt-6">Your Payment is Success</h3>
          <button
            onClick={() => router.replace("/")}
            className="btn btn-primary mt-8"
          >
            Start Reading
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessPayPage;
