import dbConnect from "../../../db/connect.js";
import Comment from "../../../db/models/comments.js";

export default async function handler(request, response) {
  const mongoURI = process.env.MONGODB_URI;
  
  await dbConnect(mongoURI);
  if (request.method === "GET") {
    try {
      const { movieId } = request.query;
      const comments = await Comment.find({ movieId });

      return response.status(200).json(comments);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: "Error fetching comments" });
    }
  } else if (request.method === "POST") {
    try {
      const { movieId } = request.query; 
      const commentData = request.body;
      commentData.movieId = movieId;
            console.log("Received POST request with data:", commentData);

      

      const comment = new Comment(commentData);
      const savedComment = await comment.save();
      console.log(savedComment);
      response.status(201).json({ status: "Comment created", savedComment });
      console.log(response);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
