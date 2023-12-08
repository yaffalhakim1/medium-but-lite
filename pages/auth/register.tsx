/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/config/api";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import Cookie from "js-cookie";
import { token } from "@/lib/utils/token";
import { useUsers } from "@/lib/useUser";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [field, setField] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  function fieldHandler(e: any) {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  }

  const { users } = useUsers();

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

      Cookie.set("user_token", token());

      if (register) {
        return router.push("/auth/login");
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        console.log(error.response);
      } else if (error.response.status === 401) {
        console.log(error.response);
      } else if (error.response.status === 400) {
        console.log(error.response);
      }
      setLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className=" md:w-8/12 lg:w-6/12 mb-12 md:mb-0"></div>
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              {/* image  */}
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form onSubmit={handleRegister} method="POST">
                <h1 className="font-bold text-xl text-center mb-2">Register</h1>
                <p className="font-normal text-md text-center mb-4 text-slate-400">
                  Silakan daftarkan akun anda terlebih dahulu
                </p>
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-700 tracking-wide">
                    Name
                  </div>
                  <input
                    type="text"
                    className="w-full text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    placeholder="Name"
                    name="name"
                    onChange={fieldHandler}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-700 tracking-wide">
                    Email
                  </div>
                  <input
                    type="text"
                    className="w-full text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    placeholder="Email"
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
                    placeholder="Password (minimum 8 characters)"
                    name="password"
                    onChange={fieldHandler}
                    // pattern=".{8,}"
                    title="Password must be at least 8 characters long"
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="text-lg font-bold text-gray-700 tracking-wide">
                    Confirm your password
                  </div>
                  <input
                    type="password"
                    className="w-full text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    placeholder="Re-type your password"
                    name="password_confirmation"
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
                      <span className="text-white">Sign you up...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
