import MovieDetail from "../../movies-app/MovieDetail";
import { useRouter } from "next/router";

export default function Slug({ movies, setMovies }) {
  console.log("movies!!!!!", movies);

  const router = useRouter();
  const { id } = router.query;
  const movieDetail = movies.results.find((movie) => movie.id == id);

  console.log("movieDetail", movieDetail);
  return (
    <>
      <MovieDetail movie={movieDetail} setMovies={setMovies} />
    </>
  );
}
