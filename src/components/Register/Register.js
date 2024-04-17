import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';

function Register () {
    const FormElements = [
        { id: 1, className: 'name', text: 'Имя' },
        { id: 2, className: 'email', text: 'E-mail' },
        { id: 3, className: 'pass', text: 'Пароль' },
      ];

    function FormElement({ className, text }){
        return (
            <>
                <span className={`register-form__element-${className}`}>{text}</span>
                <input className={`register-form__element-${className}-input`}></input>
            </>
    
        )
      };

  return (
    <section className="register-form">
      <div className="register-form__container">
        <img className="register-form__logo" src={logo} alt="Лого"></img>
        <h1 className="register-form__title">Добро пожаловать!</h1>
        <form className="register-form__element">
            {FormElements.map((element) => (
                        <FormElement key={element.id} className={element.className} text={element.text} />
            ))}
            <button className="register-form__element-submit">Зарегистрироваться</button>
        </form>
        <div className="register-form__nav">
            <span className="register-form__nav-title">Уже зарегистрированы?</span>
            <a className="register-form__nav-link" href="/signin">Войти</a>
        </div>
      </div>
    </section>
  );
}

export default Register;