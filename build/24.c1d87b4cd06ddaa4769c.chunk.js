webpackJsonp([24],{

/***/ "./app/components/Balance/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("./node_modules/react-router-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Info__ = __webpack_require__("./app/components/Info/index.js");
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*
* Balance
*
*/


// import styled from 'styled-components';



var _ref = _jsx('div', {
  className: 'row'
}, void 0, _jsx('div', {
  className: 'col-sm-12'
}, void 0, _jsx('p', {}, void 0, 'Transaction may take up to 24 hours to approve due to our comprehensive verification methods to protect our customers.')));

var _ref2 = _jsx('h3', {}, void 0, 'Total Balance');

var _ref3 = _jsx('u', {}, void 0, 'View Transactions');

var _ref4 = _jsx('div', {}, void 0, '\xA0 \xA0 \xA0');

var _ref5 = _jsx('h3', {}, void 0, 'Referral Tokens Earned');

var _ref6 = _jsx('u', {}, void 0, 'View Referral Transactions');

var _ref7 = _jsx('div', {}, void 0, '\xA0 \xA0 \xA0');

var _ref8 = _jsx('h3', {}, void 0, '# of Confirmed Referrals');

var _ref9 = _jsx('div', {}, void 0, '\xA0 \xA0 \xA0');

var _ref10 = _jsx('h3', {}, void 0, '# of Pending Referrals');

var _ref11 = _jsx('div', {}, void 0, '\xA0 \xA0 \xA0');

var _ref12 = _jsx('div', {
  className: 'row'
}, void 0, _jsx('div', {
  className: 'col-sm-12'
}, void 0, _jsx('p', {}, void 0, 'To participate in bounty ', _jsx('a', {
  href: 'https://www.google.com',
  target: '_blank',
  className: 'link'
}, void 0, 'click here'), '.')));

var _ref13 = _jsx('h3', {}, void 0, 'Creative Stakes');

var _ref14 = _jsx('h3', {}, void 0, 'Youtube Stakes');

var _ref15 = _jsx('h3', {}, void 0, 'Twitter Stakes');

var _ref16 = _jsx('h3', {}, void 0, 'Facebook Stakes');

var _ref17 = _jsx('h3', {}, void 0, 'Translation Stakes');

var _ref18 = _jsx('h3', {}, void 0, 'Reddit Stakes');

var _ref19 = _jsx('h3', {}, void 0, 'Telegram Stakes');

var _ref20 = _jsx('h3', {}, void 0, 'Signature Stakes');

var _ref21 = _jsx('h3', {}, void 0, 'LinkedIn Stakes');

var Balance = function (_React$PureComponent) {
  _inherits(Balance, _React$PureComponent);

  function Balance(props) {
    _classCallCheck(this, Balance);

    var _this = _possibleConstructorReturn(this, (Balance.__proto__ || Object.getPrototypeOf(Balance)).call(this, props));

    _this.toggleTranActive = function (e) {
      _this.props.compact();
      _this.props.toggleTranActive();
      // console.log('toggling', e);
    };

    _this.togglemyReferal = function (e) {
      _this.props.compact();
      _this.props.togglemyReferal();
    };

    _this.toggleContriActive = function (e) {
      // if(this.props.kycStatus == 'ACCEPTED'){
      _this.props.compact();
      _this.props.toggleContActive();
      // }else{
      // toast.error('Please complete your kyc to contribute.')
      // }
    };

    _this.handleInfoModal = function () {
      _this.setState({
        infoShow: !_this.state.infoShow
      });
      console.log('infoShow : ', _this.state.infoShow);
    };

    _this.resetInfo = function () {
      _this.props.toggleInfo();
    };

    _this.state = {
      infoShow: false
    };
    return _this;
  }

  _createClass(Balance, [{
    key: 'render',
    value: function render() {
      return _jsx('div', {}, void 0, _jsx('div', {
        className: 'panel panel-default'
      }, void 0, _jsx('div', {
        className: 'panel-heading blueBG'
      }, void 0, !!this.props.flag ? _jsx(__WEBPACK_IMPORTED_MODULE_2__Info__["a" /* default */], {
        hanldeToggle: this.resetInfo,
        toggleFlag: this.state.infoShow
      }) : null, 'Your Balance'), _jsx('div', {
        className: 'panel-body'
      }, void 0, _ref, _jsx('div', {
        className: 'row'
      }, void 0, _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref2, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.total, ' ~ ', this.props.userInfo.totalBalanceUsd, ' USD'), !!this.props.userInfo.tokens.total ? _jsx('div', {
        className: 'link referalPageLink'
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
        to: '/dashboard/transactionHistory',
        role: 'button',
        onClick: this.toggleTranActive
      }, void 0, _ref3)) : _ref4)), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref5, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.referral), !!this.props.userInfo.tokens.referral ? _jsx('div', {
        className: 'referalPageLink link'
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
        to: '/dashboard/myReferal',
        role: 'button',
        onClick: this.togglemyReferal
      }, void 0, _ref6, ' ')) : _ref7)), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref8, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.referral.success), _ref9)), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref10, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.referral.pending), _ref11))), _jsx('div', {
        className: 'row'
      }, void 0, this.props.userInfo.kycStatus !== "ACCEPTED" ? null : _jsx('div', {
        className: 'text-center'
      }, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
        to: '/dashboard/contribution',
        role: 'button',
        onClick: this.toggleContriActive
      }, void 0, _jsx('button', {
        className: 'btn btn-primary',
        style: { borderRadius: '25px', padding: '10px 60px', marginTop: '10px' }
      }, void 0, 'Invest Now')))))), _jsx('div', {
        className: 'panel panel-default'
      }, void 0, _jsx('div', {
        className: 'panel-heading blueBG'
      }, void 0, !!this.props.flag ? _jsx(__WEBPACK_IMPORTED_MODULE_2__Info__["a" /* default */], {
        hanldeToggle: this.resetInfo,
        toggleFlag: this.state.infoShow
      }) : null, 'Bounty Stakes'), _jsx('div', {
        className: 'panel-body'
      }, void 0, _ref12, _jsx('div', {
        className: 'row'
      }, void 0, _jsx('div', {
        className: 'col-sm-12'
      }, void 0, _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref13, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.creative))), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref14, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.youtube))), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref15, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.twitter))), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref16, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.facebook))), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref17, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.translation))), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref18, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.reddit))), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref19, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.telegram))), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref20, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.signature))), _jsx('div', {
        className: 'col-sm-6 col-md-3'
      }, void 0, _jsx('div', {
        className: 'bal-card'
      }, void 0, _ref21, _jsx('div', {
        className: 'balance'
      }, void 0, this.props.userInfo.tokens.bounty.linkedIn))))))));
    }
  }]);

  return Balance;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (Balance);

/***/ })

});