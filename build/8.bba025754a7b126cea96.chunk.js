webpackJsonp([8],{"./app/components/CustomLoading/Loadable.js":function(e,t,n){"use strict";var r=n("./node_modules/react-loadable/lib/index.js"),o=n.n(r);t.a=o()({loader:function(){return n.e(18).then(n.bind(null,"./app/components/CustomLoading/index.js"))},loading:function(){return null}})},"./app/containers/Loading/index.js":function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments[1];switch(t.type){case _:return e.set("data",t.data);case k:return e.set("verified",!0);case w:return e.set("expired",!0);default:return e}}function o(){var e,t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(S.c)(g());case 3:return e=n.sent,n.next=6,Object(S.a)(E.a.user.validateToken,e);case 6:if(t=n.sent,!t.data.success){n.next=18;break}return n.next=10,Object(S.b)(Object(P.c)(t.data.email));case 10:return n.next=12,Object(S.b)(Object(P.b)());case 12:return n.next=14,Object(S.b)(Object(P.h)());case 14:return n.next=16,Object(S.b)(Object(C.push)("/signin"));case 16:n.next=25;break;case 18:if(t.data.success){n.next=25;break}return n.next=21,Object(S.b)(Object(P.h)());case 21:return n.next=23,Object(S.b)(Object(P.i)());case 23:return n.next=25,Object(S.b)(Object(C.push)("/signin"));case 25:n.next=29;break;case 27:n.prev=27,n.t0=n.catch(0);case 29:case"end":return n.stop()}},I,this,[[0,27]])}function a(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,[Object(S.e)(_,o)];case 2:case"end":return e.stop()}},T,this)}function i(e){return{type:_,data:e}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function d(e){return{dispatch:e,verify:function(t){return e(i(t))}}}Object.defineProperty(t,"__esModule",{value:!0});var p=n("./node_modules/react/react.js"),f=n.n(p),l=(n("./node_modules/prop-types/index.js"),n("./node_modules/react-redux/es/index.js")),b=n("./node_modules/reselect/es/index.js"),j=n("./node_modules/redux/es/index.js"),m=n("./app/utils/injectSaga.js"),O=n("./app/utils/injectReducer.js"),y=function(e){return e.get("loading")},x=function(){return Object(b.a)(y,function(e){return e.toJS()})},g=function(){return Object(b.a)(y,function(e){return e.get("data")})},v=x,h=n("./node_modules/immutable/dist/immutable.js"),_="app/Loading/VERIFY_TOKEN",k="app/Loading/VERIFY_SUCCESS",w="app/Loading/VERIFY_ERROR",R=Object(h.fromJS)({verified:!1,data:"",expired:!1}),L=r,S=n("./node_modules/redux-saga/es/effects.js"),E=n("./app/utils/api.js"),C=n("./node_modules/react-router-redux/index.js"),P=n("./app/containers/App/actions.js"),I=regeneratorRuntime.mark(o),T=regeneratorRuntime.mark(a),F=n("./app/components/CustomLoading/Loadable.js");n.d(t,"Loading",function(){return A});var J=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var a=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&a)for(var c in a)void 0===n[c]&&(n[c]=a[c]);else n||(n=a||{});if(1===i)n.children=o;else if(i>1){for(var u=Array(i),s=0;s<i;s++)u[s]=arguments[s+3];n.children=u}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),V=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Y=J(F.a,{}),A=function(e){function t(){return c(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),V(t,[{key:"componentDidMount",value:function(){this.props.verify(this.props.match.params.token)}},{key:"render",value:function(){return J("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},void 0,Y)}}]),t}(f.a.PureComponent),M=Object(b.b)({loading:v(),verified:function(){return Object(b.a)(y,function(e){return e.get("verified")})}(),expired:function(){return Object(b.a)(y,function(e){return e.get("expired")})}()}),$=Object(l.b)(M,d),D=Object(O.a)({key:"loading",reducer:L}),K=Object(m.a)({key:"loading",saga:a});t.default=Object(j.compose)(D,K,$)(A)}});