import React from 'react';
import './Techs.css';

function TechBadge({ techName }) { 
    return (
        <div className="techsListItem">{techName}</div>
    )
};

function Techs() {
    return (
        <section className="techs">
            <div className="techsContainer">
                <h1 className="techsTitle">Технологии</h1>
                <div className="techsTitleLine"></div>
                <div className="techsDescriptionContainer">
                    <h2 className="techsSubTitle">7 технологий</h2>
                    <p className="techsDescription">
                        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                    </p>
                    <div className="techsList">
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