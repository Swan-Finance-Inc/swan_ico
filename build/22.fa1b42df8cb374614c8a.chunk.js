webpackJsonp([22],{"./app/components/Balance/index.js":function(o,e,a){"use strict";function s(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}function i(o,e){if(!o)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?o:e}function t(o,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);o.prototype=Object.create(e&&e.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(o,e):o.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var n=a("./node_modules/react/react.js"),l=a.n(n),d=a("./node_modules/react-router-dom/index.js"),r=(a.n(d),a("./app/components/Info/index.js")),c=function(){var o="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(e,a,s,i){var t=e&&e.defaultProps,n=arguments.length-3;if(a||0===n||(a={}),a&&t)for(var l in t)void 0===a[l]&&(a[l]=t[l]);else a||(a=t||{});if(1===n)a.children=i;else if(n>1){for(var d=Array(n),r=0;r<n;r++)d[r]=arguments[r+3];a.children=d}return{$$typeof:o,type:e,key:void 0===s?null:""+s,ref:null,props:a,_owner:null}}}(),v=function(){function o(o,e){for(var a=0;a<e.length;a++){var s=e[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(o,s.key,s)}}return function(e,a,s){return a&&o(e.prototype,a),s&&o(e,s),e}}(),m=c("div",{className:"row"},void 0,c("div",{className:"col-sm-12"},void 0,c("p",{},void 0,"Transaction may take up to 24 hours to approve due to our comprehensive verification methods to protect our customers."))),p=c("h3",{},void 0,"Total Balance"),u=c("u",{},void 0,"View Transactions"),f=c("div",{},void 0,"     "),b=c("h3",{},void 0,"Referral Tokens Earned"),h=c("u",{},void 0,"View Referral Transactions"),N=c("div",{},void 0,"     "),g=c("h3",{},void 0,"# of Confirmed Referrals"),k=c("div",{},void 0,"     "),y=c("h3",{},void 0,"# of Pending Referrals"),w=c("div",{},void 0,"     "),S=c("div",{className:"row"},void 0,c("div",{className:"col-sm-12"},void 0,c("p",{},void 0,"To participate in bounty ",c("a",{href:"https://www.google.com",target:"_blank",className:"link"},void 0,"click here"),"."))),I=c("h3",{},void 0,"Creative Stakes"),T=c("h3",{},void 0,"Youtube Stakes"),_=c("h3",{},void 0,"Twitter Stakes"),C=c("h3",{},void 0,"Facebook Stakes"),j=c("h3",{},void 0,"Translation Stakes"),P=c("h3",{},void 0,"Reddit Stakes"),R=c("h3",{},void 0,"Telegram Stakes"),x=c("h3",{},void 0,"Signature Stakes"),O=c("h3",{},void 0,"LinkedIn Stakes"),A=function(o){function e(o){s(this,e);var a=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,o));return a.toggleTranActive=function(o){a.props.compact(),a.props.toggleTranActive()},a.togglemyReferal=function(o){a.props.compact(),a.props.togglemyReferal()},a.toggleContriActive=function(o){a.props.compact(),a.props.toggleContActive()},a.handleInfoModal=function(){a.setState({infoShow:!a.state.infoShow}),console.log("infoShow : ",a.state.infoShow)},a.state={infoShow:!1},a}return t(e,o),v(e,[{key:"render",value:function(){return c("div",{},void 0,c("div",{className:"panel panel-default"},void 0,c("div",{className:"panel-heading blueBG"},void 0,c(r.a,{hanldeToggle:this.handleInfoModal,toggleFlag:this.state.infoShow}),"Your Balance"),c("div",{className:"panel-body"},void 0,m,c("div",{className:"row"},void 0,c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,p,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.total),this.props.userInfo.tokens.total?c("div",{className:"link referalPageLink"},void 0,c(d.Link,{to:"/dashboard/transactionHistory",role:"button",onClick:this.toggleTranActive},void 0,u)):f)),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,b,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.referral),this.props.userInfo.tokens.referral?c("div",{className:"referalPageLink link"},void 0,c(d.Link,{to:"/dashboard/myReferal",role:"button",onClick:this.togglemyReferal},void 0,h," ")):N)),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,g,c("div",{className:"balance"},void 0,this.props.userInfo.referral.success),k)),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,y,c("div",{className:"balance"},void 0,this.props.userInfo.referral.pending),w))),c("div",{className:"row"},void 0,c("div",{className:"text-center"},void 0,c(d.Link,{to:"/dashboard/contribution",role:"button",onClick:this.toggleContriActive},void 0,c("button",{disabled:"ACCEPTED"!==this.props.userInfo.kycStatus,className:"btn btn-primary",style:{borderRadius:"25px",padding:"10px 60px",marginTop:"10px"}},void 0,"Invest Now")))))),c("div",{className:"panel panel-default"},void 0,c("div",{className:"panel-heading blueBG"},void 0,c(r.a,{hanldeToggle:this.handleInfoModal,toggleFlag:this.state.infoShow}),"Bounty Stakes"),c("div",{className:"panel-body"},void 0,S,c("div",{className:"row"},void 0,c("div",{className:"col-sm-12"},void 0,c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,I,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.creative))),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,T,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.youtube))),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,_,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.twitter))),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,C,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.facebook))),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,j,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.translation))),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,P,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.reddit))),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,R,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.telegram))),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,x,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.signature))),c("div",{className:"col-sm-6 col-md-3"},void 0,c("div",{className:"bal-card"},void 0,O,c("div",{className:"balance"},void 0,this.props.userInfo.tokens.bounty.linkedIn))))))))}}]),e}(l.a.PureComponent);e.default=A}});