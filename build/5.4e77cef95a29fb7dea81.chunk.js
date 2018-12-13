webpackJsonp([5],{"./app/containers/ResetPasswordOuter/index.js":function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments[1];switch(t.type){case M:return e;case A:return e.set("forceReset",t.data.reset).set("resetToken",t.data.token).set("newPassword",t.data.newPassword);case F:return e.set("success",t.data.success).set("error",!1).set("successMessage",t.data.message);case U:return e.set("error",!0).set("success",!1).set("errorMessage",t.data.message);case I:return e.set("error",!1).set("success",!1).set("errorMessage",!1);default:return e}}function o(e){return{type:A,data:e}}function s(e){return{type:F,data:e}}function a(e){return{type:U,data:e}}function c(){return{type:I}}function i(){var e,t,r,n,o;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,Object(B.c)(S());case 3:return e=i.sent,i.next=6,Object(B.c)(N());case 6:return t=i.sent,i.next=9,Object(B.c)(E());case 9:return r=i.sent,n={newPassword:t,reset:r},i.next=13,Object(B.a)(J.a.user.resetWithToken,e,n);case 13:if(o=i.sent,!o.success){i.next=21;break}return i.next=17,Object(B.b)(s(o));case 17:return i.next=19,Object(B.b)(Object(D.push)("/signin"));case 19:i.next=26;break;case 21:if(o.success){i.next=26;break}return i.next=24,Object(B.b)(a(o));case 24:return i.next=26,Object(B.b)(c());case 26:i.next=30;break;case 28:i.prev=28,i.t0=i.catch(0);case 30:case"end":return i.stop()}},W,this,[[0,28]])}function u(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(B.e)(A,i);case 2:case"end":return e.stop()}},z,this)}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function f(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function p(e){return{dispatch:e,reset:function(t){return e(o(t))},passwordReset:function(){return e(Object(w.d)())}}}Object.defineProperty(t,"__esModule",{value:!0});var m=r("./node_modules/react/react.js"),v=r.n(m),h=(r("./node_modules/prop-types/index.js"),r("./node_modules/react-redux/es/index.js")),b=r("./node_modules/reselect/es/index.js"),y=r("./node_modules/redux/es/index.js"),w=r("./app/containers/App/actions.js"),g=r("./node_modules/react-toastify/lib/index.js"),j=r("./node_modules/query-string/index.js"),O=r.n(j),x=r("./node_modules/react-router/index.js"),P=r("./app/utils/injectSaga.js"),R=r("./app/utils/injectReducer.js"),k=function(e){return e.get("resetPasswordOuter")},_=function(){return Object(b.a)(k,function(e){return e.toJS()})},S=function(){return Object(b.a)(k,function(e){return e.get("resetToken")})},E=function(){return Object(b.a)(k,function(e){return e.get("forceReset")})},N=function(){return Object(b.a)(k,function(e){return e.get("newPassword")})},C=_,T=r("./node_modules/immutable/dist/immutable.js"),M="app/ResetPasswordOuter/DEFAULT_ACTION",A="app/ResetPasswordOuter/RESET_PASSWORD",F="app/ResetPasswordOuter/RESET_SUCCESS",U="app/ResetPasswordOuter/RESET_ERROR",I="app/ResetPasswordOuter/RESET_REMOVE",$=Object(T.fromJS)({forceReset:0,resetToken:!1,newPassword:!1,success:!1,error:!1,errorMessage:!1,successMessage:!1}),q=n,B=r("./node_modules/redux-saga/es/effects.js"),D=r("./node_modules/react-router-redux/index.js"),J=r("./app/utils/api.js"),W=regeneratorRuntime.mark(i),z=regeneratorRuntime.mark(u);r.d(t,"ResetPasswordOuter",function(){return Z});var H=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,r,n,o){var s=t&&t.defaultProps,a=arguments.length-3;if(r||0===a||(r={}),r&&s)for(var c in s)void 0===r[c]&&(r[c]=s[c]);else r||(r=s||{});if(1===a)r.children=o;else if(a>1){for(var i=Array(a),u=0;u<a;u++)i[u]=arguments[u+3];r.children=i}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:r,_owner:null}}}(),L=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),V=H(x.Redirect,{to:"/dashboard"}),G=H("header",{className:"header signin"},void 0,H("div",{className:"container"},void 0,H("div",{className:"row"},void 0,H("div",{className:"col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix"},void 0,H(g.ToastContainer,{position:"top-center",type:"error",autoClose:2800,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnHover:!1}),H("div",{className:"logo"},void 0,H("img",{src:"https://s3.amazonaws.com/websiteimagesrama/logo.png",alt:"RUC"}))),H("div",{className:"col-xs-7 col-sm-6 col-md-10"})))),K=H("div",{className:"card-header"},void 0,H("h1",{},void 0,"Reset Password"),H("p",{className:"subtitle"},void 0,"Please enter your new password.")),Q=H("div",{className:"form-group"},void 0,H("label",{htmlFor:"newPassword",className:"form-label"},void 0,"New Password"),H("input",{id:"newPassword",type:"password",className:"form-input form-control",name:"newPassword",placeholder:"Enter New Password",required:!0})),X=H("label",{htmlFor:"confPassword",className:"form-label"},void 0,"Confirm Password"),Y=H("div",{className:"text-center"},void 0,H("button",{type:"submit",className:"form-button"},void 0,"Reset Password")),Z=function(e){function t(e){d(this,t);var r=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={resetToken:"",errorPassword:"",match:""},r.formSubmit=r.formSubmit.bind(r),r.passwordMatch=r.passwordMatch.bind(r),r}return f(t,e),L(t,[{key:"componentDidMount",value:function(){var e=O.a.parse(this.props.location.search);console.log(e),null!=this.props.match.params.token?this.setState({resetToken:this.props.match.params.token,forceReset:e.reset}):this.setState({resetToken:""}),this.props.error&&this.notify(this.props.errorMessage)}},{key:"componentWillReceiveProps",value:function(e){e.error&&this.notify(e.errorMessage)}},{key:"shouldComponentUpdate",value:function(e){return!!e}},{key:"notify",value:function(e){g.toast.error(e)}},{key:"notifySuccess",value:function(e){g.toast.success(e)}},{key:"formSubmit",value:function(e){e.preventDefault();var t=e.target[0].value,r=e.target[1].value,n={token:this.props.match.params.token,newPassword:e.target[0].value,reset:this.state.forceReset};t==r?(this.props.reset(n),this.props.passwordReset()):this.notify("Password do not match")}},{key:"passwordMatch",value:function(){var e=document.getElementById("newPassword").value,t=document.getElementById("confPassword").value;""===t&&this.setState({match:""}),e===t?this.setState({match:!0}):this.setState({match:!1})}},{key:"render",value:function(){return localStorage.token?V:H("div",{className:"wrapper"},void 0,G,H("section",{className:"signin-block"},void 0,H("div",{className:"container"},void 0,H("div",{className:"row"},void 0,H("div",{className:"col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"},void 0,K,H("div",{className:"signin-card-body"},void 0,H("form",{onSubmit:this.formSubmit},void 0,Q,H("div",{className:"form-group"},void 0,X,H("input",{id:"confPassword",onChange:this.passwordMatch,type:"password",className:"form-input form-control",name:"confPassword",placeholder:"Confirm New Password",required:!0})),1==this.state.match?H("p",{style:{color:"#00bb27"}},void 0,"Password matched"):""===this.state.match?H("p",{style:{color:"#0000fe"}}):H("p",{style:{color:"#ff0000"}},void 0,"Password do not match"),Y)))))))}}]),t}(v.a.PureComponent),ee=Object(b.b)({resetpasswordouter:C(),resetToken:S(),success:function(){return Object(b.a)(k,function(e){return e.get("success")})}(),error:function(){return Object(b.a)(k,function(e){return e.get("error")})}(),successMessage:function(){return Object(b.a)(k,function(e){return e.get("successMessage")})}(),errorMessage:function(){return Object(b.a)(k,function(e){return e.get("errorMessage")})}()}),te=Object(h.b)(ee,p),re=Object(R.a)({key:"resetPasswordOuter",reducer:q}),ne=Object(P.a)({key:"resetPasswordOuter",saga:u});t.default=Object(y.compose)(re,ne,te)(Z)},"./node_modules/decode-uri-component/index.js":function(e,t,r){"use strict";function n(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var r=e.slice(0,t),o=e.slice(t);return Array.prototype.concat.call([],n(r),n(o))}function o(e){try{return decodeURIComponent(e)}catch(o){for(var t=e.match(a),r=1;r<t.length;r++)e=n(t,r).join(""),t=e.match(a);return e}}function s(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},r=c.exec(e);r;){try{t[r[0]]=decodeURIComponent(r[0])}catch(e){var n=o(r[0]);n!==r[0]&&(t[r[0]]=n)}r=c.exec(e)}t["%C2"]="�";for(var s=Object.keys(t),a=0;a<s.length;a++){var i=s[a];e=e.replace(new RegExp(i,"g"),t[i])}return e}var a=new RegExp("%[a-f0-9]{2}","gi"),c=new RegExp("(%[a-f0-9]{2})+","gi");e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return s(e)}}},"./node_modules/query-string/index.js":function(e,t,r){"use strict";function n(e){switch(e.arrayFormat){case"index":return function(t,r,n){return null===r?[s(t,e),"[",n,"]"].join(""):[s(t,e),"[",s(n,e),"]=",s(r,e)].join("")};case"bracket":return function(t,r){return null===r?s(t,e):[s(t,e),"[]=",s(r,e)].join("")};default:return function(t,r){return null===r?s(t,e):[s(t,e),"=",s(r,e)].join("")}}}function o(e){var t;switch(e.arrayFormat){case"index":return function(e,r,n){if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t)return void(n[e]=r);void 0===n[e]&&(n[e]={}),n[e][t[1]]=r};case"bracket":return function(e,r,n){return t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0===n[e]?void(n[e]=[r]):void(n[e]=[].concat(n[e],r)):void(n[e]=r)};default:return function(e,t,r){if(void 0===r[e])return void(r[e]=t);r[e]=[].concat(r[e],t)}}}function s(e,t){return t.encode?t.strict?u(e):encodeURIComponent(e):e}function a(e){return Array.isArray(e)?e.sort():"object"==typeof e?a(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}function c(e){var t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function i(e,t){t=d({arrayFormat:"none"},t);var r=o(t),n=Object.create(null);return"string"!=typeof e?n:(e=e.trim().replace(/^[?#&]/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),o=t.shift(),s=t.length>0?t.join("="):void 0;s=void 0===s?null:l(s),r(l(o),s,n)}),Object.keys(n).sort().reduce(function(e,t){var r=n[t];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?e[t]=a(r):e[t]=r,e},Object.create(null))):n}var u=r("./node_modules/strict-uri-encode/index.js"),d=r("./node_modules/object-assign/index.js"),l=r("./node_modules/decode-uri-component/index.js");t.extract=c,t.parse=i,t.stringify=function(e,t){t=d({encode:!0,strict:!0,arrayFormat:"none"},t),!1===t.sort&&(t.sort=function(){});var r=n(t);return e?Object.keys(e).sort(t.sort).map(function(n){var o=e[n];if(void 0===o)return"";if(null===o)return s(n,t);if(Array.isArray(o)){var a=[];return o.slice().forEach(function(e){void 0!==e&&a.push(r(n,e,a.length))}),a.join("&")}return s(n,t)+"="+s(o,t)}).filter(function(e){return e.length>0}).join("&"):""},t.parseUrl=function(e,t){return{url:e.split("?")[0]||"",query:i(c(e),t)}}},"./node_modules/strict-uri-encode/index.js":function(e,t,r){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}}});