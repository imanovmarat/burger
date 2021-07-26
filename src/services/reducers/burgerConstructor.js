import {
  ADD_SELECTED_INGREDIENT,
  CHANGE_SELECTED_INGREDIENTS_ORDER,
  REMOVE_SELECTED_INGREDIENT
} from "../actions/burgerConstructor";

const initialState = {
  selectedIngredients: [],
  order: {}
}

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
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
    case ADD_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload]
      };
    }
    case REMOVE_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(i => i?.localId !== action.payload.localId)
      };
    }
    default: {
      return state
    }
  }
}
