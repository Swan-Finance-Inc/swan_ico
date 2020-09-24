webpackJsonp([9],{

/***/ "./app/containers/App/selectors.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeSelectLocation; });
/* unused harmony export makeSelectGlobal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return makeGlobalParent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__("./node_modules/reselect/es/index.js");


var selectRoute = function selectRoute(state) {
  return state.get('route');
};
var selectGlobal = function selectGlobal(state) {
  return state.get('global');
};

var makeSelectLocation = function makeSelectLocation() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_reselect__["a" /* createSelector */])(selectRoute, function (routeState) {
    return routeState.get('location').toJS();
  });
};
var makeSelectGlobal = function makeSelectGlobal() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_reselect__["a" /* createSelector */])(selectGlobal, function (routeState) {
    return routeState.get('global').toJS();
  });
};
var makeGlobalParent = function makeGlobalParent() {
  return Object(__WEBPACK_IMPORTED_MODULE_0_reselect__["a" /* createSelector */])(selectGlobal, function (substate) {
    return substate.toJS();
  });
};



/***/ }),

/***/ "./app/containers/LoginPage/index.js":
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

// EXTERNAL MODULE: ./node_modules/react-toastify/lib/index.js
var lib = __webpack_require__("./node_modules/react-toastify/lib/index.js");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/react-router/index.js
var react_router = __webpack_require__("./node_modules/react-router/index.js");
var react_router_default = /*#__PURE__*/__webpack_require__.n(react_router);

// EXTERNAL MODULE: ./node_modules/react-router-dom/index.js
var react_router_dom = __webpack_require__("./node_modules/react-router-dom/index.js");
var react_router_dom_default = /*#__PURE__*/__webpack_require__.n(react_router_dom);

// EXTERNAL MODULE: ./app/utils/injectSaga.js + 2 modules
var injectSaga = __webpack_require__("./app/utils/injectSaga.js");

// EXTERNAL MODULE: ./node_modules/react-router-redux/index.js
var react_router_redux = __webpack_require__("./node_modules/react-router-redux/index.js");
var react_router_redux_default = /*#__PURE__*/__webpack_require__.n(react_router_redux);

// EXTERNAL MODULE: ./node_modules/glamor/lib/index.js
var glamor_lib = __webpack_require__("./node_modules/glamor/lib/index.js");
var glamor_lib_default = /*#__PURE__*/__webpack_require__.n(glamor_lib);

// EXTERNAL MODULE: ./app/utils/injectReducer.js + 1 modules
var injectReducer = __webpack_require__("./app/utils/injectReducer.js");

// CONCATENATED MODULE: ./app/containers/LoginPage/selectors.js


/**
 * Direct selector to the signUpPage state domain
 */
var selectLoginPageDomain = function selectLoginPageDomain(state) {
  return state.get('loginPage');
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignUpPage
 */

var selectors_makeSelectUser = function makeSelectUser() {
  return Object(reselect_es["a" /* createSelector */])(selectLoginPageDomain, function (substate) {
    return substate.get('user').toJS();
  });
};

var selectors_makeDetectErrorMessage = function makeDetectErrorMessage() {
  return Object(reselect_es["a" /* createSelector */])(selectLoginPageDomain, function (substate) {
    return substate.get('errorMessage');
  });
};
var selectors_makeDetectError = function makeDetectError() {
  return Object(reselect_es["a" /* createSelector */])(selectLoginPageDomain, function (substate) {
    return substate.get('error');
  });
};

// export default makeSelectLoginPage;

// EXTERNAL MODULE: ./app/containers/App/selectors.js
var selectors = __webpack_require__("./app/containers/App/selectors.js");

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__("./node_modules/immutable/dist/immutable.js");
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// CONCATENATED MODULE: ./app/containers/LoginPage/constants.js
var LOGIN_USER = 'LoginPage/LOGIN_USER';
var LOGIN_USER_SUCCESS = 'LoginPage/LOGIN_USER_SUCCESS';
var LOGIN_USER_ERROR = 'LoginPage/LOGIN_USER_ERROR';
var LOGIN_USER_ERROR_MESSAGE_REMOVE = 'LoginPage/LOGIN_USER_ERROR_MESSAGE_REMOVE';
var constants_EMAIL_VERIFIED = 'LoginPage/EMAIL_VERIFIED';
var EMAIL_STATE_CLEAR = 'LoginPage/EMAIL_STATE_CLEAR';
// CONCATENATED MODULE: ./app/containers/LoginPage/reducer.js




// The initial state of the App
var initialState = Object(immutable["fromJS"])({
  loading: false,
  error: false,
  errorMessage: false,
  user: {
    email: '',
    password: ''
    // rememberMe: false,
    // otpToken: '',
    // captcha: ''
  },
  emailVerified: false,
  initialEmail: false
});

function loginReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case LOGIN_USER:
      return state.set('loading', true).set('error', false).setIn(['user', 'email'], action.data.email).setIn(['user', 'password'], action.data.password).setIn(['user', 'rememberMe'], action.data.rememberMe).setIn(['user', 'otpToken'], action.data.otpToken).setIn(['user', 'captcha'], action.data.captcha);
    case LOGIN_USER_SUCCESS:
      return state.set('loading', false).set('error', false).set('errorMessage', false);

    case LOGIN_USER_ERROR:
      if (action.error) {
        return state.set('error', true).set('errorMessage', action.error).set('loading', false);
      }
      return state.set('error', true).set('loading', false);

    case LOGIN_USER_ERROR_MESSAGE_REMOVE:
      return state.set('errorMessage', false).set('error', false);
    case constants_EMAIL_VERIFIED:
      return state.set('emailVerified', true).set('initialEmail', action.data);
    default:
      return state;
  }
}

