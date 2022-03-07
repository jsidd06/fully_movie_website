import React, { useEffect, useState } from 'react'
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import MovieList from './Components/Movie/MovieList/MovieList';
import MovieListHeading from './Components/Movie/MovieListHeading/MovieListHeading';
import SearchBox from './Components/SearchBox/SearchBox';
import AddFavorite from './Components/AddFavorite/AddFavorite';
import RemoveFavorite from './Components/RemoveFavorite/RemoveFavorite';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovieValue, setSearchMovieValue] = useState("");
  const [favorite,setFavorite] = useState([]);


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
// we are editing the state of the favorite array here and we are adding the movie to the array so that we can display it in the favorite list and also save the data using spread operator in local storage

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favorite', JSON.stringify(items));
}


const AddFavoriteMovie = (movie) => {
  const newFavoriteList = [...favorite, movie];
  // save data in local   storage 
  setFavorite(newFavoriteList);
  saveToLocalStorage(newFavoriteList);
}

const RemoveFavoriteMovie = (movie) => {
  const newFavoriteList = favorite.filter(item => item.imdbID !== movie.imdbID);
  // remove data list  local storage
  setFavorite(newFavoriteList);
  saveToLocalStorage(newFavoriteList);
}

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchMovieValue} setSearchMovieValue={setSearchMovieValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} 
        handleFavoriteClick={AddFavoriteMovie}
        favoriteComponent={AddFavorite}
         />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList movies={favorite} 
        handleFavoriteClick={RemoveFavoriteMovie}
        favoriteComponent={RemoveFavorite}
         />
      </div>
    </div>
  );
}

export default App