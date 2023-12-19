import { BASE_URL } from "@/config/api";
import React, { useEffect } from "react";
import Cookie from "js-cookie";

const PaymentPage = () => {
  const profileId = Cookie.get("user_id");
  const transactionId = Cookie.get("user_id");
  async function requestPayment(
    profileId: number,
    subscriptionType: any,
    totalAmount: number
  ) {
    try {
      const responseTransaction = await fetch(`${BASE_URL}/transactions`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "processed",
        }),
      });

      console.log(responseTransaction);

      if (!responseTransaction.ok) {
        throw new Error("Failed to create transaction record");
      }

      return transactionId;
    } catch (error: any) {
      console.error("Error requesting payment:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    requestPayment(Number(profileId), "monthly", 100);
  }, [profileId, transactionId]);

  return <div>payment here</div>;
};

export default PaymentPage;
