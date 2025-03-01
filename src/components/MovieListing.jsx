import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { TextField, CircularProgress, Card, CardMedia, CardContent, Typography } from "@mui/material";
import axios from "axios";
import debounce from "lodash.debounce";

const API_KEY = "b9bd48a6";
const BASE_URL = "https://www.omdbapi.com/";

const MovieListing = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("marvel");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async (query, pageNum) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${pageNum}`);
      if (response.data.Search) {
        setMovies(pageNum === 1 ? response.data.Search : [...movies, ...response.data.Search]);
        setTotalResults(parseInt(response.data.totalResults, 10));
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  const debouncedSearch = useCallback(debounce((query) => fetchMovies(query, 1), 500), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const loadMore = () => {
    if (movies.length < totalResults) {
      setPage(page + 1);
      fetchMovies(searchTerm, page + 1);
    }
  };

  return (
    <div className="container">
      <TextField className="text" fullWidth label="Search Movies" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="grid-container">
        {movies.map((movie) => (
          <Card key={movie.imdbID} component={Link} to={`/movie/${movie.imdbID}`} className="card">
            <CardMedia component="img" image={movie.Poster} alt={movie.Title} height="300"  />
            <CardContent>
              <Typography variant="h6">{movie.Title}</Typography>
              <Typography variant="subtitle2">{movie.Year}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {loading && <CircularProgress className="loader" />}
      {!loading && movies.length < totalResults && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default MovieListing;
