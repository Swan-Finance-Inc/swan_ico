webpackJsonp([8],{"./app/containers/ResetPasswordOuter/index.js":function(e,t,r){"use strict";function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments[1];switch(t.type){case E:return e;case M:return e.set("resetToken",t.data.token).set("newPassword",t.data.newPassword);case T:return e.set("success",t.data.success).set("error",!1).set("successMessage",t.data.message);case C:return e.set("error",!0).set("success",!1).set("errorMessage",t.data.message);case A:return e.set("error",!1).set("success",!1).set("errorMessage",!1);default:return e}}function o(e){return{type:M,data:e}}function n(e){return{type:T,data:e}}function a(e){return{type:C,data:e}}function c(){return{type:A}}function i(){var e,t,r,s;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,Object(B.c)(R());case 3:return e=o.sent,o.next=6,Object(B.c)(S());case 6:return t=o.sent,r={newPassword:t},o.next=10,Object(B.a)(I.a.user.resetWithToken,e,r);case 10:if(s=o.sent,!s.success){o.next=18;break}return o.next=14,Object(B.b)(n(s));case 14:return o.next=16,Object(B.b)(Object(F.push)("/signin"));case 16:o.next=23;break;case 18:if(s.success){o.next=23;break}return o.next=21,Object(B.b)(a(s));case 21:return o.next=23,Object(B.b)(c());case 23:o.next=27;break;case 25:o.prev=25,o.t0=o.catch(0);case 27:case"end":return o.stop()}},J,this,[[0,25]])}function u(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(B.e)(M,i);case 2:case"end":return e.stop()}},W,this)}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function f(e){return{dispatch:e,reset:function(t){return e(o(t))},passwordReset:function(){return e(Object(y.d)())}}}Object.defineProperty(t,"__esModule",{value:!0});var m=r("./node_modules/react/react.js"),b=r.n(m),w=(r("./node_modules/prop-types/index.js"),r("./node_modules/react-redux/es/index.js")),v=r("./node_modules/reselect/es/index.js"),h=r("./node_modules/redux/es/index.js"),y=r("./app/containers/App/actions.js"),g=r("./node_modules/react-toastify/lib/index.js"),O=r("./node_modules/react-router-dom/index.js"),j=r("./app/utils/injectSaga.js"),P=r("./app/utils/injectReducer.js"),k=function(e){return e.get("resetPasswordOuter")},x=function(){return Object(v.a)(k,function(e){return e.toJS()})},R=function(){return Object(v.a)(k,function(e){return e.get("resetToken")})},S=function(){return Object(v.a)(k,function(e){return e.get("newPassword")})},N=x,_=r("./node_modules/immutable/dist/immutable.js"),E="app/ResetPasswordOuter/DEFAULT_ACTION",M="app/ResetPasswordOuter/RESET_PASSWORD",T="app/ResetPasswordOuter/RESET_SUCCESS",C="app/ResetPasswordOuter/RESET_ERROR",A="app/ResetPasswordOuter/RESET_REMOVE",D=Object(_.fromJS)({resetToken:!1,newPassword:!1,success:!1,error:!1,errorMessage:!1,successMessage:!1}),U=s,B=r("./node_modules/redux-saga/es/effects.js"),F=r("./node_modules/react-router-redux/index.js"),I=r("./app/utils/api.js"),J=regeneratorRuntime.mark(i),W=regeneratorRuntime.mark(u);r.d(t,"ResetPasswordOuter",function(){return Q});var q=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,r,s,o){var n=t&&t.defaultProps,a=arguments.length-3;if(r||0===a||(r={}),r&&n)for(var c in n)void 0===r[c]&&(r[c]=n[c]);else r||(r=n||{});if(1===a)r.children=o;else if(a>1){for(var i=Array(a),u=0;u<a;u++)i[u]=arguments[u+3];r.children=i}return{$$typeof:e,type:t,key:void 0===s?null:""+s,ref:null,props:r,_owner:null}}}(),$=function(){function e(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,r,s){return r&&e(t.prototype,r),s&&e(t,s),t}}(),H=q(O.Redirect,{to:"/dashboard"}),L=q("header",{className:"header signin"},void 0,q("div",{className:"container"},void 0,q("div",{className:"row"},void 0,q("div",{className:"col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix"},void 0,q(g.ToastContainer,{position:"top-center",type:"error",autoClose:2800,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnHover:!1}),q("div",{className:"logo"},void 0,q("img",{src:"/assets/img/logo.png",alt:"RUC"}))),q("div",{className:"col-xs-7 col-sm-6 col-md-10"})))),V=q("div",{className:"card-header"},void 0,q("h1",{},void 0,"Reset Password"),q("p",{className:"subtitle"},void 0,"Please enter your new password.")),z=q("div",{className:"form-group"},void 0,q("label",{htmlFor:"newPassword",className:"form-label"},void 0,"New Password"),q("input",{id:"newPassword",type:"password",className:"form-input form-control",name:"newPassword",placeholder:"Enter New Password",required:!0})),G=q("label",{htmlFor:"confPassword",className:"form-label"},void 0,"Confirm Password"),K=q("div",{className:"text-center"},void 0,q("button",{type:"submit",className:"form-button"},void 0,"Reset Password")),Q=function(e){function t(e){d(this,t);var r=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={resetToken:"",errorPassword:"",match:""},r.formSubmit=r.formSubmit.bind(r),r.passwordMatch=r.passwordMatch.bind(r),r}return p(t,e),$(t,[{key:"componentDidMount",value:function(){null!=this.props.match.params.token?this.setState({resetToken:this.props.match.params.token}):this.setState({resetToken:""}),this.props.error&&this.notify(this.props.errorMessage)}},{key:"componentWillReceiveProps",value:function(e){e.error&&this.notify(e.errorMessage)}},{key:"shouldComponentUpdate",value:function(e){return!!e}},{key:"notify",value:function(e){g.toast.error(e)}},{key:"notifySuccess",value:function(e){g.toast.success(e)}},{key:"formSubmit",value:function(e){e.preventDefault();var t=e.target[0].value,r=e.target[1].value,s={token:this.props.match.params.token,newPassword:e.target[0].value};t==r?(this.props.reset(s),this.props.passwordReset()):this.notify("Password do not match")}},{key:"passwordMatch",value:function(){var e=document.getElementById("newPassword").value,t=document.getElementById("confPassword").value;""===t&&this.setState({match:""}),e===t?this.setState({match:!0}):this.setState({match:!1})}},{key:"render",value:function(){return localStorage.token?H:q("div",{className:"wrapper"},void 0,L,q("section",{className:"signin-block"},void 0,q("div",{className:"container"},void 0,q("div",{className:"row"},void 0,q("div",{className:"col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"},void 0,V,q("div",{className:"signin-card-body"},void 0,q("form",{onSubmit:this.formSubmit},void 0,z,q("div",{className:"form-group"},void 0,G,q("input",{id:"confPassword",onChange:this.passwordMatch,type:"password",className:"form-input form-control",name:"confPassword",placeholder:"Confirm New Password",required:!0})),1==this.state.match?q("p",{style:{color:"#00bb27"}},void 0,"Password matched"):""===this.state.match?q("p",{style:{color:"#0000fe"}}):q("p",{style:{color:"#ff0000"}},void 0,"Password do not match"),K)))))))}}]),t}(b.a.PureComponent),X=Object(v.b)({resetpasswordouter:N(),resetToken:R(),success:function(){return Object(v.a)(k,function(e){return e.get("success")})}(),error:function(){return Object(v.a)(k,function(e){return e.get("error")})}(),successMessage:function(){return Object(v.a)(k,function(e){return e.get("successMessage")})}(),errorMessage:function(){return Object(v.a)(k,function(e){return e.get("errorMessage")})}()}),Y=Object(w.b)(X,f),Z=Object(P.a)({key:"resetPasswordOuter",reducer:U}),ee=Object(j.a)({key:"resetPasswordOuter",saga:u});t.default=Object(h.compose)(Z,ee,Y)(Q)}});