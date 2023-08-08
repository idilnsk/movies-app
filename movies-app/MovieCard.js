import Link from "next/link";
import Image from "next/image";
import useWatchlistStore from "../store/watchlistStore";
import { useState } from "react";

export default function MovieCard({ movie, inWatchlist }) {
  const [isInWatchlist, setIsInWatchlist] = useState(inWatchlist);
  const { addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  const { original_title, poster_path, id } = movie;


  

  const handleAddToWatchlist = async () => {
    try {
      const response = await fetch(`/api/watchlist`, {
        method: "POST",
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
        setIsInWatchlist(true);
        addToWatchlist(movie.id);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      const response = await fetch(`/api/watchlist?movieId=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsInWatchlist(false);
        removeFromWatchlist(movie.id);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      handleRemoveFromWatchlist();
    } else {
      handleAddToWatchlist();
    }
  };

  console.log("HOMEPAGE");
  return (
    <div className="group">
      <div className="relative rounded-lg overflow-hidden">
        <Link href={`/movie-detail/${id}/${original_title}`}>
          {poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              width={200}
              height={300}
              alt="Movie Poster"
            />
          )}
          {!poster_path && (
            <Image
              src={`/next.svg`}
              width={200}
              height={300}
              alt="Movie Poster"
              className=" rounded-lg"
            />
          )}
        </Link>
        <div
          className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 shadow-3xl transition-opacity duration-300"
          style={{ pointerEvents: "none" }}
        ></div>
      </div>
      <button
        onClick={handleToggleWatchlist}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 text-center w-full"
      >
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}
