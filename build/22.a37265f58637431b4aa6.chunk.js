webpackJsonp([22],{

/***/ "./app/components/HowToBuy/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__ = __webpack_require__("./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__("./node_modules/react-helmet/lib/Helmet.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// import styled from 'styled-components';


var _ref = _jsx(__WEBPACK_IMPORTED_MODULE_2_react_helmet__["Helmet"], {}, void 0, _jsx('title', {}, void 0, 'WhitePaper'), _jsx('meta', {
  name: 'description',
  content: 'Description of My WhitePaper'
}));

var _ref2 = _jsx('div', {
  className: 'panel-heading'
}, void 0, 'WhitePaper');

var HowToBuy = function (_React$PureComponent) {
  _inherits(HowToBuy, _React$PureComponent);

  // eslint-disable-line react/prefer-stateless-function
  function HowToBuy(props) {
    _classCallCheck(this, HowToBuy);

    var _this = _possibleConstructorReturn(this, (HowToBuy.__proto__ || Object.getPrototypeOf(HowToBuy)).call(this, props));

    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(HowToBuy, [{
    key: 'render',
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
      }, void 0)))));
    }
  }]);

  return HowToBuy;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (HowToBuy);

/***/ })

});