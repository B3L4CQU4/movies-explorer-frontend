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
      <section className="footerContainer">
        <div className="footerContent">
          <p className="footerTitle">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footerLine" />
          <div className="footerNavContainer">
            <div className="footerYear">© {year}</div>
            <div className="footerNavlinks">
              {links.map((link, index) => (
                <a key={index} href={link.url} className="footerNavLink">{link.name}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;