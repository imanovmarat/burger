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
        return Promise.reject('Ошибка запроса getIngredients');
      });

  }

  sendOrder({ingredients}) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: { ...this._headers },
      body: JSON.stringify({
         ingredients: ingredients
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса sendOrder');
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
