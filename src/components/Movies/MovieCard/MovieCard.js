import React, { useState, useEffect } from 'react';
import './MovieCard.css';

function MovieCard({ movie, toggleLike, likedMovies, setLikedMovies }) {
    function isLiked(movieId) {
        return likedMovies.some(likedMovie => likedMovie.movieId === movieId);
    }

    function formatDuration(duration) {
        const hours = Math.floor(duration / 60); 
        const minutes = duration % 60; 

        return `${hours}ч ${minutes}м`; 
    }

    const handleLikeToggle = () => {
        toggleLike(movie.id);
        const updatedLikedMovies = isLiked(movie.id) ?
            likedMovies.filter(likedMovie => likedMovie.movieId !== movie.id) :
            [...likedMovies, { movieId: movie.id }];
        setLikedMovies(updatedLikedMovies);
        localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
    };

    return (
        <div className="movies__card-container">
            <div className="movies__card-img-container">
                <img className="movies__card-img-container-img" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
            </div>
            <div className="movies__card-info">
                <a className="movies__card-info-link" href={movie.trailerLink}>
                    <h2 className="movies__card-info-name">{movie.nameRU}</h2>
                </a>
                <button 
                    className={`movies__card-like-button ${isLiked(movie.id) ? 'movies__card-like-button_liked' : ''}`}
                    onClick={handleLikeToggle}
                    type='button'
                ></button>
            </div>
            <p className="movies__card-movie-duration">{formatDuration(movie.duration)}</p>
        </div>
    );
}
export default MovieCard 