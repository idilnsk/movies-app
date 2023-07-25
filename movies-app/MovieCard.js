import styled from "styled-components";
import Link from "next/link";

export default function MovieCard({ movie, setMovies }) {
  const {
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    slug,
    id,
  } = movie;
  //console.log("movie", movie);
  console.log("HOMEPAGE");
  return (      
        <div>
            <Link href={`/movie-detail/${id}`}>
              <div>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  width={200}
                  height={20}
                  alt="Movie Poster"
                  className=" rounded-lg"
                />
              </div>
            </Link>
          </div>
  );
}
