import React from 'react';
import './Techs.css';

function TechBadge({ techName }) { 
    return (
        <div className="techs__list-item">{techName}</div>
    )
};

function Techs() {
    return (
        <section className="techs">
            <div className="techs__container">
                <h1 className="techs__title">Технологии</h1>
                <div className="techs__title-line"></div>
                <div className="techs__description-container">
                    <h2 className="techs__sub-title">7 технологий</h2>
                    <p className="techs__description">
                        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                    </p>
                    <div className="techs__list">
                        {['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'].map((tech, index) => (
                        <TechBadge key={index} techName={tech} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Techs;