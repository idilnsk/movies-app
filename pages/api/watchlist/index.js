import dbConnect from "../../../db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../db/models/User";

export default async function handler(req, res) {
  const mongoURI = process.env.MONGODB_URI;
  const session = await getServerSession(req, res, authOptions);
  console.log("sessionServer", session);
  await dbConnect(mongoURI);
  if (req.method === "POST") {
    try {
      const { movieId } = req.body;

      const updatedUser = await User.findOneAndUpdate(
        { googleId: session.user.googleId },
        { $addToSet: { watchlist: movieId } },
        { new: true, upsert: true }
      );
      res.status(201).json(updatedUser.watchlist);
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
      res.status(500).json({ error: "Unable to add movie to watchlist" });
    }
  } else if (req.method === "GET") {
    try {
      const user = await User.findOne({ googleId: session.user.googleId });
      if (!user || !user.watchlist) {
        res.status(404).json({ error: 'Watchlist not found' });
      }else {
      res.status(200).json(user.watchlist);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      res.status(500).json({ error: "Unable to fetch watchlist" });
    }
  }
   else if (req.method === "DELETE") {
    try {
      let { movieId } = req.query;
  
      const updatedUser = await User.findOneAndUpdate(
        { googleId: session.user.googleId },
        { $pull: { watchlist: movieId }  }
      );
  
      if (updatedUser) {
        res.status(200).json(updatedUser.watchlist);
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      res.status(500).json({ error: "Unable to remove movie from watchlist" });
    }
  }}
