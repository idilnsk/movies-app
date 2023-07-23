import MovieList from "../movies-app/MovieList";
import SearchBar from "@/movies-app/SearchBar";
import { useState, useEffect } from "react";
import Link from "next/link";


export default function MovieListPage({
  setMovies,
  movies,
  onPageClick,
  currentPage,
}) {
  const [searchedMovies, setSearchedMovies] = useState(false);
  const [moviesData, setMoviesData] = useState(false);

  useEffect(() => {
    setMoviesData(movies);
  }, [movies]);

  function onSearchSubmit(movies) {
    console.log("movies:", movies);
    setSearchedMovies(movies);
  }
  return (
    <>
      <div>
      
        <SearchBar onSearchSubmit={setMovies} />
        <MovieList
          movies={movies}
          onPageClick={onPageClick}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
