import dbConnect from "../../../../db/connect";
import Comments from "../../../../db/models/comments";

export default async function handler(req, res) {
  const mongoURI = process.env.MONGODB_URI;
  await dbConnect(mongoURI);
  const { commentId } = req.query;
 
   if (req.method === "DELETE") {
    try {
      await Comment.findOneAndRemove({ _id:commentId});
    
      res.status(200).json({ message: "Movie removed from comments" });
    
    } catch (error) {
      console.error("Error removing movie from the comments:", error);
      res.status(500).json({ error: "Unable to remove movie from comments" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
