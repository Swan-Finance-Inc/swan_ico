webpackJsonp([16],{

/***/ "./app/containers/UploadDocuments/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("./node_modules/prop-types/index.js");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 14 modules
var es = __webpack_require__("./node_modules/react-redux/es/index.js");

// EXTERNAL MODULE: ./node_modules/react-helmet/lib/Helmet.js
var Helmet = __webpack_require__("./node_modules/react-helmet/lib/Helmet.js");
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// EXTERNAL MODULE: ./node_modules/reselect/es/index.js
var reselect_es = __webpack_require__("./node_modules/reselect/es/index.js");

// EXTERNAL MODULE: ./node_modules/redux/es/index.js + 6 modules
var redux_es = __webpack_require__("./node_modules/redux/es/index.js");

// EXTERNAL MODULE: ./node_modules/react-toastify/lib/index.js
var lib = __webpack_require__("./node_modules/react-toastify/lib/index.js");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./app/utils/injectSaga.js + 2 modules
var injectSaga = __webpack_require__("./app/utils/injectSaga.js");

// EXTERNAL MODULE: ./app/utils/injectReducer.js + 1 modules
var injectReducer = __webpack_require__("./app/utils/injectReducer.js");

// CONCATENATED MODULE: ./app/containers/UploadDocuments/selectors.js


/**
 * Direct selector to the uploadDocuments state domain
 */
var selectUploadDocumentsDomain = function selectUploadDocumentsDomain(state) {
  return state.get('uploadDocuments');
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by UploadDocuments
 */

var selectors_makeSelectUploadDocuments = function makeSelectUploadDocuments() {
  return Object(reselect_es["a" /* createSelector */])(selectUploadDocumentsDomain, function (substate) {
    return substate.toJS();
  });
};
var selectors_makeSelectKycDoc = function makeSelectKycDoc() {
  return Object(reselect_es["a" /* createSelector */])(selectUploadDocumentsDomain, function (substate) {
    return substate.get('kycDoc');
  });
};

/* harmony default export */ var selectors = (selectors_makeSelectUploadDocuments);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__("./node_modules/immutable/dist/immutable.js");
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// CONCATENATED MODULE: ./app/containers/UploadDocuments/constants.js
/*
 *
 * UploadDocuments constants
 *
 */

var DEFAULT_ACTION = 'app/UploadDocuments/DEFAULT_ACTION';
var SUBMIT_DOC = 'app/UploadDocuments/SUBMIT_DOC';
var SUBMIT_DOC_SUCCESS = 'app/UploadDocuments/SUBMIT_DOC_SUCCESS';
var RESET_DOC_SUCCESS = 'app/UploadDocuments/RESET_DOC_SUCCESS';
// CONCATENATED MODULE: ./app/containers/UploadDocuments/reducer.js
/*
 *
 * UploadDocuments reducer
 *
 */




var initialState = Object(immutable["fromJS"])({});

function uploadDocumentsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUBMIT_DOC:
      return state.set('kycDoc', action.data);
    case SUBMIT_DOC_SUCCESS:
      return state.set('kycDocSuccess', action.data);
    case RESET_DOC_SUCCESS:
      return state.set('kycDocSuccess', false);

    default:
      return state;
  }
}

/* harmony default export */ var reducer = (uploadDocumentsReducer);
// EXTERNAL MODULE: ./node_modules/redux-saga/es/effects.js
var effects = __webpack_require__("./node_modules/redux-saga/es/effects.js");

// EXTERNAL MODULE: ./app/utils/api.js
var api = __webpack_require__("./app/utils/api.js");

// CONCATENATED MODULE: ./app/containers/UploadDocuments/actions.js
/*
 *
 * UploadDocuments actions
 *
 */



function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
function actions_submitDoc(data) {
  return {
    type: SUBMIT_DOC,
    data: data
  };
}

function submitKycDocSuccess(data) {
  return {
    type: SUBMIT_DOC_SUCCESS,
    data: data
  };
}

function actions_resetDocSuccess(data) {
  return {
    type: RESET_DOC_SUCCESS,
    data: data
  };
}
// EXTERNAL MODULE: ./node_modules/react-router-redux/index.js
var react_router_redux = __webpack_require__("./node_modules/react-router-redux/index.js");
var react_router_redux_default = /*#__PURE__*/__webpack_require__.n(react_router_redux);

// EXTERNAL MODULE: ./app/containers/DashBoardWelcomePage/actions.js
var actions = __webpack_require__("./app/containers/DashBoardWelcomePage/actions.js");

// CONCATENATED MODULE: ./app/containers/UploadDocuments/saga.js
var _marked = /*#__PURE__*/regeneratorRuntime.mark(submitKycDoc),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga);









