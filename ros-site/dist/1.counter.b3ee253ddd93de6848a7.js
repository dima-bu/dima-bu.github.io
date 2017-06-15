webpackJsonp([1],{

/***/ 512:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _reactRedux = __webpack_require__(380);

	var _counter = __webpack_require__(513);

	var _Counter = __webpack_require__(514);

	var _Counter2 = _interopRequireDefault(_Counter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*  Object of action creators (can also be function that returns object).
	    Keys will be passed as props to presentational components. Here we are
	    implementing our wrapper around increment; the component doesn't care   */

	var mapDispatchToProps = {
	    increment: function increment() {
	        return (0, _counter.increment)(1);
	    },
	    doubleAsync: _counter.doubleAsync
	};

	/*  This is a container component. Notice it does not contain any JSX,
	    nor does it import React. This component is **only** responsible for
	    wiring in the actions and state necessary to render a presentational
	    component - in this case, the counter:   */

	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        counter: state.counter
	    };
	};

	/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

	    import { createSelector } from 'reselect'
	    const counter = (state) => state.counter
	    const tripleCount = createSelector(counter, (count) => count * 3)
	    const mapStateToProps = (state) => ({
	      counter: tripleCount(state)
	    })

	    Selectors can compute derived data, allowing Redux to store the minimal possible state.
	    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
	    Selectors are composable. They can be used as input to other selectors.
	    https://github.com/reactjs/reselect    */

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Counter2.default);

/***/ },

/***/ 513:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.actions = exports.doubleAsync = exports.COUNTER_DOUBLE_ASYNC = exports.COUNTER_INCREMENT = undefined;

	var _defineProperty2 = __webpack_require__(353);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _promise = __webpack_require__(355);

	var _promise2 = _interopRequireDefault(_promise);

	var _ACTION_HANDLERS;

	exports.increment = increment;
	exports.default = counterReducer;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// ------------------------------------
	// Constants
	// ------------------------------------
	var COUNTER_INCREMENT = exports.COUNTER_INCREMENT = 'COUNTER_INCREMENT';
	var COUNTER_DOUBLE_ASYNC = exports.COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC';

	// ------------------------------------
	// Actions
	// ------------------------------------
	function increment() {
	  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	  return {
	    type: COUNTER_INCREMENT,
	    payload: value
	  };
	}

	/*  This is a thunk, meaning it is a function that immediately
	    returns a function for lazy evaluation. It is incredibly useful for
	    creating async actions, especially when combined with redux-thunk! */

	var doubleAsync = exports.doubleAsync = function doubleAsync() {
	  return function (dispatch, getState) {
	    return new _promise2.default(function (resolve) {
	      setTimeout(function () {
	        dispatch({
	          type: COUNTER_DOUBLE_ASYNC,
	          payload: getState().counter
	        });
	        resolve();
	      }, 200);
	    });
	  };
	};

	var actions = exports.actions = {
	  increment: increment,
	  doubleAsync: doubleAsync
	};

	// ------------------------------------
	// Action Handlers
	// ------------------------------------
	var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, COUNTER_INCREMENT, function (state, action) {
	  return state + action.payload;
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, COUNTER_DOUBLE_ASYNC, function (state, action) {
	  return state * 2;
	}), _ACTION_HANDLERS);

	// ------------------------------------
	// Reducer
	// ------------------------------------
	var initialState = 0;
	function counterReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  var handler = ACTION_HANDLERS[action.type];

	  return handler ? handler(state, action) : state;
	}

/***/ },

/***/ 514:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Counter = undefined;

	var _react = __webpack_require__(24);

	var _react2 = _interopRequireDefault(_react);

	var _Gif = __webpack_require__(494);

	var _Gif2 = _interopRequireDefault(_Gif);

	var _propTypes = __webpack_require__(378);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Counter = exports.Counter = function Counter(props) {
	  return _react2.default.createElement(
	    'div',
	    { style: { margin: '0 auto' } },
	    _react2.default.createElement(
	      'h2',
	      null,
	      'Counter: ',
	      props.counter
	    ),
	    _react2.default.createElement(_Gif2.default, null),
	    _react2.default.createElement(
	      'button',
	      { className: 'btn btn-default', onClick: props.increment },
	      'Increment'
	    ),
	    ' ',
	    _react2.default.createElement(
	      'button',
	      { className: 'btn btn-default', onClick: props.doubleAsync },
	      'Double (Async)'
	    )
	  );
	};

	Counter.propTypes = {
	  counter: _propTypes2.default.number.isRequired,
	  doubleAsync: _propTypes2.default.func.isRequired,
	  increment: _propTypes2.default.func.isRequired
	};

	exports.default = Counter;

/***/ }

});