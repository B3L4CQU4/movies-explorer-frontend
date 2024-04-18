import React from 'react';
import './Profile.css';

function Profile ({ toggleLogin }) {
    const ProfileElements = [
        { id: 1, className: 'name', infoText: 'Имя', text: 'Виталий' },
        { id: 2, className: 'email', infoText: 'E-mail', text: 'pochta@yandex.ru' },
      ];

    function ProfileElement({ className, infoText, text }){
        return (
            <>
            <div className="profile__info-container">
                <span className={`profile__info-${className}`}>{infoText}</span>
                <span className={`profile__info-${className}`}>{text}</span>
            </div>

            </>
    
        )
      };

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <div className="profile__element">
            {ProfileElements.map((element) => (
                        <ProfileElement 
                            key={element.id} 
                            className={element.className} 
                            text={element.text} 
                            infoText={element.infoText} 
                        />
            ))}
            <div className="profile__nav">
                <button className="profile__nav-button" >Редактировать</button>
                <button className="profile__nav-button" onClick={toggleLogin} >Выйти из аккаунта</button>
            </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;