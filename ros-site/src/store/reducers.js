import { combineReducers } from 'redux'
import locationReducer from './location'
import { i18nReducer } from 'react-redux-i18n'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    i18n: i18nReducer,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
