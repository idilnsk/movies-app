import { useEffect, useState } from "react";
import useSWR from "swr";
import { SWRConfig } from "swr";
import { GlobalStyle } from "../styles/styles.js";
import Quiz from "../movies-app/Quiz";
import Layout from "../movies-app/Layout.js";
import MovieDetail from "../movies-app/MovieDetail";
import SearchBar from "../movies-app/SearchBar.js";
import MovieCard from "@/movies-app/MovieCard.js";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    // const { data, error, isLoading } = useSWR(url, fetcher);
    console.log("url", url);
    async function fetchData() {
      const data = await fetch(url);
      const result = await data.json();
      console.log("RESULT", result);
      setData(result);
    }
    fetchData();
  }, [currentPage, apiKey]);

  console.log("data", data);

  // if (error) return <div> failed to load!</div>;
  // if (isLoading) return <div>loading...</div>;
  console.log("currentPage", currentPage);
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 
  //log the data, call setmovies pass in the needed props, remove the key to .env//
  if (!data) {
    return;
  }
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Component
          {...pageProps}
          movies={data}
          setMovies={setMovies}
          onPageClick={handlePaginationClick}
          currentPage={currentPage}
        />
        <Layout />
      </SWRConfig>
    </>
  );
}
