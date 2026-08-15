import Navbar from "@/components/Header";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

type Layout = {
  children: ReactNode;
};
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Layout({ children }: Layout) {
  const router = useRouter();

  if (router.pathname.includes("/auth/login")) return children;
  if (router.pathname.includes("/auth/register")) return children;
  if (router.pathname.includes("/admin")) return children;
  if (router.pathname.includes("/payment")) return children;

  return (
    <>
      <div className={`md:px-40 px-5 mx-auto ${jakartaSans.className} `}>
        <Navbar />
        {children}
      </div>
    </>
  );
}
