import { BASE_URL } from "@/config/api";
import React, { useEffect } from "react";
import Cookie from "js-cookie";
import { useTransactionById } from "@/lib/useTransaction";

const PaymentPage = () => {
  const profileId = Cookie.get("user_id");
  const transactionId = Cookie.get("user_id");
  const { transaction, transactionMutate } = useTransactionById(
    Number(profileId)
  );
  async function requestPayment(
    profileId: number,
    subscriptionType: any,
    totalAmount: number
  ) {
    try {
      const transactionPost = {
        profileId: profileId,
        type: subscriptionType,
        trans_date: new Date(),
        status: "processed",
        totalPaid: totalAmount,
      };

      const responseTransactionPost = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionPost),
      });
      if (!responseTransactionPost.ok) {
        throw new Error("Failed to create transaction record");
      }

      transactionMutate(transaction);
      console.log("transaction", transaction);

      // return transactionId;
    } catch (error: any) {
      console.error("Error requesting payment:", error.message);
      // throw error;
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="btn btn-primary"
        onClick={async () => {
          const transactionId = await requestPayment(
            Number(profileId),
            "monthly",
            20
          );
          console.log(transactionId);
        }}
      >
        Click here to pay
      </button>
    </div>
  );
};

export default PaymentPage;
