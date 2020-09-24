webpackJsonp([21],{

/***/ "./app/components/KycAlert/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("./node_modules/react-router-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*
* KycAlert
*
*/


// import styled from 'styled-components';


var _ref = _jsx('span', {}, void 0, _jsx(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
    to: '/dashboard/kyc'
}, void 0, 'Click here'), ' to complete your KYC.');

var _ref2 = _jsx('span', {}, void 0, 'Your KYC details are submitted. Our team will soon verify your details.');

var _ref3 = _jsx('span', {}, void 0, 'Your KYC details have some issues. Please check mail regarding issues and ', _jsx(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
    to: '/dashboard/kyc'
}, void 0, 'submit'), ' the details again.');

var _ref4 = _jsx('span', {}, void 0, 'Your KYC request is Rejected. Please check your mail regarding issues and ', _jsx(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
    to: '/dashboard/kyc'
}, void 0, 'submit'), ' the details again.');

var _ref5 = _jsx('br', {});

var _ref6 = _jsx('span', {});

var _ref7 = _jsx('span', {}, void 0, 'Verified Account. Now you can start investing by clicking on Invest Now button.');

var _ref8 = _jsx('div', {});

var _ref9 = _jsx('div', {});

var KycAlert = function (_React$PureComponent) {
    _inherits(KycAlert, _React$PureComponent);

    function KycAlert() {
        _classCallCheck(this, KycAlert);

        return _possibleConstructorReturn(this, (KycAlert.__proto__ || Object.getPrototypeOf(KycAlert)).apply(this, arguments));
    }

    _createClass(KycAlert, [{
        key: 'render',
        value: function render() {

            if (this.props.showAlert) {
                if (this.props.kycStatus === 'PENDING') {
                    return _jsx('div', {
                        className: 'alert alert-danger'
                    }, void 0, _ref, _jsx('span', {
                        className: 'cross'
                    }, void 0, _jsx('i', {
                        className: 'fa fa-close',
                        onClick: this.props.closeAlert
                    })));
                } else if (this.props.kycStatus === 'DOCUMENTS') {
                    return _jsx('div', {
                        className: 'alert alert-danger'
                    }, void 0, _jsx('span', {}, void 0, ' ', _jsx(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
                        to: '/dashboard/uploadDocs'
                    }, void 0, this.props.msg)), _jsx('span', {
                        className: 'cross'
                    }, void 0, _jsx('i', {
                        className: 'fa fa-close',
                        onClick: this.props.closeAlert
                    })));
                } else if (this.props.kycStatus === 'SUBMITTED') {
                    return _jsx('div', {
                        className: 'alert alert-success'
                    }, void 0, _ref2, _jsx('span', {
                        className: 'cross'
                    }, void 0, _jsx('i', {
                        className: 'fa fa-close',
                        onClick: this.props.closeAlert
                    })));
                } else if (this.props.kycStatus === 'REPORTED') {
                    return _jsx('div', {
                        className: 'alert alert-danger'
                    }, void 0, _ref3, _jsx('span', {
                        className: 'cross'
                    }, void 0, _jsx('i', {
                        className: 'fa fa-close',
                        onClick: this.props.closeAlert
                    })));
                } else if (this.props.kycStatus === 'REJECTED') {
                    return _jsx('div', {
                        className: 'alert alert-danger'
                    }, void 0, _ref4, _ref5, !!this.props.rejectMsg ? _jsx('span', {}, void 0, ' Reason for rejection: ', this.props.rejectMsg) : _ref6, _jsx('span', {
                        className: 'cross'
                    }, void 0, _jsx('i', {
                        className: 'fa fa-close',
                        onClick: this.props.closeAlert
                    })));
                } else if (this.props.kycStatus === 'ACCEPTED') {
                    return _jsx('div', {
                        className: 'alert alert-success'
                    }, void 0, _ref7);
                } else {
                    return _ref8;
                }
            } else {
                return _ref9;
            }
        }
    }]);

    return KycAlert;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (KycAlert);

/***/ })

});