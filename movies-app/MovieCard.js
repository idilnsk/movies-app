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
    <div className="container  lg:px-10 lg:pt-6">
      <div>
        <div className="flex w-1/4 flex-wrap">
          <div className="mt-14">
            <Link href={`/movie-detail/${id}`}>
              <div className=" rounded-lg grid ">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  width={200}
                  height={20}
                  alt="Movie Poster"
                  className=" rounded-lg  "
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
