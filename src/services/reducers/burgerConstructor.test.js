import {
  ADD_SELECTED_INGREDIENT,
  CHANGE_SELECTED_INGREDIENTS_ORDER,
  REMOVE_SELECTED_INGREDIENT
} from "../actions/burgerConstructor";

import { burgerConstructor } from './burgerConstructor';

const initialState = {
  selectedIngredients: [],
  order: {}
}

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructor(undefined, {})).toEqual(initialState)
  })

  it('should return CHANGE_SELECTED_INGREDIENTS_ORDER', () => {
    expect(burgerConstructor(initialState, {
      type: CHANGE_SELECTED_INGREDIENTS_ORDER,
      payload: { dragIndex: 1, hoverIndex: 0 }
    })).toEqual({
                  ...initialState,
                  selectedIngredients: [undefined],
                })
  })
  it('should return ADD_SELECTED_INGREDIENT', () => {
    expect(burgerConstructor(initialState, { type: ADD_SELECTED_INGREDIENT, payload: 'something' })).toEqual({
                                                                                                               ...initialState,
                                                                                                               selectedIngredients: ['something'],
                                                                                                             })
  })
  it('should return REMOVE_SELECTED_INGREDIENT', () => {
    expect(burgerConstructor(initialState, { type: REMOVE_SELECTED_INGREDIENT, payload: 'something' })).toEqual({
                                                                                                                  ...initialState,
                                                                                                                  selectedIngredients: [],
                                                                                                                })
  })

})
