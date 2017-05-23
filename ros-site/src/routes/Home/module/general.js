export const SET_HIDDEN_TEXT = 'SET_HIDDEN_TEXT'
export const SET_VISABLE_TEXT = 'SET_VISABLE_TEXT'
export const CHANGE_HASH = 'CHANGE_HASH'

import { hashHistory, browserHistory } from 'react-router';

// ------------------------------------
// Actions
// ------------------------------------
export function setHiddenText () {
  return {
    type    : SET_HIDDEN_TEXT
  }
}

export function setVisableText () {
  return {
    type    : SET_VISABLE_TEXT
  }
}

export function changeHash (hash) {
  return {
    type    : CHANGE_HASH,
    payload : hash
  }
}

export const actions = {
  setHiddenText,
  setVisableText,
  changeHash
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_HIDDEN_TEXT]    : state => { return Object.assign({}, state, { isHiddenText: true }) },
  [SET_VISABLE_TEXT] :  state => { return Object.assign({}, state, { isHiddenText: false }) },
  [CHANGE_HASH]    : (state, action) => {
    const hash = action.payload.split('#')[1];

    if(window.location.hash) {
      window.location.hash = window.location.hash+'-'+hash;
    } else {
      window.location.hash = hash;
    }

    return Object.assign({}, state, { hashState: window.location.hash });
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isHiddenText: false,
  hashState: ''
}

export default function generalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
