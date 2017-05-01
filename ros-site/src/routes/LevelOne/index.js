import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'levelOne',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const LevelOne = require('./containers/LevelOneContainer').default
      const reducer = require('./modules/levelOne').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'levelOne', reducer })

      /*  Return getComponent   */
      cb(null, LevelOne)

      /* Webpack named bundle   */
    }, 'levelOne')
  }
})
