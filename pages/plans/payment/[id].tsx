import { BASE_URL } from "@/config/api";
import React from "react";
import Cookie from "js-cookie";
import { useTransactionById } from "@/lib/useTransaction";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { BadgeCheck, CheckCircle2 } from "lucide-react";

const PaymentPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { transaction, transactionMutate } = useTransactionById(Number(id));
  async function requestPayment() {
    try {
      const responseTransactionPost = await fetch(
        `${BASE_URL}/transactions/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "processed",
          }),
        }
      );
      if (!responseTransactionPost.ok) {
        throw new Error("Failed to create transaction record");
      }
      transactionMutate(transaction);
      console.log("transaction", transaction);
    } catch (error: any) {
      toast.error(`Payment failed`, error.message);
    }
  }

  return (
    <div className="h-screen">
      <div>
        {transaction?.status === "success" && (
          <div className="flex flex-col justify-center items-center mt-5">
            <CheckCircle2 size={150} className="text-green-600" />
            <p className="text-2xl font-semibold">Thank You!</p>
          </div>
        )}
        <p className="font-semibold text-lg ml-8 mt-8">Your Invoice</p>

        <div className="flex justify-between items-center mx-8 mt-5">
          <div>
            <p>Payment Status: </p>
            <p>Payment Total: </p>
            <p>Subscription Type: </p>
          </div>

          <div>
            <p className="capitalize ">{transaction?.status}</p>
            <p>{transaction?.totalPaid}$</p>

            <p className="capitalize font-semibold">{transaction?.type}</p>
          </div>
        </div>
      </div>

      <div>
        {transaction?.status === "" && (
          <button
            className="btn btn-primary"
            onClick={async () => {
              const transactionId = await requestPayment();
              toast.success(`Payment requested, please wait`);
            }}
          >
            Click here to pay
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
