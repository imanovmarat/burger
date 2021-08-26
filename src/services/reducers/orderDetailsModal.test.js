import { orderDetails } from './orderDetailsModal';
import { ORDER_DETAILS_SET_STATUS, ORDER_DETAILS_SET_VALUE } from "../actions/orderDetailsModal";

const initialState = {
  orderId: 0,
  isModalOpen: false
}

describe('ws Reducer', () => {
  it('should return the initial state', () => {
    expect(orderDetails(undefined, {})).toEqual(initialState)
  })

  it('should return ORDER_DETAILS_SET_STATUS', () => {
    expect(orderDetails(initialState, { type: ORDER_DETAILS_SET_STATUS, payload: { isModalOpen: true } })).toEqual({
                                                                                                                     ...initialState,
                                                                                                                     isModalOpen: true
                                                                                                                   })
  })
  it('should return ORDER_DETAILS_SET_VALUE', () => {
    expect(orderDetails(initialState, { type: ORDER_DETAILS_SET_VALUE, payload: { orderId: 'bla' } })).toEqual({
                                                                                                                 ...initialState,
                                                                                                                 orderId: 'bla'
                                                                                                               })
  })
})

