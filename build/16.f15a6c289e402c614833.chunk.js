webpackJsonp([16],{

/***/ "./app/containers/SignupConfirm/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("./node_modules/prop-types/index.js");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-router-dom/index.js
var react_router_dom = __webpack_require__("./node_modules/react-router-dom/index.js");
var react_router_dom_default = /*#__PURE__*/__webpack_require__.n(react_router_dom);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 14 modules
var es = __webpack_require__("./node_modules/react-redux/es/index.js");

// EXTERNAL MODULE: ./node_modules/reselect/es/index.js
var reselect_es = __webpack_require__("./node_modules/reselect/es/index.js");

// EXTERNAL MODULE: ./node_modules/redux/es/index.js + 6 modules
var redux_es = __webpack_require__("./node_modules/redux/es/index.js");

// EXTERNAL MODULE: ./app/utils/injectSaga.js + 2 modules
var injectSaga = __webpack_require__("./app/utils/injectSaga.js");

// EXTERNAL MODULE: ./app/utils/injectReducer.js + 1 modules
var injectReducer = __webpack_require__("./app/utils/injectReducer.js");

// EXTERNAL MODULE: ./node_modules/react-toastify/lib/index.js
var lib = __webpack_require__("./node_modules/react-toastify/lib/index.js");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./app/containers/SignupConfirm/selectors.js


/**
 * Direct selector to the signupConfirm state domain
 */
var selectSignupConfirmDomain = function selectSignupConfirmDomain(state) {
  return state.get('signupConfirm');
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignupConfirm
 */

var selectors_makeSelectSignupConfirm = function makeSelectSignupConfirm() {
  return Object(reselect_es["a" /* createSelector */])(selectSignupConfirmDomain, function (substate) {
    return substate.toJS();
  });
};

var selectors_makeSelectResendMail = function makeSelectResendMail() {
  return Object(reselect_es["a" /* createSelector */])(selectSignupConfirmDomain, function (substate) {
    return substate.get('resendMail');
  });
};

var selectors_makeSelectSuccessMessage = function makeSelectSuccessMessage() {
  return Object(reselect_es["a" /* createSelector */])(selectSignupConfirmDomain, function (substate) {
    return substate.get('resendSuccess');
  });
};

var selectors_makeSelectFailureMessage = function makeSelectFailureMessage() {
  return Object(reselect_es["a" /* createSelector */])(selectSignupConfirmDomain, function (substate) {
    return substate.get('resendFailure');
  });
};

/* harmony default export */ var selectors = (selectors_makeSelectSignupConfirm);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__("./node_modules/immutable/dist/immutable.js");
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// CONCATENATED MODULE: ./app/containers/SignupConfirm/constants.js
/*
 *
 * SignupConfirm constants
 *
 */
var DEFAULT_ACTION = 'app/SignupConfirm/DEFAULT_ACTION';
var RESEND_ACTION = 'app/SignupConfirm/RESEND_ACTION';
var RESEND_SUCCESS = 'app/SignupConfirm/RESEND_SUCCESS';
var RESEND_FAILURE = 'app/SignupConfirm/RESEND_FAILURE';
// CONCATENATED MODULE: ./app/containers/SignupConfirm/reducer.js
/*
 *
 * SignupConfirm reducer
 *
 */



var initialState = Object(immutable["fromJS"])({
  resendMail: false,
  resendSuccess: false,
  resendFailure: false
});

function signupConfirmReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESEND_ACTION:
      return state.set('resendMail', action.data);
    case RESEND_SUCCESS:
      return state.set('resendSuccess', action.data).set('resendFailure', false);
    case RESEND_FAILURE:
      return state.set('resendSuccess', false).set('resendFailure', action.data);
    default:
      return state;
  }
}

/* harmony default export */ var reducer = (signupConfirmReducer);
// EXTERNAL MODULE: ./app/utils/api.js
var api = __webpack_require__("./app/utils/api.js");

// EXTERNAL MODULE: ./node_modules/redux-saga/es/effects.js
var effects = __webpack_require__("./node_modules/redux-saga/es/effects.js");

// CONCATENATED MODULE: ./app/containers/SignupConfirm/actions.js
/*
 *
 * SignupConfirm actions
 *
 */

function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
function resendAction(data) {
  return {
    type: RESEND_ACTION,
    data: data
  };
}
function resendSuccess(data) {
  return {
    type: RESEND_SUCCESS,
    data: data
  };
}
function resendFailure(data) {
  return {
    type: RESEND_FAILURE,
    data: data
  };
}
// EXTERNAL MODULE: ./app/containers/DashBoardWelcomePage/actions.js
var actions = __webpack_require__("./app/containers/DashBoardWelcomePage/actions.js");

// CONCATENATED MODULE: ./app/containers/SignupConfirm/saga.js
var _marked = /*#__PURE__*/regeneratorRuntime.mark(resend),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga);









