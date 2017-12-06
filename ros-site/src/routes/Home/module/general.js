export const SET_HIDDEN_TEXT = 'SET_HIDDEN_TEXT'
export const SET_VISABLE_TEXT = 'SET_VISABLE_TEXT'
export const CHANGE_HASH = 'CHANGE_HASH'
export const SET_HASH = 'SET_HASH'
export const SCROLL_WINDOW = 'SCROLL_WINDOW'
export const SHOW_CASE_POPUP = 'SHOW_CASE_POPUP'
export const VISABLE_CASE_POPUP = 'VISABLE_CASE_POPUP'

import { hashHistory, browserHistory } from 'react-router'

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

export function setHash (hash) {
  return {
    type    : SET_HASH,
    payload : hash
  }
}

export function scrollWindow (yPosition) {
  return {
    type    : SCROLL_WINDOW,
    payload : yPosition
  }
}

export function showCasePopup (popupName) {
  return {
    type    : SHOW_CASE_POPUP,
    payload : popupName
  }
}

export function visableCasePopup (value) {
  return {
    type    : VISABLE_CASE_POPUP,
    payload : value
  }
}

export const actions = {
  setHiddenText,
  setVisableText,
  changeHash,
  setHash,
  scrollWindow,
  showCasePopup,
  visableCasePopup
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
  },
  [SET_HASH]    : (state, action) => {
    const hash = action.payload
    window.location.hash = hash
    return Object.assign({}, state, { hashState:  window.location.hash })
  },
  [SHOW_CASE_POPUP]: (state, action) => {
    const popupName = action.payload
    return Object.assign({}, state, { shownCasePopup: popupName })
  },
  [VISABLE_CASE_POPUP]: (state, action) => {
    const value = action.payload
    return Object.assign({}, state, { visabledCasePopup: value })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isHiddenText: false,
  hashState: browserHistory.getCurrentLocation().hash,
  yPosition: window.pageYOffset,
  shownCasePopup: '',
  visabledCasePopup: false
}

export default function generalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
