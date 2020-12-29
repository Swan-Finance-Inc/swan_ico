webpackJsonp([17],{

/***/ "./app/containers/Notification/index.js":
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

// EXTERNAL MODULE: ./app/utils/injectSaga.js + 2 modules
var injectSaga = __webpack_require__("./app/utils/injectSaga.js");

// EXTERNAL MODULE: ./app/utils/injectReducer.js + 1 modules
var injectReducer = __webpack_require__("./app/utils/injectReducer.js");

// CONCATENATED MODULE: ./app/containers/Notification/selectors.js


/**
 * Direct selector to the notification state domain
 */
var selectNotificationDomain = function selectNotificationDomain(state) {
  return state.get('notification');
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Notification
 */

var selectors_makeSelectNotification = function makeSelectNotification() {
  return Object(reselect_es["a" /* createSelector */])(selectNotificationDomain, function (substate) {
    return substate.toJS();
  });
};

/* harmony default export */ var selectors = (selectors_makeSelectNotification);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__("./node_modules/immutable/dist/immutable.js");
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// CONCATENATED MODULE: ./app/containers/Notification/constants.js
/*
 *
 * Notification constants
 *
 */

var DEFAULT_ACTION = 'app/Notification/DEFAULT_ACTION';
// CONCATENATED MODULE: ./app/containers/Notification/reducer.js
/*
 *
 * Notification reducer
 *
 */




var initialState = Object(immutable["fromJS"])({});

function notificationReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

/* harmony default export */ var reducer = (notificationReducer);
// CONCATENATED MODULE: ./app/containers/Notification/saga.js
var _marked = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga);

// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
// CONCATENATED MODULE: ./app/containers/Notification/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notification", function() { return Notification; });
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * Notification
 *
 */














var _ref = _jsx(Helmet["Helmet"], {}, void 0, _jsx('title', {}, void 0, 'Notifications'), _jsx('meta', {
  name: 'description',
  content: 'Your Notifications'
}));

var _ref2 = _jsx('div', {
  className: 'panel-heading'
}, void 0, 'Your Notifications');

var _ref3 = _jsx('div', {
  className: 'row'
}, void 0, _jsx('div', {
  className: 'col-sm-12'
}, void 0, _jsx('ul', {}, void 0, _jsx('li', {}, void 0, _jsx('div', {
  className: 'notificationWrapper'
}, void 0, _jsx('div', {
  className: 'notiHeading'
}, void 0, 'Heeading'), _jsx('div', {
  className: 'notiContent'
}, void 0, 'Content'))), _jsx('li', {}, void 0, _jsx('div', {
  className: 'notificationWrapper'
}, void 0, _jsx('div', {
  className: 'notiHeading'
}, void 0, 'Heeading'), _jsx('div', {
  className: 'notiContent'
}, void 0, 'Content'))), _jsx('li', {}, void 0, _jsx('div', {
  className: 'notificationWrapper'
}, void 0, _jsx('div', {
  className: 'notiHeading'
}, void 0, 'Heeading'), _jsx('div', {
  className: 'notiContent'
}, void 0, 'Content'))))));

var Notification = function (_React$PureComponent) {
  _inherits(Notification, _React$PureComponent);

  function Notification() {
    _classCallCheck(this, Notification);

    return _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).apply(this, arguments));
  }

  _createClass(Notification, [{
    key: 'render',
    // eslint-disable-line react/prefer-stateless-function
    value: function render() {
      return _jsx('div', {
        id: 'content',
        className: 'ui-content ui-content-aside-overlay'
      }, void 0, _ref, _jsx('div', {
        className: 'ui-content-body'
      }, void 0, _jsx('div', {
        className: 'ui-container container-fluid'
      }, void 0, _jsx('div', {
        className: 'panel panel-default'
      }, void 0, _ref2, _jsx('div', {
        className: 'panel-body',
        style: { fontSize: '16px' }
      }, void 0, _ref3)))));
    }
  }]);

  return Notification;
}(react_default.a.PureComponent);

var mapStateToProps = Object(reselect_es["b" /* createStructuredSelector */])({
  notification: selectors()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

var withConnect = Object(es["b" /* connect */])(mapStateToProps, mapDispatchToProps);

var withReducer = Object(injectReducer["a" /* default */])({ key: 'notification', reducer: reducer });
var withSaga = Object(injectSaga["a" /* default */])({ key: 'notification', saga: defaultSaga });

/* harmony default export */ var containers_Notification = __webpack_exports__["default"] = (Object(redux_es["compose"])(withReducer, withSaga, withConnect)(Notification));

/***/ })

});