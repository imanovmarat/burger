import { POST_ORDER, POST_ORDER_FAILED, POST_ORDER_SUCCESS } from "../actions/order";
import { order } from './order';

const initialState = {
  orderData: null,
  orderRequest: false,
  orderFailed: false
};

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(order(undefined, {})).toEqual(initialState)
  })

  it('should return POST_ORDER', () => {
    expect(order(initialState, { type: POST_ORDER })).toEqual({
                                                                ...initialState,
                                                                orderRequest: true,
                                                                orderFailed: false,
                                                              })
  })

  it('should return POST_ORDER_FAILED', () => {
    expect(order(initialState, { type: POST_ORDER_FAILED })).toEqual({
                                                                       ...initialState,
                                                                       orderFailed: true,
                                                                       orderRequest: false
                                                                     })
  })

  it('should return POST_ORDER_SUCCESS', () => {
    expect(order(initialState, { type: POST_ORDER_SUCCESS, payload: {} })).toEqual({
                                                                                     ...initialState,
                                                                                     orderData: {},
                                                                                     orderRequest: false
                                                                                   })
  })
})
