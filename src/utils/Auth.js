class Auth {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        })
        .then(this._checkResponse);
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            email,
            password
          })
        })
        .then(this._checkResponse);
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(this._checkResponse);
    }
}

const auth = new Auth({
    baseUrl: 'https://api.belacqua-diploma.nomoredomainswork.ru',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default auth;