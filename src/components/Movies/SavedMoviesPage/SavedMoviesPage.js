import React, { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMoviesPage({
    moviesData, 
    setMoviesData,
    visibleMoviesCount, 
    setVisibleMoviesCount, 
    toggleLike, 
    handleSearch, 
    isLoading, 
    setIsLoading,
    likedMovies,
    setLikedMovies,
    currentUser
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
                isLoading={isLoading}
                setLikedMovies={setLikedMovies}
                likedMovies={likedMovies}
                currentUser={currentUser}
            />
        </>
    );
}

export default SavedMoviesPage;
