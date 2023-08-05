const fetchMovies = async (req, res) => {
    const apiKey = process.env.MOVIEDB_API_KEY;
    const endpoint = req.url.replace('/api/movies', '');
    const url = `https://api.themoviedb.org/3${endpoint}&api_key=${apiKey}`;
  
    try {
      const movieResponse = await fetch(url);
      const data = await movieResponse.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch from the MovieDB API" });
    }
  };
  
  export default fetchMovies;