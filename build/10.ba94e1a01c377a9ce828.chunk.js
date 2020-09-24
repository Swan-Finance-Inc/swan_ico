webpackJsonp([10],{

/***/ "./app/components/CustomLoading/Loadable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_loadable__ = __webpack_require__("./node_modules/react-loadable/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_loadable__);
/**
 *
 * Asynchronously loads the component for CustomLoading
 *
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_loadable___default()({
  loader: function loader() {
    return __webpack_require__.e/* import() */(23).then(__webpack_require__.bind(null, "./app/components/CustomLoading/index.js"));
  },
  loading: function loading() {
    return null;
  }
}));

/***/ }),

/***/ "./app/containers/Loading/index.js":
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

// EXTERNAL MODULE: ./node_modules/reselect/es/index.js
var reselect_es = __webpack_require__("./node_modules/reselect/es/index.js");

// EXTERNAL MODULE: ./node_modules/redux/es/index.js + 6 modules
var redux_es = __webpack_require__("./node_modules/redux/es/index.js");

// EXTERNAL MODULE: ./app/utils/injectSaga.js + 2 modules
var injectSaga = __webpack_require__("./app/utils/injectSaga.js");

// EXTERNAL MODULE: ./app/utils/injectReducer.js + 1 modules
var injectReducer = __webpack_require__("./app/utils/injectReducer.js");

// CONCATENATED MODULE: ./app/containers/Loading/selectors.js


/**
 * Direct selector to the loading state domain
 */
var selectLoadingDomain = function selectLoadingDomain(state) {
  return state.get('loading');
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Loading
 */

var selectors_makeSelectLoading = function makeSelectLoading() {
  return Object(reselect_es["a" /* createSelector */])(selectLoadingDomain, function (substate) {
    return substate.toJS();
  });
};

var selectors_makeSelectVerified = function makeSelectVerified() {
  return Object(reselect_es["a" /* createSelector */])(selectLoadingDomain, function (substate) {
    return substate.get('verified');
  });
};

var selectors_makeSelectExpired = function makeSelectExpired() {
  return Object(reselect_es["a" /* createSelector */])(selectLoadingDomain, function (substate) {
    return substate.get('expired');
  });
};
var selectors_makeSelectToken = function makeSelectToken() {
  return Object(reselect_es["a" /* createSelector */])(selectLoadingDomain, function (substate) {
    return substate.get('data');
  });
};
/* harmony default export */ var selectors = (selectors_makeSelectLoading);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__("./node_modules/immutable/dist/immutable.js");
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// CONCATENATED MODULE: ./app/containers/Loading/constants.js
/*
 *
 * Loading constants
 *
 */

var DEFAULT_ACTION = 'app/Loading/DEFAULT_ACTION';
var VERIFY_TOKEN = 'app/Loading/VERIFY_TOKEN';
var VERIFY_SUCCESS = 'app/Loading/VERIFY_SUCCESS';
var VERIFY_ERROR = 'app/Loading/VERIFY_ERROR';
// CONCATENATED MODULE: ./app/containers/Loading/reducer.js
/*
 *
 * Loading reducer
 *
 */




var initialState = Object(immutable["fromJS"])({
  verified: false,
  data: '',
  expired: false

});

function loadingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case VERIFY_TOKEN:
      return state.set('data', action.data);
    case VERIFY_SUCCESS:
      return state.set('verified', true);
    case VERIFY_ERROR:
      return state.set('expired', true);
    default:
      return state;
  }
}

/* harmony default export */ var reducer = (loadingReducer);
// EXTERNAL MODULE: ./node_modules/redux-saga/es/effects.js
var effects = __webpack_require__("./node_modules/redux-saga/es/effects.js");

// EXTERNAL MODULE: ./app/utils/api.js
var api = __webpack_require__("./app/utils/api.js");

// EXTERNAL MODULE: ./node_modules/react-router-redux/index.js
var react_router_redux = __webpack_require__("./node_modules/react-router-redux/index.js");
var react_router_redux_default = /*#__PURE__*/__webpack_require__.n(react_router_redux);

