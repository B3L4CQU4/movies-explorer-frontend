import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMoviesPage({
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
    // Фильтруем moviesData по id фильмов из likedMovies
    const likedMovieIds = likedMovies.map(movie => movie.movieId);
    const allMoviesData = JSON.parse(localStorage.getItem('allMoviesData')) || [];
    const likedMoviesData = allMoviesData.filter(movie => likedMovieIds.includes(movie.id));

    return (
        <>
            <SearchForm 
                handleSearch={handleSearch}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            <MoviesCardList 
                moviesData={likedMoviesData}
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
}

export default SavedMoviesPage;
