import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'
import {loadTranslations, setLocale, syncTranslationWithStore} from 'lib/react-redux-i18n'
import {initTranslationsObject, jsonp, jsonpPromise} from 'lib/locale'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  syncTranslationWithStore(store)

  initTranslationsObject().then((langArray) => {

    const translationsObject = {}

    langArray.forEach(langObj => {
      translationsObject[langObj.lang] = langObj.vocabulary
    })

    store.dispatch(loadTranslations(translationsObject));

    if (localStorage.getItem('lang')) {
      store.dispatch(setLocale(localStorage.getItem('lang')))
    } else {
      jsonpPromise('https://dev.rosberry.com/lang.js?full_info=1&languages=ru,en').then((resp) => {
        store.dispatch(setLocale(resp))
        // if (data && data['X-Appengine-Country'] && data['X-Appengine-Country'] === 'RU') {
        //      store.dispatch(setLocale('ru'))
        //    } else {
        //      store.dispatch(setLocale('en'))
        //    }
      }).catch((e) =>{
        store.dispatch(setLocale('en'))
      })
    }
  })

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}