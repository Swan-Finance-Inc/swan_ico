webpackJsonp([15],{"./app/containers/MyReferal/index.js":function(e,t,n){"use strict";function a(e){return{type:E,data:e}}function r(e){return{type:D,data:e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments[1];switch(t.type){case S:return e;case D:return e.set("loading",!0);case E:return e.set("loading",!1).set("referData",t.data);default:return e}}function s(){var e,t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,console.log(" inside the saga of referals "),e={headers:{"x-auth-token":localStorage.getItem("token")}},n.next=5,Object(M.a)(A.a.user.getReferData,e);case 5:if(t=n.sent,console.log(t),!t.success){n.next=13;break}return console.log(" in success"),n.next=11,Object(M.b)(a(t));case 11:n.next=14;break;case 13:console.log("from saga",t);case 14:n.next=20;break;case 16:return n.prev=16,n.t0=n.catch(0),n.next=20,Object(M.b)(Object(H.a)(n.t0));case 20:case"end":return n.stop()}},B,this,[[0,16]])}function c(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,[Object(M.d)(D,s)];case 2:case"end":return e.stop()}},F,this)}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function f(e){return{dispatch:e,getReferalData:function(t){return e(r(t))}}}Object.defineProperty(t,"__esModule",{value:!0});var p=n("./node_modules/react/react.js"),m=n.n(p),b=(n("./node_modules/prop-types/index.js"),n("./node_modules/react-redux/es/index.js")),g=n("./node_modules/reselect/es/index.js"),y=n("./node_modules/redux/es/index.js"),h=n("./node_modules/react-helmet/lib/Helmet.js"),v=n("./node_modules/react-table/lib/index.js"),j=n.n(v),_=n("./app/components/LoadingSpinner/Loadable.js"),x=n("./app/utils/injectSaga.js"),O=n("./app/utils/injectReducer.js"),R=(n("./node_modules/react-copy-to-clipboard/lib/index.js"),function(e){return e.get("myReferal")}),k=function(){return Object(g.a)(R,function(e){return e.toJS()})},w=k,T=n("./app/components/Refer/Loadable.js"),S="app/MyReferal/DEFAULT_ACTION",D="app/MyReferal/GET_REFERAL_DATA",E="app/MyReferal/GET_REFER_SUCCESS",N=n("./node_modules/immutable/dist/immutable.js"),P=Object(N.fromJS)({loading:!1,referData:""}),C=o,M=n("./node_modules/redux-saga/es/effects.js"),A=n("./app/utils/api.js"),H=(n("./node_modules/react-router-redux/index.js"),n("./app/containers/DashBoardWelcomePage/actions.js")),B=regeneratorRuntime.mark(s),F=regeneratorRuntime.mark(c);n.d(t,"MyReferal",function(){return Z});var L=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,a,r){var o=t&&t.defaultProps,s=arguments.length-3;if(n||0===s||(n={}),n&&o)for(var c in o)void 0===n[c]&&(n[c]=o[c]);else n||(n=o||{});if(1===s)n.children=r;else if(s>1){for(var i=Array(s),l=0;l<s;l++)i[l]=arguments[l+3];n.children=i}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:n,_owner:null}}}(),z=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),I=L(h.Helmet,{},void 0,L("title",{},void 0,"My Referrals"),L("meta",{name:"description",content:"Description of My Referrals"})),J=L("div",{className:"panel-heading"},void 0,"Transactions"),Z=function(e){function t(e){l(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={users:[{local:{email:"quillhash@gmail.com"},_id:"5c127ab8caaefa2fc7c1c63b",created_at:"2018-12-13T15:28:57.039Z"},{local:{email:"quillaudit@gmail.com"},_id:"5c127ab8caaefa2fc7c1c63b",created_at:"2018-12-01T15:28:57.039Z"}],transactions:[{tokens:5e11,status:"confirmed",created_at:"2018-12-13T16:48:08.112Z"}],userCollumn:[{Header:"Email",accessor:"local.email",className:"name"},{Header:"Created At",accessor:"created_at",className:"created_at"}],transactionCollumn:[{Header:"Status",accessor:"status",className:"status"},{Header:"Tokens can be earned",accessor:function(e){return e.tokens+e.tokens*(.01*e.referBonus)},className:"email",id:"tokensCanbeEarned"},{Header:"Created At",accessor:"created_at",className:"created_at"}],code:"",link:"",percent:""},n}return d(t,e),z(t,[{key:"componentDidMount",value:function(){this.props.getReferalData()}},{key:"componentWillReceiveProps",value:function(e){if(e.referData&&e.referData.success){console.log(" inside success in willrecieveprops ");var t=[],n=[],a=e.referData;console.log(a," data in willrecieveprops"),a.transactions.forEach(function(e,n){e.forEach(function(e,n){return t.push(e)})}),a.users.forEach(function(e,t){return n.push(e)}),this.setState({transactions:t,users:n})}}},{key:"render",value:function(){console.log(this.props," props in myreferal"),console.log(this.state," state in myreferal");var e=this.props.loading;return L("div",{id:"content",className:"ui-content ui-content-aside-overlay"},void 0,I,L("div",{className:"ui-content-body"},void 0,L("div",{className:"ui-container container-fluid"},void 0,0!=this.props.code.amountPercent?L(T.a,{code:this.props.code,icoFlag:!1}):"",L("div",{className:"panel panel-default"},void 0,J,L("div",{className:"row"},void 0,L("div",{className:"col-sm-10 col-sm-offset-1"},void 0,e?L(_.a,{style:{alignItems:"center",marginTop:"35px",marginBottom:"45px",background:"#fff"}}):L(j.a,i({className:"-striped -highlight",showPaginationBottom:!0,style:{marginTop:"20px",fontSize:"12px",cursor:"pointer"},data:this.state.transactions,columns:this.state.transactionCollumn,pageSizeOptions:[5,10],noDataText:"No Transaction Found",rowsText:"transactions",getTdProps:function(e,t,n,a){return{onClick:function(e,n){console.log(t),n&&n()}}},defaultPageSize:5},"showPaginationBottom",!0))))))))}}]),t}(m.a.PureComponent),q=Object(g.b)({myreferal:w(),loading:function(){return Object(g.a)(R,function(e){return e.get("loading")})}(),referData:function(){return Object(g.a)(R,function(e){return e.get("referData")})}()}),G=Object(b.b)(q,f),U=Object(O.a)({key:"myReferal",reducer:C}),W=Object(x.a)({key:"myReferal",saga:c});t.default=Object(y.compose)(U,W,G)(Z)}});