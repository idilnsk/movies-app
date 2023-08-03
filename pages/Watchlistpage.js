import { useEffect, useState } from "react";
import WatchlistItem from "../../movies-app/WatchlistItem";
import Navigation from "../navigation/Index";
import { useRouter} from "next/router";
import Commentform from "../../movies-app/CommentForm"

export default function WatchlistPage() {
    
  const [watchlist, setWatchlist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log("hook is triggered");
    const fetchWatchlist = async () => {
      try {
      
        const response = await fetch("/api/watchlist");
        if (response.ok) {
          const data = await response.json();
          
          // Filter out duplicate movies based on movieId before setting the watchlist state
          const filteredWatchlist = data.reduce((acc, item) => {
            if (!acc.some((watchlistItem) => watchlistItem.movieId === item.movieId)) {
              acc.push(item);
            }
            return acc;
          }, []);
          
          setWatchlist(filteredWatchlist);
          console.log(filteredWatchlist);
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
    try {
      // Make a copy of the current watchlist and filter out the movie with the given movieId
      const updatedWatchlist = watchlist.filter((item) => item.movieId != movieId);
      // Update the state to reflect the updated watchlist (removing the movie)
      setWatchlist(updatedWatchlist);

      // You can also make an API call here to update the watchlist on the server-side
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };
  console.log(watchlist);
  return (
    <div>
      <Navigation />
      <h1>My Watchlist</h1>
      <div className="flex justify-center flex-wrap mx-auto p-4 gap-4">
        <div className="grid grid-cols-5 gap- 4 ">
      {watchlist.map((item) => (
        <WatchlistItem key={item._id} item={item} 
        onRemoveFromWatchlist={removeFromWatchlist} watchlist={watchlist} />
      ))}
      </div>
    </div>
    </div>
  );
}
//