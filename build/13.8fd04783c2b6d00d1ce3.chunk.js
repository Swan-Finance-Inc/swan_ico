webpackJsonp([13],{"./app/components/KycAlert/index.js":function(e,t,o){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=o("./node_modules/react/react.js"),i=o.n(n),l=o("./node_modules/react-router-dom/index.js"),c=(o.n(l),function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,r,s){var a=t&&t.defaultProps,n=arguments.length-3;if(o||0===n||(o={}),o&&a)for(var i in a)void 0===o[i]&&(o[i]=a[i]);else o||(o=a||{});if(1===n)o.children=s;else if(n>1){for(var l=Array(n),c=0;c<n;c++)l[c]=arguments[c+3];o.children=l}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:o,_owner:null}}}()),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),p=c("span",{},void 0,"Please ",c(l.Link,{to:"/dashboard/kyc"},void 0,"complete")," your KYC."),d=c("span",{},void 0,"Your KYC details are submitted.Our team will soon verify your details."),f=c("span",{},void 0,"Your KYC details have some issues.Please check mail regarding issues and ",c(l.Link,{to:"/dashboard/kyc"},void 0,"submit")," the details again."),y=c("span",{},void 0,"Your KYC request is Rejected. Please check your mail regarding issues and ",c(l.Link,{to:"/dashboard/kyc"},void 0,"submit")," the details again."),v=c("div",{}),m=c("div",{}),h=function(e){function t(){return r(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(){return this.props.showAlert?"PENDING"===this.props.kycStatus?c("div",{className:"alert alert-danger"},void 0,p,c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):"SUBMITTED"===this.props.kycStatus?c("div",{className:"alert alert-success"},void 0,d,c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):"REPORTED"===this.props.kycStatus?c("div",{className:"alert alert-danger"},void 0,f,c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):"REJECTED"===this.props.kycStatus?c("div",{className:"alert alert-danger"},void 0,y,c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):v:m}}]),t}(i.a.PureComponent);t.default=h}});