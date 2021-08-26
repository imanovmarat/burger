import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/wsActionTypes';
import { wsReducer } from './wsReducer';

const initialState = {
  wsConnected: false,
  messages: [],
  token: null,
  error: ''
};

describe('ws Reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState)
  })

  it('should return ws connection success', () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS, payload: 'token' })).toEqual({
                                                                                                 ...initialState,
                                                                                                 error: null,
                                                                                                 wsConnected: true,
                                                                                                 token: 'token'
                                                                                               })
  })

  it('should return ws connection error', () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_ERROR, payload: 'error' })).toEqual({
                                                                                               ...initialState,
                                                                                               error: 'error',
                                                                                               wsConnected: false,
                                                                                             })
  })

  it('should return ws closed connection ', () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_CLOSED, payload: 'error' })).toEqual({
                                                                                                ...initialState,
                                                                                                error: null,
                                                                                                wsConnected: false
                                                                                              })
  })

  it('should return ws message ', () => {
    expect(wsReducer(initialState, { type: WS_GET_MESSAGE, payload: 'message' })).toEqual({
                                                                                            ...initialState,
                                                                                            error: null,
                                                                                            messages: ['message']
                                                                                          })
  })
})

