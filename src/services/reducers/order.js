import { POST_ORDER, POST_ORDER_FAILED, POST_ORDER_SUCCESS } from "../actions/order";


const initialState = {
  orderData: null,
  orderRequest: false,
  orderFailed: false
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderData: action.payload,
        orderRequest: false
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };
    }
    default: {
      return state
    }
  }
}
