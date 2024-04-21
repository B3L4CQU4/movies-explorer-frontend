import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard.js';
import Preloader from '../Preloader/Preloader.js';

function MoviesCardList({ 
    moviesData, 
    setMoviesData, 
    setVisibleMoviesCount, 
    visibleMoviesCount, 
    toggleLike, 
    likedMovies, 
    setLikedMovies,
    isLoading 
}) {
    return (
        <>
        {!isLoading ? (
            (moviesData && moviesData.length > 0) ? (
                <section className="movies">
                    <div className="movies__container">
                        <div className="movies__container-grid">
                            {moviesData.slice(0, visibleMoviesCount).map(movie => (
                                <MovieCard 
                                    key={movie.id} 
                                    movie={movie} 
                                    toggleLike={toggleLike}
                                    setLikedMovies={setLikedMovies}
                                    likedMovies={likedMovies}
                                />
                            ))}
                        </div>
                        {moviesData.length > visibleMoviesCount ?  (
                            <div className="movies__more-container">
                                <button 
                                    className="movies__more-button" 
                                    onClick={() => setVisibleMoviesCount(prevCount => prevCount + 16)}
                                    type='button'
                                >Ещё
                                </button>
                            </div>
                        ) : (
                            <div className="movies__placeholder"></div>
                        )}
                    </div>
                </section>
            ) : null
        ) : (
            <Preloader />
        )}
        </>
    );
}

export default MoviesCardList;
