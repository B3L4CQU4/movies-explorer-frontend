import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import api from '../../../utils/Api.js';
import ErrorPopup from '../../ErrorPopup/ErrorPopup.js';


function MovieCard({ movie, likedMovies, setLikedMovies, currentUser  }) {
    const [isLiked, setIsLiked] = useState(false);
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLiked(likedMovies.some(likedMovie => likedMovie.id === movie.id));
    }, [likedMovies, movie.id]); 

    const handleLikeToggle = async () => {
        try {
            if (isLiked) {
                try {
                    setIsLoading(true);
                    const storedLikedMovies = localStorage.getItem("likedMoviesDataRaw");
                    const likedMoviesBd = JSON.parse(storedLikedMovies);
                    const likedMovieId = likedMoviesBd.find(likedMovie => likedMovie.movieId === movie.id)?._id;
                    await api.deleteMovie(likedMovieId);
                    localStorage.setItem("likedMoviesData", JSON.stringify(likedMovies.filter(likedMovie => likedMovie.id !== movie.id)));
                    localStorage.setItem("likedMoviesDataRaw", JSON.stringify(likedMoviesBd.filter(likedMovie => likedMovie.movieId !== movie.id)));
                    setLikedMovies(prevLikedMovies => prevLikedMovies.filter(likedMovie => likedMovie.id !== movie.id));
                    setIsLiked(prevIsLiked => !prevIsLiked);
                  } catch (error) {
                    setErrorMessage({ error, message: 'Failed to delete movie' });
                  } finally {
                    setIsLoading(false);
                  }
            } else {
                try {
                    setIsLoading(true);
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
            
                    const newLikedMovieData = await api.createMovie(newMovieData);
                    localStorage.setItem("likedMoviesData", JSON.stringify([...likedMovies, movie]));
                    localStorage.setItem("likedMoviesDataRaw", JSON.stringify([...JSON.parse(localStorage.getItem("likedMoviesDataRaw")), newLikedMovieData])); // обновление localStorage
                    setLikedMovies(prevLikedMovies => [...prevLikedMovies, movie]);
                    setIsLiked(prevIsLiked => !prevIsLiked);
                  } catch (error) {
                    setErrorMessage({ error, message: 'Failed to like movie' });
                  } finally {
                    setIsLoading(false);
                  }
            }
        } catch (error) {
            setErrorMessage({ error, message: 'Failed toggling like' });
            
        } finally {
            setIsLoading(false);
        }
    };

    function formatDuration(duration) {
        const hours = Math.floor(duration / 60); 
        const minutes = duration % 60; 

        return `${hours}ч ${minutes}м`; 
    }

    return (
        <div className="movies__card-container">
        {errorMessage && <ErrorPopup errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />}
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
                    disabled={isLoading}
                ></button>
            </div>
            <p className="movies__card-movie-duration">{formatDuration(movie.duration)}</p>
        </div>
    );
}

export default MovieCard;
