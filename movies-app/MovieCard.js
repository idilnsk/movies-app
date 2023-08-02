import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function MovieCard({ movie, setMovies }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { original_title, poster_path, id } = movie;


  const handleToggleWatchlist = async (movieId) => {

    try {
      const response = await fetch("/api/watchlist", {
        method: isInWatchlist ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: id,
          movieTitle: original_title,
          posterPath: `https://image.tmdb.org/t/p/w500${poster_path}`,
        }),
      });

      if (response.ok) {
        setIsInWatchlist((prev) => !prev); // Update the state of isInWatchlist
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };
  //console.log("movie", movie);
  console.log("HOMEPAGE");
  return (
    <div className="group relative rounded-lg overflow-hidden">
      <Link href={`/movie-detail/${id}/${original_title}`}>
        {poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            width={200}
            height={20}
            alt="Movie Poster"
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
      <button onClick={handleToggleWatchlist}>
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
      <div
        className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 shadow-3xl transition-opacity duration-300"
        style={{ pointerEvents: "none" }}
      ></div>
    </div>
  );
}
