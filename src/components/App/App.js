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
import CurrentUserContext from '../contexts/CurrentUserContext';
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
          console.log(`после кстановки в true = ${isLogined}`);
        } catch (err) {
          console.log(err);
          console.log(`после ошибки ${isLogined}`);
          setIsLogined(false);
        }
      }
    };
  
    checkToken();
  }, []);

  useEffect(() => {
    if (isLogined) {
        getSavedMovies();
    }
}, [isLogined]);

  useEffect(() => {
    const savedFilteredMoviesData = localStorage.getItem('filteredMoviesData');
    if (savedFilteredMoviesData) {
        setMoviesData(JSON.parse(savedFilteredMoviesData));
    }
  }, []);

  const getSavedMovies = async () => {
    try {
        const savedMoviesData = await api.getSavedMovies();
        setLikedMovies(savedMoviesData);
        // Сохраняем полученные фильмы в локальное хранилище
        localStorage.setItem('likedMovies', JSON.stringify(savedMoviesData));
    } catch (error) {
        console.error('Error fetching saved movies:', error);
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
      const currentUser = await api.getUserInfo()
      setCurrentUser(currentUser)
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
        console.error('Failed to fetch movies:', error);
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
      } else {
        //да, тут рекурсия. Наверное она тут оправдана 
        localStorage.removeItem('filteredMoviesData')
        searchSavedMovies(moviesData, searchQuery, isShortFilm)
      }
  };

  const logOut = () => {
    setIsLogined(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLogined'); // Удаление статуса аутентификации
    localStorage.removeItem('allMoviesData');
    localStorage.removeItem('filteredMoviesData');
    localStorage.removeItem('likedMovies');
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

  const toggleLike = async (movieId) => {
    try {
        // Step 1: Retrieve allMoviesData from local storage
        const allMoviesData = JSON.parse(localStorage.getItem('allMoviesData'));

        // Step 2: Find the movie in allMoviesData by id
        const movie = allMoviesData.find(movie => movie.id === movieId);
        if (!movie) {
            console.error('Movie not found');
            return;
        }

        // Step 3: Get the id from currentUser
        const userId = currentUser.id; // Assuming currentUser has an id property

        // Step 4: Check if the movie is already liked
        const isLiked = likedMovies.some(movie => movie.movieId === movieId);

        if (isLiked) {
          // Step 5: Find the movie by movieId in likedMovies
          const likedMovie = likedMovies.find(movie => movie.movieId === movieId);
          if (!likedMovie) {
              console.error('Liked movie not found');
              return;
          }

          // Step 6: Send request to api.deleteMovie to remove the movie by _id
          await api.deleteMovie(likedMovie._id);

          // Step 7: Update likedMovies state and local storage to remove the unliked movie
          const updatedLikedMovies = likedMovies.filter(movie => movie.movieId !== movieId);
          setLikedMovies(updatedLikedMovies);
          localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
        } else {
            // Step 7: Send request to api.createMovie to like the movie
            const newMovieData = {
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.belacqua-diploma.nomoredomainswork.ru${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.belacqua-diploma.nomoredomainswork.ru${movie.image.formats.thumbnail.url}`,
                movieId: movieId,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                userId: userId
            };

            const createdMovie = await api.createMovie(newMovieData);

            // Step 8: Add the response from api.createMovie to likedMovies
            setLikedMovies(prevLikedMovies => [...prevLikedMovies, createdMovie]);
            console.log(likedMovies);
        }
    } catch (error) {
        console.error('Error toggling like:', error);
    }
  };

  

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
              <Login 
                handleLogin={handleLogin}
                title="Вход"
                name="Login"
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Register 
                handleRegistration={handleRegistration} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
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
                toggleLike={toggleLike} 
                likedMovies={likedMovies} 
                setLikedMovies={setLikedMovies}
                handleSearch={handleSearch}
                isLoading={isLoading}
                setIsLoading={setIsLoading} 
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
                toggleLike={toggleLike} 
                likedMovies={likedMovies} 
                setLikedMovies={setLikedMovies}
                handleSearch={handleSearch}
                isLoading={isLoading}
                setIsLoading={setIsLoading} 
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
    </div>
    
  );
}

export default App;