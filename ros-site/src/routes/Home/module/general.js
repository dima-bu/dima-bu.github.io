export const SET_HIDDEN_TEXT = 'SET_HIDDEN_TEXT'
export const SET_VISABLE_TEXT = 'SET_VISABLE_TEXT'
export const CHANGE_HASH = 'CHANGE_HASH'
export const SCROLL_WINDOW = 'SCROLL_WINDOW'

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

export function scrollWindow (yPosition) {
  return {
    type    : SCROLL_WINDOW,
    payload : yPosition
  }
}

export const actions = {
  setHiddenText,
  setVisableText,
  changeHash,
  scrollWindow
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_HIDDEN_TEXT]    : state => { return Object.assign({}, state, { isHiddenText: true }) },
  [SET_VISABLE_TEXT] :  state => { return Object.assign({}, state, { isHiddenText: false }) },
  [SCROLL_WINDOW]: (state, action) => {
    return Object.assign({}, state, { yPosition: action.payload })
  },
  [CHANGE_HASH]    : (state, action) => {

    const hash = action.payload.split('#')[1]

    if (window.location.hash) {
      const newN = window.location.hash + '-' + hash
      // browserHistory.createLocation({hash: newN, pathname: '/'})
      window.location.hash = newN
    } else {
      // browserHistory.createLocation({hash: hash, pathname: '/'})
      window.location.hash = hash
    }

    return Object.assign({}, state, { hashState:  window.location.hash })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isHiddenText: false,
  hashState: browserHistory.getCurrentLocation().hash,
  yPosition: window.pageYOffset
}

export default function generalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
