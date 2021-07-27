import { INGREDIENT_DETAILS_SET_STATUS, INGREDIENT_DETAILS_SET_VALUE } from "../actions/ingredientDetailsModal";

const initialState = {
  selectedIngredient: {},
  isModalOpen: false
}

export const ingredientDetails = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_DETAILS_SET_STATUS: {
        return {
          ...state,
          isModalOpen: action.payload.isModalOpen,
        }
    }
    case INGREDIENT_DETAILS_SET_VALUE: {
      return {
        ...state,
        selectedIngredient: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
