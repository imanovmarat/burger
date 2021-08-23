import { deleteCookie, getCookie, setCookie } from "./helpers";

const BASE_URL = process.env.REACT_APP_API_URL;

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: { ...this._headers }
    })
      .then(checkResponse);

  }

  sendOrder(ingredients) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: getCookie('token')
      },
      body: JSON.stringify({
                             ingredients
                           })
    })
      .then(checkResponse);
  }

  checkEmail({ email }) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: 'POST',
      headers: { ...this._headers },
      body: JSON.stringify({
                             email
                           })
    })
      .then(checkResponse);
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
      .then(checkResponse);
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
    .then(checkResponse);
}

export const loginRequest = ({ email, password }) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse);
}

export const logoutRequest = () => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: localStorage.getItem('token') })
  })
    .then(checkResponse);
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
