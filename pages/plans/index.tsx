import { CheckCircle, InfoCircle, NewsLogo, XCircle } from "@/components/Icons";
import Modal from "@/components/Modal";
import React from "react";
import QRCode from "react-qr-code";
import Cookie from "js-cookie";
import { useTransaction, useTransactionById } from "@/lib/useTransaction";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { CheckCircle2, Newspaper } from "lucide-react";
import { BASE_URL } from "@/config/api";
import { toast } from "sonner";
import { useUser, useUsers } from "@/lib/useUser";

const PlansPage = () => {
  const userId = Cookie.get("user_id");
  const [showQr, setShowQr] = React.useState(false);
  const { transaction } = useTransaction({});
  const lastElement = transaction?.[transaction.length - 1];
  const { user } = useUser(Number(userId));

  const { transactionDetail, transactionMutate } = useTransactionById(
    lastElement?.id!
  );

  async function requestPayment(
    // profileId: number,
    // email: string,
    subscriptionType: string,
    totalAmount: number
  ) {
    try {
      const transactionPost = {
        email: user?.email,
        type: subscriptionType,
        trans_date: new Date(),
        status: "",
        totalPaid: totalAmount,
        profileId: Number(userId),
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

      transactionMutate(transactionDetail);
    } catch (error: any) {
      toast.error(`Payment failed`, error.message);
    }
  }

  return (
    <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8 ">
      <div className="flex justify-center items-center">
        <Newspaper size={60} />
      </div>
      <h2 className="text-3xl text-center">
        Support great writing and access all news on Medium Lite.
      </h2>

      {user?.isPremiumUser === true && (
        <div className="flex justify-center items-center  mt-8">
          <CheckCircle2 className="text-green-500" size={60} />
          <div className=" flex flex-col justify-center items-center">
            <h2>
              Your Current subscription is{" "}
              <span className="font-semibold capitalize">
                {user?.subscriptionPlan.type}
              </span>
            </h2>
            <p>
              Valid until{" "}
              {formatExpirationDate(user?.subscriptionPlan.expired_date)}
            </p>
          </div>
        </div>
      )}

      {transactionDetail?.status === "processed" ? (
        <div className="flex space-x-2  justify-center items-center mt-8 container bg-yellow-500 p-8 rounded-md">
          <InfoCircle />
          <p className="text-center ">
            you have ongoing transaction, please wait until the transaction is
            completed
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-8">
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 sm:px-8">
              <h2 className="text-lg font-medium text-gray-900">
                Starter
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              <p className="mt-2 mb-5 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {" "}
                  20${" "}
                </strong>

                <span className="text-sm font-medium text-gray-700">
                  /month
                </span>
              </p>

              <Modal
                openButton={"Get Started"}
                openButtonClassname="btn btn-primary w-full"
                modalButton="Done"
                modalButtonClassname="justify-center items-center"
              >
                <div className="mx-auto flex flex-col justify-center items-center">
                  <p>
                    You gonna pay for{" "}
                    <span className=" font-bold">Monthly</span> plans for{" "}
                  </p>
                  <span className="font-bold text-blue-600 text-2xl">20$</span>
                  <p>For now we only have QRIS Payment Method</p>
                  <button
                    onClick={() => {
                      setShowQr(!showQr);
                      requestPayment("monthly", 20);
                    }}
                  >
                    Click here to show QR
                  </button>

                  {showQr && (
                    <QRCode
                      size={256}
                      style={{ height: "auto" }}
                      className="mb-6 mt-6"
                      value={`${BASE_URL}/plans/payment/${userId}`}
                    />
                  )}
                </div>
              </Modal>
            </div>

            <div className="p-6 sm:px-8">
              <p className="text-lg font-medium text-gray-900 sm:text-xl">
                Whats included:
              </p>

              <ul className="mt-2 space-y-2 sm:mt-4">
                <li className="flex items-center gap-1">
                  <CheckCircle />

                  <span className="text-gray-700"> 10 users </span>
                </li>

                <li className="flex items-center gap-1">
                  <CheckCircle />

                  <span className="text-gray-700"> 2GB of storage </span>
                </li>

                <li className="flex items-center gap-1">
                  <CheckCircle />

                  <span className="text-gray-700"> Email support </span>
                </li>

                <li className="flex items-center gap-1">
                  <XCircle />

                  <span className="text-gray-700"> Help center access </span>
                </li>

                <li className="flex items-center gap-1">
                  <XCircle />

                  <span className="text-gray-700"> Phone support </span>
                </li>

                <li className="flex items-center gap-1">
                  <XCircle />

                  <span className="text-gray-700"> Community access </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 sm:px-8">
              <h2 className="text-lg font-medium text-gray-900">
                Pro
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              <p className="mt-2 mb-5 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {" "}
                  30${" "}
                </strong>

                <span className="text-sm font-medium text-gray-700">/year</span>
              </p>

              <Modal
                openButton={"Get Started"}
                openButtonClassname="btn btn-primary w-full"
                modalButton="Done"
                modalButtonClassname="justify-center items-center"
              >
                <div className="mx-auto flex flex-col justify-center items-center">
                  <p>
                    You gonna pay for <span className=" font-bold">Yearly</span>{" "}
                    plans for{" "}
                  </p>
                  <span className="font-bold text-blue-600 text-2xl">30$</span>
                  <p>For now we only have QRIS Payment Method</p>
                  <button
                    onClick={() => {
                      setShowQr(!showQr);
                      requestPayment("yearly", 30);
                    }}
                  >
                    Click here to show QR
                  </button>

                  {showQr && (
                    <QRCode
                      size={256}
                      style={{ height: "auto" }}
                      className="mb-6 mt-6 "
                      value={`${BASE_URL}/plans/payment/${userId}`}
                    />
                  )}
                </div>
              </Modal>
            </div>

            <div className="p-6 sm:px-8">
              <p className="text-lg font-medium text-gray-900 sm:text-xl">
                Whats included:
              </p>

              <ul className="mt-2 space-y-2 sm:mt-4">
                <li className="flex items-center gap-1">
                  <CheckCircle />

                  <span className="text-gray-700"> 20 users </span>
                </li>

                <li className="flex items-center gap-1">
                  <CheckCircle />

                  <span className="text-gray-700"> 5GB of storage </span>
                </li>

                <li className="flex items-center gap-1">
                  <CheckCircle />

                  <span className="text-gray-700"> Email support </span>
                </li>

                <li className="flex items-center gap-1">
                  <CheckCircle />

                  <span className="text-gray-700"> Help center access </span>
                </li>

                <li className="flex items-center gap-1">
                  <XCircle />

                  <span className="text-gray-700"> Phone support </span>
                </li>

                <li className="flex items-center gap-1">
                  <XCircle />

                  <span className="text-gray-700"> Community access </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansPage;
