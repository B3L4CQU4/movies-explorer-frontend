import React from 'react';
import './Portfolio.css';
import rowImg from '../../../images/row_link.svg';
import avatar from '../../../images/avatar.png';

function Portfolio() {
  const portfolioLinks = [
    { id: 1, title: 'Статичный сайт', href: '#' },
    { id: 2, title: 'Адаптивный сайт', href: '#' },
    { id: 3, title: 'Одностраничное приложение', href: '#' },
  ];

  function PortfolioLink({ title, href }){
    return (
        <>
            <a href={href} className="portfolioLinks">
                <div className="portfolioLinksTitle">{title}</div>
                <img className="portfolioLinksIcon" src={rowImg} alt="Иконка стрелочки"/>
            </a>
            <div className="portfolioLinksLine"></div>
        </>

    )
  };

  return (
    <>
      <section className="portfolio">
        <div className="portfolioContainer">
            <h1 className="portfolioTitle">Студент</h1>
            <div className="portfolioTitleLine"></div>
            <div className="portfolioDescriptionContainer">
                <div className="portfolioInfo">
                    <h2 className="portfolioInfoTitle">Lorem ipsum</h2>
                    <p className="portfolioInfoSubtitle">Lorem ipsum dolor sit amet</p>
                    <p className="portfolioInfoDescription">
                    Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 
                    2015 года работал в компании «СКБ Контур». После того, как прошёл курс по 
                    веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <h2 className="portfolioInfoDescriptionSubTitle">Github</h2>
                </div>
                <img src={avatar} alt="Profile Avatar" className="portfolioAvatar"/>
            </div>
            <nav className="portfolioNav">
                <h2 className="portfolioSubTitle">Портфолио</h2>
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