import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  googleId: { type: String },
  watchlist: { type: [String] },
  comment: [
    {
      name: { type: String },
      comment: { type: String },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
