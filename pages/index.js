import MovieList from "../movies-app/MovieList";
import Navigation from "../movies-app/Navigation.js";
import SearchBar from "@/movies-app/SearchBar";
import { useState, useEffect } from "react";

export default function MovieListPage({ setMovies, movies, onPageClick, currentPage }) {
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
        <h1>Movies</h1>
        <SearchBar onSearchSubmit={setMovies} />
        <Navigation />
        <MovieList
          movies={movies}
          onPageClick={onPageClick}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
