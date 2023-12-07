/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import NewsCard from "@/components/NewsCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <NewsCard
        title={""}
        description={""}
        image={""}
        category={""}
        isPremium={false}
      />
    </main>
  );
}
