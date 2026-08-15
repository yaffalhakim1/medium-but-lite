import { BASE_URL } from "@/config/api";
import React, { useState } from "react";
import Cookie from "js-cookie";
import { useTransactionById } from "@/lib/useTransaction";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";
import QRCode from "react-qr-code";

const PaymentPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const userId = Cookie.get("user_id");
  const [paying, setPaying] = useState(false);

  const {
    transactionDetail,
    transactionMutate,
    transactionLoading,
  } = useTransactionById(Number(id));

  // The invoice is for THIS transaction (from the URL) and must belong to
  // the current user — never the "last transaction in the database".
  const isOwner =
    transactionDetail &&
    userId &&
    transactionDetail.profileId === Number(userId);

  async function requestPayment() {
    setPaying(true);
    try {
      const response = await fetch(
        `${BASE_URL}/transactions/${transactionDetail?.id}`,
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
      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }
      // Refetch from the server — passing the old object back would keep
      // the stale "waiting payment" status forever.
      await transactionMutate();
      toast.success("Payment requested, please wait");
    } catch (error: any) {
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setPaying(false);
    }
  }

  if (transactionLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!transactionDetail || !isOwner) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">Transaction not found</p>
        <button
          className="btn btn-neutral btn-sm"
          onClick={() => router.push("/plans")}
        >
          Back to Plans
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div>
        {transactionDetail.status === "success" && (
          <div className="flex flex-col justify-center items-center mt-8">
            <CheckCircle2 size={150} className="text-green-600" />
            <p className="text-2xl font-semibold">Thank You!</p>
            <p className="text-gray-500">
              Your payment was successful — you are now a premium member.
            </p>
          </div>
        )}

        {transactionDetail.status === "cancelled" && (
          <div className="flex flex-col justify-center items-center mt-8">
            <XCircle size={150} className="text-red-600" />
            <p className="text-2xl font-semibold">Payment Failed</p>
            <p className="text-gray-500">
              Your payment was not completed. Please try again.
            </p>
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
            <p className="capitalize ">{transactionDetail.status}</p>
            <p>{transactionDetail.totalPaid}$</p>
            <p className="capitalize font-semibold">{transactionDetail.type}</p>
          </div>
        </div>

        {/* Mock payment QR — encodes this transaction's invoice URL. */}
        {transactionDetail.status === "" && (
          <div className="flex flex-col justify-center items-center mt-8">
            <p className="mb-4 text-sm text-gray-500">
              Scan to pay (demo) — or click the button below
            </p>
            <QRCode
              size={200}
              style={{ height: "auto" }}
              value={`${BASE_URL}/plans/payment/${transactionDetail.id}`}
            />
            <button
              className="btn btn-primary w-full mt-6"
              disabled={paying}
              onClick={requestPayment}
            >
              {paying ? "Processing..." : "Click here to pay"}
            </button>
          </div>
        )}

        {transactionDetail.status === "processed" && (
          <div className="flex flex-col justify-center items-center mt-8 bg-yellow-500 p-8 rounded-md mx-8">
            <p className="text-center font-semibold">
              Payment is being processed — the admin will confirm your
              transaction shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
