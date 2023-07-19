import MovieCard from "./MovieCard";

export default function MovieList({ movies, setMovies }) {
  console.log("data from movieiist", movies);

  return (
    <>
      {movies &&
        movies.map((movie) => (
          <li key={movie.slug}>
            <MovieCard movie={movie} setMovies={setMovies} />
          </li>
        ))}
    </>
  );
}
