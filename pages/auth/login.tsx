/* eslint-disable @next/next/no-img-element */
import axios, { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { toast } from "sonner";
import { validateEmail, validatePassword } from "@/lib/helper/validators";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState({ email: "", password: "" });
  const [validationEmail, setValidationEmailError] = useState<string | null>(
    null
  );
  const [validationPassword, setValidationPasswordError] = useState<
    string | null
  >(null);

  function fieldHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setField({
      ...field,
      [name]: value,
    });

    if (name === "email") {
      setValidationEmailError(validateEmail(value));
    }

    if (name === "password") {
      setValidationPasswordError(validatePassword(value));
    }
  }

  async function handleLogin(e: SyntheticEvent) {
    e.preventDefault();

    if (validationEmail || validationPassword) {
      return;
    }

    setLoading(true);
    try {
      // Credentials are verified server-side (pages/api/auth/login.ts);
      // the server issues the session cookie — the client never sees or
      // generates tokens, and can never claim a role by itself.
      const response = await axios.post<{
        id: number;
        role: string;
        name: string;
        isPremiumUser: boolean;
      }>("/api/auth/login", field, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Login berhasil");
      if (response.data.role === "admin") {
        return router.push("/admin");
      }
      return router.push("/");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const message =
        err.response?.status === 401
          ? "Email atau password salah"
          : err.response?.data?.message || "Login gagal, silakan coba lagi";
      toast.error(message);
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
                disabled={loading}
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
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
