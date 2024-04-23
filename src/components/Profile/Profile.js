import React, { useState, useEffect, useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import FormValidator from '../FormValidator/FormValidator.js'; 
import './Profile.css';

function Profile ({ 
  logOut, 
  currentUser,
  isLoading, 
  setIsLoading, 
  handleUpdateProfile
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [formValidator, setFormValidator] = useState(null);
  const [isModified, setIsModified] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Добавленное состояние
  const userContext = useContext(CurrentUserContext);
  const [isSuccess, setIsSuccess] = useState(false);

  const ProfileElements = [
      { id: 1, className: 'name', infoText: 'Имя', text: `${currentUser.name}` },
      { id: 2, className: 'email', infoText: 'E-mail', text: `${currentUser.email}` },
  ];

  const handleEdit = () => {
      setIsEditing(!isEditing);
  };

  function ProfileElement({ className, infoText, text }){
      return (
          <div className="profile__info-container">
              <span className={`profile__info-${className}`}>{infoText}</span>
              <span className={`profile__info-${className}`}>{text}</span>
          </div>
      )
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          await handleUpdateProfile(name, email, onSuccessful, onFailed);
          setIsLoading(false); 
          setIsEditing(false)
      } catch (error) {
          setIsLoading(false); 
          console.log(error);
          setIsEditing(false)
      }
  };

  const handleNameChange = (event) => { 
    setName(event.target.value);
    if (userContext.name !== name || userContext.email !== email){
        setIsModified(true)
    } else {
        setIsModified(false)
    } // Обновляем isModified при изменении имени
    formValidator._checkInputValidity(event.target); 
};

const handleEmailChange = (event) => { 
    setEmail(event.target.value);
    if (userContext.name !== name || userContext.email !== email){
        setIsModified(false)
    } else {
        setIsModified(true)
    } // Обновляем isModified при изменении email
    formValidator._checkInputValidity(event.target);
};
  const onSuccessful = () => {
    setIsSuccess(true);
    setName(currentUser.name);
    setName(currentUser.email);
    setIsLoading(false);
};

  const onFailed = (error) => {
      document.getElementById('password-error').textContent = error;
  };

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);

  useEffect(() => {
    setIsButtonDisabled(true); // Блокируем кнопку при открытии формы
    if (isEditing) {
        const formElement = document.querySelector('.profile-form__element');
        const config = {
            inputSelector: '.profile__info-input',
            saveBtnElement: '.profile__save-button',
            inactiveButtonClass: 'profile__save-button_disabled',
            inputErrorClass: 'profile__info-input_type_error',
        };
        const validator = new FormValidator(config, formElement, userContext, isModified);
        validator.enableValidation();
        setFormValidator(validator); 
    } else {
        setIsButtonDisabled(false); // Разблокируем кнопку при закрытии формы
    }
}, [isEditing, isModified]);

  return (
      <section className="profile">
          <div className="profile__container">
              <h1 className="profile__title">Привет, {currentUser.name}</h1>
              {!isEditing ? (
                  <div className="profile__element">
                      {ProfileElements.map((element) => (
                          <ProfileElement 
                              key={element.id} 
                              className={element.className} 
                              text={element.text} 
                              infoText={element.infoText} 
                          />
                      ))}
                      {isSuccess && (
                                <span className='success-message'>
                                    Изменения успешно сохранены!
                                </span>
                            )}
                      <div className="profile__nav">
                          <button type='button' className="profile__nav-button" onClick={handleEdit}>Редактировать</button>
                          <button type='button' className="profile__nav-button" onClick={logOut} >Выйти из аккаунта</button>
                      </div>
                  </div>
              ) : (
                  <form className="profile-form__element" onSubmit={handleSubmit} method="post" name='updateForm' id='updateForm' noValidate>
                      <div className="profile__element">
                          <div className="profile__info-container profile__info-container_form">
                              <span className="profile__info-name">Имя</span>
                              <input 
                                  className="profile__info-name profile__info-input"
                                  name='name' 
                                  value={name}
                                  onChange={handleNameChange}
                                  minLength="2"
                                  maxLength="40"
                                  required
                              />
                          </div>
                          <span id={`name-error`} className='error error_profile'></span>
                          <div className="profile__info-container profile__info-container_form">
                              <span className="profile__info-email">E-mail</span>
                              <input 
                                  className="profile__info-email profile__info-input"
                                  name='email' 
                                  type='email'
                                  value={email}
                                  onChange={handleEmailChange}
                                  required
                              />
                          </div>
                          <span id={`email-error`} className='error error_profile'></span>
                          <div className="profile__nav">
                            <button 
                              type="submit" 
                              className={`profile__save-button ${isButtonDisabled ? 'profile__save-button_disabled' : ''}`}
                              disabled={isButtonDisabled}
                            >
                              {isLoading ? "Загрузка..." : "Сохранить"}
                            </button>
                          </div>
                      </div>
                  </form>
              )}

          </div>
      </section>
  );
}

export default Profile;
