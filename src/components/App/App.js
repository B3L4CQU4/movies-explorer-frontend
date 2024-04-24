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
import SavedMoviesPage from '../Movies/SavedMoviesPage/SavedMoviesPage.js';
import auth from '../../utils/Auth.js';
import api from '../../utils/Api.js';
import ProtectedRoute from '../../utils/ProtectedRoute.js';
import moviesApi from '../../utils/MoviesApi.js';
import handleErrorMiddleware from '../../utils/handleErrorMiddleware.js';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../utils/contexts/CurrentUserContext.js';
import ErrorPopup from '../ErrorPopup/ErrorPopup.js';
import './App.css';

function App() {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(16);
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLogined, setIsLogined] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const jwt = localStorage.getItem('jwt');
      const isLogined = localStorage.getItem('isLogined'); // Получение статуса аутентификации из локального хранилища
      if (jwt && isLogined) {
        try {
          const tokenData = await auth.checkToken(jwt);
          const currentUser = await api.getUserInfo();
          setCurrentUser(currentUser);
          updateUserData(tokenData.email);
          setIsLogined(true);
        } catch (error) {
          console.log(error);
          setErrorMessage({ error, message: 'Bad token' });
          setIsLogined(false);
        }
      }
    };
  
    checkToken();
  }, []);

  useEffect(() => {
      if (isLogined) {
        Promise.all([api.getUserInfo(), getLikedMovies(), getMovies()])
          .then(([currentUser]) => {
            setCurrentUser(currentUser);
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage({ error, message: 'Failed to load data' });
          });
      }
    }, [isLogined]);


  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      const likedMovies = localStorage.getItem("likedMoviesData")
      setMoviesData(JSON.parse(likedMovies))
    } else if (localStorage.getItem("filteredMoviesData")) {
      setMoviesData(JSON.parse(localStorage.getItem('filteredMoviesData')));
      setSearchQuery(JSON.parse(localStorage.getItem("filteredInput")))
      setIsShortFilm(JSON.parse(localStorage.getItem("filteredToggle")))
    }
  }, [likedMovies]);


  const getMovies = async () => {
    try {
        const newMoviesData = await moviesApi.getMoviesCards();
        localStorage.setItem('allMoviesData', JSON.stringify(newMoviesData));
        return newMoviesData
    } catch (error) {
        setErrorMessage({ error, message: 'Failed fetching saved movies' });
    }
  };
  
  const getLikedMovies = async () => {
    try {
        const likedMovies = await api.getSavedMovies();
        localStorage.setItem("likedMoviesDataRaw", JSON.stringify(likedMovies));
        
        const likedMovieIds = likedMovies.map(movie => movie.movieId);
        let allMoviesData = JSON.parse(localStorage.getItem('allMoviesData')) || [];
        if (allMoviesData.length === 0) {
          allMoviesData = await getMovies(); 
        }
        const likedMoviesData = allMoviesData.filter(movie => likedMovieIds.includes(movie.id));
        localStorage.setItem("likedMoviesData", JSON.stringify(likedMoviesData));
        setLikedMovies(likedMoviesData);
    } catch (error) {
        setErrorMessage({ error, message: 'Failed fetching liked movies' });
    }
  };

  // возможность для расширения списка проектов 
  const portfolioLinks = [
    { id: 1, title: 'Статичный сайт', href: 'https://github.com/B3L4CQU4/russian-travel' },
    { id: 2, title: 'Адаптивный сайт', href: 'https://github.com/B3L4CQU4/mesto' },
    { id: 3, title: 'Одностраничное приложение', href: 'https://github.com/B3L4CQU4/react-mesto-api-full-gha' },
  ];

  const updateUserData = (newEmail) => {
    setCurrentUser(current => ({ ...current, email: newEmail }));
  };

  const handleRegistration = async (name, email, password, onSuccessful, onFailed) => {
    try {
      await auth.register(name, email, password);
      await handleLogin(email, password, onSuccessful, onFailed); // Вход сразу после успешной регистрации
      setIsLogined(true);
      onSuccessful(); 
    } catch (error) {
      console.log(error);
      const handledError = handleErrorMiddleware(error);
      onFailed(handledError); 
    }
  };
  
  const handleLogin = async (email, password, onSuccessful, onFailed) => {
    try {
      localStorage.clear();
      const authData = await auth.login(email, password);
      localStorage.setItem('jwt', authData.token);
      localStorage.setItem('isLogined', true); // Сохранение статуса аутентификации
      setIsLogined(true);
      onSuccessful();
    } catch (error) {
      console.log(error);
      console.log(`ошибка${isLogined}`);
      const handledError = handleErrorMiddleware(error);
      onFailed(handledError);
    }
  };

  const handleUpdateProfile = async (name, email, onSuccessful, onFailed) => {
    try {
            
      await api.updateProfile(name, email);
      const currentUser = await api.getUserInfo();
      setCurrentUser(currentUser);
      onSuccessful();
        
    } catch (error) {
        console.log(error);
        const handledError = handleErrorMiddleware(error);
        onFailed(handledError);
    }
  };

  const handleSearch = async (searchQuery, isShortFilm) => {
    try {
        // Проверяем, есть ли сохранённые фильмы
        if (!localStorage.getItem('allMoviesData')) {
            // Если сохранённых фильмов нет, выполняем запрос к API
            const newMoviesData = await moviesApi.getMoviesCards();
            // Сохраняем данные в локальном хранилище
            localStorage.setItem('allMoviesData', JSON.stringify(newMoviesData));
            // Вызываем функцию поиска по сохранённым фильмам
            searchSavedMovies(newMoviesData, searchQuery, isShortFilm);
        } else {
            // Если есть сохранённые фильмы, вызываем функцию поиска по сохранённым данным
            const savedMoviesData = JSON.parse(localStorage.getItem('allMoviesData'));
            searchSavedMovies(savedMoviesData, searchQuery, isShortFilm);
        }
    } catch (error) {
        setErrorMessage({ error, message: 'Failed to fetch movies' });
    }
  };

  const searchSavedMovies = (moviesData, searchQuery, isShortFilm) => {
    // Осуществляем поиск и фильтрацию по сохранённым данным
    if (!localStorage.getItem('filteredMoviesData')) {
      const filteredMoviesData = moviesData.filter(movie => {
        const isTitleContainsQuery = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
        const isShort = movie.duration < 40;
        return isTitleContainsQuery && (isShortFilm ? isShort : true);
      });
      setMoviesData(filteredMoviesData);
      localStorage.setItem('filteredMoviesData', JSON.stringify(filteredMoviesData));
      localStorage.setItem('filteredInput', JSON.stringify(searchQuery))
      localStorage.setItem('filteredToggle', JSON.stringify(isShortFilm))
    } else {
      //да, тут рекурсия. Наверное она тут оправдана 
      localStorage.removeItem('filteredMoviesData')
      searchSavedMovies(moviesData, searchQuery, isShortFilm)
    }
  };

  const handleLikedSearch = async (searchQuery, isShortFilm) => {
    if (!localStorage.getItem("likedMoviesData")) {
      // Если сохранённых фильмов нет, выполняем запрос к API
      const newLikedMoviesData = await getLikedMovies();
      // Вызываем функцию поиска по лайкнутым фильмам
      searchLikedMovies(newLikedMoviesData, searchQuery, isShortFilm);
    } else {
        // Если есть сохранённые фильмы, вызываем функцию поиска по сохранённым данным
        const savedLikedMoviesData = JSON.parse(localStorage.getItem("likedMoviesData"));
        searchLikedMovies(savedLikedMoviesData, searchQuery, isShortFilm);
    }
  }

  const searchLikedMovies = (moviesData, searchQuery, isShortFilm) => {
    // Осуществляем поиск и фильтрацию по сохранённым данным
    if (!localStorage.getItem('filteredLikedMoviesData')) {
      const filteredLikedMoviesData = moviesData.filter(movie => {
        const isTitleContainsQuery = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
        const isShort = movie.duration < 40;
        return isTitleContainsQuery && (isShortFilm ? isShort : true);
    });
      setMoviesData(filteredLikedMoviesData);
    } else {
      //да, тут рекурсия. Наверное она тут оправдана 
      localStorage.removeItem('filteredLikedMoviesData')
      searchLikedMovies(moviesData, searchQuery, isShortFilm)
    }
  };

  const logOut = () => {
    setIsLogined(false);
    localStorage.clear();
    navigate("/");
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

    const storedVisibleMoviesCount = localStorage.getItem('visibleMoviesCount');
    const storedShowMenu = localStorage.getItem('showMenu');
  
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

  const HeaderWithLocation = () => {
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
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
          <Route path="/signin" element={
            <>
            {!isLogined ? (
              <Login 
                handleLogin={handleLogin}
                title="Вход"
                name="Login"
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : (
              <Navigate to="/" replace />
            )}
            </>
          } />
          <Route path="/signup" element={
            <>
            {!isLogined ? (
              <Register 
                handleRegistration={handleRegistration} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}/>
            ) : (
              <Navigate to="/" replace />
            )}
            </>
          } />
          <Route path="/" element={
            <>
              <HeaderWithLocation />
              <Main portfolioLinks={portfolioLinks} />
            </>
          } />
          <Route path="/movies" element={
            <ProtectedRoute >
              <HeaderWithLocation />
              <Movies 
                moviesData={moviesData}
                setMoviesData={setMoviesData}
                visibleMoviesCount={visibleMoviesCount}
                setVisibleMoviesCount={setVisibleMoviesCount}
                likedMovies={likedMovies} 
                setLikedMovies={setLikedMovies}
                handleSearch={handleSearch}
                isLoading={isLoading}
                setIsLoading={setIsLoading} 
                currentUser={currentUser}
                searchQuery={searchQuery}
                isShortFilm={isShortFilm}
                setIsShortFilm={setIsShortFilm}
                setSearchQuery={setSearchQuery}
                />
              </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute >
              <HeaderWithLocation />
              <SavedMoviesPage 
                moviesData={moviesData}
                setMoviesData={setMoviesData}
                visibleMoviesCount={visibleMoviesCount}
                setVisibleMoviesCount={setVisibleMoviesCount}
                likedMovies={likedMovies} 
                setLikedMovies={setLikedMovies}
                handleLikedSearch={handleLikedSearch}
                isLoading={isLoading}
                setIsLoading={setIsLoading} 
                currentUser={currentUser}
                searchQuery={searchQuery}
                isShortFilm={isShortFilm}
                setIsShortFilm={setIsShortFilm}
                setSearchQuery={setSearchQuery}
                />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <HeaderWithLocation />
              <Profile 
                logOut={logOut}
                currentUser={currentUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                handleUpdateProfile={handleUpdateProfile}
                />
            </ProtectedRoute>
          } />
          <Route path="*" element={<PageNotFound />} />
      </Routes>
      {["/", "/movies", "/saved-movies"].includes(location.pathname) && <Footer />}
      </CurrentUserContext.Provider>
      {errorMessage && <ErrorPopup errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />}
    </div>
    
  );
}

export default App;