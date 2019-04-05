import { createStore } from 'redux';

const defaultState = {
  isLoaded: false,
  error: ''
}

// ACTION TYPES
export const actionTypes = {
  THREE_LOADED: {
    ERROR: 'THREE_LOADED_ERROR',
    SUCCESS: 'THREE_LOADED_SUCCESS',
    PENDING: 'THREE_LOADED_PENDING'
  },
  THREE_ANIMATED: {
    ERROR: 'THREE_ANIMATED_ERROR',
    SUCCESS: 'THREE_ANIMATED_SUCCESS',
    PENDING: 'THREE_ANIMATED_PENDING'
  },
}

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.THREE_LOADED.ERROR:
      return {
        ...state,
        error: action.error
      };
    case actionTypes.THREE_LOADED.SUCCESS:
      return {
        ...state,
        isLoaded: true
      };
    case actionTypes.THREE_LOADED.PENDING:
      return {
        ...state,
        isLoaded: false
      };
    default:
      return state;
  }
}

// ACTIONS
export const threeStart = () => {
  console.log('Run: threeStart');
  return { type: actionTypes.THREE_LOADED.PENDING }
}

export const threeLoaded = () => {
  console.log('Run: threeLoaded');
  return { type: actionTypes.THREE_LOADED.SUCCESS }
}

export function initializeStore(initialState = defaultState) {
  return createStore(reducer, initialState)
}
