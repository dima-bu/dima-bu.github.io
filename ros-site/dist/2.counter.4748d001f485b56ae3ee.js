webpackJsonp([2],{136:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return{type:f,payload:e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments[1],n=E[t.type];return n?n(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.doubleAsync=t.COUNTER_DOUBLE_ASYNC=t.COUNTER_INCREMENT=void 0;var c,l=n(88),a=u(l),d=n(140),i=u(d);t.increment=r,t.default=o;var f=t.COUNTER_INCREMENT="COUNTER_INCREMENT",s=t.COUNTER_DOUBLE_ASYNC="COUNTER_DOUBLE_ASYNC",_=t.doubleAsync=function(){return function(e,t){return new i.default(function(n){setTimeout(function(){e({type:s,payload:t().counter}),n()},200)})}},E=(t.actions={increment:r,doubleAsync:_},c={},(0,a.default)(c,f,function(e,t){return e+t.payload}),(0,a.default)(c,s,function(e,t){return 2*e}),c),b=0},248:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Counter=void 0;var r=n(1),o=u(r),c=n(84),l=u(c),a=n(5),d=u(a),i=t.Counter=function(e){return o.default.createElement("div",{style:{margin:"0 auto"}},o.default.createElement("h2",null,"Counter: ",e.counter),o.default.createElement(l.default,null),o.default.createElement("button",{className:"btn btn-default",onClick:e.increment},"Increment")," ",o.default.createElement("button",{className:"btn btn-default",onClick:e.doubleAsync},"Double (Async)"))};i.propTypes={counter:d.default.number.isRequired,doubleAsync:d.default.func.isRequired,increment:d.default.func.isRequired},t.default=i},249:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(48),o=n(136),c=n(248),l=u(c),a={increment:function(){return(0,o.increment)(1)},doubleAsync:o.doubleAsync},d=function(e){return{counter:e.counter}};t.default=(0,r.connect)(d,a)(l.default)}});