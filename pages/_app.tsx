import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import Layout from "./layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} /> <Toaster richColors closeButton />
    </Layout>
  );
}
