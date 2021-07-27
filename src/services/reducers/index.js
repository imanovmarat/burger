import { combineReducers } from 'redux';
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../actions";
import { ingredientDetails } from "./ingredientDetailsModal";
import { orderDetails } from "./orderDetailsModal";
import { burgerConstructor } from "./burgerConstructor";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        ingredientsRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        ingredients: action.payload,
        // Запрос закончил своё выполнение
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        ingredientsFailed: true,
        // Запрос закончил своё выполнение
        ingredientsRequest: false
      };
    }
    default: {
      return state
    }
  }
}


export const rootReducer = combineReducers({ ingredients, ingredientDetails, orderDetails, burgerConstructor })
