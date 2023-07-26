import { SWRConfig } from "swr";
import "../styles/globals.css";
import MovieListPage from "./index";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{}}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
