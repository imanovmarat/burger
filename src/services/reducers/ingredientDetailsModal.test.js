import { INGREDIENT_DETAILS_SET_STATUS, INGREDIENT_DETAILS_SET_VALUE } from "../actions/ingredientDetailsModal";

import { ingredientDetails } from './ingredientDetailsModal';

const initialState = {
  selectedIngredient: null,
  isModalOpen: false
}

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientDetails(undefined, {})).toEqual(initialState)
  })

  it('should return INGREDIENT_DETAILS_SET_STATUS', () => {
    expect(ingredientDetails(initialState, {
      type: INGREDIENT_DETAILS_SET_STATUS,
      payload: { isModalOpen: true }
    })).toEqual({
                  ...initialState,
                  isModalOpen: true,
                })
  })
  it('should return INGREDIENT_DETAILS_SET_VALUE', () => {
    expect(ingredientDetails(initialState, { type: INGREDIENT_DETAILS_SET_VALUE, payload: 'something' })).toEqual({
                                                                                                                    ...initialState,
                                                                                                                    selectedIngredient: 'something',
                                                                                                                  })
  })

})
