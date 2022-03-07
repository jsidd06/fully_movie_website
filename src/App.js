import React, { useEffect, useState } from 'react'
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import MovieList from './Components/Movie/MovieList/MovieList';
import MovieListHeading from './Components/Movie/MovieListHeading/MovieListHeading';
import SearchBox from './Components/SearchBox/SearchBox';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovieValue, setSearchMovieValue] = useState("");


  const getMoviesResult = async (searchMovieValue) => {
    const url = `http://www.omdbapi.com/?s=${searchMovieValue}&apikey=e5878fb5`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  }

  useEffect(() => {
    getMoviesResult(searchMovieValue);
  } , [searchMovieValue]);



  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchMovieValue} setSearchMovieValue={setSearchMovieValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App