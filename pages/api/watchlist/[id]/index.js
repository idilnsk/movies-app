import dbConnect from "../../../../db/connect";
import User from "@/db/models/User";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const mongoURI = process.env.MONGODB_URI;
  await dbConnect(mongoURI);
  const { id } = req.query;

  const session = await getServerSession(req, res, authOptions);
  let movieId = String(id);

  if (req.method === "DELETE") {
    try {
      const updatedUser = await User.updateOne(
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
