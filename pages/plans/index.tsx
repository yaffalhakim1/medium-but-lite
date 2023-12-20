import { CheckCircle, InfoCircle, NewsLogo, XCircle } from "@/components/Icons";
import Modal from "@/components/Modal";
import { BASE_URL } from "@/config/api";
import React from "react";
import QRCode from "react-qr-code";
import Cookie from "js-cookie";
import { useTransactionById } from "@/lib/useTransaction";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { CheckCircle2, Newspaper } from "lucide-react";

const PlansPage = () => {
  const profileId = Cookie.get("user_id");
  const transactionId = Cookie.get("user_id");
  const router = useRouter();
  const [showQr, setShowQr] = React.useState(false);

  const { transaction, transactionMutate } = useTransactionById(
    Number(profileId)
  );

  // if (transaction?.status === "success") {
  //   router.push("/plans/success");
  // }
  // if (transaction?.status === "canceled") {
  //   router.push("/plans/failed");
  // }

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

      // return transactionId;
    } catch (error: any) {
      console.error("Error requesting payment:", error.message);
      throw error;
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

      {transaction?.status === "success" && (
        <div className="flex justify-center items-center  mt-8">
          <CheckCircle2 className="text-green-500" size={60} />
          <div className=" flex flex-col justify-center items-center">
            <h2>
              Your Current subscription is{" "}
              <span className="font-semibold capitalize">
                {transaction.type}
              </span>
            </h2>
            <p>Valid until {formatExpirationDate(transaction.trans_date)}</p>
          </div>
        </div>
      )}

      {transaction?.status === "processed" ? (
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
                modalButton={"Pay"}
                openButtonClassname="btn btn-primary w-full"
                onSubmit={async () => {
                  const transactionId = await requestPayment(
                    Number(profileId),
                    "monthly",
                    20
                  );
                }}
              >
                <div className="mx-auto flex flex-col justify-center items-center">
                  <p>
                    You gonna pay for{" "}
                    <span className=" font-bold">Monthly</span> plans for{" "}
                  </p>
                  <span className="font-bold text-blue-600 text-2xl">20$</span>
                  <p>For now we only have QRIS Payment Method</p>
                  <button onClick={() => setShowQr(!showQr)}>
                    Click here to show QR
                  </button>

                  {showQr && (
                    <QRCode
                      size={256}
                      style={{ height: "auto" }}
                      className="mb-6 mt-6 "
                      value={`10.20.191.157:3000/plans/payment`}
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

                <span className="text-sm font-medium text-gray-700">
                  /month
                </span>
              </p>

              <Modal
                openButton={"Get Started"}
                modalButton={"Pay"}
                openButtonClassname="btn btn-primary w-full"
                onSubmit={async () => {
                  const transactionId = await requestPayment(
                    Number(profileId),
                    "yearly",
                    30
                  );
                }}
              >
                <div className="mx-auto flex flex-col justify-center items-center">
                  <p>
                    You gonna pay for <span className=" font-bold">Yearly</span>{" "}
                    plans for{" "}
                  </p>
                  <span className="font-bold text-blue-600 text-2xl">30$</span>
                  <p>For now we only have QRIS Payment Method</p>
                  <button onClick={() => setShowQr(!showQr)}>
                    Click here to show QR
                  </button>

                  {showQr && (
                    <QRCode
                      size={256}
                      style={{ height: "auto" }}
                      className="mb-6 mt-6 "
                      value={`10.20.191.157:3000/plans/payment`}
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

      {/* {transaction?.status === "processed" ? (
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

              <p className="mt-2 sm:mt-4">
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
                modalTitle={"Pay Your Subs"}
                modalButton={"Pay"}
                openButtonClassname="btn btn-primary w-full"
                onSubmit={async () => {
                  const transactionId = await requestPayment(
                    Number(profileId),
                    "monthly",
                    20
                  );
                  console.log("Transaction ID:", transactionId);
                }}
              >
                <div>
                  <h3>Tes</h3>
                  <p>You gonna pay for monthly plans for 20$</p>
                  <p>For now we only have QRIS Payment Method</p>
                  <QRCode size={256} style={{ height: "auto" }} value="hey" />
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

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {" "}
                  30${" "}
                </strong>

                <span className="text-sm font-medium text-gray-700">
                  /month
                </span>
              </p>

              <Modal
                openButton={"Get Started"}
                modalTitle={"Pay Your Subs"}
                modalButton={"Pay"}
                openButtonClassname="btn btn-primary w-full"
                onSubmit={async () => {
                  const transactionId = await requestPayment(
                    Number(profileId),
                    "monthly",
                    30
                  );
                  console.log("Transaction ID:", transactionId);
                }}
              >
                <div>
                  <h3>Tes</h3>
                  <p>You gonna pay for yearly plans for 50$</p>
                  <p>For now we only have QRIS Payment Method</p>
                  <QRCode size={256} style={{ height: "auto" }} value="gey" />
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
      )} */}
    </div>
  );
};

export default PlansPage;
