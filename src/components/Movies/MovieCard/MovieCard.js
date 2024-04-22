import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import api from '../../../utils/Api.js';

function MovieCard({ movie, likedMovies, setLikedMovies, currentUser  }) {
    const [isLiked, setIsLiked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLiked(likedMovies.some(likedMovie => likedMovie.id === movie.id));
    }, [likedMovies, movie.id]);

    const handleLikeToggle = async () => {
        try {
            if (isLiked) {
                const likedMoviesBd = await api.getSavedMovies();
                const likedMovieId = likedMoviesBd.find(likedMovie => likedMovie.movieId === movie.id)?._id;
                await api.deleteMovie(likedMovieId);
                
                setLikedMovies(prevLikedMovies => prevLikedMovies.filter(likedMovie => likedMovie.id !== movie.id));
                localStorage.setItem("likedMoviesData", JSON.stringify(likedMovies.filter(likedMovie => likedMovie.id !== movie.id))); // обновление localStorage
                console.log(isLiked);
            } else {
                const userId = currentUser.id;
            
                const newMovieData = {
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: `https://api.nomoreparties.co/beatfilm-movies${movie.image.url}`,
                    trailerLink: movie.trailerLink,
                    thumbnail: `https://api.nomoreparties.co/beatfilm-movies${movie.image.formats.thumbnail.url}`,
                    movieId: movie.id,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN,
                    userId: userId
                };
            
                await api.createMovie(newMovieData);
                setLikedMovies(prevLikedMovies => [...prevLikedMovies, movie]);
                localStorage.setItem("likedMoviesData", JSON.stringify([...likedMovies, movie])); // обновление localStorage
                console.log(isLiked);
            }
            
            setIsLiked(prevIsLiked => !prevIsLiked);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

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
                    className={`${location.pathname === '/saved-movies' ? 'movies__card-remove-button' : 'movies__card-like-button'} movies__card-like-button ${isLiked && location.pathname !== '/saved-movies' ? 'movies__card-like-button_liked' : ''}`}
                    onClick={handleLikeToggle}
                    type='button'
                ></button>
            </div>
            <p className="movies__card-movie-duration">{formatDuration(movie.duration)}</p>
        </div>
    );
}

export default MovieCard;
