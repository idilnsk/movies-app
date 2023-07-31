import mongoose from "mongoose";

const { Schema } = mongoose;

const WatchlistSchema = new Schema({
  movieId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: false,
  },
});

const Watchlist =
  mongoose.models.Watchlist || mongoose.model("Watchlist", WatchlistSchema);

export default Watchlist;
