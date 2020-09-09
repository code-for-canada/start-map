"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSlick = _interopRequireDefault(require("react-slick"));

var _reactGa = _interopRequireDefault(require("react-ga"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Known supported filetypes:
 *   - image/jpeg
 */
var ImageSlide = function ImageSlide(_ref) {
  var src = _ref.src,
      altText = _ref.altText;
  return /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: altText,
    onError: _utils.handleMissingImage
  });
};

ImageSlide.propTypes = {
  src: _propTypes.default.string.isRequired,
  altText: _propTypes.default.string.isRequired
};
/**
 * Known supported filetypes:
 *   - audio/mp3
 */

var AudioSlide = function AudioSlide(_ref2) {
  var src = _ref2.src,
      type = _ref2.type,
      onPlay = _ref2.onPlay;
  return /*#__PURE__*/_react.default.createElement("audio", {
    controls: true,
    width: "100%",
    onPlay: onPlay
  }, /*#__PURE__*/_react.default.createElement("source", {
    src: src,
    type: type
  }), "Sorry, your browser does not support embedded audio files.");
};
/**
 * Known supported filetypes:
 *   - video/webm
 *   - video/mp4
 */


var VideoSlide = function VideoSlide(_ref3) {
  var src = _ref3.src,
      type = _ref3.type,
      onPlay = _ref3.onPlay;
  return /*#__PURE__*/_react.default.createElement("video", {
    controls: true,
    width: "100%",
    onPlay: onPlay
  }, /*#__PURE__*/_react.default.createElement("source", {
    src: src,
    type: type
  }), "Sorry, your browser does not support embedded video files.");
};

var FeatureSlider = function FeatureSlider(_ref4) {
  var slides = _ref4.slides;

  /**
   * @see https://react-slick.neostack.com/docs/api
   */
  var sliderSettings = {
    dots: true,
    infinite: true,
    lazyLoad: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false
  };
  var UNSUPPORTED_FILETYPES = ['video/avi', 'video/quicktime'];

  var handleMediaPlayEvent = function handleMediaPlayEvent(slideData) {
    return function () {
      _reactGa.default.event({
        category: 'Artwork',
        action: 'Played media file',
        label: slideData.type
      });
    };
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "detail-slideshow",
    "aria-label": "Images of the artwork"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactSlick.default, sliderSettings, slides.map(function (data) {
    if (UNSUPPORTED_FILETYPES.includes(data.type)) {
      return null;
    } // For other formats, though we might discover more unsupported formats.


    switch (data.type.split('/')[0]) {
      case 'image':
        return /*#__PURE__*/_react.default.createElement(ImageSlide, {
          key: data.mediaSrc,
          src: data.mediaSrc,
          altText: data.mediaAltText
        });

      case 'audio':
        return /*#__PURE__*/_react.default.createElement(AudioSlide, {
          key: data.mediaSrc,
          src: data.mediaSrc,
          type: data.type,
          onPlay: handleMediaPlayEvent(data)
        });

      case 'video':
        return /*#__PURE__*/_react.default.createElement(VideoSlide, {
          key: data.mediaSrc,
          src: data.mediaSrc,
          type: data.type,
          onPlay: handleMediaPlayEvent(data)
        });

      case 'missing':
      case 'unsupported':
      default:
        // TODO: Add filler for "unsupported type"
        return null;
    }
  }))));
};

FeatureSlider.propTypes = {
  slides: _propTypes.default.arrayOf(_propTypes.default.object)
};
var _default = FeatureSlider;
exports.default = _default;