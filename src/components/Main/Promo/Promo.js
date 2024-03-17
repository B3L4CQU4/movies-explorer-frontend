import React from "react";
import './Promo.css';
import landingLogo from '../../../images/landing_logo.svg';

function Promo() {
  return (
      <section className="promo">
        <div className="promoContainer">
            <h1 className="promoTitle">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <img
            loading="lazy"
            src={landingLogo}
            alt="Landing Logo"
            className="promoImage"
            />
        </div>
      </section>
  );
}

export default Promo;