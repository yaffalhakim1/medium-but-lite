/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/config/api";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";

import { useUsers } from "@/lib/useUser";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [field, setField] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: Number,
    address: "",
    role: "user",
    isPremiumUser: false,
    news: [],
    referral: "",
    subscriptionPlan: {
      type: "",
      expired_date: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationEmail, setvalidationEmailError] = useState<string | null>(
    null
  );
  const [validationPassword, setvalidationPasswordError] = useState<
    string | null
  >(null);
  const [validationConfirmPass, setValidationConfirmPassError] = useState<
    string | null
  >(null);

  const [validationPhone, setvalidationPhoneError] = useState<string | null>(
    null
  );
  const [validationAddress, setvalidationAddressError] = useState<
    string | null
  >(null);

  function fieldHandler(e: ChangeEvent<HTMLInputElement>) {
    const ev = e.target;

    setField({
      ...field,
      [e.target.name]: e.target.value,
    });

    if (ev.name === "name") {
      const nameValue = ev.value;
      const error = nameValue.includes("@")
        ? "Name cannot contain any symbol or number"
        : null;
      setValidationError(error);
    }

    if (ev.name === "email") {
      const email = ev.value;

      const emailError =
        !email.includes("@") || !email.includes(".")
          ? "Email must include @ symbol"
          : null;
      setvalidationEmailError(emailError);
    }

    if (ev.name === "phone") {
      const phone = ev.value;
      const phoneError =
        Number(phone) < 10 ? "The minimum character is 10" : null;

      setvalidationPhoneError(phoneError);
    }

    if (ev.name === "address") {
      const address = ev.value;
      const addressError =
        address.length < 10 ? "The minimum character is 10" : null;

      setvalidationAddressError(addressError);
    }

    const pass = ev.name === "password";
    const conf_pass = ev.name === "confirm_password";

    if (conf_pass) {
      const confirmPassError =
        conf_pass != pass ? "Confirmation Password didn't match" : null;
      setValidationConfirmPassError(confirmPassError);
    }

    if (pass) {
      const pass = ev.value;
      const passError = Number(pass) < 8 ? "The minimum character is 8" : null;

      setvalidationPasswordError(passError);
    }
  }

  const { users } = useUsers({});

  async function handleRegister(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const register = await axios.post(`${BASE_URL}/profile`, field, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      if (users?.find((user) => user.email === field.email)) {
        toast.error("Email sudah terdaftar");
        return;
      }

      if (register) {
        return router.push("/auth/login");
      }
    } catch (error: any) {
      const err = error as AxiosError;
      if (err.status === 404) {
        toast.error("register gagal, silakan coba lagi");
      }
      setLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <section className="min-h-screen flex items-stretch text-white ">
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center bg-[url('/news.jpg')]">
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Read News Like Pro
            </h1>
            <p className="text-3xl my-4">
              Read news with full and clear experience
            </p>
          </div>
          <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
            Image source from Unsplash
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-[#161616]">
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center bg-[url('/news.jpg')]">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="my-6 text-4xl font-semibold">Medium Lite</h1>

            <form
              onSubmit={handleRegister}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-4">
                <input
                  type="text"
                  className={`block w-full p-4 text-lg rounded-sm bg-black focus:border-indigo-500 ${
                    validationError && "input-error "
                  }`}
                  placeholder="Name"
                  name="name"
                  onChange={fieldHandler}
                  required
                />
                {validationError && (
                  <p className="mt-2 text-sm text-red-500 border-red-400">
                    {validationError}
                  </p>
                )}
              </div>
              <div className="pb-2 pt-4">
                <input
                  type="email"
                  className={`block w-full p-4 text-lg rounded-sm bg-black focus:border-indigo-500 ${
                    validationEmail && "input-error "
                  }`}
                  placeholder="Email"
                  name="email"
                  onChange={fieldHandler}
                  required
                />
                {validationEmail && (
                  <p className="text-start mt-2   text-sm text-red-500 border-red-400">
                    {validationEmail}
                  </p>
                )}
              </div>
              <div className="pb-2 pt-4">
                <input
                  type="number"
                  className={`block w-full p-4 text-lg rounded-sm bg-black focus:border-indigo-500 ${
                    validationPhone && "input-error "
                  }`}
                  placeholder="Phone"
                  name="phone"
                  onChange={fieldHandler}
                  required
                />
                {validationPhone && (
                  <p className="mt-2 text-start  text-sm text-red-500 border-red-400">
                    {validationPhone}
                  </p>
                )}
              </div>
              <div className="pb-2 pt-4">
                <input
                  type="text"
                  className={`block w-full p-4 text-lg rounded-sm bg-black focus:border-indigo-500 ${
                    validationAddress && "input-error "
                  }`}
                  placeholder="Address"
                  name="address"
                  onChange={fieldHandler}
                  required
                />
                {validationAddress && (
                  <p className="mt-2 text-start  text-sm text-red-500 border-red-400">
                    {validationAddress}
                  </p>
                )}
              </div>
              <div className="pb-2 pt-4">
                <input
                  type="password"
                  className={`block w-full p-4 text-lg rounded-sm bg-black focus:border-indigo-500 ${
                    validationPassword && "input-error "
                  }`}
                  placeholder="Password (minimum 8 characters)"
                  name="password"
                  onChange={fieldHandler}
                  // pattern=".{8,}"
                  title="Password must be at least 8 characters long"
                  required
                />
                {validationPassword && (
                  <p className="mt-2 text-start  text-sm text-red-500 border-red-400">
                    {validationPassword}
                  </p>
                )}
              </div>
              <div className="pb-2 pt-4">
                <input
                  type="password"
                  className={`block w-full p-4 text-lg rounded-sm bg-black focus:border-indigo-500 ${
                    validationConfirmPass && "input-error "
                  }`}
                  placeholder="Re-type your password"
                  name="confirm_password"
                  onChange={fieldHandler}
                  required
                />
                {validationConfirmPass && (
                  <p className="mt-2 text-start  text-sm text-red-500 border-red-400">
                    {validationConfirmPass}
                  </p>
                )}
              </div>
              <div className="pb-2 pt-4">
                <input
                  type="email"
                  className={`block w-full p-4 text-lg rounded-sm bg-black focus:border-indigo-500 ${
                    validationEmail && "input-error "
                  }`}
                  placeholder="Referral"
                  name="referral"
                  onChange={fieldHandler}
                  required
                />
                {validationEmail && (
                  <p className="mt-2 text-start  text-sm text-red-500 border-red-400">
                    {validationEmail}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn mt-5 btn-primary w-full capitalize text-white"
                onClick={() => setLoading(true)}
              >
                {loading ? (
                  <div className="flex flex-row items-center">
                    <span className="text-white">Sign you up...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
              <button onClick={() => router.push("/auth/login")}>
                <p className="text-slate-400 mt-3 text-sm underline text-center">
                  Have an account? Login
                </p>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
