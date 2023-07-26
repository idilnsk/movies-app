import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ movie, setMovies }) {
  const {
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    id,
    slug,
  } = movie;
  //console.log("movie", movie);
  console.log("HOMEPAGE");
  return (
    <div>
      <Link href={`/movie-detail/${id}/${original_title}`}>
        {poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            width={200}
            height={20}
            alt="Movie Poster"
            className=" rounded-lg"
          />
        )}
        {!poster_path && (
          <Image
            src={`/next.svg`}
            width={200}
            height={20}
            alt="Movie Poster"
            className=" rounded-lg"
          />
        )}
      </Link>
    </div>
  );
}
