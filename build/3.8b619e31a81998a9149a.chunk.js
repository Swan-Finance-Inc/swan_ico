webpackJsonp([3],{"./app/containers/ProfilePage/selectors.js":function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"f",function(){return c}),n.d(t,"e",function(){return u}),n.d(t,"c",function(){return s}),n.d(t,"g",function(){return l}),n.d(t,"d",function(){return f});var r=n("./node_modules/reselect/es/index.js"),o=function(e){return e.get("profilePage")},i=function(){return Object(r.a)(o,function(e){return e.toJS()})},a=function(){return Object(r.a)(o,function(e){return e.get("details")})},u=function(){return Object(r.a)(o,function(e){return e.get("profileimg")})},c=function(){return Object(r.a)(o,function(e){return e.get("updateSuccess")})},s=function(){return Object(r.a)(o,function(e){return e.get("profileimgRet")})},l=function(){return Object(r.a)(o,function(e){return e.get("userInfo")})},f=function(){return Object(r.a)(o,function(e){return e.get("loading")})};t.a=i},"./app/containers/Unsubscribe/index.js":function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments[1];switch(t.type){case g:return e;case O:return e.set("data",t.data);case R:return e.set("success",!0);case P:return e.set("success",!1);default:return e}}function o(e){return{type:O,data:e}}function i(){return{type:R}}function a(){return{type:P}}function u(){var e,t,n;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,e={headers:{"x-auth-token":localStorage.getItem("token")}},r.next=4,Object(N.c)(S());case 4:return t=r.sent,console.log("data details : ",t),r.next=8,Object(N.a)(M.a.user.unSubscribeUser,e,t.email);case 8:if(n=r.sent,!n.success){r.next=15;break}return r.next=12,Object(N.b)(i());case 12:return console.log("Unsubscribed successfully"),r.next=15,Object(N.b)(a());case 15:r.next=22;break;case 17:return r.prev=17,r.t0=r.catch(0),r.next=21,Object(N.b)(Object(I.a)());case 21:console.log(r.t0);case 22:case"end":return r.stop()}},w,this,[[0,17]])}function c(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,[Object(N.e)(O,u)];case 2:case"end":return e.stop()}},L,this)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function f(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function d(e){return{dispatch:e,unsubscribeUserAction:function(t){return e(o(t))}}}Object.defineProperty(t,"__esModule",{value:!0});var p=n("./node_modules/react/react.js"),T=n.n(p),E=(n("./node_modules/prop-types/index.js"),n("./node_modules/react-redux/es/index.js")),m=(n("./node_modules/react-helmet/lib/Helmet.js"),n("./node_modules/reselect/es/index.js")),b=n("./node_modules/redux/es/index.js"),y=n("./node_modules/react-router-dom/index.js"),A=n("./app/utils/injectSaga.js"),h=n("./app/utils/injectReducer.js"),v=function(e){return e.get("unsubscribe")},S=function(){return Object(m.a)(v,function(e){return e.get("data")})},_=n("./node_modules/immutable/dist/immutable.js"),g="app/Unsubscribe/DEFAULT_ACTION",O="app/Unsubscribe/UNSUBSCRIBE_USER_ACTION",R="app/Unsubscribe/UNSUBSCRIBE_USER_ACTION_SUCCESS",P="app/Unsubscribe/UNSUBSCRIBE_USER_ACTION_SUCCESS_CLEAR",j=Object(_.fromJS)({}),C=r,M=n("./app/utils/api.js"),N=n("./node_modules/redux-saga/es/effects.js"),I=n("./app/containers/DashBoardWelcomePage/actions.js"),w=regeneratorRuntime.mark(u),L=regeneratorRuntime.mark(c);n("./app/containers/ProfilePage/selectors.js");n.d(t,"Unsubscribe",function(){return W});var G=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var i=t&&t.defaultProps,a=arguments.length-3;if(n||0===a||(n={}),n&&i)for(var u in i)void 0===n[u]&&(n[u]=i[u]);else n||(n=i||{});if(1===a)n.children=o;else if(a>1){for(var c=Array(a),s=0;s<a;s++)c[s]=arguments[s+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},H=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),U=G("header",{className:"header signin"},void 0,G("div",{className:"container"},void 0,G("div",{className:"row"},void 0,G("div",{className:"col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix"},void 0,G("div",{className:"logo"},void 0,G(y.Link,{to:"/"},void 0,G("img",{src:"https://s3.amazonaws.com/websiteimagesrama/logo.png",alt:"ruc"})))),G("div",{className:"col-xs-7 col-sm-6 col-md-10"})))),k=G("h2",{className:"unsubscribeHeading"},void 0,"Unsubscribe Request"),B=G("div",{className:"section-border dark_border"}),D=G("label",{className:"mr-10",htmlFor:"email"},void 0,"Email"),q=G("p",{},void 0," "),Y=G("div",{className:"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 unsubscribeLi"},void 0,G("p",{},void 0,G("strong",{},void 0," If you have a moment, please let us know why did you unsubscribe ")),G("ul",{},void 0,G("li",{},void 0,G("input",{type:"radio",name:"reason",id:"many",value:"many"})," ",G("label",{htmlFor:"many"},void 0,"You send too many emails")),G("li",{},void 0,G("input",{type:"radio",name:"reason",id:"irrelevant",value:"irrelevant"})," ",G("label",{htmlFor:"irrelevant"},void 0,"Your content is irrelevant to me")),G("li",{},void 0,G("input",{type:"radio",name:"reason",id:"boring",value:"boring"})," ",G("label",{htmlFor:"boring"},void 0,"Your content is boring")),G("li",{},void 0,G("input",{type:"radio",name:"reason",id:"nolonger",value:"nolonger"})," ",G("label",{htmlFor:"nolonger"},void 0,"I no longer want to receive these emails")),G("li",{},void 0,G("input",{type:"radio",name:"reason",id:"never",value:"never"})," ",G("label",{htmlFor:"never"},void 0,"I never signed up for this mailing list")))),F=G("div",{},void 0," "),K=G("center",{id:"responsmsg"},void 0),W=function(e){function t(e){s(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleUnsubscribe=function(){n.props.unsubscribeUserAction({email:n.state.email})},n.state={email:""},n}return f(t,e),H(t,[{key:"componentDidMount",value:function(){var e=window.location.href.split("?email=")[1];console.log("email: ",e),console.log("email: ",void 0===e?"undefined":x(e)),this.setState({email:e})}},{key:"render",value:function(){return G("div",{className:"wrapper"},void 0,U,G("div",{className:"signin-block"},void 0,G("div",{className:"container"},void 0,G("div",{className:"row"},void 0,G("div",{className:"col-md-8 col-md-offset-2"},void 0,G("div",{className:"title-subtile-holder "},void 0,k,B,G("div",{className:"moveCenter col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"},void 0,D,G("input",{className:"inputFieldEmail",type:"email",name:"email",value:this.state.email,disabled:!0})),q,Y,G("div",{className:"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"},void 0,F,G("center",{},void 0,G("input",{type:"submit",value:"Submit",onClick:this.handleUnsubscribe,className:"btnunsubscribe btn btn-danger"})),K)))))))}}]),t}(T.a.PureComponent),X=Object(m.b)({}),V=Object(E.b)(X,d),J=Object(h.a)({key:"unsubscribe",reducer:C}),Q=Object(A.a)({key:"unsubscribe",saga:c});t.default=Object(b.compose)(J,Q,V)(W)},"./node_modules/deep-equal/index.js":function(e,t,n){function r(e){return null===e||void 0===e}function o(e){return!(!e||"object"!=typeof e||"number"!=typeof e.length)&&("function"==typeof e.copy&&"function"==typeof e.slice&&!(e.length>0&&"number"!=typeof e[0]))}function i(e,t,n){var i,l;if(r(e)||r(t))return!1;if(e.prototype!==t.prototype)return!1;if(c(e))return!!c(t)&&(e=a.call(e),t=a.call(t),s(e,t,n));if(o(e)){if(!o(t))return!1;if(e.length!==t.length)return!1;for(i=0;i<e.length;i++)if(e[i]!==t[i])return!1;return!0}try{var f=u(e),d=u(t)}catch(e){return!1}if(f.length!=d.length)return!1;for(f.sort(),d.sort(),i=f.length-1;i>=0;i--)if(f[i]!=d[i])return!1;for(i=f.length-1;i>=0;i--)if(l=f[i],!s(e[l],t[l],n))return!1;return typeof e==typeof t}var a=Array.prototype.slice,u=n("./node_modules/deep-equal/lib/keys.js"),c=n("./node_modules/deep-equal/lib/is_arguments.js"),s=e.exports=function(e,t,n){return n||(n={}),e===t||(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():!e||!t||"object"!=typeof e&&"object"!=typeof t?n.strict?e===t:e==t:i(e,t,n))}},"./node_modules/deep-equal/lib/is_arguments.js":function(e,t){function n(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function r(e){return e&&"object"==typeof e&&"number"==typeof e.length&&Object.prototype.hasOwnProperty.call(e,"callee")&&!Object.prototype.propertyIsEnumerable.call(e,"callee")||!1}var o="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();t=e.exports=o?n:r,t.supported=n,t.unsupported=r},"./node_modules/deep-equal/lib/keys.js":function(e,t){function n(e){var t=[];for(var n in e)t.push(n);return t}t=e.exports="function"==typeof Object.keys?Object.keys:n,t.shim=n},"./node_modules/exenv/index.js":function(e,t,n){var r;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
!function(){"use strict";var o=!("undefined"==typeof window||!window.document||!window.document.createElement),i={canUseDOM:o,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:o&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:o&&!!window.screen};void 0!==(r=function(){return i}.call(t,n,t,e))&&(e.exports=r)}()},"./node_modules/react-helmet/lib/Helmet.js":function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.Helmet=void 0;var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n("./node_modules/react/react.js"),f=r(l),d=n("./node_modules/prop-types/index.js"),p=r(d),T=n("./node_modules/react-side-effect/lib/index.js"),E=r(T),m=n("./node_modules/deep-equal/index.js"),b=r(m),y=n("./node_modules/react-helmet/lib/HelmetUtils.js"),A=n("./node_modules/react-helmet/lib/HelmetConstants.js"),h=function(){return null},v=(0,E.default)(y.reducePropsToState,y.handleClientStateChange,y.mapStateOnServer)(h),S=function(e){var t,n;return n=t=function(t){function n(){return i(this,n),a(this,t.apply(this,arguments))}return u(n,t),n.prototype.shouldComponentUpdate=function(e){return!(0,b.default)(this.props,e)},n.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case A.TAG_NAMES.SCRIPT:case A.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case A.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},n.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return c({},r,(t={},t[n.type]=[].concat(r[n.type]||[],[c({},o,this.mapNestedChildrenToProps(n,i))]),t))},n.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(r.type){case A.TAG_NAMES.TITLE:return c({},o,(t={},t[r.type]=a,t.titleAttributes=c({},i),t));case A.TAG_NAMES.BODY:return c({},o,{bodyAttributes:c({},i)});case A.TAG_NAMES.HTML:return c({},o,{htmlAttributes:c({},i)})}return c({},o,(n={},n[r.type]=c({},i),n))},n.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=c({},t);return Object.keys(e).forEach(function(t){var r;n=c({},n,(r={},r[t]=e[t],r))}),n},n.prototype.warnOnInvalidChildren=function(e,t){return!0},n.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return f.default.Children.forEach(e,function(e){if(e&&e.props){var i=e.props,a=i.children,u=o(i,["children"]),c=(0,y.convertReactPropstoHtmlAttributes)(u);switch(n.warnOnInvalidChildren(e,a),e.type){case A.TAG_NAMES.LINK:case A.TAG_NAMES.META:case A.TAG_NAMES.NOSCRIPT:case A.TAG_NAMES.SCRIPT:case A.TAG_NAMES.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:c,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:c,nestedChildren:a})}}}),t=this.mapArrayTypeChildrenToProps(r,t)},n.prototype.render=function(){var t=this.props,n=t.children,r=o(t,["children"]),i=c({},r);return n&&(i=this.mapChildrenToProps(n,i)),f.default.createElement(e,i)},s(n,null,[{key:"canUseDOM",set:function(t){e.canUseDOM=t}}]),n}(f.default.Component),t.propTypes={base:p.default.object,bodyAttributes:p.default.object,children:p.default.oneOfType([p.default.arrayOf(p.default.node),p.default.node]),defaultTitle:p.default.string,encodeSpecialCharacters:p.default.bool,htmlAttributes:p.default.object,link:p.default.arrayOf(p.default.object),meta:p.default.arrayOf(p.default.object),noscript:p.default.arrayOf(p.default.object),onChangeClientState:p.default.func,script:p.default.arrayOf(p.default.object),style:p.default.arrayOf(p.default.object),title:p.default.string,titleAttributes:p.default.object,titleTemplate:p.default.string},t.defaultProps={encodeSpecialCharacters:!0},t.peek=e.peek,t.rewind=function(){var t=e.rewind();return t||(t=(0,y.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},n}(v);S.renderStatic=S.rewind,t.Helmet=S,t.default=S},"./node_modules/react-helmet/lib/HelmetConstants.js":function(e,t){t.__esModule=!0;var n=(t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"}),r=(t.VALID_TAG_NAMES=Object.keys(n).map(function(e){return n[e]}),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(r).reduce(function(e,t){return e[r[t]]=t,e},{}),t.SELF_CLOSING_TAGS=[n.NOSCRIPT,n.SCRIPT,n.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},"./node_modules/react-helmet/lib/HelmetUtils.js":function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.warn=t.requestIdleCallback=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n("./node_modules/react/react.js"),u=r(a),c=n("./node_modules/object-assign/index.js"),s=r(c),l=n("./node_modules/react-helmet/lib/HelmetConstants.js"),f=function(e){return!1===(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},d=function(e){var t=b(e,l.TAG_NAMES.TITLE),n=b(e,l.HELMET_PROPS.TITLE_TEMPLATE);if(n&&t)return n.replace(/%s/g,function(){return t});var r=b(e,l.HELMET_PROPS.DEFAULT_TITLE);return t||r||void 0},p=function(e){return b(e,l.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},T=function(e,t){return t.filter(function(t){return void 0!==t[e]}).map(function(t){return t[e]}).reduce(function(e,t){return i({},e,t)},{})},E=function(e,t){return t.filter(function(e){return void 0!==e[l.TAG_NAMES.BASE]}).map(function(e){return e[l.TAG_NAMES.BASE]}).reverse().reduce(function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o],a=i.toLowerCase();if(-1!==e.indexOf(a)&&n[a])return t.concat(n)}return t},[])},m=function(e,t,n){var r={};return n.filter(function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&v("Helmet: "+e+' should be of type "Array". Instead found type "'+o(t[e])+'"'),!1)}).map(function(t){return t[e]}).reverse().reduce(function(e,n){var o={};n.filter(function(e){for(var n=void 0,i=Object.keys(e),a=0;a<i.length;a++){var u=i[a],c=u.toLowerCase();-1===t.indexOf(c)||n===l.TAG_PROPERTIES.REL&&"canonical"===e[n].toLowerCase()||c===l.TAG_PROPERTIES.REL&&"stylesheet"===e[c].toLowerCase()||(n=c),-1===t.indexOf(u)||u!==l.TAG_PROPERTIES.INNER_HTML&&u!==l.TAG_PROPERTIES.CSS_TEXT&&u!==l.TAG_PROPERTIES.ITEM_PROP||(n=u)}if(!n||!e[n])return!1;var s=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][s]&&(o[n][s]=!0,!0)}).reverse().forEach(function(t){return e.push(t)});for(var i=Object.keys(o),a=0;a<i.length;a++){var u=i[a],c=(0,s.default)({},r[u],o[u]);r[u]=c}return e},[]).reverse()},b=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},y=function(e){return{baseTag:E([l.TAG_PROPERTIES.HREF],e),bodyAttributes:T(l.ATTRIBUTE_NAMES.BODY,e),encode:b(e,l.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:T(l.ATTRIBUTE_NAMES.HTML,e),linkTags:m(l.TAG_NAMES.LINK,[l.TAG_PROPERTIES.REL,l.TAG_PROPERTIES.HREF],e),metaTags:m(l.TAG_NAMES.META,[l.TAG_PROPERTIES.NAME,l.TAG_PROPERTIES.CHARSET,l.TAG_PROPERTIES.HTTPEQUIV,l.TAG_PROPERTIES.PROPERTY,l.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:m(l.TAG_NAMES.NOSCRIPT,[l.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:p(e),scriptTags:m(l.TAG_NAMES.SCRIPT,[l.TAG_PROPERTIES.SRC,l.TAG_PROPERTIES.INNER_HTML],e),styleTags:m(l.TAG_NAMES.STYLE,[l.TAG_PROPERTIES.CSS_TEXT],e),title:d(e),titleAttributes:T(l.ATTRIBUTE_NAMES.TITLE,e)}},A=function(){return"undefined"!=typeof window&&void 0!==window.requestIdleCallback?window.requestIdleCallback:function(e){var t=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)}}(),h=function(){return"undefined"!=typeof window&&void 0!==window.cancelIdleCallback?window.cancelIdleCallback:function(e){return clearTimeout(e)}}(),v=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},S=null,_=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.htmlAttributes,o=e.linkTags,i=e.metaTags,a=e.noscriptTags,u=e.onChangeClientState,c=e.scriptTags,s=e.styleTags,f=e.title,d=e.titleAttributes;S&&h(S),S=A(function(){O(l.TAG_NAMES.BODY,n),O(l.TAG_NAMES.HTML,r),g(f,d);var p={baseTag:R(l.TAG_NAMES.BASE,t),linkTags:R(l.TAG_NAMES.LINK,o),metaTags:R(l.TAG_NAMES.META,i),noscriptTags:R(l.TAG_NAMES.NOSCRIPT,a),scriptTags:R(l.TAG_NAMES.SCRIPT,c),styleTags:R(l.TAG_NAMES.STYLE,s)},T={},E={};Object.keys(p).forEach(function(e){var t=p[e],n=t.newTags,r=t.oldTags;n.length&&(T[e]=n),r.length&&(E[e]=p[e].oldTags)}),S=null,u(e,T,E)})},g=function(e,t){void 0!==e&&document.title!==e&&(document.title=Array.isArray(e)?e.join(""):e),O(l.TAG_NAMES.TITLE,t)},O=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(l.HELMET_ATTRIBUTE),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(t),u=0;u<a.length;u++){var c=a[u],s=t[c]||"";n.getAttribute(c)!==s&&n.setAttribute(c,s),-1===o.indexOf(c)&&o.push(c);var f=i.indexOf(c);-1!==f&&i.splice(f,1)}for(var d=i.length-1;d>=0;d--)n.removeAttribute(i[d]);o.length===i.length?n.removeAttribute(l.HELMET_ATTRIBUTE):n.getAttribute(l.HELMET_ATTRIBUTE)!==a.join(",")&&n.setAttribute(l.HELMET_ATTRIBUTE,a.join(","))}},R=function(e,t){var n=document.head||document.querySelector(l.TAG_NAMES.HEAD),r=n.querySelectorAll(e+"["+l.HELMET_ATTRIBUTE+"]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return t&&t.length&&t.forEach(function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===l.TAG_PROPERTIES.INNER_HTML)n.innerHTML=t.innerHTML;else if(r===l.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var u=void 0===t[r]?"":t[r];n.setAttribute(r,u)}n.setAttribute(l.HELMET_ATTRIBUTE,"true"),o.some(function(e,t){return a=t,n.isEqualNode(e)})?o.splice(a,1):i.push(n)}),o.forEach(function(e){return e.parentNode.removeChild(e)}),i.forEach(function(e){return n.appendChild(e)}),{oldTags:o,newTags:i}},P=function(e){return Object.keys(e).reduce(function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},j=function(e,t,n,r){var o=P(n);return o?"<"+e+" "+l.HELMET_ATTRIBUTE+'="true" '+o+">"+f(t,r)+"</"+e+">":"<"+e+" "+l.HELMET_ATTRIBUTE+'="true">'+f(t,r)+"</"+e+">"},C=function(e,t,n){return t.reduce(function(t,r){var o=Object.keys(r).filter(function(e){return!(e===l.TAG_PROPERTIES.INNER_HTML||e===l.TAG_PROPERTIES.CSS_TEXT)}).reduce(function(e,t){var o=void 0===r[t]?t:t+'="'+f(r[t],n)+'"';return e?e+" "+o:o},""),i=r.innerHTML||r.cssText||"",a=-1===l.SELF_CLOSING_TAGS.indexOf(e);return t+"<"+e+" "+l.HELMET_ATTRIBUTE+'="true" '+o+(a?"/>":">"+i+"</"+e+">")},"")},M=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[l.REACT_TAG_MAP[n]||n]=e[n],t},t)},N=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[l.HTML_TAG_MAP[n]||n]=e[n],t},t)},I=function(e,t,n){var r,o=(r={key:t},r[l.HELMET_ATTRIBUTE]=!0,r),i=M(n,o);return[u.default.createElement(l.TAG_NAMES.TITLE,i,t)]},w=function(e,t){return t.map(function(t,n){var r,o=(r={key:n},r[l.HELMET_ATTRIBUTE]=!0,r);return Object.keys(t).forEach(function(e){var n=l.REACT_TAG_MAP[e]||e;if(n===l.TAG_PROPERTIES.INNER_HTML||n===l.TAG_PROPERTIES.CSS_TEXT){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]}),u.default.createElement(e,o)})},L=function(e,t,n){switch(e){case l.TAG_NAMES.TITLE:return{toComponent:function(){return I(0,t.title,t.titleAttributes)},toString:function(){return j(e,t.title,t.titleAttributes,n)}};case l.ATTRIBUTE_NAMES.BODY:case l.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return M(t)},toString:function(){return P(t)}};default:return{toComponent:function(){return w(e,t)},toString:function(){return C(e,t,n)}}}},G=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,u=e.noscriptTags,c=e.scriptTags,s=e.styleTags,f=e.title,d=void 0===f?"":f,p=e.titleAttributes;return{base:L(l.TAG_NAMES.BASE,t,r),bodyAttributes:L(l.ATTRIBUTE_NAMES.BODY,n,r),htmlAttributes:L(l.ATTRIBUTE_NAMES.HTML,o,r),link:L(l.TAG_NAMES.LINK,i,r),meta:L(l.TAG_NAMES.META,a,r),noscript:L(l.TAG_NAMES.NOSCRIPT,u,r),script:L(l.TAG_NAMES.SCRIPT,c,r),style:L(l.TAG_NAMES.STYLE,s,r),title:L(l.TAG_NAMES.TITLE,{title:d,titleAttributes:p},r)}};t.convertReactPropstoHtmlAttributes=N,t.handleClientStateChange=_,t.mapStateOnServer=G,t.reducePropsToState=y,t.requestIdleCallback=A,t.warn=v},"./node_modules/react-side-effect/lib/index.js":function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e.default:e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t,n){function r(e){return e.displayName||e.name||"Component"}if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(u){function d(){T=e(p.map(function(e){return e.props})),E.canUseDOM?t(T):n&&(T=n(T))}if("function"!=typeof u)throw new Error("Expected WrappedComponent to be a React component.");var p=[],T=void 0,E=function(e){function t(){return o(this,t),i(this,e.apply(this,arguments))}return a(t,e),t.peek=function(){return T},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=T;return T=void 0,p=[],e},t.prototype.shouldComponentUpdate=function(e){return!f(e,this.props)},t.prototype.componentWillMount=function(){p.push(this),d()},t.prototype.componentDidUpdate=function(){d()},t.prototype.componentWillUnmount=function(){var e=p.indexOf(this);p.splice(e,1),d()},t.prototype.render=function(){return s.createElement(u,this.props)},t}(c.Component);return E.displayName="SideEffect("+r(u)+")",E.canUseDOM=l.canUseDOM,E}}var c=n("./node_modules/react/react.js"),s=r(c),l=r(n("./node_modules/exenv/index.js")),f=r(n("./node_modules/shallowequal/index.js"));e.exports=u},"./node_modules/shallowequal/index.js":function(e,t){e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(var u=Object.prototype.hasOwnProperty.bind(t),c=0;c<i.length;c++){var s=i[c];if(!u(s))return!1;var l=e[s],f=t[s];if(!1===(o=n?n.call(r,l,f,s):void 0)||void 0===o&&l!==f)return!1}return!0}}});