import MovieList from "../movies-app/MovieList";
import Navigation from "../movies-app/Navigation.js";

export default function MovieListPage({ movies }) {
  return (
    <>
      <div>
        <h1>Movies</h1>
        <Navigation />
        <MovieList movies={movies.results} />
      </div>
    </>
  );
}
