import styled from "styled-components";
import Link from "next/link";

export default function MovieDetail({ movie, setMovies }) {
  console.log("Movie data:", movie);
  if (!movie) {
    return <h3>loading...</h3>;
  }
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
      <Link href="/">
        <button>Back</button>
      </Link>
      <ul>
        <li className="flex justify-between pr-20">
          <div>
            <p className="text-left pb-4 pr-6 font-bold">
              Title:{original_title}
            </p>
            <p className="text-left pb-4 pr-6 font-bold">Overview:{overview}</p>
            <p className="text-left pb-4 pr-6 font-bold">
              Popularity:{popularity}
            </p>
            <p className="text-left pb-4 pr-6 font-bold">
              Release Date:{release_date}
            </p>
            <p className="text-left pb-4 pr-6 font-bold">
              Vote Average:{vote_average}
            </p>
            <p className="text-left pb-4 pr-6 font-bold">
              Vote Count:{vote_count}
            </p>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="Movie Poster"
            width={200}
            height={20}
            alt="Movie Poster"
            className=" rounded-lg"
          />
        </li>
      </ul>
    </>
  );
}
