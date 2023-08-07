import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import useMovieStore from "../store/movieStore";

export default function SearchBar({ onSearchSubmit }) {
  const {setCurrentPage,currentPage,searchInput, setSearchInput, searchedMovies, setSearchedMovies}=useMovieStore();


  console.log("currentPage", currentPage);
  const fetchData = async (value) => {
    const apiKey = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;

    const url =
      value === ""
        ? `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&language=en-US`
        : `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${apiKey}`;

    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log("received data:", json);
        const results = Array.isArray(json.results)
          ? json.results.filter((movie) => {
              return (
                movie &&
                movie.original_title &&
                movie.original_title.toLowerCase().includes(value.toLowerCase())
              );
            })
          : [];
        console.log(results);
        return { results, totalResults: json.total_results };
      });
  };
  const handleChange = async (value) => {
    setSearchInput(value); //local storage
    // localStorage.setItem("search", value);
    setCurrentPage(1);
    /* const searchBar = await fetchData(value);
    onSearchSubmit(searchBar); */
  };

  console.log("searchedMovies:", searchedMovies);
  return (
    <div className="flex items-center justify-center py-4 pl-4">
      <div className="flex rounded-lg overflow-hidden bg-white">
        <input
          type="text"
          className="block w-full px-4 py-2 text-purple-700  focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40 pr-0 border-none"
          placeholder="type to search..."
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button className="px-4 text-white bg-purple-600 hover:bg-purple-700 transition ease-in-out duration-150">
          Search
        </button>
      </div>
    </div>
  );
}
