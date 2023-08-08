import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import useMovieStore from "../store/movieStore";
import { useEffect } from "react";
import useWatchlistStore from "../store/watchlistStore";
import useSWR, { mutate } from "swr";

export default function MovieList({ onPageClick, totalResults }) {
  const { movies, currentPage, setMovies } = useMovieStore();
  const { watchlist, setWatchlist } = useWatchlistStore(); // Use Zustand store

  const handleSearchSubmit = async (searchBarData) => {
    console.log("SearchBar Data:", searchBarData);
    setMovies(searchBarData.results);
  };
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching watchlist");
    return res.json();
  };
  const { data, error } = useSWR("/api/watchlist", fetcher);

  useEffect(() => {
    if (data) {
      setWatchlist([...data]);
    } else if (error) {
      setWatchlist([]);
    }
  }, [data, error, setWatchlist]);
 

  console.log("watchlist:", watchlist);
  return (
    <div>
      <SearchBar onSearchSubmit={handleSearchSubmit} />
      <div className="flex justify-center flex-wrap mx-auto p-4 gap-4">
        <div className="grid grid-cols-5 gap-4">
          {movies &&
            movies.map((movie) => (
              <ul key={movie.slug}>
                <MovieCard
                  movie={movie}
                  setMovies={setMovies}
                  inWatchlist={watchlist?.includes("" + movie.id)}
                />
              </ul>
            ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalElements={totalResults}
          onPageClick={onPageClick}
        />
      </div>
    </div>
  );
}
