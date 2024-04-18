import React from "react";
import './Promo.css';
import landingLogo from '../../../images/landing_logo.svg';

function Promo() {
  return (
      <section className="promo">
        <div className="promo__container">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <img
            loading="lazy"
            src={landingLogo}
            alt="Логотип"
            className="promo__image"
            />
        </div>
      </section>
  );
}

export default Promo;