// EXTERNAL MODULE: ./app/containers/App/actions.js
var actions = __webpack_require__("./app/containers/App/actions.js");

// CONCATENATED MODULE: ./app/containers/Loading/saga.js
var _marked = /*#__PURE__*/regeneratorRuntime.mark(verifyUser),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga);







// Individual exports for testing

function verifyUser() {
  var token, apiData;
  return regeneratorRuntime.wrap(function verifyUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(effects["c" /* select */])(selectors_makeSelectToken());

        case 3:
          token = _context.sent;
          _context.next = 6;
          return Object(effects["a" /* call */])(api["a" /* default */].user.validateToken, token);

        case 6:
          apiData = _context.sent;

          if (!apiData.data.success) {
            _context.next = 18;
            break;
          }

          _context.next = 10;
          return Object(effects["b" /* put */])(Object(actions["c" /* emailVerified */])(apiData.data.email));

        case 10:
          _context.next = 12;
          return Object(effects["b" /* put */])(Object(actions["b" /* emailGlobalClear */])());

        case 12:
          _context.next = 14;
          return Object(effects["b" /* put */])(Object(actions["h" /* removeOuterError */])());

        case 14:
          _context.next = 16;
          return Object(effects["b" /* put */])(Object(react_router_redux["push"])('/signin'));

        case 16:
          _context.next = 25;
          break;

        case 18:
          if (apiData.data.success) {
            _context.next = 25;
            break;
          }

          _context.next = 21;
          return Object(effects["b" /* put */])(Object(actions["h" /* removeOuterError */])());

        case 21:
          _context.next = 23;
          return Object(effects["b" /* put */])(Object(actions["i" /* resetOuterError */])());

        case 23:
          _context.next = 25;
          return Object(effects["b" /* put */])(Object(react_router_redux["push"])('/signin'));

        case 25:
          _context.next = 29;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context['catch'](0);

        case 29:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 27]]);
}
function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return [Object(effects["e" /* takeLatest */])(VERIFY_TOKEN, verifyUser)];

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
// CONCATENATED MODULE: ./app/containers/Loading/actions.js
/*
 *
 * Loading actions
 *
 */



function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

function verifyToken(data) {
  return {
    type: VERIFY_TOKEN,
    data: data
  };
}

function verifySuccess() {
  return {
    type: VERIFY_SUCCESS
  };
}
function verifyError() {
  return {
    type: VERIFY_ERROR

  };
}
// EXTERNAL MODULE: ./app/components/CustomLoading/Loadable.js
var Loadable = __webpack_require__("./app/components/CustomLoading/Loadable.js");

// CONCATENATED MODULE: ./app/containers/Loading/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loading", function() { return Loading; });
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * Loading
 *
 */














var _ref = _jsx(Loadable["a" /* default */], {});

var Loading = function (_React$PureComponent) {
  _inherits(Loading, _React$PureComponent);

  function Loading() {
    _classCallCheck(this, Loading);

    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
  }

  _createClass(Loading, [{
    key: 'componentDidMount',
    // eslint-disable-line react/prefer-stateless-function
    value: function componentDidMount() {
      // console.log(this.props.match.params.token) 
      this.props.verify(this.props.match.params.token);
    }
  }, {
    key: 'render',
    value: function render() {
      return _jsx('div', {
        style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
      }, void 0, _ref);
    }
  }]);

  return Loading;
}(react_default.a.PureComponent);

var mapStateToProps = Object(reselect_es["b" /* createStructuredSelector */])({
  loading: selectors(),
  verified: selectors_makeSelectVerified(),
  expired: selectors_makeSelectExpired()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    verify: function verify(token) {
      return dispatch(verifyToken(token));
    }
  };
}

var withConnect = Object(es["b" /* connect */])(mapStateToProps, mapDispatchToProps);

var withReducer = Object(injectReducer["a" /* default */])({ key: 'loading', reducer: reducer });
var withSaga = Object(injectSaga["a" /* default */])({ key: 'loading', saga: defaultSaga });

/* harmony default export */ var containers_Loading = __webpack_exports__["default"] = (Object(redux_es["compose"])(withReducer, withSaga, withConnect)(Loading));

/***/ })

});