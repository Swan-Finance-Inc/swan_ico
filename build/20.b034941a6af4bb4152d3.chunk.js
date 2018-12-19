webpackJsonp([20],{"./app/components/Balance/index.js":function(e,o,a){"use strict";function s(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function i(e,o){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!o||"object"!=typeof o&&"function"!=typeof o?e:o}function d(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function, not "+typeof o);e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(e,o):e.__proto__=o)}Object.defineProperty(o,"__esModule",{value:!0});var l=a("./node_modules/react/react.js"),n=a.n(l),t=a("./node_modules/react-router-dom/index.js"),r=(a.n(t),function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(o,a,s,i){var d=o&&o.defaultProps,l=arguments.length-3;if(a||0===l||(a={}),a&&d)for(var n in d)void 0===a[n]&&(a[n]=d[n]);else a||(a=d||{});if(1===l)a.children=i;else if(l>1){for(var t=Array(l),r=0;r<l;r++)t[r]=arguments[r+3];a.children=t}return{$$typeof:e,type:o,key:void 0===s?null:""+s,ref:null,props:a,_owner:null}}}()),c=function(){function e(e,o){for(var a=0;a<o.length;a++){var s=o[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(o,a,s){return a&&e(o.prototype,a),s&&e(o,s),o}}(),v=r("div",{className:"panel-heading"},void 0,"Your Balance"),m=r("div",{className:"row"},void 0,r("div",{className:"col-sm-12"},void 0,r("p",{},void 0,"Transaction may take up to 24 hours to approve due to our comprehensive verification methods to protect our customers."))),u=r("h3",{},void 0,"Total Balance"),p=r("h3",{},void 0,"Referral Tokens Earned"),f=r("h3",{},void 0,"# of Confirmed Referrals"),b=r("h3",{},void 0,"# of Pending Referrals"),N=r("div",{className:"panel-heading"},void 0,"Bounty Stakes"),h=r("div",{className:"row"},void 0,r("div",{className:"col-sm-12"},void 0,r("p",{},void 0,"To participate in bounty ",r("a",{href:"https://www.google.com",target:"_blank",className:"link"},void 0,"click here"),"."))),y=r("h3",{},void 0,"Creative Stakes"),k=r("h3",{},void 0,"Youtube Stakes"),w=r("h3",{},void 0,"Twitter Stakes"),g=r("h3",{},void 0,"Facebook Stakes"),I=r("h3",{},void 0,"Translation Stakes"),S=r("h3",{},void 0,"Reddit Stakes"),_=r("h3",{},void 0,"Telegram Stakes"),j=r("h3",{},void 0,"Signature Stakes"),O=r("h3",{},void 0,"LinkedIn Stakes"),T=function(e){function o(){return s(this,o),i(this,(o.__proto__||Object.getPrototypeOf(o)).apply(this,arguments))}return d(o,e),c(o,[{key:"render",value:function(){return console.log("tokens: ",this.props.userInfo.tokens),r("div",{},void 0,r("div",{className:"panel panel-default"},void 0,v,r("div",{className:"panel-body"},void 0,m,r("div",{className:"row"},void 0,r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,u,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.total))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,p,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.referral))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,f,r("div",{className:"balance"},void 0,this.props.userInfo.referral.success))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,b,r("div",{className:"balance"},void 0,this.props.userInfo.referral.pending)))))),r("div",{className:"panel panel-default"},void 0,N,r("div",{className:"panel-body"},void 0,h,r("div",{className:"row"},void 0,r("div",{className:"col-sm-12"},void 0,r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,y,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.creative))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,k,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.youtube))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,w,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.twitter))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,g,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.facebook))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,I,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.translation))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,S,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.reddit))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,_,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.telegram))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,j,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.signature))),r("div",{className:"col-sm-6 col-md-3"},void 0,r("div",{className:"bal-card"},void 0,O,r("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.linkedIn))))))))}}]),o}(n.a.PureComponent);o.default=T}});