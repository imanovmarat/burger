import api from "../../utils/api";

//TODO Уточнить! Нормальная практика вызывать экшн из другого экшна.

import { ORDER_DETAILS_SET_STATUS } from "./orderDetailsModal";

export const POST_ORDER = 'POST_ORDER';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export function sendOrder(ingredients) {
  return function (dispatch) {
    dispatch({
               type: POST_ORDER
             });
    api.sendOrder(ingredients).then(res => {
      if (res && res.success) {
        dispatch({
                   type: POST_ORDER_SUCCESS,
                   payload: res
                 });
        dispatch({ type: ORDER_DETAILS_SET_STATUS, payload: { isModalOpen: true } })
      } else {
        dispatch({
                   type: POST_ORDER_FAILED
                 });
      }
    })
       .catch(err => console.log('Error: ' + err))
  };
}
