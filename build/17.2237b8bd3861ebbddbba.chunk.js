webpackJsonp([17],{"./app/components/KycAlert/index.js":function(e,s,o){"use strict";function t(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}function a(e,s){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!s||"object"!=typeof s&&"function"!=typeof s?e:s}function r(e,s){if("function"!=typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function, not "+typeof s);e.prototype=Object.create(s&&s.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),s&&(Object.setPrototypeOf?Object.setPrototypeOf(e,s):e.__proto__=s)}Object.defineProperty(s,"__esModule",{value:!0});var i=o("./node_modules/react/react.js"),n=o.n(i),l=o("./node_modules/react-router-dom/index.js"),c=(o.n(l),function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(s,o,t,a){var r=s&&s.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&r)for(var n in r)void 0===o[n]&&(o[n]=r[n]);else o||(o=r||{});if(1===i)o.children=a;else if(i>1){for(var l=Array(i),c=0;c<i;c++)l[c]=arguments[c+3];o.children=l}return{$$typeof:e,type:s,key:void 0===t?null:""+t,ref:null,props:o,_owner:null}}}()),p=function(){function e(e,s){for(var o=0;o<s.length;o++){var t=s[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(s,o,t){return o&&e(s.prototype,o),t&&e(s,t),s}}(),u=c("span",{},void 0,"Please ",c(l.Link,{to:"/dashboard/kyc"},void 0,"complete")," your KYC."),d=c("span",{},void 0,"Your KYC details are submitted. Our team will soon verify your details."),f=c("span",{},void 0,"Your KYC details have some issues. Please check mail regarding issues and ",c(l.Link,{to:"/dashboard/kyc"},void 0,"submit")," the details again."),v=c("span",{},void 0,"Your KYC request is Rejected. Please check your mail regarding issues and ",c(l.Link,{to:"/dashboard/kyc"},void 0,"submit")," the details again."),y=c("span",{},void 0,"Verified Account"),m=c("div",{}),h=c("div",{}),b=function(e){function s(){return t(this,s),a(this,(s.__proto__||Object.getPrototypeOf(s)).apply(this,arguments))}return r(s,e),p(s,[{key:"render",value:function(){return this.props.showAlert?"PENDING"===this.props.kycStatus?c("div",{className:"alert alert-danger"},void 0,u,c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):"DOCUMENTS"===this.props.kycStatus?c("div",{className:"alert alert-danger"},void 0,c("span",{},void 0," ",c(l.Link,{to:"/dashboard/uploadDocs"},void 0,this.props.msg)),c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):"SUBMITTED"===this.props.kycStatus?c("div",{className:"alert alert-success"},void 0,d,c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):"REPORTED"===this.props.kycStatus?c("div",{className:"alert alert-danger"},void 0,f,c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):"REJECTED"===this.props.kycStatus?c("div",{className:"alert alert-danger"},void 0,v,c("span",{className:"cross"},void 0,c("i",{className:"fa fa-close",onClick:this.props.closeAlert}))):"ACCEPTED"===this.props.kycStatus?c("div",{className:"alert alert-success"},void 0,y):m:h}}]),s}(n.a.PureComponent);s.default=b}});