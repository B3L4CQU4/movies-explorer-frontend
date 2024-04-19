import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';

function Login ({ toggleLogin }) {
    const FormElements = [
        { id: 1, className: 'email', text: 'E-mail' },
        { id: 2, className: 'pass', text: 'Пароль' },
      ];

    function FormElement({ className, text }){
        return (
            <>
                <span className={`login-form__element-${className}`}>{text}</span>
                <input className={`login-form__element-${className}-input`}></input>
            </>
    
        )
      };

  return (
    <section className="login-form">
      <div className="login-form__container">
        <a className="login-form__link" href='/'> 
          <img className="login-form__logo" src={logo} alt="Лого"></img>
        </a>
        <h1 className="login-form__title">Рады видеть!</h1>
        <form className="login-form__element">
            {FormElements.map((element) => (
                        <FormElement key={element.id} className={element.className} text={element.text} />
            ))}
            <button className="login-form__element-submit" onClick={toggleLogin} type='submit'>Войти</button>
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