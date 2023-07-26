import MovieDetail from "../../../movies-app/MovieDetail";
import { useRouter } from "next/router";
import Navigation from "../../navigation/Index";
import { useState, useEffect } from "react";

export default function Slug({ setMovies }) {
  //console.log("movies!!!!!", movies);
  const router = useRouter();
  const { original_title, id } = router.query;
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    const fetchMovieDetails = async (externalId) => {
      const apiKey = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;

      const apiUrl = `https://api.themoviedb.org/3/movie/${externalId}?api_key=${apiKey}`;
      console.log("apiURL:", apiUrl);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data:", data);
        setMovieData(data);
      } catch (error) {}
    };
    id && fetchMovieDetails(id);
  }, [id, original_title]);

  if (!movieData) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Navigation />
      <MovieDetail movie={movieData} setMovies={setMovies} />
    </>
  );
}
