import { getCookie, setCookie } from "./helpers";

const BASE_URL = process.env.REACT_APP_API_URL;

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

  sendOrder(ingredients) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: { ...this._headers },
      body: JSON.stringify({
                             ingredients
                           })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса sendOrder');
      });
  }

  checkEmail({ email }) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: 'POST',
      headers: { ...this._headers },
      body: JSON.stringify({
                             email
                           })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса checkEmail');
      });
  }

  resetPassword({ password, token }) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: { ...this._headers },
      body: JSON.stringify({
                             password,
                             token
                           })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса resetPassword');
      });
  }
}

const api = new Api({
                      baseUrl: BASE_URL,
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    });

export default api;


export const registerRequest = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, name })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка запроса на регистрацию ');
    })
    .then((res) => res);
}

export const loginRequest = ({ email, password }) => {
  return fetchWithRefresh(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
}

export const logoutRequest = () => {
  return fetchWithRefresh(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: localStorage.getItem('token') })
  })
}

export const getUserRequest = () => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('token')
    }
  })
}

export const changeUserDataRequest = ({ email, name, password }) => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "authorization": getCookie('token')
    },
    body: JSON.stringify({
                           email,
                           name,
                           password
                         })
  })
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const refreshTokenRequest = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem('token') })
  })
    .then(checkResponse)
}

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      alert('jwt expired');
      const { refreshToken, accessToken } = await refreshTokenRequest();
      localStorage.setItem('token', refreshToken);
      setCookie('token', accessToken);
      options.headers.authorization = accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}
