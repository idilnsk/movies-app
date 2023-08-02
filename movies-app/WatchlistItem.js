import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function WatchlistItem({ item, onRemoveFromWatchlist, original_title }) {
  console.log(item);
  const router = useRouter();
  const [movieData, setMovieData] = useState();
  const id = item.movieId;
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
  }, [id]);

 /*  const handleRemoveFromWatchlist = async () => {
    try {
      const response = await fetch(`/api/watchlist/${movieData.id}`, {
        method: "DELETE",
      });

       if (response.ok) {
        onRemoveFromWatchlist(movieData.id); 

        await dbConnect();

        const user = await User.findOne({ googleId: data.user.id });

      if (user) {
        // Update the watchlist in the user document
        user.watchlist = user.watchlist.filter((item) => item.movieId !== movieData.id);

        // Save the updated user document
        await user.save();
      }
    
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };
  if (!movieData) {
    return null;
  } */
  
  console.log("movieData:", movieData);
  return (
    <div >
      <h3>{movieData.title}</h3>
      <Link href={`/movie-detail/${id}/${original_title}`}>
        {movieData.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
            width={200}
            height={300}
            className="rounded-lg"
          />
        )}
      </Link>
      <button onClick={handleRemoveFromWatchlist}>Remove from Watchlist</button>
    </div>
  );
}
