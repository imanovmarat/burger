import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../actions";
import { ingredients } from './index';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(ingredients(undefined, {})).toEqual(initialState)
  })

  it('should return GET_INGREDIENTS_REQUEST', () => {
    expect(ingredients(initialState, {
      type: GET_INGREDIENTS_REQUEST,
    })).toEqual({
                  ...initialState,
                  ingredientsRequest: true,
                  ingredientsFailed: false,
                })
  })

  it('should return GET_INGREDIENTS_FAILED', () => {
    expect(ingredients(initialState, {
      type: GET_INGREDIENTS_FAILED,
    })).toEqual({
                  ...initialState,
                  ingredientsFailed: true,
                  ingredientsRequest: false
                })
  })
  it('should return GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredients(initialState, { type: GET_INGREDIENTS_SUCCESS, payload: 'something' })).toEqual({
                                                                                                         ...initialState,
                                                                                                         ingredients: 'something',
                                                                                                         ingredientsRequest: false
                                                                                                       })
  })

})
