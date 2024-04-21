import React, { useState, useEffect } from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';
import FormValidator from '../FormValidator/FormValidator.js'; 

function Register({handleRegistration, isLoading, setIsLoading}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => { 
    setName(event.target.value);
  };

  const handleEmailChange = (event) => { 
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleRegistration(name, email, password, onSuccessful, onFailed);
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false); 
      console.log(error);
    }
  };

  const onSuccessful = () => {
    navigate('/'); 
    console.log('Регистрация успешна');
  };

  const onFailed = (error) => {
    document.getElementById('password-error').textContent = error;
  };

  useEffect(() => {
    const formElement = document.querySelector('.register-form__element'); // Выбираем форму по классу
    const config = {
      inputSelector: '.register-form__element-name-input, .register-form__element-email-input, .register-form__element-pass-input',
      saveBtnElement: '.register-form__element-submit',
      inactiveButtonClass: 'register-form__element-submit_disabled',
      inputErrorClass: 'register-form__element-input_type_error',
    };
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
  }, []);

  return (
    <section className="register-form">
      <div className="register-form__container">
        <a className="register-form__link" href="/">
          <img className="register-form__logo" src={logo} alt="Лого" />
        </a>
        <h1 className="register-form__title">Добро пожаловать!</h1>
        <form className="register-form__element" onSubmit={handleSubmit} method="post" name='Form' id='Form' noValidate>
          <FormElement 
            name='name' 
            className='name' 
            text='Имя' 
            value={name}
            handleChange={handleNameChange}
            minLength="2"
            maxLength="40"
          />
          <FormElement 
            name='email' 
            className='email' 
            text='E-mail' 
            value={email}
            handleChange={handleEmailChange}
          />
          <FormElement 
            name='password' 
            className='pass' 
            text='Пароль' 
            value={password}
            handleChange={handlePasswordChange}
          />
          <button type="submit" className="register-form__element-submit">
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </button>
        </form>
        <div className="register-form__nav">
          <span className="register-form__nav-title">Уже зарегистрированы?</span>
          <a className="register-form__nav-link" href="/signin">
            Войти
          </a>
        </div>
      </div>
    </section>
  );
}

function FormElement({ name, className, text, value, handleChange, minLength, maxLength}) {
  return (
    <>
      <span className={`register-form__element-${className}`}>{text}</span>
      <input
        className={`register-form__element-${className}-input`}
        id={`register-form__element-${className}-input`}
        type={name}
        name={name}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span id={`${name}-error`} className='error'></span>
    </>
  );
}


export default Register;
