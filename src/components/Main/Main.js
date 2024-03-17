import React from 'react';
import AboutProject from './AboutProject/AboutProject.js';
import Promo from './Promo/Promo.js';
import Techs from './Techs/Techs.js';
import Portfolio from './Portfolio/Portfolio.js';

function Main() {
  return (
    <>
        <Promo />
        <AboutProject />
        <Techs />
        <Portfolio />
    </>
  );
};

export default Main;