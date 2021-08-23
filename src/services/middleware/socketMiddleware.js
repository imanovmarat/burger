import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from "../actions/wsActionTypes";

export const socketMiddleware = (wsUrl) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { isAuthorized } = getState().profile;


      if (type === WS_CONNECTION_START) {
        const { token } = payload;
        console.log('сокет подключается, payload', payload)
        socket = new WebSocket(`${wsUrl}${token ? '?token=' + token : '/all'}`);
      }
      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(payload));
        }

        if (type === WS_CONNECTION_CLOSE) {
          const { code } = payload;
          socket.close(code);
        }
      }

      next(action);
    };
  };
};
