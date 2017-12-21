webpackJsonp([3],{

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(321);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(325);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(326);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(330);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(363);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(60);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	__webpack_require__(609);
	
	var _Bubble = __webpack_require__(431);
	
	var _Bubble2 = _interopRequireDefault(_Bubble);
	
	var _locale = __webpack_require__(373);
	
	var _reactRedux = __webpack_require__(402);
	
	var _reactReduxI18n = __webpack_require__(311);
	
	var _classnames = __webpack_require__(434);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Projects = __webpack_require__(438);
	
	var _Projects2 = _interopRequireDefault(_Projects);
	
	var _Contacts = __webpack_require__(485);
	
	var _Contacts2 = _interopRequireDefault(_Contacts);
	
	var _Gif = __webpack_require__(497);
	
	var _Gif2 = _interopRequireDefault(_Gif);
	
	var _OtherSite = __webpack_require__(514);
	
	var _OtherSite2 = _interopRequireDefault(_OtherSite);
	
	var _FinishSection = __webpack_require__(515);
	
	var _FinishSection2 = _interopRequireDefault(_FinishSection);
	
	var _browserHistory = __webpack_require__(276);
	
	var _browserHistory2 = _interopRequireDefault(_browserHistory);
	
	var _Nav = __webpack_require__(521);
	
	var _Nav2 = _interopRequireDefault(_Nav);
	
	var _Time = __webpack_require__(453);
	
	var _Time2 = _interopRequireDefault(_Time);
	
	var _reactGsapEnhancer = __webpack_require__(464);
	
	var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer);
	
	var _gsap = __webpack_require__(470);
	
	var _lodash = __webpack_require__(528);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _Popup = __webpack_require__(529);
	
	var _Popup2 = _interopRequireDefault(_Popup);
	
	var _CaseTrusted = __webpack_require__(537);
	
	var _CaseTrusted2 = _interopRequireDefault(_CaseTrusted);
	
	var _index = __webpack_require__(591);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import { changeHash, scrollWindow, showCasePopup, visableCasePopup, setHash } from './../module/general.js'
	var TrustedView = function (_React$Component) {
	  (0, _inherits3.default)(TrustedView, _React$Component);
	
	  function TrustedView(props) {
	    (0, _classCallCheck3.default)(this, TrustedView);
	    return (0, _possibleConstructorReturn3.default)(this, (TrustedView.__proto__ || (0, _getPrototypeOf2.default)(TrustedView)).call(this, props));
	  }
	
	  (0, _createClass3.default)(TrustedView, [{
	    key: 'handlerClosePopup',
	    value: function handlerClosePopup() {}
	  }, {
	    key: 'render',
	    value: function render() {
	
	      return _react2.default.createElement(
	        _Popup2.default,
	        { onClose: this.handlerClosePopup, visabledCasePopup: true },
	        _react2.default.createElement(_CaseTrusted2.default, { locale: this.props.i18n.locale })
	      );
	    }
	  }]);
	  return TrustedView;
	}(_react2.default.Component);
	
	var mapDispatchToProps = {
	  setLocale: _reactReduxI18n.setLocale
	  //changeHash: changeHash,
	  //setHash: setHash,
	  //scrollWindow: scrollWindow,
	  //showCasePopup: showCasePopup,
	  //visableCasePopup: visableCasePopup
	};
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    i18n: state.i18n,
	    hash: state.location.hash
	    //isHiddenText: state.general.isHiddenText,
	    //hashState : state.general.hashState,
	    //yPosition: state.general.yPosition,
	    //shownCasePopup:  state.general.shownCasePopup,
	    //visabledCasePopup:  state.general.visabledCasePopup
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactGsapEnhancer2.default)(TrustedView));

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(610);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(424)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(610, function() {
				var newContent = __webpack_require__(610);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(423)();
	// imports
	
	
	// module
	exports.push([module.id, ".splash{opacity:1}.splash,.splash.isHide{transition:opacity .35s ease-in,height .35s ease-in}.splash.isHide{opacity:.01}.splash.isShow{transition:opacity .35s ease-in,height .35s ease-in;opacity:1}.example-appear,.example-enter{opacity:.01}.example-appear.example-appear-active,.example-enter.example-enter-active{opacity:.01;transition:opacity 1s ease-in}.wrapper{display:block;height:100%;opacity:1}.wrapper,.wrapper.isHide{transition:opacity 1s ease-in,height 1s ease-in}.wrapper.isHide{opacity:.01}.wrapper.isShow{transition:opacity 1s ease-in,height 1s ease-in;opacity:1}.main-area{padding-top:40px}h1{opacity:1;transition:opacity 1s ease-in}.sophis-video-control{display:none}.bubble-row{margin-bottom:30px}.bubble-row.-first-bubble{margin-top:calc(50vh - 240px)}@media (max-width:767px){.bubble-row.container{padding-left:10px;padding-right:10px}.bubble-row.-first-bubble{margin-top:calc(50vh - 190px)}}@media (max-width:768px) and (max-height:414px){.bubble-row.-first-bubble{margin-top:0}.bottom-links_wrapper{position:relative!important}}@media (max-width:480px){.bubble-row.-first-bubble{margin-top:calc(50vh - 210px)}}", "", {"version":3,"sources":["/home/dima/projects/dima-bu.github.io/ros-site/src/routes/Trusted/components/src/routes/Trusted/components/TrustedView.scss"],"names":[],"mappings":"AAGA,QAEE,SAAU,CAFZ,uBAGE,mDAAqF,CAHvF,eAOI,WAAa,CAPjB,eAWI,oDAAqF,SAC3E,CACX,+BAMD,WAAa,CACd,0EAIC,YAAa,6BACsB,CACpC,SAGC,cAAc,YACF,SACF,CAHZ,yBAIE,+CAAyD,CAJ3D,gBASI,WAAa,CATjB,gBAaI,gDAAyD,SAC/C,CACX,WAKD,gBAAiB,CAGlB,GAGC,UAAU,6BACwB,CACnC,sBAGC,YAAa,CACd,YAGC,kBAAmB,CADrB,0BAII,6BAA8B,CAC/B,yBAKD,sBACE,kBAAkB,kBACC,CACpB,0BAIG,6BAA8B,CAC/B,CAAA,gDAMH,0BAEI,YAAa,CACd,sBAID,2BAA6B,CAC9B,CAAA,yBAKD,0BAEI,6BAA8B,CAC/B,CAAA","file":"TrustedView.scss","sourcesContent":["@import './../../../styles/variables';\n\n\n.splash {\n\n  opacity: 1;\n  transition: opacity $translate-animation ease-in, height $translate-animation ease-in;\n\n  &.isHide {\n    transition: opacity $translate-animation ease-in, height $translate-animation ease-in;\n    opacity: 0.01;\n  }\n\n  &.isShow {\n    transition: opacity $translate-animation ease-in, height $translate-animation ease-in;\n    opacity: 1;\n  }\n}\n\n\n.example-appear,\n.example-enter {\n  opacity: 0.01;\n}\n\n.example-appear.example-appear-active,\n.example-enter.example-enter-active {\n  opacity: 0.01;\n  transition: opacity 1000ms  ease-in;\n}\n\n.wrapper {\n  display: block;\n  height: 100%;\n  opacity: 1;\n  transition: opacity 1000ms ease-in, height 1000ms ease-in;\n\n\n  &.isHide {\n    transition: opacity 1000ms ease-in, height 1000ms ease-in;\n    opacity: 0.01;\n  }\n\n  &.isShow {\n    transition: opacity 1000ms ease-in, height 1000ms ease-in;\n    opacity: 1;\n  }\n\n}\n\n.main-area {\n  padding-top: 40px;\n  //min-height: calc(100vh - 200px);\n\n}\n\nh1 {\n  opacity: 1;\n  transition: opacity 1000ms ease-in;\n}\n\n.sophis-video-control {\n  display: none;\n}\n\n.bubble-row {\n  margin-bottom: 30px;\n\n  &.-first-bubble {\n    margin-top: calc(50vh - 240px);\n  }\n\n}\n\n@media (max-width: $screen-xs-max) {\n  .bubble-row.container {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n\n  .bubble-row {\n    &.-first-bubble {\n      margin-top: calc(50vh - 190px);\n    }\n  }\n\n}\n\n@media (max-width: $screen-sm-min) and (max-height: $screen-xs-max-height) {\n  .bubble-row {\n    &.-first-bubble {\n      margin-top: 0;\n    }\n  }\n\n  .bottom-links_wrapper {\n    position: relative !important;\n  }\n\n}\n\n@media (max-width: $screen-xs-min) {\n  .bubble-row {\n    &.-first-bubble {\n      margin-top: calc(50vh - 210px);\n    }\n  }\n\n}\n\n"],"sourceRoot":""}]);
	
	// exports


/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.actions = exports.doubleAsync = exports.COUNTER_DOUBLE_ASYNC = exports.COUNTER_INCREMENT = undefined;
	
	var _defineProperty2 = __webpack_require__(372);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _promise = __webpack_require__(374);
	
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
	
	  // ------------------------------------
	  // Action Handlers
	  // ------------------------------------
	};var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, COUNTER_INCREMENT, function (state, action) {
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

/***/ })

});
//# sourceMappingURL=3.trusted.b2fed4a7829ae61d1bc4.js.map