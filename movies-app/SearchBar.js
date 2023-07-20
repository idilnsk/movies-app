import { useState } from "react";

export default function searchBar({ onSearchSubmit }) {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedMovies, setSearchedMovies] = useState([]);

  const fetchData = async (value) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    return fetch(
      `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&language=en-US&page=${currentPage}`
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
    const searchBar = await fetchData(value);
    onSearchSubmit(searchBar);
  };

  console.log("searchedMovies:", searchedMovies);
  return (
    <div className="input-wrapper">
      <input
        placeholder="type to search..."
        value={searchInput}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
