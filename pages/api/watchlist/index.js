import dbConnect from "../../../db/connect";
import Watchlist from "../../../db/models/watchlists";

export default async function handler(req, res) {
  const mongoURI = process.env.MONGODB_URI;
  await dbConnect(mongoURI);
  const { movieId } = req.query;
  if (req.method === "POST") {
    try {
      const { movieId, movieTitle, posterPath } = req.body;

      const watchlist = new Watchlist({
        title: movieTitle || "Unknown",
        posterPath,
        movieId,
        releaseDate: "Unknown",
      });

      const savedItem = await watchlist.save();
      res.status(201).json(savedItem);
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
      res.status(500).json({ error: "Unable to add movie to watchlist" });
    }
  } else if (req.method === "GET") {
    try {
      const { movieId } = req.query;

      let watchlist = await Watchlist.find();

      res.status(200).json(watchlist);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      res.status(500).json({ error: "Unable to fetch watchlist" });
    }
  } else if (req.method === "DELETE") {
    try {
      await Watchlist.findOneAndRemove({ movieId });
      if (deletedMovie) {
        res.status(200).json({ message: "Movie removed from watchlist" });
      }
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      res.status(500).json({ error: "Unable to remove movie from watchlist" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
