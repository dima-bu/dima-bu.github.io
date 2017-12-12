import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'trusted',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Trusted = require('./components/TrustedView').default
      const reducer = require('./modules/trusted').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'trusted', reducer })

      /*  Return getComponent   */
      cb(null, Trusted)

      /* Webpack named bundle   */
    }, 'trusted')
  }
})
