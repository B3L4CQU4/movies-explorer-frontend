class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _getTokenHeaders() {
      const token = localStorage.getItem('jwt');
      return {
        ...this._headers,
        authorization: `Bearer ${token}`
      };
    }
  
    // Получение информации о пользователе
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._getTokenHeaders()
      })
      .then(this._checkResponse);
    }
  
    getSavedMovies() {
      return fetch(`${this._baseUrl}/movies`, {
        headers: this._getTokenHeaders()
      })
      .then(this._checkResponse);
    }
  
    updateProfile(name, email) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._getTokenHeaders(),
        body: JSON.stringify({
          name: name,
          email: email
        })
      })
      .then(this._checkResponse);
    }
  
    createMovie(newMovieData) {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._getTokenHeaders(),
        body: JSON.stringify(newMovieData)
      })
      .then(this._checkResponse);
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    deleteMovie(cardId) {
      return fetch(`${this._baseUrl}/movies/${cardId}`, {
        method: 'DELETE',
        headers: this._getTokenHeaders(),
      })
      .then(this._checkResponse);
    }
  
    changeLikeCardStatus(cardId, like) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: like ? 'PUT' : 'DELETE',
        headers: this._getTokenHeaders(),
      })
      .then(this._checkResponse);
    }
  }
  
  const api = new Api({
    baseUrl: 'https://api.belacqua-diploma.nomoredomainswork.ru',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default api;