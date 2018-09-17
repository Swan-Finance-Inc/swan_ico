webpackJsonp([15],{"./app/components/Balance/index.js":function(e,o,a){"use strict";function s(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function i(e,o){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!o||"object"!=typeof o&&"function"!=typeof o?e:o}function r(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function, not "+typeof o);e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(e,o):e.__proto__=o)}Object.defineProperty(o,"__esModule",{value:!0});var t=a("./node_modules/react/react.js"),n=a.n(t),d=a("./node_modules/react-router-dom/index.js"),l=(a.n(d),function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(o,a,s,i){var r=o&&o.defaultProps,t=arguments.length-3;if(a||0===t||(a={}),a&&r)for(var n in r)void 0===a[n]&&(a[n]=r[n]);else a||(a=r||{});if(1===t)a.children=i;else if(t>1){for(var d=Array(t),l=0;l<t;l++)d[l]=arguments[l+3];a.children=d}return{$$typeof:e,type:o,key:void 0===s?null:""+s,ref:null,props:a,_owner:null}}}()),c=function(){function e(e,o){for(var a=0;a<o.length;a++){var s=o[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(o,a,s){return a&&e(o.prototype,a),s&&e(o,s),o}}(),v=l("div",{className:"panel-heading"},void 0,"Your Balance"),u=l("div",{className:"row"},void 0,l("div",{className:"col-sm-12"},void 0,l("p",{},void 0,"Transaction may take up to 24 hours to approve due to our comprehensive verification methods to protect our customers."))),m=l("h3",{},void 0,"Current Balance"),p=l("h3",{},void 0,"Referral Tokens Earned"),f=l("h3",{},void 0,"# of Confirmed Referrals"),b=l("h3",{},void 0,"# of Pending Referrals"),h=l("h3",{},void 0,"Creative Stakes"),N=l("h3",{},void 0,"Youtube Stakes"),y=l("h3",{},void 0,"Twitter Stakes"),k=l("h3",{},void 0,"Facebook Stakes"),w=l("h3",{},void 0,"Translation Stakes"),S=l("h3",{},void 0,"Reddit Stakes"),_=l("h3",{},void 0,"Telegram Stakes"),g=l("h3",{},void 0,"Signature Stakes"),I=function(e){function o(){return s(this,o),i(this,(o.__proto__||Object.getPrototypeOf(o)).apply(this,arguments))}return r(o,e),c(o,[{key:"render",value:function(){return l("div",{},void 0,l("div",{className:"panel panel-default"},void 0,v,l("div",{className:"panel-body"},void 0,u,l("div",{className:"row"},void 0,l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,m,l("div",{className:"balance"},void 0,Math.round(this.props.userInfo.tokens.total)))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,p,l("div",{className:"balance"},void 0,this.props.userInfo.tokens.referral))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,f,l("div",{className:"balance"},void 0,this.props.userInfo.referral.success))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,b,l("div",{className:"balance"},void 0,this.props.userInfo.referral.pending)))),l("div",{className:"row"},void 0,l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,h,l("div",{className:"balance"},void 0,Math.round(this.props.userInfo.tokens.bounty.creative)))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,N,l("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.youtube))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,y,l("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.twitter))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,k,l("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.facebook))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,w,l("div",{className:"balance"},void 0,Math.round(this.props.userInfo.tokens.bounty.translation)))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,S,l("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.reddit))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,_,l("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.telegram))),l("div",{className:"col-sm-6 col-md-3"},void 0,l("div",{className:"bal-card"},void 0,g,l("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.signature)))))))}}]),o}(n.a.PureComponent);o.default=I}});