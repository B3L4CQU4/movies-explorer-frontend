import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import account_img from '../../images/account_img.svg';

function Header({ className }) {
  return (
    <header className={`header ${className}`}>
      <div className="headerContainer">
        <nav className="headerNavSection">
          <img src={logo} alt="" className="headerLogo" />
          <ul className="headerNavLinks">
            <li>
                <a href="#" className="headerNavitem">Фильмы</a>
            </li>
            <li>
                <a href="#" className="headerNavitem">Сохранённые фильмы</a>
            </li>
          </ul>
        </nav>
        <a href="#" className="headerAccountSection">
          <div className="headerAccountDetails">
            <span className="headerAccountText">Аккаунт</span>
            <img loading="lazy" src={account_img} alt="User Account" className="headerAccountIcon" />
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;