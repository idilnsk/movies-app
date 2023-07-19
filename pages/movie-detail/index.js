import MovieList from "../../movies-app/MovieList";

export default function AllMovies({ movies, setMovies }) {
  console.log("movies imn allmovies", movies);
  return (
    <>
      <h1>Movies</h1>
      <MovieList movies={movies} setMovies={setMovies} />
    </>
  );
}
