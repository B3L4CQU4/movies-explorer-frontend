import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import './App.css';

function App() {
  const HeaderWithLocation = () => {
    const location = useLocation();
    const headerClass = location.pathname === '/' ? 'headerMine' : 'headerOther';
    return <Header className={headerClass} />;
  };



  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<><HeaderWithLocation /><Main /></>} />
          <Route path="/movies" element={<><HeaderWithLocation /><Movies /></>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
