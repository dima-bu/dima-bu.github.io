export const SET_HIDDEN_TEXT = 'SET_HIDDEN_TEXT'
export const SET_VISABLE_TEXT = 'SET_VISABLE_TEXT'

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

export const actions = {
  setHiddenText,
  setVisableText
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_HIDDEN_TEXT]    : state => { return Object.assign({}, state, { isHiddenText: true }) },
  [SET_VISABLE_TEXT] :  state => { return Object.assign({}, state, { isHiddenText: false }) }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isHiddenText: false
}

export default function generalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
