import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project">
            <div className="about-project__container">
                <h2 className="about-project__title">О проекте</h2>
                <div className="about-project__details">
                    <div>
                        <h3 className="about-project__stage-title">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__stage-description">
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </div>
                    <div>
                        <h3 className="about-project__stage-title">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__stage-description">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </div>
                </div>
                <div className="about-project__summary">
                    <div className="about-project__summary-item">
                        <p className="about-project__summary-duration">1 неделя</p>
                        <p className="about-project__summary-title">Back-end</p>
                    </div>
                    <div className="about-project__summary-item">
                        <p className="about-project__summary-duration">4 недели</p>
                        <p className="about-project__summary-title">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AboutProject;