webpackJsonp([5],{"./app/containers/App/selectors.js":function(e,t,r){"use strict";r.d(t,"b",function(){return s}),r.d(t,"a",function(){return i});var o=r("./node_modules/reselect/es/index.js"),a=function(e){return e.get("route")},n=function(e){return e.get("global")},s=function(){return Object(o.a)(a,function(e){return e.get("location").toJS()})},i=function(){return Object(o.a)(n,function(e){return e.toJS()})}},"./app/containers/LoginPage/index.js":function(e,t,r){"use strict";function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments[1];switch(t.type){case P:return e.set("loading",!0).set("error",!1).setIn(["user","email"],t.data.email).setIn(["user","password"],t.data.password).setIn(["user","rememberMe"],t.data.rememberMe).setIn(["user","otpToken"],t.data.otpToken).setIn(["user","captcha"],t.data.captcha);case C:return e.set("loading",!1).set("error",!1).set("errorMessage",!1);case I:return t.error?e.set("error",!0).set("errorMessage",t.error).set("loading",!1):e.set("error",!0).set("loading",!1);case A:return e.set("errorMessage",!1).set("error",!1);case L:return e.set("emailVerified",!0).set("initialEmail",t.data);default:return e}}function a(e){return{type:P,data:e}}function n(e){return{type:C,userData:e}}function s(e){return{type:I,error:e}}function i(){return{type:A}}function c(){return{type:M}}function l(){var e,t;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Object(F.c)(S());case 3:return e=r.sent,r.next=6,Object(F.a)(G.a.user.login,e);case 6:if(t=r.sent,!t.success){r.next=19;break}return localStorage.setItem("token",t.authToken),r.next=11,Object(F.b)(n());case 11:return r.next=13,Object(F.b)(Object(V.k)(t.is2FA_enabled));case 13:return r.next=15,Object(F.b)(Object(_.push)("/dashboard"));case 15:return r.next=17,Object(F.b)(Object(V.g)());case 17:r.next=26;break;case 19:if(t.success){r.next=26;break}return r.next=22,Object(F.b)(s(t.message));case 22:return r.next=24,Object(F.b)(i());case 24:return r.next=26,Object(F.b)(Object(V.g)());case 26:r.next=32;break;case 28:return r.prev=28,r.t0=r.catch(0),r.next=32,Object(F.b)(i());case 32:case"end":return r.stop()}},Y,this,[[0,28]])}function u(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(F.e)(P,l);case 2:case"end":return e.stop()}},q,this)}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function f(e){return{dispatch:e,push:function(t){return e(Object(_.push)(t))},login:function(t){return e(Object(V.l)(t))},loginUser:function(t){return e(a(t))},removeError:function(){return e(i())},removeErrorGlobal:function(){return e(Object(V.g)())},disabled2fa:function(){return e(Object(V.j)())},stateClear:function(){return e(c())},removeOuterError:function(){return e(Object(V.h)())},removeInnerReset:function(){return e(Object(V.f)())}}}Object.defineProperty(t,"__esModule",{value:!0});var g=r("./node_modules/react/react.js"),b=r.n(g),h=(r("./node_modules/prop-types/index.js"),r("./node_modules/react-redux/es/index.js")),v=r("./node_modules/reselect/es/index.js"),y=r("./node_modules/redux/es/index.js"),j=r("./node_modules/react-toastify/lib/index.js"),w=r("./node_modules/react-router-dom/index.js"),O=r("./app/utils/injectSaga.js"),_=r("./node_modules/react-router-redux/index.js"),k=r("./node_modules/glamor/lib/index.js"),x=r("./app/utils/injectReducer.js"),N=function(e){return e.get("loginPage")},S=function(){return Object(v.a)(N,function(e){return e.get("user").toJS()})},E=r("./app/containers/App/selectors.js"),R=r("./node_modules/immutable/dist/immutable.js"),P="LoginPage/LOGIN_USER",C="LoginPage/LOGIN_USER_SUCCESS",I="LoginPage/LOGIN_USER_ERROR",A="LoginPage/LOGIN_USER_ERROR_MESSAGE_REMOVE",L="LoginPage/EMAIL_VERIFIED",M="LoginPage/EMAIL_STATE_CLEAR",T=Object(R.fromJS)({loading:!1,error:!1,errorMessage:!1,user:{email:"",password:"",rememberMe:!1,otpToken:"",captcha:""},emailVerified:!1,initialEmail:!1}),U=o,F=r("./node_modules/redux-saga/es/effects.js"),V=r("./app/containers/App/actions.js"),G=r("./app/utils/api.js"),Y=regeneratorRuntime.mark(l),q=regeneratorRuntime.mark(u),D=r("./node_modules/react-google-recaptcha/lib/recaptcha-wrapper.js"),J=r.n(D);r.d(t,"LoginPage",function(){return oe});var B=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,r,o,a){var n=t&&t.defaultProps,s=arguments.length-3;if(r||0===s||(r={}),r&&n)for(var i in n)void 0===r[i]&&(r[i]=n[i]);else r||(r=n||{});if(1===s)r.children=a;else if(s>1){for(var c=Array(s),l=0;l<s;l++)c[l]=arguments[l+3];r.children=c}return{$$typeof:e,type:t,key:void 0===o?null:""+o,ref:null,props:r,_owner:null}}}(),H=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),W=B(w.Redirect,{to:"/dashboard"}),Z=B("header",{className:"header"},void 0,B("div",{className:"container"},void 0,B("div",{className:"row"},void 0,B("div",{className:"col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix"},void 0,B("div",{className:"logo"},void 0,B(w.Link,{to:"/"},void 0," ",B("img",{src:"assets/img/logo.png",alt:"RUC"})))),B("div",{className:"col-xs-7 col-sm-6 col-md-10"},void 0,B("div",{className:"header-right"},void 0,B("div",{className:"header-btn-group"},void 0,B("div",{className:"header-btn"},void 0,B(w.Link,{to:"/signup"},void 0,"Create Account")))))))),$=B("div",{className:"card-header"},void 0,B("h1",{},void 0,"Sign In")),X=B("div",{className:"form-group newInput"},void 0,B("label",{htmlFor:"emailAddress",className:"form-label"},void 0,"Email Address"),B("input",{id:"emailAddress",type:"email",name:"email",className:"form-input form-control ",placeholder:"Your Email",required:!0,autoComplete:"email"})),z=B("label",{htmlFor:"password",className:"form-label"},void 0,"Password"),K=B("input",{id:"password",type:"password",className:"form-input form-control",name:"password",placeholder:"Your Password",autoComplete:"off",required:!0}),Q=B("div",{className:"form-group"},void 0,B("label",{htmlFor:"token",className:"form-label"},void 0,"Two-Factor Code (if enabled)"),B("input",{id:"token",type:"number",name:"token",className:"form-input form-control",placeholder:"Google Authenticator",autoComplete:"off"})),ee=B("div",{className:"text-center"},void 0,B("button",{type:"submit",className:"form-button"},void 0,"Sign In")),te=B("div",{className:"forgot"},void 0,B(w.Link,{to:"/forgotPassword"},void 0,"Forgot Password?")),re=B("div",{className:"forgot"},void 0,B(w.Link,{to:"/resendConfirmation"},void 0,"Didn't receive confirmation instructions?")),oe=function(e){function t(e){d(this,t);var r=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.showPassWord=function(e){console.log(e," inside show password");var t=document.getElementById("password");"password"===t.type?t.type="text":t.type="password","fa fa-fw fa-eye"===r.state.password_class?r.setState({password_class:"fa fa-fw fa-eye-slash"}):"fa fa-fw fa-eye-slash"===r.state.password_class&&r.setState({password_class:"fa fa-fw fa-eye"})},r.state={"g-recaptcha-response":"",captcha:!1,password_class:"fa fa-fw fa-eye"},r.formSubmit=r.formSubmit.bind(r),r.notify=r.notify.bind(r),r.formValidation=r.formValidation.bind(r),r.onChange=r.onChange.bind(r),r}return p(t,e),H(t,[{key:"componentDidMount",value:function(){if(this.props.removeInnerReset(),this.props.global.passwordResetSuccess&&this.notifySuccess("Your password has been changed successfully"),this.props.global.resetOuterError&&(this.notify("Invalid URL ,Try again with valid url"),this.props.removeOuterError()),this.props.error&&this.notify(this.props.errorMessage),this.props.global.initialEmail.length>0){this.notifySuccess("Your account has been verified.");document.getElementById("emailAddress").value=this.props.global.initialEmail}}},{key:"componentWillReceiveProps",value:function(e){e.error&&this.notify(e.errorMessage)}},{key:"shouldComponentUpdate",value:function(e){if(e)return!0}},{key:"onChange",value:function(e){this.setState({"g-recaptcha-response":e}),e.length>0&&this.setState({captcha:!0})}},{key:"notify",value:function(e){j.toast.error(B("h5",{},void 0,e))}},{key:"notifySuccess",value:function(e){j.toast.success(e)}},{key:"formValidation",value:function(e){var t=e.email,r=e.password;return t.length<=0?(this.notify("Enter your Email"),!1):0===r.length?(this.notify("Enter your password"),!1):!!r.length&&(r.length>0&&t.length>0&&(this.setState({captcha:!1}),window.grecaptcha.reset(),!0))}},{key:"formSubmit",value:function(e){e.preventDefault();var t=document.getElementById("remember"),r=void 0;r=!!t.checked;var o={email:e.target[0].value,password:e.target[1].value,otpToken:e.target[2].value,rememberMe:r,captcha:this.state["g-recaptcha-response"]};this.formValidation(o)?(this.props.loginUser(o),this.props.login()):this.notify("Something went wrong")}},{key:"render",value:function(){return localStorage.token?W:B("div",{className:"signin"},void 0,B(j.ToastContainer,{position:"top-center",progressClassName:Object(k.css)({height:"100px"}),type:"error",autoClose:2800,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnHover:!1}),B("div",{className:"wrapper"},void 0,Z,B("section",{className:"signin-block login"},void 0,B("div",{className:"container"},void 0,B("div",{className:"row"},void 0,B("div",{className:"col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"},void 0,$,B("div",{className:"signin-card-body"},void 0,B("form",{className:!0,onSubmit:this.formSubmit},void 0,X,B("div",{className:"form-group"},void 0,z,K,B("i",{onClick:this.showPassWord,className:this.state.password_class+" field-icon"})),Q,B("div",{className:"form-group text-center"},void 0,b.a.createElement(J.a,{type:"image",ref:"recaptcha",className:"form-captcha",required:!0,sitekey:"6LdUZHIUAAAAAC-Fs1h2axjwggA74SYYarH3XZ6-",onChange:this.onChange})),B("div",{className:"form-group text-center"},void 0,B("label",{className:"form-check-label",htmlFor:"user_accepted_policies"},void 0,B("input",{id:"remember",className:"boolean required form-check-input",label:"false","data-title":"Remember me!","data-placement":"left","data-trigger":"manual","data-offset":"0, 55","aria-required":"true",type:"checkbox",name:"remember",style:{marginRight:"10px"}}),"Remember me")),ee,te,re))))))))}}]),t}(b.a.PureComponent),ae=Object(v.b)({user:S(),errorMessage:function(){return Object(v.a)(N,function(e){return e.get("errorMessage")})}(),global:Object(E.a)(),error:function(){return Object(v.a)(N,function(e){return e.get("error")})}()}),ne=Object(h.b)(ae,f),se=Object(x.a)({key:"loginPage",reducer:U}),ie=Object(O.a)({key:"loginPage",saga:u});t.default=Object(y.compose)(se,ie,ne)(oe)}});