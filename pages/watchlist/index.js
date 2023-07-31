import { useEffect, useState } from "react";
import WatchlistItem from "../../movies-app/WatchlistItem";
import Navigation from "../navigation/Index";
import { useRouter} from "next/router";

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
          setWatchlist(data);
          console.log(data);
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
      {watchlist.map((item) => (
        <WatchlistItem key={item._id} item={item} 
        onRemoveFromWatchlist={removeFromWatchlist}/>
      ))}
    </div>
  );
}
//