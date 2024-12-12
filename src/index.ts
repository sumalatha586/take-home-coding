import express from 'express';
import { getMovies } from './services/movieService';

const app = express();
const port = process.env.PORT || 3000;

app.get('/movies/:year', async (req, res) => {
  try {
    const { year } = req.params;
    
    if (!/^\d{4}$/.test(year)) {
      return res.status(400).json({ error: 'Year must be in YYYY format' });
    }

    const movies = await getMovies(year);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 