/* harmony default export */ var reducer = (loginReducer);
// EXTERNAL MODULE: ./node_modules/redux-saga/es/effects.js
var effects = __webpack_require__("./node_modules/redux-saga/es/effects.js");

// CONCATENATED MODULE: ./app/containers/LoginPage/actions.js



function actions_loginUser(data) {
  return {
    type: LOGIN_USER,
    data: data
  };
}

function userLoaded(userData) {
  return {
    type: LOGIN_USER_SUCCESS,
    userData: userData
  };
}

function saveToken(token) {
  localStorage.setItem('token', token);
  return {
    type: 'SAVED_TOKEN'
  };
}

function userLoadingError(error) {
  return {
    type: LOGIN_USER_ERROR,
    error: error
  };
}
function removeErrorMessage() {
  return {
    type: LOGIN_USER_ERROR_MESSAGE_REMOVE
  };
}
function emailVerified(data) {
  return {
    type: EMAIL_VERIFIED,
    data: data

  };
}

function emailStateClear() {
  return {
    type: EMAIL_STATE_CLEAR

  };
}
// EXTERNAL MODULE: ./app/containers/App/actions.js
var actions = __webpack_require__("./app/containers/App/actions.js");

// EXTERNAL MODULE: ./app/utils/api.js
var api = __webpack_require__("./app/utils/api.js");

// EXTERNAL MODULE: ./app/containers/DashBoardWelcomePage/actions.js
var DashBoardWelcomePage_actions = __webpack_require__("./app/containers/DashBoardWelcomePage/actions.js");

// CONCATENATED MODULE: ./app/containers/LoginPage/saga.js
var _marked = /*#__PURE__*/regeneratorRuntime.mark(getUser),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(LoginData);










