import dbConnect from "../../../db/connect.js";
import { getServerSession } from "next-auth";
import User from "../../../db/models/User";
import { authOptions } from "../auth/[...nextauth]";
import Comment from "../../../movies-app/Comments.js"

export default async function handler(request, response) {
  const mongoURI = process.env.MONGODB_URI;
  const session = await getServerSession(request, response, authOptions);
  const { method } = request;
  await dbConnect(mongoURI);
  if (request.method === "GET") {
    try {
      const { movieName } = request.query;
      if (!session?.user?.googleId) {
        return response.status(401).json({ error: "Unauthorized" });
      }
      let user = await User.findOne({
        googleId: session.user.googleId,
      }).select("comment");

      const comments = user ? user.comment : [];

      return response.status(200).json(comments);
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Error fetching comment", error });
    }
  } else if (request.method === "POST") {
    console.log(request.body);
    try {
      const { movieName, comment, name } = request.body;
      /*    const commentData = request.body;
      commentData.movieName = movieName;
            console.log("Received POST request with data:", commentData); */
      /*      const newComment = new Comment({
        movieName,
        comment,
      });
 */
      //const comment = new Comment({movieName});
      const savedComment = await User.findOneAndUpdate(
        { googleId: session.user.googleId },
        { $addToSet: { comment: { comment,movieName,name } } },
        { new: true, upsert: true }
      );
      console.log(savedComment, comment);
      response.status(201).json({ status: "Comment created", savedComment });
      //console.log(response);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else if (request.method === "DELETE") {
    try {
      const { commentId } = request.query;
      console.log("googleId:", session.user.googleId,commentId);
      await User.updateOne(
        { googleId: session.user.googleId },
        { $pull: { comment:{_id:commentId} }} 
      );
      response.status(200).json({ message: "Comment removed from the movie" });
    } catch (error) {
      console.error("Error removing movie from the comment:", error);
      res
        .status(500)
        .json({ error: "Unable to remove movie from the comment" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
