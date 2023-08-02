import dbConnect from "../../../db/connect";
import Watchlist from "../../../db/models/watchlists";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../db/models/User";
import { ObjectId } from "mongoose";

export default async function handler(req, res) {
  const mongoURI = process.env.MONGODB_URI;
  const session = await getServerSession(req, res, authOptions);
  console.log("sessionServer", session);
  await dbConnect(mongoURI);
  if (req.method === "POST") {
    try {
      const { movieId, movieTitle, posterPath } = req.body;

      const watchlist = new Watchlist({
        title: movieTitle || "Unknown",
        posterPath,
        movieId,
        releaseDate: "Unknown",
      });

      const savedItem = await User.findOneAndUpdate(
        { googleId: session.user.googleId },
        { $addToSet: { watchlist: movieId } },
        { new: true, upsert: true }
      );
      res.status(201).json();
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
      res.status(500).json({ error: "Unable to add movie to watchlist" });
    }
  } else if (req.method === "GET") {
    try {
      const { movieId } = req.query;

      let watchlist = await User.findOne({
        googleId: session.user.googleId,
      }).select("watchlist");

      res.status(200).json(watchlist);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      res.status(500).json({ error: "Unable to fetch watchlist" });
    }
  } else if (req.method === "DELETE") {
    try {
      let { movieId } = req.body;
      // movieId = "" + movieId;
      console.log("googleId:", session.user.googleId, movieId);
      await User.updateOne(
        { googleId: session.user.googleId },
        { $pull: { watchlist: movieId } }
      );
      res.status(200).json({ message: "Movie removed from watchlist" });
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      res.status(500).json({ error: "Unable to remove movie from watchlist" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
