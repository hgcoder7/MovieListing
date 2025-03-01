import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieListing from "./components/MovieListing";
import MovieDetail from "./components/MovieDetail";
import "./App.css"; // Ensure to add styling for responsiveness

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieListing />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default App;


