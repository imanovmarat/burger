import { ORDER_DETAILS_SET_STATUS, ORDER_DETAILS_SET_VALUE } from "../actions/orderDetailsModal";

const initialState = {
  orderId: 0,
  isModalOpen: false
}

export const orderDetails = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_SET_STATUS: {
      return {
        ...state,
        isModalOpen: action.payload.isModalOpen,
      }
    }

    case ORDER_DETAILS_SET_VALUE: {
      return {
        ...state,
        orderId: action.payload.orderId,
      }
    }
    default: {
      return state
    }
  }
}
