import { useMemo } from 'react';
import { createStore } from 'redux';

let store;

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
const reducer = (state = defaultState, action) => {
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

// Call dispatch with the actions
//
// const mapDispatchToProps = dispatch => ({
//  callDispatch: () => {
//    dispatch(threeLoaded())
//  }
// });
//
// In the component
// this.props.callDispatch();

export const threeStart = () => {
  return { type: actionTypes.THREE_LOADED.PENDING }
}

export const threeLoaded = () => {
  return { type: actionTypes.THREE_LOADED.SUCCESS }
}

function preStore(preLoadedState = defaultState) {
  return createStore(reducer, preLoadedState);
}

export function initializeStore(preLoadedState) {
  let _store = store ?? preStore(preLoadedState);

  if (preLoadedState && store) {
    _store = pretore({
      ...store.getState(),
      ...preLoadedState,
    })
    // Reset the current store
    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
}

export function useStore(defaultState) {;
  const store = useMemo(() => initializeStore(defaultState), [defaultState]);
  return store;
}