function getUser() {
  var userData, apiData;
  return regeneratorRuntime.wrap(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("listening to api hit");
          _context.prev = 1;

          console.log("listening to api hit");

          _context.next = 5;
          return Object(effects["c" /* select */])(selectors_makeSelectUser());

        case 5:
          userData = _context.sent;

          console.log(userData, " ujuuuuuuuu");
          _context.next = 9;
          return Object(effects["a" /* call */])(api["a" /* default */].user.login, userData);

        case 9:
          apiData = _context.sent;

          if (!apiData.success) {
            _context.next = 32;
            break;
          }

          console.log("i m gere");

          if (!(apiData.reset !== undefined)) {
            _context.next = 20;
            break;
          }

          console.log("i m gere 1");

          if (apiData.reset) {
            _context.next = 18;
            break;
          }

          console.log("i m gere 2");
          _context.next = 18;
          return Object(effects["b" /* put */])(Object(react_router_redux["push"])('/forceReset'));

        case 18:
          _context.next = 30;
          break;

        case 20:
          console.log("i m gere 3");
          localStorage.setItem('token', apiData.authToken);
          _context.next = 24;
          return Object(effects["b" /* put */])(userLoaded());

        case 24:
          _context.next = 26;
          return Object(effects["b" /* put */])(Object(actions["k" /* twoFactorEnabled */])(apiData.is2FA_enabled));

        case 26:
          _context.next = 28;
          return Object(effects["b" /* put */])(Object(react_router_redux["push"])('/dashboard'));

        case 28:
          _context.next = 30;
          return Object(effects["b" /* put */])(Object(actions["g" /* removeErrorGlobal */])());

        case 30:
          _context.next = 39;
          break;

        case 32:
          if (apiData.success) {
            _context.next = 39;
            break;
          }

          _context.next = 35;
          return Object(effects["b" /* put */])(userLoadingError(apiData.message));

        case 35:
          _context.next = 37;
          return Object(effects["b" /* put */])(removeErrorMessage());

        case 37:
          _context.next = 39;
          return Object(effects["b" /* put */])(Object(actions["g" /* removeErrorGlobal */])());

        case 39:
          _context.next = 47;
          break;

        case 41:
          _context.prev = 41;
          _context.t0 = _context['catch'](1);
          _context.next = 45;
          return Object(effects["b" /* put */])(Object(DashBoardWelcomePage_actions["a" /* codeErrorAction */])());

        case 45:
          _context.next = 47;
          return Object(effects["b" /* put */])(removeErrorMessage());

        case 47:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[1, 41]]);
}
function LoginData() {
  return regeneratorRuntime.wrap(function LoginData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(effects["e" /* takeLatest */])(LOGIN_USER, getUser);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
// EXTERNAL MODULE: ./node_modules/react-google-recaptcha/lib/recaptcha-wrapper.js
var recaptcha_wrapper = __webpack_require__("./node_modules/react-google-recaptcha/lib/recaptcha-wrapper.js");
var recaptcha_wrapper_default = /*#__PURE__*/__webpack_require__.n(recaptcha_wrapper);

// EXTERNAL MODULE: ./app/images/CWHLogo.png
var CWHLogo = __webpack_require__("./app/images/CWHLogo.png");
var CWHLogo_default = /*#__PURE__*/__webpack_require__.n(CWHLogo);

// CONCATENATED MODULE: ./app/containers/LoginPage/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage_LoginPage; });
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * LoginPage
 *
 */








// import { Redirect, Link } from 'react-router-dom';














// import {Grid, Image} from 'semantic-ui-react'

var _ref = _jsx(react_router["Redirect"], {
  to: '/dashboard'
});

var _ref2 = _jsx('header', {
  className: 'header'
}, void 0, _jsx('div', {
  className: 'container'
}, void 0, _jsx('div', {
  className: 'row'
}, void 0, _jsx('div', {
  className: 'col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix'
}, void 0, _jsx('div', {
  className: 'logo'
}, void 0, _jsx(react_router_dom["Link"], {
  to: '/'
}, void 0, ' ', _jsx('img', {
  src: CWHLogo_default.a,
  alt: 'centralex'
})))), _jsx('div', {
  className: 'col-xs-7 col-sm-6 col-md-10'
}, void 0, _jsx('div', {
  className: 'header-right'
}, void 0, _jsx('div', {
  className: 'header-btn-group '
}, void 0, _jsx('div', {
  className: 'header-btn'
}, void 0, _jsx(react_router_dom["Link"], {
  to: '/signup'
}, void 0, 'Sign Up'))))))));

var _ref3 = _jsx('div', {
  className: 'card-header'
}, void 0, _jsx('h1', {}, void 0, 'Sign In'));

var _ref4 = _jsx('div', {
  className: 'form-group newInput'
}, void 0, _jsx('label', {
  htmlFor: 'emailAddress',
  className: 'form-label'
}, void 0, 'Email Address'), _jsx('input', {
  id: 'emailAddress',
  type: 'email',
  name: 'email',
  className: 'form-input form-control ',
  placeholder: 'Your Email',
  required: true,
  autoComplete: 'email'
}));

var _ref5 = _jsx('label', {
  htmlFor: 'password',
  className: 'form-label'
}, void 0, 'Password');

var _ref6 = _jsx('input', {
  id: 'password',
  type: 'password',
  className: 'form-input form-control',
  name: 'password',
  placeholder: 'Your Password',
  autoComplete: 'off',
  required: true
});

var _ref7 = _jsx('div', {
  className: 'form-group'
}, void 0, _jsx('label', {
  htmlFor: 'token',
  className: 'form-label'
}, void 0, 'Two-Factor Code (if enabled)'), _jsx('input', {
  id: 'token',
  type: 'number',
  name: 'token',
  className: 'form-input form-control',
  placeholder: 'Google Authenticator',
  autoComplete: 'off'
}));

var _ref8 = _jsx('div', {
  className: 'text-center'
}, void 0, _jsx('button', {
  type: 'submit',
  className: 'form-button'
}, void 0, 'Sign In'));

var _ref9 = _jsx('div', {
  className: 'forgot'
}, void 0, _jsx(react_router_dom["Link"], {
  to: '/forgotPassword'
}, void 0, 'Forgot Password?'));

var _ref10 = _jsx('div', {
  className: 'forgot'
}, void 0, _jsx(react_router_dom["Link"], {
  to: '/resendConfirmation'
}, void 0, 'Didn\'t receive confirmation instructions?'));

var LoginPage_LoginPage = function (_React$PureComponent) {
  _inherits(LoginPage, _React$PureComponent);

  // eslint-disable-line react/prefer-stateless-function
  function LoginPage(props) {
    _classCallCheck(this, LoginPage);

    var _this = _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this, props));

    _this.showPassWord = function (e) {
      console.log(e, " inside show password");
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
      if (_this.state.password_class === 'fa fa-fw fa-eye') {
        _this.setState({
          password_class: 'fa fa-fw fa-eye-slash'
        });
      } else if (_this.state.password_class === 'fa fa-fw fa-eye-slash') {
        _this.setState({
          password_class: 'fa fa-fw fa-eye'
        });
      }
    };

    _this.state = {
      'g-recaptcha-response': '',
      captcha: false,
      password_class: 'fa fa-fw fa-eye-slash'
    };
    _this.formSubmit = _this.formSubmit.bind(_this);
    _this.notify = _this.notify.bind(_this);
    _this.formValidation = _this.formValidation.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(LoginPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // console.log("inside component login")
      // console.log(this.props.global);
      this.props.removeInnerReset();

      // if (this.props.global.passwordReset) {
      //   this.notifySuccess('Your password has been changed successfully');
      // }
      // console.log(this.props.global.passwordResetSuccess)

      // console.log(this.props.global);

      if (this.props.global.passwordResetSuccess) {
        this.notifySuccess('Your password has been changed successfully');
      }

      if (this.props.global.resetOuterError) {
        this.notify('Invalid URL ,Try again with valid url');
        this.props.removeOuterError();
      }

      if (this.props.error) {
        this.notify(this.props.errorMessage);
      }
      if (this.props.global.initialEmail.length > 0) {
        this.notifySuccess('Your account has been verified.');
        var email = document.getElementById('emailAddress');
        email.value = this.props.global.initialEmail;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log("inside component")
      // console.log('im in will receive props', nextProps)
      if (nextProps.error) {
        this.notify(nextProps.errorMessage);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps) {
        return true;
      }false;
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      // console.log(e);
      this.setState({
        'g-recaptcha-response': e
      });
      if (e.length > 0) {
        this.setState({
          captcha: true
        });
      }
    }
  }, {
    key: 'notify',
    value: function notify(error) {
      lib["toast"].error(_jsx('h5', {}, void 0, error));
    }
  }, {
    key: 'notifySuccess',
    value: function notifySuccess(message) {
      lib["toast"].success(message);
    }
  }, {
    key: 'formValidation',
    value: function formValidation(user) {
      var email = user.email,
          password = user.password;

      if (email.length <= 0) {
        this.notify('Enter your Email');
        return false;
      } else if (password.length === 0) {
        this.notify('Enter your password');
        return false;
      } else if (password.length) {
        if (password.length > 0 && email.length > 0) {
          this.setState({
            captcha: false
          });
          window.grecaptcha.reset();
          return true;
        }
      } else {
        return false;
      }
      return false;
    }
  }, {
    key: 'formSubmit',
    value: function formSubmit(event) {
      event.preventDefault();
      // console.log(event.target[0].value);
      // console.log(event.target[1].value);
      var remember = document.getElementById('remember');
      var rememberMe = void 0;
      // console.log(remember.checked);
      if (remember.checked) {
        rememberMe = true;
      } else {
        rememberMe = false;
      }
      var user = {
        email: event.target[0].value,
        password: event.target[1].value,
        otpToken: event.target[2].value,
        rememberMe: rememberMe,
        captcha: this.state['g-recaptcha-response']
      };

      if (this.formValidation(user)) {
        // console.log(user);

        this.props.loginUser(user);
        //this.props.login();
      } else {
        this.notify('Something went wrong');
      }
      // console.log("data from the container ========", user)
      // console.log(this.props.error);
      // console.log(this.props.errorMessage);
    }
  }, {
    key: 'render',
    value: function render() {
      if (localStorage.token) {
        return _ref;
      }

      return _jsx('div', {
        className: 'signin'
      }, void 0, _jsx(lib["ToastContainer"], {
        position: 'top-center',
        progressClassName: Object(glamor_lib["css"])({ height: '100px' }),
        type: 'error',
        autoClose: 2800,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        pauseOnHover: false
      }), _jsx('div', {
        className: 'wrapper'
      }, void 0, _ref2, _jsx('section', {
        className: 'signin-block login'
      }, void 0, _jsx('div', {
        className: 'container'
      }, void 0, _jsx('div', {
        className: 'row'
      }, void 0, _jsx('div', {
        className: 'col-sm-6 col-sm-offset-3 '
      }, void 0, _ref3, _jsx('div', {
        className: 'signin-card-body'
      }, void 0, _jsx('form', {
        className: true,
        onSubmit: this.formSubmit
      }, void 0, _ref4, _jsx('div', {
        className: 'form-group'
      }, void 0, _ref5, _ref6, _jsx('i', {
        onClick: this.showPassWord,
        className: this.state.password_class + ' field-icon'
      })), _ref7, _jsx('div', {
        className: 'signInCaptcha form-group text-center'
      }, void 0, react_default.a.createElement(recaptcha_wrapper_default.a, { type: 'image', ref: 'recaptcha', className: 'form-captcha', required: true, sitekey: '6LdZP14UAAAAAB0O_-727DW-KoaFizUiwBhr4wmk', onChange: this.onChange })), _jsx('div', {
        className: 'form-group text-center'
      }, void 0, _jsx('label', {
        className: 'form-check-label',
        htmlFor: 'user_accepted_policies'
      }, void 0, _jsx('input', {
        id: 'remember',
        className: 'boolean required form-check-input',
        label: 'false',
        'data-title': 'Remember me!',
        'data-placement': 'left',
        'data-trigger': 'manual',
        'data-offset': '0, 55',
        'aria-required': 'true',
        type: 'checkbox',
        name: 'remember',
        style: { marginRight: '10px' }
      }), 'Remember me')), _ref8, _ref9, _ref10))))))));
    }
  }]);

  return LoginPage;
}(react_default.a.PureComponent);

