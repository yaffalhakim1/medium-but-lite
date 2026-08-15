import { CheckCircle, InfoCircle, NewsLogo, XCircle } from "@/components/Icons";
import Modal from "@/components/Modal";
import React from "react";
import Cookie from "js-cookie";
import { useTransaction } from "@/lib/useTransaction";
import { formatExpirationDate } from "@/lib/utils/user-subs";
import { CheckCircle2, Newspaper } from "lucide-react";
import { BASE_URL } from "@/config/api";
import { toast } from "sonner";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/router";

const PlansPage = () => {
  const router = useRouter();
  const userId = Cookie.get("user_id");
  const [paying, setPaying] = React.useState<"monthly" | "yearly" | null>(null);
  const { transaction } = useTransaction({});
  const { user } = useUser(Number(userId));

  // An "ongoing" transaction belongs to the current user — not the last
  // row in the whole database.
  const hasOngoingTransaction = transaction?.some(
    (t) => t.profileId === Number(userId) && t.status === "processed"
  );

  async function requestPayment(subscriptionType: string, totalAmount: number) {
    if (!userId) {
      toast.error("Silakan login terlebih dahulu");
      router.push("/auth/login");
      return;
    }

    setPaying(subscriptionType as "monthly" | "yearly");
    try {
      const transactionPost = {
        email: user?.email,
        type: subscriptionType,
        trans_date: new Date().toISOString(),
        status: "",
        totalPaid: totalAmount,
        profileId: Number(userId),
      };

      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionPost),
      });
      if (!response.ok) {
        throw new Error("Failed to create transaction record");
      }
      const created = await response.json();

      // Move to the invoice/payment page for this specific transaction.
      setPaying(null);
      router.push(`/plans/payment/${created.id}`);
    } catch (error: any) {
      setPaying(null);
      toast.error(`Payment failed: ${error.message}`);
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

      {hasOngoingTransaction ? (
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
                openButton={paying === "monthly" ? "Processing..." : "Get Started"}
                openButtonClassname="btn btn-primary w-full"
                modalButton="Continue to Payment"
                modalButtonClassname="justify-center items-center"
                onSubmit={() => requestPayment("monthly", 20)}
              >
                <div className="mx-auto flex flex-col justify-center items-center">
                  <p>
                    You gonna pay for{" "}
                    <span className=" font-bold">Monthly</span> plans for{" "}
                  </p>
                  <span className="font-bold text-blue-600 text-2xl">20$</span>
                  <p className="mt-2">
                    For now we only have QRIS Payment Method — you will be
                    redirected to the invoice page where the QR is generated.
                  </p>
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
                openButton={paying === "yearly" ? "Processing..." : "Get Started"}
                openButtonClassname="btn btn-primary w-full"
                modalButton="Continue to Payment"
                modalButtonClassname="justify-center items-center"
                onSubmit={() => requestPayment("yearly", 30)}
              >
                <div className="mx-auto flex flex-col justify-center items-center">
                  <p>
                    You gonna pay for <span className=" font-bold">Yearly</span>{" "}
                    plans for{" "}
                  </p>
                  <span className="font-bold text-blue-600 text-2xl">30$</span>
                  <p className="mt-2">
                    For now we only have QRIS Payment Method — you will be
                    redirected to the invoice page where the QR is generated.
                  </p>
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
