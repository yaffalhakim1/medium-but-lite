/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Cookie from "js-cookie";
import { toast } from "sonner";
import { BASE_URL } from "@/config/api";
import { token } from "@/lib/utils/token";
import { User } from "@/types/user-types";
import { validateEmail, validatePassword } from "@/lib/helper/validators";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState({ email: "", password: "" });
  const [validationEmail, setvalidationEmailError] = useState<string | null>(
    null
  );
  const [validationPassword, setvalidationPasswordError] = useState<
    string | null
  >(null);

  function fieldHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setField({
      ...field,
      [e.target.name]: e.target.value,
    });

    if (name === "email") {
      setvalidationEmailError(validateEmail(value));
    }

    if (name === "password") {
      setvalidationPasswordError(validatePassword(value));
    }
  }

  async function handleLogin(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await axios.get<User[]>(
        `${BASE_URL}/profile?email=${field.email}&password=${field.password}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.data[0].role === "user") {
        Cookie.set("token", token());
        Cookie.set("role", "user");
        Cookie.set("user_id", response.data[0].id.toString());
        Cookie.set("isPremium", response.data[0].isPremiumUser.toString());
        return router.push("/");
      }

      if (response.data[0].role === "admin") {
        Cookie.set("token", token());
        Cookie.set("role", "admin");

        return router.push("/admin");
      }

      toast.success("Login berhasil");
    } catch (error: any) {
      if (error.response.status === 500) {
        toast.error("Register gagal, silakan coba lagi");
      } else if (error.response.status === 401) {
        toast.error("Anda belum terdaftar");
      } else if (error.response.status === 400) {
        toast.error("email atau password salah");
      }
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
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
              onSubmit={handleLogin}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
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
                  <p className="text-start mt-2 text-sm text-red-500 border-red-400">
                    {validationEmail}
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
                  title="Password must be at least 8 characters long"
                  required
                />
                {validationPassword && (
                  <p className="text-start mt-2 text-sm text-red-500 border-red-400">
                    {validationPassword}
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
                    <span className="text-white">Logging in...</span>
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
              <button onClick={() => router.push("/auth/register")}>
                <p className="text-slate-400 mt-3 text-sm underline text-center">
                  Not a member? Sign up now
                </p>
              </button>

              <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden "></div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
