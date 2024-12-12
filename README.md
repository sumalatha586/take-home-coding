# Take Home Coding
This project is a take home asssessment for NodeJS Coding.

## Requirements
- Use Node v21 or higher (current LTS)
- Use Typescript
- Do not use a framework (Nest JS)
- Welcome to use any other dependencies (Express, Axios, Got, etc)
- Include unit tests

## Take Home Assessment
Create an API that takes in a year (YYYY format) and returns the one page of movies for that year sorted by descending popularity. 

Your service should not fail if the movie credit API fails. The list of editors (retrieved by credits API) is optional in your reponse.

Page is a parameter the API you will be integrating with.

The response will be an array of movies containing
- Title
- Release Date
- Vote Average
- A list of Editors

Following APIs will be used to get data
- Discover Movie API: https://developer.themoviedb.org/reference/discover-movie
- Movie Credit API: https://developer.themoviedb.org/reference/movie-credits

Discover Movie API Request: 
Year will be set by the user of your API
https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&primary_release_year=<YEAR>&sort_by=popularity.desc

Movie Credit API: 
https://developer.themoviedb.org/reference/movie-credits 

To find editors filter for known_for_department and use name property

Do not commit your bearer token to the repo; use an ignored .env file

### Example

For 2019, the response should include the following object
Note the order of the  editors names does not matter;
```
[
    {
        title: 'Joker'
        release_date: 'January 1, 2019'
        vote_average: 8.19,
        editors: [
            "Jill Bogdanowicz",
            "Jason Saulog",
            "Cindy Bond",
            "Jeff Groth",
            "Jeff Mee",
            "Ray Neapolitan",
            "Thomas J. Cabela"
        ]
    }
]
```
Your API should be able to be run and tested by CVS Team with our own bearer token.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your TMDB API key:
```
TMDB_API_KEY=your_bearer_token_here
```

To get a TMDB API key:
1. Create an account at [TMDB](https://www.themoviedb.org/)
2. Go to your account settings
3. Navigate to the API section
4. Request an API key
5. Once approved, use the Bearer token provided in your `.env` file



## Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

Run tests:
```bash
npm test
```

## API Usage

GET `/movies/:year`

Example request:
```bash
# Using curl
curl http://localhost:3000/movies/2019

