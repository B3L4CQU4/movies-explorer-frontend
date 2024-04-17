import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard.js';


function MoviesCardList({ MoviesData, setVisibleMoviesCount, visibleMoviesCount, toggleLike, likedMovies }) {
    return (
        <section className="movies-cards">
            <div className="movies-cards__container">
                <div className="movies-cards__container-grid">
                    {MoviesData.slice(0, visibleMoviesCount).map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            toggleLike={toggleLike}
                            likedMovies={likedMovies}
                            />
                    ))}
                </div>
                {MoviesData.length > visibleMoviesCount ?  (
                    <div className="movies__more-container">
                        <button 
                            className="movies__more-button" 
                            onClick={() => setVisibleMoviesCount(prevCount => prevCount + 16)}
                        >Ещё
                        </button>
                    </div>
                    ) : (
                    <div className="movies__placeholder"></div>
                )}
            </div>
        </section>
    );
}

export default MoviesCardList;
