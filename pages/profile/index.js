import { useEffect, useState } from "react";
import WatchlistItem from "../../movies-app/WatchlistItem";
import Navigation from "../navigation/Index";
import { useRouter } from "next/router";
import useMovieStore from "@/store/movieStore";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const router = useRouter();
  const { movies } = useMovieStore();
  console.log("movies!!!", movies);

  console.log("watchlist:", watchlist);
  useEffect(() => {
    console.log("hook is triggered");
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("/api/watchlist");
        if (response.ok) {
          const data = await response.json();
          setWatchlist(data);
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (movieId) => {
    console.log("removeFromWatchlist,movieId:", movieId);
    try {
      // Make a copy of the current watchlist and filter out the movie with the given movieId
      const updatedWatchlist = watchlist.filter(
        (item) => String(item) !== String(movieId)
      );
      // Update the state to reflect the updated watchlist (removing the movie)
      setWatchlist([...updatedWatchlist]);

      // You can also make an API call here to update the watchlist on the server-side
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl pt-4 pb-4">My Watchlist</h1>
      <div className="flex justify-center flex-wrap mx-auto p-4 gap-4">
        <div className="grid grid-cols-5 gap-4 ">
          {watchlist?.map((item) => (
            <div key={item} >
              <WatchlistItem
                item={item}
                onRemoveFromWatchlist={removeFromWatchlist}
              />
              <div >
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
)};
//