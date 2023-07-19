import { useState } from "react";
import useSWR from "swr";
import { SWRConfig } from "swr";
import { GlobalStyle } from "../styles/styles.js";
import Quiz from "../movies-app/Quiz";
import Layout from "../movies-app/Layout.js";
import MovieDetail from "../movies-app/MovieDetail";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&language=en-US&with_genres=14`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  console.log("data", data);

  if (error) return <div> failed to load!</div>;
  if (isLoading) return <div>loading...</div>;

  //log the data, call setmovies pass in the needed props, remove the key to .env//

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Component {...pageProps} movies={data} setMovies={setMovies} />
        <Layout />
      </SWRConfig>
    </>
  );
}
