import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import search_icon from '../../../images/search_icon.svg';
import FormValidator from '../../FormValidator/FormValidator.js'; 
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SearchForm({ 
  handleSearch, 
  isLoading, 
  setIsLoading, 
  handleLikedSearch, 
  setIsShortFilm,
  setSearchQuery,
  isShortFilm,
  searchQuery
}) {

  const location = useLocation();

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    const regex = /^[a-zA-Zа-яА-ЯёЁ0-9][a-zA-Zа-яА-ЯёЁ0-9\s]*$/;
    if (regex.test(value) || value === '') {
        setSearchQuery(value);
    }
  };

  const handleShortFilmToggle = () => {
    setIsShortFilm(!isShortFilm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (location.pathname !== '/saved-movies') {
      try {
        await handleSearch(searchQuery, isShortFilm)
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setIsLoading(false);
      }
    }  else {
      try {
        await handleLikedSearch(searchQuery, isShortFilm)
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const formElement = document.querySelector('.search-form__container'); // Выбираем форму по классу
    const config = {
      inputSelector: '.search-form__element-input',
      saveBtnElement: '.search-form__element-submit',
      inactiveButtonClass: 'search-form__element-submit_disabled',
      inputErrorClass: 'login-form__element-input_type_error',
    };
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
  }, []);

  useEffect(() => {
    // Фильтрация результатов при изменении состояния isShortFil
  
    if (location.pathname !== '/saved-movies') {
      if (localStorage.getItem('filteredInput')) {
        const storedSearchQuery = JSON.parse(localStorage.getItem('filteredInput'));
        handleSearch(storedSearchQuery, isShortFilm);
      }
    } else {
      if (localStorage.getItem('filteredLikedInput')) {
        const storedSearchQuery = JSON.parse(localStorage.getItem('filteredLikedInput'));
        handleLikedSearch(storedSearchQuery, isShortFilm);
      } else {
        handleLikedSearch(searchQuery, isShortFilm);
      }
    }
  }, [isShortFilm]);

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={handleSubmit} noValidate>
        <div className="search-form__element" >
          <div className="search-form__element-container">
            <img src={search_icon} alt="" className="search-form__element-icon"/>
            <div className="search-form__element-input-container">
              <input 
                className="search-form__element-input" 
                placeholder="Фильм"
                value={searchQuery}
                onChange={handleSearchInputChange}
                name='filter'
                required
              />
              <button type='submit' className="search-form__element-submit">Найти</button>
            </div>
            <div className="search-form__element-filter">
                <input 
                  className="search-form__element-filter-toggle" 
                  type="checkbox"
                  checked={isShortFilm}
                  onChange={handleShortFilmToggle}
                />
                <span className="search-form__element-filter-text">Короткометражки</span>
            </div>
          </div>
        </div>
        <span id='filter-error' className='error error_filter'></span>
      </form>
    </section>
  );
}

export default SearchForm;

