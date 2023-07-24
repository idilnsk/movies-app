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
      <div >
      {movies &&
        movies.map((movie) => (
          <li key={movie.slug}>
            <MovieCard movie={movie} setMovies={setMovies} />
          </li>
        ))}
      <Pagination
        currentPage={currentPage}
        totalPages={50}
        onPageClick={onPageClick}
      />
    </div>
  );
}
