import dbConnect from "../../../../db/connect";
import Watchlist from "../../../../db/models/watchlists";

export default async function handler(req, res) {
  const mongoURI = process.env.MONGODB_URI;
  await dbConnect(mongoURI);
  const { id } = req.query;
 
   if (req.method === "DELETE") {
    try {
      await Watchlist.findOneAndRemove({ movieId:id });
    
      res.status(200).json({ message: "Movie removed from watchlist" });
    
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      res.status(500).json({ error: "Unable to remove movie from watchlist" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
