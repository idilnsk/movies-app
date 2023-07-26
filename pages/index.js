import { useEffect, useState } from "react";
import MovieList from "../movies-app/MovieList";
import Navigation from "./navigation/Index";
import Layout from "@/movies-app/Layout";
import useMovieStore from "@/store/movieStore";
//const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function MovieListPage() {
  const { movies, currentPage, maxResults, searchInput, setMovies, setCurrentPage, setMaxResults } = useMovieStore();
  const apiKey = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const url =
      searchInput === ""
        ? `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&language=en-US&page=${currentPage}`
        : `https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}&page=${currentPage}`;
     
      const response = await fetch(url);
      const result = await response.json();
      setMovies(result.results);
      setMaxResults(result.total_results)
    };
    fetchData();
  }, [currentPage, apiKey, setMovies, searchInput]);

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
