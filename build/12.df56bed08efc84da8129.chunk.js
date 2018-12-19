webpackJsonp([12],{"./app/containers/UploadDocuments/index.js":function(e,t,n){"use strict";function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments[1];switch(t.type){case w:return e;case U:return e.set("kycDoc",t.data);case C:return e.set("kycDocSuccess",t.data);case I:return e.set("kycDocSuccess",!1);default:return e}}function r(e){return{type:U,data:e}}function a(e){return{type:C,data:e}}function s(e){return{type:I,data:e}}function c(){var e,t,n,o;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,e={headers:{"x-auth-token":localStorage.getItem("token"),"content-type":"multipart/form-data"}},r.next=4,Object(E.c)(O());case 4:return t=r.sent,console.log(t),n=new FormData,n.append(t.field,t.image),r.next=10,Object(E.a)(N.a.user.uploadKycDoc,e,n);case 10:if(o=r.sent,!o.success){r.next=17;break}return r.next=14,Object(E.b)(a(o));case 14:console.log("from saga",o),r.next=18;break;case 17:console.log(err);case 18:r.next=25;break;case 20:return r.prev=20,r.t0=r.catch(0),r.next=24,Object(E.b)(Object(T.a)());case 24:console.log("error : ",r.t0);case 25:case"end":return r.stop()}},F,this,[[0,20]])}function i(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,[Object(E.d)(U,c)];case 2:case"end":return e.stop()}},B,this)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function p(e){return{dispatch:e,submitDoc:function(t){return e(r(t))},resetDocSuccess:function(t){return e(s(t))}}}Object.defineProperty(t,"__esModule",{value:!0});var m=n("./node_modules/react/react.js"),f=n.n(m),g=(n("./node_modules/prop-types/index.js"),n("./node_modules/react-redux/es/index.js")),b=n("./node_modules/react-helmet/lib/Helmet.js"),v=n("./node_modules/reselect/es/index.js"),y=n("./node_modules/redux/es/index.js"),h=n("./node_modules/react-toastify/lib/index.js"),j=n("./app/utils/injectSaga.js"),D=n("./app/utils/injectReducer.js"),x=function(e){return e.get("uploadDocuments")},_=function(){return Object(v.a)(x,function(e){return e.toJS()})},O=function(){return Object(v.a)(x,function(e){return e.get("kycDoc")})},S=_,k=n("./node_modules/immutable/dist/immutable.js"),w="app/UploadDocuments/DEFAULT_ACTION",U="app/UploadDocuments/SUBMIT_DOC",C="app/UploadDocuments/SUBMIT_DOC_SUCCESS",I="app/UploadDocuments/RESET_DOC_SUCCESS",P=Object(k.fromJS)({}),R=o,E=n("./node_modules/redux-saga/es/effects.js"),N=n("./app/utils/api.js"),T=(n("./node_modules/react-router-redux/index.js"),n("./app/containers/DashBoardWelcomePage/actions.js")),F=regeneratorRuntime.mark(c),B=regeneratorRuntime.mark(i);n.d(t,"UploadDocuments",function(){return W});var M=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,o,r){var a=t&&t.defaultProps,s=arguments.length-3;if(n||0===s||(n={}),n&&a)for(var c in a)void 0===n[c]&&(n[c]=a[c]);else n||(n=a||{});if(1===s)n.children=r;else if(s>1){for(var i=Array(s),u=0;u<s;u++)i[u]=arguments[u+3];n.children=i}return{$$typeof:e,type:t,key:void 0===o?null:""+o,ref:null,props:n,_owner:null}}}(),A=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),z=M(b.Helmet,{},void 0,M("title",{},void 0,"Upload Extra Documents"),M("meta",{name:"description",content:"Description of Upload Document"})),H=M(h.ToastContainer,{position:"top-center",autoClose:6e3,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnHover:!0}),J=M("div",{className:"panel-heading"},void 0,"Upload More Documents"),L=M("label",{htmlFor:"front_id"},void 0,M("h5",{},void 0,"Documnets",M("sup",{},void 0,"*"))),W=function(e){function t(e){u(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleFrontImg=function(e){e.preventDefault();var t=new FileReader,o=e.target.files[0];o.size>2097152?h.toast.error("File size should be less than 2MB"):(t.onloadend=function(){n.setState({frontImgUrl:"/assets/img/uploading.svg",frontImg:o})},t.readAsDataURL(o),n.props.submitDoc({image:o,field:"extraDoc"}))},n.state={frontImgUrl:"https://s3.amazonaws.com/websiteimagesrama/id_front.png",frontImg:""},n}return d(t,e),A(t,[{key:"componentWillReceiveProps",value:function(e){e.uploaddocuments.kycDocSuccess&&"extraDoc"==e.uploaddocuments.kycDocSuccess.image&&(this.setState({frontImgUrl:e.uploaddocuments.kycDocSuccess.imageUrl}),h.toast.success("Document Uploaded Successfully"),e.resetDocSuccess())}},{key:"render",value:function(){return console.log(this.props," props in upload Document"),console.log(this.state," state in upload Document "),M("div",{id:"content",className:"ui-content ui-content-aside-overlay"},void 0,z,H,M("div",{className:"ui-content-body"},void 0,M("div",{className:"ui-container container-fluid"},void 0,M("div",{className:"panel panel-default"},void 0,J,M("div",{className:"row"},void 0,M("div",{className:"col-sm-6 form-group"},void 0,L,M("img",{className:"img-responsive",style:{width:"400px",height:"250px"},src:this.state.frontImgUrl,alt:"front id",id:"front_img_src"}),M("input",{type:"file",accept:"image/png, image/jpeg",name:"front_id",style:{margin:"10px 0px 0px 30px"},onChange:this.handleFrontImg,required:!0})))))))}}]),t}(f.a.PureComponent),$=Object(v.b)({uploaddocuments:S()}),q=Object(g.b)($,p),K=Object(D.a)({key:"uploadDocuments",reducer:R}),G=Object(j.a)({key:"uploadDocuments",saga:i});t.default=Object(y.compose)(K,G,q)(W)}});