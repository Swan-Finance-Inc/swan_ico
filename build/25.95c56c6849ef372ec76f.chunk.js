webpackJsonp([25],{

/***/ "./app/components/Announcements/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__ = __webpack_require__("./node_modules/react-bootstrap/es/index.js");
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*
* News
*
*/



// import styled from 'styled-components';


var _ref = _jsx('div', {
  className: 'col-sm-12 text-center'
}, void 0, _jsx('h2', {}, void 0, 'ANNOUNCEMENTS'), _jsx('hr', {}));

var Announcements = function (_React$PureComponent) {
  _inherits(Announcements, _React$PureComponent);

  // eslint-disable-line react/prefer-stateless-function
  function Announcements(props) {
    _classCallCheck(this, Announcements);

    var _this = _possibleConstructorReturn(this, (Announcements.__proto__ || Object.getPrototypeOf(Announcements)).call(this, props));

    _this.state = {
      open: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false
    };
    return _this;
  }

  _createClass(Announcements, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log(this.props, " props in dashboard/news");
      console.log(this.state, " state in dashboard/news");
      return _jsx('div', {
        id: 'content',
        className: 'ui-content ui-content-aside-overlay'
      }, void 0, _jsx('div', {
        className: 'ui-content-body'
      }, void 0, _jsx('div', {
        className: 'ui-container container-fluid'
      }, void 0, _jsx('div', {
        className: 'row'
      }, void 0, _ref, _jsx('div', {
        className: 'col-sm-12'
      }, void 0, this.props.announcementsData.map(function (item, i) {
        return _jsx('div', {
          className: 'row'
        }, void 0, _jsx('div', {
          className: 'col-sm-12'
        }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["a" /* Button */], {
          onClick: function onClick() {
            return _this2.setState(_defineProperty({}, item._id, !_this2.state[item._id]));
          },
          className: 'form-control',
          style: { marginBottom: '20px' }
        }, void 0, item.title), _jsx(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["b" /* Collapse */], {
          'in': _this2.state[item._id]
        }, void 0, _jsx('div', {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["i" /* Well */], {}, void 0, item.subject)))));
      }))))));
    }
  }]);

  return Announcements;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (Announcements);

/***/ })

});