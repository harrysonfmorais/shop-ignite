import { Header } from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-rows-app gap-5 p-8">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
