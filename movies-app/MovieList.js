import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import useMovieStore from "../store/movieStore"

export default function MovieList({
  onPageClick,
  totalResults,
}) {
  const {movies, currentPage, setMovies}=useMovieStore();
  const handleSearchSubmit = async (searchBarData) => {
    console.log("SearchBar Data:", searchBarData);
    setMovies(searchBarData.results);
  };
  return (
    <div>
      <SearchBar onSearchSubmit={handleSearchSubmit} />
      <div className="flex justify-center flex-wrap mx-auto p-4 gap-4">
        <div className="grid grid-cols-5 gap-4">
        {movies &&
          movies.map((movie) => (
            <ul key={movie.slug}>
              <MovieCard movie={movie} setMovies={setMovies} />
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
