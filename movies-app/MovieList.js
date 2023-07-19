import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  console.log("data", movies);

  return (
    <>
      {movies &&
        movies.map((movie) => (
          <li key={movie}>
            <MovieCard data={movie} />
          </li>
        ))}
    </>
  );
}
