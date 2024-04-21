import React, { memo } from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import account_icon from '../../images/account_icon.svg';

function Header({ className, showMenu, isPopupOpen, setIsPopupOpen, isActiveMenuItem }) {
  const isLogined = localStorage.getItem("isLogined")
  return (
    <header className={`header ${className}`}>
      <div className="header__container">
        <nav className="header__nav-section">
          <a href="/" className="header__nav-logo">
            <img src={logo} alt="" className="header__logo" />
          </a>
          {isLogined && !showMenu ? (
            <ul className="header__nav-links">
              <li>
                  <a href="/movies" className={`header__nav-item ${isActiveMenuItem('/movies')}`}>Фильмы</a>
              </li>
              <li>
                  <a href="/saved-movies" className={`header__nav-item ${isActiveMenuItem('/saved-movies')}`}>Сохранённые фильмы</a>
              </li>
            </ul>
          ): null}
        </nav>
        {isLogined ? (
          !showMenu ? (
            <a href="/profile" className="header__account-section">
              <div className="header__account-details">
                <span className="header__account-text">Аккаунт</span>
                <div className="header__account-container">
                  <img loading="lazy" src={account_icon} alt="User Account" className="header__account-icon" />
                </div>
              </div>
            </a>
          ) : (
            <>
              <button className="header__menu-button" onClick={() => setIsPopupOpen(!isPopupOpen)} type='button'></button>
              {isPopupOpen && (<>
                <div className="header__menu-overlay"></div>
                <div className="header__menu">
                  <button className="header__menu-close-button" onClick={() => setIsPopupOpen(!isPopupOpen)} type='button'></button>
                  <div className="header__menu-container">
                    <ul className="header__menu-nav-links">
                      <li className="header__menu-item">
                        <a href="/" className={`header__menu-item-link ${isActiveMenuItem('/')}`}>Главная</a>
                      </li>
                      <li className="header__menu-item">
                        <a href="/movies" className={`header__menu-item-link ${isActiveMenuItem('/movies')}`}>Фильмы</a>
                      </li>
                      <li className="header__menu-item">
                        <a href="/saved-movies" className={`header__menu-item-link ${isActiveMenuItem('/saved-movies')}`}>Сохранённые фильмы</a>
                      </li>
                    </ul>
                      <a href="/profile" className="header__account-section header__account-section_menu">
                        <div className="header__account-details">
                          <span className="header__account-text">Аккаунт</span>
                            <div className="header__account-container">
                              <img loading="lazy" src={account_icon} alt="User Account" className="header__account-icon" />
                            </div>
                        </div>
                      </a>
                  </div>
                </div>
                </>
              )}
            </>
          )
        ) : (
          <ul className="header__unauthorized-section">
              <li>
                <a className="header__unauthorized-signup" href="/signup" >Регистрация</a>
              </li>
              <li className="header__unauthorized-signin">
                <a className="header__unauthorized-signin-text" href="/signin" >Войти</a>
              </li>
            </ul>
        )}
      </div>
    </header>
  );
}

export default memo(Header);