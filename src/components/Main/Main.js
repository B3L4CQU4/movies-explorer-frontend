import React from 'react';
import AboutProject from './AboutProject/AboutProject.js';
import Promo from './Promo/Promo.js';
import Techs from './Techs/Techs.js';
import Portfolio from './Portfolio/Portfolio.js';

function Main({ portfolioLinks }) {
  return (
    <main>
        <Promo />
        <AboutProject />
        <Techs />
        <Portfolio portfolioLinks={portfolioLinks} />
    </main>
  );
};

export default Main;