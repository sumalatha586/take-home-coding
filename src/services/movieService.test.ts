import { getMovies } from './movieService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Movie Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.TMDB_API_KEY = 'test-key';
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.TMDB_API_KEY = undefined;
  });

  it('should fetch movies for a given year', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [{
          id: 1,
          title: 'Test Movie',
          release_date: '2019-01-01',
          vote_average: 8.5
        }]
      }
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        crew: [{
          known_for_department: 'Editing',
          name: 'Test Editor'
        }]
      }
    });

    const movies = await getMovies('2019');

    expect(movies).toEqual([{
      title: 'Test Movie',
      release_date: '2019-01-01',
      vote_average: 8.5,
      editors: ['Test Editor']
    }]);
  });

  it('should handle API errors', async () => {
    process.env.TMDB_API_KEY = 'test-key';
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await expect(getMovies('2019'))
      .rejects
      .toThrow('Failed to fetch movies');
  });

  it('should handle missing API key', async () => {
    delete process.env.TMDB_API_KEY;

    await expect(getMovies('2019'))
      .rejects
      .toThrow('TMDB_API_KEY is not defined in environment variables');
  });


}); 