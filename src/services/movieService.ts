import axios from 'axios';
import { Movie, TMDBResponse, TMDBCredits } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.themoviedb.org/3';

async function getMovieEditors(movieId: number, apiKey: string): Promise<string[]> {
  try {
    const response = await axios.get<TMDBCredits>(
      `${BASE_URL}/movie/${movieId}/credits`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    return response.data.crew
      .filter(member => member.known_for_department === 'Editing')
      .map(editor => editor.name);
  } catch (error) {
    console.error(`Failed to fetch editors for movie ${movieId}`);
    return [];
  }
}

export async function getMovies(year: string): Promise<Movie[]> {
  // Check for API key first
  if (!process.env.TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not defined in environment variables');
  }

  const apiKey = process.env.TMDB_API_KEY;

  try {
    const response = await axios.get<TMDBResponse>(
      `${BASE_URL}/discover/movie`,
      {
        params: {
          language: 'en-US',
          page: 1,
          primary_release_year: year,
          sort_by: 'popularity.desc'
        },
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    if (!response.data.results) {
      throw new Error('No results found');
    }

    const movies = await Promise.all(
      response.data.results.map(async (movie) => ({
        title: movie.title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        editors: await getMovieEditors(movie.id, apiKey)
      }))
    );

    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
} 