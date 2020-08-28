webpackJsonp([7],{

/***/ "./app/containers/ResetPasswordOuter/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__("./node_modules/react/react.js");
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

// EXTERNAL MODULE: ./app/containers/App/actions.js
var actions = __webpack_require__("./app/containers/App/actions.js");

// EXTERNAL MODULE: ./node_modules/react-toastify/lib/index.js
var lib = __webpack_require__("./node_modules/react-toastify/lib/index.js");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__("./node_modules/query-string/index.js");
var query_string_default = /*#__PURE__*/__webpack_require__.n(query_string);

// EXTERNAL MODULE: ./node_modules/react-router/index.js
var react_router = __webpack_require__("./node_modules/react-router/index.js");
var react_router_default = /*#__PURE__*/__webpack_require__.n(react_router);

// EXTERNAL MODULE: ./app/utils/injectSaga.js + 2 modules
var injectSaga = __webpack_require__("./app/utils/injectSaga.js");

// EXTERNAL MODULE: ./app/utils/injectReducer.js + 1 modules
var injectReducer = __webpack_require__("./app/utils/injectReducer.js");

// CONCATENATED MODULE: ./app/containers/ResetPasswordOuter/selectors.js


/**
 * Direct selector to the resetPasswordOuter state domain
 */
var selectResetPasswordOuterDomain = function selectResetPasswordOuterDomain(state) {
  return state.get('resetPasswordOuter');
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by ResetPasswordOuter
 */

var selectors_makeSelectResetPasswordOuter = function makeSelectResetPasswordOuter() {
  return Object(reselect_es["a" /* createSelector */])(selectResetPasswordOuterDomain, function (substate) {
    return substate.toJS();
  });
};
var selectors_makeSelectResetToken = function makeSelectResetToken() {
  return Object(reselect_es["a" /* createSelector */])(selectResetPasswordOuterDomain, function (substate) {
    return substate.get('resetToken');
  });
};

var selectors_makeSelectForceResetToken = function makeSelectForceResetToken() {
  return Object(reselect_es["a" /* createSelector */])(selectResetPasswordOuterDomain, function (substate) {
    return substate.get('forceReset');
  });
};
var selectors_makeSelectNewPassword = function makeSelectNewPassword() {
  return Object(reselect_es["a" /* createSelector */])(selectResetPasswordOuterDomain, function (substate) {
    return substate.get('newPassword');
  });
};
var selectors_makeSelectResetSuccess = function makeSelectResetSuccess() {
  return Object(reselect_es["a" /* createSelector */])(selectResetPasswordOuterDomain, function (substate) {
    return substate.get('success');
  });
};
var selectors_makeSelectResetError = function makeSelectResetError() {
  return Object(reselect_es["a" /* createSelector */])(selectResetPasswordOuterDomain, function (substate) {
    return substate.get('error');
  });
};
var selectors_makeSelectResetErrorMessage = function makeSelectResetErrorMessage() {
  return Object(reselect_es["a" /* createSelector */])(selectResetPasswordOuterDomain, function (substate) {
    return substate.get('errorMessage');
  });
};
var selectors_makeSelectResetSuccessMessage = function makeSelectResetSuccessMessage() {
  return Object(reselect_es["a" /* createSelector */])(selectResetPasswordOuterDomain, function (substate) {
    return substate.get('successMessage');
  });
};
/* harmony default export */ var selectors = (selectors_makeSelectResetPasswordOuter);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__("./node_modules/immutable/dist/immutable.js");
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// CONCATENATED MODULE: ./app/containers/ResetPasswordOuter/constants.js
/*
 *
 * ResetPasswordOuter constants
 *
 */

var DEFAULT_ACTION = 'app/ResetPasswordOuter/DEFAULT_ACTION';
var RESET_PASSWORD = 'app/ResetPasswordOuter/RESET_PASSWORD';
var RESET_SUCCESS = 'app/ResetPasswordOuter/RESET_SUCCESS';
var RESET_ERROR = 'app/ResetPasswordOuter/RESET_ERROR';
var RESET_REMOVE = 'app/ResetPasswordOuter/RESET_REMOVE';
// CONCATENATED MODULE: ./app/containers/ResetPasswordOuter/reducer.js
/*
 *
 * ResetPasswordOuter reducer
 *
 */




var initialState = Object(immutable["fromJS"])({
  forceReset: 0,
  resetToken: false,
  newPassword: false,
  success: false,
  error: false,
  errorMessage: false,
  successMessage: false
});

function resetPasswordOuterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESET_PASSWORD:
      return state.set('forceReset', action.data.reset).set('resetToken', action.data.token).set('newPassword', action.data.newPassword);
    case RESET_SUCCESS:
      return state.set('success', action.data.success).set('error', false).set('successMessage', action.data.message);
    case RESET_ERROR:
      return state.set('error', true).set('success', false).set('errorMessage', action.data.message);
    case RESET_REMOVE:
      return state.set('error', false).set('success', false).set('errorMessage', false);

    default:
      return state;
  }
}

/* harmony default export */ var reducer = (resetPasswordOuterReducer);
// EXTERNAL MODULE: ./node_modules/redux-saga/es/effects.js
var effects = __webpack_require__("./node_modules/redux-saga/es/effects.js");

// EXTERNAL MODULE: ./node_modules/react-router-redux/index.js
var react_router_redux = __webpack_require__("./node_modules/react-router-redux/index.js");
var react_router_redux_default = /*#__PURE__*/__webpack_require__.n(react_router_redux);

// EXTERNAL MODULE: ./app/utils/api.js
var api = __webpack_require__("./app/utils/api.js");

// CONCATENATED MODULE: ./app/containers/ResetPasswordOuter/actions.js
/*
 *
 * ResetPasswordOuter actions
 *
 */



function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
function resetPassword(data) {
  return {
    type: RESET_PASSWORD,
    data: data
  };
}
function resetSuccess(data) {
  return {
    type: RESET_SUCCESS,
    data: data
  };
}
function resetError(data) {
  return {
    type: RESET_ERROR,
    data: data
  };
}
function removeReset() {
  return {
    type: RESET_REMOVE
  };
}
// EXTERNAL MODULE: ./app/containers/DashBoardWelcomePage/actions.js
var DashBoardWelcomePage_actions = __webpack_require__("./app/containers/DashBoardWelcomePage/actions.js");

// CONCATENATED MODULE: ./app/containers/ResetPasswordOuter/saga.js
var _marked = /*#__PURE__*/regeneratorRuntime.mark(saga_reset),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(defaultSaga);









// Individual exports for testing

function saga_reset() {
  var userToken, userData, forceReset, body, apiData;
  return regeneratorRuntime.wrap(function reset$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(effects["c" /* select */])(selectors_makeSelectResetToken());

        case 3:
          userToken = _context.sent;
          _context.next = 6;
          return Object(effects["c" /* select */])(selectors_makeSelectNewPassword());

        case 6:
          userData = _context.sent;
          _context.next = 9;
          return Object(effects["c" /* select */])(selectors_makeSelectForceResetToken());

        case 9:
          forceReset = _context.sent;

          // console.log(userToken)
          body = {
            newPassword: userData,
            reset: forceReset
          };
          // console.log(userData);

          _context.next = 13;
          return Object(effects["a" /* call */])(api["a" /* default */].user.resetWithToken, userToken, body);

        case 13:
          apiData = _context.sent;

          if (!apiData.success) {
            _context.next = 21;
            break;
          }

          _context.next = 17;
          return Object(effects["b" /* put */])(resetSuccess(apiData));

        case 17:
          _context.next = 19;
          return Object(effects["b" /* put */])(Object(react_router_redux["push"])('/signin'));

        case 19:
          _context.next = 26;
          break;

        case 21:
          if (apiData.success) {
            _context.next = 26;
            break;
          }

          _context.next = 24;
          return Object(effects["b" /* put */])(resetError(apiData));

        case 24:
          _context.next = 26;
          return Object(effects["b" /* put */])(removeReset());

        case 26:
          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context['catch'](0);
          _context.next = 32;
          return Object(effects["b" /* put */])(Object(DashBoardWelcomePage_actions["a" /* codeErrorAction */])());

        case 32:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 28]]);
}
function defaultSaga() {
  return regeneratorRuntime.wrap(function defaultSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(effects["e" /* takeLatest */])(RESET_PASSWORD, saga_reset);

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

// CONCATENATED MODULE: ./app/containers/ResetPasswordOuter/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordOuter", function() { return ResetPasswordOuter_ResetPasswordOuter; });
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * ResetPasswordOuter
 *
 */








// import { Redirect } from 'react-router-dom';










var _ref = _jsx(react_router["Redirect"], {
  to: '/dashboard'
});

var _ref2 = _jsx('header', {
  className: 'header signin'
}, void 0, _jsx('div', {
  className: 'container'
}, void 0, _jsx('div', {
  className: 'row'
}, void 0, _jsx('div', {
  className: 'col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix'
}, void 0, _jsx(lib["ToastContainer"], {
  position: 'top-center',
  type: 'error',
  autoClose: 2800,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: false
}), _jsx('div', {
  className: 'logo'
}, void 0, _jsx('img', {
  src: CWHLogo_default.a,
  alt: 'centralex'
}))), _jsx('div', {
  className: 'col-xs-7 col-sm-6 col-md-10'
}))));

var _ref3 = _jsx('div', {
  className: 'card-header'
}, void 0, _jsx('h1', {}, void 0, 'Reset Password'), _jsx('p', {
  className: 'subtitle'
}, void 0, 'Please enter your new password.'));

var _ref4 = _jsx('div', {
  className: 'form-group'
}, void 0, _jsx('label', {
  htmlFor: 'newPassword',
  className: 'form-label'
}, void 0, 'New Password'), _jsx('input', {
  id: 'newPassword',
  type: 'password',
  className: 'form-input form-control',
  name: 'newPassword',
  placeholder: 'Enter New Password',
  required: true
}));

var _ref5 = _jsx('label', {
  htmlFor: 'confPassword',
  className: 'form-label'
}, void 0, 'Confirm Password');

var _ref6 = _jsx('div', {
  className: 'text-center'
}, void 0, _jsx('button', {
  type: 'submit',
  className: 'form-button'
}, void 0, 'Reset Password'));

var ResetPasswordOuter_ResetPasswordOuter = function (_React$PureComponent) {
  _inherits(ResetPasswordOuter, _React$PureComponent);

  // eslint-disable-line react/prefer-stateless-function
  function ResetPasswordOuter(props) {
    _classCallCheck(this, ResetPasswordOuter);

    var _this = _possibleConstructorReturn(this, (ResetPasswordOuter.__proto__ || Object.getPrototypeOf(ResetPasswordOuter)).call(this, props));

    _this.state = {
      resetToken: '',
      errorPassword: '',
      match: ''
    };
    _this.formSubmit = _this.formSubmit.bind(_this);
    _this.passwordMatch = _this.passwordMatch.bind(_this);
    return _this;
  }

  _createClass(ResetPasswordOuter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      var params = query_string_default.a.parse(this.props.location.search);
      console.log(params);
      if (this.props.match.params.token != null) {
        // console.log(this.props.match.params.token);
        this.setState({
          resetToken: this.props.match.params.token,
          forceReset: params.reset
        });
      } else {
        this.setState({
          resetToken: ''
        });
      }
      if (this.props.error) {
        this.notify(this.props.errorMessage);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log(nextProps)
      if (nextProps.error) {
        this.notify(nextProps.errorMessage);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps) {
        return true;
      }
      return false;
    }
  }, {
    key: 'notify',
    value: function notify(error) {
      lib["toast"].error(error);
    }
  }, {
    key: 'notifySuccess',
    value: function notifySuccess(message) {
      lib["toast"].success(message);
    }
  }, {
    key: 'formSubmit',
    value: function formSubmit(e) {
      e.preventDefault();
      var newPassword = e.target[0].value;
      var confPassword = e.target[1].value;

      // console.log(newPassword)
      var data = {
        token: this.props.match.params.token,
        newPassword: e.target[0].value,
        reset: this.state.forceReset
      };

      if (newPassword == confPassword) {
        this.props.reset(data);
        this.props.passwordReset();
      } else {
        this.notify('Password do not match');
      }
    }
  }, {
    key: 'passwordMatch',
    value: function passwordMatch() {
      var pass = document.getElementById('newPassword').value;
      var password = document.getElementById('confPassword').value;
      if (password === '') {
        this.setState({
          match: ''
        });
      }
      if (pass === password) {
        this.setState({
          match: true
        });
      } else {
        this.setState({
          match: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (localStorage.token) {
        return _ref;
      }
      return _jsx('div', {
        className: 'wrapper'
      }, void 0, _ref2, _jsx('section', {
        className: 'signin-block'
      }, void 0, _jsx('div', {
        className: 'container'
      }, void 0, _jsx('div', {
        className: 'row'
      }, void 0, _jsx('div', {
        className: 'col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4'
      }, void 0, _ref3, _jsx('div', {
        className: 'signin-card-body'
      }, void 0, _jsx('form', {
        onSubmit: this.formSubmit
      }, void 0, _ref4, _jsx('div', {
        className: 'form-group'
      }, void 0, _ref5, _jsx('input', {
        id: 'confPassword',
        onChange: this.passwordMatch,
        type: 'password',
        className: 'form-input form-control',
        name: 'confPassword',
        placeholder: 'Confirm New Password',
        required: true
      })), this.state.match == true ? _jsx('p', {
        style: { color: '#00bb27' }
      }, void 0, 'Password matched') : this.state.match === '' ? _jsx('p', {
        style: { color: '#0000fe' }
      }) : _jsx('p', {
        style: { color: '#ff0000' }
      }, void 0, 'Password do not match'), _ref6)))))));
    }
  }]);

  return ResetPasswordOuter;
}(react_default.a.PureComponent);

var mapStateToProps = Object(reselect_es["b" /* createStructuredSelector */])({
  resetpasswordouter: selectors(),
  resetToken: selectors_makeSelectResetToken(),

  success: selectors_makeSelectResetSuccess(),
  error: selectors_makeSelectResetError(),
  successMessage: selectors_makeSelectResetSuccessMessage(),
  errorMessage: selectors_makeSelectResetErrorMessage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    reset: function reset(data) {
      return dispatch(resetPassword(data));
    },
    passwordReset: function passwordReset() {
      return dispatch(Object(actions["d" /* passwordReset */])());
    }

  };
}

var withConnect = Object(es["b" /* connect */])(mapStateToProps, mapDispatchToProps);

var withReducer = Object(injectReducer["a" /* default */])({ key: 'resetPasswordOuter', reducer: reducer });
var withSaga = Object(injectSaga["a" /* default */])({ key: 'resetPasswordOuter', saga: defaultSaga });

/* harmony default export */ var containers_ResetPasswordOuter = __webpack_exports__["default"] = (Object(redux_es["compose"])(withReducer, withSaga, withConnect)(ResetPasswordOuter_ResetPasswordOuter));

/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__("./node_modules/strict-uri-encode/index.js");
var objectAssign = __webpack_require__("./node_modules/object-assign/index.js");
var decodeComponent = __webpack_require__("./node_modules/decode-uri-component/index.js");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ })

});