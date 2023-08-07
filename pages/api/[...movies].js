import axios from "axios";

export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
  const baseUrl = "https://api.themoviedb.org/3";

  let endpoint = "discover/movie";
  if (req.query.searchInput && req.query.searchInput !== "") {
    endpoint = `search/movie?query=${req.query.searchInput}`;
  }

  let url;

  if (req.query.searchInput && req.query.searchInput !== "") {
      url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${req.query.searchInput}&page=${req.query.currentPage || 1}`;
  } else {
      url = `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=${req.query.currentPage || 1}`;
  }
  // The headers are already defined in your Vercel configuration, so they're not needed here.
  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from The MovieDB API:", error.message);
    res.status(error.response?.status || 500).json({ error: "Failed to fetch data" });
  }
}
