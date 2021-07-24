import { INGREDIENT_DETAILS_SET_STATUS, INGREDIENT_DETAILS_SET_VALUE } from "../actions/modal";

const initialState = {
  selectedIngredient: {},
  isModalOpen: false
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_DETAILS_SET_STATUS: {
      if (!action.isModalOpen) {
        return {
          ...state,
          isModalOpen: action.isModalOpen,
          selectedIngredient: initialState.selectedIngredient
        }
      } else {
        return {
          ...state,
          isModalOpen: action.isModalOpen
        }
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
