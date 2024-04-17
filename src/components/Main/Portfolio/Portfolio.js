import React from 'react';
import './Portfolio.css';
import rowImg from '../../../images/row_link.svg';
import avatar from '../../../images/avatar.png';

function Portfolio({ portfolioLinks }) {
  // возможность для расширения списка проектов 
  function PortfolioLink({ title, href }){
    return (
        <>
            <a href={href} className="portfolio__link">
                <div className="portfolio__link-title">{title}</div>
                <img className="portfolio__link-icon" src={rowImg} alt="Иконка стрелочки"/>
            </a>
            <div className="portfolio__link-line"></div>
        </>

    )
  };

  return (
    <>
      <section className="portfolio">
        <div className="portfolio__container">
            <h1 className="portfolio__title">Студент</h1>
            <div className="portfolio__title-line"></div>
            <div className="portfolio__description-container">
                <div className="portfolio__info">
                    <h2 className="portfolio__info-title">Lorem ipsum</h2>
                    <p className="portfolio__info-subtitle">Lorem ipsum dolor sit amet</p>
                    <p className="portfolio__info-description">
                    Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 
                    2015 года работал в компании «СКБ Контур». После того, как прошёл курс по 
                    веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <h2 className="portfolio__info-description-subtitle">Github</h2>
                </div>
                <img src={avatar} alt="Profile Avatar" className="portfolio__avatar"/>
            </div>
            <nav className="portfolio__nav">
                <h2 className="portfolio__subtitle">Портфолио</h2>
                {portfolioLinks.map((link) => (
                    <PortfolioLink key={link.id} title={link.title} href={link.href} />
                ))}
            </nav>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
