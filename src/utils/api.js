const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getIngredients() {

    try {
      const res = await fetch(`${this._baseUrl}/ingredients`, {
        headers: { ...this._headers }
      });
      if (res.ok) {
        return await res.json()
      } else {
        throw new Error(res);
      }
    } catch (e) {
      return { msg: e};
    }
  }
}

const api = new Api({
  baseUrl: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
