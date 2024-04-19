import React from 'react';
import './Techs.css';

function TechBadge({ techName }) { 
    return (
        <li className="techs__list-item">{techName}</li>
    )
};

function Techs() {
    return (
        <section className="techs">
            <div className="techs__container">
                <h2 className="techs__title">Технологии</h2>
                <div className="techs__description-container">
                    <h3 className="techs__sub-title">7 технологий</h3>
                    <p className="techs__description">
                        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                    </p>
                    <ul className="techs__list">
                        {['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'].map((tech, index) => (
                        <TechBadge key={index} techName={tech} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
};

export default Techs;