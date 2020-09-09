"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Buttons = require("./Buttons");

var _placeholder = _interopRequireDefault(require("../assets/img/placeholder.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FeatureSlider = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./FeatureSlider'));
  });
});

var FeatureDetail = /*#__PURE__*/function (_React$Component) {
  _inherits(FeatureDetail, _React$Component);

  var _super = _createSuper(FeatureDetail);

  function FeatureDetail() {
    var _this;

    _classCallCheck(this, FeatureDetail);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "buttonRef", /*#__PURE__*/_react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "getMediaData", function (ftr) {
      var mediaData = [];

      if (ftr.geometry.type === "Point") {
        if (ftr.properties.media) {
          mediaData = ftr.properties.media.map(function (mediaItem) {
            return {
              type: mediaItem.type,
              mediaSrc: mediaItem.thumbnails ? mediaItem.thumbnails.large.url : mediaItem.url,
              mediaAltText: "Photo of artwork."
            };
          });
        } else {
          mediaData = [{
            type: 'image/',
            mediaSrc: _placeholder.default,
            mediaAltText: "Image not available."
          }];
        }
      }

      return mediaData;
    });

    return _this;
  }

  _createClass(FeatureDetail, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.feature && this.props.feature) {
        this.buttonRef.current.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          feature = _this$props.feature,
          onClose = _this$props.onClose;
      return /*#__PURE__*/_react.default.createElement("div", {
        id: "detail",
        className: feature ? 'open' : 'closed',
        "aria-hidden": feature ? 'false' : 'true'
      }, /*#__PURE__*/_react.default.createElement(_Buttons.BackToListViewButton, {
        onClick: onClose,
        ref: this.buttonRef
      }), feature && /*#__PURE__*/_react.default.createElement("div", {
        className: "detail-view"
      }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react.default.createElement("div", {
          className: "loading"
        })
      }, /*#__PURE__*/_react.default.createElement(FeatureSlider, {
        slides: this.getMediaData(feature)
      })), /*#__PURE__*/_react.default.createElement("div", {
        id: "detail-text",
        className: "p-5"
      }, /*#__PURE__*/_react.default.createElement("h3", {
        className: "detail-artist"
      }, feature.properties['artist']), /*#__PURE__*/_react.default.createElement("p", {
        className: "detail-address"
      }, feature.properties['address']), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("p", {
        className: "detail-description"
      }, feature.properties['description']), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
        className: "more-info"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "grid"
      }, feature.properties['partner'] && /*#__PURE__*/_react.default.createElement("div", {
        className: "row pt-1 pb-1"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "pr-1"
      }, "Partner organization"), /*#__PURE__*/_react.default.createElement("div", null, feature.properties['partner'])), /*#__PURE__*/_react.default.createElement("div", {
        className: "row pt-1 pb-1"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "pr-1"
      }, "Ward"), /*#__PURE__*/_react.default.createElement("div", null, feature.properties['ward'])), /*#__PURE__*/_react.default.createElement("div", {
        className: "row pt-1 pb-1"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "pr-1"
      }, "Program"), /*#__PURE__*/_react.default.createElement("div", null, feature.properties['prgrm'])), /*#__PURE__*/_react.default.createElement("div", {
        className: "row pt-1 pb-1"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "pr-1"
      }, "Year"), /*#__PURE__*/_react.default.createElement("div", null, feature.properties['yr'])))))));
    }
  }]);

  return FeatureDetail;
}(_react.default.Component);

FeatureDetail.propTypes = {
  /** Feature data object from map data. */
  feature: _propTypes.default.object
};
FeatureDetail.defaultProps = {
  feature: null
};
var _default = FeatureDetail;
exports.default = _default;