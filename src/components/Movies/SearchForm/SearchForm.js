import React from 'react';
import './SearchForm.css';
import search_icon from '../../../images/search_icon.svg';

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__element">
          <div className="search-form__element-container">
            <img src={search_icon} alt="" className="search-form__element-icon" />
            <div className="search-form__element-input-container">
              <input className="search-form__element-input" placeholder="Фильм"></input>
              <button className="search-form__element-submit">Найти</button>
            </div>
            <div className="search-form__element-row"></div>
            <div className="search-form__element-filter">
                <input class="search-form__element-filter-toggle" type="checkbox" />
                <span className="search-form__element-filter-text">Короткометражки</span>
            </div>
          </div>
        </form>
        <div className="search-form__line"></div>
      </div>
    </section>
  );
}

export default SearchForm;

