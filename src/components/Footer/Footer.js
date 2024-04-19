import React from 'react';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { name: "Яндекс.Практикум", url: "https://practicum.yandex.ru/" },
    { name: "Github", url: "https://github.com/" }
  ];

  return (
    <footer className="footer">
      <section className="footer__container">
        <div className="footer__content">
          <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__line" />
          <div className="footer__nav-container">
            <div className="footer__year">© {year}</div>
            <div className="footer__nav-links">
              {links.map((link, index) => (
                <a key={index} href={link.url} className="footer__nav-link" target="_blank">{link.name}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
