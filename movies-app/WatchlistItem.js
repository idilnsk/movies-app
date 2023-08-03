import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

//make object

export default function WatchlistItem({ item, onRemoveFromWatchlist }) {
  console.log("item:", item);
  //make comment component, state,useEffect, fetch the comments
  const [itemData, setItemData] = useState();

  useEffect(() => {
    const fetchMovieDetails = async (externalId) => {
      const apiKey = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;

      const apiUrl = `https://api.themoviedb.org/3/movie/${externalId}?api_key=${apiKey}`;
      console.log("apiURL:", apiUrl);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("######data:", data);
        setItemData(data);
      } catch (error) {}
    };
    !itemData && fetchMovieDetails(item);
  }, [item]);

  const handleRemoveFromWatchlist = async () => {
    try {
      const response = await fetch(`/api/watchlist/${itemData.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onRemoveFromWatchlist(itemData.id);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };
  if (!itemData) {
    return null;
  }
  return (
    <div>
      <h3>{itemData.title}</h3>
      <Link href={`/movie-detail/${itemData.id}/${itemData.title}`}>
        {" "}
        <Image
          src={`https://image.tmdb.org/t/p/w500${itemData.poster_path}`}
          alt={itemData.title}
          width={200}
          height={300}
          className="rounded-lg"
        />
      </Link>

      <button
        onClick={() => {
          handleRemoveFromWatchlist(itemData.id);
        }}
      >
        Remove from Watchlist
      </button>
    </div>
  );
}
