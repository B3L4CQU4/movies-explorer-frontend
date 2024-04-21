import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';

function Movies({ 
  moviesData,
  setMoviesData,
  visibleMoviesCount, 
  setVisibleMoviesCount, 
  toggleLike, 
  likedMovies, 
  setLikedMovies,
  handleSearch, 
  isLoading, 
  setIsLoading 
}) {
  return (
    <>
        <SearchForm 
          handleSearch={handleSearch}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <MoviesCardList 
          moviesData={moviesData}
          setMoviesData={setMoviesData}
          setVisibleMoviesCount={setVisibleMoviesCount} 
          visibleMoviesCount={visibleMoviesCount}
          toggleLike={toggleLike}
          setLikedMovies={setLikedMovies}
          likedMovies={likedMovies}
          isLoading={isLoading}
        />
    </>
  );
};

export default Movies;
