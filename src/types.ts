export interface Movie {
  title: string;
  release_date: string;
  vote_average: number;
  editors: string[];
}

// API response types
export interface TMDBResponse {
  results: {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
  }[];
}

export interface TMDBCredits {
  crew: {
    known_for_department: string;
    name: string;
  }[];
} 