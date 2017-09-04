import { hashHistory, browserHistory } from 'react-router';
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

// ---------------------

export const actions = {
  changeHash
}

const initialState = {
  isLoadingLocale: true
}

const SET_LOADING = 'SET_LOADING'

const ACTION_HANDLERS = {
  [SET_LOADING]    : (state, action) => {
    return Object.assign({}, state, { hashState: window.location.hash })
  }
}

export default function levelOneReducer (state = initialState, action) {

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
