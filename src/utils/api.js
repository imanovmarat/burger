const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: { ...this._headers }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса getUserInfo');
      });

  }
}

const api = new Api({
  baseUrl: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
