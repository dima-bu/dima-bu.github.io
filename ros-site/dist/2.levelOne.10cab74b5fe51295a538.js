webpackJsonp([2],{

/***/ 616:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactRedux = __webpack_require__(526);

	var _levelOne = __webpack_require__(617);

	var _reactReduxI18n = __webpack_require__(291);

	var _LevelOne = __webpack_require__(618);

	var _LevelOne2 = _interopRequireDefault(_LevelOne);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*  Object of action creators (can also be function that returns object).
	 Keys will be passed as props to presentational components. Here we are
	 implementing our wrapper around increment; the component doesn't care   */

	var mapDispatchToProps = {
	  changeHash: _levelOne.changeHash,
	  setLocale: _reactReduxI18n.setLocale
	};
	/*  This is a container component. Notice it does not contain any JSX,
	 nor does it import React. This component is **only** responsible for
	 wiring in the actions and state necessary to render a presentational
	 component - in this case, the counter:   */

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    i18n: state.i18n,
	    hashState: state.levelOne.hashState
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

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_LevelOne2.default);

/***/ },

/***/ 617:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.actions = exports.CHANGE_HASH = exports.COUNTER_INCREMENT = undefined;

	var _defineProperty2 = __webpack_require__(447);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _assign = __webpack_require__(269);

	var _assign2 = _interopRequireDefault(_assign);

	exports.changeHash = changeHash;
	exports.default = levelOneReducer;

	var _reactRouter = __webpack_require__(212);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var COUNTER_INCREMENT = exports.COUNTER_INCREMENT = 'COUNTER_INCREMENT';
	var CHANGE_HASH = exports.CHANGE_HASH = 'CHANGE_HASH';

	// ---------------------

	function changeHash(hash) {
	  return {
	    type: CHANGE_HASH,
	    payload: hash
	  };
	}

	var actions = exports.actions = {
	  changeHash: changeHash
	};

	var initialState = {
	  hashState: ''
	};

	var ACTION_HANDLERS = (0, _defineProperty3.default)({}, CHANGE_HASH, function (state, action) {
	  var hash = action.payload.split('#')[1];

	  if (window.location.hash) {
	    window.location.hash = window.location.hash + '-' + hash;
	  } else {
	    window.location.hash = hash;
	  }

	  return (0, _assign2.default)({}, state, { hashState: window.location.hash });
	});

	function levelOneReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];


	  var handler = ACTION_HANDLERS[action.type];

	  return handler ? handler(state, action) : state;
	}

/***/ },

/***/ 618:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(509);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(513);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(514);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(515);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(516);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(24);

	var _react2 = _interopRequireDefault(_react);

	var _Projects = __webpack_require__(575);

	var _Projects2 = _interopRequireDefault(_Projects);

	var _Contacts = __webpack_require__(593);

	var _Contacts2 = _interopRequireDefault(_Contacts);

	var _Gif = __webpack_require__(605);

	var _Gif2 = _interopRequireDefault(_Gif);

	var _Nav = __webpack_require__(609);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _browserHistory = __webpack_require__(256);

	var _browserHistory2 = _interopRequireDefault(_browserHistory);

	var _hashHistory = __webpack_require__(264);

	var _hashHistory2 = _interopRequireDefault(_hashHistory);

	var _locale = __webpack_require__(451);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LevelOne = function (_React$Component) {
	  (0, _inherits3.default)(LevelOne, _React$Component);

	  function LevelOne() {
	    (0, _classCallCheck3.default)(this, LevelOne);
	    return (0, _possibleConstructorReturn3.default)(this, (LevelOne.__proto__ || (0, _getPrototypeOf2.default)(LevelOne)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(LevelOne, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {}
	  }, {
	    key: 'hasPath',
	    value: function hasPath(path) {
	      var pathname = _hashHistory2.default.getCurrentLocation().pathname;
	      return pathname.indexOf(path) >= 0;
	    }
	  }, {
	    key: 'getView',
	    value: function getView() {

	      var arr = [];
	      var pathname = _browserHistory2.default.getCurrentLocation().hash;

	      pathname = pathname.substr(1);
	      var elems = pathname.split('-');

	      elems.forEach(function (elem) {
	        if (elem === 'projects') {
	          arr.push(_react2.default.createElement(_Projects2.default, { key: 'projects' }));
	        }
	        if (elem === 'gif') {
	          arr.push(_react2.default.createElement(_Gif2.default, { key: 'gif' }));
	        }
	        if (elem === 'contacts') {
	          arr.push(_react2.default.createElement(_Contacts2.default, { key: 'contacts' }));
	        }
	      });

	      return _react2.default.createElement(
	        'div',
	        null,
	        arr,
	        _react2.default.createElement(_Nav2.default, { onChangeHash: this.props.changeHash }),
	        _react2.default.createElement(
	          'h3',
	          null,
	          this.props.hashState
	        ),
	        _react2.default.createElement(
	          'h2',
	          null,
	          (0, _locale.tr)('STUFF_TARIFFS')
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.getView();
	    }
	  }]);
	  return LevelOne;
	}(_react2.default.Component);

	exports.default = LevelOne;

/***/ }

});