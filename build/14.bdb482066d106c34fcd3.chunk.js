webpackJsonp([14],{"./app/containers/Notification/index.js":function(e,t,n){"use strict";function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g;switch(arguments[1].type){case _:default:return e}}function o(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},w,this)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{dispatch:e}}Object.defineProperty(t,"__esModule",{value:!0});var d=n("./node_modules/react/react.js"),u=n.n(d),l=(n("./node_modules/prop-types/index.js"),n("./node_modules/react-redux/es/index.js")),f=n("./node_modules/react-helmet/lib/Helmet.js"),p=n("./node_modules/reselect/es/index.js"),v=n("./node_modules/redux/es/index.js"),m=n("./app/utils/injectSaga.js"),b=n("./app/utils/injectReducer.js"),y=function(e){return e.get("notification")},j=function(){return Object(p.a)(y,function(e){return e.toJS()})},N=j,h=n("./node_modules/immutable/dist/immutable.js"),_="app/Notification/DEFAULT_ACTION",g=Object(h.fromJS)({}),O=i,w=regeneratorRuntime.mark(o);n.d(t,"Notification",function(){return P});var x=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,i,o){var a=t&&t.defaultProps,r=arguments.length-3;if(n||0===r||(n={}),n&&a)for(var c in a)void 0===n[c]&&(n[c]=a[c]);else n||(n=a||{});if(1===r)n.children=o;else if(r>1){for(var s=Array(r),d=0;d<r;d++)s[d]=arguments[d+3];n.children=s}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:n,_owner:null}}}(),C=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),H=x(f.Helmet,{},void 0,x("title",{},void 0,"Notifications"),x("meta",{name:"description",content:"Your Notifications"})),S=x("div",{className:"panel-heading"},void 0,"Your Notifications"),k=x("div",{className:"row"},void 0,x("div",{className:"col-sm-12"},void 0,x("ul",{},void 0,x("li",{},void 0,x("div",{className:"notificationWrapper"},void 0,x("div",{className:"notiHeading"},void 0,"Heeading"),x("div",{className:"notiContent"},void 0,"Content"))),x("li",{},void 0,x("div",{className:"notificationWrapper"},void 0,x("div",{className:"notiHeading"},void 0,"Heeading"),x("div",{className:"notiContent"},void 0,"Content"))),x("li",{},void 0,x("div",{className:"notificationWrapper"},void 0,x("div",{className:"notiHeading"},void 0,"Heeading"),x("div",{className:"notiContent"},void 0,"Content")))))),P=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),C(t,[{key:"render",value:function(){return x("div",{id:"content",className:"ui-content ui-content-aside-overlay"},void 0,H,x("div",{className:"ui-content-body"},void 0,x("div",{className:"ui-container container-fluid"},void 0,x("div",{className:"panel panel-default"},void 0,S,x("div",{className:"panel-body",style:{fontSize:"16px"}},void 0,k)))))}}]),t}(u.a.PureComponent),E=Object(p.b)({notification:N()}),R=Object(l.b)(E,s),T=Object(b.a)({key:"notification",reducer:O}),A=Object(m.a)({key:"notification",saga:o});t.default=Object(v.compose)(T,A,R)(P)}});