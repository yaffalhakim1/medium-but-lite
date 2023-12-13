import Navbar from "@/components/Header";
import { Noticia_Text, Taviraj } from "next/font/google";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

type Layout = {
  children: ReactNode;
};
const taviraj = Noticia_Text({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Layout({ children }: Layout) {
  const router = useRouter();

  if (router.pathname.includes("/auth/login")) return children;
  if (router.pathname.includes("/auth/register")) return children;
  if (router.pathname.includes("/admin")) return children;

  return (
    <>
      <div className={`md:px-40 mx-auto ${taviraj.className} `}>
        <Navbar />
        {children}
      </div>
    </>
  );
}
