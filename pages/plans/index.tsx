import { CheckCircle, NewsLogo, XCircle } from "@/components/Icons";
import Modal from "@/components/Modal";
import { BASE_URL } from "@/config/api";
import React from "react";
import QRCode from "react-qr-code";
import Cookie from "js-cookie";

const PlansPage = () => {
  const profileId = Cookie.get("user_id");
  const transactionId = Cookie.get("user_id");

  async function requestPayment(
    profileId: number,
    subscriptionType: any,
    totalAmount: any
  ) {
    try {
      const transaction = {
        profileId: profileId,
        id: transactionId,
        type: subscriptionType,
        trans_date: new Date(),
        status: "processed",
        totalPaid: totalAmount,
      };

      const responseTransaction = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!responseTransaction.ok) {
        throw new Error("Failed to create transaction record");
      }

      // const userProfile = await fetch(`${BASE_URL}/profile/${profileId}`);
      // const userData = await userProfile.json();

      // userData.subscriptionPlan = {
      //   type: subscriptionType,
      //   expired_date: calculateNewExpirationDate(
      //     userData.subscriptionPlan.expired_date,
      //     subscriptionType
      //   ),
      // };

      // const responseProfile = await fetch(`${BASE_URL}/profile/${profileId}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(userData),
      // });

      // if (!responseProfile.ok) {
      //   throw new Error("Failed to update user profile");
      // }

      return transactionId;
    } catch (error: any) {
      console.error("Error requesting payment:", error.message);
      throw error;
    }
  }

  function calculateNewExpirationDate(
    currentExpirationDate: any,
    subscriptionType: any
  ) {
    const currentDate = new Date(currentExpirationDate);
    if (subscriptionType === "monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (subscriptionType === "yearly") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return currentDate.toISOString().split("T")[0];
  }

  return (
    <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 ">
      <div className="flex justify-center items-center">
        <NewsLogo />
      </div>
      <h2 className="text-4xl text-center">
        Support great writing and access all stories on Medium.
      </h2>
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

              <span className="text-sm font-medium text-gray-700">/month</span>
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

              <span className="text-sm font-medium text-gray-700">/month</span>
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
    </div>
  );
};

export default PlansPage;
