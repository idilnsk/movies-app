import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  movieName: {
    type: String,
    required: true,
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
