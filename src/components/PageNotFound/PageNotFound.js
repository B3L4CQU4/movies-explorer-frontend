import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './PageNotFound.css';

function PageNotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-2, { replace: true });
    };

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__sub-title">Страница не найдена</p>
        <button className="not-found__link" onClick={handleGoBack}>Назад</button>
      </div>
    </section>
  );
}

export default PageNotFound;