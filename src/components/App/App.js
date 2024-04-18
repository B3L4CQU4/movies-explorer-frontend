import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate} from 'react-router-dom';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import MoviesData from './MoviesData.js';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(16);
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLogined, setIsLogined] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  // возможность для расширения списка проектов 
  const portfolioLinks = [
    { id: 1, title: 'Статичный сайт', href: 'https://github.com/B3L4CQU4/russian-travel' },
    { id: 2, title: 'Адаптивный сайт', href: 'https://github.com/B3L4CQU4/mesto' },
    { id: 3, title: 'Одностраничное приложение', href: 'https://github.com/B3L4CQU4/react-mesto-api-full-gha' },
  ];

  const toggleLogin = () => {
    setIsLogined(prevIsLogined => !prevIsLogined);
    localStorage.setItem('isLogined', JSON.stringify(!isLogined));
    performNavigation();
  };

  const performNavigation = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleResize = async () => {
      if (window.matchMedia("(max-width: 320px)").matches) {
        setVisibleMoviesCount(5);
        setShowMenu(true);
        localStorage.setItem('visibleMoviesCount', 5);
        localStorage.setItem('showMenu', true);
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setVisibleMoviesCount(8);
        setShowMenu(true);
        localStorage.setItem('visibleMoviesCount', 8);
        localStorage.setItem('showMenu', true);
      } else {
        setVisibleMoviesCount(16);
        setShowMenu(false);
        localStorage.setItem('visibleMoviesCount', 16);
        localStorage.setItem('showMenu', false);
      }
    };

    const storedIsLogined = localStorage.getItem('isLogined');
    const storedVisibleMoviesCount = localStorage.getItem('visibleMoviesCount');
    const storedShowMenu = localStorage.getItem('showMenu');

    if (storedIsLogined !== null) {
      setIsLogined(JSON.parse(storedIsLogined));
    }
  
    if (storedVisibleMoviesCount !== null) {
      setVisibleMoviesCount(Number(storedVisibleMoviesCount));
    }
  
    if (storedShowMenu !== null) {
      setShowMenu(storedShowMenu === 'true');
    }

    handleResize();
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleLike = (movieId) => {
    if (likedMovies.includes(movieId)) {
      setLikedMovies(likedMovies.filter(id => id !== movieId));
    } else {
      setLikedMovies([...likedMovies, movieId]);
    }
  };

  const HeaderWithLocation = () => {
    const location = useLocation();
    const headerClass = location.pathname === '/' ? 'header-mine' : 'header-other';
    const isActiveMenuItem = (path) => {
      return location.pathname === path ? 'active-menu-item' : '';
    };
    return <Header 
              className={headerClass} 
              isLogined={isLogined} 
              showMenu={showMenu}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
              isActiveMenuItem={isActiveMenuItem}
              />;
  };

  return (
    <div className="App">
      <Routes>
          <Route path="/signin" element={
            <>
              <Login toggleLogin={toggleLogin} />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Register />
            </>
          } />
          <Route path="/" element={
            <>
              <HeaderWithLocation />
              <Main portfolioLinks={portfolioLinks} />
            </>
          } />
          <Route path="/movies" element={
            <>
              <HeaderWithLocation />
              <Movies 
                MoviesData={MoviesData}
                visibleMoviesCount={visibleMoviesCount}
                setVisibleMoviesCount={setVisibleMoviesCount}
                toggleLike={toggleLike} 
                likedMovies={likedMovies} 
                />
            </>
          } />
          <Route path="/saved-movies" element={
            //после добавления авторизации код изменится
            <>
              <HeaderWithLocation />
              <Movies 
                MoviesData={MoviesData}
                visibleMoviesCount={visibleMoviesCount}
                setVisibleMoviesCount={setVisibleMoviesCount}
                toggleLike={toggleLike} 
                likedMovies={likedMovies} 
                />
            </>
          } />
          <Route path="/profile" element={
            <>
              <HeaderWithLocation />
              <Profile toggleLogin={toggleLogin} />
            </>
          } />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {
        window.location.pathname !== "/signin" && 
        window.location.pathname !== "/signup" && 
        window.location.pathname !== "/profile" && 
        window.location.pathname !== "/404" && 
        <Footer />
      }
    </div>
  );
}

export default App;
