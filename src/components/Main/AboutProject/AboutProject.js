import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="aboutProject">
            <div className="aboutProjectContainer">
                <h2 className="aboutProjectTitle">О проекте</h2>
                <div className="aboutProjectTitleLine" />
                <div className="aboutProjectDetails">
                <div>
                    <h3 className="aboutProjectStageTitle">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutProjectStageDescription">
                    Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div>
                    <h3 className="aboutProjectStageTitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutProjectStageDescription">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
                </div>
                <div className="aboutProjectSummary">
                    <div className="aboutProjectSummaryItem">
                        <div className="aboutProjectSummaryDuration">1 неделя</div>
                        <div className="aboutProjectSummaryTitle">Back-end</div>
                    </div>
                    <div className="aboutProjectSummaryItem">
                        <div className="aboutProjectSummaryDuration">4 недели</div>
                        <div className="aboutProjectSummaryTitle">Front-end</div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AboutProject;