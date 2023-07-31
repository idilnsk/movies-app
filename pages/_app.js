import { SWRConfig } from "swr";
import "../styles/globals.css";
import MovieListPage from "./index";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps:{session,...pageProps}, }) {
  return (
    <>
    <SessionProvider session={session}>
      <SWRConfig value={{}}>
        <Component {...pageProps} />
      </SWRConfig>
      </SessionProvider>
    </>
  );
}
