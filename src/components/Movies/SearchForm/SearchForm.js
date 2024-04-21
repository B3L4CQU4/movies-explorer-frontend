import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import search_icon from '../../../images/search_icon.svg';
import FormValidator from '../../FormValidator/FormValidator.js'; 

function SearchForm({ handleSearch, isLoading, setIsLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShortFilm, setIsShortFilm] = useState(false);

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
    try {
      await handleSearch(searchQuery, isShortFilm)
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      setIsLoading(false);
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

