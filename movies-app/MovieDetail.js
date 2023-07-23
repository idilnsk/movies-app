import styled from "styled-components";
import Link from "next/link";


export default function MovieDetail({ movie, setMovies }) {
  const {
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    slug,
  } = movie;
  console.log("data!!!!!", movie);
  return (
    <>
      <Link href="/movie-detail">
        <button>Back</button>
      </Link>
      <ul>
        <li>
          <p className="title">Title:{original_title}</p>
          <p className="overview">Overview:{overview}</p>
          <p className="popularity">Popularity:{popularity}</p>
          <p className="releaseDate">Release Date:{release_date}</p>
          <p className="voteAverage">Vote Average:{vote_average}</p>
          <p className="voteCount">Vote Count:{vote_count}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="Movie Poster"
          />
        </li>
      </ul>
    </>
  );
}