var mapStateToProps = Object(reselect_es["b" /* createStructuredSelector */])({
  user: selectors_makeSelectUser(),
  errorMessage: selectors_makeDetectErrorMessage(),
  global: Object(selectors["a" /* makeGlobalParent */])(),
  error: selectors_makeDetectError()

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    push: function push(route) {
      return dispatch(Object(react_router_redux["push"])(route));
    },
    login: function login(user) {
      return dispatch(Object(actions["l" /* userLoggedIn */])(user));
    },
    loginUser: function loginUser(data) {
      return dispatch(actions_loginUser(data));
    },
    removeError: function removeError() {
      return dispatch(removeErrorMessage());
    },
    removeErrorGlobal: function removeErrorGlobal() {
      return dispatch(Object(actions["g" /* removeErrorGlobal */])());
    },
    disabled2fa: function disabled2fa() {
      return dispatch(Object(actions["j" /* twoFactorDisabled */])());
    },
    stateClear: function stateClear() {
      return dispatch(emailStateClear());
    },
    removeOuterError: function removeOuterError() {
      return dispatch(Object(actions["h" /* removeOuterError */])());
    },
    removeInnerReset: function removeInnerReset() {
      return dispatch(Object(actions["f" /* passwordResetInnerRemove */])());
    }
  };
}

var withConnect = Object(es["b" /* connect */])(mapStateToProps, mapDispatchToProps);

var withReducer = Object(injectReducer["a" /* default */])({ key: 'loginPage', reducer: reducer });
var withSaga = Object(injectSaga["a" /* default */])({ key: 'loginPage', saga: LoginData });

/* harmony default export */ var containers_LoginPage = __webpack_exports__["default"] = (Object(redux_es["compose"])(withReducer, withSaga, withConnect)(LoginPage_LoginPage));

/***/ })

});