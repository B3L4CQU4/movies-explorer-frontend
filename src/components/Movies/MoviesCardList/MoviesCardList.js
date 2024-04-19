import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard.js';


function MoviesCardList({ MoviesData, setVisibleMoviesCount, visibleMoviesCount, toggleLike, likedMovies }) {
    return (
        <section className="movies">
            <div className="movies__container">
                <div className="movies__container-grid">
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
                            type='button'
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