function submitKycDoc() {
  var headers, data, body, apiData;
  return regeneratorRuntime.wrap(function submitKycDoc$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          headers = {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
              'content-type': 'multipart/form-data'
            }
          };
          _context.next = 4;
          return Object(effects["c" /* select */])(selectors_makeSelectKycDoc());

        case 4:
          data = _context.sent;

          console.log(data);
          body = new FormData();


          body.append(data.field, data.image);

          _context.next = 10;
          return Object(effects["a" /* call */])(api["a" /* default */].user.uploadKycDoc, headers, body);

        case 10:
          apiData = _context.sent;

          if (!apiData.success) {
            _context.next = 17;
            break;
          }

          _context.next = 14;
          return Object(effects["b" /* put */])(submitKycDocSuccess(apiData));

        case 14:
          console.log('from saga', apiData);
          _context.next = 18;
          break;

        case 17:
          console.log(err);

        case 18:
          _context.next = 25;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context['catch'](0);
          _context.next = 24;
          return Object(effects["b" /* put */])(Object(actions["a" /* codeErrorAction */])());

        case 24:
          console.log('error : ', _context.t0);

        case 25:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 20]]);
}

// Individual exports for testing
function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return [Object(effects["d" /* takeEvery */])(SUBMIT_DOC, submitKycDoc)];

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
// CONCATENATED MODULE: ./app/containers/UploadDocuments/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadDocuments", function() { return UploadDocuments_UploadDocuments; });
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * UploadDocuments
 *
 */















var _ref = _jsx(Helmet["Helmet"], {}, void 0, _jsx('title', {}, void 0, 'Upload Extra Documents'), _jsx('meta', {
  name: 'description',
  content: 'Description of Upload Document'
}));

var _ref2 = _jsx(lib["ToastContainer"], {
  position: 'top-center',
  autoClose: 6000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true
});

var _ref3 = _jsx('div', {
  className: 'panel-heading'
}, void 0, 'Upload More Documents');

var _ref4 = _jsx('label', {
  htmlFor: 'front_id'
}, void 0, _jsx('h5', {}, void 0, 'Documnets', _jsx('sup', {}, void 0, '*')));

var UploadDocuments_UploadDocuments = function (_React$PureComponent) {
  _inherits(UploadDocuments, _React$PureComponent);

  // eslint-disable-line react/prefer-stateless-function
  function UploadDocuments(props) {
    _classCallCheck(this, UploadDocuments);

    var _this = _possibleConstructorReturn(this, (UploadDocuments.__proto__ || Object.getPrototypeOf(UploadDocuments)).call(this, props));

    _this.handleFrontImg = function (e) {
      e.preventDefault();
      var reader = new FileReader();
      var file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        lib["toast"].error('File size should be less than 5MB');
      } else {
        reader.onloadend = function () {
          _this.setState({
            frontImgUrl: '/assets/img/uploading.svg',
            frontImg: file
          });
        };
        reader.readAsDataURL(file);
        _this.props.submitDoc({ image: file, field: 'extraDoc' });
      }
    };

    _this.state = {
      frontImgUrl: 'https://s3.amazonaws.com/websiteimagesrama/id_front.png',
      frontImg: ''
    };
    return _this;
  }

  _createClass(UploadDocuments, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.uploaddocuments.kycDocSuccess) {
        if (nextProps.uploaddocuments.kycDocSuccess.image == 'extraDoc') {
          this.setState({
            frontImgUrl: nextProps.uploaddocuments.kycDocSuccess.imageUrl
          });
          lib["toast"].success("Document Uploaded Successfully");
          nextProps.resetDocSuccess();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.props, " props in upload Document");
      console.log(this.state, " state in upload Document ");
      return _jsx('div', {
        id: 'content',
        className: 'ui-content ui-content-aside-overlay'
      }, void 0, _ref, _ref2, _jsx('div', {
        className: 'ui-content-body'
      }, void 0, _jsx('div', {
        className: 'ui-container container-fluid'
      }, void 0, _jsx('div', {
        className: 'panel panel-default'
      }, void 0, _ref3, _jsx('div', {
        className: 'row'
      }, void 0, _jsx('div', {
        className: 'col-sm-6 form-group'
      }, void 0, _ref4, _jsx('img', {
        className: 'img-responsive',
        style: { width: '400px', height: '250px' },
        src: this.state.frontImgUrl,
        alt: 'front id',
        id: 'front_img_src'
      }), _jsx('input', {
        type: 'file',
        accept: 'image/png, image/jpeg',
        name: 'front_id',
        style: { margin: '10px 0px 0px 30px' },
        onChange: this.handleFrontImg,
        required: true
      })))))));
    }
  }]);

  return UploadDocuments;
}(react_default.a.PureComponent);

var mapStateToProps = Object(reselect_es["b" /* createStructuredSelector */])({
  uploaddocuments: selectors()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    submitDoc: function submitDoc(data) {
      return dispatch(actions_submitDoc(data));
    },
    resetDocSuccess: function resetDocSuccess(data) {
      return dispatch(actions_resetDocSuccess(data));
    }
  };
}

var withConnect = Object(es["b" /* connect */])(mapStateToProps, mapDispatchToProps);

var withReducer = Object(injectReducer["a" /* default */])({ key: 'uploadDocuments', reducer: reducer });
var withSaga = Object(injectSaga["a" /* default */])({ key: 'uploadDocuments', saga: defaultSaga });

/* harmony default export */ var containers_UploadDocuments = __webpack_exports__["default"] = (Object(redux_es["compose"])(withReducer, withSaga, withConnect)(UploadDocuments_UploadDocuments));

/***/ })

});