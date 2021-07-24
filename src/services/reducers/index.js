import { combineReducers } from 'redux';

import {
  GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS,
  GET_SELECTED_INGREDIENTS, ADD_SELECTED_INGREDIENT, REMOVE_SELECTED_INGREDIENT, CHANGE_SELECTED_INGREDIENTS_ORDER

} from "../actions";
import { ingredientDetailsReducer } from "./modal";


const initialState = {
  ingredients: [],
  selectedIngredients: [],
  order: {},

  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
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
    case CHANGE_SELECTED_INGREDIENTS_ORDER: {
      const dragCard = state.selectedIngredients[action.payload.dragIndex]
      const newSelectedIngredients = [...state.selectedIngredients];
      newSelectedIngredients.splice(action.payload.dragIndex, 1);
      newSelectedIngredients.splice(action.payload.hoverIndex, 0, dragCard);
      return {
        ...state,
        selectedIngredients: newSelectedIngredients
      };
    }
    case GET_SELECTED_INGREDIENTS: {
      return {
        ...state
      };
    }
    case ADD_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload]
      };
    }
    case REMOVE_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(i => i?.itemId !== action.payload.itemId)
      };
    }
    default: {
      return state
    }
  }
}


export const rootReducer = combineReducers({ingredientsReducer, ingredientDetailsReducer})
