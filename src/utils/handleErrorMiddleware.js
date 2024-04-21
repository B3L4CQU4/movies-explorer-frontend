const handleErrorMiddleware = (error) => {
    if (error === 'Ошибка: 400/Bad Request') {
      return 'Неверный email или пароль';
    }

    if (error === 'Ошибка: 409/Conflict') {
        return 'Пользователь с таким email уже существует.';
      }

    if (error === 'Ошибка: 500/Internal Server Error') {
        return '500 На сервере произошла ошибка.';
    }

    return error;
  };

export default handleErrorMiddleware