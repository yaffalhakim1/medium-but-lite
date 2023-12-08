/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Cookie from "js-cookie";
import { toast } from "sonner";
import { BASE_URL } from "@/config/api";
import { token } from "@/lib/utils/token";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState({ email: "", password: "" });

  function fieldHandler(e: ChangeEvent<HTMLInputElement>) {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await axios.get(
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
        return router.push("/news");
      } else if (response.data[0].role === "admin") {
        Cookie.set("token", token());
        return router.push("/admin");
      }

      toast.success("Login berhasil");

      return router.push("/admin");
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
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              {/* image here */}
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-10">
              <form onSubmit={handleLogin} method="POST">
                <h1 className="font-bold text-xl text-center mb-2">Login</h1>
                <p className="font-normal text-md text-center mb-6 text-slate-400">
                  Untuk masuk ke aplikasi anda
                </p>
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-700 tracking-wide">
                    email
                  </div>
                  <input
                    type="text"
                    className="w-full text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    placeholder="email"
                    name="email"
                    onChange={fieldHandler}
                    required
                  />
                </div>

                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <input
                    type="password"
                    className="w-full text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    placeholder="Password"
                    name="password"
                    onChange={fieldHandler}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full capitalize text-white"
                  onClick={() => setLoading(true)}
                >
                  {loading ? (
                    <div className="flex flex-row items-center">
                      {/* <TailSpin /> */}
                      <span className="capitalize">Signing you in...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                <button onClick={() => router.push("/auth/register")}>
                  <p className="text-slate-400 mt-3 text-sm underline text-center">
                    Belum memiliki akun? Daftar disini
                  </p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
