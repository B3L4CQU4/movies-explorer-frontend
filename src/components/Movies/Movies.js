import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';

function Movies({ MoviesData, visibleMoviesCount, setVisibleMoviesCount, toggleLike, likedMovies }) {
  return (
    <>
        <SearchForm />
        <MoviesCardList 
          MoviesData={MoviesData} 
          setVisibleMoviesCount={setVisibleMoviesCount} 
          visibleMoviesCount={visibleMoviesCount}
          toggleLike={toggleLike}
          likedMovies={likedMovies}
        />
    </>
  );
};

export default Movies;
