import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";


export default function MovieList({
  movies,
  setMovies,
  currentPage,
  onPageClick,
}) {
  console.log("data from movieiist", movies);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {movies &&
        movies.map((movie) => (
          <ul key={movie.slug}>
            <MovieCard movie={movie} setMovies={setMovies} />
          </ul>
        ))}
        </div>
        <div className="flex justify-center mt-4">
      <Pagination
        currentPage={currentPage}
        totalPages={50}
        onPageClick={onPageClick}
      />
    </div>
    </div>
  );
}
