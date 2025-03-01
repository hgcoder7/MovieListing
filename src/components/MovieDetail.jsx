import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const API_KEY = "b9bd48a6";
const BASE_URL = "https://www.omdbapi.com/";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`).then((res) => setMovie(res.data));
  }, [imdbID]);

  if (!movie) return <CircularProgress className="loader" />;

  return (
    <div className="container">
      <Link to="/" className="back-link">⬅ Back to Listing</Link>
      <Card className="detail-card">
        <CardMedia component="img" image={movie.Poster} alt={movie.Title} height="500" />
        <CardContent>
          <Typography variant="h4">{movie.Title}</Typography>
          <Typography variant="subtitle1">{movie.Year} | {movie.Genre} | {movie.Runtime}</Typography>
          <Typography variant="body1" className="plot">{movie.Plot}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetail;