// Individual exports for testing
function resend() {
  var email, apiData;
  return regeneratorRuntime.wrap(function resend$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(effects["c" /* select */])(selectors_makeSelectResendMail());

        case 3:
          email = _context.sent;
          _context.next = 6;
          return Object(effects["a" /* call */])(api["a" /* default */].user.resendMail, email);

        case 6:
          apiData = _context.sent;

          if (!apiData.success) {
            _context.next = 12;
            break;
          }

          _context.next = 10;
          return Object(effects["b" /* put */])(resendSuccess(apiData.message));

        case 10:
          _context.next = 14;
          break;

        case 12:
          _context.next = 14;
          return Object(effects["b" /* put */])(resendFailure(apiData.message));

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context['catch'](0);
          _context.next = 20;
          return Object(effects["b" /* put */])(Object(actions["a" /* codeErrorAction */])());

        case 20:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 16]]);
}
function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(effects["e" /* takeLatest */])(RESEND_ACTION, resend);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
// EXTERNAL MODULE: ./app/images/CWHLogo.png
var CWHLogo = __webpack_require__("./app/images/CWHLogo.png");
var CWHLogo_default = /*#__PURE__*/__webpack_require__.n(CWHLogo);

// CONCATENATED MODULE: ./app/containers/SignupConfirm/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupConfirm", function() { return SignupConfirm_SignupConfirm; });
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * SignupConfirm
 *
 */
















var _ref = _jsx('header', {
  className: 'header signin'
}, void 0, _jsx(lib["ToastContainer"], {
  position: 'top-center',
  autoClose: 10000000000000000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: false
}), _jsx('div', {
  className: 'container'
}, void 0, _jsx('div', {
  className: 'row'
}, void 0, _jsx('div', {
  className: 'col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix'
}, void 0, _jsx('div', {
  className: 'logo'
}, void 0, _jsx(react_router_dom["Link"], {
  to: '/'
}, void 0, _jsx('img', {
  src: CWHLogo_default.a,
  alt: 'swann'
})))), _jsx('div', {
  className: 'col-xs-7 col-sm-6 col-md-10'
}))));

var _ref2 = _jsx('div', {
  className: 'card-header'
}, void 0, _jsx('h1', {}, void 0, 'Sign Up Success'), _jsx('h2', {}, void 0, 'Please check your email for verification link.'));

var _ref3 = _jsx('p', {}, void 0, 'If you DON\u2019T see our emails, please check your SPAM folder.');

var _ref4 = _jsx('p', {}, void 0, ' To avoid our email to you being considered as SPAM, please add the following email to your contact list: hello@swanfinance.io');

var SignupConfirm_SignupConfirm = function (_React$PureComponent) {
  _inherits(SignupConfirm, _React$PureComponent);

  // eslint-disable-line react/prefer-stateless-function
  function SignupConfirm(props) {
    _classCallCheck(this, SignupConfirm);

    var _this = _possibleConstructorReturn(this, (SignupConfirm.__proto__ || Object.getPrototypeOf(SignupConfirm)).call(this, props));

    _this.resendMail = _this.resendMail.bind(_this);
    return _this;
  }

  _createClass(SignupConfirm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.resendSuccess) {
        this.notifySuccess(nextProps.resendSuccess);
      } else if (nextProps.resendFailure) {
        this.notifyError(nextProps.resendFailure);
      }
    }
  }, {
    key: 'notifyError',
    value: function notifyError(data) {
      lib["toast"].error(data);
    }
  }, {
    key: 'notifySuccess',
    value: function notifySuccess(data) {
      lib["toast"].success(data);
    }
  }, {
    key: 'resendMail',
    value: function resendMail() {
      // console.log(this.props.email);
      this.props.resendMail(this.props.email);
    }
  }, {
    key: 'render',
    value: function render() {
      return _jsx('div', {
        className: 'wrapper'
      }, void 0, _ref, _jsx('section', {
        className: 'signin-block'
      }, void 0, _jsx('div', {
        className: 'container'
      }, void 0, _jsx('div', {
        className: 'row'
      }, void 0, _jsx('div', {
        className: 'col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4'
      }, void 0, _ref2, _jsx('div', {
        className: 'signin-card-body'
      }, void 0, _jsx('h2', {
        style: { textAlign: 'center' }
      }, void 0, 'WARNING.'), _ref3, _ref4))))));
    }
  }]);

  return SignupConfirm;
}(react_default.a.PureComponent);

var mapStateToProps = Object(reselect_es["b" /* createStructuredSelector */])({
  signupconfirm: selectors(),
  resendSuccess: selectors_makeSelectSuccessMessage(),
  resendFailure: selectors_makeSelectFailureMessage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    resendMail: function resendMail(data) {
      return dispatch(resendAction(data));
    }
  };
}

var withConnect = Object(es["b" /* connect */])(mapStateToProps, mapDispatchToProps);
var withReducer = Object(injectReducer["a" /* default */])({ key: 'signupConfirm', reducer: reducer });
var withSaga = Object(injectSaga["a" /* default */])({ key: 'signupConfirm', saga: defaultSaga });

/* harmony default export */ var containers_SignupConfirm = __webpack_exports__["default"] = (Object(redux_es["compose"])(withReducer, withSaga, withConnect)(SignupConfirm_SignupConfirm));

/***/ }),

/***/ "./app/images/CWHLogo.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "129fd5f1fea6846e480a8dcf1e03aaed.png";

/***/ })

});