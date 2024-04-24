import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard.js';
import Preloader from '../Preloader/Preloader.js';

function MoviesCardList({ 
    moviesData,  
    setMoviesData, 
    setVisibleMoviesCount, 
    visibleMoviesCount, 
    likedMovies, 
    setLikedMovies,
    isLoading,
    currentUser,
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
                                    setLikedMovies={setLikedMovies}
                                    likedMovies={likedMovies}
                                    currentUser={currentUser}
                                />
                            ))}
                        </div>
                        {moviesData.length > visibleMoviesCount ?  (
                            <div className="movies__more-container">
                                <button 
                                    className="movies__more-button" 
                                    onClick={() => {
                                        setVisibleMoviesCount(prevCount => {
                                            if (window.matchMedia("(max-width: 320px)").matches) {
                                                return prevCount + 2;
                                            } else if (window.matchMedia("(max-width: 768px)").matches){
                                                return prevCount + 8;
                                            } else {
                                                return prevCount + 16;
                                            }
                                        });
                                        }}
                                    type='button'
                                >Ещё
                                </button>
                            </div>
                        ) : (
                            <div className="movies__placeholder"></div>
                        )}
                    </div>
                </section>
            ) : (<span className="movies__placeholder-text">Нечего отображать. Начните поиск или попробуйте изменить его параметры</span>)
        ) : (
            <Preloader />
        )}
        </>
    );
}

export default MoviesCardList;
