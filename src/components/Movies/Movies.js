import React, { useState, useEffect } from 'react';
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
  setIsLoading,
  currentUser,
  searchQuery,
  isShortFilm,
  setIsShortFilm,
  setSearchQuery
}) {

  return (
    <>
        <SearchForm 
          handleSearch={handleSearch}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          searchQuery={searchQuery}
          isShortFilm={isShortFilm}
          setIsShortFilm={setIsShortFilm}
          setSearchQuery={setSearchQuery}
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
          currentUser={currentUser}
        />
    </>
  );
};

export default Movies;
