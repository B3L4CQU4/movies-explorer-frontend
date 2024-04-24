import React, { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMoviesPage({
    moviesData, 
    setMoviesData,
    visibleMoviesCount, 
    setVisibleMoviesCount, 
    isLoading, 
    setIsLoading,
    likedMovies,
    setLikedMovies,
    currentUser,
    handleLikedSearch,
    searchQuery,
    isShortFilm,
    setIsShortFilm,
    setSearchQuery
}) {

    return (
        <>
            <SearchForm 
                handleLikedSearch={handleLikedSearch}
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
                isLoading={isLoading}
                setLikedMovies={setLikedMovies}
                likedMovies={likedMovies}
                currentUser={currentUser}
            />
        </>
    );
}

export default SavedMoviesPage;
