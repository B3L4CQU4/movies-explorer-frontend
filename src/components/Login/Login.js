import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';
import FormValidator from '../FormValidator/FormValidator.js'; 

function Login ({ handleLogin, isLoading, setIsLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSuccessful = () => {
    navigate('/movies'); 
  }; 

  const onFailed = (error) => {
    document.getElementById('pass-error').textContent = error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleLogin(email, password, onSuccessful, onFailed);
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false); 
      console.log(error);
    }
  };

  useEffect(() => {
    const formElement = document.querySelector('.login-form__element'); // Выбираем форму по классу
    const config = {
      inputSelector: '.login-form__element-pass-input, .login-form__element-email-input',
      saveBtnElement: '.login-form__element-submit',
      inactiveButtonClass: 'login-form__element-submit_disabled',
      inputErrorClass: 'login-form__element-input_type_error',
    };
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
  }, []);

  return (
    <section className="login-form">
      <div className="login-form__container">
        <a className="login-form__link" href='/'> 
          <img className="login-form__logo" src={logo} alt="Лого"></img>
        </a>
        <h1 className="login-form__title">Рады видеть!</h1>
        <form className="login-form__element" onSubmit={handleSubmit} noValidate>
          <span className="login-form__element-email">E-mail</span>
          <input 
            id='login-form__element-email-input'
            className="login-form__element-email-input"
            autoComplete="off"
            placeholder=""
            value={email}
            onChange={handleEmailChange}
            type="email"
            minLength="2"
            maxLength="40"
            name="email"
            required
          ></input>
          <span id="email-error" className='error'></span>
          <span className="login-form__element-pass">Пароль</span>
          <input 
            id='login-form__element-pass-input'
            name="pass"
            className="login-form__element-pass-input"
            placeholder=""
            value={password}
            onChange={handlePasswordChange}
            type="password"
            required
          ></input>
          <span id="pass-error" className='error'></span>
          <button className="login-form__element-submit" type='submit'>
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
        </form>
        <div className="login-form__nav">
            <span className="login-form__nav-title">Ещё не зарегистрированы?</span>
            <a className="login-form__nav-link" href="/signup">Регистрация</a>
        </div>

      </div>
    </section>
  );
}

export default Login;