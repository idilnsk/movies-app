import { useState, useEffect } from "react";

export default function searchBar({ onSearchSubmit }) {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedMovies, setSearchedMovies] = useState([]);

  console.log("currentPage", currentPage);
  const fetchData = async (value) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    return fetch(
      `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${apiKey}`
    )
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
        return results;
      });
  };
  const handleChange = async (value) => {
    setSearchInput(value);
    setCurrentPage(1);
    const searchBar = await fetchData(value);
    onSearchSubmit(searchBar);

  };



  console.log("searchedMovies:", searchedMovies);
  return (
    <div className="flex items-center py-4 pl-4">
      <div className="flex border border-purple-200 rounded">
      <input
      type="text"
      className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder="type to search..."
        value={searchInput}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="px-4 text-white bg-purple-600 border-l rounded ">
        Search
      </button>
    </div>
    </div>
  );
}
