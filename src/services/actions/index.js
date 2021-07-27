import api from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';


export const INCREASE_ITEM = 'INCREASE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
               type: GET_INGREDIENTS_REQUEST
             });
    api.getIngredients().then(res => {
      if (res && res.success) {
        dispatch({
                   type: GET_INGREDIENTS_SUCCESS,
                   payload: res.data
                 });
      } else {
        dispatch({
                   type: GET_INGREDIENTS_FAILED
                 });
      }
    })
       .catch(err => console.log('Error: ' + err))
  };
}
