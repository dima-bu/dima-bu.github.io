import { hashHistory, browserHistory } from 'react-router';
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const CHANGE_HASH = 'CHANGE_HASH'


// ---------------------

export function changeHash (hash) {
  return {
    type    : CHANGE_HASH,
    payload : hash
  }
}

export const actions = {
  changeHash
}

const initialState = {
  hashState: ''
};

const ACTION_HANDLERS = {
  [CHANGE_HASH]    : (state, action) => {
    const hash = action.payload.split('#')[1];

    if(window.location.hash) {
      window.location.hash = window.location.hash+'-'+hash;
    } else {
      window.location.hash = hash;
    }

    return Object.assign({}, state, { hashState: window.location.hash });
  }
};

export default function levelOneReducer (state = initialState, action) {

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
