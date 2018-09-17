webpackJsonp([3],{"./app/containers/ResendConfirmationPage/index.js":function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments[1];switch(t.type){case g:return e;case O:return e.set("data",t.data);case P:return e.set("resendError",t.data);case R:return e.set("resendSuccess",t.data);default:return e}}function o(e){return{type:O,data:e}}function i(e){return{type:R,data:e}}function a(){var e,t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(j.c)(v());case 3:return e=n.sent,console.log(e),n.next=7,Object(j.a)(N.a.user.resendMail,e);case 7:if(!(t=n.sent)){n.next=11;break}return n.next=11,Object(j.b)(i(t));case 11:n.next=16;break;case 13:n.prev=13,n.t0=n.catch(0),console.log(n.t0);case 16:case"end":return n.stop()}},w,this,[[0,13]])}function s(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(j.e)(O,a);case 2:case"end":return e.stop()}},I,this)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function d(e){return{dispatch:e,resendMail:function(t){return e(o(t))}}}Object.defineProperty(t,"__esModule",{value:!0});var f=n("./node_modules/react/react.js"),p=n.n(f),T=(n("./node_modules/prop-types/index.js"),n("./node_modules/react-redux/es/index.js")),E=(n("./node_modules/react-helmet/lib/Helmet.js"),n("./node_modules/reselect/es/index.js")),m=n("./node_modules/redux/es/index.js"),h=n("./app/utils/injectSaga.js"),A=n("./app/utils/injectReducer.js"),y=function(e){return e.get("resendConfirmationPage")},b=function(){return Object(E.a)(y,function(e){return e.toJS()})},v=function(){return Object(E.a)(y,function(e){return e.get("data")})},S=b,_=n("./node_modules/immutable/dist/immutable.js"),g="app/ResendConfirmationPage/DEFAULT_ACTION",O="app/ResendCofirmationPage/RESEND_MAIL",P="app/ResendConfirmationPage/RESEND_MAIL_ERROR",R="app/ResendConfirmationPage/RESEND_MAIL_SUCCESS",C=Object(_.fromJS)({}),M=r,N=n("./app/utils/api.js"),j=n("./node_modules/redux-saga/es/effects.js"),w=(n("./node_modules/react-router-redux/index.js"),regeneratorRuntime.mark(a)),I=regeneratorRuntime.mark(s),L=n("./node_modules/react-toastify/lib/index.js"),G=n("./node_modules/react-router-dom/index.js"),x=n("./node_modules/react-google-recaptcha/lib/recaptcha-wrapper.js"),H=n.n(x);n.d(t,"ResendConfirmationPage",function(){return X});var k=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var i=t&&t.defaultProps,a=arguments.length-3;if(n||0===a||(n={}),n&&i)for(var s in i)void 0===n[s]&&(n[s]=i[s]);else n||(n=i||{});if(1===a)n.children=o;else if(a>1){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),U=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),B=k(G.Redirect,{to:"/dashboard"}),D=k("div",{className:"resend"},void 0,k("h1",{},void 0,"Resend Confirmation Success"),k("p",{},void 0,"Please check your email for verification link.")),q=k("p",{},void 0,"If you DON’T see our emails, please check your SPAM folder."),Y=k("p",{},void 0," To avoid our email to you being considered as SPAM, please add the following email to your contact list: hello@quillhash.com"),F=k("header",{className:"header signin"},void 0,k("div",{className:"container"},void 0,k("div",{className:"row"},void 0,k("div",{className:"col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix"},void 0,k(L.ToastContainer,{position:"top-center",autoClose:2800,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnHover:!1}),k("div",{className:"logo"},void 0,k(G.Link,{to:"/"},void 0,k("img",{src:"/assets/img/logo.svg",alt:"QUILLHASH"})))),k("div",{className:"col-xs-7 col-sm-6 col-md-10"},void 0,k("div",{className:"header-right"},void 0,k("div",{className:"header-btn-group"},void 0,k("div",{className:"header-btn"},void 0,k(G.Link,{to:"/signin"},void 0,"Sign In")))))))),W=k("div",{className:"resend"},void 0,k("h1",{},void 0,"Resend Confirmation Instruction"),k("p",{className:"subtitle"},void 0,"Please enter your email address. We will send you an email with Confirmation Instructions.")),K=k("div",{className:"form-group"},void 0,k("label",{htmlFor:"emailAddress",className:"form-label"},void 0,"Email Address"),k("input",{id:"emailAddress",type:"email",name:"email",className:"form-input form-control",placeholder:"Your Email",required:!0})),Q=k("div",{className:"text-center"},void 0,k("button",{type:"submit",className:"form-button"},void 0,"Submit")),X=function(e){function t(e){c(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChange=function(e){n.setState({"g-recaptcha-response":e}),e.length>0&&n.setState({captcha:!0})},n.state={email:"",success:!1,"g-recaptcha-response":"",captcha:!1},n.submitMail=n.submitMail.bind(n),n.notifyCaptcha=n.notifyCaptcha.bind(n),n.onChange=n.onChange.bind(n),n}return l(t,e),U(t,[{key:"submitMail",value:function(e){e.preventDefault();var t={email:e.target[0].value,captcha:this.state["g-recaptcha-response"]};!0===this.state.captcha?(this.setState({captcha:!1}),window.grecaptcha.reset(),this.props.resendMail(t)):this.notifyCaptcha()}},{key:"notifyCaptcha",value:function(){L.toast.error("Please Verify that you are not a robot")}},{key:"componentWillReceiveProps",value:function(e){console.log(e),e.resendSuccess&&(e.resendSuccess.success?this.setState({success:!0}):L.toast.error(e.resendSuccess.message))}},{key:"render",value:function(){return localStorage.token?B:this.state.success?k("section",{className:"signin-block"},void 0,k("div",{className:"container"},void 0,k("div",{className:"row"},void 0,k("div",{className:"col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"},void 0,D,k("div",{className:"signin-card-body"},void 0,k("h2",{style:{textAlign:"center"}},void 0,"WARNING."),q,Y))))):k("div",{className:"wrapper"},void 0,F,k("section",{className:"signin-block"},void 0,k("div",{className:"container"},void 0,k("div",{className:"row"},void 0,k("div",{className:"col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"},void 0,W,k("div",{className:"signin-card-body"},void 0,k("form",{onSubmit:this.submitMail,id:"forgotPassForm"},void 0,K,k("div",{className:"form-group text-center"},void 0,p.a.createElement(H.a,{type:"image",ref:"recaptcha",className:"form-captcha",required:!0,sitekey:"6LcHp2QUAAAAAFNkyK9wjYnRjdR4QyPdQMAJSPDC",onChange:this.onChange})),Q)))))))}}]),t}(p.a.PureComponent),V=Object(E.b)({resendconfirmationpage:S(),resendError:function(){return Object(E.a)(y,function(e){return e.get("resendError")})}(),resendSuccess:function(){return Object(E.a)(y,function(e){return e.get("resendSuccess")})}()}),J=Object(T.b)(V,d),$=Object(A.a)({key:"resendConfirmationPage",reducer:M}),z=Object(h.a)({key:"resendConfirmationPage",saga:s});t.default=Object(m.compose)($,z,J)(X)},"./node_modules/deep-equal/index.js":function(e,t,n){function r(e){return null===e||void 0===e}function o(e){return!(!e||"object"!=typeof e||"number"!=typeof e.length)&&("function"==typeof e.copy&&"function"==typeof e.slice&&!(e.length>0&&"number"!=typeof e[0]))}function i(e,t,n){var i,l;if(r(e)||r(t))return!1;if(e.prototype!==t.prototype)return!1;if(c(e))return!!c(t)&&(e=a.call(e),t=a.call(t),u(e,t,n));if(o(e)){if(!o(t))return!1;if(e.length!==t.length)return!1;for(i=0;i<e.length;i++)if(e[i]!==t[i])return!1;return!0}try{var d=s(e),f=s(t)}catch(e){return!1}if(d.length!=f.length)return!1;for(d.sort(),f.sort(),i=d.length-1;i>=0;i--)if(d[i]!=f[i])return!1;for(i=d.length-1;i>=0;i--)if(l=d[i],!u(e[l],t[l],n))return!1;return typeof e==typeof t}var a=Array.prototype.slice,s=n("./node_modules/deep-equal/lib/keys.js"),c=n("./node_modules/deep-equal/lib/is_arguments.js"),u=e.exports=function(e,t,n){return n||(n={}),e===t||(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():!e||!t||"object"!=typeof e&&"object"!=typeof t?n.strict?e===t:e==t:i(e,t,n))}},"./node_modules/deep-equal/lib/is_arguments.js":function(e,t){function n(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function r(e){return e&&"object"==typeof e&&"number"==typeof e.length&&Object.prototype.hasOwnProperty.call(e,"callee")&&!Object.prototype.propertyIsEnumerable.call(e,"callee")||!1}var o="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();t=e.exports=o?n:r,t.supported=n,t.unsupported=r},"./node_modules/deep-equal/lib/keys.js":function(e,t){function n(e){var t=[];for(var n in e)t.push(n);return t}t=e.exports="function"==typeof Object.keys?Object.keys:n,t.shim=n},"./node_modules/exenv/index.js":function(e,t,n){var r;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
!function(){"use strict";var o=!("undefined"==typeof window||!window.document||!window.document.createElement),i={canUseDOM:o,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:o&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:o&&!!window.screen};void 0!==(r=function(){return i}.call(t,n,t,e))&&(e.exports=r)}()},"./node_modules/react-helmet/lib/Helmet.js":function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.Helmet=void 0;var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n("./node_modules/react/react.js"),d=r(l),f=n("./node_modules/prop-types/index.js"),p=r(f),T=n("./node_modules/react-side-effect/lib/index.js"),E=r(T),m=n("./node_modules/deep-equal/index.js"),h=r(m),A=n("./node_modules/react-helmet/lib/HelmetUtils.js"),y=n("./node_modules/react-helmet/lib/HelmetConstants.js"),b=function(){return null},v=(0,E.default)(A.reducePropsToState,A.handleClientStateChange,A.mapStateOnServer)(b),S=function(e){var t,n;return n=t=function(t){function n(){return i(this,n),a(this,t.apply(this,arguments))}return s(n,t),n.prototype.shouldComponentUpdate=function(e){return!(0,h.default)(this.props,e)},n.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case y.TAG_NAMES.SCRIPT:case y.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case y.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},n.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return c({},r,(t={},t[n.type]=[].concat(r[n.type]||[],[c({},o,this.mapNestedChildrenToProps(n,i))]),t))},n.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,i=e.newChildProps,a=e.nestedChildren;switch(r.type){case y.TAG_NAMES.TITLE:return c({},o,(t={},t[r.type]=a,t.titleAttributes=c({},i),t));case y.TAG_NAMES.BODY:return c({},o,{bodyAttributes:c({},i)});case y.TAG_NAMES.HTML:return c({},o,{htmlAttributes:c({},i)})}return c({},o,(n={},n[r.type]=c({},i),n))},n.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=c({},t);return Object.keys(e).forEach(function(t){var r;n=c({},n,(r={},r[t]=e[t],r))}),n},n.prototype.warnOnInvalidChildren=function(e,t){return!0},n.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return d.default.Children.forEach(e,function(e){if(e&&e.props){var i=e.props,a=i.children,s=o(i,["children"]),c=(0,A.convertReactPropstoHtmlAttributes)(s);switch(n.warnOnInvalidChildren(e,a),e.type){case y.TAG_NAMES.LINK:case y.TAG_NAMES.META:case y.TAG_NAMES.NOSCRIPT:case y.TAG_NAMES.SCRIPT:case y.TAG_NAMES.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:c,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:c,nestedChildren:a})}}}),t=this.mapArrayTypeChildrenToProps(r,t)},n.prototype.render=function(){var t=this.props,n=t.children,r=o(t,["children"]),i=c({},r);return n&&(i=this.mapChildrenToProps(n,i)),d.default.createElement(e,i)},u(n,null,[{key:"canUseDOM",set:function(t){e.canUseDOM=t}}]),n}(d.default.Component),t.propTypes={base:p.default.object,bodyAttributes:p.default.object,children:p.default.oneOfType([p.default.arrayOf(p.default.node),p.default.node]),defaultTitle:p.default.string,encodeSpecialCharacters:p.default.bool,htmlAttributes:p.default.object,link:p.default.arrayOf(p.default.object),meta:p.default.arrayOf(p.default.object),noscript:p.default.arrayOf(p.default.object),onChangeClientState:p.default.func,script:p.default.arrayOf(p.default.object),style:p.default.arrayOf(p.default.object),title:p.default.string,titleAttributes:p.default.object,titleTemplate:p.default.string},t.defaultProps={encodeSpecialCharacters:!0},t.peek=e.peek,t.rewind=function(){var t=e.rewind();return t||(t=(0,A.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},n}(v);S.renderStatic=S.rewind,t.Helmet=S,t.default=S},"./node_modules/react-helmet/lib/HelmetConstants.js":function(e,t){t.__esModule=!0;var n=(t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"}),r=(t.VALID_TAG_NAMES=Object.keys(n).map(function(e){return n[e]}),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(r).reduce(function(e,t){return e[r[t]]=t,e},{}),t.SELF_CLOSING_TAGS=[n.NOSCRIPT,n.SCRIPT,n.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},"./node_modules/react-helmet/lib/HelmetUtils.js":function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.warn=t.requestIdleCallback=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n("./node_modules/react/react.js"),s=r(a),c=n("./node_modules/object-assign/index.js"),u=r(c),l=n("./node_modules/react-helmet/lib/HelmetConstants.js"),d=function(e){return!1===(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},f=function(e){var t=h(e,l.TAG_NAMES.TITLE),n=h(e,l.HELMET_PROPS.TITLE_TEMPLATE);if(n&&t)return n.replace(/%s/g,function(){return t});var r=h(e,l.HELMET_PROPS.DEFAULT_TITLE);return t||r||void 0},p=function(e){return h(e,l.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},T=function(e,t){return t.filter(function(t){return void 0!==t[e]}).map(function(t){return t[e]}).reduce(function(e,t){return i({},e,t)},{})},E=function(e,t){return t.filter(function(e){return void 0!==e[l.TAG_NAMES.BASE]}).map(function(e){return e[l.TAG_NAMES.BASE]}).reverse().reduce(function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o],a=i.toLowerCase();if(-1!==e.indexOf(a)&&n[a])return t.concat(n)}return t},[])},m=function(e,t,n){var r={};return n.filter(function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&v("Helmet: "+e+' should be of type "Array". Instead found type "'+o(t[e])+'"'),!1)}).map(function(t){return t[e]}).reverse().reduce(function(e,n){var o={};n.filter(function(e){for(var n=void 0,i=Object.keys(e),a=0;a<i.length;a++){var s=i[a],c=s.toLowerCase();-1===t.indexOf(c)||n===l.TAG_PROPERTIES.REL&&"canonical"===e[n].toLowerCase()||c===l.TAG_PROPERTIES.REL&&"stylesheet"===e[c].toLowerCase()||(n=c),-1===t.indexOf(s)||s!==l.TAG_PROPERTIES.INNER_HTML&&s!==l.TAG_PROPERTIES.CSS_TEXT&&s!==l.TAG_PROPERTIES.ITEM_PROP||(n=s)}if(!n||!e[n])return!1;var u=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][u]&&(o[n][u]=!0,!0)}).reverse().forEach(function(t){return e.push(t)});for(var i=Object.keys(o),a=0;a<i.length;a++){var s=i[a],c=(0,u.default)({},r[s],o[s]);r[s]=c}return e},[]).reverse()},h=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},A=function(e){return{baseTag:E([l.TAG_PROPERTIES.HREF],e),bodyAttributes:T(l.ATTRIBUTE_NAMES.BODY,e),encode:h(e,l.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:T(l.ATTRIBUTE_NAMES.HTML,e),linkTags:m(l.TAG_NAMES.LINK,[l.TAG_PROPERTIES.REL,l.TAG_PROPERTIES.HREF],e),metaTags:m(l.TAG_NAMES.META,[l.TAG_PROPERTIES.NAME,l.TAG_PROPERTIES.CHARSET,l.TAG_PROPERTIES.HTTPEQUIV,l.TAG_PROPERTIES.PROPERTY,l.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:m(l.TAG_NAMES.NOSCRIPT,[l.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:p(e),scriptTags:m(l.TAG_NAMES.SCRIPT,[l.TAG_PROPERTIES.SRC,l.TAG_PROPERTIES.INNER_HTML],e),styleTags:m(l.TAG_NAMES.STYLE,[l.TAG_PROPERTIES.CSS_TEXT],e),title:f(e),titleAttributes:T(l.ATTRIBUTE_NAMES.TITLE,e)}},y=function(){return"undefined"!=typeof window&&void 0!==window.requestIdleCallback?window.requestIdleCallback:function(e){var t=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)}}(),b=function(){return"undefined"!=typeof window&&void 0!==window.cancelIdleCallback?window.cancelIdleCallback:function(e){return clearTimeout(e)}}(),v=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},S=null,_=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.htmlAttributes,o=e.linkTags,i=e.metaTags,a=e.noscriptTags,s=e.onChangeClientState,c=e.scriptTags,u=e.styleTags,d=e.title,f=e.titleAttributes;S&&b(S),S=y(function(){O(l.TAG_NAMES.BODY,n),O(l.TAG_NAMES.HTML,r),g(d,f);var p={baseTag:P(l.TAG_NAMES.BASE,t),linkTags:P(l.TAG_NAMES.LINK,o),metaTags:P(l.TAG_NAMES.META,i),noscriptTags:P(l.TAG_NAMES.NOSCRIPT,a),scriptTags:P(l.TAG_NAMES.SCRIPT,c),styleTags:P(l.TAG_NAMES.STYLE,u)},T={},E={};Object.keys(p).forEach(function(e){var t=p[e],n=t.newTags,r=t.oldTags;n.length&&(T[e]=n),r.length&&(E[e]=p[e].oldTags)}),S=null,s(e,T,E)})},g=function(e,t){void 0!==e&&document.title!==e&&(document.title=Array.isArray(e)?e.join(""):e),O(l.TAG_NAMES.TITLE,t)},O=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(l.HELMET_ATTRIBUTE),o=r?r.split(","):[],i=[].concat(o),a=Object.keys(t),s=0;s<a.length;s++){var c=a[s],u=t[c]||"";n.getAttribute(c)!==u&&n.setAttribute(c,u),-1===o.indexOf(c)&&o.push(c);var d=i.indexOf(c);-1!==d&&i.splice(d,1)}for(var f=i.length-1;f>=0;f--)n.removeAttribute(i[f]);o.length===i.length?n.removeAttribute(l.HELMET_ATTRIBUTE):n.getAttribute(l.HELMET_ATTRIBUTE)!==a.join(",")&&n.setAttribute(l.HELMET_ATTRIBUTE,a.join(","))}},P=function(e,t){var n=document.head||document.querySelector(l.TAG_NAMES.HEAD),r=n.querySelectorAll(e+"["+l.HELMET_ATTRIBUTE+"]"),o=Array.prototype.slice.call(r),i=[],a=void 0;return t&&t.length&&t.forEach(function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===l.TAG_PROPERTIES.INNER_HTML)n.innerHTML=t.innerHTML;else if(r===l.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var s=void 0===t[r]?"":t[r];n.setAttribute(r,s)}n.setAttribute(l.HELMET_ATTRIBUTE,"true"),o.some(function(e,t){return a=t,n.isEqualNode(e)})?o.splice(a,1):i.push(n)}),o.forEach(function(e){return e.parentNode.removeChild(e)}),i.forEach(function(e){return n.appendChild(e)}),{oldTags:o,newTags:i}},R=function(e){return Object.keys(e).reduce(function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},C=function(e,t,n,r){var o=R(n);return o?"<"+e+" "+l.HELMET_ATTRIBUTE+'="true" '+o+">"+d(t,r)+"</"+e+">":"<"+e+" "+l.HELMET_ATTRIBUTE+'="true">'+d(t,r)+"</"+e+">"},M=function(e,t,n){return t.reduce(function(t,r){var o=Object.keys(r).filter(function(e){return!(e===l.TAG_PROPERTIES.INNER_HTML||e===l.TAG_PROPERTIES.CSS_TEXT)}).reduce(function(e,t){var o=void 0===r[t]?t:t+'="'+d(r[t],n)+'"';return e?e+" "+o:o},""),i=r.innerHTML||r.cssText||"",a=-1===l.SELF_CLOSING_TAGS.indexOf(e);return t+"<"+e+" "+l.HELMET_ATTRIBUTE+'="true" '+o+(a?"/>":">"+i+"</"+e+">")},"")},N=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[l.REACT_TAG_MAP[n]||n]=e[n],t},t)},j=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[l.HTML_TAG_MAP[n]||n]=e[n],t},t)},w=function(e,t,n){var r,o=(r={key:t},r[l.HELMET_ATTRIBUTE]=!0,r),i=N(n,o);return[s.default.createElement(l.TAG_NAMES.TITLE,i,t)]},I=function(e,t){return t.map(function(t,n){var r,o=(r={key:n},r[l.HELMET_ATTRIBUTE]=!0,r);return Object.keys(t).forEach(function(e){var n=l.REACT_TAG_MAP[e]||e;if(n===l.TAG_PROPERTIES.INNER_HTML||n===l.TAG_PROPERTIES.CSS_TEXT){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]}),s.default.createElement(e,o)})},L=function(e,t,n){switch(e){case l.TAG_NAMES.TITLE:return{toComponent:function(){return w(0,t.title,t.titleAttributes)},toString:function(){return C(e,t.title,t.titleAttributes,n)}};case l.ATTRIBUTE_NAMES.BODY:case l.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return N(t)},toString:function(){return R(t)}};default:return{toComponent:function(){return I(e,t)},toString:function(){return M(e,t,n)}}}},G=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,i=e.linkTags,a=e.metaTags,s=e.noscriptTags,c=e.scriptTags,u=e.styleTags,d=e.title,f=void 0===d?"":d,p=e.titleAttributes;return{base:L(l.TAG_NAMES.BASE,t,r),bodyAttributes:L(l.ATTRIBUTE_NAMES.BODY,n,r),htmlAttributes:L(l.ATTRIBUTE_NAMES.HTML,o,r),link:L(l.TAG_NAMES.LINK,i,r),meta:L(l.TAG_NAMES.META,a,r),noscript:L(l.TAG_NAMES.NOSCRIPT,s,r),script:L(l.TAG_NAMES.SCRIPT,c,r),style:L(l.TAG_NAMES.STYLE,u,r),title:L(l.TAG_NAMES.TITLE,{title:f,titleAttributes:p},r)}};t.convertReactPropstoHtmlAttributes=j,t.handleClientStateChange=_,t.mapStateOnServer=G,t.reducePropsToState=A,t.requestIdleCallback=y,t.warn=v},"./node_modules/react-side-effect/lib/index.js":function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e.default:e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t,n){function r(e){return e.displayName||e.name||"Component"}if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(s){function f(){T=e(p.map(function(e){return e.props})),E.canUseDOM?t(T):n&&(T=n(T))}if("function"!=typeof s)throw new Error("Expected WrappedComponent to be a React component.");var p=[],T=void 0,E=function(e){function t(){return o(this,t),i(this,e.apply(this,arguments))}return a(t,e),t.peek=function(){return T},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=T;return T=void 0,p=[],e},t.prototype.shouldComponentUpdate=function(e){return!d(e,this.props)},t.prototype.componentWillMount=function(){p.push(this),f()},t.prototype.componentDidUpdate=function(){f()},t.prototype.componentWillUnmount=function(){var e=p.indexOf(this);p.splice(e,1),f()},t.prototype.render=function(){return u.createElement(s,this.props)},t}(c.Component);return E.displayName="SideEffect("+r(s)+")",E.canUseDOM=l.canUseDOM,E}}var c=n("./node_modules/react/react.js"),u=r(c),l=r(n("./node_modules/exenv/index.js")),d=r(n("./node_modules/shallowequal/index.js"));e.exports=s},"./node_modules/shallowequal/index.js":function(e,t){e.exports=function(e,t,n,r){var o=n?n.call(r,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),c=0;c<i.length;c++){var u=i[c];if(!s(u))return!1;var l=e[u],d=t[u];if(!1===(o=n?n.call(r,l,d,u):void 0)||void 0===o&&l!==d)return!1}return!0}}});