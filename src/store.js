import { createStore } from 'redux'

let id = 0
const initialState = {
  name: '',
  category: '',
  authorFirst: '',
  authorLast: '',
  ingredients: [],
  instructions: [],
  recipes: [], 
  id
}

// Action Types
export const UPDATE_NAME = 'UPDATE_NAME'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME'
export const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const ADD_INSTRUCTION = 'ADD_INSTRUCTION'
export const ADD_RECIPE = 'ADD_RECIPE'
export const CLEAR_INPUTS = 'CLEAR_INPUTS'
export const DELETE_RECIPE = 'DELETE_RECIPE'

// Action Builders
// function updateName(name) {
//   return {type: UPDATE_NAME, payload: name}
// }

// Reducer
function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload }
    case UPDATE_CATEGORY:
      return { ...state, category: payload }
    case UPDATE_FIRST_NAME:
      return {...state, authorFirst: payload}
    case UPDATE_LAST_NAME:
      return {...state, authorLast: payload}
    case ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, payload]}
    case ADD_INSTRUCTION:
      return {...state, instructions: [...state.instructions, payload]}
    case ADD_RECIPE:
      const {name, category, authorFirst, authorLast, ingredients, instructions} = state
      return {...state, recipes: [...state.recipes, {name, category, authorFirst, authorLast, ingredients, instructions, id: id++}]}
    case CLEAR_INPUTS:
      return {...state, name: '', category: '', authorFirst: '', authorLast: '', ingredients: [], instructions: []}
    case DELETE_RECIPE:
      const recipes = [...state.recipes]
      const index = recipes.findIndex(el => el.id === payload)
      recipes.splice(index, 1)
      return {...state, recipes}
    default:
      return state
  }
}

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
