webpackJsonp([1],{145:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function u(e){return{type:s,payload:e}}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments[1],a=h[t.type];return a?a(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.CHANGE_HASH=t.COUNTER_INCREMENT=void 0;var o=a(41),r=n(o),c=a(90),i=n(c);t.changeHash=u,t.default=l;var s=(a(21),t.COUNTER_INCREMENT="COUNTER_INCREMENT",t.CHANGE_HASH="CHANGE_HASH"),f=(t.actions={changeHash:u},{hashState:""}),h=(0,r.default)({},s,function(e,t){var a=t.payload.split("#")[1];return window.location.hash?window.location.hash=window.location.hash+"-"+a:window.location.hash=a,(0,i.default)({},e,{hashState:window.location.hash})})},255:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(15),l=n(u),o=a(16),r=n(o),c=a(17),i=n(c),s=a(19),f=n(s),h=a(18),d=n(h),p=a(1),_=n(p),v=a(142),E=n(v),y=a(140),H=n(y),g=a(87),w=n(g),C=a(141),N=n(C),m=a(82),M=n(m),S=a(206),k=n(S),O=a(26),T=function(e){function t(){return(0,r.default)(this,t),(0,f.default)(this,(t.__proto__||(0,l.default)(t)).apply(this,arguments))}return(0,d.default)(t,e),(0,i.default)(t,[{key:"componentWillMount",value:function(){}},{key:"hasPath",value:function(e){var t=k.default.getCurrentLocation().pathname;return t.indexOf(e)>=0}},{key:"getView",value:function(){var e=[],t=M.default.getCurrentLocation().hash;t=t.substr(1);var a=t.split("-");return a.forEach(function(t){"projects"===t&&e.push(_.default.createElement(E.default,{key:"projects"})),"gif"===t&&e.push(_.default.createElement(w.default,{key:"gif"})),"contacts"===t&&e.push(_.default.createElement(H.default,{key:"contacts"}))}),_.default.createElement("div",null,e,_.default.createElement(N.default,{onChangeHash:this.props.changeHash}),_.default.createElement("h3",null,this.props.hashState),_.default.createElement("h2",null,(0,O.tr)("STUFF_TARIFFS")))}},{key:"render",value:function(){return this.getView()}}]),t}(_.default.Component);t.default=T},256:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(39),l=a(145),o=a(33),r=a(255),c=n(r),i={changeHash:l.changeHash,setLocale:o.setLocale},s=function(e){return{i18n:e.i18n,hashState:e.levelOne.hashState}};t.default=(0,u.connect)(s,i)(c.default)}});