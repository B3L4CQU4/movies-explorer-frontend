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
        <div className="card__container">
            <div className="card__img-container">
                <img className="card__img-container-img" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
            </div>
            <div className="card__info">
                <a className="card__info-link" href={movie.trailerLink}>
                    <h2 className="card__info-name">{movie.nameRU}</h2>
                </a>
                <button 
                    className={`card__like-button ${isLiked ? 'card__like-button_liked' : ''}`}
                    onClick={() => toggleLike(movie.id)}
                ></button>
            </div>
            <div className="card__line"></div>
            <p className="card__movie-duration">{formatDuration(movie.duration)}</p>
        </div>
    );
}

export default MovieCard