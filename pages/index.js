import { useEffect, useState } from "react";
import MovieList from "../movies-app/MovieList";
import Navigation from "./navigation/Index";
import Layout from "@/movies-app/Layout";
import useMovieStore from "@/store/movieStore";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function MovieListPage() {
  const { data: session } = useSession();
  console.log("session:", session);
  const {
    movies,
    currentPage,
    maxResults,
    searchInput,
    setMovies,
    setCurrentPage,
    setMaxResults,
  } = useMovieStore();
  //const apiKey = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/movies?searchInput=${searchInput}&currentPage=${currentPage}`;
        /*           searchInput === ""
            ? `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&language=en-US&page=${currentPage}`
            : `https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}&page=${currentPage}`;
 */
        const response = await axios.get(url);

        /*      if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const result = await response.json(); */

        const result = response.data;
        setMovies(result.results);
        setMaxResults(result.total_results);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };
    fetchData();
  }, [currentPage, setMovies, searchInput]);

  console.log("movies", movies);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div>
        <Navigation />
        <Layout />
        <MovieList
          movies={movies}
          setMovies={setMovies}
          onPageClick={handlePaginationClick}
          currentPage={currentPage}
          totalResults={maxResults}
        />
      </div>
    </>
  );
}
