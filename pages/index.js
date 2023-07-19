import MovieList from "../movies-app/MovieList";
import Navigation from "../movies-app/Navigation.js";

export default function MovieListPage({ data }) {
  return (
    <>
      <div>
        <h1>Movies</h1>
        <Navigation />
        <MovieList movies={data.results} />
      </div>
    </>
  );
}
