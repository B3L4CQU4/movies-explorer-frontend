import React from 'react';
import './MovieCard.css';

function MovieCard({ movie, toggleLike, likedMovies }) {
    const isLiked = likedMovies.includes(movie.id);

    function formatDuration(duration) {
        const hours = Math.floor(duration / 60); 
        const minutes = duration % 60; 

        return `${hours}ч ${minutes}м`; 
    }

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
                    className={`movies__card-like-button ${isLiked ? 'movies__card-like-button_liked' : ''}`}
                    onClick={() => toggleLike(movie.id)}
                    type='button'
                ></button>
            </div>
            <p className="movies__card-movie-duration">{formatDuration(movie.duration)}</p>
        </div>
    );
}

export default MovieCard 