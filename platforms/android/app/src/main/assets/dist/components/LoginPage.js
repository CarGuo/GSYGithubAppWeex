// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 429);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                                * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                                                                                                                                                                                                                                                                * Created by Tw93 on 17/11/01
                                                                                                                                                                                                                                                                                */

var _urlParse = __webpack_require__(144);

var _urlParse2 = _interopRequireDefault(_urlParse);

var _weexBindingx = __webpack_require__(3);

var _weexBindingx2 = _interopRequireDefault(_weexBindingx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Utils = {
  UrlParser: _urlParse2.default,
  _typeof: function _typeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },
  isPlainObject: function isPlainObject(obj) {
    return Utils._typeof(obj) === 'object';
  },
  isString: function isString(obj) {
    return typeof obj === 'string';
  },
  isNonEmptyArray: function isNonEmptyArray() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  isObject: function isObject(item) {
    return item && (typeof item === 'undefined' ? 'undefined' : _typeof2(item)) === 'object' && !Array.isArray(item);
  },
  isEmptyObject: function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  decodeIconFont: function decodeIconFont(text) {
    // 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
    var regExp = /&#x[a-z|0-9]{4,5};?/g;
    if (regExp.test(text)) {
      return text.replace(new RegExp(regExp, 'g'), function (iconText) {
        var replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
        return String.fromCharCode(replace);
      });
    } else {
      return text;
    }
  },
  mergeDeep: function mergeDeep(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    var source = sources.shift();
    if (Utils.isObject(target) && Utils.isObject(source)) {
      for (var key in source) {
        if (Utils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, _defineProperty({}, key, {}));
          }
          Utils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, _defineProperty({}, key, source[key]));
        }
      }
    }
    return Utils.mergeDeep.apply(Utils, [target].concat(sources));
  },
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new _urlParse2.default(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = Utils.appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated.toString()
    }, callback);
  },

  env: {
    isTaobao: function isTaobao() {
      var appName = weex.config.env.appName;

      return (/(tb|taobao|淘宝)/i.test(appName)
      );
    },
    isTrip: function isTrip() {
      var appName = weex.config.env.appName;

      return appName === 'LX';
    },
    isBoat: function isBoat() {
      var appName = weex.config.env.appName;

      return appName === 'Boat' || appName === 'BoatPlayground';
    },
    isWeb: function isWeb() {
      var platform = weex.config.env.platform;

      return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === 'object' && platform.toLowerCase() === 'web';
    },
    isIOS: function isIOS() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'ios';
    },

    /**
     * 是否为 iPhone X
     * @returns {boolean}
     */
    isIPhoneX: function isIPhoneX() {
      var deviceHeight = weex.config.env.deviceHeight;

      if (Utils.env.isWeb()) {
        return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) !== undefined && window.screen && window.screen.width && window.screen.height && parseInt(window.screen.width, 10) === 375 && parseInt(window.screen.height, 10) === 812;
      }
      return Utils.env.isIOS() && deviceHeight === 2436;
    },
    isAndroid: function isAndroid() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'android';
    },
    isAlipay: function isAlipay() {
      var appName = weex.config.env.appName;

      return appName === 'AP';
    },
    isTmall: function isTmall() {
      var appName = weex.config.env.appName;

      return (/(tm|tmall|天猫)/i.test(appName)
      );
    },
    isAliWeex: function isAliWeex() {
      return Utils.env.isTmall() || Utils.env.isTrip() || Utils.env.isTaobao();
    },
    supportsEB: function supportsEB() {
      return _weexBindingx2.default.isSupportBinding && !Utils.env.isWeb();
    },


    /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
    supportsEBForAndroid: function supportsEBForAndroid() {
      return Utils.env.isAndroid() && Utils.env.supportsEB();
    },


    /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
    supportsEBForIos: function supportsEBForIos() {
      return Utils.env.isIOS() && Utils.env.supportsEB();
    },


    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight: function getPageHeight() {
      var env = weex.config.env;

      var navHeight = Utils.env.isWeb() ? 0 : Utils.env.isIPhoneX() ? 176 : 132;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    },

    /**
     * 获取weex屏幕真实的设置高度
     * @returns {Number}
     */
    getScreenHeight: function getScreenHeight() {
      var env = weex.config.env;

      return env.deviceHeight / env.deviceWidth * 750;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion: function compareVersion() {
    var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0.0';
    var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.0.0';

    if (currVer === promoteVer) return true;
    var currVerArr = currVer.split('.');
    var promoteVerArr = promoteVer.split('.');
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i];
      var curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  },

  /**
   * 分割数组
   * @param arr 被分割数组
   * @param size 分割数组的长度
   * @returns {Array}
   */
  arrayChunk: function arrayChunk() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var groups = [];
    if (arr && arr.length > 0) {
      groups = arr.map(function (e, i) {
        return i % size === 0 ? arr.slice(i, i + size) : null;
      }).filter(function (e) {
        return e;
      });
    }
    return groups;
  },
  truncateString: function truncateString(str, len) {
    var hasDot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var newLength = 0;
    var newStr = '';
    var singleChar = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var strLength = str.replace(chineseRegex, '**').length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) !== null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  },

  animation: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param ref
     * @param transform 运动类型
     * @param status
     * @param callback 回调函数
     */
    pageTransitionAnimation: function pageTransitionAnimation(ref, transform, status, callback) {
      var animation = weex.requireModule('animation');
      animation.transition(ref, {
        styles: {
          transform: transform
        },
        duration: status ? 250 : 300, // ms
        timingFunction: status ? 'ease-in' : 'ease-out',
        delay: 0 // ms
      }, function () {
        callback && callback();
      });
    }
  },
  uiStyle: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param animationType 页面转场动画的类型 push，model
     * @param size 分割数组的长度
     * @returns {}
     */
    pageTransitionAnimationStyle: function pageTransitionAnimationStyle(animationType) {
      if (animationType === 'push') {
        return {
          left: '750px',
          top: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      } else if (animationType === 'model') {
        return {
          top: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px',
          left: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      }
      return {};
    }
  }
};

exports.default = Utils;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PAGE_SIZE = exports.PAGE_SIZE = 30;
var DEBUG = exports.DEBUG = true;

var miWhite = exports.miWhite = '#ececec';
var white = exports.white = '#FFF';
var transparentColor = exports.transparentColor = '#00000000';

var mainBackgroundColor = exports.mainBackgroundColor = miWhite;
var tabBackgroundColor = exports.tabBackgroundColor = '#ffffff';
var cardBackgroundColor = exports.cardBackgroundColor = '#FFF';
var cardShadowColor = exports.cardShadowColor = '#000000';
var actionBlue = exports.actionBlue = '#267aff';

var lineColor = exports.lineColor = '#42464b';

var primaryColor = exports.primaryColor = '#24292e';
var primaryDarkColor = exports.primaryDarkColor = '#121917';
var primaryLightColor = exports.primaryLightColor = '#42464b';

var webDraculaBackgroundColor = exports.webDraculaBackgroundColor = '#282a36';

var selectedColor = exports.selectedColor = primaryDarkColor;

var titleTextColor = exports.titleTextColor = miWhite;
var mainTextColor = exports.mainTextColor = primaryDarkColor;
var subTextColor = exports.subTextColor = '#959595';
var subLightTextColor = exports.subLightTextColor = '#c4c4c4';
var TextColorWhite = exports.TextColorWhite = '#FFFFFF';
var TextColorMiWhtte = exports.TextColorMiWhtte = miWhite;

var tabSelectedColor = exports.tabSelectedColor = primaryColor;
var tabUnSelectColor = exports.tabUnSelectColor = '#a6aaaf';

/****************大小****************/
// navbar 高度
var iosnavHeaderHeight = exports.iosnavHeaderHeight = 70;
var andrnavHeaderHeight = exports.andrnavHeaderHeight = 70;

var largetTextSize = exports.largetTextSize = 30;
var bigTextSize = exports.bigTextSize = 23;
var normalTextSize = exports.normalTextSize = 18;
var middleTextWhite = exports.middleTextWhite = 16;
var smallTextSize = exports.smallTextSize = 14;
var minTextSize = exports.minTextSize = 12;

// tabBar 高度
var tabBarHeight = exports.tabBarHeight = 44;
var tabIconSize = exports.tabIconSize = 20;

var normalIconSize = exports.normalIconSize = 40;
var bigIconSize = exports.bigIconSize = 50;
var largeIconSize = exports.largeIconSize = 80;
var smallIconSize = exports.smallIconSize = 30;
var minIconSize = exports.minIconSize = 20;
var littleIconSize = exports.littleIconSize = 10;

var normalMarginEdge = exports.normalMarginEdge = 10;
var normalNumberOfLine = exports.normalNumberOfLine = 4;

var TOKEN_KEY = exports.TOKEN_KEY = 'token';
var USER_NAME_KEY = exports.USER_NAME_KEY = 'user_name';
var PW_KEY = exports.PW_KEY = 'user_pw';
var USER_BASIC_CODE = exports.USER_BASIC_CODE = 'user_basic_code';
var USER_INFO = exports.USER_INFO = 'user_info';
var LANGUAGE_SELECT = exports.LANGUAGE_SELECT = 'language_select';
var LANGUAGE_SELECT_NAME = exports.LANGUAGE_SELECT_NAME = 'language_select_name';
var REFRESH_LANGUAGE = exports.REFRESH_LANGUAGE = 'refreshLanguageApp';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var a = factory();
    for (var i in a) {
      ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' ? exports : root)[i] = a[i];
    }
  }
})(typeof self !== 'undefined' ? self : undefined, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /**
       Copyright 2018 Alibaba Group
      
       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at
      
       http://www.apache.org/licenses/LICENSE-2.0
      
       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
       */

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var _universalEnv = __webpack_require__(1);

      var _bindingxParser = __webpack_require__(3);

      function requireModule(moduleName) {
        try {
          if ((typeof weex === 'undefined' ? 'undefined' : _typeof(weex)) !== undefined && weex.requireModule) {
            // eslint-disable-line
            return weex.requireModule(moduleName); // eslint-disable-line
          }
        } catch (err) {}
        return window.require('@weex-module/' + moduleName);
      };

      var isSupportNewBinding = true;
      var isSupportBinding = true;
      var WeexBinding = void 0;
      var WebBinding = {};
      if (_universalEnv.isWeb) {
        WebBinding = __webpack_require__(5);
      } else {
        try {
          WeexBinding = requireModule('bindingx');
          isSupportNewBinding = true;
        } catch (e) {
          isSupportNewBinding = false;
        }
        if (!WeexBinding || !WeexBinding.bind) {
          try {
            WeexBinding = requireModule('binding');
            isSupportNewBinding = true;
          } catch (e) {
            isSupportNewBinding = false;
          }
        }
        isSupportNewBinding = !!(WeexBinding && WeexBinding.bind && WeexBinding.unbind);
        if (!isSupportNewBinding) {
          try {
            WeexBinding = requireModule('expressionBinding');
            isSupportBinding = true;
          } catch (err) {
            isSupportBinding = false;
          }
        }
        isSupportBinding = !!(WeexBinding && (WeexBinding.bind || WeexBinding.createBinding));
      }

      function formatExpression(expression) {
        if (expression === undefined) return;
        try {
          expression = JSON.parse(expression);
        } catch (err) {}
        var resultExpression = {};
        if (typeof expression === 'string') {
          resultExpression.origin = expression;
        } else if (expression) {
          resultExpression.origin = expression.origin;
          resultExpression.transformed = expression.transformed;
        }
        if (!resultExpression.transformed && !resultExpression.origin) return;
        resultExpression.transformed = resultExpression.transformed || (0, _bindingxParser.parse)(resultExpression.origin);
        return resultExpression;
      }

      // 统一回调参数
      function fixCallback(callback) {
        return function () {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (typeof callback === 'function') {
            return callback({
              state: params.state === 'end' ? 'exit' : params.state,
              t: params.t !== undefined ? params.t : params.deltaT
            });
          }
        };
      }

      exports.default = {
        // 是否支持新版本的binding
        isSupportNewBinding: isSupportNewBinding,
        // 是否支持binding
        isSupportBinding: isSupportBinding,
        _bindingInstances: [],
        /**
         * 绑定
         * @param options 参数
         * @example
         {
           anchor:blockRef,
           eventType:'pan',
           props: [
           {
             element:blockRef,
             property:'transform.translateX',
             expression:{
               origin:"x+1",
               transformed:"{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":1}]}"
             }
           }
          ]
         }
         */
        bind: function bind(options) {
          var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

          if (!options) {
            throw new Error('should pass options for binding');
          }

          options.exitExpression = formatExpression(options.exitExpression);

          if (options.props) {
            options.props.forEach(function (prop) {
              prop.expression = formatExpression(prop.expression);
            });
          }

          if (_universalEnv.isWeex) {
            if (WeexBinding && isSupportBinding) {
              if (isSupportNewBinding) {
                return WeexBinding.bind(options, options && options.eventType === 'timing' ? fixCallback(callback) : callback);
              } else {
                WeexBinding.enableBinding(options.anchor, options.eventType);
                // 处理expression的参数格式
                var expressionArgs = options.props.map(function (prop) {
                  return {
                    element: prop.element,
                    property: prop.property,
                    expression: prop.expression.transformed
                  };
                });
                WeexBinding.createBinding(options.anchor, options.eventType, '', expressionArgs, callback);
              }
            }
          } else {
            return WebBinding.bind(options, callback);
          }
        },

        /**
         *  @param {object} options
         *  @example
         *  {eventType:'pan',
         *   token:self.gesToken}
         */
        unbind: function unbind(options) {
          if (!options) {
            throw new Error('should pass options for binding');
          }
          if (_universalEnv.isWeex) {
            if (WeexBinding && isSupportBinding) {
              if (isSupportNewBinding) {
                return WeexBinding.unbind(options);
              } else {
                return WeexBinding.disableBinding(options.anchor, options.eventType);
              }
            }
          } else {
            return WebBinding.unbind(options);
          }
        },
        unbindAll: function unbindAll() {
          if (_universalEnv.isWeex) {
            if (WeexBinding && isSupportBinding) {
              if (isSupportNewBinding) {
                return WeexBinding.unbindAll();
              } else {
                return WeexBinding.disableAll();
              }
            }
          } else {
            return WebBinding.unbindAll();
          }
        },
        getComputedStyle: function getComputedStyle(el) {
          if (_universalEnv.isWeex) {
            if (isSupportNewBinding) {
              return WeexBinding.getComputedStyle(el);
            } else {
              return {};
            }
          } else {
            return WebBinding.getComputedStyle(el);
          }
        }
      };
      module.exports = exports['default'];

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* WEBPACK VAR INJECTION */
      (function (process) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
        };

        // https://www.w3.org/TR/html5/webappapis.html#dom-navigator-appcodename
        var isWeb = exports.isWeb = (typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko');
        var isNode = exports.isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);
        var isWeex = exports.isWeex = typeof callNative === 'function';
        var isReactNative = exports.isReactNative = typeof __fbBatchedBridgeConfig !== 'undefined';
        exports['default'] = module.exports;
        exports.default = module.exports;
        /* WEBPACK VAR INJECTION */
      }).call(exports, __webpack_require__(2));

      /***/
    },
    /* 2 */
    /***/function (module, exports) {

      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return [];
      };

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = __webpack_require__(4);

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var lex = {
        InputElementDiv: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
        InputElementRegExp: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
        ReservedWord: '<Keyword>|<NullLiteral>|<BooleanLiteral>',
        WhiteSpace: /[\t\v\f\u0020\u00A0\u1680\u180E\u2000-\u200A\u202F\u205f\u3000\uFEFF]/,
        LineTerminator: /[\n\r\u2028\u2029]/,
        Keyword: /new(?![_$a-zA-Z0-9])|void(?![_$a-zA-Z0-9])|delete(?![_$a-zA-Z0-9])|in(?![_$a-zA-Z0-9])|instanceof(?![_$a-zA-Z0-9])|typeof(?![_$a-zA-Z0-9])/,
        NullLiteral: /null(?![_$a-zA-Z0-9])/,
        BooleanLiteral: /(?:true|false)(?![_$a-zA-Z0-9])/,
        Identifier: /[_$a-zA-Z][_$a-zA-Z0-9]*/,
        Punctuator: /\/|=>|\*\*|>>>=|>>=|<<=|===|!==|>>>|<<|%=|\*=|-=|\+=|<=|>=|==|!=|\^=|\|=|\|\||&&|&=|>>|\+\+|--|\:|}|\*|&|\||\^|!|~|-|\+|\?|%|=|>|<|,|;|\.(?![0-9])|\]|\[|\)|\(|{/,
        DivPunctuator: /\/=|\//,
        NumericLiteral: /(?:0[xX][0-9a-fA-F]*|\.[0-9]+|(?:[1-9]+[0-9]*|0)(?:\.[0-9]*|\.)?)(?:[eE][+-]{0,1}[0-9]+)?(?![_$a-zA-Z0-9])/,
        StringLiteral: /"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/,
        RegularExpressionLiteral: /\/(?:\[(?:\\[\s\S]|[^\]])*\]|[^*\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])(?:\[(?:\\[\s\S]|[^\]])*\]|[^\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])*\/[0-9a-zA-Z]*/
      };

      function XRegExp(xregexps, rootname, flag) {
        var expnames = [rootname];

        function buildRegExp(source) {
          var regexp = new RegExp();
          regexp.compile(source.replace(/<([^>]+)>/g, function (all, expname) {
            if (!xregexps[expname]) return '';
            expnames.push(expname);
            if (xregexps[expname] instanceof RegExp) return '(' + xregexps[expname].source + ')';
            return '(' + buildRegExp(xregexps[expname]).source + ')';
          }), flag);
          return regexp;
        }

        var regexp = buildRegExp(xregexps[rootname]);
        this.exec = function (string) {
          var matches = regexp.exec(string);
          if (matches == null) return null;
          var result = new String(matches[0]);
          for (var i = 0; i < expnames.length; i++) {
            if (matches[i]) result[expnames[i]] = matches[i];
          }return result;
        };
        Object.defineProperty(this, 'lastIndex', {
          'get': function get() {
            return regexp.lastIndex;
          },
          'set': function set(v) {
            regexp.lastIndex = v;
          }
        });
      }

      function LexicalParser() {
        var inputElementDiv = new XRegExp(lex, 'InputElementDiv', 'g');
        var inputElementRegExp = new XRegExp(lex, 'InputElementRegExp', 'g');
        var source;
        Object.defineProperty(this, 'source', {
          'get': function get() {
            return source;
          },
          'set': function set(v) {
            source = v;
            inputElementDiv.lastIndex = 0;
            inputElementRegExp.lastIndex = 0;
          }
        });
        this.reset = function () {
          inputElementDiv.lastIndex = 0;
          inputElementRegExp.lastIndex = 0;
        };
        this.getNextToken = function (useDiv) {
          var lastIndex = inputElementDiv.lastIndex;
          var inputElement;
          if (useDiv) inputElement = inputElementDiv;else inputElement = inputElementRegExp;
          var token = inputElement.exec(source);
          if (token && inputElement.lastIndex - lastIndex > token.length) {
            throw new SyntaxError('Unexpected token ILLEGAL');
          }
          inputElementDiv.lastIndex = inputElement.lastIndex;
          inputElementRegExp.lastIndex = inputElement.lastIndex;
          return token;
        };
      }

      var rules = {
        'IdentifierName': [['Identifier']],
        'Literal': [['NullLiteral'], ['BooleanLiteral'], ['NumericLiteral'], ['StringLiteral'], ['RegularExpressionLiteral']],
        'PrimaryExpression': [['Identifier'], ['Literal'], ['(', 'Expression', ')']],
        'CallExpression': [['PrimaryExpression', 'Arguments'], ['CallExpression', 'Arguments']],
        'Arguments': [['(', ')'], ['(', 'ArgumentList', ')']],
        'ArgumentList': [['ConditionalExpression'], ['ArgumentList', ',', 'ConditionalExpression']],
        'LeftHandSideExpression': [['PrimaryExpression'], ['CallExpression']],
        'UnaryExpression': [['LeftHandSideExpression'], ['void', 'UnaryExpression'], ['+', 'UnaryExpression'], ['-', 'UnaryExpression'], ['~', 'UnaryExpression'], ['!', 'UnaryExpression']],
        'ExponentiationExpression': [['UnaryExpression'], ['ExponentiationExpression', '**', 'UnaryExpression']],
        'MultiplicativeExpression': [['MultiplicativeExpression', '/', 'ExponentiationExpression'], ['ExponentiationExpression'], ['MultiplicativeExpression', '*', 'ExponentiationExpression'], ['MultiplicativeExpression', '%', 'ExponentiationExpression']],
        'AdditiveExpression': [['MultiplicativeExpression'], ['AdditiveExpression', '+', 'MultiplicativeExpression'], ['AdditiveExpression', '-', 'MultiplicativeExpression']],
        'ShiftExpression': [['AdditiveExpression'], ['ShiftExpression', '<<', 'AdditiveExpression'], ['ShiftExpression', '>>', 'AdditiveExpression'], ['ShiftExpression', '>>>', 'AdditiveExpression']],
        'RelationalExpression': [['ShiftExpression'], ['RelationalExpression', '<', 'ShiftExpression'], ['RelationalExpression', '>', 'ShiftExpression'], ['RelationalExpression', '<=', 'ShiftExpression'], ['RelationalExpression', '>=', 'ShiftExpression'], ['RelationalExpression', 'instanceof', 'ShiftExpression'], ['RelationalExpression', 'in', 'ShiftExpression']],
        'EqualityExpression': [['RelationalExpression'], ['EqualityExpression', '==', 'RelationalExpression'], ['EqualityExpression', '!=', 'RelationalExpression'], ['EqualityExpression', '===', 'RelationalExpression'], ['EqualityExpression', '!==', 'RelationalExpression']],
        'BitwiseANDExpression': [['EqualityExpression'], ['BitwiseANDExpression', '&', 'EqualityExpression']],
        'BitwiseXORExpression': [['BitwiseANDExpression'], ['BitwiseXORExpression', '^', 'BitwiseANDExpression']],
        'BitwiseORExpression': [['BitwiseXORExpression'], ['BitwiseORExpression', '|', 'BitwiseXORExpression']],
        'LogicalANDExpression': [['BitwiseORExpression'], ['LogicalANDExpression', '&&', 'BitwiseORExpression']],
        'LogicalORExpression': [['LogicalANDExpression'], ['LogicalORExpression', '||', 'LogicalANDExpression']],
        'ConditionalExpression': [['LogicalORExpression'], ['LogicalORExpression', '?', 'LogicalORExpression', ':', 'LogicalORExpression']],
        'Expression': [['ConditionalExpression'], ['Expression', ',', 'ConditionalExpression']],
        'Program': [['Expression']]

      };

      function _Symbol(symbolName, token) {
        this.name = symbolName;
        this.token = token;
        this.childNodes = [];
        this.toString = function (indent) {
          if (!indent) indent = '';
          if (this.childNodes.length == 1) return this.childNodes[0].toString(indent);
          var str = indent + this.name + (this.token != undefined && this.name != this.token ? ':' + this.token : '') + '\n';
          for (var i = 0; i < this.childNodes.length; i++) {
            str += this.childNodes[i].toString(indent + '    ');
          }return str;
        };
      }

      function SyntacticalParser() {
        var currentRule;
        var root = {
          Program: '$'
        };
        var hash = {};

        function closureNode(node) {

          hash[JSON.stringify(node)] = node;

          var queue = Object.getOwnPropertyNames(node);
          while (queue.length) {
            var symbolName = queue.shift();
            if (!rules[symbolName]) continue;
            rules[symbolName].forEach(function (rule) {
              if (!node[rule[0]]) queue.push(rule[0]);
              var rulenode = node;
              var lastnode = null;
              rule.forEach(function (symbol) {
                if (!rulenode[symbol]) rulenode[symbol] = {};
                lastnode = rulenode;
                rulenode = rulenode[symbol];
              });
              if (node[symbolName].$div) rulenode.$div = true;
              rulenode.$reduce = symbolName;
              rulenode.$count = rule.length;
            });
          }

          for (var p in node) {
            if (_typeof2(node[p]) != 'object' || p.charAt(0) == '$' || node[p].$closure) continue;
            if (hash[JSON.stringify(node[p])]) node[p] = hash[JSON.stringify(node[p])];else {
              closureNode(node[p]);
            }
          }
          node.$closure = true;
        }

        closureNode(root);
        var symbolStack = [];
        var statusStack = [root];
        var current = root;
        this.insertSymbol = function insertSymbol(symbol, haveLineTerminator) {
          while (!current[symbol.name] && current.$reduce) {
            var count = current.$count;
            var newsymbol = new _Symbol(current.$reduce);
            while (count--) {
              newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
            }current = statusStack[statusStack.length - 1];
            this.insertSymbol(newsymbol);
          }
          current = current[symbol.name];
          symbolStack.push(symbol), statusStack.push(current);
          if (!current) throw new Error();
          return current.$div;
        };
        this.reset = function () {
          current = root;
          symbolStack = [];
          statusStack = [root];
        };
        Object.defineProperty(this, 'grammarTree', {
          'get': function get() {
            try {
              while (current.$reduce) {
                var count = current.$count;
                var newsymbol = new _Symbol(current.$reduce);
                while (count--) {
                  newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
                }current = statusStack[statusStack.length - 1];
                this.insertSymbol(newsymbol);
              }
              if (symbolStack.length > 0 && current[';']) {
                this.insertSymbol(new _Symbol(';', ';'));
                return this.grammarTree;
              }
              if (symbolStack.length != 1 || symbolStack[0].name != 'Program') throw new Error();
            } catch (e) {
              throw new SyntaxError('Unexpected end of input');
            }
            return symbolStack[0];
          }
        });
      }

      function Parser() {
        this.lexicalParser = new LexicalParser();
        this.syntacticalParser = new SyntacticalParser();
        var terminalSymbols = ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'RegularExpressionLiteral', 'Identifier', '**', '=>', '{', '}', '(', ')', '[', ']', '.', ';', ',', '<', '>', '<=', '>=', '==', '!=', '===', '!==', '+', '-', '*', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=', '*=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', '/', '/=', 'instanceof', 'typeof', 'new', 'void', 'debugger', 'this', 'delete', 'in'];
        var terminalSymbolIndex = {};
        terminalSymbols.forEach(function (e) {
          Object.defineProperty(terminalSymbolIndex, e, {});
        });
        this.reset = function () {
          this.lexicalParser.reset();
          this.syntacticalParser.reset();
        };
        this.parse = function (source, onInputElement) {
          var _this3 = this;

          var token;
          var haveLineTerminator = false;
          this.lexicalParser.source = source;
          var useDiv = false;
          while (token = this.lexicalParser.getNextToken(useDiv)) {
            if (onInputElement) onInputElement(token);
            try {
              if (Object.getOwnPropertyNames(token).some(function (e) {
                if (terminalSymbolIndex.hasOwnProperty(e)) {
                  useDiv = _this3.syntacticalParser.insertSymbol(new _Symbol(e, token), haveLineTerminator);
                  haveLineTerminator = false;
                  return true;
                } else return false;
              })) continue;
              if ((token.Keyword || token.Punctuator || token.DivPunctuator) && terminalSymbolIndex.hasOwnProperty(token.toString())) {
                useDiv = this.syntacticalParser.insertSymbol(new _Symbol(token.toString(), token), haveLineTerminator);
              }
            } catch (e) {
              throw new SyntaxError('Unexpected token ' + token);
            }
          }
          return this.syntacticalParser.grammarTree;
        };
      }

      var parser = new Parser();

      function JavaScriptExpression(text) {
        parser.reset();
        this.tree = parser.parse(text);
        this.paths = [];
        var context = Object.create(null);
        var me = this;
        var pathIndex = Object.create(null);
        this.isSimple;
        this.isConst;
        walk(this.tree);
        checkSimple(this.tree);
        if (this.paths.length === 0) {
          this.isConst = true;
        }
        this.setter = function (path) {
          var curr = context;
          for (var i = 0; i < path.length - 1; i++) {
            if (!curr[path[i]]) curr[path[i]] = Object.create(null);
            curr = curr[path[i]];
          }
          return {
            isCompleted: function isCompleted() {
              for (var p in pathIndex) {
                if (!pathIndex[p]) return false;
              }return true;
            },
            set: function set(value) {
              if (!pathIndex[path.join('.')]) {
                pathIndex[path.join('.')] = true;
              }
              curr[path[i]] = value;
              if (this.isCompleted()) {
                return me.exec();
              } else {
                return undefined;
              }
            }
          };
        };

        this.valueOf = this.exec = function () {
          try {
            return function () {
              return eval(text);
            }.call(context);
          } catch (e) {}
        };

        function checkSimple(symbol) {

          var curr = symbol;
          while (curr.childNodes.length <= 1 && curr.name !== 'MemberExpression') {
            curr = curr.childNodes[0];
          }
          // TODO: need to point out "[……]"
          if (curr.name === 'MemberExpression') {
            me.isSimple = true;
          } else {
            me.isSimple = false;
          }
        }

        function walk(symbol) {
          if (symbol.name === 'CallExpression' && symbol.childNodes[symbol.childNodes.length - 1].name !== 'CallExpression') {
            var path = getPath(symbol.childNodes[1]);
            walk(symbol.childNodes[0]);
          } else if (symbol.name === 'NewExpression' && symbol.childNodes.length === 1) {
            var path = getPath(symbol.childNodes[0]);
          } else if (symbol.name === 'MemberExpression' && symbol.childNodes.length === 1) {
            var path = getPath(symbol);
          } else {
            for (var i = 0; i < symbol.childNodes.length; i++) {
              walk(symbol.childNodes[i]);
            }
          }
        }

        function getPath(symbol) {
          // [["PrimaryExpression"], ["MemberExpression", "[", "Expression", "]"], ["MemberExpression", ".", "IdentifierName"], ["new", "MemberExpression", "Arguments"]],

          if (symbol.childNodes[0].name === 'IdentifierName') {
            // MemberExpression : MemberExpression "." IdentifierName
            var path = getPath(symbol.childNodes[2]);
            if (path) path = path.concat(symbol.childNodes[0].childNodes[0].token.toString());
            createPath(path);
            return path;
          } else if (symbol.childNodes[0].name === 'PrimaryExpression') {
            // MemberExpression : PrimaryExpression
            if (symbol.childNodes[0].childNodes[0].name === 'Identifier') {
              var path = [symbol.childNodes[0].childNodes[0].token.toString()];
              createPath(path);
              return path;
            } else {
              return null;
            }
          } else if (symbol.childNodes[0].name === ']') {
            // MemberExpression : MemberExpression "[" Expression "]"
            getPath(symbol.childNodes[3]);
            walk(symbol.childNodes[1]);
            return null;
          } else if (symbol.childNodes[0].name === 'Arguments') {
            // MemberExpression : "new" MemberExpression Arguments
            walk(symbol.childNodes[0]);
            walk(symbol.childNodes[1]);
            return null;
          } else {
            for (var i = 0; i < symbol.childNodes.length; i++) {
              walk(symbol.childNodes[i]);
            }
          }
        }

        function createPath(path) {
          var curr = context;
          for (var i = 0; i < path.length - 1; i++) {
            if (!curr[path[i]]) curr[path[i]] = Object.create(null);
            curr = curr[path[i]];
          }
          me.paths.push(path);
          pathIndex[path.join('.')] = false;
        }
      }

      function visit(tree) {
        var childNodes = tree.childNodes.slice().reverse();
        var children = childNodes.filter(function (e) {
          return !e.token || !e.token.Punctuator;
        });
        if (tree.name === 'UnaryExpression') {
          // negative number support
          if (childNodes.length === 2 && childNodes[0].name === '-' && children.length === 1) {
            var res = visit(children[0]);
            res.value = -res.value;
            return res;
          }
        }

        if (tree.name === 'Arguments') {
          var argumentList = [];
          var listNode = children[0];
          while (listNode) {
            if (listNode.childNodes.length === 3) {
              argumentList.unshift(listNode.childNodes[0]);
              listNode = listNode.childNodes[2];
            }
            if (listNode.childNodes.length === 1) {
              argumentList.unshift(listNode.childNodes[0]);
              listNode = null;
            }
          }
          return {
            type: 'Arguments',
            children: argumentList.map(function (e) {
              return visit(e);
            })
          };
        }

        if (children && children.length === 1) {
          var res = visit(children[0]);
          return res;
        }

        if (tree.token && ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'Identifier'].some(function (e) {
          return tree.token[e];
        })) {
          var type = Object.keys(tree.token).filter(function (e) {
            return e.match(/Literal/) || e.match(/Identifier/);
          })[0];
          var value = {
            'NullLiteral': null,
            'BooleanLiteral': Boolean(tree.token),
            'NumericLiteral': Number(tree.token),
            'StringLiteral': tree.token,
            'Identifier': tree.token
          }[type];

          return {
            type: type,
            value: value
          };
        }

        if (tree.name === 'CallExpression') return {
          type: 'CallExpression',
          children: [visit(childNodes[0]), visit(childNodes[1])]
        };

        return {
          type: childNodes.filter(function (e) {
            return e.token && e.token.Punctuator;
          })[0].name,
          children: childNodes.filter(function (e) {
            return !e.token || !e.token.Punctuator;
          }).map(function (e) {
            return visit(e);
          })
        };
      }

      function parse(originExp) {
        var exp = new JavaScriptExpression(originExp);
        return JSON.stringify(visit(exp.tree), null);
      }

      module.exports = {
        parse: parse
      };

      /***/
    },
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

      (function webpackUniversalModuleDefinition(root, factory) {
        if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else {
          var a = factory();
          for (var i in a) {
            ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' ? exports : root)[i] = a[i];
          }
        }
      })(typeof self !== 'undefined' ? self : this, function () {
        return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
              /******/
              /******/ // Check if module is in cache
              /******/if (installedModules[moduleId]) {
                /******/return installedModules[moduleId].exports;
                /******/
              }
              /******/ // Create a new module (and put it into the cache)
              /******/var module = installedModules[moduleId] = {
                /******/i: moduleId,
                /******/l: false,
                /******/exports: {}
                /******/ };
              /******/
              /******/ // Execute the module function
              /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
              /******/
              /******/ // Flag the module as loaded
              /******/module.l = true;
              /******/
              /******/ // Return the exports of the module
              /******/return module.exports;
              /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
              /******/if (!__webpack_require__.o(exports, name)) {
                /******/Object.defineProperty(exports, name, {
                  /******/configurable: false,
                  /******/enumerable: true,
                  /******/get: getter
                  /******/ });
                /******/
              }
              /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
              /******/var getter = module && module.__esModule ?
              /******/function getDefault() {
                return module['default'];
              } :
              /******/function getModuleExports() {
                return module;
              };
              /******/__webpack_require__.d(getter, 'a', getter);
              /******/return getter;
              /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 8);
            /******/
          }(
          /************************************************************************/
          /******/[
          /* 0 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /*
            object-assign
            (c) Sindre Sorhus
            @license MIT
            */

            /* eslint-disable no-unused-vars */

            var getOwnPropertySymbols = Object.getOwnPropertySymbols;
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var propIsEnumerable = Object.prototype.propertyIsEnumerable;

            function toObject(val) {
              if (val === null || val === undefined) {
                throw new TypeError('Object.assign cannot be called with null or undefined');
              }

              return Object(val);
            }

            function shouldUseNative() {
              try {
                if (!Object.assign) {
                  return false;
                }

                // Detect buggy property enumeration order in older V8 versions.

                // https://bugs.chromium.org/p/v8/issues/detail?id=4118
                var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
                test1[5] = 'de';
                if (Object.getOwnPropertyNames(test1)[0] === '5') {
                  return false;
                }

                // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                var test2 = {};
                for (var i = 0; i < 10; i++) {
                  test2['_' + String.fromCharCode(i)] = i;
                }
                var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                  return test2[n];
                });
                if (order2.join('') !== '0123456789') {
                  return false;
                }

                // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                var test3 = {};
                'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
                  test3[letter] = letter;
                });
                if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
                  return false;
                }

                return true;
              } catch (err) {
                // We don't expect any of the above to throw, but better to be safe.
                return false;
              }
            }

            module.exports = shouldUseNative() ? Object.assign : function (target, source) {
              var from;
              var to = toObject(target);
              var symbols;

              for (var s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);

                for (var key in from) {
                  if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                  }
                }

                if (getOwnPropertySymbols) {
                  symbols = getOwnPropertySymbols(from);
                  for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                      to[symbols[i]] = from[symbols[i]];
                    }
                  }
                }
              }

              return to;
            };

            /***/
          },
          /* 1 */
          /***/function (module, exports, __webpack_require__) {

            (function webpackUniversalModuleDefinition(root, factory) {
              if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else {
                var a = factory();
                for (var i in a) {
                  ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' ? exports : root)[i] = a[i];
                }
              }
            })(typeof self !== 'undefined' ? self : this, function () {
              return (/******/function (modules) {
                  // webpackBootstrap
                  /******/ // The module cache
                  /******/var installedModules = {};
                  /******/
                  /******/ // The require function
                  /******/function __webpack_require__(moduleId) {
                    /******/
                    /******/ // Check if module is in cache
                    /******/if (installedModules[moduleId]) {
                      /******/return installedModules[moduleId].exports;
                      /******/
                    }
                    /******/ // Create a new module (and put it into the cache)
                    /******/var module = installedModules[moduleId] = {
                      /******/i: moduleId,
                      /******/l: false,
                      /******/exports: {}
                      /******/ };
                    /******/
                    /******/ // Execute the module function
                    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                    /******/
                    /******/ // Flag the module as loaded
                    /******/module.l = true;
                    /******/
                    /******/ // Return the exports of the module
                    /******/return module.exports;
                    /******/
                  }
                  /******/
                  /******/
                  /******/ // expose the modules object (__webpack_modules__)
                  /******/__webpack_require__.m = modules;
                  /******/
                  /******/ // expose the module cache
                  /******/__webpack_require__.c = installedModules;
                  /******/
                  /******/ // define getter function for harmony exports
                  /******/__webpack_require__.d = function (exports, name, getter) {
                    /******/if (!__webpack_require__.o(exports, name)) {
                      /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                      /******/
                    }
                    /******/
                  };
                  /******/
                  /******/ // getDefaultExport function for compatibility with non-harmony modules
                  /******/__webpack_require__.n = function (module) {
                    /******/var getter = module && module.__esModule ?
                    /******/function getDefault() {
                      return module['default'];
                    } :
                    /******/function getModuleExports() {
                      return module;
                    };
                    /******/__webpack_require__.d(getter, 'a', getter);
                    /******/return getter;
                    /******/
                  };
                  /******/
                  /******/ // Object.prototype.hasOwnProperty.call
                  /******/__webpack_require__.o = function (object, property) {
                    return Object.prototype.hasOwnProperty.call(object, property);
                  };
                  /******/
                  /******/ // __webpack_public_path__
                  /******/__webpack_require__.p = "";
                  /******/
                  /******/ // Load entry module and return exports
                  /******/return __webpack_require__(__webpack_require__.s = 0);
                  /******/
                }(
                /************************************************************************/
                /******/[
                /* 0 */
                /***/function (module, exports, __webpack_require__) {

                  "use strict";

                  function findIndex(o, condition) {
                    return o.indexOf(find(o, condition));
                  }

                  function dropWhile(o, condition) {
                    var result = [];
                    map(o, function (v, k) {
                      if (!condition(v, k)) {
                        result.push(v);
                      }
                    });
                    return result;
                  }

                  function filter(o, condition) {
                    var result = [];
                    forEach(o, function (v, k) {
                      if (condition(v, k)) {
                        result.push(v);
                      }
                    });
                    return result;
                  }

                  function map(o, fn) {
                    if (o instanceof Array) {
                      return Array.prototype.map.call(o, fn);
                    } else {
                      var result = [];
                      forEach(o, function (v, k) {
                        result.push(fn(v, k));
                      });
                      return result;
                    }
                  }

                  /*
                   forEach({a: 1, b: 2}, (v, k) => {
                   console.log({
                   v, k
                   })
                   })
                  
                   forEach([1,2,3],(v,k)=>{
                   console.log({
                   v,k
                   })
                   })
                   */

                  function forEach(o, fn) {
                    if (o instanceof Array) {
                      return Array.prototype.forEach.call(o, fn);
                    }
                    Object.keys(o).forEach(function (key) {
                      fn(o[key], key);
                    });
                  }

                  /* console.log(
                   find([{name: 1}, {name: 2}], (o) => {
                   return o.name === 2;
                   }))
                  
                   console.log(find([{name: 1,age:2}, {name: 2}], {name:1}))
                   */
                  function find(o, condition) {
                    var result = null;
                    forEach(o, function (v, k) {
                      if (typeof condition === 'function') {
                        if (condition(v, k)) {
                          result = v;
                        }
                      } else {
                        var propName = Object.keys(condition)[0];
                        if (propName && v[propName] === condition[propName]) {
                          result = v;
                        }
                      }
                    });
                    return result;
                  }

                  module.exports = {
                    find: find,
                    forEach: forEach,
                    map: map,
                    filter: filter,
                    dropWhile: dropWhile,
                    findIndex: findIndex
                  };

                  /***/
                }]
                /******/)
              );
            });

            /***/
          },
          /* 2 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _slicedToArray = function () {
              function sliceIterator(arr, i) {
                var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
                  for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);if (i && _arr.length === i) break;
                  }
                } catch (err) {
                  _d = true;_e = err;
                } finally {
                  try {
                    if (!_n && _i["return"]) _i["return"]();
                  } finally {
                    if (_d) throw _e;
                  }
                }return _arr;
              }return function (arr, i) {
                if (Array.isArray(arr)) {
                  return arr;
                } else if (Symbol.iterator in Object(arr)) {
                  return sliceIterator(arr, i);
                } else {
                  throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
              };
            }();

            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            /**
             * Transforms matrix into an object
             *
             * @param string matrix
             * @return object
             */

            // TODO matrix4 for 3D
            var matrixToTransformObj = function matrixToTransformObj(matrix) {
              // this happens when there was no rotation yet in CSS
              if (matrix === 'none') {
                matrix = 'matrix(0,0,0,0,0)';
              }
              var obj = {},
                  values = matrix.match(/([-+]?[\d\.]+)/g);

              var _values = _slicedToArray(values, 6),
                  a = _values[0],
                  b = _values[1],
                  c = _values[2],
                  d = _values[3],
                  e = _values[4],
                  f = _values[5];

              obj.rotate = obj.rotateZ = Math.round(Math.atan2(parseFloat(b), parseFloat(a)) * (180 / Math.PI)) || 0;
              obj.translateX = e !== undefined ? pxTo750(e) : 0;
              obj.translateY = f !== undefined ? pxTo750(f) : 0;
              obj.scaleX = Math.sqrt(a * a + b * b);
              obj.scaleY = Math.sqrt(c * c + d * d);
              return obj;
            };

            function pxTo750(n) {
              return n / document.body.clientWidth * 750;
            }

            function px(n) {
              return n / 750 * document.body.clientWidth;
              // return Math.round(n / 750 * document.body.clientWidth);
            }

            function clamp(n, min, max) {
              return n < min ? min : n > max ? max : n;
            }

            var vendor = function () {
              var el = document.createElement('div').style;
              var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                  transform,
                  i = 0,
                  l = vendors.length;
              for (; i < l; i++) {
                transform = vendors[i] + 'ransform';
                if (transform in el) return vendors[i].substr(0, vendors[i].length - 1);
              }
              return false;
            }();

            /**
             *  add vendor to attribute
             *  @memberOf Util
             *  @param {String} attrName name of attribute
             *  @return { String }
             **/
            function prefixStyle(attrName) {
              if (vendor === false) return false;
              if (vendor === '') return attrName;
              return vendor + attrName.charAt(0).toUpperCase() + attrName.substr(1);
            }

            exports.matrixToTransformObj = matrixToTransformObj;
            exports.pxTo750 = pxTo750;
            exports.px = px;
            exports.clamp = clamp;
            exports.prefixStyle = prefixStyle;

            /***/
          },
          /* 3 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }(); /**
                  Copyright 2018 Alibaba Group
                 
                  Licensed under the Apache License, Version 2.0 (the "License");
                  you may not use this file except in compliance with the License.
                  You may obtain a copy of the License at
                 
                  http://www.apache.org/licenses/LICENSE-2.0
                 
                  Unless required by applicable law or agreed to in writing, software
                  distributed under the License is distributed on an "AS IS" BASIS,
                  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                  See the License for the specific language governing permissions and
                  limitations under the License.
                  */

            var _simpleLodash = __webpack_require__(1);

            var _simpleLodash2 = _interopRequireDefault(_simpleLodash);

            var _utils = __webpack_require__(2);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            var TimingHandler = function () {
              function TimingHandler(binding) {
                _classCallCheck(this, TimingHandler);

                this.binding = null;

                this.binding = binding;
                var props = binding.options.props;

                _simpleLodash2.default.map(props, function (prop) {
                  var element = prop.element,
                      config = prop.config;

                  if (config && element) {
                    if (config.perspective) {
                      if (element.parentNode) {
                        element.parentNode.style[(0, _utils.prefixStyle)('transformStyle')] = 'preserve-3d';
                        element.parentNode.style[(0, _utils.prefixStyle)('perspective')] = config.perspective + 'px';
                        element.parentNode.style[(0, _utils.prefixStyle)('perspectiveOrigin')] = '0 0';
                      }
                    }
                    if (config.transformOrigin) {
                      element.style[(0, _utils.prefixStyle)('transformOrigin')] = config.transformOrigin;
                    }
                  }
                });
              }

              _createClass(TimingHandler, [{
                key: 'destroy',
                value: function destroy() {}
              }]);

              return TimingHandler;
            }();

            exports.default = TimingHandler;
            ;

            /***/
          },
          /* 4 */
          /***/function (module, exports, __webpack_require__) {

            (function webpackUniversalModuleDefinition(root, factory) {
              if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else {
                var a = factory();
                for (var i in a) {
                  ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' ? exports : root)[i] = a[i];
                }
              }
            })(this, function () {
              return (/******/function (modules) {
                  // webpackBootstrap
                  /******/ // The module cache
                  /******/var installedModules = {};
                  /******/
                  /******/ // The require function
                  /******/function __webpack_require__(moduleId) {
                    /******/
                    /******/ // Check if module is in cache
                    /******/if (installedModules[moduleId]) {
                      /******/return installedModules[moduleId].exports;
                      /******/
                    }
                    /******/ // Create a new module (and put it into the cache)
                    /******/var module = installedModules[moduleId] = {
                      /******/i: moduleId,
                      /******/l: false,
                      /******/exports: {}
                      /******/ };
                    /******/
                    /******/ // Execute the module function
                    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                    /******/
                    /******/ // Flag the module as loaded
                    /******/module.l = true;
                    /******/
                    /******/ // Return the exports of the module
                    /******/return module.exports;
                    /******/
                  }
                  /******/
                  /******/
                  /******/ // expose the modules object (__webpack_modules__)
                  /******/__webpack_require__.m = modules;
                  /******/
                  /******/ // expose the module cache
                  /******/__webpack_require__.c = installedModules;
                  /******/
                  /******/ // define getter function for harmony exports
                  /******/__webpack_require__.d = function (exports, name, getter) {
                    /******/if (!__webpack_require__.o(exports, name)) {
                      /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                      /******/
                    }
                    /******/
                  };
                  /******/
                  /******/ // getDefaultExport function for compatibility with non-harmony modules
                  /******/__webpack_require__.n = function (module) {
                    /******/var getter = module && module.__esModule ?
                    /******/function getDefault() {
                      return module['default'];
                    } :
                    /******/function getModuleExports() {
                      return module;
                    };
                    /******/__webpack_require__.d(getter, 'a', getter);
                    /******/return getter;
                    /******/
                  };
                  /******/
                  /******/ // Object.prototype.hasOwnProperty.call
                  /******/__webpack_require__.o = function (object, property) {
                    return Object.prototype.hasOwnProperty.call(object, property);
                  };
                  /******/
                  /******/ // __webpack_public_path__
                  /******/__webpack_require__.p = "";
                  /******/
                  /******/ // Load entry module and return exports
                  /******/return __webpack_require__(__webpack_require__.s = 3);
                  /******/
                }(
                /************************************************************************/
                /******/[
                /* 0 */
                /***/function (module, exports, __webpack_require__) {

                  "use strict";

                  var PI = Math.PI,
                      sin = Math.sin,
                      cos = Math.cos,
                      sqrt = Math.sqrt,
                      pow = Math.pow;

                  var c1 = 1.70158;
                  var c2 = c1 * 1.525;
                  var c3 = c1 + 1;
                  var c4 = 2 * PI / 3;
                  var c5 = 2 * PI / 4.5;

                  // x is the fraction of animation progress, in the range 0..1
                  function bounceOut(x) {
                    var n1 = 7.5625,
                        d1 = 2.75;
                    if (x < 1 / d1) {
                      return n1 * x * x;
                    } else if (x < 2 / d1) {
                      return n1 * (x -= 1.5 / d1) * x + .75;
                    } else if (x < 2.5 / d1) {
                      return n1 * (x -= 2.25 / d1) * x + .9375;
                    } else {
                      return n1 * (x -= 2.625 / d1) * x + .984375;
                    }
                  }

                  var Easing = {
                    linear: function linear(x) {
                      return x;
                    },
                    easeInQuad: function easeInQuad(x) {
                      return x * x;
                    },
                    easeOutQuad: function easeOutQuad(x) {
                      return 1 - (1 - x) * (1 - x);
                    },
                    easeInOutQuad: function easeInOutQuad(x) {
                      return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
                    },
                    easeInCubic: function easeInCubic(x) {
                      return x * x * x;
                    },
                    easeOutCubic: function easeOutCubic(x) {
                      return 1 - pow(1 - x, 3);
                    },
                    easeInOutCubic: function easeInOutCubic(x) {
                      return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
                    },
                    easeInQuart: function easeInQuart(x) {
                      return x * x * x * x;
                    },
                    easeOutQuart: function easeOutQuart(x) {
                      return 1 - pow(1 - x, 4);
                    },
                    easeInOutQuart: function easeInOutQuart(x) {
                      return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
                    },
                    easeInQuint: function easeInQuint(x) {
                      return x * x * x * x * x;
                    },
                    easeOutQuint: function easeOutQuint(x) {
                      return 1 - pow(1 - x, 5);
                    },
                    easeInOutQuint: function easeInOutQuint(x) {
                      return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
                    },
                    easeInSine: function easeInSine(x) {
                      return 1 - cos(x * PI / 2);
                    },
                    easeOutSine: function easeOutSine(x) {
                      return sin(x * PI / 2);
                    },
                    easeInOutSine: function easeInOutSine(x) {
                      return -(cos(PI * x) - 1) / 2;
                    },
                    easeInExpo: function easeInExpo(x) {
                      return x === 0 ? 0 : pow(2, 10 * x - 10);
                    },
                    easeOutExpo: function easeOutExpo(x) {
                      return x === 1 ? 1 : 1 - pow(2, -10 * x);
                    },
                    easeInOutExpo: function easeInOutExpo(x) {
                      return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
                    },
                    easeInCirc: function easeInCirc(x) {
                      return 1 - sqrt(1 - pow(x, 2));
                    },
                    easeOutCirc: function easeOutCirc(x) {
                      return sqrt(1 - pow(x - 1, 2));
                    },
                    easeInOutCirc: function easeInOutCirc(x) {
                      return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
                    },
                    easeInElastic: function easeInElastic(x) {
                      return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
                    },
                    easeOutElastic: function easeOutElastic(x) {
                      return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
                    },
                    easeInOutElastic: function easeInOutElastic(x) {
                      return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
                    },
                    easeInBack: function easeInBack(x) {
                      return c3 * x * x * x - c1 * x * x;
                    },
                    easeOutBack: function easeOutBack(x) {
                      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
                    },
                    easeInOutBack: function easeInOutBack(x) {
                      return x < 0.5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
                    },
                    easeInBounce: function easeInBounce(x) {
                      return 1 - bounceOut(1 - x);
                    },
                    easeOutBounce: bounceOut,
                    easeInOutBounce: function easeInOutBounce(x) {
                      return x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;
                    },
                    cubicBezier: function cubicBezier() {}
                  };

                  module.exports = Easing;

                  /***/
                },
                /* 1 */
                /***/function (module, exports, __webpack_require__) {

                  "use strict";

                  function Bezier(x1, y1, x2, y2, epsilon) {
                    var curveX = function curveX(t) {
                      var v = 1 - t;
                      return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
                    };

                    var curveY = function curveY(t) {
                      var v = 1 - t;
                      return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
                    };

                    var derivativeCurveX = function derivativeCurveX(t) {
                      var v = 1 - t;
                      return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
                    };

                    return function (t) {

                      var x = t,
                          t0,
                          t1,
                          t2,
                          x2,
                          d2,
                          i;

                      // First try a few iterations of Newton's method -- normally very fast.
                      for (t2 = x, i = 0; i < 8; i++) {
                        x2 = curveX(t2) - x;
                        if (Math.abs(x2) < epsilon) return curveY(t2);
                        d2 = derivativeCurveX(t2);
                        if (Math.abs(d2) < 1e-6) break;
                        t2 = t2 - x2 / d2;
                      }

                      t0 = 0, t1 = 1, t2 = x;

                      if (t2 < t0) return curveY(t0);
                      if (t2 > t1) return curveY(t1);

                      // Fallback to the bisection method for reliability.
                      while (t0 < t1) {
                        x2 = curveX(t2);
                        if (Math.abs(x2 - x) < epsilon) return curveY(t2);
                        if (x > x2) t0 = t2;else t1 = t2;
                        t2 = (t1 - t0) * .5 + t0;
                      }

                      // Failure
                      return curveY(t2);
                    };
                  };

                  module.exports = Bezier;

                  /***/
                },
                /* 2 */
                /***/function (module, exports, __webpack_require__) {

                  "use strict";

                  var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                  };

                  var cancelRAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;

                  module.exports = {
                    raf: raf,
                    cancelRAF: cancelRAF
                  };

                  /***/
                },
                /* 3 */
                /***/function (module, exports, __webpack_require__) {

                  "use strict";

                  module.exports = __webpack_require__(4);

                  /***/
                },
                /* 4 */
                /***/function (module, exports, __webpack_require__) {

                  "use strict";

                  var easing = __webpack_require__(0);
                  var bezier = __webpack_require__(1);

                  var _require = __webpack_require__(2),
                      raf = _require.raf,
                      cancelRAF = _require.cancelRAF;

                  var assign = __webpack_require__(5);

                  var TYPES = {
                    START: 'start',
                    END: 'end',
                    RUN: 'run',
                    STOP: 'stop'
                  };

                  var noop = function noop() {};

                  var MIN_DURATION = 1;

                  function Timer(cfg) {
                    this.init(cfg);
                  }

                  Timer.prototype = {
                    init: function init(cfg) {
                      this.cfg = assign({
                        easing: 'linear',
                        duration: Infinity,
                        onStart: noop,
                        onRun: noop,
                        onStop: noop,
                        onEnd: noop
                      }, cfg);
                    },
                    run: function run() {
                      var _cfg = this.cfg,
                          duration = _cfg.duration,
                          onStart = _cfg.onStart,
                          onRun = _cfg.onRun;

                      if (duration <= MIN_DURATION) {
                        this.isfinished = true;
                        typeof onRun === 'function' ? onRun({ percent: 1 }) : null;
                        this.stop();
                      }
                      if (this.isfinished) return;
                      this._hasFinishedPercent = this._stop && this._stop.percent || 0;
                      this._stop = null;
                      this.start = Date.now();
                      this.percent = 0;
                      typeof onStart === 'function' ? onStart({ percent: 0, type: TYPES.START }) : null;
                      // epsilon determines the precision of the solved values
                      var epsilon = 1000 / 60 / duration / 4;
                      var b = this.cfg.bezierArgs;
                      this.easingFn = b && b.length === 4 ? bezier(b[0], b[1], b[2], b[3], epsilon) : easing[this.cfg.easing];
                      this._run();
                    },

                    _run: function _run() {
                      var _this = this;

                      var _cfg2 = this.cfg,
                          onRun = _cfg2.onRun,
                          onStop = _cfg2.onStop;

                      cancelRAF(this._raf);
                      this._raf = raf(function () {
                        _this.now = Date.now();
                        _this.t = _this.now - _this.start;
                        _this.duration = _this.now - _this.start >= _this.cfg.duration ? _this.cfg.duration : _this.now - _this.start;
                        _this.progress = _this.easingFn(_this.duration / _this.cfg.duration);
                        _this.percent = _this.duration / _this.cfg.duration + _this._hasFinishedPercent;
                        if (_this.percent >= 1 || _this._stop) {
                          _this.percent = _this._stop && _this._stop.percent ? _this._stop.percent : 1;
                          _this.duration = _this._stop && _this._stop.duration ? _this._stop.duration : _this.duration;

                          typeof onRun === 'function' ? onRun({
                            percent: _this.progress,
                            originPercent: _this.percent,
                            t: _this.t,
                            type: TYPES.RUN
                          }) : null;

                          typeof onStop === 'function' ? onStop({
                            percent: _this.percent,
                            t: _this.t,
                            type: TYPES.STOP
                          }) : null;

                          if (_this.percent >= 1) {
                            _this.isfinished = true;
                            _this.stop();
                          }
                          return;
                        }

                        typeof onRun === 'function' ? onRun({
                          percent: _this.progress,
                          originPercent: _this.percent,
                          t: _this.t,
                          type: TYPES.RUN
                        }) : null;

                        _this._run();
                      });
                    },

                    stop: function stop() {
                      var onEnd = this.cfg.onEnd;

                      this._stop = {
                        percent: this.percent,
                        now: this.now
                      };
                      typeof onEnd === 'function' ? onEnd({
                        percent: 1,
                        t: this.t,
                        type: TYPES.END
                      }) : null;
                      cancelRAF(this._raf);
                    }
                  };

                  Timer.Easing = easing;
                  Timer.Bezier = bezier;
                  Timer.raf = raf;
                  Timer.cancelRAF = cancelRAF;
                  module.exports = Timer;

                  /***/
                },
                /* 5 */
                /***/function (module, exports, __webpack_require__) {

                  "use strict";
                  /*
                  object-assign
                  (c) Sindre Sorhus
                  @license MIT
                  */

                  /* eslint-disable no-unused-vars */

                  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
                  var hasOwnProperty = Object.prototype.hasOwnProperty;
                  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

                  function toObject(val) {
                    if (val === null || val === undefined) {
                      throw new TypeError('Object.assign cannot be called with null or undefined');
                    }

                    return Object(val);
                  }

                  function shouldUseNative() {
                    try {
                      if (!Object.assign) {
                        return false;
                      }

                      // Detect buggy property enumeration order in older V8 versions.

                      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
                      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
                      test1[5] = 'de';
                      if (Object.getOwnPropertyNames(test1)[0] === '5') {
                        return false;
                      }

                      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                      var test2 = {};
                      for (var i = 0; i < 10; i++) {
                        test2['_' + String.fromCharCode(i)] = i;
                      }
                      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                        return test2[n];
                      });
                      if (order2.join('') !== '0123456789') {
                        return false;
                      }

                      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                      var test3 = {};
                      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
                        test3[letter] = letter;
                      });
                      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
                        return false;
                      }

                      return true;
                    } catch (err) {
                      // We don't expect any of the above to throw, but better to be safe.
                      return false;
                    }
                  }

                  module.exports = shouldUseNative() ? Object.assign : function (target, source) {
                    var from;
                    var to = toObject(target);
                    var symbols;

                    for (var s = 1; s < arguments.length; s++) {
                      from = Object(arguments[s]);

                      for (var key in from) {
                        if (hasOwnProperty.call(from, key)) {
                          to[key] = from[key];
                        }
                      }

                      if (getOwnPropertySymbols) {
                        symbols = getOwnPropertySymbols(from);
                        for (var i = 0; i < symbols.length; i++) {
                          if (propIsEnumerable.call(from, symbols[i])) {
                            to[symbols[i]] = from[symbols[i]];
                          }
                        }
                      }
                    }

                    return to;
                  };

                  /***/
                }]
                /******/)
              );
            });

            /***/
          },
          /* 5 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _quaternion = __webpack_require__(6);

            var _quaternion2 = _interopRequireDefault(_quaternion);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function Vector3(x, y, z) {

              this.x = x || 0;
              this.y = y || 0;
              this.z = z || 0;
            }

            Vector3.prototype = {

              constructor: Vector3,

              isVector3: true,

              set: function set(x, y, z) {

                this.x = x;
                this.y = y;
                this.z = z;

                return this;
              },

              applyEuler: function () {

                var quaternion;

                return function applyEuler(euler) {

                  if ((euler && euler.isEuler) === false) {

                    console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
                  }

                  if (quaternion === undefined) quaternion = new _quaternion2.default();

                  return this.applyQuaternion(quaternion.setFromEuler(euler));
                };
              }(),

              applyQuaternion: function applyQuaternion(q) {

                var x = this.x,
                    y = this.y,
                    z = this.z;
                var qx = q.x,
                    qy = q.y,
                    qz = q.z,
                    qw = q.w;

                // calculate quat * vector

                var ix = qw * x + qy * z - qz * y;
                var iy = qw * y + qz * x - qx * z;
                var iz = qw * z + qx * y - qy * x;
                var iw = -qx * x - qy * y - qz * z;

                // calculate result * inverse quat

                this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
                this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
                this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

                return this;
              }

            };

            exports.default = Vector3;

            /***/
          },
          /* 6 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _objectAssign = __webpack_require__(0);

            var _objectAssign2 = _interopRequireDefault(_objectAssign);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function Quaternion(x, y, z, w) {

              this._x = x || 0;
              this._y = y || 0;
              this._z = z || 0;
              this._w = w !== undefined ? w : 1;
            }

            Quaternion.prototype = {

              constructor: Quaternion,

              get x() {

                return this._x;
              },

              set x(value) {

                this._x = value;
                this.onChangeCallback();
              },

              get y() {

                return this._y;
              },

              set y(value) {

                this._y = value;
                this.onChangeCallback();
              },

              get z() {

                return this._z;
              },

              set z(value) {

                this._z = value;
                this.onChangeCallback();
              },

              get w() {

                return this._w;
              },

              set w(value) {

                this._w = value;
                this.onChangeCallback();
              },

              set: function set(x, y, z, w) {

                this._x = x;
                this._y = y;
                this._z = z;
                this._w = w;

                this.onChangeCallback();

                return this;
              },

              clone: function clone() {

                return new this.constructor(this._x, this._y, this._z, this._w);
              },

              copy: function copy(quaternion) {

                this._x = quaternion.x;
                this._y = quaternion.y;
                this._z = quaternion.z;
                this._w = quaternion.w;

                this.onChangeCallback();

                return this;
              },

              setFromEuler: function setFromEuler(euler, update) {

                if ((euler && euler.isEuler) === false) {

                  throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
                }

                // http://www.mathworks.com/matlabcentral/fileexchange/
                //  20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
                //  content/SpinCalc.m

                var c1 = Math.cos(euler._x / 2);
                var c2 = Math.cos(euler._y / 2);
                var c3 = Math.cos(euler._z / 2);
                var s1 = Math.sin(euler._x / 2);
                var s2 = Math.sin(euler._y / 2);
                var s3 = Math.sin(euler._z / 2);

                var order = euler.order;

                if (order === 'XYZ') {

                  this._x = s1 * c2 * c3 + c1 * s2 * s3;
                  this._y = c1 * s2 * c3 - s1 * c2 * s3;
                  this._z = c1 * c2 * s3 + s1 * s2 * c3;
                  this._w = c1 * c2 * c3 - s1 * s2 * s3;
                } else if (order === 'YXZ') {

                  this._x = s1 * c2 * c3 + c1 * s2 * s3;
                  this._y = c1 * s2 * c3 - s1 * c2 * s3;
                  this._z = c1 * c2 * s3 - s1 * s2 * c3;
                  this._w = c1 * c2 * c3 + s1 * s2 * s3;
                } else if (order === 'ZXY') {

                  this._x = s1 * c2 * c3 - c1 * s2 * s3;
                  this._y = c1 * s2 * c3 + s1 * c2 * s3;
                  this._z = c1 * c2 * s3 + s1 * s2 * c3;
                  this._w = c1 * c2 * c3 - s1 * s2 * s3;
                } else if (order === 'ZYX') {

                  this._x = s1 * c2 * c3 - c1 * s2 * s3;
                  this._y = c1 * s2 * c3 + s1 * c2 * s3;
                  this._z = c1 * c2 * s3 - s1 * s2 * c3;
                  this._w = c1 * c2 * c3 + s1 * s2 * s3;
                } else if (order === 'YZX') {

                  this._x = s1 * c2 * c3 + c1 * s2 * s3;
                  this._y = c1 * s2 * c3 + s1 * c2 * s3;
                  this._z = c1 * c2 * s3 - s1 * s2 * c3;
                  this._w = c1 * c2 * c3 - s1 * s2 * s3;
                } else if (order === 'XZY') {

                  this._x = s1 * c2 * c3 - c1 * s2 * s3;
                  this._y = c1 * s2 * c3 - s1 * c2 * s3;
                  this._z = c1 * c2 * s3 + s1 * s2 * c3;
                  this._w = c1 * c2 * c3 + s1 * s2 * s3;
                }

                if (update !== false) this.onChangeCallback();

                return this;
              },

              setFromAxisAngle: function setFromAxisAngle(axis, angle) {

                // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

                // assumes axis is normalized

                var halfAngle = angle / 2,
                    s = Math.sin(halfAngle);

                this._x = axis.x * s;
                this._y = axis.y * s;
                this._z = axis.z * s;
                this._w = Math.cos(halfAngle);

                this.onChangeCallback();

                return this;
              },

              // normalize: function() {
              //
              //   var l = this.length();
              //
              //   if (l === 0) {
              //
              //     this._x = 0;
              //     this._y = 0;
              //     this._z = 0;
              //     this._w = 1;
              //
              //   } else {
              //
              //     l = 1 / l;
              //
              //     this._x = this._x * l;
              //     this._y = this._y * l;
              //     this._z = this._z * l;
              //     this._w = this._w * l;
              //
              //   }
              //
              //   this.onChangeCallback();
              //
              //   return this;
              //
              // },

              multiply: function multiply(q, p) {

                if (p !== undefined) {

                  console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
                  return this.multiplyQuaternions(q, p);
                }

                return this.multiplyQuaternions(this, q);
              },

              multiplyQuaternions: function multiplyQuaternions(a, b) {

                // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

                var qax = a._x,
                    qay = a._y,
                    qaz = a._z,
                    qaw = a._w;
                var qbx = b._x,
                    qby = b._y,
                    qbz = b._z,
                    qbw = b._w;

                this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
                this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
                this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
                this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

                this.onChangeCallback();

                return this;
              },

              slerp: function slerp(qb, t) {

                if (t === 0) return this;
                if (t === 1) return this.copy(qb);

                var x = this._x,
                    y = this._y,
                    z = this._z,
                    w = this._w;

                // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

                var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

                if (cosHalfTheta < 0) {

                  this._w = -qb._w;
                  this._x = -qb._x;
                  this._y = -qb._y;
                  this._z = -qb._z;

                  cosHalfTheta = -cosHalfTheta;
                } else {

                  this.copy(qb);
                }

                if (cosHalfTheta >= 1.0) {

                  this._w = w;
                  this._x = x;
                  this._y = y;
                  this._z = z;

                  return this;
                }

                var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

                if (Math.abs(sinHalfTheta) < 0.001) {

                  this._w = 0.5 * (w + this._w);
                  this._x = 0.5 * (x + this._x);
                  this._y = 0.5 * (y + this._y);
                  this._z = 0.5 * (z + this._z);

                  return this;
                }

                var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
                var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
                    ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

                this._w = w * ratioA + this._w * ratioB;
                this._x = x * ratioA + this._x * ratioB;
                this._y = y * ratioA + this._y * ratioB;
                this._z = z * ratioA + this._z * ratioB;

                this.onChangeCallback();

                return this;
              },

              onChange: function onChange(callback) {

                this.onChangeCallback = callback;

                return this;
              },

              onChangeCallback: function onChangeCallback() {}

            };

            (0, _objectAssign2.default)(Quaternion, {

              slerp: function slerp(qa, qb, qm, t) {

                return qm.copy(qa).slerp(qb, t);
              },

              slerpFlat: function slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {

                // fuzz-free, array-based Quaternion SLERP operation

                var x0 = src0[srcOffset0 + 0],
                    y0 = src0[srcOffset0 + 1],
                    z0 = src0[srcOffset0 + 2],
                    w0 = src0[srcOffset0 + 3],
                    x1 = src1[srcOffset1 + 0],
                    y1 = src1[srcOffset1 + 1],
                    z1 = src1[srcOffset1 + 2],
                    w1 = src1[srcOffset1 + 3];

                if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {

                  var s = 1 - t,
                      cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
                      dir = cos >= 0 ? 1 : -1,
                      sqrSin = 1 - cos * cos;

                  // Skip the Slerp for tiny steps to avoid numeric problems:
                  if (sqrSin > Number.EPSILON) {

                    var sin = Math.sqrt(sqrSin),
                        len = Math.atan2(sin, cos * dir);

                    s = Math.sin(s * len) / sin;
                    t = Math.sin(t * len) / sin;
                  }

                  var tDir = t * dir;

                  x0 = x0 * s + x1 * tDir;
                  y0 = y0 * s + y1 * tDir;
                  z0 = z0 * s + z1 * tDir;
                  w0 = w0 * s + w1 * tDir;

                  // Normalize in case we just did a lerp:
                  if (s === 1 - t) {

                    var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);

                    x0 *= f;
                    y0 *= f;
                    z0 *= f;
                    w0 *= f;
                  }
                }

                dst[dstOffset] = x0;
                dst[dstOffset + 1] = y0;
                dst[dstOffset + 2] = z0;
                dst[dstOffset + 3] = w0;
              }

            });

            exports.default = Quaternion;

            /***/
          },
          /* 7 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            var _Math = {
              DEG2RAD: Math.PI / 180,
              RAD2DEG: 180 / Math.PI,
              degToRad: function degToRad(degrees) {
                return degrees * _Math.DEG2RAD;
              },
              radToDeg: function radToDeg(radians) {
                return radians * _Math.RAD2DEG;
              }
            };

            exports.default = _Math;

            /***/
          },
          /* 8 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            var _simpleLodash = __webpack_require__(1);

            var _simpleLodash2 = _interopRequireDefault(_simpleLodash);

            var _expression = __webpack_require__(9);

            var _expression2 = _interopRequireDefault(_expression);

            var _handlers = __webpack_require__(10);

            var _utils = __webpack_require__(2);

            var _fn = __webpack_require__(18);

            var _fn2 = _interopRequireDefault(_fn);

            var _objectAssign = __webpack_require__(0);

            var _objectAssign2 = _interopRequireDefault(_objectAssign);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            // transform
            var vendorTransform = (0, _utils.prefixStyle)('transform');

            var Binding = function () {
              function Binding(options, callback) {
                _classCallCheck(this, Binding);

                this._eventHandler = null;
                this.elTransforms = [];
                this.token = null;

                this.options = options;
                this.callback = callback;
                this.token = this.genToken();
                this._initElTransforms();
                var eventType = options.eventType;

                switch (eventType) {
                  case 'pan':
                    this._eventHandler = new _handlers.PanHandler(this);
                    break;
                  case 'orientation':
                    this._eventHandler = new _handlers.OrientationHandler(this);
                    break;
                  case 'timing':
                    this._eventHandler = new _handlers.TimingHandler(this);
                    break;
                  case 'scroll':
                    this._eventHandler = new _handlers.ScrollHandler(this);
                    break;
                }
              }

              _createClass(Binding, [{
                key: 'genToken',
                value: function genToken() {
                  return parseInt(Math.random() * 10000000);
                }
              }, {
                key: '_initElTransforms',
                value: function _initElTransforms() {
                  var _options$props = this.options.props,
                      props = _options$props === undefined ? [] : _options$props;

                  var elTransforms = this.elTransforms;
                  props.forEach(function (prop) {
                    var element = prop.element;

                    if (!_simpleLodash2.default.find(elTransforms, function (o) {
                      return o.element === element;
                    })) {
                      elTransforms.push({
                        element: element,
                        transform: {
                          translateX: 0,
                          translateY: 0,
                          translateZ: 0,
                          scaleX: 1,
                          scaleY: 1,
                          scaleZ: 1,
                          rotateX: 0,
                          rotateY: 0,
                          rotateZ: 0
                        }
                      });
                    }
                  });
                }
              }, {
                key: 'getValue',
                value: function getValue(params, expression) {
                  return _expression2.default.execute(expression, (0, _objectAssign2.default)(_fn2.default, params));
                }

                // TODO scroll.contentOffset 待确认及补全

              }, {
                key: 'setProperty',
                value: function setProperty(el, property, val) {
                  var elTransform = _simpleLodash2.default.find(this.elTransforms, function (o) {
                    return o.element === el;
                  });
                  switch (property) {
                    case 'transform.translateX':
                      elTransform.transform.translateX = (0, _utils.px)(val);
                      break;
                    case 'transform.translateY':
                      elTransform.transform.translateY = (0, _utils.px)(val);
                      break;
                    case 'transform.translateZ':
                      elTransform.transform.translateZ = (0, _utils.px)(val);
                      break;
                    case 'transform.rotateX':
                      elTransform.transform.rotateX = val;
                      break;
                    case 'transform.rotateY':
                      elTransform.transform.rotateY = val;
                      break;
                    case 'transform.rotateZ':
                      elTransform.transform.rotateZ = val;
                      break;
                    case 'transform.rotate':
                      elTransform.transform.rotateZ = val;
                      break;
                    case 'transform.scaleX':
                      elTransform.transform.scaleX = val;
                      break;
                    case 'transform.scaleY':
                      elTransform.transform.scaleY = val;
                      break;
                    case 'transform.scale':
                      elTransform.transform.scaleX = val;
                      elTransform.transform.scaleY = val;
                      break;
                    case 'width':
                      el.style.width = (0, _utils.px)(val) + 'px';
                      break;
                    case 'height':
                      el.style.height = (0, _utils.px)(val) + 'px';
                      break;
                    case 'opacity':
                      el.style.opacity = val;
                      break;
                    case 'background-color':
                      el.style['background-color'] = val;
                      break;
                    case 'color':
                      el.style.color = val;
                      break;
                    case 'border-top-left-radius':
                    case 'border-top-right-radius':
                    case 'border-bottom-left-radius':
                    case 'border-bottom-right-radius':
                    case 'border-radius':
                      el.style[property] = (0, _utils.px)(val) + 'px';
                      break;
                  }
                  el.style[vendorTransform] = ['translateX(' + elTransform.transform.translateX + 'px)', 'translateY(' + elTransform.transform.translateY + 'px)', 'translateZ(' + elTransform.transform.translateZ + 'px)', 'scaleX(' + elTransform.transform.scaleX + ')', 'scaleY(' + elTransform.transform.scaleY + ')', 'rotateX(' + elTransform.transform.rotateX + 'deg)', 'rotateY(' + elTransform.transform.rotateY + 'deg)', 'rotateZ(' + elTransform.transform.rotateZ + 'deg)'].join(' ');
                }
              }, {
                key: 'destroy',
                value: function destroy() {
                  this._eventHandler.destroy();
                }
              }]);

              return Binding;
            }();

            module.exports = {
              _bindingInstances: [],
              /**
               * 绑定
               * @param options 参数
               * @example
               {
                 anchor:blockRef,
                 eventType:'pan',
                 props: [
                 {
                   element:blockRef,
                   property:'transform.translateX',
                   expression:{
                     origin:"x+1",
                     transformed:"{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":1}]}"
                   }
                 }
                ]
               }
               */
              bind: function bind(options) {
                var _this = this;

                var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

                if (!options) {
                  throw new Error('should pass options for binding');
                }
                var existInstances = _simpleLodash2.default.filter(this._bindingInstances, function (instance) {
                  if (options.anchor) {
                    return instance.options.anchor === options.anchor && instance.options.eventType === options.eventType;
                  }
                });
                // 销毁上次实例
                if (existInstances) {
                  _simpleLodash2.default.forEach(existInstances, function (inst) {
                    inst.destroy();
                    _this._bindingInstances = _simpleLodash2.default.dropWhile(_this._bindingInstances, function (bindInst) {
                      return bindInst === inst;
                    });
                  });
                }
                var binding = new Binding(options, callback);
                this._bindingInstances.push(binding);
                return { token: binding.token };
              },

              /**
               *  @param {object} options
               *  @example
               *  {eventType:'pan',
               *   token:self.gesToken}
               */
              unbind: function unbind(options) {
                if (!options) {
                  throw new Error('should pass options for binding');
                }
                var inst = _simpleLodash2.default.find(this._bindingInstances, function (instance) {
                  return instance.options.eventType === options.eventType && instance.token === options.token;
                });
                if (inst) {
                  inst.destroy();
                }
              },
              unbindAll: function unbindAll() {
                this._bindingInstances.forEach(function (inst) {
                  inst.destroy({
                    eventType: inst.options.eventType,
                    token: inst.token
                  });
                });
              },
              getComputedStyle: function getComputedStyle(elRef) {
                var computedStyle = window.getComputedStyle(elRef);
                var style = (0, _utils.matrixToTransformObj)(computedStyle[vendorTransform]);
                style.opacity = Number(computedStyle.opacity);
                style.width = (0, _utils.pxTo750)(computedStyle.width.replace('px', ''));
                style.height = (0, _utils.pxTo750)(computedStyle.height.replace('px', ''));
                style['background-color'] = computedStyle['background-color'];
                style.color = computedStyle.color;
                style.width = (0, _utils.pxTo750)(computedStyle.width.replace('px', ''));
                style.height = (0, _utils.pxTo750)(computedStyle.height.replace('px', ''));
                style['border-top-left-radius'] = (0, _utils.pxTo750)(computedStyle['border-top-left-radius'].replace('px', ''));
                style['border-top-right-radius'] = (0, _utils.pxTo750)(computedStyle['border-top-right-radius'].replace('px', ''));
                style['border-bottom-left-radius'] = (0, _utils.pxTo750)(computedStyle['border-bottom-left-radius'].replace('px', ''));
                style['border-bottom-right-radius'] = (0, _utils.pxTo750)(computedStyle['border-bottom-right-radius'].replace('px', ''));
                return style;
              }
            };

            /***/
          },
          /* 9 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            function toNumber(value) {
              return Number(value);
            }

            function toBoolean(value) {
              return !!value;
            }

            function equal(v1, v2) {
              return v1 == v2;
            }

            function strictlyEqual(v1, v2) {
              return v1 === v2;
            }

            function execute(node, scope) {

              var type = node.type;
              var children = node.children;
              switch (type) {
                case 'StringLiteral':
                  return String(node.value);
                case 'NumericLiteral':
                  return parseFloat(node.value);
                case 'BooleanLiteral':
                  return !!node.value;
                case 'Identifier':
                  return scope[node.value];
                case 'CallExpression':
                  var fn = execute(children[0], scope);
                  // console.log('fn:',fn)
                  var args = [];
                  var jsonArguments = children[1].children;
                  for (var i = 0; i < jsonArguments.length; i++) {
                    args.push(execute(jsonArguments[i], scope));
                  }
                  return fn.apply(null, args);
                case '?':
                  if (execute(children[0], scope)) {
                    return execute(children[1], scope);
                  }
                  return execute(children[2], scope);
                case '+':
                  return toNumber(execute(children[0], scope)) + toNumber(execute(children[1], scope));
                case '-':
                  return toNumber(execute(children[0], scope)) - toNumber(execute(children[1], scope));
                case '*':
                  return toNumber(execute(children[0], scope)) * toNumber(execute(children[1], scope));
                case '/':
                  return toNumber(execute(children[0], scope)) / toNumber(execute(children[1], scope));
                case '%':
                  return toNumber(execute(children[0], scope)) % toNumber(execute(children[1], scope));
                case '**':
                  return Math.pow(toNumber(execute(children[0], scope)), toNumber(execute(children[1], scope)));

                case '>':
                  return toNumber(execute(children[0], scope)) > toNumber(execute(children[1], scope));
                case '<':
                  return toNumber(execute(children[0], scope)) < toNumber(execute(children[1], scope));
                case '>=':
                  return toNumber(execute(children[0], scope)) >= toNumber(execute(children[1], scope));
                case '<=':
                  return toNumber(execute(children[0], scope)) <= toNumber(execute(children[1], scope));

                case '==':
                  return equal(execute(children[0], scope), execute(children[1], scope));
                case '===':
                  return strictlyEqual(execute(children[0], scope), execute(children[1], scope));
                case '!=':
                  return !equal(execute(children[0], scope), execute(children[1], scope));
                case '!==':
                  return !strictlyEqual(execute(children[0], scope), execute(children[1], scope));

                case '&&':
                  var result = void 0;
                  result = execute(children[0], scope);
                  if (!toBoolean(result)) return result;
                  return execute(children[1], scope);
                case '||':
                  result = execute(children[0], scope);
                  if (toBoolean(result)) return result;
                  return execute(children[1], scope);
                case '!':
                  return !toBoolean(execute(children[0], scope));

              }
              return null;
            }

            exports.default = {
              execute: execute
            };

            /***/
          },
          /* 10 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.ScrollHandler = exports.TimingHandler = exports.OrientationHandler = exports.PanHandler = undefined;

            var _pan = __webpack_require__(11);

            var _pan2 = _interopRequireDefault(_pan);

            var _orientation = __webpack_require__(13);

            var _orientation2 = _interopRequireDefault(_orientation);

            var _timing = __webpack_require__(16);

            var _timing2 = _interopRequireDefault(_timing);

            var _scroll = __webpack_require__(17);

            var _scroll2 = _interopRequireDefault(_scroll);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            exports.PanHandler = _pan2.default;
            exports.OrientationHandler = _orientation2.default;
            exports.TimingHandler = _timing2.default;
            exports.ScrollHandler = _scroll2.default;

            /***/
          },
          /* 11 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            var _pan = __webpack_require__(12);

            var _pan2 = _interopRequireDefault(_pan);

            var _common = __webpack_require__(3);

            var _common2 = _interopRequireDefault(_common);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
              }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var PanHandler = function (_CommonHandler) {
              _inherits(PanHandler, _CommonHandler);

              function PanHandler(binding) {
                _classCallCheck(this, PanHandler);

                var _this = _possibleConstructorReturn(this, (PanHandler.__proto__ || Object.getPrototypeOf(PanHandler)).call(this, binding));

                _this._onPan = function (e) {
                  var x = e.deltaX;
                  var y = e.deltaY;
                  var _this$binding$options = _this.binding.options.props,
                      props = _this$binding$options === undefined ? [] : _this$binding$options;

                  props.forEach(function (prop) {
                    var element = prop.element,
                        property = prop.property,
                        expression = prop.expression;

                    var transformed = JSON.parse(expression.transformed);
                    var val = _this.binding.getValue({ x: x, y: y }, transformed);
                    _this.binding.setProperty(element, property, val);
                  });
                };

                _this._onPanStart = function () {
                  _this.binding.callback({ deltaX: 0, state: 'start', deltaY: 0 });
                };

                _this._onPanEnd = function (e) {
                  _this.binding.callback({ deltaX: parseInt(e.deltaX), state: 'end', deltaY: parseInt(e.deltaY) });
                };

                var anchor = binding.options.anchor;

                var panGesture = _this.panGesture = new _pan2.default(anchor, binding.options.options);
                panGesture.on('pan', _this._onPan);
                panGesture.on('panstart', _this._onPanStart);
                panGesture.on('panend', _this._onPanEnd);
                return _this;
              }

              _createClass(PanHandler, [{
                key: 'destroy',
                value: function destroy() {
                  var panGesture = this.panGesture;
                  panGesture.off('pan', this._onPan);
                  panGesture.off('panstart', this._onPanStart);
                  panGesture.off('panend', this._onPanEnd);
                  panGesture.destroy();
                }
              }]);

              return PanHandler;
            }(_common2.default);

            exports.default = PanHandler;
            ;

            /***/
          },
          /* 12 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            var _simpleLodash = __webpack_require__(1);

            var _simpleLodash2 = _interopRequireDefault(_simpleLodash);

            var _objectAssign = __webpack_require__(0);

            var _objectAssign2 = _interopRequireDefault(_objectAssign);

            var _utils = __webpack_require__(2);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            var abs = Math.abs;

            var DEFAULT_CONFIG = {
              thresholdX: 10,
              thresholdY: 10,
              touchAction: 'auto',
              touchActionRatio: 1 / 2
            };

            var PanGesture = function () {
              function PanGesture(el, config) {
                var _this = this;

                _classCallCheck(this, PanGesture);

                this.startX = null;
                this.startY = null;
                this.panStartX = null;
                this.panStartY = null;
                this.deltaX = 0;
                this.deltaY = 0;
                this.events = {
                  'panstart': [],
                  'pan': [],
                  'panend': [],
                  'pancancel': []
                };

                this.onTouchStart = function (e) {
                  // e.preventDefault();
                };

                this.handlePanStart = function (e) {
                  e.preventDefault();
                  if (_this.panStartX === null || _this.panStartY === null) {
                    _this.panStartX = (0, _utils.pxTo750)(e.touches[0].pageX);
                    _this.panStartY = (0, _utils.pxTo750)(e.touches[0].pageY);
                    _this.events.panstart.forEach(function (handler) {
                      handler(e);
                    });
                    return;
                  }
                };

                this.onTouchMove = function (e) {
                  var _config = _this.config,
                      thresholdX = _config.thresholdX,
                      thresholdY = _config.thresholdY,
                      touchAction = _config.touchAction,
                      touchActionRatio = _config.touchActionRatio;

                  if (_this.startX === null || _this.startY === null) {
                    _this.startX = e.touches[0].pageX;
                    _this.startY = e.touches[0].pageY;
                  }
                  var dx = e.touches[0].pageX - _this.startX;
                  var dy = e.touches[0].pageY - _this.startY;

                  switch (touchAction) {
                    case 'auto':
                      e.preventDefault();
                      if (abs(dx) >= thresholdX || abs(dy) >= thresholdY) {
                        _this.handlePanStart(e);
                      }
                      break;
                    case 'pan-x':
                      if (abs(dx) >= thresholdX && abs(dy / dx) < touchActionRatio && abs(dy) < thresholdY) {
                        _this.handlePanStart(e);
                      }
                      break;
                    case 'pan-y':
                      if (abs(dy) >= thresholdY && abs(dx / dy) < touchActionRatio && abs(dx) < thresholdX) {
                        _this.handlePanStart(e);
                      }
                      break;
                  }

                  if (_this.panStartX !== null && _this.panStartY !== null) {
                    switch (touchAction) {
                      case 'auto':
                        _this.deltaX = (0, _utils.pxTo750)(e.touches[0].pageX) - _this.panStartX;
                        _this.deltaY = (0, _utils.pxTo750)(e.touches[0].pageY) - _this.panStartY;
                        break;
                      case 'pan-x':
                        _this.deltaX = (0, _utils.pxTo750)(e.touches[0].pageX) - _this.panStartX;
                        _this.deltaY = 0;
                        break;
                      case 'pan-y':
                        _this.deltaX = 0;
                        _this.deltaY = (0, _utils.pxTo750)(e.touches[0].pageY) - _this.panStartY;
                        break;
                    }
                    e.deltaX = _this.deltaX;
                    e.deltaY = _this.deltaY;
                    _this.events.pan.forEach(function (handler) {
                      handler(e);
                    });
                  }
                };

                this.onTouchEnd = function (e) {
                  e.deltaX = _this.deltaX;
                  e.deltaY = _this.deltaY;
                  _this.events.panend.forEach(function (handler) {
                    handler(e);
                  });
                };

                this.onTouchCancel = function (e) {
                  e.deltaX = _this.deltaX;
                  e.deltaY = _this.deltaY;
                  _this.events.pancancel.forEach(function (handler) {
                    handler(e);
                  });
                };

                this.el = el;
                this.config = (0, _objectAssign2.default)(DEFAULT_CONFIG, config);
                this.el.addEventListener('touchstart', this.onTouchStart);
                this.el.addEventListener('touchmove', this.onTouchMove);
                this.el.addEventListener('touchend', this.onTouchEnd);
                this.el.addEventListener('touchcancel', this.onTouchCancel);
              }

              _createClass(PanGesture, [{
                key: 'on',
                value: function on(fn, handler) {
                  if (!this.events[fn]) return;
                  this.events[fn].push(handler);
                }
              }, {
                key: 'destroy',
                value: function destroy() {
                  this.el.removeEventListener('touchstart', this.onTouchStart);
                  this.el.removeEventListener('touchmove', this.onTouchMove);
                  this.el.removeEventListener('touchend', this.onTouchEnd);
                  this.el.removeEventListener('touchcancel', this.onTouchCancel);
                  this.offAll();
                  this.startX = null;
                  this.startY = null;
                  this.panStartX = null;
                  this.panStartY = null;
                }
              }, {
                key: 'offAll',
                value: function offAll() {
                  var _this2 = this;

                  _simpleLodash2.default.map(this.events, function (handlers, fn) {
                    _simpleLodash2.default.forEach(handlers, function (handler) {
                      _this2.off(fn, handler);
                    });
                  });
                }
              }, {
                key: 'off',
                value: function off(fn, handler) {
                  if (!fn) return;
                  if (fn && this.events[fn] && this.events[fn].length) {
                    if (!handler) return;
                    var h = _simpleLodash2.default.find(this.events[fn], function (o) {
                      return o === handler;
                    });
                    var i = _simpleLodash2.default.findIndex(this.events[fn], function (o) {
                      return o === handler;
                    });
                    if (h) {
                      this.events[fn].splice(i, 1);
                    }
                  }
                }
              }]);

              return PanGesture;
            }();

            exports.default = PanGesture;

            /***/
          },
          /* 13 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            var _vector = __webpack_require__(5);

            var _vector2 = _interopRequireDefault(_vector);

            var _orientation_controls = __webpack_require__(14);

            var _orientation_controls2 = _interopRequireDefault(_orientation_controls);

            var _math = __webpack_require__(7);

            var _math2 = _interopRequireDefault(_math);

            var _animationUtil = __webpack_require__(4);

            var _common = __webpack_require__(3);

            var _common2 = _interopRequireDefault(_common);

            var _objectAssign = __webpack_require__(0);

            var _objectAssign2 = _interopRequireDefault(_objectAssign);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
              }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var OrientationHandler = function (_CommonHandler) {
              _inherits(OrientationHandler, _CommonHandler);

              function OrientationHandler(binding) {
                _classCallCheck(this, OrientationHandler);

                var _this = _possibleConstructorReturn(this, (OrientationHandler.__proto__ || Object.getPrototypeOf(OrientationHandler)).call(this, binding));

                _this.binding = null;
                _this.control = null;
                _this.start = null;
                _this.timer = null;

                _this._onOrientation = function (e) {
                  var props = _this.binding.options.props;

                  props.forEach(function (prop) {
                    var element = prop.element,
                        property = prop.property,
                        expression = prop.expression;

                    var transformed = JSON.parse(expression.transformed);
                    var val = _this.binding.getValue(e, transformed);
                    _this.binding.setProperty(element, property, val);
                  });
                };

                _this.options = (0, _objectAssign2.default)({
                  sceneType: '2d'
                }, binding.options.options);
                _this.binding = binding;
                if (_this.options.sceneType.toLowerCase() === '2d') {
                  _this.controlX = new _orientation_controls2.default({ beta: 90 });
                  _this.controlY = new _orientation_controls2.default({ gamma: 90, alpha: 0 });
                } else {
                  _this.control = new _orientation_controls2.default();
                }
                _this.run();
                return _this;
              }

              _createClass(OrientationHandler, [{
                key: 'run',
                value: function run() {
                  var _this2 = this;

                  // 2d场景
                  if (this.options.sceneType.toLowerCase() === '2d') {
                    this.controlX.update();
                    this.controlY.update();
                    var _controlX$deviceOrien = this.controlX.deviceOrientation,
                        alpha = _controlX$deviceOrien.alpha,
                        beta = _controlX$deviceOrien.beta,
                        gamma = _controlX$deviceOrien.gamma,
                        dalpha = _controlX$deviceOrien.dalpha,
                        dbeta = _controlX$deviceOrien.dbeta,
                        dgamma = _controlX$deviceOrien.dgamma;

                    var vecX = new _vector2.default(0, 0, 1);
                    vecX.applyQuaternion(this.controlX.quaternion);
                    var vecY = new _vector2.default(0, 1, 1);
                    vecY.applyQuaternion(this.controlY.quaternion);
                    // 0,180 -> -90,90
                    var x = _math2.default.radToDeg(Math.acos(vecX.x)) - 90;
                    var y = _math2.default.radToDeg(Math.acos(vecY.y)) - 90;
                    if (!this.start && !isNaN(x) && !isNaN(y)) {
                      this.start = {
                        x: x,
                        y: y
                      };
                    }
                    if (this.start) {
                      var dx = x - this.start.x;
                      var dy = y - this.start.y;
                      this._onOrientation({
                        x: x, y: y, dx: dx, dy: dy, alpha: alpha, beta: beta, gamma: gamma, dalpha: dalpha, dbeta: dbeta, dgamma: dgamma
                      });
                    }
                  } else {
                    // 3d场景
                    this.control.update();
                    var _control$deviceOrient = this.control.deviceOrientation,
                        _alpha = _control$deviceOrient.alpha,
                        _beta = _control$deviceOrient.beta,
                        _gamma = _control$deviceOrient.gamma,
                        _dalpha = _control$deviceOrient.dalpha,
                        _dbeta = _control$deviceOrient.dbeta,
                        _dgamma = _control$deviceOrient.dgamma;
                    var _control$quaternion = this.control.quaternion,
                        _x = _control$quaternion.x,
                        _y = _control$quaternion.y,
                        z = _control$quaternion.z;

                    this._onOrientation({ alpha: _alpha, beta: _beta, gamma: _gamma, dalpha: _dalpha, dbeta: _dbeta, dgamma: _dgamma, x: _x, y: _y, z: z });
                  }
                  this.timer = (0, _animationUtil.raf)(function () {
                    _this2.run();
                  });
                }
              }, {
                key: 'destroy',
                value: function destroy() {
                  if (this.timer) {
                    (0, _animationUtil.cancelRAF)(this.timer);
                    this.timer = null;
                  }
                }
              }]);

              return OrientationHandler;
            }(_common2.default);

            exports.default = OrientationHandler;

            /***/
          },
          /* 14 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _quaternion = __webpack_require__(6);

            var _quaternion2 = _interopRequireDefault(_quaternion);

            var _vector = __webpack_require__(5);

            var _vector2 = _interopRequireDefault(_vector);

            var _euler = __webpack_require__(15);

            var _euler2 = _interopRequireDefault(_euler);

            var _math = __webpack_require__(7);

            var _math2 = _interopRequireDefault(_math);

            var _objectAssign = __webpack_require__(0);

            var _objectAssign2 = _interopRequireDefault(_objectAssign);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function isNaNOrUndefined(n) {
              return n === undefined || isNaN(n) || n === null;
            }

            function DeviceOrientationControls(object) {
              var scope = this;
              this.object = (0, _objectAssign2.default)({
                alphaOffsetAngle: 0,
                betaOffsetAngle: 0,
                gammaOffsetAngle: 0
              }, object);

              this.alphaOffsetAngle = this.object.alphaOffsetAngle;
              this.betaOffsetAngle = this.object.betaOffsetAngle;
              this.gammaOffsetAngle = this.object.gammaOffsetAngle;

              this.quaternion = new _quaternion2.default(0, 0, 0, 1);
              this.enabled = true;
              this.deviceOrientation = {};
              this.screenOrientation = 0;
              this.start = null;

              this.recordsAlpha = [];

              function formatRecords(records, threshold) {
                var l = records.length;
                var times = 0;
                if (l > 1) {
                  for (var i = 0; i < l; i++) {
                    if (records[i - 1] != undefined && records[i] != undefined) {
                      if (records[i] - records[i - 1] < -threshold / 2) {
                        times = Math.floor(records[i - 1] / threshold) + 1;
                        records[i] = records[i] + times * threshold;
                      }
                      if (records[i] - records[i - 1] > threshold / 2) {
                        records[i] = records[i] - threshold;
                      }
                    }
                  }
                }
                return records;
              }

              var onDeviceOrientationChangeEvent = function onDeviceOrientationChangeEvent(e) {

                var alpha = e.alpha;
                var beta = e.beta;
                var gamma = e.gamma;
                var recordsAlpha = scope.recordsAlpha;

                if (!scope.start) {
                  scope.start = {
                    alpha: alpha,
                    beta: beta,
                    gamma: gamma
                  };
                }
                recordsAlpha.push(alpha);
                if (recordsAlpha.length > 5) {
                  recordsAlpha = formatRecords(recordsAlpha, 360);
                  recordsAlpha.shift();
                }

                var formatAlpha = (recordsAlpha[recordsAlpha.length - 1] - scope.start.alpha) % 360;
                if (!isNaNOrUndefined(alpha) && !isNaNOrUndefined(beta) && !isNaNOrUndefined(gamma)) {
                  scope.enabled = true;
                }

                scope.deviceOrientation = {
                  alpha: alpha,
                  beta: beta,
                  gamma: gamma,
                  formatAlpha: formatAlpha,
                  dalpha: alpha - scope.start.alpha,
                  dbeta: beta - scope.start.beta,
                  dgamma: gamma - scope.start.gamma
                };
              };

              var onScreenOrientationChangeEvent = function onScreenOrientationChangeEvent() {

                scope.screenOrientation = window.orientation || 0;
              };

              // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

              var setObjectQuaternion = function () {

                var zee = new _vector2.default(0, 0, 1);

                var euler = new _euler2.default();

                var q0 = new _quaternion2.default();

                var q1 = new _quaternion2.default(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis

                return function (quaternion, alpha, beta, gamma, orient) {

                  euler.set(beta, alpha, -gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us

                  quaternion.setFromEuler(euler); // orient the device

                  quaternion.multiply(q1); // camera looks out the back of the device, not the top

                  quaternion.multiply(q0.setFromAxisAngle(zee, -orient)); // adjust for screen orientation
                };
              }();

              this.connect = function () {
                onScreenOrientationChangeEvent(); // run once on load
                window.addEventListener('orientationchange', onScreenOrientationChangeEvent, false);
                window.addEventListener('deviceorientation', onDeviceOrientationChangeEvent, false);
              };

              this.disconnect = function () {
                window.removeEventListener('orientationchange', onScreenOrientationChangeEvent, false);
                window.removeEventListener('deviceorientation', onDeviceOrientationChangeEvent, false);
                scope.enabled = false;
              };

              this.update = function () {
                if (scope.enabled === false) return;
                var alpha = !isNaNOrUndefined(scope.deviceOrientation.formatAlpha) ? _math2.default.degToRad(!isNaNOrUndefined(scope.object.alpha) ? scope.object.alpha : scope.deviceOrientation.formatAlpha + scope.alphaOffsetAngle) : 0; // Z
                var beta = !isNaNOrUndefined(scope.deviceOrientation.beta) ? _math2.default.degToRad(!isNaNOrUndefined(scope.object.beta) ? scope.object.beta : scope.deviceOrientation.beta + scope.betaOffsetAngle) : 0; // X'
                var gamma = !isNaNOrUndefined(scope.deviceOrientation.gamma) ? _math2.default.degToRad(!isNaNOrUndefined(scope.object.gamma) ? scope.object.gamma : scope.deviceOrientation.gamma + scope.gammaOffsetAngle) : 0; // Y''
                var orient = scope.screenOrientation ? _math2.default.degToRad(scope.screenOrientation) : 0; // O
                setObjectQuaternion(scope.quaternion, alpha, beta, gamma, orient);
              };

              this.updateAlphaOffsetAngle = function (angle) {
                this.alphaOffsetAngle = angle;
                this.update();
              };
              this.updateBetaOffsetAngle = function (angle) {
                this.betaOffsetAngle = angle;
                this.update();
              };
              this.updateGammaOffsetAngle = function (angle) {
                this.gammaOffsetAngle = angle;
                this.update();
              };

              this.dispose = function () {
                this.disconnect();
              };

              this.connect();
            };

            exports.default = DeviceOrientationControls;

            /***/
          },
          /* 15 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            var Euler = function () {
              function Euler(x, y, z, order) {
                _classCallCheck(this, Euler);

                this.isEuler = true;
                this._x = 0;
                this._y = 0;
                this._z = 0;

                this._x = x || 0;
                this._y = y || 0;
                this._z = z || 0;
                this._order = order || Euler.DefaultOrder;
              }

              _createClass(Euler, [{
                key: 'set',
                value: function set(x, y, z, order) {
                  this._x = x;
                  this._y = y;
                  this._z = z;
                  this._order = order || this._order;
                  this.onChangeCallback();
                  return this;
                }
              }, {
                key: 'onChange',
                value: function onChange(callback) {
                  this.onChangeCallback = callback;
                  return this;
                }
              }, {
                key: 'onChangeCallback',
                value: function onChangeCallback() {}
              }, {
                key: 'order',
                get: function get() {
                  return this._order;
                },
                set: function set(value) {
                  this._order = value;
                  this.onChangeCallback();
                }
              }]);

              return Euler;
            }();

            Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
            Euler.DefaultOrder = 'XYZ';
            exports.default = Euler;

            /***/
          },
          /* 16 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _extends = Object.assign || function (target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                  }
                }
              }return target;
            };

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            var _animationUtil = __webpack_require__(4);

            var _animationUtil2 = _interopRequireDefault(_animationUtil);

            var _common = __webpack_require__(3);

            var _common2 = _interopRequireDefault(_common);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
              }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var TimingHandler = function (_CommonHandler) {
              _inherits(TimingHandler, _CommonHandler);

              function TimingHandler(binding) {
                _classCallCheck(this, TimingHandler);

                var _this = _possibleConstructorReturn(this, (TimingHandler.__proto__ || Object.getPrototypeOf(TimingHandler)).call(this, binding));

                var _this$binding$options = _this.binding.options,
                    _this$binding$options2 = _this$binding$options.props,
                    props = _this$binding$options2 === undefined ? [] : _this$binding$options2,
                    exitExpression = _this$binding$options.exitExpression;

                props.forEach(function (prop) {
                  var expression = prop.expression;

                  if (expression && expression.transformed && typeof expression.transformed === 'string') {
                    expression.transformed = JSON.parse(expression.transformed);
                  }
                });

                var exitTransformed = void 0;
                if (exitExpression && exitExpression.transformed) {
                  exitTransformed = JSON.parse(exitExpression.transformed);
                }

                var animation = _this.animation = new _animationUtil2.default({
                  duration: Infinity,
                  easing: 'linear',
                  onStart: function onStart() {
                    _this.binding.callback({ state: 'start', t: 0 });
                  },
                  onRun: function onRun(e) {
                    if (exitTransformed && _this.binding.getValue({ t: e.t }, exitTransformed)) {
                      _this.animation.stop();
                    }
                    props.forEach(function (prop) {
                      _this.animate(_extends({
                        exitTransformed: exitTransformed,
                        t: e.t
                      }, prop));
                    });
                  },
                  onStop: function onStop(e) {
                    _this.binding.callback({ state: 'exit', t: e.t - 1000 / 60 });
                  }
                });
                animation.run();
                return _this;
              }

              _createClass(TimingHandler, [{
                key: 'animate',
                value: function animate(args) {
                  var element = args.element,
                      property = args.property,
                      expression = args.expression,
                      t = args.t;

                  var value = this.binding.getValue({ t: t }, expression.transformed);
                  this.binding.setProperty(element, property, value);
                }
              }, {
                key: 'destroy',
                value: function destroy() {
                  if (this.animation) {
                    this.animation.stop();
                  }
                }
              }]);

              return TimingHandler;
            }(_common2.default);

            exports.default = TimingHandler;

            /***/
          },
          /* 17 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
              }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
            }();

            var _common = __webpack_require__(3);

            var _common2 = _interopRequireDefault(_common);

            var _utils = __webpack_require__(2);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            function _possibleConstructorReturn(self, call) {
              if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
              if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
              }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            function isTurner(prev, now) {

              return prev / now < 0;
            }

            var ScrollHandler = function (_CommonHandler) {
              _inherits(ScrollHandler, _CommonHandler);

              function ScrollHandler(binding) {
                _classCallCheck(this, ScrollHandler);

                var _this = _possibleConstructorReturn(this, (ScrollHandler.__proto__ || Object.getPrototypeOf(ScrollHandler)).call(this, binding));

                _this.dx = 0;
                _this.dy = 0;
                _this.prevX = null;
                _this.prevY = null;
                _this.tx = 0;
                _this.ty = 0;
                _this.tdx = 0;
                _this.tdy = 0;

                _this._onScroll = function (e) {
                  var props = _this.binding.options.props;

                  var callback = _this.binding.callback;
                  var x = (0, _utils.pxTo750)(e.target.scrollLeft);
                  var y = (0, _utils.pxTo750)(e.target.scrollTop);
                  props.forEach(function (prop) {
                    var element = prop.element,
                        property = prop.property,
                        expression = prop.expression;

                    var transformed = JSON.parse(expression.transformed);
                    var val = _this.binding.getValue({
                      x: x,
                      y: y,
                      dx: _this.dx,
                      dy: _this.dy,
                      tdx: _this.tdx,
                      tdy: _this.tdy
                    }, transformed);

                    _this.binding.setProperty(element, property, val);
                  });

                  if (_this.prevX !== null && _this.prevY !== null) {
                    var dx = x - _this.prevX;
                    var dy = y - _this.prevY;
                    var cbParams = {
                      x: x,
                      y: y
                    };
                    // 拐点
                    if (isTurner(_this.dx, dx)) {
                      _this.tx = x;
                      cbParams.state = 'turn';
                    }
                    if (isTurner(_this.dy, dy)) {
                      _this.ty = y;
                      cbParams.state = 'turn';
                    }

                    _this.dx = cbParams.dx = x - _this.prevX;
                    _this.dy = cbParams.dy = y - _this.prevY;
                    _this.tdx = cbParams.tdx = x - _this.tx;
                    _this.tdy = cbParams.tdy = y - _this.ty;
                    if (cbParams.state) {
                      callback(cbParams);
                    }
                  }

                  _this.prevX = x;
                  _this.prevY = y;
                };

                var anchor = binding.options.anchor;

                _this.tx = (0, _utils.pxTo750)(anchor.scrollLeft);
                _this.ty = (0, _utils.pxTo750)(anchor.scrollTop);
                anchor.addEventListener('scroll', _this._onScroll);
                return _this;
              }

              _createClass(ScrollHandler, [{
                key: 'destroy',
                value: function destroy() {
                  var anchor = this.binding.options.anchor;

                  anchor.removeEventListener('scroll', this._onScroll);
                }
              }]);

              return ScrollHandler;
            }(_common2.default);

            exports.default = ScrollHandler;

            /***/
          },
          /* 18 */
          /***/function (module, exports, __webpack_require__) {

            "use strict";
            /**
             Copyright 2018 Alibaba Group
            
             Licensed under the Apache License, Version 2.0 (the "License");
             you may not use this file except in compliance with the License.
             You may obtain a copy of the License at
            
             http://www.apache.org/licenses/LICENSE-2.0
            
             Unless required by applicable law or agreed to in writing, software
             distributed under the License is distributed on an "AS IS" BASIS,
             WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
             See the License for the specific language governing permissions and
             limitations under the License.
             */

            Object.defineProperty(exports, "__esModule", {
              value: true
            });

            var _simpleLodash = __webpack_require__(1);

            var _simpleLodash2 = _interopRequireDefault(_simpleLodash);

            var _animationUtil = __webpack_require__(4);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : { default: obj };
            }

            // inset function
            function colorToDecimal(hexColor) {
              var hex = hexColor.replace(/'|"|#/g, '');
              return parseInt(hex, 16);
            }

            function decToHex(dec) {
              var hex = dec.toString(16);
              var a = [];
              for (var i = 0; i < 6 - hex.length; i++) {
                a.push('0');
              }
              return a.join('') + hex;
            }

            function parseColor(hexColor) {
              var hex = hexColor.replace(/'|"|#/g, '');
              hex = hex.length === 3 ? [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]].join('') : hex;
              var r = '' + hex[0] + hex[1];
              var g = '' + hex[2] + hex[3];
              var b = '' + hex[4] + hex[5];
              return {
                r: r,
                g: g,
                b: b,
                dr: colorToDecimal(r),
                dg: colorToDecimal(g),
                db: colorToDecimal(b)
              };
            }

            var Fn = {
              max: Math.max,
              min: Math.min,
              sin: Math.sin,
              cos: Math.cos,
              tan: Math.tan,
              sqrt: Math.sqrt,
              cbrt: Math.cbrt,
              log: Math.log,
              abs: Math.abs,
              atan: Math.atan,
              floor: Math.floor,
              ceil: Math.ceil,
              pow: Math.pow,
              exp: Math.exp,
              PI: Math.PI,
              E: Math.E,
              acos: Math.acos,
              asin: Math.asin,
              sign: Math.sign,
              atan2: Math.atan2,
              round: Math.round,
              rgb: function rgb(r, g, b) {
                return 'rgb(' + parseInt(r) + ',' + parseInt(g) + ',' + parseInt(b) + ')';
              },
              rgba: function rgba(r, g, b, a) {
                return 'rgb(' + parseInt(r) + ',' + parseInt(g) + ',' + parseInt(b) + ',' + a + ')';
              },
              getArgs: function getArgs() {
                return arguments;
              },
              evaluateColor: function evaluateColor(colorFrom, colorTo, percent) {
                percent = percent > 1 ? 1 : percent;
                var from = parseColor(colorFrom);
                var to = parseColor(colorTo);
                var dr = parseInt((to.dr - from.dr) * percent + from.dr);
                var dg = parseInt((to.dg - from.dg) * percent + from.dg);
                var db = parseInt((to.db - from.db) * percent + from.db);
                var resDec = dr * 16 * 16 * 16 * 16 + dg * 16 * 16 + db;
                return '#' + decToHex(resDec);
              }
            };

            // inset all easing functions
            _simpleLodash2.default.map(_animationUtil.Easing, function (v, k) {
              if (k !== 'cubicBezier') {
                Fn[k] = function (t, begin, offset, duration) {
                  t = Math.max(Math.min(t / duration, 1));
                  return v(t) * offset + begin;
                };
              }
            });

            Fn.cubicBezier = function (t, begin, offset, duration, x1, y1, x2, y2) {
              t = Math.max(Math.min(t / duration, 1));
              var epsilon = 1000 / 60 / duration / 4;
              return (0, _animationUtil.Bezier)(x1, y1, x2, y2, epsilon)(t) * offset + begin; // eslint-disable-line
            };

            exports.default = Fn;

            /***/
          }]
          /******/)
        );
      });

      /***/
    }]
    /******/)
  );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(201);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(153);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(306)
)

/* script */
__vue_exports__ = __webpack_require__(307)

/* template */
var __vue_template__ = __webpack_require__(308)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-rich-text/wxc-rich-text-text.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-692c35db"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(372);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCache = getCache;
exports.removeCache = removeCache;
exports.setCache = setCache;
function getCache(key) {
    var storage = weex.requireModule('storage');
    return new Promise(function (resolve) {
        try {
            storage.getItem(key, function (e) {
                if (e.result === 'success') {
                    resolve(e.data);
                } else {
                    resolve(null);
                }
            });
        } catch (e) {
            console.log(e);
            resolve(null);
        }
    });
}

function removeCache(key) {
    var storage = weex.requireModule('storage');
    storage.removeItem(key);
}

function setCache(key, value) {
    var storage = weex.requireModule('storage');
    return new Promise(function (resolve) {
        try {
            storage.setItem(key, value);
            resolve(true);
        } catch (e) {
            console.log(e);
            resolve(false);
        }
    });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(167);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(172);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(177);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(184)
)

/* script */
__vue_exports__ = __webpack_require__(185)

/* template */
var __vue_template__ = __webpack_require__(187)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-checkbox/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-9901646e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(235);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by Tw93 on 2016/10/29.
 */

var GIF = exports.GIF = 'https://img.alicdn.com/tfs/TB1aks3PpXXXXcXXFXXXXXXXXXX-150-150.gif';
var BLACK_GIF = exports.BLACK_GIF = 'https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif';
var PART = exports.PART = 'https://gtms02.alicdn.com/tfs/TB1y4QbSXXXXXbgapXXXXXXXXXX-50-50.gif';

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(249);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(316)
)

/* script */
__vue_exports__ = __webpack_require__(317)

/* template */
var __vue_template__ = __webpack_require__(318)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-rich-text/wxc-rich-text-tag.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4b0ae448"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SUCCESS = exports.NETWORK_JSON_EXCEPTION = exports.NETWORK_TIMEOUT = exports.NETWORK_ERROR = exports.CONTENT_TYPE_FORM = exports.CONTENT_TYPE_JSON = undefined;

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constant = __webpack_require__(2);

var _storageUtils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONTENT_TYPE_JSON = exports.CONTENT_TYPE_JSON = "application/json";
var CONTENT_TYPE_FORM = exports.CONTENT_TYPE_FORM = "application/x-www-form-urlencoded";

//网络错误
var NETWORK_ERROR = exports.NETWORK_ERROR = 1;
//网络超时
var NETWORK_TIMEOUT = exports.NETWORK_TIMEOUT = 2;
//网络返回数据格式化一次
var NETWORK_JSON_EXCEPTION = exports.NETWORK_JSON_EXCEPTION = 3;

var SUCCESS = exports.SUCCESS = 200;

var HttpManager = function () {
    function HttpManager() {
        _classCallCheck(this, HttpManager);

        this.optionParams = {
            timeoutMs: 15000,
            token: null,
            authorizationCode: null
        };
    }

    _createClass(HttpManager, [{
        key: 'getFetch',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, header, type) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', this.netFetch(url, 'GET', null, null, header, type));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getFetch(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return getFetch;
        }()
    }, {
        key: 'netFetch',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
                var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
                var params = arguments[2];
                var json = arguments[3];
                var header = arguments[4];
                var type = arguments[5];
                var isConnected, headers, authorizationCode, requestParams, response, responseJson;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                //let isConnected = await NetInfo.isConnected.fetch().done;
                                isConnected = true;

                                if (isConnected) {
                                    _context2.next = 3;
                                    break;
                                }

                                return _context2.abrupt('return', {
                                    /*result: false,
                                    code: Code.NETWORK_ERROR,
                                    msg: I18n('netError')*/
                                });

                            case 3:
                                headers = {};

                                if (header) {
                                    headers = Object.assign({}, headers, header);
                                }

                                //授权码

                                if (this.optionParams.authorizationCode) {
                                    _context2.next = 10;
                                    break;
                                }

                                _context2.next = 8;
                                return this.getAuthorization();

                            case 8:
                                authorizationCode = _context2.sent;

                                if (authorizationCode) {
                                    this.optionParams.authorizationCode = authorizationCode;
                                }

                            case 10:
                                requestParams = void 0;


                                headers.Authorization = this.optionParams.authorizationCode;

                                if (method !== 'GET') {
                                    if (json) {
                                        requestParams = this.formParamsJson(method, params, headers);
                                    } else {
                                        requestParams = this.formParams(method, params, headers);
                                    }
                                } else {
                                    requestParams = this.formParams(method, params, headers);
                                }

                                _context2.next = 15;
                                return this.requestWithTimeout(this.optionParams.timeoutMs, this.fetch(url, requestParams, type));

                            case 15:
                                response = _context2.sent;


                                if (_constant.DEBUG) {
                                    console.info('请求url: ', url);
                                    console.info('请求参数: ', requestParams);
                                    console.info('返回参数: ', response);
                                }

                                if (!(response && response.status === NETWORK_TIMEOUT)) {
                                    _context2.next = 19;
                                    break;
                                }

                                return _context2.abrupt('return', {
                                    result: false,
                                    code: response.status,
                                    data: ""
                                });

                            case 19:
                                _context2.prev = 19;
                                responseJson = response.data;

                                if (response.status === 201 && responseJson.token) {
                                    this.optionParams.authorizationCode = 'token ' + responseJson.token;
                                    (0, _storageUtils.setCache)(_constant.TOKEN_KEY, this.optionParams.authorizationCode);
                                }

                                if (!(response.status === 200 || response.status === 201)) {
                                    _context2.next = 24;
                                    break;
                                }

                                return _context2.abrupt('return', {
                                    result: true,
                                    code: SUCCESS,
                                    data: responseJson,
                                    headers: response.headers
                                });

                            case 24:
                                _context2.next = 30;
                                break;

                            case 26:
                                _context2.prev = 26;
                                _context2.t0 = _context2['catch'](19);

                                console.log(_context2.t0, url);
                                return _context2.abrupt('return', {
                                    data: response._bodyText,
                                    result: response.ok,
                                    code: response.status ? response.status : NETWORK_JSON_EXCEPTION,
                                    response: response
                                });

                            case 30:
                                return _context2.abrupt('return', {
                                    result: false,
                                    code: response.status,
                                    data: ""
                                });

                            case 31:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[19, 26]]);
            }));

            function netFetch(_x4) {
                return _ref2.apply(this, arguments);
            }

            return netFetch;
        }()
    }, {
        key: 'clearAuthorization',
        value: function clearAuthorization() {
            this.optionParams.authorizationCode = null;
            (0, _storageUtils.removeCache)(_constant.TOKEN_KEY);
        }
    }, {
        key: 'getAuthorization',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var token, basic;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return (0, _storageUtils.getCache)(_constant.TOKEN_KEY);

                            case 2:
                                token = _context3.sent;

                                if (token) {
                                    _context3.next = 13;
                                    break;
                                }

                                _context3.next = 6;
                                return (0, _storageUtils.getCache)(_constant.USER_BASIC_CODE);

                            case 6:
                                basic = _context3.sent;

                                if (basic) {
                                    _context3.next = 10;
                                    break;
                                }

                                _context3.next = 11;
                                break;

                            case 10:
                                return _context3.abrupt('return', 'Basic ' + basic);

                            case 11:
                                _context3.next = 15;
                                break;

                            case 13:
                                this.optionParams.authorizationCode = token;
                                return _context3.abrupt('return', token);

                            case 15:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getAuthorization() {
                return _ref3.apply(this, arguments);
            }

            return getAuthorization;
        }()
    }, {
        key: 'formParamsJson',
        value: function formParamsJson(method, params, headers) {
            var body = JSON.stringify(params);
            var req = {
                method: method,
                headers: _extends({
                    'Content-Type': CONTENT_TYPE_JSON
                }, headers || {}),
                body: body
            };
            return req;
        }
    }, {
        key: 'formParams',
        value: function formParams(method, params, headers) {
            var str = [];
            for (var p in params) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
            }
            var body = null;
            if (str.length > 0) {
                body = str.join("&");
            }
            var req = {
                method: method,
                headers: _extends({
                    'Content-Type': CONTENT_TYPE_FORM
                }, headers || {}),

                body: body
            };
            return req;
        }
    }, {
        key: 'requestWithTimeout',
        value: function requestWithTimeout(ms, promise) {
            return new Promise(function (resolve, reject) {
                var timeoutId = setTimeout(function () {
                    resolve({
                        status: NETWORK_TIMEOUT,
                        message: ""
                    });
                }, ms);
                promise.then(function (res) {
                    clearTimeout(timeoutId);
                    resolve(res);
                }, function (err) {
                    clearTimeout(timeoutId);
                    resolve(err);
                });
            });
        }
    }, {
        key: 'fetch',
        value: function fetch(path, requestParams) {
            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'json';

            var stream = weex.requireModule('stream');
            return new Promise(function (resolve, reject) {
                stream.fetch({
                    method: requestParams.method,
                    url: path,
                    headers: requestParams.headers,
                    type: type,
                    body: requestParams.body
                }, function (response) {
                    if (response.status == 200) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }, function () {});
            });
        }
    }]);

    return HttpManager;
}();

exports.default = new HttpManager();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WxcTag = exports.WxcTabBar = exports.WxcTabPage = exports.WxcStepper = exports.WxcSliderBar = exports.WxcSlideNav = exports.WxcSimpleFlow = exports.WxcSearchbar = exports.WxcSpecialRichText = exports.WxcRichText = exports.WxcResult = exports.WxcRadio = exports.WxcProgress = exports.WxcPopup = exports.WxcPopover = exports.WxcPageCalendar = exports.WxcOverlay = exports.WxcNoticebar = exports.WxcLotteryRain = exports.WxcMinibar = exports.WxcMask = exports.WxcPartLoading = exports.WxcLoading = exports.WxcLightbox = exports.WxcIndexlist = exports.WxcIcon = exports.WxcGridSelect = exports.WxcPanItem = exports.WxcEpSlider = exports.WxcDialog = exports.WxcCountdown = exports.WxcCheckboxList = exports.WxcCheckbox = exports.WxcCity = exports.WxcCell = exports.WxcButton = exports.Utils = undefined;

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _wxcButton = __webpack_require__(147);

var _wxcButton2 = _interopRequireDefault(_wxcButton);

var _wxcCell = __webpack_require__(5);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _wxcCity = __webpack_require__(157);

var _wxcCity2 = _interopRequireDefault(_wxcCity);

var _wxcCheckbox = __webpack_require__(183);

var _wxcCheckbox2 = _interopRequireDefault(_wxcCheckbox);

var _wxcCheckboxList = __webpack_require__(188);

var _wxcCheckboxList2 = _interopRequireDefault(_wxcCheckboxList);

var _wxcCountdown = __webpack_require__(192);

var _wxcCountdown2 = _interopRequireDefault(_wxcCountdown);

var _wxcDialog = __webpack_require__(197);

var _wxcDialog2 = _interopRequireDefault(_wxcDialog);

var _wxcEpSlider = __webpack_require__(207);

var _wxcEpSlider2 = _interopRequireDefault(_wxcEpSlider);

var _wxcPanItem = __webpack_require__(212);

var _wxcPanItem2 = _interopRequireDefault(_wxcPanItem);

var _wxcGridSelect = __webpack_require__(216);

var _wxcGridSelect2 = _interopRequireDefault(_wxcGridSelect);

var _wxcIcon = __webpack_require__(225);

var _wxcIcon2 = _interopRequireDefault(_wxcIcon);

var _wxcIndexlist = __webpack_require__(12);

var _wxcIndexlist2 = _interopRequireDefault(_wxcIndexlist);

var _wxcLightbox = __webpack_require__(231);

var _wxcLightbox2 = _interopRequireDefault(_wxcLightbox);

var _wxcLoading = __webpack_require__(240);

var _wxcLoading2 = _interopRequireDefault(_wxcLoading);

var _wxcPartLoading = __webpack_require__(245);

var _wxcPartLoading2 = _interopRequireDefault(_wxcPartLoading);

var _wxcMask = __webpack_require__(14);

var _wxcMask2 = _interopRequireDefault(_wxcMask);

var _wxcMinibar = __webpack_require__(16);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _wxcLotteryRain = __webpack_require__(253);

var _wxcLotteryRain2 = _interopRequireDefault(_wxcLotteryRain);

var _wxcNoticebar = __webpack_require__(265);

var _wxcNoticebar2 = _interopRequireDefault(_wxcNoticebar);

var _wxcOverlay = __webpack_require__(4);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

var _wxcPageCalendar = __webpack_require__(271);

var _wxcPageCalendar2 = _interopRequireDefault(_wxcPageCalendar);

var _wxcPopover = __webpack_require__(277);

var _wxcPopover2 = _interopRequireDefault(_wxcPopover);

var _wxcPopup = __webpack_require__(282);

var _wxcPopup2 = _interopRequireDefault(_wxcPopup);

var _wxcProgress = __webpack_require__(287);

var _wxcProgress2 = _interopRequireDefault(_wxcProgress);

var _wxcRadio = __webpack_require__(292);

var _wxcRadio2 = _interopRequireDefault(_wxcRadio);

var _wxcResult = __webpack_require__(11);

var _wxcResult2 = _interopRequireDefault(_wxcResult);

var _wxcRichText = __webpack_require__(302);

var _wxcRichText2 = _interopRequireDefault(_wxcRichText);

var _wxcSpecialRichText = __webpack_require__(320);

var _wxcSpecialRichText2 = _interopRequireDefault(_wxcSpecialRichText);

var _wxcSearchbar = __webpack_require__(10);

var _wxcSearchbar2 = _interopRequireDefault(_wxcSearchbar);

var _wxcSimpleFlow = __webpack_require__(325);

var _wxcSimpleFlow2 = _interopRequireDefault(_wxcSimpleFlow);

var _wxcSlideNav = __webpack_require__(330);

var _wxcSlideNav2 = _interopRequireDefault(_wxcSlideNav);

var _wxcSliderBar = __webpack_require__(335);

var _wxcSliderBar2 = _interopRequireDefault(_wxcSliderBar);

var _wxcStepper = __webpack_require__(340);

var _wxcStepper2 = _interopRequireDefault(_wxcStepper);

var _wxcTabPage = __webpack_require__(345);

var _wxcTabPage2 = _interopRequireDefault(_wxcTabPage);

var _wxcTabBar = __webpack_require__(350);

var _wxcTabBar2 = _interopRequireDefault(_wxcTabBar);

var _wxcTag = __webpack_require__(355);

var _wxcTag2 = _interopRequireDefault(_wxcTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Utils = _utils2.default;
exports.WxcButton = _wxcButton2.default;
exports.WxcCell = _wxcCell2.default;
exports.WxcCity = _wxcCity2.default;
exports.WxcCheckbox = _wxcCheckbox2.default;
exports.WxcCheckboxList = _wxcCheckboxList2.default;
exports.WxcCountdown = _wxcCountdown2.default;
exports.WxcDialog = _wxcDialog2.default;
exports.WxcEpSlider = _wxcEpSlider2.default;
exports.WxcPanItem = _wxcPanItem2.default;
exports.WxcGridSelect = _wxcGridSelect2.default;
exports.WxcIcon = _wxcIcon2.default;
exports.WxcIndexlist = _wxcIndexlist2.default;
exports.WxcLightbox = _wxcLightbox2.default;
exports.WxcLoading = _wxcLoading2.default;
exports.WxcPartLoading = _wxcPartLoading2.default;
exports.WxcMask = _wxcMask2.default;
exports.WxcMinibar = _wxcMinibar2.default;
exports.WxcLotteryRain = _wxcLotteryRain2.default;
exports.WxcNoticebar = _wxcNoticebar2.default;
exports.WxcOverlay = _wxcOverlay2.default;
exports.WxcPageCalendar = _wxcPageCalendar2.default;
exports.WxcPopover = _wxcPopover2.default;
exports.WxcPopup = _wxcPopup2.default;
exports.WxcProgress = _wxcProgress2.default;
exports.WxcRadio = _wxcRadio2.default;
exports.WxcResult = _wxcResult2.default;
exports.WxcRichText = _wxcRichText2.default;
exports.WxcSpecialRichText = _wxcSpecialRichText2.default;
exports.WxcSearchbar = _wxcSearchbar2.default;
exports.WxcSimpleFlow = _wxcSimpleFlow2.default;
exports.WxcSlideNav = _wxcSlideNav2.default;
exports.WxcSliderBar = _wxcSliderBar2.default;
exports.WxcStepper = _wxcStepper2.default;
exports.WxcTabPage = _wxcTabPage2.default;
exports.WxcTabBar = _wxcTabBar2.default;
exports.WxcTag = _wxcTag2.default; /**
                                    * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                    * Created by Tw93 on 17/09/25
                                    */

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.graphicHost = exports.downloadUrl = exports.hostWeb = undefined;

var _constant = __webpack_require__(2);

var Config = _interopRequireWildcard(_constant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var host = "https://api.github.com/"; /**
                                       * Created by guoshuyu on 2017/11/8.
                                       */

var hostWeb = exports.hostWeb = "https://github.com/";
var downloadUrl = exports.downloadUrl = 'https://www.pgyer.com/GSYGithubApp';
var graphicHost = exports.graphicHost = 'https://ghchart.rshah.org/';

var AddressLocal = {
    /**
     * 获取授权  post
     */
    getAuthorization: function getAuthorization() {
        return host + "authorizations";
    },
    /**
     * 搜索 get
     */
    search: function search(q, sort, order, type, page) {
        var pageSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Config.PAGE_SIZE;

        if (type === 'user') {
            return host + "search/users?q=" + q + "&page=" + page + "&per_page=" + pageSize;
        }
        if (!sort) {
            sort = "best%20match";
        }
        if (!order) {
            order = "desc";
        }
        if (!page) {
            page = 1;
        }
        if (!pageSize) {
            pageSize = Config.PAGE_SIZE;
        }

        return host + "search/repositories?q=" + q + "&sort=" + sort + "&order=" + order + "&page=" + page + "&per_page=" + pageSize;
    },
    /**
     * 搜索topic tag
     */
    searchTopic: function searchTopic(topic) {
        return host + "search/repositories?q=topic:" + topic + "&sort=stars&order=desc";
    },
    /**
     * 用户的仓库 get
     */
    userRepos: function userRepos(userName, sort) {
        if (!sort) {
            sort = 'pushed';
        }
        return host + "users/" + userName + "/repos?sort=" + sort;
    },
    /**
     * 仓库详情 get
     */
    getReposDetail: function getReposDetail(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName;
    },
    /**
     * 仓库活动 get
     */
    getReposEvent: function getReposEvent(reposOwner, reposName) {
        return host + "networks/" + reposOwner + "/" + reposName + "/events";
    },
    /**
     * 仓库Fork get
     */
    getReposForks: function getReposForks(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/forks";
    },
    /**
     * 仓库Star get
     */
    getReposStar: function getReposStar(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/stargazers";
    },
    /**
     * 仓库Watch get
     */
    getReposWatcher: function getReposWatcher(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/subscribers";
    },
    /**
     * 仓库提交 get
     */
    getReposCommits: function getReposCommits(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/commits";
    },
    /**
     * 仓库提交详情 get
     */
    getReposCommitsInfo: function getReposCommitsInfo(reposOwner, reposName, sha) {
        return host + "repos/" + reposOwner + "/" + reposName + "/commits/" + sha;
    },
    /**
     * 仓库Issue get
     */
    getReposIssue: function getReposIssue(reposOwner, reposName, state, sort, direction) {
        if (!state) {
            state = 'all';
        }
        if (!sort) {
            sort = 'created';
        }
        if (!direction) {
            direction = 'desc';
        }
        return host + "repos/" + reposOwner + "/" + reposName + "/issues?state=" + state + "&sort=" + sort + "&direction=" + direction;
    },
    /**
     * 仓release get
     */
    getReposRelease: function getReposRelease(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/releases";
    },
    /**
     * 仓Tag get
     */
    getReposTag: function getReposTag(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/tags";
    },
    /**
     * 仓Contributors get
     */
    getReposContributors: function getReposContributors(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/contributors";
    },
    /**
     * 仓库Issue评论 get
     */
    getIssueComment: function getIssueComment(reposOwner, reposName, issueNumber) {
        return host + "repos/" + reposOwner + "/" + reposName + "/issues/" + issueNumber + "/comments";
    },
    /**
     * 仓库Issue get
     */
    getIssueInfo: function getIssueInfo(reposOwner, reposName, issueNumber) {
        return host + "repos/" + reposOwner + "/" + reposName + "/issues/" + issueNumber;
    },
    /**
     * 增加issue评论 post
     */
    addIssueComment: function addIssueComment(reposOwner, reposName, issueNumber) {
        return host + "repos/" + reposOwner + "/" + reposName + "/issues/" + issueNumber + "/comments";
    },
    /**
     * 编辑issue put
     */
    editIssue: function editIssue(reposOwner, reposName, issueNumber) {
        return host + "repos/" + reposOwner + "/" + reposName + "/issues/" + issueNumber;
    },
    /**
     * 锁定issue put
     * 解锁issue delete
     */
    lockIssue: function lockIssue(reposOwner, reposName, issueNumber) {
        return host + "repos/" + reposOwner + "/" + reposName + "/issues/" + issueNumber + "/lock";
    },
    /**
     * 创建issue post
     */
    createIssue: function createIssue(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/issues";
    },
    /**
     * 搜索issue
     */
    repositoryIssueSearch: function repositoryIssueSearch(q) {
        return host + "search/issues?q=" + q;
    },
    /**
     * 编辑评论 patch, delete
     */
    editComment: function editComment(reposOwner, reposName, commentId) {
        return host + "repos/" + reposOwner + "/" + reposName + "/issues/comments/" + commentId;
    },
    /**
     * 自己的star get
     */
    myStar: function myStar(sort) {
        if (!sort) {
            sort = 'updated';
        }
        return host + "users/starred?sort=" + sort;
    },
    /**
     * 用户的star get
     */
    userStar: function userStar(userName, sort) {
        if (!sort) {
            sort = 'updated';
        }
        return host + "users/" + userName + "/starred?sort=" + sort;
    },
    /**
     * 关注仓库 put
     *
     * 取消关注 delete
     *
     * 是否关注 get
     */
    resolveStarRepos: function resolveStarRepos(reposOwner, repos) {
        return host + "user/starred/" + reposOwner + "/" + repos;
    },

    /**
     * 订阅仓库 put
     *
     * 取消订阅 delete
     *
     * 是否订阅 get
     */
    resolveWatcherRepos: function resolveWatcherRepos(reposOwner, repos) {
        return host + "user/subscriptions/" + reposOwner + "/" + repos;
    },
    /**
     * 仓库内容数据 get
     */
    reposData: function reposData(reposOwner, repos) {
        return host + "repos/" + reposOwner + "/{$repo}/contents";
    },
    /**
     * 仓库路径下的内容 get
     */
    reposDataDir: function reposDataDir(reposOwner, repos, path) {
        var branch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'master';

        return host + "repos/" + reposOwner + "/" + repos + "/contents/" + path + (!branch ? "" : "?ref=" + branch);
    },
    /**
     * README 文件地址 get
     */
    readmeFile: function readmeFile(reposNameFullName, curBranch) {
        return host + "repos/" + reposNameFullName + "/" + "readme" + (!curBranch ? "" : "?ref=" + curBranch);
    },
    /**
     * 我的用户信息 GET
     */
    getMyUserInfo: function getMyUserInfo() {
        return host + "user";
    },
    /**
     * 用户信息 get
     */
    getUserInfo: function getUserInfo(userName) {
        return host + "users/" + userName;
    },
    /**
     *  get 是否关注
     *  put 关注
     *  delete 取消关注
     */
    doFollow: function doFollow(name) {
        return host + "user/following/" + name;
    },
    /**
     * 用户关注 get
     */
    getUserFollow: function getUserFollow(userName) {
        return host + "users/" + userName + "/following";
    },
    /**
     * 我的关注者 get
     */
    getMyFollower: function getMyFollower() {
        return host + "user/followers";
    },
    /**
     * 用户的关注者 get
     */
    getUserFollower: function getUserFollower(userName) {
        return host + "users/" + userName + "/followers";
    },
    /**
     * create fork post
     */
    createFork: function createFork(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/forks";
    },
    /**
     * branch get
     */
    getbranches: function getbranches(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/branches";
    },
    /**
     * fork get
     */
    getForker: function getForker(reposOwner, reposName, sort) {
        if (!sort) {
            sort = 'newest';
        }
        return host + "repos/" + reposOwner + "/" + reposName + "/forks?sort=" + sort;
    },
    /**
     * readme get
     */
    getReadme: function getReadme(reposOwner, reposName) {
        return host + "repos/" + reposOwner + "/" + reposName + "/readme";
    },
    /**
     * 用户收到的事件信息 get
     */
    getEventReceived: function getEventReceived(userName) {
        return host + "users/" + userName + "/received_events";
    },
    /**
     * 用户相关的事件信息 get
     */
    getEvent: function getEvent(userName) {
        return host + "users/" + userName + "/events";
    },
    /**
     * 组织成员
     */
    getMember: function getMember(orgs) {
        return host + "orgs/" + orgs + "/members";
    },
    /**
     * 获取用户组织
     */
    getUserOrgs: function getUserOrgs(userName) {
        return host + "users/" + userName + "/orgs";
    },
    /**
     * 通知 get
     */
    getNotifation: function getNotifation(all, participating) {
        if (!all && !participating) {
            return host + "notifications";
        }
        if (!all) {
            all = false;
        }
        if (!participating) {
            participating = false;
        }
        return host + "notifications?all=" + all + "&participating=" + participating;
    },
    /**
     * patch
     */
    setNotificationAsRead: function setNotificationAsRead(threadId) {
        return host + "notifications/threads/" + threadId;
    },
    /**
     * put
     */
    setAllNotificationAsRead: function setAllNotificationAsRead() {
        return host + "notifications";
    },
    /**
     * 趋势 get
     * @param since daily，weekly， monthly
     */
    trending: function trending(since, languageType) {
        if (languageType) {
            return "https://github.com/trending/" + languageType + "?since=" + since;
        }
        if (since) return "https://github.com/trending?since=" + since;

        return "https://github.com/trending";
    },
    /**
     * 处理分页参数
     * @param tab 表示是 ? 或者 &
     * @param page 页数
     * @param pageSize 每页数量
     */
    getPageParams: function getPageParams(tab, page) {
        var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Config.PAGE_SIZE;

        if (page !== null) {
            if (pageSize !== null) {
                return tab + "page=" + page + "&per_page=" + pageSize;
            } else {
                return tab + "page=" + page;
            }
        } else {
            return "";
        }
    }

};

exports.default = AddressLocal;

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var required = __webpack_require__(145),
    qs = __webpack_require__(146),
    protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
    slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [['#', 'hash'], // Extract from the back.
['?', 'query'], // Extract from the back.
['/', 'pathname'], // Extract from the back.
['@', 'auth', 1], // Extract from the front.
[NaN, 'host', undefined, 1, 1], // Set left over value.
[/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
[NaN, 'hostname', undefined, 1, 1] // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
function lolcation(loc) {
  loc = loc || global.location || {};

  var finaldestination = {},
      type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
      key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) {
      delete finaldestination[key];
    }
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
      i = path.length,
      last = path[i - 1],
      unshift = false,
      up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative,
      extracted,
      parse,
      instruction,
      index,
      key,
      instructions = rules.slice(),
      type = typeof location === 'undefined' ? 'undefined' : _typeof(location),
      url = this,
      i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : '');

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname + ':' + value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':' + url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query,
      url = this,
      protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':' + url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === _typeof(url.query) ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = qs;

module.exports = URL;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */

module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
      return port !== 80;

    case 'https':
    case 'wss':
      return port !== 443;

    case 'ftp':
      return port !== 21;

    case 'gopher':
      return port !== 70;

    case 'file':
      return false;
  }

  return port !== 0;
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g,
      result = {},
      part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (; part = parser.exec(query); result[decode(part[1])] = decode(part[2])) {}

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(148);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(149)
)

/* script */
__vue_exports__ = __webpack_require__(150)

/* template */
var __vue_template__ = __webpack_require__(152)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-button/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6f066d90"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-btn": {
    "width": "702",
    "height": "88",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "12"
  },
  "btn-text": {
    "textOverflow": "ellipsis",
    "lines": 1,
    "fontSize": "36",
    "color": "#ffffff"
  }
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//

var _type = __webpack_require__(151);

exports.default = {
  props: {
    text: {
      type: String,
      default: '确认'
    },
    type: {
      type: String,
      default: 'red'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnStyle: Object,
    textStyle: Object
  },
  computed: {
    mrBtnStyle: function mrBtnStyle() {
      var type = this.type,
          disabled = this.disabled,
          btnStyle = this.btnStyle;

      var mrBtnStyle = _extends({}, _type.STYLE_MAP[type], btnStyle);
      return disabled ? _extends({}, mrBtnStyle, {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 0
      }) : mrBtnStyle;
    },
    mrTextStyle: function mrTextStyle() {
      var type = this.type,
          disabled = this.disabled,
          textStyle = this.textStyle;

      var mrTextStyle = _extends({}, _type.TEXT_STYLE_MAP[type], textStyle);
      return disabled ? _extends({}, mrTextStyle, { color: '#FFFFFF' }) : mrTextStyle;
    }
  },
  methods: {
    onClicked: function onClicked(e) {
      var type = this.type,
          disabled = this.disabled;

      this.$emit('wxcButtonClicked', { e: e, type: type, disabled: disabled });
    }
  }
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STYLE_MAP = exports.STYLE_MAP = {
  red: {
    backgroundColor: '#FF5000'
  },
  yellow: {
    backgroundColor: '#FFC900'
  },
  normal: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A5A5A5',
    borderWidth: '1px'
  },
  highlight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EE9900',
    borderWidth: '1px'
  }
};

var TEXT_STYLE_MAP = exports.TEXT_STYLE_MAP = {
  taobao: {
    color: '#FFFFFF'
  },
  fliggy: {
    color: '#3D3D3D'
  },
  normal: {
    color: '#3D3D3D'
  },
  highlight: {
    color: '#EE9900'
  }
};

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-btn"],
    style: _vm.mrBtnStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": _vm.text
    },
    on: {
      "click": _vm.onClicked
    }
  }, [_c('text', {
    staticClass: ["btn-text"],
    style: _vm.mrTextStyle
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(154)
)

/* script */
__vue_exports__ = __webpack_require__(155)

/* template */
var __vue_template__ = __webpack_require__(156)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-cell/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-01138e28"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-cell": {
    "height": "100",
    "flexDirection": "row",
    "alignItems": "center",
    "paddingLeft": "24",
    "paddingRight": "24",
    "backgroundColor": "#ffffff"
  },
  "cell-margin": {
    "marginBottom": "24"
  },
  "cell-title": {
    "flex": 1
  },
  "cell-indent": {
    "paddingBottom": "30",
    "paddingTop": "30"
  },
  "has-desc": {
    "paddingBottom": "18",
    "paddingTop": "18"
  },
  "cell-top-border": {
    "borderTopColor": "#e2e2e2",
    "borderTopWidth": "1"
  },
  "cell-bottom-border": {
    "borderBottomColor": "#e2e2e2",
    "borderBottomWidth": "1"
  },
  "cell-label-text": {
    "fontSize": "30",
    "color": "#666666",
    "width": "188",
    "marginRight": "10"
  },
  "cell-arrow-icon": {
    "width": "22",
    "height": "22"
  },
  "cell-content": {
    "color": "#333333",
    "fontSize": "30",
    "lineHeight": "40"
  },
  "cell-desc-text": {
    "color": "#999999",
    "fontSize": "24",
    "lineHeight": "30",
    "marginTop": "4"
  }
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasMargin: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
    hasArrow: {
      type: Boolean,
      default: false
    },
    arrowIcon: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png'
    },
    hasVerticalIndent: {
      type: Boolean,
      default: true
    },
    cellStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    autoAccessible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cellClicked: function cellClicked(e) {
      var link = this.link;
      this.$emit('wxcCellClicked', { e: e });
      link && _utils2.default.goToH5Page(link, true);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-cell', _vm.hasTopBorder && 'cell-top-border', _vm.hasBottomBorder && 'cell-bottom-border', _vm.hasMargin && 'cell-margin', _vm.hasVerticalIndent && 'cell-indent', _vm.desc && 'has-desc'],
    style: _vm.cellStyle,
    attrs: {
      "accessible": _vm.autoAccessible,
      "ariaLabel": (_vm.label + "," + _vm.title + "," + _vm.desc)
    },
    on: {
      "click": _vm.cellClicked
    }
  }, [_vm._t("label", [(_vm.label) ? _c('div', [_c('text', {
    staticClass: ["cell-label-text"]
  }, [_vm._v(_vm._s(_vm.label))])]) : _vm._e()]), _c('div', {
    staticClass: ["cell-title"]
  }, [_vm._t("title", [_c('text', {
    staticClass: ["cell-content"]
  }, [_vm._v(_vm._s(_vm.title))]), (_vm.desc) ? _c('text', {
    staticClass: ["cell-desc-text"]
  }, [_vm._v(_vm._s(_vm.desc))]) : _vm._e()])], 2), _vm._t("value"), _vm._t("default"), (_vm.hasArrow) ? _c('image', {
    staticClass: ["cell-arrow-icon"],
    attrs: {
      "src": _vm.arrowIcon,
      "ariaHidden": true
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(158);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(159)
)

/* script */
__vue_exports__ = __webpack_require__(160)

/* template */
var __vue_template__ = __webpack_require__(182)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-city/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-ef6c321e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-city": {
    "position": "fixed",
    "width": "750",
    "backgroundColor": "#F2F3F4"
  }
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _defaultData = __webpack_require__(161);

var _defaultData2 = _interopRequireDefault(_defaultData);

var _util = __webpack_require__(162);

var Util = _interopRequireWildcard(_util);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _tab = __webpack_require__(163);

var _tab2 = _interopRequireDefault(_tab);

var _wxcSearchbar = __webpack_require__(10);

var _wxcSearchbar2 = _interopRequireDefault(_wxcSearchbar);

var _wxcResult = __webpack_require__(11);

var _wxcResult2 = _interopRequireDefault(_wxcResult);

var _wxcIndexlist = __webpack_require__(12);

var _wxcIndexlist2 = _interopRequireDefault(_wxcIndexlist);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { wxcTab: _tab2.default, WxcSearchbar: _wxcSearchbar2.default, WxcResult: _wxcResult2.default, WxcIndexlist: _wxcIndexlist2.default },
  props: {
    animationType: {
      type: String,
      default: 'push'
    },
    inputConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    sourceData: {
      type: Object,
      default: function _default() {
        return _defaultData2.default;
      }
    },
    cityStyleType: {
      type: String,
      default: 'list'
    },
    currentLocation: String,
    cityHeight: {
      type: Number,
      default: 0
    },
    showTab: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      tId: null,
      saveDefaultSourceData: {},
      onlyShowList: false,
      result: {
        noGoods: {
          pic: 'https://img.alicdn.com/tfs/TB1SpPHkf2H8KJjy0FcXXaDlFXa-200-200.png',
          button: '',
          content: '搜索无结果'
        }
      }
    };
  },
  created: function created() {
    this.saveDefaultSourceData = this.sourceData;
  },

  computed: {
    cityExtendStyle: function cityExtendStyle() {
      return _utils2.default.uiStyle.pageTransitionAnimationStyle(this.animationType);
    },
    currentCityLocationConfig: function currentCityLocationConfig() {
      if (this.currentLocation) {
        return {
          type: this.cityStyleType,
          title: '定位',
          list: [{ name: this.currentLocation, isLocation: true }]
        };
      } else {
        return {};
      }
    },
    normalList: function normalList() {
      return Util.getCities(this.sourceData.cities);
    },
    hotListConfig: function hotListConfig() {
      return {
        type: this.cityStyleType,
        title: '热门',
        list: Util.getCities(this.sourceData.hotCity)
      };
    },
    showError: function showError() {
      var normalList = this.normalList,
          hotListConfig = this.hotListConfig;

      return normalList && normalList.length < 1 && hotListConfig && hotListConfig.list && hotListConfig.list.length < 1;
    },
    listHeight: function listHeight() {
      // 兼容去头逻辑
      var pageHeight = _utils2.default.env.getPageHeight();

      var cityHeight = this.cityHeight;

      if (cityHeight && !isNaN(cityHeight) && cityHeight > 0) {
        pageHeight = cityHeight;
      }
      // searchInput 84
      var tabHeight = this.showTab ? 90 : 0;
      return pageHeight - 84 - tabHeight;
    },
    mergeInputConfig: function mergeInputConfig() {
      return _extends({
        autofocus: false,
        alwaysShowCancel: true,
        placeholder: '中文/拼音/首字母'
      }, this.inputConfig);
    }
  },
  methods: {
    onTabSwitch: function onTabSwitch(e) {
      this.$emit('wxcTabSwitch', e);
    },
    switchTab: function switchTab() {
      var _this = this;

      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      setTimeout(function () {
        _this.$refs['wxc-tab'].switchTab(i);
      }, 100);
    },
    onItemClick: function onItemClick(e) {
      this.$refs['wxc-searchbar'].autoBlur();
      this.show(false);
      this.$emit('wxcCityItemSelected', { item: e.item });
    },
    onInput: function onInput(e) {
      var _this2 = this;

      clearTimeout(this.tId);
      var cities = this.sourceData.cities;
      var value = e.value;

      if (value !== '' && cities && cities.length > 0) {
        var queryData = Util.query(cities, String(value).trim());
        this.sourceData = {
          cities: queryData,
          hotCity: []
        };
        this.onlyShowList = true;
      } else {
        this.sourceData = this.saveDefaultSourceData;
        this.onlyShowList = false;
      }
      this.tId = setTimeout(function () {
        _this2.$emit('wxcCityOnInput', {
          value: e.value
        });
      }, 300);
    },
    onCancel: function onCancel() {
      this.autoBlur();
      this.show(false);
      this.$emit('wxcCityCanceled', {});
    },
    onSubmit: function onSubmit(e) {
      this.autoBlur();
      this.$emit('wxcCityOnKeyUpEnter', { value: e.value });
    },
    autoBlur: function autoBlur() {
      var inputRef = this.$refs['wxc-searchbar'];
      inputRef && inputRef.autoBlur();
    },
    show: function show() {
      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var ref = this.$refs.city;
      if (this.animationType === 'push') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateX(' + (status ? -750 : 750) + 'px)', status, callback);
      } else if (this.animationType === 'model') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateY(' + (status ? -_utils2.default.env.getScreenHeight() : _utils2.default.env.getScreenHeight()) + 'px)', status, callback);
      }
    }
  }
};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by dianwoda on 2018/1/31.
 */
exports.default = {
  hotCity: [{ cityName: '北京', pinYin: 'beijing', py: 'bj' }, { cityName: '上海', pinYin: 'shanghai', py: 'sh' }, { cityName: '天津', pinYin: 'tianjin', py: 'tj' }, { cityName: '青岛', pinYin: 'qingdao', py: 'qd' }, { cityName: '南京', pinYin: 'nanjing', py: 'nj' }, { cityName: '杭州', pinYin: 'hangzhou', py: 'hz' }, { cityName: '厦门', pinYin: 'xiamen', py: 'xm' }, { cityName: '成都', pinYin: 'chengdu', py: 'cd' }, { cityName: '深圳', pinYin: 'shenzhen', py: 'sz' }, { cityName: '广州', pinYin: 'guangzhou', py: 'gz' }, { cityName: '沈阳', pinYin: 'shenyang', py: 'sy' }, { cityName: '武汉', pinYin: 'wuhan', py: 'wh' }],
  cities: [{ cityName: '北京', pinYin: 'beijing', py: 'bj' }, { cityName: '包头', pinYin: 'baotou', py: 'bt' }, { cityName: '北海', pinYin: 'beihai', py: 'bh' }, { cityName: '宝鸡', pinYin: 'baoji', py: 'bj' }, { cityName: '成都', pinYin: 'chengdu', py: 'cd' }, { cityName: '重庆', pinYin: 'chongqing', py: 'cq' }, { cityName: '长沙', pinYin: 'changsha', py: 'cs' }, { cityName: '长春', pinYin: 'changchun', py: 'cc' }, { cityName: '常州', pinYin: 'changzhou', py: 'cz' }, { cityName: '常德', pinYin: 'changde', py: 'cd' }, { cityName: '沧州', pinYin: 'cangzhou', py: 'cz' }, { cityName: '承德', pinYin: 'chengde', py: 'cd' }, { cityName: '长治', pinYin: 'changzhi', py: 'cz' }, { cityName: '滁州', pinYin: 'chuzhou', py: 'cz' }, { cityName: '大连', pinYin: 'dalian', py: 'dl' }, { cityName: '东莞', pinYin: 'dongguan', py: 'dg' }, { cityName: '大同', pinYin: 'datong', py: 'dt' }, { cityName: '达州', pinYin: 'dazhou', py: 'dz' }, { cityName: '鄂尔多斯', pinYin: 'eerduosi', py: 'eeds' }, { cityName: '恩施', pinYin: 'enshi', py: 'es' }, { cityName: '福州', pinYin: 'fuzhou', py: 'fz' }, { cityName: '佛山', pinYin: 'foshan', py: 'fs' }, { cityName: '抚顺', pinYin: 'fushun', py: 'fs' }, { cityName: '抚州', pinYin: 'fuzhou', py: 'fz' }, { cityName: '防城港', pinYin: 'fangchenggang', py: 'fcg' }, { cityName: '广州', pinYin: 'guangzhou', py: 'gz' }, { cityName: '贵阳', pinYin: 'guiyang', py: 'gy' }, { cityName: '桂林', pinYin: 'guilin', py: 'gl' }, { cityName: '广元', pinYin: 'guangyuan', py: 'gy' }, { cityName: '广安', pinYin: 'guangan', py: 'ga' }, { cityName: '杭州', pinYin: 'hangzhou', py: 'hz' }, { cityName: '哈尔滨', pinYin: 'haerbin', py: 'heb' }, { cityName: '合肥', pinYin: 'hefei', py: 'hf' }, { cityName: '呼和浩特', pinYin: 'huhehaote', py: 'hhht' }, { cityName: '海口', pinYin: 'haikou', py: 'hk' }, { cityName: '黄山', pinYin: 'huangshan', py: 'hs' }, { cityName: '呼伦贝尔', pinYin: 'hulunbeier', py: 'hlbe' }, { cityName: '邯郸', pinYin: 'handan', py: 'hd' }, { cityName: '衡阳', pinYin: 'hengyang', py: 'hy' }, { cityName: '汉中', pinYin: 'hanzhong', py: 'hz' }, { cityName: '济南', pinYin: 'jinan', py: 'jn' }, { cityName: '济宁', pinYin: 'jining', py: 'jn' }, { cityName: '九江', pinYin: 'jiujiang', py: 'jj' }, { cityName: '景德镇', pinYin: 'jingdezhen', py: 'jdz' }, { cityName: '吉林', pinYin: 'jilin', py: 'jl' }, { cityName: '江门', pinYin: 'jiangmen', py: 'jm' }, { cityName: '晋城', pinYin: 'jincheng', py: 'jc' }, { cityName: '嘉峪关', pinYin: 'jiayuguan', py: 'jyg' }, { cityName: '酒泉', pinYin: 'jiuquan', py: 'jq' }, { cityName: '昆明', pinYin: 'kunming', py: 'km' }, { cityName: '克拉玛依', pinYin: 'kelamayi', py: 'klmy' }, { cityName: '兰州', pinYin: 'lanzhou', py: 'lz' }, { cityName: '丽江', pinYin: 'lijiang', py: 'lj' }, { cityName: '洛阳', pinYin: 'luoyang', py: 'ly' }, { cityName: '柳州', pinYin: 'liuzhou', py: 'lz' }, { cityName: '泸州', pinYin: 'luzhou', py: 'lz' }, { cityName: '拉萨', pinYin: 'lasa', py: 'ls' }, { cityName: '临汾', pinYin: 'linfen', py: 'lf' }, { cityName: '乐山', pinYin: 'leshan', py: 'ls' }, { cityName: '聊城', pinYin: 'liaocheng', py: 'lc' }, { cityName: '丽水', pinYin: 'lishui', py: 'ls' }, { cityName: '绵阳', pinYin: 'mianyang', py: 'my' }, { cityName: '梅州', pinYin: 'meizhou', py: 'mz' }, { cityName: '眉山', pinYin: 'meishan', py: 'ms' }, { cityName: '南昌', pinYin: 'nanchang', py: 'nc' }, { cityName: '南京', pinYin: 'nanjing', py: 'nj' }, { cityName: '南宁', pinYin: 'nanning', py: 'nn' }, { cityName: '宁波', pinYin: 'ningbo', py: 'nb' }, { cityName: '南通', pinYin: 'nantong', py: 'nt' }, { cityName: '南充', pinYin: 'nanchong', py: 'nc' }, { cityName: '内江', pinYin: 'neijiang', py: 'nj' }, { cityName: '萍乡', pinYin: 'pingxiang', py: 'px' }, { cityName: '攀枝花', pinYin: 'panzhihua', py: 'pzh' }, { cityName: '青岛', pinYin: 'qingdao', py: 'qd' }, { cityName: '泉州', pinYin: 'quanzhou', py: 'qz' }, { cityName: '上海', pinYin: 'shanghai', py: 'sh' }, { cityName: '深圳', pinYin: 'shenzhen', py: 'sz' }, { cityName: '沈阳', pinYin: 'shenyang', py: 'sy' }, { cityName: '石家庄', pinYin: 'shijiazhuang', py: 'sjz' }, { cityName: '苏州', pinYin: 'suzhou', py: 'sz' }, { cityName: '三亚', pinYin: 'sanya', py: 'sy' }, { cityName: '汕头', pinYin: 'shantou', py: 'st' }, { cityName: '上饶', pinYin: 'shangrao', py: 'sr' }, { cityName: '遂宁', pinYin: 'suining', py: 'sn' }, { cityName: '宿迁', pinYin: 'suqian', py: 'sq' }, { cityName: '天津', pinYin: 'tianjin', py: 'tj' }, { cityName: '太原', pinYin: 'taiyuan', py: 'ty' }, { cityName: '台州', pinYin: 'taizhou', py: 'tz' }, { cityName: '唐山', pinYin: 'tangshan', py: 'ts' }, { cityName: '铁岭', pinYin: 'tieling', py: 'tl' }, { cityName: '武汉', pinYin: 'wuhan', py: 'wh' }, { cityName: '无锡', pinYin: 'wuxi', py: 'wx' }, { cityName: '温州', pinYin: 'wenzhou', py: 'wz' }, { cityName: '乌鲁木齐', pinYin: 'wulumuqi', py: 'wlmq' }, { cityName: '威海', pinYin: 'weihai', py: 'wh' }, { cityName: '渭南', pinYin: 'weinan', py: 'wn' }, { cityName: '西安', pinYin: 'xian', py: 'xa' }, { cityName: '厦门', pinYin: 'xiamen', py: 'xm' }, { cityName: '香港', pinYin: 'xianggang', py: 'xg' }, { cityName: '徐州', pinYin: 'xuzhou', py: 'xz' }, { cityName: '西宁', pinYin: 'xining', py: 'xn' }, { cityName: '襄阳', pinYin: 'xiangyang', py: 'xy' }, { cityName: '新余', pinYin: 'xinyu', py: 'xy' }, { cityName: '许昌', pinYin: 'xuchang', py: 'xc' }, { cityName: '信阳', pinYin: 'xinyang', py: 'xy' }, { cityName: '银川', pinYin: 'yinchuan', py: 'yc' }, { cityName: '宜昌', pinYin: 'yichang', py: 'yc' }, { cityName: '烟台', pinYin: 'yantai', py: 'yt' }, { cityName: '扬州', pinYin: 'yangzhou', py: 'yz' }, { cityName: '宜宾', pinYin: 'yibin', py: 'yb' }, { cityName: '运城', pinYin: 'yuncheng', py: 'yc' }, { cityName: '榆林', pinYin: 'yulin', py: 'yl' }, { cityName: '盐城', pinYin: 'yancheng', py: 'yc' }, { cityName: '岳阳', pinYin: 'yueyang', py: 'yy' }, { cityName: '延安', pinYin: 'yanan', py: 'ya' }, { cityName: '鹰潭', pinYin: 'yingtan', py: 'yt' }, { cityName: '永州', pinYin: 'yongzhou', py: 'yz' }, { cityName: '郑州', pinYin: 'zhengzhou', py: 'zz' }, { cityName: '珠海', pinYin: 'zhuhai', py: 'zh' }, { cityName: '张家界', pinYin: 'zhangjiajie', py: 'zzj' }, { cityName: '中山', pinYin: 'zhongshan', py: 'zs' }, { cityName: '遵义', pinYin: 'zunyi', py: 'zy' }, { cityName: '湛江', pinYin: 'zhanjiang', py: 'zj' }, { cityName: '株洲', pinYin: 'zhuzhou', py: 'zz' }, { cityName: '肇庆', pinYin: 'zhaoqing', py: 'zq' }, { cityName: '枣庄', pinYin: 'zaozhuang', py: 'zz' }, { cityName: '舟山', pinYin: 'zhoushan', py: 'zs' }, { cityName: '自贡', pinYin: 'zigong', py: 'zg' }, { cityName: '资阳', pinYin: 'ziyang', py: 'zy' }, { cityName: '张掖', pinYin: 'zhangye', py: 'zy' }]
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCities = getCities;
exports.query = query;

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCities(list) {
  var showDesc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (list && list.length > 0) {
    var result = list.map(function (v) {
      var o = Object.assign({}, v);

      if (o.suggestName) {
        o.name = o.suggestName;
      }

      if (o.stationName && !o.name) {
        o.name = o.stationName;
      }

      if (o.cityName && !o.name) {
        o.name = o.cityName;
      }

      if (o.code && showDesc) {
        o.desc = o.code;
      }
      return o;
    });
    return result;
  } else {
    return [];
  }
}

function query(source, text) {
  var res = [];
  res = source.filter(function (item) {
    var arr = [];
    var isHave = false;
    Object.keys(item).forEach(function (prop) {
      var itemStr = item[prop];
      _utils2.default.isString(itemStr) && itemStr.split(',').forEach(function (val) {
        arr.push(val);
      });
    });
    arr.some(function (val) {
      isHave = new RegExp('^' + text).test(val);
      return isHave;
    });
    return isHave;
  });
  return res;
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(164)
)

/* script */
__vue_exports__ = __webpack_require__(165)

/* template */
var __vue_template__ = __webpack_require__(166)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-city/tab.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-49124c18"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = {
  "tab-box": {
    "width": "750",
    "flexDirection": "row",
    "justifyContent": "center"
  },
  "tab-item": {
    "flex": 1,
    "height": "90",
    "backgroundColor": "#ffffff",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "tab-item-text": {
    "textAlign": "center",
    "color": "#000000",
    "fontSize": "28",
    "fontWeight": "normal"
  },
  "text-selected": {
    "fontWeight": "bold"
  },
  "tab-item-selected-bar": {
    "width": "750",
    "backgroundColor": "#f2f3f4"
  },
  "tab-item-selected-bar-in": {
    "width": "375",
    "justifyContent": "center",
    "alignItems": "center",
    "flexDirection": "row",
    "height": "6"
  },
  "tab-item-active": {
    "backgroundColor": "#ffb200",
    "width": "92",
    "height": "6"
  }
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {},
  data: function data() {
    return {
      checkedIndex: 0
    };
  },
  methods: {
    switchTab: function switchTab(index) {
      var animation = weex.requireModule('animation');
      this.checkedIndex = index;
      this.$emit('wxcTabSwitch', {
        index: index
      });
      animation.transition(this.$refs['tab-bar'], {
        styles: {
          transform: 'translateX(' + index * 375 + 'px)'
        },
        duration: 150, // ms
        timingFunction: 'ease',
        delay: 0 // ms
      }, function () {});
    }
  }
};

/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: ["tab-box"]
  }, _vm._l((['国内', '国际']), function(name, i) {
    return _c('div', {
      key: i,
      staticClass: ["tab-item"],
      on: {
        "click": function($event) {
          _vm.switchTab(i)
        }
      }
    }, [_c('text', {
      staticClass: ["['tab-item-text',", "i===checkedIndex", "&&", "'text-selected']"]
    }, [_vm._v(_vm._s(name))])])
  })), _c('div', {
    staticClass: ["tab-item-selected-bar"]
  }, [_c('div', {
    ref: "tab-bar",
    staticClass: ["tab-item-selected-bar-in"]
  }, [_c('div', {
    staticClass: ["tab-item-active"]
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(168)
)

/* script */
__vue_exports__ = __webpack_require__(169)

/* template */
var __vue_template__ = __webpack_require__(171)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-searchbar/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6446257b"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-search-bar": {
    "paddingLeft": "20",
    "paddingRight": "20",
    "backgroundColor": "#ffffff",
    "width": "750",
    "height": "84",
    "flexDirection": "row"
  },
  "wxc-search-bar-yellow": {
    "backgroundColor": "#ffc900"
  },
  "search-bar-input": {
    "position": "absolute",
    "top": "10",
    "paddingTop": 0,
    "paddingBottom": 0,
    "paddingRight": "40",
    "paddingLeft": "60",
    "fontSize": "26",
    "width": "624",
    "height": "64",
    "lineHeight": "64",
    "backgroundColor": "#E5E5E5",
    "borderRadius": "6"
  },
  "search-bar-input-yellow": {
    "backgroundColor": "#fff6d6",
    "placeholderColor": "#666666"
  },
  "search-bar-ICON": {
    "position": "absolute",
    "width": "30",
    "height": "30",
    "left": "34",
    "top": "28"
  },
  "search-bar-close": {
    "position": "absolute",
    "width": "30",
    "height": "30",
    "right": "120",
    "top": "28"
  },
  "search-bar-button": {
    "width": "94",
    "height": "36",
    "fontSize": "30",
    "textAlign": "center",
    "backgroundColor": "#ffffff",
    "marginTop": "16",
    "marginRight": 0,
    "color": "#333333",
    "position": "absolute",
    "right": "8",
    "top": "9"
  },
  "search-bar-button-yellow": {
    "backgroundColor": "#FFC900"
  },
  "input-has-dep": {
    "paddingLeft": "240",
    "width": "710"
  },
  "bar-dep": {
    "width": "170",
    "paddingRight": "12",
    "paddingLeft": "12",
    "height": "42",
    "alignItems": "center",
    "flexDirection": "row",
    "position": "absolute",
    "left": "24",
    "top": "22",
    "borderRightStyle": "solid",
    "borderRightWidth": "1",
    "borderRightColor": "#C7C7C7"
  },
  "bar-dep-yellow": {
    "borderRightColor": "#C7C7C7"
  },
  "dep-text": {
    "flex": 1,
    "textAlign": "center",
    "fontSize": "26",
    "color": "#666666",
    "marginRight": "6",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "dep-arrow": {
    "width": "24",
    "height": "24"
  },
  "ICON-has-dep": {
    "left": "214"
  },
  "disabled-input": {
    "width": "750",
    "height": "64",
    "position": "absolute",
    "left": 0,
    "backgroundColor": "rgba(0,0,0,0)"
  },
  "has-dep-disabled": {
    "width": "550",
    "left": "200"
  }
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(170);

exports.default = {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    alwaysShowCancel: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    mod: {
      type: String,
      default: 'default'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'gray'
    },
    defaultValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    cancelLabel: {
      type: String,
      default: '取消 '
    },
    depName: {
      type: String,
      default: '杭州'
    }
  },
  computed: {
    needShowCancel: function needShowCancel() {
      return this.alwaysShowCancel || this.showCancel;
    }
  },
  data: function data() {
    return {
      inputIcon: _type.INPUT_ICON,
      closeIcon: _type.CLOSE_ICON,
      arrowIcon: _type.ARROW_ICON,
      showCancel: false,
      showClose: false,
      value: ''
    };
  },
  created: function created() {
    this.defaultValue && (this.value = this.defaultValue);
    if (this.disabled) {
      this.showCancel = false;
      this.showClose = false;
    }
  },

  methods: {
    onBlur: function onBlur() {
      var self = this;
      setTimeout(function () {
        self.showCancel = false;
        self.detectShowClose();
        self.$emit('wxcSearchbarInputOnBlur', { value: self.value });
      }, 10);
    },
    autoBlur: function autoBlur() {
      this.$refs['search-input'].blur();
    },
    onFocus: function onFocus() {
      if (this.isDisabled) {
        return;
      }
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputOnFocus', { value: this.value });
    },
    closeClicked: function closeClicked() {
      this.value = '';
      this.showCancel && (this.showCancel = false);
      this.showClose && (this.showClose = false);
      this.$emit('wxcSearchbarCloseClicked', { value: this.value });
      this.$emit('wxcSearchbarInputOnInput', { value: this.value });
    },
    onInput: function onInput(e) {
      this.value = e.value;
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputOnInput', { value: this.value });
    },
    onSubmit: function onSubmit(e) {
      this.onBlur();
      this.value = e.value;
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputReturned', { value: this.value });
    },
    cancelClicked: function cancelClicked() {
      this.showCancel && (this.showCancel = false);
      this.showClose && (this.showClose = false);
      this.$emit('wxcSearchbarCancelClicked', { value: this.value });
    },
    detectShowClose: function detectShowClose() {
      this.showClose = this.value.length > 0 && this.showCancel;
    },
    depClicked: function depClicked() {
      this.$emit('wxcSearchbarDepChooseClicked', {});
    },
    inputDisabledClicked: function inputDisabledClicked() {
      this.$emit('wxcSearchbarInputDisabledClicked', {});
    },
    setValue: function setValue(value) {
      this.value = value;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/10/31.
 */

var INPUT_ICON = exports.INPUT_ICON = "https://gw.alicdn.com/tfs/TB1FZB.pwMPMeJjy1XdXXasrXXa-30-30.png";
var CLOSE_ICON = exports.CLOSE_ICON = "https://gw.alicdn.com/tfs/TB1sZB.pwMPMeJjy1XdXXasrXXa-24-24.png";
var ARROW_ICON = exports.ARROW_ICON = "https://gw.alicdn.com/tfs/TB1vZB.pwMPMeJjy1XdXXasrXXa-24-24.png";

/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.mod === 'default') ? _c('div', {
    class: ['wxc-search-bar', 'wxc-search-bar-' + _vm.theme]
  }, [_c('input', {
    ref: "search-input",
    class: ['search-bar-input', 'search-bar-input-' + _vm.theme],
    style: {
      width: _vm.needShowCancel ? '624px' : '710px'
    },
    attrs: {
      "autofocus": _vm.autofocus,
      "disabled": _vm.disabled,
      "value": _vm.value,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), (_vm.disabled) ? _c('div', {
    staticClass: ["disabled-input"],
    on: {
      "click": _vm.inputDisabledClicked
    }
  }) : _vm._e(), _c('image', {
    staticClass: ["search-bar-ICON"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.inputIcon
    }
  }), (_vm.showClose) ? _c('image', {
    staticClass: ["search-bar-close"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.closeIcon
    },
    on: {
      "click": _vm.closeClicked
    }
  }) : _vm._e(), (_vm.needShowCancel) ? _c('text', {
    class: ['search-bar-button', 'search-bar-button-' + _vm.theme],
    on: {
      "click": _vm.cancelClicked
    }
  }, [_vm._v(_vm._s(_vm.cancelLabel))]) : _vm._e()]) : _vm._e(), (_vm.mod === 'hasDep') ? _c('div', {
    class: ['wxc-search-bar', 'wxc-search-bar-' + _vm.theme]
  }, [_c('input', {
    class: ['search-bar-input', 'input-has-dep', 'search-bar-input-' + _vm.theme],
    attrs: {
      "disabled": _vm.disabled,
      "autofocus": _vm.autofocus,
      "value": _vm.value,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), (_vm.disabled) ? _c('div', {
    staticClass: ["disabled-input", "has-dep-disabled"],
    on: {
      "click": _vm.inputDisabledClicked
    }
  }) : _vm._e(), _c('div', {
    class: ['bar-dep', '.bar-dep-' + _vm.theme],
    on: {
      "click": _vm.depClicked
    }
  }, [_c('text', {
    staticClass: ["dep-text"]
  }, [_vm._v(_vm._s(_vm.depName))]), _c('image', {
    staticClass: ["dep-arrow"],
    attrs: {
      "src": _vm.arrowIcon,
      "ariaHidden": true
    }
  })]), _c('image', {
    staticClass: ["search-bar-ICON", "ICON-has-dep"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.inputIcon
    }
  })]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(173)
)

/* script */
__vue_exports__ = __webpack_require__(174)

/* template */
var __vue_template__ = __webpack_require__(176)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-result/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-925eff3a"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = {
  "wrap": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "wxc-result": {
    "width": "750",
    "flex": 1,
    "alignItems": "center",
    "backgroundColor": "#f2f3f4"
  },
  "result-image": {
    "width": "320",
    "height": "320"
  },
  "result-content": {
    "marginTop": "36",
    "alignItems": "center"
  },
  "content-text": {
    "fontSize": "30",
    "color": "#A5A5A5",
    "height": "42",
    "lineHeight": "42",
    "textAlign": "center"
  },
  "content-desc": {
    "marginTop": "10"
  },
  "result-button": {
    "marginTop": "60",
    "borderWidth": "1",
    "borderColor": "#979797",
    "backgroundColor": "#FFFFFF",
    "borderRadius": "6",
    "width": "240",
    "height": "72",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "button-text": {
    "color": "#666666",
    "fontSize": "30"
  }
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(175);

var _type2 = _interopRequireDefault(_type);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    type: {
      type: String,
      default: 'errorPage'
    },
    show: {
      type: Boolean,
      default: true
    },
    wrapStyle: Object,
    paddingTop: {
      type: [Number, String],
      default: 232
    },
    customSet: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    resultType: function resultType() {
      var type = this.type,
          customSet = this.customSet;

      var allTypes = _utils2.default.isEmptyObject(customSet) ? _type2.default : _utils2.default.mergeDeep(_type2.default, customSet);
      var types = allTypes['errorPage'];
      if (['errorPage', 'noGoods', 'noNetwork', 'errorLocation'].indexOf(type) > -1) {
        types = allTypes[type];
      }
      return types;
    },
    setPaddingTop: function setPaddingTop() {
      var paddingTop = this.paddingTop;
      return paddingTop + 'px';
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // web上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    onClick: function onClick() {
      var type = this.type;
      this.$emit('wxcResultButtonClicked', { type: type });
    }
  }
};

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/11/4.
 */

exports.default = {
  errorPage: {
    pic: 'https://img.alicdn.com/tfs/TB17blphfDH8KJjy1XcXXcpdXXa-320-320.png',
    content: '抱歉出错了，我们正在全力解决中',
    button: '再试一次',
    title: '出错啦'
  },
  noGoods: {
    pic: 'https://img.alicdn.com/tfs/TB1mPWEeOqAXuNjy1XdXXaYcVXa-320-320.png',
    content: '主人，这里什么都没有找到',
    button: '再试一次',
    title: '暂无商品'
  },
  noNetwork: {
    pic: 'https://img.alicdn.com/tfs/TB1jkA5g9_I8KJjy0FoXXaFnVXa-320-320.png',
    content: '哎呀，没有网络了......',
    button: '刷新一下',
    title: '无网络'
  },
  errorLocation: {
    pic: 'https://img.alicdn.com/tfs/TB1zXXahhrI8KJjy0FpXXb5hVXa-320-320.png',
    content: '哎呀，定位失败了......',
    button: '刷新一下',
    title: '定位失败'
  }
};

/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wrap"],
    style: _vm.wrapStyle
  }, [_c('div', {
    staticClass: ["wxc-result"],
    style: {
      paddingTop: _vm.setPaddingTop
    }
  }, [_c('image', {
    staticClass: ["result-image"],
    attrs: {
      "ariaHidden": true,
      "src": _vm.resultType.pic
    }
  }), (_vm.resultType.content) ? _c('div', {
    staticClass: ["result-content"]
  }, [_c('text', {
    staticClass: ["content-text"]
  }, [_vm._v(_vm._s(_vm.resultType.content))]), (_vm.resultType.desc) ? _c('text', {
    staticClass: ["content-text", "content-desc"]
  }, [_vm._v(_vm._s(_vm.resultType.desc))]) : _vm._e()]) : _vm._e(), (_vm.resultType.button) ? _c('div', {
    staticClass: ["result-button"],
    on: {
      "touchend": _vm.handleTouchEnd,
      "click": _vm.onClick
    }
  }, [_c('text', {
    staticClass: ["button-text"]
  }, [_vm._v(_vm._s(_vm.resultType.button))])]) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(178)
)

/* script */
__vue_exports__ = __webpack_require__(179)

/* template */
var __vue_template__ = __webpack_require__(181)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-indexlist/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3ab0a380"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = {
  "index-list": {
    "width": "750",
    "height": "1334"
  },
  "index-list-title": {
    "borderBottomWidth": "1",
    "borderBottomColor": "rgba(32,35,37,0.15)",
    "backgroundColor": "#FBFBFB",
    "fontSize": "24",
    "color": "#666666",
    "height": "48",
    "lineHeight": "48",
    "paddingLeft": "24",
    "width": "750"
  },
  "group-title": {
    "borderBottomWidth": 0,
    "paddingBottom": 0,
    "height": "60",
    "paddingTop": "24"
  },
  "index-list-item": {
    "width": "750",
    "flexDirection": "row",
    "alignItems": "center",
    "borderBottomWidth": "1",
    "borderBottomColor": "#e0e0e0",
    "height": "92",
    "paddingLeft": "24",
    "paddingRight": "24",
    "backgroundColor": "#FFFFFF"
  },
  "iphone-x": {
    "height": "68"
  },
  "title": {
    "fontSize": "32",
    "color": "#3D3D3D"
  },
  "desc": {
    "fontSize": "24",
    "color": "#A5A5A5",
    "marginLeft": "30"
  },
  "index-list-nav": {
    "position": "absolute",
    "top": 0,
    "right": 0,
    "marginBottom": "60",
    "marginTop": "60",
    "paddingBottom": "20",
    "paddingTop": "20",
    "width": "70"
  },
  "list-nav-key": {
    "textAlign": "center",
    "fontSize": "24",
    "height": "40",
    "color": "#666666"
  },
  "index-list-pop": {
    "position": "fixed",
    "top": "550",
    "left": "316",
    "width": "120",
    "height": "120",
    "textAlign": "center",
    "justifyContent": "center",
    "backgroundColor": "rgba(32,35,37,0.6)",
    "borderBottomLeftRadius": "60",
    "borderBottomRightRadius": "60",
    "borderTopLeftRadius": "60",
    "borderTopRightRadius": "60",
    "paddingLeft": 0,
    "paddingRight": 0,
    "paddingTop": "35",
    "paddingBottom": "35",
    "color": "#ffffff"
  },
  "list-pop-text": {
    "fontSize": "40",
    "textAlign": "center",
    "color": "#ffffff"
  },
  "group": {
    "paddingBottom": "18",
    "paddingRight": "70",
    "backgroundColor": "#FBFBFB"
  },
  "group-list": {
    "flexDirection": "row",
    "marginLeft": "18",
    "marginTop": "18"
  },
  "group-item": {
    "width": "146",
    "height": "64",
    "borderWidth": "1",
    "borderColor": "#e0e0e0",
    "marginRight": "18",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#ffffff"
  },
  "item-name": {
    "fontSize": "24",
    "lineHeight": "26",
    "color": "#333333"
  },
  "item-desc": {
    "marginTop": "2",
    "color": "#999999",
    "fontSize": "20",
    "textAlign": "center"
  },
  "location-icon": {
    "width": "32",
    "height": "32",
    "marginRight": "8"
  }
}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _format = __webpack_require__(180);

var Format = _interopRequireWildcard(_format);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
exports.default = {
  props: {
    height: {
      type: [Number, String],
      default: _utils2.default.env.getPageHeight()
    },
    normalList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    onlyShowList: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    hotListConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    // 城市选择子组件 特殊情况支持
    cityLocationConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    headerStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    navStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    navTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    popStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    popTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    itemStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    itemTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    itemDescStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    groupWrapStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    groupItemStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    groupItemTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    groupItemDescStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  created: function created() {
    this.isIPhoneX = _utils2.default.env.isIPhoneX();
  },

  computed: {
    formatList: function formatList() {
      var normalList = this.normalList,
          hotListConfig = this.hotListConfig,
          cityLocationConfig = this.cityLocationConfig;

      return Format.totalList(normalList, hotListConfig, cityLocationConfig);
    }
  },
  data: function data() {
    return {
      popKeyShow: false,
      popKey: '',
      navOffsetY: 0,
      timer: null
    };
  },
  methods: {
    itemClicked: function itemClicked(item) {
      this.$emit('wxcIndexlistItemClicked', {
        item: item
      });
    },
    go2Key: function go2Key(key) {
      var _this = this;

      var keyEl = this.$refs['index-item-title-' + key][0];
      keyEl && dom.scrollToElement(keyEl, {
        offset: 0
      });
      this.popKey = key;
      this.popKeyShow = true;
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.popKeyShow = false;
      }, 600);
    }
  }
};

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalList = totalList;
exports.getSpecialData = getSpecialData;

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 根据26个字母取每一项首字母对数据进行排序,处理数据变换
 * @return {[array]}
 */
function totalList(source, hotListConfig, cityLocationConfig) {
  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var res = [];
  LETTERS.split('').forEach(function (letter) {
    var _data = source.filter(function (item) {
      if (item.pinYin) {
        return item.pinYin.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else if (item.py) {
        return item.py.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else {
        return false;
      }
    });
    if (_data.length) {
      res.push({
        title: letter,
        data: _data,
        type: 'list'
      });
    }
  });

  // 处理热门数据
  var hotList = getSpecialData(hotListConfig);
  hotList && res.unshift(hotList);

  // 处理特殊定位数据
  var cityLocation = getSpecialData(cityLocationConfig);
  cityLocation && res.unshift(cityLocation);

  return res;
} /**
   * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
   * Created by Tw93 on 17/11/01
   */

function getSpecialData(data) {
  if (data && data.type && data.list && data.list.length > 0) {
    var type = data.type,
        title = data.title,
        list = data.list;

    return {
      title: title,
      type: type,
      data: type === 'group' ? _utils2.default.arrayChunk(list) : list
    };
  } else {
    return null;
  }
}

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('list', {
    staticClass: ["index-list"],
    style: {
      height: _vm.height + 'px'
    }
  }, [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_vm._t("head")], 2), _vm._l((_vm.formatList), function(v, i) {
    return _c('cell', {
      key: i,
      ref: 'index-item-title-' + v.title,
      refInFor: true,
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [(!_vm.onlyShowList) ? _c('text', {
      class: ['index-list-title', v.type && v.type == 'group' && 'group-title'],
      style: _vm.headerStyle
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), (v.type && v.type === 'group' && !_vm.onlyShowList) ? _c('div', {
      staticClass: ["group"],
      style: _vm.groupWrapStyle
    }, _vm._l((v.data), function(group, index) {
      return _c('div', {
        key: index,
        staticClass: ["group-list"]
      }, _vm._l((group), function(item, i) {
        return _c('div', {
          key: i,
          staticClass: ["group-item"],
          style: _vm.groupItemStyle,
          attrs: {
            "accessible": true,
            "ariaLabel": ((item.name) + "," + (item.desc?item.desc:''))
          },
          on: {
            "click": function($event) {
              _vm.itemClicked(item)
            }
          }
        }, [(item.isLocation) ? _c('image', {
          staticClass: ["location-icon"],
          attrs: {
            "src": "https://gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png"
          }
        }) : _vm._e(), _c('div', [_c('text', {
          staticClass: ["item-name"],
          style: _vm.groupItemTextStyle
        }, [_vm._v(_vm._s(item.name))]), (item.desc) ? _c('text', {
          staticClass: ["item-desc"],
          style: _vm.groupItemDescStyle
        }, [_vm._v(_vm._s(item.desc))]) : _vm._e()])])
      }))
    })) : _vm._e(), (v.type === 'list') ? _c('div', _vm._l((v.data), function(item, index) {
      return _c('div', {
        key: index,
        staticClass: ["index-list-item"],
        style: _vm.itemStyle,
        attrs: {
          "accessible": true,
          "ariaLabel": ((item.name) + "," + (item.desc?item.desc:''))
        },
        on: {
          "click": function($event) {
            _vm.itemClicked(item)
          }
        }
      }, [_c('text', {
        staticClass: ["title"],
        style: _vm.itemTextStyle
      }, [_vm._v(_vm._s(item.name))]), _c('text', {
        staticClass: ["desc"],
        style: _vm.itemDescStyle
      }, [_vm._v(_vm._s(item.desc))])])
    })) : _vm._e()])
  }), (_vm.isIPhoneX) ? _c('cell', {
    staticClass: ["iphone-x"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }) : _vm._e()], 2), (_vm.showIndex && !_vm.onlyShowList) ? _c('div', {
    staticClass: ["index-list-nav"],
    style: _vm.navStyle
  }, _vm._l((_vm.formatList), function(item, index) {
    return _c('text', {
      key: index,
      staticClass: ["list-nav-key"],
      style: _vm.navTextStyle,
      attrs: {
        "title": item.title
      },
      on: {
        "click": function($event) {
          _vm.go2Key(item.title)
        }
      }
    }, [_vm._v(_vm._s(item.title))])
  })) : _vm._e(), (_vm.popKeyShow) ? _c('div', {
    staticClass: ["index-list-pop"],
    style: _vm.popStyle
  }, [_c('text', {
    staticClass: ["list-pop-text"],
    style: _vm.popTextStyle
  }, [_vm._v(_vm._s(_vm.popKey))])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "city",
    staticClass: ["wxc-city"],
    style: _vm.cityExtendStyle
  }, [_c('wxc-searchbar', _vm._b({
    ref: "wxc-searchbar",
    on: {
      "wxcSearchbarInputOnInput": _vm.onInput,
      "wxcSearchbarInputReturned": _vm.onSubmit,
      "wxcSearchbarCancelClicked": _vm.onCancel
    }
  }, 'wxc-searchbar', _vm.mergeInputConfig, false)), (_vm.showTab) ? _c('wxc-tab', {
    ref: "wxc-tab",
    on: {
      "wxcTabSwitch": _vm.onTabSwitch
    }
  }) : _vm._e(), _c('wxc-indexlist', {
    attrs: {
      "normalList": _vm.normalList,
      "hotListConfig": _vm.hotListConfig,
      "navStyle": {
        top: '24px'
      },
      "height": _vm.listHeight,
      "showIndex": _vm.showIndex,
      "onlyShowList": _vm.onlyShowList,
      "cityLocationConfig": _vm.currentCityLocationConfig
    },
    on: {
      "wxcIndexlistItemClicked": _vm.onItemClick
    }
  }), (_vm.showError) ? _c('wxc-result', {
    attrs: {
      "type": "noGoods",
      "wrapStyle": {
        top: '84px'
      },
      "show": true,
      "customSet": _vm.result
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(13);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports = {
  "checkbox": {
    "width": "48",
    "height": "48"
  },
  "title-text": {
    "fontSize": "30"
  }
}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcCell = __webpack_require__(5);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _type = __webpack_require__(186);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcCell: _wxcCell2.default },
  props: {
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      require: true
    },
    value: {
      type: [String, Number, Object],
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      icon: [_type.CHECKED, _type.UNCHECKED, _type.CHECKED_DISABLED, _type.UNCHECKED_DISABLED],
      color: '#3D3D3D',
      innerChecked: false
    };
  },
  computed: {
    checkIcon: function checkIcon() {
      var icon = this.icon,
          disabled = this.disabled,
          innerChecked = this.innerChecked,
          config = this.config;

      var mergeIcon = [].concat(_toConsumableArray(icon));
      config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
      config.unCheckedIcon && (mergeIcon[1] = config.unCheckedIcon);
      config.checkedDisabledIcon && (mergeIcon[2] = config.checkedDisabledIcon);
      config.unCheckedDisabledIcon && (mergeIcon[3] = config.unCheckedDisabledIcon);
      if (disabled) {
        return mergeIcon[innerChecked ? 2 : 3];
      } else {
        return mergeIcon[innerChecked ? 0 : 1];
      }
    },
    textColor: function textColor() {
      var innerChecked = this.innerChecked,
          disabled = this.disabled,
          config = this.config;

      var checkedColor = config.checkedColor ? config.checkedColor : '#EE9900';
      return innerChecked && !disabled ? checkedColor : '#3D3D3D';
    }
  },
  watch: {
    checked: function checked(newChecked) {
      this.innerChecked = newChecked;
    }
  },
  created: function created() {
    var checked = this.checked;

    this.innerChecked = checked;
  },

  methods: {
    wxcCellClicked: function wxcCellClicked() {
      var disabled = this.disabled,
          innerChecked = this.innerChecked,
          value = this.value;

      if (!disabled) {
        this.innerChecked = !innerChecked;
        this.$emit('wxcCheckBoxItemChecked', { value: value, checked: this.innerChecked });
      }
    }
  }
};

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/10/21.
 */

var CHECKED = exports.CHECKED = 'https://gw.alicdn.com/tfs/TB14fp2pwMPMeJjy1XbXXcwxVXa-72-72.png';
var UNCHECKED = exports.UNCHECKED = 'https://gw.alicdn.com/tfs/TB1U6SbpwMPMeJjy1XcXXXpppXa-72-72.png';
var CHECKED_DISABLED = exports.CHECKED_DISABLED = 'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png';
var UNCHECKED_DISABLED = exports.UNCHECKED_DISABLED = 'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png';

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    attrs: {
      "hasTopBorder": _vm.hasTopBorder,
      "hasBottomBorder": _vm.hasBottomBorder,
      "accessible": true,
      "ariaLabel": (_vm.title + ",状态为" + (_vm.checked ? '已选中' : '未选中') + "," + (_vm.disabled ? '不可更改' : '点击可切换'))
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('text', {
    staticClass: ["title-text"],
    style: {
      color: _vm.textColor
    },
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _c('image', {
    staticClass: ["checkbox"],
    attrs: {
      "slot": "value",
      "src": _vm.checkIcon
    },
    slot: "value"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(189);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(190)

/* template */
var __vue_template__ = __webpack_require__(191)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-checkbox-list/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(13);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { WxcCheckbox: _index2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      checkedList: []
    };
  },
  created: function created() {
    var _this = this;

    var list = this.list;

    if (list && list.length > 0) {
      list.forEach(function (item, i) {
        item.checked && _this.checkedList.push(item.value);
      });
    }
  },

  methods: {
    wxcCheckBoxItemChecked: function wxcCheckBoxItemChecked(e) {
      if (e.checked) {
        this.checkedList.push(e.value);
      } else {
        var index = this.checkedList.indexOf(e.value);
        this.checkedList.splice(index, 1);
      }
      this.$emit('wxcCheckBoxListChecked', { checkedList: this.checkedList });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.list), function(item, i) {
    return _c('wxc-checkbox', _vm._b({
      key: i,
      attrs: {
        "config": _vm.config
      },
      on: {
        "wxcCheckBoxItemChecked": _vm.wxcCheckBoxItemChecked
      }
    }, 'wxc-checkbox', item, false))
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(193);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(194)
)

/* script */
__vue_exports__ = __webpack_require__(195)

/* template */
var __vue_template__ = __webpack_require__(196)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-countdown/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3e77327e"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports = {
  "time-dot-wrap": {
    "flexDirection": "row",
    "alignItems": "center"
  }
}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    // 时间戳
    time: {
      type: Number,
      default: 1501200000000
    },
    // 倒计时的间隔,单位为"毫秒"
    interval: {
      type: Number,
      default: 1000
    },
    tpl: {
      type: String,
      default: '{h}:{m}:{s}'
    },
    // 最外层包裹 style
    timeWrapStyle: Object,
    // 数字盒子 style
    timeBoxStyle: Object,
    // : 盒子Style
    dotBoxStyle: Object,
    // 数字文字 Style
    timeTextStyle: Object,
    // : 文字Style
    dotTextStyle: Object
  },
  data: function data() {
    return {
      NOW_DATE: new Date().getTime(),
      completed: false,
      tplIndexOfDays: -1,
      tplIndexOfHours: -1,
      tplIndexOfMinutes: -1,
      tplIndexOfSeconds: -1,
      TIME_WRAP_STYLE: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '12px',
        marginRight: '12px'
      },
      TIME_BOX_STYLE: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        height: '30px',
        width: '30px'
      },
      DOT_BOX_STYLE: {
        width: '18px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      TIME_TEXT_STYLE: {
        color: '#FFCC80',
        fontSize: '18px'
      },
      DOT_TEXT_STYLE: {
        color: '#333333',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    setInterval(function () {
      _this.NOW_DATE = new Date().getTime();
    }, this.interval);

    this.tplIndexOfDays = this.tpl.indexOf('d');
    this.tplIndexOfHours = this.tpl.indexOf('h');
    this.tplIndexOfMinutes = this.tpl.indexOf('m');
    this.tplIndexOfSeconds = this.tpl.indexOf('s');
  },

  computed: {
    mrTimeWrapStyle: function mrTimeWrapStyle() {
      return _extends({}, this.TIME_WRAP_STYLE, this.timeWrapStyle);
    },
    mrTimeBoxStyle: function mrTimeBoxStyle() {
      return _extends({}, this.TIME_BOX_STYLE, this.timeBoxStyle);
    },
    mrDotBoxStyle: function mrDotBoxStyle() {
      return _extends({}, this.DOT_BOX_STYLE, this.dotBoxStyle);
    },
    mrTimeTextStyle: function mrTimeTextStyle() {
      return _extends({}, this.TIME_TEXT_STYLE, this.timeTextStyle);
    },
    mrDotTextStyle: function mrDotTextStyle() {
      return _extends({}, this.DOT_TEXT_STYLE, this.dotTextStyle);
    },
    countDownData: function countDownData() {
      var timeSpacing = this.time - this.NOW_DATE;

      // 倒计时结束了
      if (timeSpacing < 0) {
        if (this.completed === false) {
          this.$emit('wxcOnComplete');
        }
        this.completed = true;
        return {
          day: '00',
          hour: '00',
          minute: '00',
          second: '00'
        };
      }

      var day = 0;
      var hour = 0;
      var minute = 0;
      var second = 0;

      if (this.tplIndexOfDays !== -1) {
        day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000));
        hour = Math.floor(timeSpacing % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      } else {
        day = 0;
        hour = Math.floor(timeSpacing / (60 * 60 * 1000));
      }

      if (this.tplIndexOfHours !== -1) {
        hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
      } else {
        hour = 0;
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000));
      }

      if (this.tplIndexOfMinutes !== -1) {
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));
        second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000) / 1000);
      } else {
        minute = 0;
        second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000);
      }

      return {
        day: day < 10 ? '0' + day : '' + day,
        hour: hour < 10 ? '0' + hour : '' + hour,
        minute: minute < 10 ? '0' + minute : '' + minute,
        second: second < 10 ? '0' + second : '' + second
      };
    }
  },

  methods: {
    getDot: function getDot(prevTagIndex) {
      var nextTagIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (nextTagIndex === -1) {
        return this.tpl.slice(prevTagIndex + 2);
      }
      return this.tpl.slice(prevTagIndex + 2, nextTagIndex - 1);
    }
  }
};

/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: _vm.mrTimeWrapStyle
  }, [_c('div', {
    staticClass: ["time-dot-wrap"]
  }, [(_vm.tplIndexOfDays !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.day) + "天")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.day))])]) : _vm._e(), (_vm.tplIndexOfDays !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfDays, _vm.tplIndexOfHours)))])]) : _vm._e(), (_vm.tplIndexOfHours !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.hour) + "时")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.hour))])]) : _vm._e(), (_vm.tplIndexOfHours !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfHours, _vm.tplIndexOfMinutes)))])]) : _vm._e(), (_vm.tplIndexOfMinutes !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.minute) + "分")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.minute))])]) : _vm._e(), (_vm.tplIndexOfMinutes !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfMinutes, _vm.tplIndexOfSeconds)))])]) : _vm._e(), (_vm.tplIndexOfSeconds !== -1) ? _c('div', {
    style: _vm.mrTimeBoxStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ((_vm.countDownData.second) + "秒")
    }
  }, [_c('text', {
    style: _vm.mrTimeTextStyle
  }, [_vm._v(_vm._s(_vm.countDownData.second))])]) : _vm._e(), (_vm.tplIndexOfSeconds !== -1) ? _c('div', {
    style: _vm.mrDotBoxStyle,
    attrs: {
      "ariaHidden": true
    }
  }, [_c('text', {
    style: _vm.mrDotTextStyle
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfSeconds, -1)))])]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(198);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(199)
)

/* script */
__vue_exports__ = __webpack_require__(200)

/* template */
var __vue_template__ = __webpack_require__(206)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-dialog/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0b887bce"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = {
  "container": {
    "position": "fixed",
    "width": "750",
    "zIndex": 99999
  },
  "dialog-box": {
    "position": "fixed",
    "left": "96",
    "width": "558",
    "backgroundColor": "#FFFFFF"
  },
  "dialog-content": {
    "paddingTop": "36",
    "paddingBottom": "36",
    "paddingLeft": "36",
    "paddingRight": "36"
  },
  "content-title": {
    "color": "#333333",
    "fontSize": "36",
    "textAlign": "center",
    "marginBottom": "24"
  },
  "content-subtext": {
    "color": "#666666",
    "fontSize": "26",
    "lineHeight": "36",
    "textAlign": "center"
  },
  "dialog-footer": {
    "flexDirection": "row",
    "alignItems": "center",
    "borderTopColor": "#F3F3F3",
    "borderTopWidth": "1"
  },
  "footer-btn": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "flex": 1,
    "height": "90"
  },
  "cancel": {
    "borderRightColor": "#F3F3F3",
    "borderRightWidth": "1"
  },
  "btn-text": {
    "fontSize": "36",
    "color": "#666666"
  },
  "no-prompt": {
    "width": "486",
    "alignItems": "center",
    "justifyContent": "center",
    "flexDirection": "row",
    "marginTop": "24"
  },
  "no-prompt-icon": {
    "width": "24",
    "height": "24",
    "marginRight": "12"
  },
  "no-prompt-text": {
    "fontSize": "24",
    "color": "#A5A5A5"
  }
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcOverlay = __webpack_require__(4);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

var _type = __webpack_require__(205);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    top: {
      type: Number,
      default: 400
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    mainBtnColor: {
      type: String,
      default: '#EE9900'
    },
    secondBtnColor: {
      type: String,
      default: '#666666'
    },
    showNoPrompt: {
      type: Boolean,
      default: false
    },
    noPromptText: {
      type: String,
      default: '不再提示'
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      noPromptIcon: _type.UN_CHECKED,
      pageHeight: 1334
    };
  },
  created: function created() {
    var _weex$config$env = weex.config.env,
        deviceHeight = _weex$config$env.deviceHeight,
        deviceWidth = _weex$config$env.deviceWidth;

    this.pageHeight = deviceHeight / deviceWidth * 750;
  },

  methods: {
    secondaryClicked: function secondaryClicked() {
      this.$emit('wxcDialogCancelBtnClicked', {
        type: 'cancel'
      });
    },
    primaryClicked: function primaryClicked(e) {
      this.$emit('wxcDialogConfirmBtnClicked', {
        type: 'confirm'
      });
    },
    noPromptClicked: function noPromptClicked(e) {
      var isChecked = !this.isChecked;
      this.noPromptIcon = isChecked ? _type.CHECKED : _type.UN_CHECKED;
      this.$emit('wxcDialogNoPromptClicked', { isChecked: isChecked });
    }
  }
};

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(202)
)

/* script */
__vue_exports__ = __webpack_require__(203)

/* template */
var __vue_template__ = __webpack_require__(204)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-overlay/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d892b940"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-overlay": {
    "width": "750",
    "position": "fixed",
    "left": 0,
    "top": 0,
    "bottom": 0,
    "right": 0
  }
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    },
    canAutoClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    overlayStyle: function overlayStyle() {
      return {
        opacity: this.hasAnimation ? 0 : 1,
        backgroundColor: 'rgba(0, 0, 0,' + this.opacity + ')'
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearOverlay(show);
      }, 50);
      return show;
    }
  },
  methods: {
    overlayClicked: function overlayClicked(e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
    },
    appearOverlay: function appearOverlay(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction,
          canAutoClose = this.canAutoClose;

      var needEmit = !bool && canAutoClose;
      needEmit && this.$emit('wxcOverlayBodyClicking', {});
      var overlayEl = this.$refs['wxc-overlay'];
      if (hasAnimation && overlayEl) {
        animation.transition(overlayEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          needEmit && _this2.$emit('wxcOverlayBodyClicked', {});
        });
      } else {
        needEmit && this.$emit('wxcOverlayBodyClicked', {});
      }
    }
  }
};

/***/ }),
/* 204 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('div', {
    ref: "wxc-overlay",
    staticClass: ["wxc-overlay"],
    style: _vm.overlayStyle,
    attrs: {
      "hack": _vm.shouldShow
    },
    on: {
      "click": _vm.overlayClicked
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/10/29.
 */

var CHECKED = exports.CHECKED = 'https://gw.alicdn.com/tfs/TB1UT3VpgMPMeJjy1XdXXasrXXa-42-42.png';
var UN_CHECKED = exports.UN_CHECKED = 'https://gw.alicdn.com/tfs/TB1hE3VpgMPMeJjy1XdXXasrXXa-42-42.png';

/***/ }),
/* 206 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"]
  }, [(_vm.show) ? _c('wxc-overlay', {
    attrs: {
      "show": true,
      "hasAnimation": false
    }
  }) : _vm._e(), (_vm.show) ? _c('div', {
    staticClass: ["dialog-box"],
    style: {
      top: _vm.top + 'px'
    }
  }, [_c('div', {
    staticClass: ["dialog-content"]
  }, [_vm._t("title", [_c('text', {
    staticClass: ["content-title"]
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._t("content", [_c('text', {
    staticClass: ["content-subtext"]
  }, [_vm._v(_vm._s(_vm.content))])]), (_vm.showNoPrompt) ? _c('div', {
    staticClass: ["no-prompt"],
    on: {
      "click": _vm.noPromptClicked
    }
  }, [_c('image', {
    staticClass: ["no-prompt-icon"],
    attrs: {
      "src": _vm.noPromptIcon
    }
  }), _c('text', {
    staticClass: ["no-prompt-text"]
  }, [_vm._v(_vm._s(_vm.noPromptText))])]) : _vm._e()], 2), _c('div', {
    staticClass: ["dialog-footer"]
  }, [(!_vm.single) ? _c('div', {
    staticClass: ["footer-btn", "cancel"],
    on: {
      "click": _vm.secondaryClicked
    }
  }, [_c('text', {
    staticClass: ["btn-text"],
    style: {
      color: _vm.secondBtnColor
    }
  }, [_vm._v(_vm._s(_vm.cancelText))])]) : _vm._e(), _c('div', {
    staticClass: ["footer-btn", "confirm"],
    on: {
      "click": _vm.primaryClicked
    }
  }, [_c('text', {
    staticClass: ["btn-text"],
    style: {
      color: _vm.mainBtnColor
    }
  }, [_vm._v(_vm._s(_vm.confirmText))])])])]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(208);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(209)
)

/* script */
__vue_exports__ = __webpack_require__(210)

/* template */
var __vue_template__ = __webpack_require__(211)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-ep-slider/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1cab7253"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports = {
  "slider": {
    "position": "absolute",
    "top": 0
  }
}

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _weexBindingx = __webpack_require__(3);

var _weexBindingx2 = _interopRequireDefault(_weexBindingx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var swipeBack = weex.requireModule('swipeBack');
var animation = weex.requireModule('animation');
exports.default = {
  props: {
    sliderId: {
      type: [String, Number],
      default: 1
    },
    panOffset: {
      type: Number,
      default: 80
    },
    cardLength: {
      type: Number,
      default: 1
    },
    selectIndex: {
      type: Number,
      default: 0
    },
    enableSwipe: {
      type: Boolean,
      default: true
    },
    containerS: {
      type: Object,
      default: function _default() {
        return {
          position: 'relative',
          width: 750,
          height: 352,
          overflow: 'hidden'
        };
      }
    },
    cardS: {
      type: Object,
      default: function _default() {
        return {
          width: 360,
          height: 300,
          spacing: 0,
          scale: 0.75
        };
      }
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: [Number, String],
      default: 1200
    }
  },
  data: function data() {
    return {
      isMoving: false,
      gesToken: 0,
      startX: 0,
      startTime: 0,
      currentIndex: 0,
      autoPlayTimer: null
    };
  },
  computed: {
    cardList: function cardList() {
      return new Array(this.cardLength + 1).join().split('');
    },
    cardWidth: function cardWidth() {
      return (this.cardLength - 1) * this.cardS.width + this.containerS.width + 235 + 'px';
    }
  },
  created: function created() {
    this.currentIndex = this.selectIndex;
  },
  mounted: function mounted() {
    var _this = this;

    // ios和页面返回冲突，组件里面将ios系统横滑返回禁止
    if (swipeBack && swipeBack.forbidSwipeBack) {
      swipeBack.forbidSwipeBack(true);
    }

    setTimeout(function () {
      var sliderCtn = _this.$refs['sliderCtn_' + _this.sliderId];
      if (_utils2.default.env.supportsEB() && sliderCtn && sliderCtn.ref) {
        _weexBindingx2.default.prepare && _weexBindingx2.default.prepare({
          anchor: sliderCtn.ref,
          eventType: 'pan'
        });
      }
    }, 20);
    this.checkNeedAutoPlay();
  },

  methods: {
    onPanStart: function onPanStart(e) {
      if (_utils2.default.env.supportsEB()) {
        return;
      }
      this.clearAutoPlay();
      this.startX = e.changedTouches[0].clientX;
      this.startTime = Date.now();
    },
    onPanMove: function onPanMove(e) {
      if (_utils2.default.env.supportsEB()) {
        return;
      }
      var moveX = e.changedTouches[0].clientX - this.startX;
      var index = this.loopedIndex(this.currentIndex, this.cardLength);
      var cardLength = this.cardLength;
      var currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);

      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      sliderCtn && animation.transition(sliderCtn, {
        styles: {
          transform: 'translateX(' + (moveX - currentCardLeft) + 'px)'
        },
        timingFunction: 'ease',
        delay: 0,
        duration: 0
      }, function () {});

      if (this.cardS.scale !== 1) {
        var currentCard = this.$refs['card' + this.loopedIndex(index, cardLength) + '_' + this.sliderId][0];
        currentCard && animation.transition(currentCard, {
          styles: {
            transform: 'scale(' + (1 - Math.abs(moveX) / this.cardS.width * (1 - this.cardS.scale)) + ')'
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 0
        }, function () {});
        // 左边的卡片
        var leftCard = this.$refs['card' + this.loopedIndex(index - 1, cardLength) + '_' + this.sliderId][0];
        // loop 函数负数返回 0，这里有点冲突
        if (leftCard && index !== 0) {
          animation.transition(leftCard, {
            styles: {
              transform: 'scale(' + (1 - Math.abs(moveX - this.cardS.width) / this.cardS.width * (1 - this.cardS.scale)) + ')'
            },
            timingFunction: 'ease',
            delay: 0,
            duration: 0
          }, function () {});
        }
        // 右边卡片
        var rightCard = this.$refs['card' + this.loopedIndex(index + 1, cardLength) + '_' + this.sliderId][0];
        rightCard && animation.transition(rightCard, {
          styles: {
            transform: 'scale(' + (1 - Math.abs(this.cardS.width + moveX) / this.cardS.width * (1 - this.cardS.scale)) + ')'
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 0
        }, function () {});
      }
    },
    onEpPanStart: function onEpPanStart(e) {
      var _this2 = this;

      if (_utils2.default.env.supportsEB() && e.state === 'start') {
        this.clearAutoPlay();
        setTimeout(function () {
          var sliderCtn = _this2.$refs['sliderCtn_' + _this2.sliderId];
          _this2.bindExp(sliderCtn);
        }, 0);
      }
    },
    onPanEnd: function onPanEnd(e) {
      if (_utils2.default.env.supportsEB()) {
        return;
      }
      this.panEnd(e);
    },
    panEnd: function panEnd(e) {
      var _this3 = this;

      this.isMoving = true;
      var moveX = e.deltaX;

      if (_utils2.default.env.isWeb()) {
        moveX = e.changedTouches[0].clientX - this.startX;
      }

      var originIndex = this.currentIndex;
      var selectIndex = originIndex;
      var duration = Date.now() - this.startTime;
      var panOffset = this.panOffset || this.cardS.width / 2;

      if (moveX < -panOffset || moveX < -10 && duration < 200) {
        if (selectIndex !== this.cardLength - 1) {
          selectIndex++;
        }
      } else if (moveX > panOffset || moveX > 10 && duration < 500) {
        if (selectIndex !== 0) {
          selectIndex--;
        }
      }

      this.slideTo(originIndex, selectIndex);
      setTimeout(function () {
        _this3.checkNeedAutoPlay();
      }, 3000);
    },
    slideTo: function slideTo(originIndex, selectIndex) {
      var _this4 = this;

      var currentCardScale = 1;
      var rightCardScale = this.cardS.scale;
      var leftCardScale = this.cardS.scale;
      var duration = selectIndex === 0 && originIndex === this.cardLength - 1 ? 0.00001 : 300;
      this.$emit('wxcEpSliderCurrentIndexSelected', { currentIndex: selectIndex });
      if (originIndex < selectIndex) {
        currentCardScale = this.cardS.scale;
        rightCardScale = 1;
      } else if (originIndex > selectIndex) {
        currentCardScale = this.cardS.scale;
        leftCardScale = 1;
      }
      var currentCard = this.$refs['card' + this.loopedIndex(originIndex, this.cardLength) + '_' + this.sliderId][0];
      currentCard && animation.transition(currentCard, {
        styles: {
          transform: 'scale(' + currentCardScale + ')'
        },
        timingFunction: 'ease',
        duration: duration
      }, function () {});

      var leftCard = this.$refs['card' + this.loopedIndex(originIndex - 1, this.cardLength) + '_' + this.sliderId][0];
      if (this.isMoving && leftCard && originIndex !== 0) {
        animation.transition(leftCard, {
          styles: {
            transform: 'scale(' + leftCardScale + ')'
          },
          timingFunction: 'ease',
          duration: duration
        }, function () {});
      }
      var rightCard = this.$refs['card' + this.loopedIndex(originIndex + 1, this.cardLength) + '_' + this.sliderId][0];
      if (rightCard && originIndex !== this.cardLength - 1) {
        animation.transition(rightCard, {
          styles: {
            transform: 'scale(' + rightCardScale + ')'
          },
          timingFunction: 'ease',
          duration: duration
        }, function () {});
      }

      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      sliderCtn && animation.transition(sliderCtn, {
        styles: {
          transform: 'translateX(-' + selectIndex * (this.cardS.width + this.cardS.spacing) + 'px)'
        },
        timingFunction: 'ease',
        duration: duration
      }, function () {
        _this4.isMoving = false;
        if (originIndex !== selectIndex) {
          _this4.currentIndex = selectIndex;
        }
      });
    },

    // 使index维持在0-length之间循环
    loopedIndex: function loopedIndex(index, total) {
      if (index < 0) {
        index = index + (1 - index / total) * total;
      }
      return index % total;
    },
    bindExp: function bindExp(element) {
      var _this5 = this;

      if (element && element.ref) {

        if (this.isMoving && this.gesToken !== 0) {
          _weexBindingx2.default.unbind({
            eventType: 'pan',
            token: this.gesToken
          });
          this.gesToken = 0;
          return;
        }

        this.startTime = Date.now();
        var index = this.loopedIndex(this.currentIndex, this.cardLength);
        var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
        var currentCard = this.$refs['card' + index + '_' + this.sliderId][0];
        var rightCard = null;
        var leftCard = null;
        var currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);

        // 卡片容器
        var sliderCtnExp = 'x - ' + currentCardLeft;
        var args = [{
          element: sliderCtn.ref,
          property: 'transform.translateX',
          expression: sliderCtnExp
        }];

        if (this.cardS.scale !== 1) {

          var currentCardExp = '1-abs(x)/' + this.cardS.width + '*' + (1 - this.cardS.scale);
          var leftCardExp = '1-abs(x-' + this.cardS.width + ')/' + this.cardS.width + '*' + (1 - this.cardS.scale);
          var rightCardExp = '1-abs(' + this.cardS.width + '+x)/' + this.cardS.width + '*' + (1 - this.cardS.scale);

          args.push({
            element: currentCard.ref,
            property: 'transform.scale',
            expression: currentCardExp
          });

          if (index === 0 && this.$refs['card' + (index + 1) + '_' + this.sliderId]) {

            rightCard = this.$refs['card' + (index + 1) + '_' + this.sliderId][0];
            args.push({
              element: rightCard.ref,
              property: 'transform.scale',
              expression: rightCardExp
            });
          } else if (index === this.cardLength - 1 && this.$refs['card' + (index - 1) + '_' + this.sliderId]) {
            leftCard = this.$refs['card' + (index - 1) + '_' + this.sliderId][0];
            args.push({
              element: leftCard.ref,
              property: 'transform.scale',
              expression: leftCardExp
            });
          } else if (this.$refs['card' + (index - 1) + '_' + this.sliderId]) {
            // 左边卡片
            leftCard = this.$refs['card' + (index - 1) + '_' + this.sliderId][0];
            args.push({
              element: leftCard.ref,
              property: 'transform.scale',
              expression: leftCardExp
            });
            // 右边卡片
            rightCard = this.$refs['card' + (index + 1) + '_' + this.sliderId][0];
            args.push({
              element: rightCard.ref,
              property: 'transform.scale',
              expression: rightCardExp
            });
          }
        }

        var gesTokenObj = _weexBindingx2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: args
        }, function (e) {
          if (!_this5.isMoving && (e.state === 'end' || e.state === 'cancel' || e.state === 'exit')) {
            _this5.panEnd(e);
          }
        });

        this.gesToken = gesTokenObj.token;
      }
    },
    checkNeedAutoPlay: function checkNeedAutoPlay() {
      var _this6 = this;

      if (this.autoPlay) {
        this.clearAutoPlay();
        this.autoPlayTimer = setInterval(function () {
          _this6.slideTo(_this6.currentIndex, _this6.loopedIndex(_this6.currentIndex + 1, _this6.cardLength));
        }, parseInt(this.interval));
      }
    },
    clearAutoPlay: function clearAutoPlay() {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    },
    rebind: function rebind() {
      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      if (sliderCtn && sliderCtn.ref) {
        _weexBindingx2.default.unbind({
          eventType: 'pan',
          token: this.gesToken
        });
        this.gesToken = 0;
        this.bindExp(sliderCtn);
      }
    },
    manualSetPage: function manualSetPage(selectIndex) {
      var _this7 = this;

      this.clearAutoPlay();
      var step = this.currentIndex < selectIndex ? 1 : -1;
      this.slideTo(this.loopedIndex(selectIndex - step, this.cardLength), selectIndex);
      setTimeout(function () {
        _this7.checkNeedAutoPlay();
      }, 3000);
    }
  }
};

/***/ }),
/* 211 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: _vm.containerS
  }, [_c('div', {
    ref: ("sliderCtn_" + _vm.sliderId),
    style: {
      width: _vm.cardWidth + 'px',
      height: _vm.cardS.height + 'px',
      transform: ("translateX(-" + (_vm.currentIndex * (_vm.cardS.width + _vm.cardS.spacing)) + "px)")
    },
    on: {
      "panstart": _vm.onPanStart,
      "panmove": _vm.onPanMove,
      "panend": _vm.onPanEnd,
      "horizontalpan": _vm.onEpPanStart
    }
  }, _vm._l((_vm.cardList), function(v, index) {
    return _c('div', {
      ref: ("card" + index + "_" + _vm.sliderId),
      refInFor: true,
      staticClass: ["slider"],
      style: {
        transform: ("scale(" + (index===_vm.currentIndex ? 1 : _vm.cardS.scale) + ")"),
        left: ((index * (_vm.cardS.width+_vm.cardS.spacing)) + "px"),
        marginLeft: (((_vm.containerS.width - _vm.cardS.width) / 2) + "px"),
        width: _vm.cardS.width + 'px',
        height: _vm.cardS.height + 'px'
      }
    }, [_vm._t(("card" + index + "_" + _vm.sliderId))], 2)
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(213);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(214)

/* template */
var __vue_template__ = __webpack_require__(215)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-pan-item/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weexBindingx = __webpack_require__(3);

var _weexBindingx2 = _interopRequireDefault(_weexBindingx);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      isPanning: false,
      appearMap: [],
      supportAndroid: _utils2.default.env.supportsEBForAndroid()
    };
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      if (_this.supportAndroid) {
        var element = _this.$refs['wxc-pan-item'];
        _weexBindingx2.default.prepare && _weexBindingx2.default.prepare({
          anchor: element.ref,
          eventType: 'pan'
        });
      }
    }, 300);
  },

  methods: {
    itemClicked: function itemClicked() {
      if (this.isPanning) {
        return;
      }
      this.url && _utils2.default.goToH5Page(this.url, true);
      this.$emit('wxcPanItemClicked', { extId: this.extId });
    },
    dispatchPan: function dispatchPan(e) {
      var _this2 = this;

      if (this.supportAndroid) {
        if (e.state === 'start') {
          this.isPanning = true;
          var element = this.$refs['wxc-pan-item'];
          element && this.$emit('wxcPanItemPan', { element: element });
        } else if (e.state === 'end') {
          setTimeout(function () {
            _this2.isPanning = false;
          }, 50);
        }
      }
    }
  }
};

/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.supportAndroid) ? _c('div', {
    ref: "wxc-pan-item",
    on: {
      "horizontalpan": _vm.dispatchPan,
      "appear": _vm.onItemAppear,
      "disappear": _vm.onItemDisAppear,
      "click": _vm.itemClicked
    }
  }, [_vm._t("default")], 2) : _c('div', {
    ref: "wxc-pan-item",
    on: {
      "click": _vm.itemClicked
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(217);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(218)
)

/* script */
__vue_exports__ = __webpack_require__(219)

/* template */
var __vue_template__ = __webpack_require__(224)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-grid-select/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-378b5a33"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports = {
  "grid-select": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "flexWrap": "wrap"
  }
}

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _option = __webpack_require__(220);

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { Option: _option2.default },
  props: {
    // 列数
    cols: {
      type: Number,
      default: 4
    },
    // 是否单选
    single: {
      type: Boolean,
      default: false
    },
    // 数据
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 选择个数限制
    limit: {
      type: Number
    },
    // 用户自定义样式，用于个性化设置option样式
    customStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      dList: this.initList()
    };
  },

  computed: {
    cHackList: function cHackList() {
      var list = this.list,
          cols = this.cols;

      var remainder = list.length % cols;
      var len = remainder ? cols - remainder : 0;

      return Array.apply(null, { length: len });
    }
  },
  watch: {
    list: function list() {
      this.dList = this.initList();
    }
  },
  created: function created() {
    // 行间距
    this.lineSpacing = this.customStyles.lineSpacing || '12px';
  },

  methods: {
    onSelect: function onSelect(index) {
      var checked = this.dList[index].checked;
      if (this.limit <= this.checkedCount && !checked) {
        this.$emit('overLimit', this.limit);
      } else {
        this.updateList(index);
        this.$emit('select', {
          selectIndex: index,
          checked: !checked,
          checkedList: this.dList.filter(function (item) {
            return item.checked;
          })
        });
      }
    },
    initList: function initList() {
      var single = this.single;
      var checkedCount = 0;

      var dList = this.list.map(function (item, i) {
        var checked = item.checked,
            disabled = item.disabled;

        disabled = !!disabled;
        // disabled为true时认为checked无效，同时单选模式下只认为第一个checked为true的为有效值
        checked = !disabled && !!checked && (!single || checkedCount === 0);
        if (item.checked) checkedCount += 1;
        return _extends({}, item, {
          checked: checked,
          disabled: disabled
        });
      });

      this.checkedCount = checkedCount;
      return dList;
    },
    updateList: function updateList(index) {
      var single = this.single;
      var checkedCount = 0;
      this.dList = this.dList.map(function (item, i) {
        if (single) {
          item.checked = index === i && !item.checked;
        } else {
          if (i === index) item.checked = !item.checked;
        }
        if (item.checked) checkedCount += 1;
        return item;
      });
      this.checkedCount = checkedCount;
    }
  }
};

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(221)
)

/* script */
__vue_exports__ = __webpack_require__(222)

/* template */
var __vue_template__ = __webpack_require__(223)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-grid-select/option.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3c528c38"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports = {
  "grid-option": {
    "justifyContent": "center",
    "borderRadius": "8",
    "borderWidth": "2",
    "paddingLeft": "6",
    "paddingRight": "6"
  },
  "text-title": {
    "lines": 2,
    "overflow": "hidden",
    "lineHeight": "30",
    "textOverflow": "ellipsis",
    "textAlign": "center",
    "fontSize": "26"
  },
  "image-checked": {
    "position": "absolute",
    "right": 0,
    "bottom": 0,
    "width": "38",
    "height": "34"
  }
}

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    index: {
      type: Number,
      default: -1
    },
    // 是否选中
    checked: {
      type: Boolean,
      default: false
    },
    // 是否可选
    disabled: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '166px'
    },
    height: {
      type: String,
      default: '72px'
    },
    // 默认 x
    icon: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB1IAByhgMPMeJjy1XdXXasrXXa-38-34.png'
    },
    // 正常状态文字色值
    color: {
      type: String,
      default: '#3d3d3d'
    },
    // 选中状态文字色值
    checkedColor: {
      type: String,
      default: '#3d3d3d'
    },
    // 不可选状态文字色值
    disabledColor: {
      type: String,
      default: '#9b9b9b'
    },
    // 正常状态边框色值
    borderColor: {
      type: String,
      default: 'transparent'
    },
    // 选中状态边框色值
    checkedBorderColor: {
      type: String,
      default: '#ffb200'
    },
    // 不可选状态边框色值
    disabledBorderColor: {
      type: String,
      default: 'transparent'
    },
    // 正常状态背景色值
    backgroundColor: {
      type: String,
      default: '#f6f6f6'
    },
    // 选中状态背景色值
    checkedBackgroundColor: {
      type: String,
      default: '#ffffff'
    },
    // 不可选状态背景色值
    disabledBackgroundColor: {
      type: String,
      default: '#f6f6f6'
    }
  },
  computed: {
    cWrapperStyle: function cWrapperStyle() {
      var checked = this.checked,
          disabled = this.disabled,
          width = this.width,
          height = this.height,
          borderColor = this.borderColor,
          checkedBorderColor = this.checkedBorderColor,
          disabledBorderColor = this.disabledBorderColor,
          backgroundColor = this.backgroundColor,
          checkedBackgroundColor = this.checkedBackgroundColor,
          disabledBackgroundColor = this.disabledBackgroundColor;

      return {
        width: width,
        height: height,
        borderColor: disabled ? disabledBorderColor : checked ? checkedBorderColor : borderColor,
        backgroundColor: disabled ? disabledBackgroundColor : checked ? checkedBackgroundColor : backgroundColor
      };
    },
    cTitleStyle: function cTitleStyle() {
      var checked = this.checked,
          disabled = this.disabled,
          color = this.color,
          checkedColor = this.checkedColor,
          disabledColor = this.disabledColor;

      return {
        color: disabled ? disabledColor : checked ? checkedColor : color
      };
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.disabled) {
        this.$emit('select', this.index);
      }
    }
  }
};

/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["grid-option"],
    style: _vm.cWrapperStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": (_vm.title + "," + (_vm.checked?'已选中':'未选中'))
    },
    on: {
      "click": _vm.onClick
    }
  }, [(_vm.title) ? _c('text', {
    staticClass: ["text-title"],
    style: _vm.cTitleStyle
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), (_vm.checked && _vm.icon) ? _c('image', {
    staticClass: ["image-checked"],
    attrs: {
      "src": _vm.icon
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 224 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["grid-select"]
  }, [_vm._l((_vm.dList), function(item, index) {
    return _c('option', _vm._b({
      key: index,
      style: {
        marginTop: index >= _vm.cols ? _vm.lineSpacing : null
      },
      attrs: {
        "index": index
      },
      on: {
        "select": function($event) {
          _vm.onSelect(index)
        }
      }
    }, 'option', Object.assign({}, _vm.customStyles, item), false))
  }), _vm._l((_vm.cHackList), function(item, index) {
    return _c('option', _vm._b({
      key: index,
      style: {
        opacity: 0,
        marginTop: _vm.dList.length >= _vm.cols ? _vm.lineSpacing : null
      }
    }, 'option', Object.assign({}, _vm.customStyles, item), false))
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(226);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(227)
)

/* script */
__vue_exports__ = __webpack_require__(228)

/* template */
var __vue_template__ = __webpack_require__(230)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-icon/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-9fc2df02"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 227 */
/***/ (function(module, exports) {

module.exports = {
  "icon-font": {
    "color": "#666666"
  }
}

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//

var _type = __webpack_require__(229);

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = weex.requireModule('dom');

exports.default = {
  props: {
    name: {
      default: 'success',
      type: String
    },
    size: {
      default: 'small',
      type: String
    },
    iconStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      Icon: _type2.default
    };
  },
  beforeCreate: function beforeCreate() {
    dom.addRule('fontFace', {
      'fontFamily': "weexUiIconFont",
      'src': "url('//at.alicdn.com/t/font_520368_r89ekv69euahsemi.ttf')"
    });
  },

  computed: {
    mergeStyle: function mergeStyle() {
      var iconStyle = this.iconStyle,
          size = this.size;

      var fontSize = '48px';
      switch (size) {
        case 'xs':
          fontSize = '24px';
          break;
        case 'small':
          fontSize = '48px';
          break;
        case 'medium':
          fontSize = '72px';
          break;
        case 'big':
          fontSize = '128px';
          break;
        default:
          fontSize = '48px';
      }
      return _extends({
        fontFamily: 'weexUiIconFont',
        fontSize: fontSize
      }, iconStyle);
    }
  },
  methods: {
    itemClicked: function itemClicked(name) {
      this.$emit('wxcIconClicked', {
        name: name
      });
    }
  }
};

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  less: '\uE6A5',
  'more_unfold': '\uE6A6',
  back: '\uE697',
  more: '\uE6A7',
  add: '\uE6B9',
  subtract: '\uE6FE',
  close: '\uE69A',
  cry: '\uE69C',
  delete: '\uE69D',
  help: '\uE6A3',
  refresh: '\uE6AA',
  search: '\uE6AC',
  success: '\uE6B1',
  warning: '\uE6B6',
  wrong: '\uE6B7',
  clock: '\uE6BB',
  scanning: '\uE6EC',
  filter: '\uE6F1',
  map: '\uE715',
  play: '\uE719'
};

/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    staticClass: ["icon-font"],
    style: _vm.mergeStyle,
    on: {
      "click": function($event) {
        _vm.itemClicked(_vm.name)
      }
    }
  }, [_vm._v(_vm._s(_vm.Icon[_vm.name]))])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(232);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(233)
)

/* script */
__vue_exports__ = __webpack_require__(234)

/* template */
var __vue_template__ = __webpack_require__(239)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-lightbox/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6283047b"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 233 */
/***/ (function(module, exports) {

module.exports = {
  "indicator": {
    "position": "absolute",
    "itemColor": "rgba(255,195,0,0.5)",
    "itemSelectedColor": "#ffc300",
    "itemSize": "20",
    "height": "20",
    "bottom": "24"
  }
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _wxcMask = __webpack_require__(14);

var _wxcMask2 = _interopRequireDefault(_wxcMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    WxcMask: _wxcMask2.default
  },
  props: {
    width: {
      type: [Number, String],
      default: 750
    },
    height: {
      type: [Number, String],
      default: 750
    },
    show: {
      type: Boolean,
      default: false
    },
    imageList: Array,
    indicatorColor: {
      type: Object,
      default: function _default() {
        return {
          'item-color': 'rgba(255, 195, 0, .5)',
          'item-selected-color': '#ffc300',
          'item-size': '20px'
        };
      }
    }
  },
  computed: {
    indicatorStyle: function indicatorStyle() {
      return _extends({
        width: this.width + 'px'
      }, this.indicatorColor);
    }
  },
  methods: {
    maskOverlayClick: function maskOverlayClick() {
      this.$emit('wxcLightboxOverlayClicked', {});
    }
  }
};

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(236)
)

/* script */
__vue_exports__ = __webpack_require__(237)

/* template */
var __vue_template__ = __webpack_require__(238)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-mask/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-8aafb19c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports = {
  "container": {
    "position": "fixed",
    "width": "750",
    "zIndex": 99999
  },
  "wxc-mask": {
    "position": "fixed",
    "top": "300",
    "left": "60",
    "width": "702",
    "height": "800"
  },
  "mask-bottom": {
    "width": "100",
    "height": "100",
    "backgroundColor": "rgba(0,0,0,0)",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "mask-close-icon": {
    "width": "64",
    "height": "64"
  }
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _wxcOverlay = __webpack_require__(4);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    height: {
      type: [String, Number],
      default: 800
    },
    width: {
      type: [String, Number],
      default: 702
    },
    show: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: 300
    },
    hasOverlay: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          canAutoClose: true,
          duration: 300,
          opacity: 0.6
        };
      }
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    overlayCanClose: {
      type: Boolean,
      default: true
    },
    maskBgColor: {
      type: String,
      default: '#ffffff'
    }
  },
  data: function data() {
    return {
      closeIcon: 'https://gw.alicdn.com/tfs/TB1qDJUpwMPMeJjy1XdXXasrXXa-64-64.png',
      maskTop: 264,
      opened: false
    };
  },
  computed: {
    mergeOverlayCfg: function mergeOverlayCfg() {
      return _extends({}, this.overlayCfg, {
        hasAnimation: this.hasAnimation
      });
    },
    maskStyle: function maskStyle() {
      var width = this.width,
          height = this.height,
          showClose = this.showClose,
          hasAnimation = this.hasAnimation,
          opened = this.opened;

      var newHeight = showClose ? height - 0 + 100 : height;
      var _weex$config$env = weex.config.env,
          deviceHeight = _weex$config$env.deviceHeight,
          deviceWidth = _weex$config$env.deviceWidth,
          platform = _weex$config$env.platform;

      var _deviceHeight = deviceHeight || 1334;
      var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
      var navHeight = isWeb ? 0 : 130;
      var pageHeight = _deviceHeight / deviceWidth * 750 - navHeight;
      return {
        width: width + 'px',
        height: newHeight + 'px',
        left: (750 - width) / 2 + 'px',
        top: (pageHeight - height) / 2 + 'px',
        opacity: hasAnimation && !opened ? 0 : 1
      };
    },
    contentStyle: function contentStyle() {
      return {
        width: this.width + 'px',
        backgroundColor: this.maskBgColor,
        height: this.height + 'px',
        borderRadius: this.borderRadius + 'px'
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearMask(show);
      }, 50);
      return show;
    }
  },
  methods: {
    closeIconClicked: function closeIconClicked() {
      this.appearMask(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      if (this.hasAnimation) {
        this.appearMask(false);
        this.$emit('wxcOverlayBodyClicking', {});
      }
    },
    wxcOverlayBodyClicked: function wxcOverlayBodyClicked() {
      if (!this.hasAnimation) {
        this.appearMask(false);
        this.$emit('wxcOverlayBodyClicked', {});
      }
    },
    needEmit: function needEmit() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.opened = bool;
      !bool && this.$emit('wxcMaskSetHidden', {});
    },
    appearMask: function appearMask(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction;

      var maskEl = this.$refs['wxc-mask'];
      if (hasAnimation && maskEl) {
        animation.transition(maskEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          _this2.needEmit(bool);
        });
      } else {
        this.needEmit(bool);
      }
    }
  }
};

/***/ }),
/* 238 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["container"]
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    attrs: {
      "show": _vm.show && _vm.hasOverlay,
      "canAutoClose": _vm.overlayCanClose
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking,
      "wxcOverlayBodyClicked": _vm.wxcOverlayBodyClicked
    }
  }, 'wxc-overlay', _vm.mergeOverlayCfg, false)) : _vm._e(), (_vm.show) ? _c('div', {
    ref: "wxc-mask",
    staticClass: ["wxc-mask"],
    style: _vm.maskStyle,
    attrs: {
      "hack": _vm.shouldShow
    }
  }, [_c('div', {
    style: _vm.contentStyle
  }, [_vm._t("default")], 2), (_vm.showClose) ? _c('div', {
    staticClass: ["mask-bottom"],
    style: {
      width: _vm.width + 'px'
    },
    on: {
      "click": _vm.closeIconClicked
    }
  }, [_c('image', {
    staticClass: ["mask-close-icon"],
    attrs: {
      "src": _vm.closeIcon,
      "ariaLabel": "关闭"
    }
  })]) : _vm._e()]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 239 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-mask', {
    attrs: {
      "width": _vm.width,
      "height": _vm.height,
      "ariaHidden": "true",
      "maskBgColor": "transparent",
      "overlayOpacity": "0.8",
      "show": _vm.show,
      "showClose": false
    },
    on: {
      "wxcMaskSetHidden": _vm.maskOverlayClick
    }
  }, [(_vm.show) ? _c('slider', {
    style: {
      height: _vm.height + 'px'
    },
    attrs: {
      "autoPlay": "false"
    }
  }, [_vm._l((_vm.imageList), function(v, index) {
    return _c('div', {
      key: index,
      style: {
        height: _vm.height + 'px'
      }
    }, [_c('image', {
      style: {
        height: _vm.height + 'px',
        width: _vm.width + 'px'
      },
      attrs: {
        "resize": "cover",
        "src": v.src
      }
    })])
  }), _c('indicator', {
    staticClass: ["indicator"],
    style: _vm.indicatorStyle
  })], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(241);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(242)
)

/* script */
__vue_exports__ = __webpack_require__(243)

/* template */
var __vue_template__ = __webpack_require__(244)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-loading/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-54d5ed68"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 242 */
/***/ (function(module, exports) {

module.exports = {
  "loading-need-mask": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "rgba(0,0,0,0.2)"
  },
  "wxc-loading": {
    "position": "fixed",
    "left": "287",
    "top": "500",
    "zIndex": 9999
  },
  "loading-box": {
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "20",
    "width": "175",
    "height": "175",
    "backgroundColor": "rgba(0,0,0,0.8)"
  },
  "trip-loading": {
    "backgroundColor": "rgba(0,0,0,0.2)"
  },
  "loading-trip-image": {
    "height": "75",
    "width": "75"
  },
  "loading-text": {
    "color": "#ffffff",
    "fontSize": "24",
    "lineHeight": "30",
    "height": "30",
    "marginTop": "8",
    "textOverflow": "ellipsis",
    "width": "140",
    "textAlign": "center"
  }
}

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(15);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    interval: {
      type: [Number, String],
      default: 0
    },
    needMask: {
      type: Boolean,
      default: false
    },
    maskStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      showLoading: false,
      tid: 0
    };
  },
  watch: {
    show: function show() {
      this.setShow();
    }
  },
  computed: {
    loading: function loading() {
      var loading = {};
      switch (this.type) {
        case 'trip':
          loading = {
            url: _type.GIF,
            class: 'trip-loading'
          };
          break;
        default:
          loading = {
            url: _type.BLACK_GIF,
            class: 'default-loading'
          };
      }
      return loading;
    },
    topPosition: function topPosition() {
      return (_utils2.default.env.getPageHeight() - 200) / 2;
    }
  },
  created: function created() {
    this.setShow();
  },

  methods: {
    maskClicked: function maskClicked() {
      this.needMask && this.$emit('wxcLoadingMaskClicked', {});
    },
    setShow: function setShow() {
      var _this = this;

      var interval = this.interval,
          show = this.show,
          showLoading = this.showLoading;

      var stInterval = parseInt(interval);
      clearTimeout(this.tid);
      if (show) {
        if (showLoading) {
          return;
        }
        if (stInterval === 0) {
          this.showLoading = true;
        } else {
          this.tid = setTimeout(function () {
            _this.showLoading = true;
          }, stInterval);
        }
      } else {
        this.showLoading = false;
      }
    }
  }
};

/***/ }),
/* 244 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: [_vm.showLoading && _vm.needMask && 'loading-need-mask'],
    style: _vm.maskStyle,
    on: {
      "click": _vm.maskClicked
    }
  }, [(_vm.showLoading) ? _c('div', {
    staticClass: ["wxc-loading"],
    style: {
      top: _vm.topPosition + 'px'
    }
  }, [_c('div', {
    class: ['loading-box', _vm.loading.class],
    attrs: {
      "ariaHidden": true
    }
  }, [_c('image', {
    staticClass: ["loading-trip-image"],
    attrs: {
      "src": _vm.loading.url,
      "resize": "contain",
      "quality": "original"
    }
  }), (_vm.loadingText) ? _c('text', {
    staticClass: ["loading-text"]
  }, [_vm._v(_vm._s(_vm.loadingText))]) : _vm._e()])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(246);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(247)

/* template */
var __vue_template__ = __webpack_require__(248)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-part-loading/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(15);

exports.default = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 36
    },
    height: {
      type: [Number, String],
      default: 36
    }
  },
  data: function data() {
    return {
      PART: _type.PART
    };
  },
  computed: {
    loadingStyle: function loadingStyle() {
      var height = this.height,
          width = this.width;

      return {
        height: height + 'px',
        width: width + 'px'
      };
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 248 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('image', {
    style: _vm.loadingStyle,
    attrs: {
      "src": _vm.PART,
      "resize": "contain",
      "quality": "original"
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(250)
)

/* script */
__vue_exports__ = __webpack_require__(251)

/* template */
var __vue_template__ = __webpack_require__(252)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-minibar/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5286246c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 250 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-minibar": {
    "width": "750",
    "height": "90",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#009ff0"
  },
  "left": {
    "width": "180",
    "paddingLeft": "32"
  },
  "middle-title": {
    "fontSize": "30",
    "color": "#ffffff",
    "height": "36",
    "lineHeight": "34"
  },
  "right": {
    "width": "180",
    "paddingRight": "32",
    "alignItems": "flex-end"
  },
  "left-button": {
    "width": "21",
    "height": "36"
  },
  "right-button": {
    "width": "32",
    "height": "32"
  },
  "icon-text": {
    "fontSize": "28",
    "color": "#ffffff"
  }
}

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Navigator = weex.requireModule('navigator');
exports.default = {
  props: {
    backgroundColor: {
      type: String,
      default: '#FFC900'
    },
    leftButton: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'
    },
    textColor: {
      type: String,
      default: '#3D3D3D'
    },
    rightButton: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    useDefaultReturn: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    leftButtonClicked: function leftButtonClicked() {
      var self = this;
      if (self.useDefaultReturn) {
        Navigator.pop({}, function (e) {});
      }
      self.$emit('wxcMinibarLeftButtonClicked', {});
    },
    rightButtonClicked: function rightButtonClicked() {
      var self = this;
      if (self.rightText || self.rightButton) {
        self.$emit('wxcMinibarRightButtonClicked', {});
      }
    }
  }
};

/***/ }),
/* 252 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wxc-minibar"],
    style: {
      backgroundColor: _vm.backgroundColor
    }
  }, [_c('div', {
    staticClass: ["left"],
    attrs: {
      "ariaLabel": "返回",
      "accessible": true
    },
    on: {
      "click": _vm.leftButtonClicked
    }
  }, [_vm._t("left", [(_vm.leftButton && !_vm.leftText) ? _c('image', {
    staticClass: ["left-button"],
    attrs: {
      "src": _vm.leftButton
    }
  }) : _vm._e(), (_vm.leftText) ? _c('text', {
    staticClass: ["icon-text"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.leftText))]) : _vm._e()])], 2), _vm._t("middle", [_c('text', {
    staticClass: ["middle-title"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.title))])]), _c('div', {
    staticClass: ["right"],
    on: {
      "click": _vm.rightButtonClicked
    }
  }, [_vm._t("right", [(_vm.rightButton && !_vm.rightText) ? _c('image', {
    staticClass: ["right-button"],
    attrs: {
      "src": _vm.rightButton,
      "ariaHidden": true
    }
  }) : _vm._e(), (_vm.rightText) ? _c('text', {
    staticClass: ["icon-text"],
    style: {
      color: _vm.textColor
    }
  }, [_vm._v(_vm._s(_vm.rightText))]) : _vm._e()])], 2)], 2) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(254);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(255)
)

/* script */
__vue_exports__ = __webpack_require__(256)

/* template */
var __vue_template__ = __webpack_require__(264)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-lottery-rain/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-c172cc44"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-lottery-rain": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "rgba(133,11,11,0.8)"
  }
}

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rainItem = __webpack_require__(257);

var _rainItem2 = _interopRequireDefault(_rainItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { RainItem: _rainItem2.default },
  props: {
    picList: Array,
    config: Object,
    wrapStyle: Object
  },
  methods: {
    wxcLotteryRainCaught: function wxcLotteryRainCaught(e) {
      this.$emit('wxcLotteryRainCaught', { rainId: e.rainId });
    },
    destroy: function destroy() {
      var picList = this.picList;

      var length = picList.length;
      for (var i = 0; i < length; i++) {
        this.$refs['rain-item-' + i][0].destroy();
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(258)
)

/* script */
__vue_exports__ = __webpack_require__(259)

/* template */
var __vue_template__ = __webpack_require__(263)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-lottery-rain/rain-item.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7e7307b8"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 258 */
/***/ (function(module, exports) {

module.exports = {
  "rain-item": {
    "position": "absolute",
    "opacity": 0
  }
}

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _animate = __webpack_require__(260);

var Ani = _interopRequireWildcard(_animate);

var _config = __webpack_require__(261);

var CFG = _interopRequireWildcard(_config);

var _region = __webpack_require__(262);

var _region2 = _interopRequireDefault(_region);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  props: {
    src: String,
    rainId: [String, Number],
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    // 合并用户配置和默认
    cfg: function cfg() {
      return _extends({}, CFG.DEFAULT, this.config);
    }
  },
  data: function data() {
    return {
      showItem: false,
      hiding: false,
      pos: {},
      showTimer: null,
      hideTimer: null,
      intervalTimer: null
    };
  },
  created: function created() {
    var _cfg = this.cfg,
        width = _cfg.width,
        height = _cfg.height;

    this.pos = _region2.default.get(width, height);
  },
  mounted: function mounted() {
    this.start();
  },

  methods: {
    start: function start() {
      var _this = this;

      var cfg = this.cfg;

      var random = Math.round(Math.random() * cfg.randomTime);
      var showTime = cfg.showTime + random;
      var intervalTime = Math.max(cfg.intervalTime, cfg.showAniTime + showTime + cfg.hideAniTime) + random;

      this.onShow = function () {
        _this.hideTimer = setTimeout(function () {
          _this.hide();
        }, showTime);
      };

      this.onHide = function () {
        _region2.default.remove(_this.pos);
        _this.pos = {};
        _this.showItem = false;
        _this.hiding = false;
        var _cfg2 = _this.cfg,
            width = _cfg2.width,
            height = _cfg2.height;

        _this.pos = _region2.default.get(width, height);
      };

      this.showTimer = setTimeout(function () {
        _this.show();
      }, random);

      this.intervalTimer = setInterval(function () {
        _this.show();
      }, intervalTime);
    },
    hide: function hide() {
      var cfg = this.cfg,
          rainId = this.rainId;

      this.hiding = true;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      Ani.hidePig(this.$refs['rain-item-' + rainId], cfg.hideAniTime, this.onHide);
    },
    show: function show() {
      var cfg = this.cfg,
          rainId = this.rainId;

      this.showItem = true;
      Ani.showPig(this.$refs['rain-item-' + rainId], cfg.showAniTime, this.onShow);
    },
    caught: function caught() {
      var _this2 = this;

      var rainId = this.rainId,
          hiding = this.hiding;

      if (hiding) return;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      Ani.shakePig(this.$refs['rain-item-' + rainId], function () {
        _this2.hide();
      });
      this.$emit('wxcLotteryRainCaught', { rainId: rainId });
    },
    destroy: function destroy() {
      _region2.default.remove(this.pos);
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      clearInterval(this.intervalTimer);
      this.showItem = false;
    }
  }
};

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showPig = showPig;
exports.hidePig = hidePig;
exports.shakePig = shakePig;

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/09/06.
 * 红包雨动画类
 */

var animation = weex.requireModule('animation');


var isIos = _utils2.default.env.isIOS();

function showPig(ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, -140px)',
      opacity: 1
    },
    duration: duration,
    timingFunction: 'ease-in'
  }, function () {
    callback && callback();
  });
}

function hidePig(ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, 0)',
      opacity: 0
    },
    duration: duration,
    timingFunction: 'ease-out'
  }, function () {
    callback && callback();
  });
}

function shakePig(ref, callback) {
  var duration = isIos ? 20 : 10;
  ref && animation.transition(ref, {
    styles: {
      transform: 'rotate(12deg) translate(0, -140px)'
    },
    duration: duration,
    timingFunction: 'ease-in'
  }, function () {
    animation.transition(ref, {
      styles: {
        transform: 'rotate(0) translate(0, -140px)'
      },
      duration: duration,
      timingFunction: 'ease-out'
    }, function () {
      animation.transition(ref, {
        styles: {
          transform: 'rotate(-12deg) translate(0, -140px)'
        },
        duration: duration,
        timingFunction: 'ease-in'
      }, function () {
        animation.transition(ref, {
          styles: {
            transform: 'rotate(0) translate(0, -140px)'
          },
          duration: duration,
          timingFunction: 'ease-out'
        }, function () {
          callback && callback();
        });
      });
    });
  });
}

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT = exports.DEFAULT = {
  intervalTime: 400,
  hideAniTime: 300,
  showAniTime: 300,
  showTime: 400,
  randomTime: 300,
  width: 241,
  height: 206
};

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Region = {
  regions: [],
  isCross: function isCross(region) {
    var regions = this.regions;


    region.right = region.left + region.width;
    region.bottom = region.top + region.height;

    for (var i = 0; i < regions.length; i++) {
      var curRegion = regions[i];
      // 两区域相交
      curRegion.right = curRegion.left + curRegion.width;
      curRegion.bottom = curRegion.top + curRegion.height;
      if (!(region.left > curRegion.right || region.right < curRegion.left || region.bottom < curRegion.top || region.top > curRegion.bottom)) {
        return true;
      }
    }
    return false;
  },
  get: function get(width, height) {
    if (!width || !height) {
      return;
    }
    var i = 1000;
    var viewWidth = 750;
    var viewHeight = _utils2.default.env.getPageHeight();
    var wrapWidth = viewWidth - width;
    var wrapHeight = viewHeight - height - 140;
    wrapHeight = wrapHeight < 0 ? 0 : wrapHeight;
    wrapWidth = wrapWidth < 0 ? 0 : wrapWidth;

    var region = {
      left: '-9999px',
      top: '-9999px',
      width: width + 'px',
      height: height + 'px'
    };
    while (i--) {
      region.left = Math.round(Math.random() * wrapWidth) + 'px';
      region.top = Math.round(Math.random() * wrapHeight + height) + 'px';
      if (!this.isCross(region)) {
        this.add(region);
        return region;
      }
    }
  },
  buildRandom: function buildRandom() {
    return new Date().getTime() + '_' + parseInt(Math.random() * 1000000);
  },
  add: function add(region) {
    var regions = this.regions;

    region.id = this.buildRandom();
    regions.push(region);
  },
  remove: function remove(region) {
    var regions = this.regions;

    if (!region) return;
    for (var i = 0; i < regions.length; i++) {
      if (region.id === regions[i].id) {
        regions.splice(i, 1);
      }
    }
  }
}; /**
    * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
    * Created by Tw93 on 2017/09/06.
    * 红包雨区域检测类
    */

exports.default = Region;

/***/ }),
/* 263 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.showItem && _vm.src) ? _c('image', {
    ref: ("rain-item-" + _vm.rainId),
    staticClass: ["rain-item"],
    style: _vm.pos,
    attrs: {
      "src": _vm.src
    },
    on: {
      "click": _vm.caught
    }
  }) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 264 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-lottery-rain"],
    style: _vm.wrapStyle
  }, _vm._l((_vm.picList), function(src, i) {
    return _c('rain-item', {
      key: "i",
      ref: ("rain-item-" + i),
      refInFor: true,
      attrs: {
        "src": src,
        "rainId": i
      },
      on: {
        "wxcLotteryRainCaught": _vm.wxcLotteryRainCaught
      }
    })
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(266);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(267)
)

/* script */
__vue_exports__ = __webpack_require__(268)

/* template */
var __vue_template__ = __webpack_require__(270)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-noticebar/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7686624b"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 267 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-noticebar": {
    "width": "750",
    "paddingTop": "10",
    "paddingBottom": "10",
    "paddingLeft": "24",
    "backgroundColor": "#FFF7D6",
    "borderBottomWidth": "1",
    "borderTopWidth": "1",
    "borderColor": "#FFEEAE",
    "borderStyle": "solid",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "noticebar-content": {
    "color": "#EE9900",
    "fontSize": "26",
    "lineHeight": "36",
    "width": "592",
    "textOverflow": "ellipsis"
  },
  "more-click-content": {
    "width": "64",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "mode-ICON": {
    "width": "32",
    "height": "32"
  },
  "type-ICON": {
    "width": "32",
    "height": "32"
  }
}

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(269);

var _type2 = _interopRequireDefault(_type);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    notice: {
      type: String,
      default: ''
    },
    noticeUrl: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    },
    lines: {
      type: [Number, String],
      default: 1
    },
    type: {
      type: String,
      default: ''
    },
    spm: {
      type: String,
      default: ''
    }
  },
  computed: {
    contentWidth: function contentWidth() {
      return this.mode ? 605 : 683;
    },
    modeIcon: function modeIcon() {
      var modeIcon = void 0;
      switch (this.mode) {
        case 'link':
          modeIcon = _type2.default.linkIcon;
          break;
        case 'closable':
          modeIcon = _type2.default.closeIcon;
          break;
        default:
          modeIcon = '';
      }
      return modeIcon;
    },
    typeIcon: function typeIcon() {
      var typeIcon = void 0;
      switch (this.type) {
        case 'success':
          typeIcon = _type2.default.successIcon;
          break;
        case 'error':
          typeIcon = _type2.default.errorIcon;
          break;
        case 'info':
          typeIcon = _type2.default.infoIcon;
          break;
        case 'question':
          typeIcon = _type2.default.questionIcon;
          break;
        case 'warn':
          typeIcon = _type2.default.warnIcon;
          break;
        case 'time':
          typeIcon = _type2.default.timeIcon;
          break;
        case 'redbag':
          typeIcon = _type2.default.redbag;
          break;
        default:
          typeIcon = '';
      }
      return typeIcon;
    }
  },
  data: function data() {
    return {
      show: true
    };
  },
  methods: {
    noticeBarClicked: function noticeBarClicked() {
      var mode = this.mode,
          noticeUrl = this.noticeUrl,
          spm = this.spm;

      if (mode === 'link' && noticeUrl) {
        var ttid = weex.config.env.ttid;

        _utils2.default.goToH5Page(noticeUrl, spm, ttid, true);
        this.$emit('wxcNoticebarLinkClicked', { url: noticeUrl });
      }
    },
    noticeIconClicked: function noticeIconClicked() {
      var mode = this.mode;

      if (mode === 'closable') {
        this.show = false;
        this.$emit('wxcNoticebarCloseClicked', {});
      } else {
        this.noticeBarClicked();
      }
    }
  }
};

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by Tw93 on 2016/10/29.
 */

exports.default = {
  closeIcon: 'https://gw.alicdn.com/tfs/TB1THvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  linkIcon: 'https://gw.alicdn.com/tfs/TB1utlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  infoIcon: 'https://gw.alicdn.com/tfs/TB1xdlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  warnIcon: 'https://gw.alicdn.com/tfs/TB1TCvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  successIcon: 'https://gw.alicdn.com/tfs/TB12Em8pwMPMeJjy1XbXXcwxVXa-32-32.png',
  errorIcon: 'https://gw.alicdn.com/tfs/TB1UCvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  questionIcon: 'https://gw.alicdn.com/tfs/TB1vJlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  timeIcon: 'https://gw.alicdn.com/tfs/TB1eSzhpwMPMeJjy1XcXXXpppXa-30-30.png',
  redbag: 'https://gw.alicdn.com/tfs/TB1dCzhpwMPMeJjy1XcXXXpppXa-32-32.png'
};

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: ["wxc-noticebar"],
    attrs: {
      "accessible": true,
      "ariaLabel": _vm.notice
    },
    on: {
      "click": _vm.noticeBarClicked
    }
  }, [(_vm.typeIcon) ? _c('image', {
    staticClass: ["type-ICON"],
    attrs: {
      "src": _vm.typeIcon
    }
  }) : _vm._e(), _c('text', {
    staticClass: ["noticebar-content"],
    style: {
      width: _vm.contentWidth + 'px',
      lines: _vm.lines
    }
  }, [_vm._v(_vm._s(_vm.notice))]), (_vm.modeIcon) ? _c('div', {
    staticClass: ["more-click-content"],
    attrs: {
      "mode": _vm.mode
    },
    on: {
      "click": _vm.noticeIconClicked
    }
  }, [_c('image', {
    staticClass: ["mode-ICON"],
    attrs: {
      "src": _vm.modeIcon
    }
  })]) : _vm._e()]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(272);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(273)
)

/* script */
__vue_exports__ = __webpack_require__(274)

/* template */
var __vue_template__ = __webpack_require__(276)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-page-calendar/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-b67e6de8"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 273 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-page-calendar": {
    "position": "fixed",
    "width": "750",
    "color": "#333333",
    "backgroundColor": "#ffffff"
  },
  "flex-item": {
    "flex": 1,
    "textAlign": "center"
  },
  "calendar-weekday": {
    "height": "60",
    "backgroundColor": "#ffffff",
    "borderBottomWidth": "1",
    "borderTopWidth": "1",
    "borderColor": "#e2e2e2",
    "flexDirection": "row",
    "justifyContent": "space-around",
    "alignItems": "center"
  },
  "weekday-text": {
    "color": "#000000",
    "flex": 1,
    "fontSize": "24",
    "textAlign": "center"
  },
  "calendar-list": {
    "flex": 1
  },
  "month-text": {
    "fontSize": "32",
    "height": "60",
    "lineHeight": "60",
    "width": "750",
    "textAlign": "center",
    "alignItems": "center",
    "backgroundColor": "#f2f3f4"
  },
  "calendar-row": {
    "height": "140",
    "flexDirection": "row",
    "backgroundColor": "#ffffff",
    "borderBottomWidth": "1",
    "borderColor": "#f2f3f4",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  "row-item": {
    "flex": 1,
    "height": "140",
    "paddingTop": "10",
    "paddingBottom": "10",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "iphone-x": {
    "height": "68"
  },
  "calendar-note": {
    "height": "36",
    "lineHeight": "36",
    "fontSize": "24",
    "color": "#000000",
    "textAlign": "center"
  },
  "calendar-day": {
    "height": "48",
    "lineHeight": "48",
    "fontSize": "36",
    "color": "#000000",
    "textAlign": "center"
  },
  "calendar-ext": {
    "height": "36",
    "lineHeight": "36",
    "color": "#999999",
    "textAlign": "center",
    "fontSize": "24",
    "textOverflow": "ellipsis"
  },
  "calendar-holiday": {
    "color": "#FF5000"
  },
  "calendar-rest": {
    "color": "#FF5000"
  },
  "item-row-selected": {
    "color": "#ffffff",
    "backgroundColor": "#FFC900",
    "textAlign": "center"
  },
  "item-text-selected": {
    "color": "#3d3d3d",
    "textAlign": "center"
  },
  "calendar-disabled": {
    "color": "#CCCCCC"
  },
  "cell-disabled": {
    "backgroundColor": "#FBFBFB"
  },
  "calendar-day-include": {
    "backgroundColor": "#FFF7D6"
  }
}

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _format = __webpack_require__(275);

var Format = _interopRequireWildcard(_format);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _wxcMinibar = __webpack_require__(16);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var isWeb = _utils2.default.env.isWeb();

var dom = weex.requireModule('dom');

exports.default = {
  components: { WxcMinibar: _wxcMinibar2.default },
  props: {
    selectedDate: Array,
    animationType: {
      type: Object,
      default: 'push'
    },
    dateRange: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    },
    minibarCfg: {
      type: Object,
      default: function _default() {
        return {
          'title': '选择日期',
          'background-color': '#FFC900',
          'text-color': '#3D3D3D'
        };
      }
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    selectedNote: {
      type: Array,
      default: function _default() {
        return ['开始', '到达', '往返'];
      }
    },
    isRange: {
      type: Boolean,
      default: false
    },
    needDestroy: {
      type: Boolean,
      default: false
    },
    descList: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      isShow: false,
      reSelect: true,
      today: Format.getToDay(),
      departDate: '',
      arriveDate: ''
    };
  },
  computed: {
    calendarExtendStyle: function calendarExtendStyle() {
      return _utils2.default.uiStyle.pageTransitionAnimationStyle(this.animationType);
    },
    monthsArray: function monthsArray() {
      var range = this.dateRange,
          today = this.today,
          departDate = this.departDate,
          arriveDate = this.arriveDate,
          selectedNote = this.selectedNote,
          descList = this.descList;

      var param = { range: range, today: today, departDate: departDate, arriveDate: arriveDate, selectedNote: selectedNote, descList: descList };
      return Format.generateDateCell(param);
    }
  },
  created: function created() {
    this.isIPhoneX = _utils2.default.env.isIPhoneX();
    this.showTitle = isWeb || this.showHeader;
    this.detectShow();
  },
  mounted: function mounted() {
    var _this = this;

    var needDestroy = this.needDestroy;

    var hold = isWeb ? 700 : 100;
    !needDestroy && setTimeout(function () {
      _this.isShow = true;
      _this.scrollToDate();
    }, hold);
  },

  watch: {
    needDestroy: function needDestroy(newVal, preVal) {
      var _this2 = this;

      if (!newVal && newVal !== preVal) {
        setTimeout(function () {
          _this2.isShow = true;
        }, 200);
      }
    }
  },
  methods: {
    minibarLeftButtonClick: function minibarLeftButtonClick() {
      var _this3 = this;

      setTimeout(function () {
        _this3.hide();
        _this3.$emit('wxcPageCalendarBackClicked', {});
      }, 100);
    },
    onClickDate: function onClickDate(datConfig) {
      var self = this;
      if (datConfig.disabled || datConfig.isEmpty) return;

      if (self.reSelect) {
        self.departDate = '';
        self.arriveDate = '';
        self.reSelect = false;
      }

      if (self.isRange) {
        if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {
          self.arriveDate = datConfig.date;
        } else {
          self.departDate = datConfig.date;
        }
        if (self.departDate && self.arriveDate) {
          self.dispatchDateChange([self.departDate, self.arriveDate]);
        }
      } else {
        self.departDate = datConfig.date;
        self.dispatchDateChange([self.departDate]);
      }
    },
    scrollToDate: function scrollToDate() {
      var _this4 = this;

      setTimeout(function () {
        if (_this4.departDate) {
          var el = _this4.$refs.departDate[0];
          el && dom.getComponentRect && dom.getComponentRect(el, function (e) {
            if (e && e.result) {
              var bottom = e.size.bottom;
              var env = weex.config.env;
              // 误差

              var height = env.deviceHeight / env.deviceWidth * 750 - 50;
              if (bottom > height || bottom === 0) {
                dom.scrollToElement(el, { offset: -146, animated: false });
              }
            }
          });
        }
      }, 10);
    },
    dispatchDateChange: function dispatchDateChange(dateArr) {
      var _this5 = this;

      var duration = isWeb ? 400 : 600;
      setTimeout(function () {
        _this5.hide();
      }, duration);
      this.$emit('wxcPageCalendarDateSelected', {
        date: dateArr
      });
    },
    detectShow: function detectShow() {
      if (this.isRange && this.selectedDate.length >= 2) {
        this.departDate = this.selectedDate[0];
        this.arriveDate = this.selectedDate[1];
      } else if (this.selectedDate.length >= 1) {
        this.departDate = this.selectedDate[0];
        this.arriveDate = '';
      }
    },
    _animate: function _animate(status) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var ref = this.$refs.pageCalendar;
      if (this.animationType === 'push') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateX(' + (status ? -750 : 750) + 'px)', status, callback);
      } else if (this.animationType === 'model') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateY(' + (status ? -_utils2.default.env.getScreenHeight() : _utils2.default.env.getScreenHeight()) + 'px)', status, callback);
      }
    },
    show: function show() {
      var needDestroy = this.needDestroy;

      needDestroy && (this.isShow = true);
      this.reSelect = true;
      this.detectShow();
      this._animate(true);
      needDestroy && this.scrollToDate();
    },
    hide: function hide() {
      this.needDestroy && (this.isShow = false);
      this.reSelect = false;
      this._animate(false);
      this.$emit('wxcPageCalendarHide', {});
    }
  }
};

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getTraditionalHoliday = _getTraditionalHoliday;
exports._isDate = _isDate;
exports._checkHash = _checkHash;
exports.getTime = getTime;
exports._isInRange = _isInRange;
exports._isInSelectRange = _isInSelectRange;
exports._fixNum = _fixNum;
exports._isWeekend = _isWeekend;
exports._isToday = _isToday;
exports._getMonthDays = _getMonthDays;
exports._getPadding = _getPadding;
exports._unique = _unique;
exports.getToDay = getToDay;
exports.getWeekRows = getWeekRows;
exports.generateDateCell = generateDateCell;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/07/29.
 */

// 国际节日
var GLOBAL_HOLIDAY = exports.GLOBAL_HOLIDAY = {
  '01-01': '元旦',
  '02-14': '情人',
  '05-01': '劳动',
  '06-01': '儿童',
  '10-01': '国庆',
  '12-25': '圣诞'
};

// 传统节日
var TRADITIONAL_HOLIDAY = {
  '除夕': ['2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-24'],
  '春节': ['2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25'],
  '元宵': ['2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-08'],
  '清明': ['2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04'],
  '端午': ['2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25'],
  '中秋': ['2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01'],
  '重阳': ['2015-10-21', '2016-10-09', '2017-10-28', '2018-10-17', '2019-10-07', '2020-10-25']
};

// 放假日
var REST_DAYS = ['2017-10-01', '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08'];

// 工作日
var WORK_DAYS = ['2017-09-30'];

function _getTraditionalHoliday() {
  var HOLIDAY_TEMP = {};

  var keys = Object.keys(TRADITIONAL_HOLIDAY);
  keys.forEach(function (k) {
    var arr = TRADITIONAL_HOLIDAY[k];
    arr.forEach(function (i) {
      HOLIDAY_TEMP[i] = k;
    });
  });
  return HOLIDAY_TEMP;
}

function _isDate(obj) {
  var type = obj === null ? String(obj) : {}.toString.call(obj) || 'object';
  return type === '[object date]';
}

/**
 * 检测Hash
 *
 * @method _checkHash
 * @private
 */
function _checkHash(url, hash) {
  return url && url.match(/#/) && url.replace(/^.*#/, '') === hash;
}

/**
 * 获取当前日期的毫秒数
 * @method getTime
 * @param {String} date
 * @return {Number}
 */
function getTime(date) {
  if (_isDate(date)) {
    return new Date(date).getTime();
  } else {
    try {
      return new Date(date.replace(/-/g, '/')).getTime();
    } catch (e) {
      return 0;
    }
  }
}

function _isInRange(range, date) {
  var start = getTime(range[0]);
  var end = getTime(range[1]);
  var d = getTime(date);
  return start <= d && end >= d;
}

function _isInSelectRange(range, date) {
  var start = getTime(range[0]);
  var end = getTime(range[1]);
  var d = getTime(date);
  return start < d && end > d;
}

function _fixNum(num) {
  return (num < 10 ? '0' : '') + num;
}

/**
 * 是否是周末
 * @method isWeekend
 * @param {String} date
 * @return {Boolean}
 */
function _isWeekend(date) {
  var day = new Date(date.replace(/-/g, '/')).getDay();
  return day === 0 || day === 6;
}

/**
 * 是否是今天
 * @method isToday
 * @param {String} date
 * @return {Boolean}
 */
function _isToday(today, date) {
  return getTime(today) === getTime(date);
}

/**
 * 检查是否是闰年
 * @method _checkLeapYear
 * @param {Number} y 年份
 * @param {Date} t today
 * @protected
 */
function _getMonthDays(y, t) {
  var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var year = y || t.getFullYear();
  var isLeapYear = false;

  if (year % 100) {
    isLeapYear = !(year % 4);
  } else {
    isLeapYear = !(year % 400);
  }

  if (isLeapYear) {
    MONTH_DAYS[1] = 29;
  } else {
    MONTH_DAYS[1] = 28;
  }
  return MONTH_DAYS;
}

/**
 * 当月1号前面有多少空格
 * @method _getPadding
 * @protected
 */
function _getPadding(year, month) {
  var date = new Date(year + '/' + month + '/1');
  return date.getDay();
}

function _unique(array) {
  return Array.prototype.filter.call(array, function (item, index) {
    return array.indexOf(item) === index;
  });
}

function getToDay() {
  return new Date().getFullYear() + '-' + _fixNum(new Date().getMonth() + 1) + '-' + _fixNum(new Date().getDate());
}

function getWeekRows(y, m, today, dateRange, departDate, arriveDate, selectedNote, descList) {
  var monthDays = _getMonthDays(y, today);
  var padding = _getPadding(y, m, 7);
  var num = monthDays[m - 1] + padding;
  var rows = Math.ceil(num / 7);
  var remain = num % 7;
  var rowsData = [];

  for (var i = 1; i <= rows; i++) {
    var cells = [];

    for (var j = 1; j <= 7; j++) {
      var cell = {};
      // 前后空格
      if (i === 1 && j <= padding || remain && i === rows && j > remain) {
        cell.isEmpty = true;
      } else {
        (function () {
          var d = (i - 1) * 7 + j - padding;
          var date = y + '-' + _fixNum(m) + '-' + _fixNum(d);
          var cls = [];
          var ref = '';
          var cellClass = [];
          var isInRange = _isInRange(dateRange, date);
          var disabled = false;
          var global = _fixNum(m) + '-' + _fixNum(d);
          var note = '';
          var ext = '';

          if (descList && descList.length > 0) {
            var nowDesc = descList.filter(function (item) {
              return item.date == date;
            });
            if (nowDesc && nowDesc.length > 0) {
              ext = nowDesc[0].value;
              if (nowDesc[0].emphasize) {
                cls.push('calendar-holiday');
              }
            }
          }

          // 国际节日
          if (GLOBAL_HOLIDAY[global]) {
            note = GLOBAL_HOLIDAY[global];
            cls.push('calendar-holiday');
          }

          var tHoliday = _getTraditionalHoliday()[date];

          // 传统节日
          if (tHoliday) {
            note = tHoliday;
            cls.push('calendar-holiday');
          }
          // 放假日
          if (REST_DAYS.indexOf(date) > -1) {
            cls.push('calendar-holiday');
          }

          // 工作日
          if (WORK_DAYS.indexOf(date) > -1) {
            cls.push('calendar-work');
          }

          // 周末
          if (_isWeekend(date)) {
            cls.push('calendar-holiday');
          }

          // 今天
          if (_isToday(today, date)) {
            cls.push('calendar-today');
            note = '今天';
          }

          // 不在日期范围内
          if (!isInRange) {
            disabled = true;
          }

          if (disabled) {
            cls = [];
            cls.push('calendar-disabled');
            cellClass.push('cell-disabled');
          }

          if (!ext && disabled && isInRange) {
            ext = '不可选';
          }

          if (departDate === date || arriveDate === date) {
            note = departDate === date ? selectedNote[0] : selectedNote[1];
            ref = departDate === date ? 'departDate' : 'arriveDate';
            if (departDate === arriveDate && selectedNote.length >= 3) {
              note = selectedNote[2];
            }
            cls.push('item-text-selected');
            cellClass.push('item-row-selected');
          }

          if (departDate && arriveDate && _isInSelectRange([departDate, arriveDate], date)) {
            cellClass.push('calendar-day-include');
          }

          cell = {
            isEmpty: false,
            ref: ref,
            cls: _unique(cls).join(' '),
            cellClass: _unique(cellClass).join(' '),
            note: note,
            date: date,
            ext: ext,
            disabled: disabled,
            text: d
          };
        })();
      }
      cells.push(cell);
    }

    rowsData.push(cells);
  }

  return rowsData;
}

function generateDateCell(_ref) {
  var range = _ref.range,
      today = _ref.today,
      departDate = _ref.departDate,
      arriveDate = _ref.arriveDate,
      selectedNote = _ref.selectedNote,
      descList = _ref.descList;

  var start = new Date(range[0].replace(/-/g, '/'));
  var end = new Date(range[1].replace(/-/g, '/'));
  var startYear = start.getFullYear();
  var startMonth = start.getMonth() + 1;
  var endYear = end.getFullYear();
  var endMonth = end.getMonth() + 1;

  var l = (endYear - startYear) * 12 + endMonth - startMonth + 1;
  var y = startYear;
  var n = startMonth;
  var months = [];

  for (var i = 0; i < l; i++) {
    if (n > 12) {
      n = 1;
      y++;
    }
    months.push.apply(months, [{ title: y + '-' + _fixNum(n) }].concat(_toConsumableArray(getWeekRows(y, n, today, range, departDate, arriveDate, selectedNote, descList))));
    n++;
  }
  return months;
}

/***/ }),
/* 276 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "pageCalendar",
    staticClass: ["wxc-page-calendar"],
    style: _vm.calendarExtendStyle
  }, [_c('wxc-minibar', _vm._b({
    attrs: {
      "show": _vm.showTitle,
      "useDefaultReturn": false
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick
    }
  }, 'wxc-minibar', _vm.minibarCfg, false)), (_vm.isShow) ? _c('div', {
    staticClass: ["calendar-weekday"]
  }, _vm._l((['日', '一', '二', '三', '四', '五', '六']), function(week, k) {
    return _c('text', {
      key: k,
      staticClass: ["flex-item", "weekday-text"],
      attrs: {
        "ariaLabel": ("周" + week)
      }
    }, [_vm._v(_vm._s(week))])
  })) : _vm._e(), (_vm.isShow) ? _c('list', {
    staticClass: ["calendar-list"]
  }, [_vm._l((_vm.monthsArray), function(month, index) {
    return _c('cell', {
      key: index,
      class: [!month.title && 'calendar-row'],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [(month.title) ? _c('text', {
      staticClass: ["month-text"]
    }, [_vm._v(_vm._s(month.title))]) : _vm._l((month), function(cell, rowIndex) {
      return _c('div', {
        key: (index + "-" + rowIndex),
        ref: cell.ref,
        refInFor: true,
        class: ['row-item', cell.cellClass],
        attrs: {
          "accessible": true,
          "ariaLabel": ((cell.text?cell.text:'') + "," + (cell.note?cell.note:'') + "," + (cell.ext?cell.ext:''))
        },
        on: {
          "click": function($event) {
            _vm.onClickDate(cell)
          }
        }
      }, [_c('text', {
        class: ['calendar-note', cell.cls]
      }, [_vm._v(_vm._s(cell.note))]), _c('text', {
        class: ['calendar-day', cell.cls]
      }, [_vm._v(_vm._s(cell.text))]), _c('text', {
        class: ['calendar-ext', cell.cls]
      }, [_vm._v(_vm._s(cell.ext))])])
    })], 2)
  }), (_vm.isIPhoneX) ? _c('cell', {
    staticClass: ["iphone-x"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }) : _vm._e()], 2) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(278);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(279)
)

/* script */
__vue_exports__ = __webpack_require__(280)

/* template */
var __vue_template__ = __webpack_require__(281)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-popover/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4ddb9775"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 279 */
/***/ (function(module, exports) {

module.exports = {
  "g-cover": {
    "position": "fixed",
    "top": 0,
    "right": 0,
    "left": 0,
    "bottom": 0,
    "backgroundColor": "rgba(0,0,0,0.4)"
  },
  "g-popover": {
    "position": "fixed",
    "paddingTop": "15",
    "paddingRight": "15",
    "paddingBottom": "15",
    "paddingLeft": "15"
  },
  "u-popover-arrow": {
    "position": "absolute",
    "borderRadius": "4",
    "width": "30",
    "height": "30",
    "backgroundColor": "#ffffff",
    "boxShadow": "0 0 2px rgba(0, 0, 0, 0.21)"
  },
  "u-popover-inner": {
    "display": "block",
    "borderRadius": "10",
    "backgroundColor": "#ffffff"
  },
  "i-btn": {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginLeft": "20",
    "marginRight": "20",
    "paddingLeft": "20",
    "paddingRight": "20",
    "borderBottomWidth": "1",
    "borderBottomColor": "#dddddd"
  },
  "i-btn-noborder": {
    "borderBottomColor": "#ffffff"
  },
  "btn-icon": {
    "width": "32",
    "height": "32",
    "marginRight": "16"
  },
  "btn-text": {
    "flex": 1,
    "height": "80",
    "fontSize": "30",
    "lineHeight": "80",
    "textAlign": "left"
  },
  "text-align-center": {
    "textAlign": "center"
  }
}

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
var platform = weex.config.env.platform;

var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';

exports.default = {
  props: {
    buttons: Array,
    position: Object,
    arrowPosition: Object,
    coverColor: String
  },
  data: function data() {
    return {
      show: false
    };
  },
  computed: {
    coverStyle: function coverStyle() {
      return this.coverColor ? { backgroundColor: this.coverColor } : '';
    },
    contentStyle: function contentStyle() {
      var _position = this.position,
          _position$x = _position.x,
          x = _position$x === undefined ? 0 : _position$x,
          _position$y = _position.y,
          y = _position$y === undefined ? 0 : _position$y,
          style = {};

      x < 0 ? style.right = -x + 'px' : style.left = x + 'px';
      y < 0 ? style.bottom = -y + 'px' : style.top = y + 'px';
      return style;
    },
    arrowStyle: function arrowStyle() {
      var _arrowPosition = this.arrowPosition,
          _arrowPosition$pos = _arrowPosition.pos,
          pos = _arrowPosition$pos === undefined ? 'top' : _arrowPosition$pos,
          _arrowPosition$x = _arrowPosition.x,
          x = _arrowPosition$x === undefined ? 0 : _arrowPosition$x,
          _arrowPosition$y = _arrowPosition.y,
          y = _arrowPosition$y === undefined ? 0 : _arrowPosition$y,
          style = {};

      switch (pos) {
        case 'top':
          style.top = '6px';
        case 'bottom':
          !style.top && (style.bottom = '6px');
          style.transform = 'scaleX(0.8) rotate(45deg)';
          if (x >= 0 && x < 22) {
            x = 22;
          } else if (x < 0 && x > -22) {
            x = -22;
          }
          x < 0 ? style.right = -x + 'px' : style.left = x + 'px';
          break;
        case 'left':
          style.left = '6px';
        case 'right':
          !style.left && (style.right = '6px');
          style.transform = 'scaleY(0.8) rotate(45deg)';
          if (y >= 0 && y < 22) {
            y = 22;
          } else if (y < 0 && y > -22) {
            y = -22;
          }
          y < 0 ? style.bottom = -y + 'px' : style.top = y + 'px';
          break;
        default:
          break;
      }
      return style;
    }
  },
  methods: {
    wxcPopoverShow: function wxcPopoverShow() {
      this.show = true;
    },
    wxcOverlayBodyClicked: function wxcOverlayBodyClicked() {
      this.show = false;
    },
    wxcButtonClicked: function wxcButtonClicked(index, key) {
      this.$emit('wxcPopoverButtonClicked', { key: key, index: index });
      this.show = false;
    }
  }
};

/***/ }),
/* 281 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('div', {
    staticClass: ["g-cover"],
    style: _vm.coverStyle,
    on: {
      "touchend": function($event) {
        _vm.show = false
      }
    }
  }) : _vm._e(), (_vm.show && _vm.buttons) ? _c('div', {
    ref: "wxc-popover",
    staticClass: ["g-popover"],
    style: _vm.contentStyle
  }, [_c('div', {
    staticClass: ["u-popover-arrow"],
    style: _vm.arrowStyle
  }), _c('div', {
    staticClass: ["u-popover-inner"]
  }, _vm._l((_vm.buttons), function(item, i) {
    return _c('div', {
      key: i,
      class: ['i-btn', i == _vm.buttons.length - 1 ? 'i-btn-noborder' : ''],
      on: {
        "click": function($event) {
          _vm.wxcButtonClicked(i, item.key)
        }
      }
    }, [(item.icon) ? _c('image', {
      staticClass: ["btn-icon"],
      attrs: {
        "src": item.icon
      }
    }) : _vm._e(), _c('text', {
      staticClass: ["btn-text"]
    }, [_vm._v(_vm._s(item.text))])])
  }))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(283);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(284)
)

/* script */
__vue_exports__ = __webpack_require__(285)

/* template */
var __vue_template__ = __webpack_require__(286)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-popup/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5e0af408"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 284 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-popup": {
    "position": "fixed",
    "width": "750"
  },
  "top": {
    "left": 0,
    "right": 0
  },
  "bottom": {
    "left": 0,
    "right": 0
  },
  "left": {
    "bottom": 0,
    "top": 0
  },
  "right": {
    "bottom": 0,
    "top": 0
  }
}

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wxcOverlay = __webpack_require__(4);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
var platform = weex.config.env.platform;

var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
exports.default = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'bottom'
    },
    popupColor: {
      type: String,
      default: '#FFFFFF'
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
        };
      }
    },
    height: {
      type: [Number, String],
      default: 840
    },
    standOut: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 750
    },
    animation: {
      type: Object,
      default: function _default() {
        return {
          timingFunction: 'ease-in'
        };
      }
    }
  },
  data: function data() {
    return {
      haveOverlay: true,
      isOverShow: true
    };
  },
  computed: {
    isNeedShow: function isNeedShow() {
      var _this = this;

      setTimeout(function () {
        _this.appearPopup(_this.show);
      }, 50);
      return this.show;
    },
    _height: function _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    padStyle: function padStyle() {
      var pos = this.pos,
          width = this.width,
          height = this.height,
          popupColor = this.popupColor;

      var style = {
        width: width + 'px',
        backgroundColor: popupColor
      };
      pos === 'top' && (style = _extends({}, style, {
        top: -height + 'px',
        height: height + 'px'
      }));
      pos === 'bottom' && (style = _extends({}, style, {
        bottom: -height + 'px',
        height: height + 'px'
      }));
      pos === 'left' && (style = _extends({}, style, {
        left: -width + 'px'
      }));
      pos === 'right' && (style = _extends({}, style, {
        right: -width + 'px'
      }));
      return style;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    hide: function hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup: function appearPopup(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      this.isShow = bool;
      var popupEl = this.$refs['wxc-popup'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.pos, this.width, this.height, !bool)
        },
        duration: duration,
        delay: 0
      }, this.animation), function () {
        if (!bool) {
          _this2.$emit('wxcPopupOverlayClicked', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(pos, width, height, bool) {
      var _size = pos === 'top' || pos === 'bottom' ? height : width;
      var _transform = void 0;
      if (isWeb) {
        _size -= this.standOut;
      }
      bool && (_size = 0);
      switch (pos) {
        case 'top':
          _transform = 'translateY(' + _size + 'px)';
          break;
        case 'bottom':
          _transform = 'translateY(-' + _size + 'px)';
          break;
        case 'left':
          _transform = 'translateX(' + _size + 'px)';
          break;
        case 'right':
          _transform = 'translateX(-' + _size + 'px)';
          break;
      }
      return _transform;
    }
  }
};

/***/ }),
/* 286 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    ref: "overlay",
    attrs: {
      "show": _vm.haveOverlay && _vm.isOverShow
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking
    }
  }, 'wxc-overlay', _vm.overlayCfg, false)) : _vm._e()], 1), (_vm.show) ? _c('div', {
    ref: "wxc-popup",
    class: ['wxc-popup', _vm.pos],
    style: _vm.padStyle,
    attrs: {
      "height": _vm._height,
      "hack": _vm.isNeedShow
    },
    on: {
      "click": function () {}
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(288);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(289)
)

/* script */
__vue_exports__ = __webpack_require__(290)

/* template */
var __vue_template__ = __webpack_require__(291)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-progress/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-3b9377b3"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 289 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-progress": {
    "backgroundColor": "#f2f3f4"
  },
  "progress": {
    "position": "absolute",
    "backgroundColor": "#FFC900"
  }
}

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    barColor: {
      type: String,
      default: '#FFC900'
    },
    barWidth: {
      type: Number,
      default: 600
    },
    barHeight: {
      type: Number,
      default: 8
    },
    barRadius: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    runWayStyle: function runWayStyle() {
      var barWidth = this.barWidth,
          barHeight = this.barHeight,
          barRadius = this.barRadius;

      return {
        width: barWidth + 'px',
        height: barHeight + 'px',
        borderRadius: barRadius + 'px'
      };
    },
    progressStyle: function progressStyle() {
      var value = this.value,
          barWidth = this.barWidth,
          barHeight = this.barHeight,
          barColor = this.barColor,
          barRadius = this.barRadius;

      var newValue = value < 0 ? 0 : value > 100 ? 100 : value;
      return {
        backgroundColor: barColor,
        borderRadius: barRadius + 'px',
        height: barHeight + 'px',
        width: newValue / 100 * barWidth + 'px'
      };
    }
  }
};

/***/ }),
/* 291 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-progress"],
    style: _vm.runWayStyle,
    attrs: {
      "accessible": true,
      "ariaLabel": ("进度为百分之" + _vm.value)
    }
  }, [_c('div', {
    staticClass: ["progress"],
    style: _vm.progressStyle
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(293);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(294)
)

/* script */
__vue_exports__ = __webpack_require__(295)

/* template */
var __vue_template__ = __webpack_require__(301)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-radio/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0b33928b"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 294 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _item = __webpack_require__(296);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { wxcRadio: _item2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      checkedIndex: -1
    };
  },
  computed: {
    updateList: function updateList() {
      var checkedIndex = this.checkedIndex,
          list = this.list;

      var updateList = [];
      list && list.forEach(function (item, i) {
        item.checked = i === checkedIndex;
        updateList.push(item);
      });
      return updateList;
    }
  },
  watch: {
    list: function list(newList) {
      this.setListChecked(newList);
    }
  },
  created: function created() {
    this.setListChecked(this.list);
  },

  methods: {
    setListChecked: function setListChecked(list) {
      var _this = this;

      if (list && list.length > 0) {
        list.forEach(function (item, i) {
          item.checked && (_this.checkedIndex = i);
        });
      }
    },
    wxcRadioItemChecked: function wxcRadioItemChecked(i, e) {
      var oldIndex = this.checkedIndex;
      var _list$i = this.list[i],
          value = _list$i.value,
          title = _list$i.title;

      this.checkedIndex = i;
      this.$emit('wxcRadioListChecked', { value: value, title: title, oldIndex: oldIndex, index: i });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(297)
)

/* script */
__vue_exports__ = __webpack_require__(298)

/* template */
var __vue_template__ = __webpack_require__(300)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-radio/item.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4808f3ea"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 297 */
/***/ (function(module, exports) {

module.exports = {
  "radio": {
    "width": "48",
    "height": "48"
  },
  "title-text": {
    "fontSize": "30"
  }
}

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcCell = __webpack_require__(5);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _type = __webpack_require__(299);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcCell: _wxcCell2.default },
  props: {
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      require: true
    },
    value: {
      type: [String, Number, Object],
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      icon: [_type.CHECKED, _type.DISABLED]
    };
  },
  computed: {
    radioIcon: function radioIcon() {
      var icon = this.icon,
          disabled = this.disabled,
          checked = this.checked,
          config = this.config;

      var mergeIcon = icon;
      config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
      config.disabledIcon && (mergeIcon[1] = config.disabledIcon);
      return checked ? mergeIcon[disabled ? 1 : 0] : '';
    },
    backgroundColor: function backgroundColor() {
      var disabled = this.disabled;

      return disabled ? '#F2F3F4' : '#FFFFFF';
    },
    color: function color() {
      var disabled = this.disabled,
          checked = this.checked,
          config = this.config;

      var checkedColor = '#EE9900';
      config.checkedColor && (checkedColor = config.checkedColor);
      return checked && !disabled ? checkedColor : '#3D3D3D';
    }
  },
  methods: {
    wxcCellClicked: function wxcCellClicked() {
      var disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        this.$emit('wxcRadioItemChecked', { value: value, disabled: disabled });
      }
    }
  }
};

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHECKED = exports.CHECKED = 'https://gw.alicdn.com/tfs/TB1Y9vlpwMPMeJjy1XcXXXpppXa-72-72.png';
var DISABLED = exports.DISABLED = 'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png';

/***/ }),
/* 300 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    attrs: {
      "hasTopBorder": _vm.hasTopBorder,
      "cellStyle": {
        backgroundColor: _vm.backgroundColor
      },
      "accessible": true,
      "ariaLabel": (_vm.title + ",状态为" + (_vm.checked?'已选中':'未选中') + "," + (_vm.disabled?'不可更改':''))
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('text', {
    staticClass: ["title-text"],
    style: {
      color: _vm.color
    },
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), (_vm.radioIcon) ? _c('image', {
    staticClass: ["radio"],
    attrs: {
      "slot": "value",
      "src": _vm.radioIcon
    },
    slot: "value"
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 301 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.updateList), function(item, i) {
    return _c('wxc-radio', _vm._b({
      key: i,
      attrs: {
        "config": _vm.config
      },
      on: {
        "wxcRadioItemChecked": function($event) {
          _vm.wxcRadioItemChecked(i, $event)
        }
      }
    }, 'wxc-radio', item, false))
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(303);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(304)
)

/* script */
__vue_exports__ = __webpack_require__(305)

/* template */
var __vue_template__ = __webpack_require__(319)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-rich-text/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7a2c8864"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 304 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-rich-text": {
    "alignItems": "center",
    "flexDirection": "row"
  },
  "default-text": {
    "color": "#A5A5A5",
    "fontSize": "24",
    "lineHeight": "30"
  }
}

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    WxcRichTextText: __webpack_require__(6),
    WxcRichTextLink: __webpack_require__(309),
    WxcRichTextIcon: __webpack_require__(312),
    WxcRichTextTag: __webpack_require__(17)
  },
  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return [];
      }
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    isNotEmptyArray: function isNotEmptyArray() {
      return _utils2.default.isNonEmptyArray(this.configList);
    },
    isString: function isString() {
      return _utils2.default.isString(this.configList);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 306 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-text": {
    "fontSize": "24",
    "color": "#3d3d3d"
  },
  "black": {
    "color": "#3D3D3D"
  },
  "yellow": {
    "color": "#EE9900"
  },
  "blue": {
    "color": "#30A0FF"
  },
  "gray": {
    "color": "#A5A5A5"
  },
  "red": {
    "color": "#FF5000"
  },
  "margin-text": {
    "marginRight": "6"
  }
}

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    textValue: {
      type: String,
      default: ''
    },
    textTheme: {
      type: String,
      default: 'gray'
    },
    textStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    themeStyle: function themeStyle() {
      var style = {};
      var textStyle = this.textStyle;
      if (textStyle && textStyle.fontSize) {
        style = _extends({}, style, {
          fontSize: textStyle.fontSize + 'px',
          height: textStyle.fontSize * 1.2 + 'px'
        });
      }
      if (textStyle && textStyle.color) {
        style = _extends({}, style, {
          color: textStyle.color
        });
      }
      return style;
    }
  }
};

/***/ }),
/* 308 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    class: ['wxc-text', _vm.textTheme, _vm.hasTextMargin ? 'margin-text' : ''],
    style: _vm.themeStyle
  }, [_vm._v(_vm._s(_vm.textValue))])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(310)

/* template */
var __vue_template__ = __webpack_require__(311)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-rich-text/wxc-rich-text-link.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _wxcRichTextText = __webpack_require__(6);

var _wxcRichTextText2 = _interopRequireDefault(_wxcRichTextText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcRichTextText: _wxcRichTextText2.default },
  props: {
    linkValue: {
      type: [String, Number],
      default: ''
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    },
    linkHref: {
      type: String,
      default: ''
    },
    linkTheme: {
      type: String,
      default: 'black'
    },
    linkStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      defObj: {}
    };
  },
  methods: {
    onLinkClick: function onLinkClick(e) {
      var self = this;
      _utils2.default.goToH5Page(self.linkHref);
      self.$emit('wxcRichTextLinkClick', { element: e, href: self.linkHref });
    }
  }
};

/***/ }),
/* 311 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    on: {
      "click": _vm.onLinkClick
    }
  }, [_c('wxc-rich-text-text', {
    attrs: {
      "textValue": _vm.linkValue,
      "hasTextMargin": _vm.hasTextMargin,
      "textStyle": _vm.linkStyle ? _vm.linkStyle : _vm.defObj,
      "textTheme": _vm.linkTheme ? _vm.linkTheme : 'black'
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(313)
)

/* script */
__vue_exports__ = __webpack_require__(314)

/* template */
var __vue_template__ = __webpack_require__(315)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-rich-text/wxc-rich-text-icon.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7902a727"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 313 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-image": {
    "width": "90",
    "height": "24",
    "marginRight": "6"
  }
}

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    iconSrc: {
      type: String,
      default: ''
    },
    iconStyle: {
      type: Object,
      default: function _default() {
        return {
          height: 24
        };
      }
    }
  },
  data: function data() {
    return {
      width: 90
    };
  },
  computed: {
    computedStyle: function computedStyle() {
      var width = this.width,
          iconStyle = this.iconStyle;

      if (iconStyle && iconStyle.width && iconStyle.height) {
        return {
          width: iconStyle.width + 'px',
          height: iconStyle.height + 'px'
        };
      } else {
        return {
          width: width + 'px',
          height: iconStyle.height + 'px'
        };
      }
    }
  },
  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var width = e.size.naturalWidth;
        var height = e.size.naturalHeight;
        this.width = width * (this.iconStyle.height / height);
      }
    }
  }
};

/***/ }),
/* 315 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('image', {
    staticClass: ["wxc-image"],
    style: {
      width: _vm.computedStyle.width,
      height: _vm.computedStyle.height
    },
    attrs: {
      "src": _vm.iconSrc,
      "ariaHidden": true
    },
    on: {
      "load": _vm.onLoad
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 316 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-tag": {
    "borderColor": "#3d3d3d",
    "borderWidth": "2",
    "borderRadius": "4",
    "marginRight": "6",
    "backgroundColor": "rgba(0,0,0,0)",
    "paddingLeft": "6",
    "paddingRight": "6",
    "height": "26",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "tag-text": {
    "fontSize": "20",
    "color": "#3d3d3d"
  },
  "black": {
    "color": "#3D3D3D"
  },
  "yellow": {
    "color": "#EE9900"
  },
  "blue": {
    "color": "#30A0FF"
  },
  "gray": {
    "color": "#A5A5A5"
  },
  "red": {
    "color": "#FF5000"
  },
  "border-black": {
    "borderColor": "#A5A5A5"
  },
  "border-yellow": {
    "borderColor": "#EE9900"
  },
  "border-blue": {
    "borderColor": "#30A0FF"
  },
  "border-gray": {
    "borderColor": "#A5A5A5"
  },
  "border-red": {
    "borderColor": "#FF5000"
  }
}

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    tagValue: {
      type: [String, Number],
      default: ''
    },
    tagTheme: {
      type: String,
      default: 'blue'
    },
    tagStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    newTheme: function newTheme() {
      var tagStyle = this.tagStyle;
      var tagValue = this.tagValue;
      var divStyle = {};
      var textStyle = {};
      if (tagStyle && tagStyle.fontSize) {
        textStyle = _extends({}, textStyle, {
          fontSize: tagStyle.fontSize + 'px'
        });
      }
      if (tagStyle && tagStyle.color) {
        textStyle = _extends({}, textStyle, {
          color: tagStyle.color
        });
      }

      if (tagStyle && tagStyle.borderColor) {
        divStyle = _extends({}, divStyle, {
          borderColor: tagStyle.borderColor
        });
      }

      if (tagStyle && tagStyle.borderWidth) {
        divStyle = _extends({}, divStyle, {
          borderWidth: tagStyle.borderWidth + 'px'
        });
      }

      if (tagStyle && tagStyle.borderRadius) {
        divStyle = _extends({}, divStyle, {
          borderRadius: tagStyle.borderRadius + 'px'
        });
      }

      if (tagStyle && tagStyle.backgroundColor) {
        divStyle = _extends({}, divStyle, {
          backgroundColor: tagStyle.backgroundColor
        });
      }

      if (tagStyle && tagStyle.height) {
        divStyle = _extends({}, divStyle, {
          height: tagStyle.height + 'px'
        });
      }

      if (tagStyle && tagStyle.width) {
        divStyle = _extends({}, divStyle, {
          width: tagStyle.width + 'px'
        });
      }

      if (tagValue && tagValue.length === 1) {
        divStyle = _extends({}, divStyle, {
          paddingLeft: 0,
          paddingRight: 0
        });
      }

      return {
        divStyle: divStyle,
        textStyle: textStyle
      };
    }
  }
};

/***/ }),
/* 318 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-tag', 'border-' + _vm.tagTheme],
    style: _vm.newTheme.divStyle
  }, [_c('text', {
    class: ['tag-text', _vm.tagTheme],
    style: _vm.newTheme.textStyle
  }, [_vm._v(_vm._s(_vm.tagValue))])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 319 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isNotEmptyArray) ? _c('div', {
    staticClass: ["wxc-rich-text"]
  }, _vm._l((_vm.configList), function(v) {
    return _c('div', [(v.type == 'text' && v.value) ? _c('wxc-rich-text-text', {
      attrs: {
        "textValue": v.value,
        "textStyle": v.style,
        "hasTextMargin": _vm.hasTextMargin,
        "textTheme": v.theme
      }
    }) : _vm._e(), (v.type == 'link' && v.href && v.value) ? _c('wxc-rich-text-link', {
      attrs: {
        "linkValue": v.value,
        "linkHref": v.href,
        "linkStyle": v.style,
        "hasTextMargin": _vm.hasTextMargin,
        "linkTheme": v.theme
      }
    }) : _vm._e(), (v.type == 'icon' && v.src) ? _c('wxc-rich-text-icon', {
      attrs: {
        "iconSrc": v.src,
        "iconStyle": v.style
      }
    }) : _vm._e(), (v.type == 'tag' && v.value) ? _c('wxc-rich-text-tag', {
      attrs: {
        "tagValue": v.value,
        "tagTheme": v.theme,
        "tagStyle": v.style
      }
    }) : _vm._e()], 1)
  })) : _vm._e(), (_vm.isString) ? _c('text', {
    staticClass: ["default-text"]
  }, [_vm._v(_vm._s(_vm.configList))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(321);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(322)
)

/* script */
__vue_exports__ = __webpack_require__(323)

/* template */
var __vue_template__ = __webpack_require__(324)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-special-rich-text/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2a40e08c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 322 */
/***/ (function(module, exports) {

module.exports = {
  "tag-div": {
    "position": "absolute",
    "top": 0,
    "color": "#A5A5A5",
    "fontSize": "24",
    "lineHeight": "30"
  },
  "wxc-text": {
    "fontSize": "24",
    "lineHeight": "34",
    "color": "#3d3d3d",
    "lines": 2,
    "textOverflow": "ellipsis"
  },
  "black": {
    "color": "#3D3D3D"
  },
  "yellow": {
    "color": "#EE9900"
  },
  "blue": {
    "color": "#30A0FF"
  },
  "gray": {
    "color": "#A5A5A5"
  },
  "red": {
    "color": "#FF5000"
  },
  "margin-text": {
    "marginRight": "6"
  }
}

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _wxcRichTextText = __webpack_require__(6);

var _wxcRichTextText2 = _interopRequireDefault(_wxcRichTextText);

var _wxcRichTextTag = __webpack_require__(17);

var _wxcRichTextTag2 = _interopRequireDefault(_wxcRichTextTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _weex$config$env = weex.config.env,
    appName = _weex$config$env.appName,
    osName = _weex$config$env.osName,
    deviceWidth = _weex$config$env.deviceWidth;

var needHack = (_utils2.default.env.isAlipay() || appName === 'UC' || appName === 'TUnionSDK') && osName !== 'iOS' || _utils2.default.env.isAndroid();
var isPad = osName === 'iOS' && deviceWidth > 1300;

exports.default = {
  components: {
    WxcRichTextText: _wxcRichTextText2.default,
    WxcRichTextTag: _wxcRichTextTag2.default
  },
  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      iconWidth: 90,
      iconHeight: 24
    };
  },
  computed: {
    newList: function newList() {
      var configList = this.configList,
          iconHeight = this.iconHeight,
          iconWidth = this.iconWidth;

      if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
        var r1 = configList[0];
        var r2 = configList[1];
        var iconStyle = r1.style;
        var textStyle = r2.style;
        var style = {};
        var fontSize = 24;
        var tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 24;

        if (textStyle && textStyle.fontSize && !isNaN(textStyle.fontSize)) {
          fontSize = textStyle.fontSize;
          style = {
            fontSize: textStyle.fontSize + 'px',
            lineHeight: Number(textStyle.fontSize * 1.4).toFixed(2) + 'px'
          };
        }

        if (textStyle && textStyle.color) {
          style = _extends({}, style, {
            color: textStyle.color
          });
        }

        if (textStyle && textStyle.lines) {
          style = _extends({}, style, {
            lines: textStyle.lines
          });
        }

        if (r1.type === 'icon' && iconStyle && iconStyle.height && !iconStyle.width) {
          tagWidth = parseInt(iconWidth * (iconStyle.height / iconHeight));
          r1 = _extends({}, r1, {
            style: {
              width: tagWidth + 'px',
              height: iconStyle.height + 'px'
            }
          });
        }

        if (r1.type === 'icon' && !(iconStyle && iconStyle.height)) {
          r1 = _extends({}, r1, {
            style: {
              width: iconWidth + 'px',
              height: iconHeight + 'px'
            }
          });
        }

        if (r1.type === 'tag' && iconStyle && iconStyle.width) {
          r1 = _extends({}, r1, {
            style: _extends({}, iconStyle, { width: null })
          });
        }

        var blank = '';
        var num = Math.ceil(tagWidth / fontSize) + 1;

        if (r1.type === 'tag' && r1.value) {
          num = this.countString(r1.value);
        }

        var tagMoreBlank = (!isPad && num < 7 ? '  ' : '') + (needHack ? '  ' : '');
        var iconMoreBlank = num > 2 ? needHack ? '     ' : '   ' : ' ';
        if (r1.type === 'tag') {
          blank = new Array(num).join('  ') + tagMoreBlank;
        } else if (r1.type === 'icon') {
          blank = new Array(num).join('  ') + iconMoreBlank;
        }
        blank += isPad && num > 2 ? '     ' : '';
        var newValue = r2.value ? blank + (' ' + r2.value) : '';

        r2 = _extends({}, r2, {
          style: style,
          value: newValue
        });

        return [r1, r2];
      } else {
        return configList;
      }
    },
    top: function top() {
      var configList = this.configList,
          needHack = this.needHack;

      if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
        var iconStyle = configList[0].style;
        var textStyle = configList[1].style;
        var fontSize = 24;
        var tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 26;
        if (textStyle && textStyle.fontSize) {
          fontSize = textStyle.fontSize;
        }
        var d = needHack ? 1.1 : 1.4;
        return Math.ceil((fontSize * d - tagHeight) / 2);
      } else {
        return 0;
      }
    }
  },
  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var _e$size = e.size,
            naturalWidth = _e$size.naturalWidth,
            naturalHeight = _e$size.naturalHeight;

        this.iconWidth = naturalWidth;
        this.iconHeight = naturalHeight;
      } else {
        var configList = this.configList;

        if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
          var style = configList[0].style;

          if (style && style.height && style.width) {
            this.iconWidth = style.width;
            this.iconHeight = style.height;
          }
        }
      }
    },
    countString: function countString(str) {
      var chineseRegex = /[^ -~]/g;
      return str.replace(chineseRegex, '**').length;
    }
  }
};

/***/ }),
/* 324 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-special-rich-text"]
  }, [_c('div', {
    staticClass: ["tag-div"],
    style: {
      top: _vm.top + 'px'
    }
  }, [(_vm.newList[0] && _vm.newList[0].type === 'icon' && _vm.newList[0].src) ? _c('image', {
    staticClass: ["wxc-image"],
    style: _vm.newList[0].style,
    attrs: {
      "src": _vm.newList[0].src,
      "quality": "original",
      "original": true,
      "ariaHidden": true
    },
    on: {
      "load": _vm.onLoad
    }
  }) : _vm._e(), (_vm.newList[0] && _vm.newList[0].type === 'tag' && _vm.newList[0].value) ? _c('wxc-rich-text-tag', {
    attrs: {
      "tagValue": _vm.newList[0].value,
      "tagTheme": _vm.newList[0].theme,
      "tagStyle": _vm.newList[0].style
    }
  }) : _vm._e()], 1), (_vm.newList[0] && _vm.newList[0].type === 'text' && _vm.newList[0].value) ? _c('text', {
    class: ['wxc-text', _vm.newList[0].theme],
    style: _vm.newList[0].style
  }, [_vm._v(_vm._s(_vm.newList[0].value))]) : _vm._e(), (_vm.newList[1] && _vm.newList[1].value) ? _c('text', {
    class: ['wxc-text', _vm.newList[1].theme],
    style: _vm.newList[1].style
  }, [_vm._v(_vm._s(_vm.newList[1].value))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(326);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(327)
)

/* script */
__vue_exports__ = __webpack_require__(328)

/* template */
var __vue_template__ = __webpack_require__(329)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-simple-flow/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-48bf01b9"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 327 */
/***/ (function(module, exports) {

module.exports = {
  "flex-row": {
    "flexDirection": "row"
  },
  "full-rest": {
    "flex": 1
  },
  "root": {
    "paddingTop": "28",
    "paddingBottom": "24",
    "backgroundColor": "#ffffff"
  },
  "content": {
    "paddingTop": "9",
    "paddingBottom": "42",
    "paddingLeft": "70",
    "paddingRight": "70"
  },
  "last-one-content": {
    "paddingBottom": 0
  },
  "title": {
    "paddingLeft": "70",
    "paddingRight": "70"
  },
  "line": {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "left": "38",
    "width": "2",
    "backgroundColor": "#FFC300"
  },
  "first-one-title-line": {
    "top": "20"
  },
  "last-one-title-line": {
    "bottom": "20"
  },
  "last-one-content-line": {
    "width": 0
  },
  "point": {
    "position": "absolute",
    "top": "13",
    "left": "32",
    "width": "14",
    "height": "14",
    "backgroundColor": "#FFF0BD",
    "borderStyle": "solid",
    "borderWidth": "2",
    "borderColor": "#EE9900",
    "borderRadius": "100"
  },
  "highlight-point": {
    "top": "7",
    "left": "26",
    "width": "26",
    "height": "26",
    "backgroundColor": "#EE9900",
    "borderStyle": "solid",
    "borderWidth": "6",
    "borderColor": "#FFE78D"
  },
  "text-title": {
    "fontSize": "30",
    "color": "#3d3d3d"
  },
  "text-highlight-title": {
    "color": "#EE9900"
  },
  "text-desc": {
    "fontSize": "24",
    "color": "#a5a5a5",
    "marginBottom": "12"
  },
  "text-date": {
    "fontSize": "24",
    "color": "#a5a5a5"
  }
}

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    list: {
      type: Array,
      required: true
    },
    themeColor: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    cItems: function cItems() {
      return this.adapter(this.list);
    }
  },
  methods: {
    adapter: function adapter(items) {
      var _themeColor = this.themeColor,
          lineColor = _themeColor.lineColor,
          pointInnerColor = _themeColor.pointInnerColor,
          pointBorderColor = _themeColor.pointBorderColor,
          highlightTitleColor = _themeColor.highlightTitleColor,
          highlightPointInnerColor = _themeColor.highlightPointInnerColor,
          highlightPointBorderColor = _themeColor.highlightPointBorderColor;

      var len = items.length;
      var pre = Date.now();

      return items.map(function (item, index) {
        item.key = pre + '_' + index;
        item.__titleLineClass__ = [];
        item.__contentClass__ = [];
        item.__contentLineClass__ = [];
        item.__pointClass__ = [];
        item.__titleTextClass__ = [];
        item.__pointStyle__ = {};
        item.__lineStyle__ = {};
        item.__titleStyle__ = {};

        if (lineColor) item.__lineStyle__.backgroundColor = lineColor;
        if (pointInnerColor) item.__pointStyle__.backgroundColor = pointInnerColor;
        if (pointBorderColor) item.__pointStyle__.borderColor = pointBorderColor;

        if (index === 0) {
          item.__titleLineClass__.push('first-one-title-line');
        }

        if (index === len - 1) {
          item.__titleLineClass__.push('last-one-title-line');
          item.__contentClass__.push('last-one-content');
          item.__contentLineClass__.push('last-one-content-line');
        }

        if (item.highlight) {
          item.__pointClass__.push('highlight-point');
          item.__titleTextClass__.push('text-highlight-title');
          if (highlightTitleColor) item.__titleStyle__.color = highlightTitleColor;
          if (highlightPointInnerColor) item.__pointStyle__.backgroundColor = highlightPointInnerColor;
          if (highlightPointBorderColor) item.__pointStyle__.borderColor = highlightPointBorderColor;
        }
        return item;
      });
    }
  }
};

/***/ }),
/* 329 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["root"]
  }, _vm._l((_vm.cItems), function(item, index) {
    return _c('div', {
      key: item.key,
      attrs: {
        "accessible": true,
        "ariaLabel": ((item.title) + "," + (item.desc?item.desc:'') + "," + (item.date?item.date:'') + "," + (item.highlight?'已完成':'等待完成'))
      }
    }, [_c('div', {
      staticClass: ["title", "flex-row"]
    }, [_c('div', {
      staticClass: ["line"],
      class: item.__titleLineClass__,
      style: item.__lineStyle__
    }), _c('div', {
      staticClass: ["point"],
      class: item.__pointClass__,
      style: item.__pointStyle__
    }), _c('text', {
      staticClass: ["text-title", "full-rest"],
      class: item.__titleTextClass__,
      style: item.__titleStyle__
    }, [_vm._v(_vm._s(item.title))])]), _c('div', {
      staticClass: ["content", "flex-row"],
      class: item.__contentClass__
    }, [_c('div', {
      staticClass: ["line"],
      class: item.__contentLineClass__,
      style: item.__lineStyle__
    }), _c('div', {
      staticClass: ["full-rest"]
    }, [(item.desc) ? _c('text', {
      staticClass: ["text-desc"]
    }, [_vm._v(_vm._s(item.desc))]) : _vm._e(), (item.date) ? _c('text', {
      staticClass: ["text-date"]
    }, [_vm._v(_vm._s(item.date))]) : _vm._e()])])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(331);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(332)
)

/* script */
__vue_exports__ = __webpack_require__(333)

/* template */
var __vue_template__ = __webpack_require__(334)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-slide-nav/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1ae89817"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 332 */
/***/ (function(module, exports) {

module.exports = {
  "slide-nav": {
    "position": "absolute",
    "zIndex": 1000
  }
}

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var DOM = weex.requireModule('dom');
var Animation = weex.requireModule('animation');
var OFFSET_ACCURACY = 10;
var SCALE = weex.config.env.platform.toLowerCase() === 'web' ? 2 : 1;

function _toNum(str) {
  return typeof str === 'number' ? str : parseFloat((str || '').replace(/px$/i, ''));
}

function _getHeight(element, callback) {
  if (!element) {
    return;
  }
  if (element.__cacheHeight) {
    element.__cacheHeight && callback && callback(element.__cacheHeight);
  } else {
    DOM.getComponentRect(element, function (res) {
      var height = (parseFloat(res && res.size && res.size.height) || 0) / SCALE;
      height && callback && callback(element.__cacheHeight = height);
    });
  }
}

exports.default = {

  props: {
    position: {
      'type': String,
      'default': 'top'
    },

    height: [String, Number]
  },

  data: function data() {
    return {
      visible: true
    };
  },


  watch: {
    visible: function visible(newVal) {
      newVal ? this._slideIn() : this._slideOut();
    }
  },

  created: function created() {
    this._height = _toNum(this.height) || 0;
    this._isBottom = this.position === 'bottom';
    this._direction = this._isBottom ? 1 : -1;
  },


  methods: {
    _slideOut: function _slideOut() {
      var _this = this;

      this.getHeight(function (height) {
        _this.$emit('slideOut');
        _this.slideY(height * _this._direction * SCALE, function () {
          _this.$emit('slideOutEnd');
        });
      });
    },
    _slideIn: function _slideIn() {
      var _this2 = this;

      this.getHeight(function (height) {
        _this2.$emit('slideIn');
        _this2.slideY(0, function () {
          _this2.$emit('slideInEnd');
        });
      });
    },
    getHeight: function getHeight(callback) {
      return _getHeight(this.$refs.wrapper, callback);
    },
    slideOut: function slideOut() {
      this.visible = false;
    },
    slideIn: function slideIn() {
      this.visible = true;
    },
    slideY: function slideY(y, callback) {
      Animation.transition(this.$refs.wrapper, {
        styles: { transform: 'translateY(' + y + 'px)' },
        duration: 150, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, callback);
    }
  },

  handleTouchStart: function handleTouchStart(e) {
    var touch = e.changedTouches[0];
    this._touchParams = {
      pageY: touch.screenY,
      startY: touch.screenY,
      lastPageY: touch.screenY,
      timeStamp: e.timeStamp,
      direction: -1
    };
  },
  handleTouchMove: function handleTouchMove(e, bottomNav) {
    var tp = this._touchParams;
    var touch = e.changedTouches[0];
    var offsetY = void 0;

    // 安卓下滚动的时候经常不触发touchstart事件
    if (!tp || tp.hasEnd) {
      return this._touchParams = {
        pageY: touch.screenY,
        startY: touch.screenY,
        lastPageY: touch.screenY,
        timeStamp: e.timeStamp,
        direction: -1
      };
    }

    offsetY = touch.screenY - tp.pageY;

    tp.lastPageY = tp.pageY;
    tp.lastDirection = tp.direction;
    tp.direction = offsetY > 0 ? 1 : -1;

    if (tp.lastDirection !== tp.direction) {
      tp.startY = tp.lastPageY;
    }

    tp.pageY = touch.screenY;
    tp.offsetY = tp.pageY - tp.startY;

    if (!this.__scrollable && bottomNav) {
      if (tp.offsetY <= -OFFSET_ACCURACY) {
        bottomNav.slideOut();
      } else if (tp.offsetY >= OFFSET_ACCURACY) {
        bottomNav.slideIn();
      }
    }
  },
  handleTouchEnd: function handleTouchEnd() {
    var tp = this._touchParams;
    tp && (tp.hasEnd = true);
  },
  handleScroll: function handleScroll(e, scroller, topNav, bottomNav, startThreshold) {
    var _this3 = this;

    var moveThreshold = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;

    var scrollY = e.contentOffset.y;
    var nav = topNav || bottomNav;
    var scrollFn = function scrollFn(maxScrollY) {
      if (-scrollY > maxScrollY) {
        return;
      }
      maxScrollY = Math.abs(maxScrollY);
      if (Math.abs(scrollY) < startThreshold) {
        if (Math.abs(scrollY) >= maxScrollY - OFFSET_ACCURACY) {
          var tp = _this3._touchParams;
          if (!tp) {
            return;
          }
          var offsetY = tp.offsetY;
          if (offsetY < -OFFSET_ACCURACY) {
            bottomNav && bottomNav.slideOut();
          } else if (offsetY > OFFSET_ACCURACY) {
            bottomNav && bottomNav.slideIn();
          }
        } else {
          topNav && topNav.slideIn();
          bottomNav && bottomNav.slideIn();
        }
      } else {
        var _tp = _this3._touchParams;
        if (!_tp) {
          return;
        }
        var _offsetY = _tp.offsetY;
        if (Math.abs(_offsetY) >= moveThreshold) {
          if (_offsetY > 0) {
            topNav && topNav.slideIn();
            bottomNav && bottomNav.slideIn();
          } else {
            topNav && topNav.slideOut();
            bottomNav && bottomNav.slideOut();
          }
        }
      }
    };

    var maxScrollYCheck = function maxScrollYCheck(maxScrollY) {
      if (!_this3.__scrollable) {
        return;
      }
      if (startThreshold) {
        scrollFn(maxScrollY);
      } else {
        nav.getHeight(function (navHeight) {
          startThreshold = navHeight;
          scrollFn(maxScrollY);
        });
      }
    };

    if (!nav) {
      return;
    }

    _getHeight(scroller, function (scrollerHeight) {
      var maxScrollY = e.contentSize.height - scrollerHeight;
      _this3.__scrollable = maxScrollY >= OFFSET_ACCURACY;

      if (bottomNav) {
        bottomNav.getHeight(function (height) {
          _this3.__scrollable = maxScrollY >= height;
          maxScrollYCheck(maxScrollY);
        });
      } else {
        maxScrollYCheck(maxScrollY);
      }
    });
  }
};

/***/ }),
/* 334 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "wrapper",
    staticClass: ["slide-nav"]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(336);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(337)
)

/* script */
__vue_exports__ = __webpack_require__(338)

/* template */
var __vue_template__ = __webpack_require__(339)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-slider-bar/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-358a5126"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 337 */
/***/ (function(module, exports) {

module.exports = {
  "slider-bar-container": {
    "height": "56",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "value-bar": {
    "height": "4"
  },
  "slide-block": {
    "width": "56",
    "height": "56",
    "backgroundColor": "#ffffff",
    "borderRadius": "28",
    "borderWidth": "1",
    "borderColor": "rgba(0,0,0,0.1)",
    "boxShadow": "0 6px 12px rgba(0, 0, 0, 0.05)",
    "position": "absolute",
    "left": 0,
    "bottom": 0
  }
}

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _weexBindingx = __webpack_require__(3);

var _weexBindingx2 = _interopRequireDefault(_weexBindingx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
var dom = weex.requireModule('dom');
var modal = weex.requireModule('modal');

exports.default = {
  data: function data() {
    return {
      env: 'weex',
      diffX1: 0,
      diffX2: 0,
      barWidth: 0,
      preventMoveEvent: true,
      minDist: 0,
      selectRange: [0, 0],
      blockRadius: 28,
      DPR: 1,
      timeout: 100,
      isAndroid: _utils2.default.env.isAndroid()
    };
  },
  props: {
    length: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 4
    },
    // 是否双滑块模式
    range: {
      type: Boolean,
      default: false
    },
    // 最小值
    min: {
      type: Number,
      default: 0
    },
    // 最大值
    max: {
      type: Number,
      default: 100
    },
    // 最小取值范围，用于范围选择范围最小差值
    minDiff: {
      type: Number,
      default: 5
    },
    // 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]
    value: {
      type: [Number, Array],
      default: 0
    },
    // 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]
    defaultValue: {
      type: [Number, Array],
      default: 0
    },
    // 值为 true 时，滑块为禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    invalidColor: {
      type: String,
      default: '#E0E0E0'
    },
    validColor: {
      type: String,
      default: '#EE9900'
    },
    disabledColor: {
      type: String,
      default: '#AAA'
    }
  },
  created: function created() {
    if (_utils2.default.env.isWeb()) {
      this.env = 'web';
      this.DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    } else {
      this.DPR = weex.config.env.scale;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.block1 = this.$refs['slide-block-1']; // 左侧滑块
    this.block2 = this.$refs['slide-block-2']; // 右侧滑块
    this.valueBar = this.$refs['value-bar']; // 黄色值条
    this.barContainer = this.$refs['bar-container']; // 滚动条容器

    if (!this.range) {
      this.diffX1 = this._getDiffX(this.value || this.defaultValue);
    } else {
      this.diffX1 = this._getDiffX(this.value[0] || this.defaultValue[0]);
      this.diffX2 = this._getDiffX(this.value[1] || this.defaultValue[1]);
      this.barWidth = this.diffX2 - this.diffX1;
    }

    // 是否支持expresstionBinding
    if (_utils2.default.env.supportsEB() && _weexBindingx2.default.prepare) {
      this.block1 && _weexBindingx2.default.prepare({
        anchor: this.block1.ref,
        eventType: 'pan'
      });
      this.block2 && _weexBindingx2.default.prepare({
        anchor: this.block2.ref,
        eventType: 'pan'
      });
      this.valueBar && _weexBindingx2.default.prepare({
        anchor: this.valueBar.ref,
        eventType: 'pan'
      });
    }

    if (this.range) {
      this.selectRange = this.value || this.defaultValue; // 初始化范围选择返回数据
      this.minDist = this.minDiff / (this.max - this.min) * this.length; // 滑块1、2之前最小间距
    }

    // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行
    setTimeout(function () {
      dom.getComponentRect(_this.barContainer, function (option) {
        var left = option.size.left;

        _this.leftDiffX = left;
      });
    }, 100);
  },


  computed: {
    containerStyle: function containerStyle() {
      return {
        width: this.length + 56 + 'px',
        height: '56px'
      };
    },
    rangeBarStyle: function rangeBarStyle() {
      return {
        width: this.length + 'px',
        height: this.height + 'px',
        flexDirection: 'row',
        backgroundColor: this.invalidColor,
        overflow: 'hidden'
      };
    },
    valueBarStyle: function valueBarStyle() {
      var left = 0;
      var width = 0;

      if (!this.range) {
        left = this.diffX1 - this.length;
        width = this.length;
      } else {
        left = this.diffX1;
        width = this.diffX2 - this.diffX1;
      }

      return {
        width: width + 'px',
        height: this.height + 'px',
        transform: 'translateX(' + left + 'px)',
        backgroundColor: this.disabled ? this.disabledColor : this.validColor
      };
    },
    blockStyle1: function blockStyle1() {
      var left = this.diffX1;
      return {
        transform: 'translateX(' + left + 'px)'
      };
    },
    blockStyle2: function blockStyle2() {
      return {
        transform: 'translateX(' + this.diffX2 + 'px)'
      };
    }
  },
  methods: {

    // 更新单选值或最小值
    weexHandler1: function weexHandler1(e) {
      var _this2 = this;

      var self = this;
      switch (e.state) {
        case 'start':
          self.bindBlock1();
          break;
        case 'move':
          dom.getComponentRect(this.block1, function (option) {
            var left = option.size.left;

            var value = _this2._getValue(left - _this2.leftDiffX);
            if (!_this2.range) {
              _this2.$emit('updateValue', value);
            } else {
              _this2.selectRange[0] = value;
              _this2.$emit('updateValue', _this2.selectRange);
            }
          });
          break;
        case 'end':
          break;
        default:
          break;
      }
    },


    // 更新最大值
    weexHandler2: function weexHandler2(e) {
      var _this3 = this;

      var self = this;

      switch (e.state) {
        case 'start':
          self.bindBlock2();
          break;
        case 'move':
          dom.getComponentRect(this.block2, function (option) {
            var left = option.size.left;

            _this3.selectRange[1] = _this3._getValue(left - _this3.leftDiffX);
            _this3.$emit('updateValue', _this3.selectRange);
          });
          break;
        case 'end':
          break;
        default:
          break;
      }
    },
    weexStartHandler1: function weexStartHandler1() {
      var _this4 = this;

      // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案
      if (!this.isAndroid) {
        return;
      }
      this.firstInterval = setInterval(function () {
        dom.getComponentRect(_this4.block1, function (option) {
          var left = option.size.left;

          var value = _this4._getValue(left - _this4.leftDiffX);
          if (!_this4.range) {
            _this4.$emit('updateValue', value);
          } else {
            _this4.selectRange[0] = value;
            _this4.$emit('updateValue', _this4.selectRange);
          }
        });
      }, this.timeout);
    },
    weexStartHandler2: function weexStartHandler2() {
      var _this5 = this;

      if (!this.isAndroid) {
        return;
      }
      // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案
      this.secondInterval = setInterval(function () {
        dom.getComponentRect(_this5.block2, function (option) {
          var left = option.size.left;

          _this5.selectRange[1] = _this5._getValue(left - _this5.leftDiffX);
          _this5.$emit('updateValue', _this5.selectRange);
        });
      }, this.timeout);
    },


    // 清除定时器
    weexEndHandler: function weexEndHandler() {
      if (!this.isAndroid) {
        return;
      }
      this.firstInterval && clearInterval(this.firstInterval);
      this.secondInterval && clearInterval(this.secondInterval);
    },
    webStartHandler: function webStartHandler(e) {
      if (this.env === 'weex') {
        return;
      }
      this.startX = e.touch.clientX;
      this.startDiffX1 = this.diffX1;
      this.startDiffX2 = this.diffX2;
    },
    webMoveHandler1: function webMoveHandler1(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }

      var deltaX = (e.touch.clientX - this.startX) * this.DPR;
      var diff = this.startDiffX1 + deltaX;

      var max = this.length;
      if (this.range) {
        max = this.diffX2 - this.minDist;
      }

      if (diff > 0 && diff < max) {
        this.diffX1 = diff;
        animation.transition(this.block1, {
          styles: {
            transform: 'translateX(' + this.diffX1 + 'px)'
          }
        }, function () {});
        if (!this.range) {
          this.$emit('updateValue', this._getValue(this.diffX1));
        } else {
          this.selectRange[0] = this._getValue(this.diffX1);
          this.$emit('updateValue', this.selectRange);
        }
      }
    },
    webMoveHandler2: function webMoveHandler2(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }

      var deltaX = (e.touch.clientX - this.startX) * this.DPR;
      var diff = this.startDiffX2 + deltaX;
      var min = this.diffX1 + this.minDist;
      var max = this.length;

      if (diff > min && diff < max) {
        this.diffX2 = diff;
        animation.transition(this.block2, {
          styles: {
            transform: 'translateX(' + this.diffX2 + 'px)'
          }
        }, function () {});
        if (!this.range) {
          this.$emit('updateValue', this._getValue(this.diffX2));
        } else {
          this.selectRange[1] = this._getValue(this.diffX2);
          this.$emit('updateValue', this.selectRange);
        }
      }
    },
    bindBlock1: function bindBlock1() {
      var self = this;

      // 如果禁用，不行进行表达式绑定
      if (self.disabled) {
        return;
      }

      // 初始化按钮&条的大小范围
      var blockMax1 = 0;
      if (self.range) {
        blockMax1 = self.diffX2 - self.minDist;
      } else {
        blockMax1 = self.length;
      }

      var barMax1 = self.diffX2;

      if (!self.range) {

        var startLeft = self.diffX1 - blockMax1 - self.minDist;

        var props = [{
          element: self.block1.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))'
        }, {
          element: self.valueBar.ref,
          property: 'transform.translateX',
          expression: 'min(0, max(x + ' + startLeft + ', -' + blockMax1 + '))'
        }];

        _weexBindingx2.default.bind({
          anchor: self.block1.ref,
          eventType: 'pan',
          props: props
        }, function (e) {
          if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
            var range = self.getRange();
            // 限制diffX1范围
            self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
            self.bindBlock1();
          }
        });
      } else {

        // 选范围
        var _props = [{
          element: self.block1.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))'
        }, {
          element: self.valueBar.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))'
        }, {
          element: self.valueBar.ref,
          property: 'width',
          expression: 'min(' + barMax1 + ', max(0, ' + self.barWidth + ' - x))'
        }];

        _weexBindingx2.default.bind({
          anchor: self.block1.ref,
          eventType: 'pan',
          props: _props
        }, function (e) {
          if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
            var range = self.getRange();
            self.barWidth = self._restrictValue(range.rangeX1, self.barWidth - e.deltaX);
            self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
            self.bindBlock1();
          }
        });
      }
    },
    bindBlock2: function bindBlock2() {
      var self = this;

      // 如果禁用，不行进行表达式绑定
      if (self.disabled) {
        return;
      }

      // 初始化按钮&条的大小范围
      var blockMax1 = 0;
      if (self.range) {
        blockMax1 = self.diffX2 - self.minDist;
      } else {
        blockMax1 = self.length;
      }

      var blockMax2 = self.length;
      var blockMin2 = self.diffX1 + self.minDist;
      var barMax2 = self.length - self.diffX1;

      var props = [{
        element: self.block2.ref,
        property: 'transform.translateX',
        expression: 'min(' + blockMax2 + ', max(x + ' + self.diffX2 + ', ' + blockMin2 + '))'
      }, {
        element: self.valueBar.ref,
        property: 'width',
        expression: 'min(' + barMax2 + ', max(0, x + ' + self.barWidth + '))'
      }];

      _weexBindingx2.default.bind({
        anchor: self.block2.ref,
        eventType: 'pan',
        props: props
      }, function (e) {
        if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
          var range = self.getRange();
          self.barWidth = self._restrictValue([0, self.length - self.diffX1], self.barWidth + e.deltaX);
          self.diffX2 = self._restrictValue(range.rangeX2, self.diffX2 + e.deltaX);
          self.bindBlock2();
        }
      });
    },


    // 获取diffx1 diffx2 取值范围
    getRange: function getRange() {
      if (!this.range) {
        return {
          rangeX1: [0, this.length]
        };
      } else {
        return {
          rangeX1: [0, this.diffX2 - this.minDist],
          rangeX2: [this.diffX1 + this.minDist, this.length]
        };
      }
    },


    // 限制取值范围
    _restrictValue: function _restrictValue(range, value) {
      if (range && range.length && range.length === 2) {
        if (value < range[0]) {
          return range[0];
        } else if (value > range[1]) {
          return range[1];
        } else {
          return value;
        }
      }
      return;
    },


    // 根据x方向偏移量计算value
    _getValue: function _getValue(diffX) {
      return Math.round(diffX / this.length * (this.max - this.min) + this.min);
    },


    // 根据value和length计算x方向偏移值
    _getDiffX: function _getDiffX(value) {
      return (value - this.min) / (this.max - this.min) * this.length;
    }
  }
};

/***/ }),
/* 339 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "bar-container",
    staticClass: ["slider-bar-container"],
    style: _vm.containerStyle
  }, [_c('div', {
    staticClass: ["range-bar"],
    style: _vm.rangeBarStyle
  }, [_c('div', {
    ref: "value-bar",
    staticClass: ["value-bar"],
    style: _vm.valueBarStyle
  }, [_c('div')])]), _c('div', {
    ref: "slide-block-1",
    staticClass: ["slide-block"],
    style: _vm.blockStyle1,
    attrs: {
      "preventMoveEvent": _vm.preventMoveEvent
    },
    on: {
      "panstart": _vm.webStartHandler,
      "panmove": _vm.webMoveHandler1,
      "touchstart": _vm.weexStartHandler1,
      "touchend": _vm.weexEndHandler,
      "horizontalpan": _vm.weexHandler1
    }
  }, [_c('div')]), (_vm.range) ? _c('div', {
    ref: "slide-block-2",
    staticClass: ["slide-block"],
    style: _vm.blockStyle2,
    attrs: {
      "preventMoveEvent": _vm.preventMoveEvent
    },
    on: {
      "panstart": _vm.webStartHandler,
      "panmove": _vm.webMoveHandler2,
      "touchstart": _vm.weexStartHandler2,
      "touchend": _vm.weexEndHandler,
      "horizontalpan": _vm.weexHandler2
    }
  }, [_c('div')]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(341);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(342)
)

/* script */
__vue_exports__ = __webpack_require__(343)

/* template */
var __vue_template__ = __webpack_require__(344)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-stepper/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-161098a1"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 342 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-stepper": {
    "flexDirection": "row"
  },
  "stepper-plus": {
    "width": "56",
    "height": "56",
    "backgroundColor": "#ededed",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "6"
  },
  "stepper-minus": {
    "width": "56",
    "height": "56",
    "backgroundColor": "#ededed",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "6"
  },
  "stepper-input": {
    "borderWidth": 0,
    "textAlign": "center",
    "color": "#3d3d3d",
    "fontSize": "30",
    "lineHeight": "56",
    "width": "86"
  },
  "stepper-icon": {
    "fontSize": "36",
    "color": "#666666",
    "marginTop": "-4"
  }
}

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    min: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [String, Number],
      default: 100
    },
    step: {
      type: [String, Number],
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [String, Number],
      default: 1
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disableStyle: function disableStyle() {
      if (this.disabled) {
        return {
          color: '#cccccc'
        };
      }
    },
    valueString: function valueString() {
      return this.value.toString();
    }
  },
  data: function data() {
    return {
      value: 1,
      isLess: false,
      isOver: false
    };
  },
  watch: {
    defaultValue: function defaultValue(newNum) {
      this.value = newNum;
    }
  },
  created: function created() {
    this.value = parseInt(this.defaultValue, 10);
    if (this.disabled) {
      this.isLess = true;
      this.isOver = true;
    }
  },

  methods: {
    minusClicked: function minusClicked() {
      if (this.disabled) {
        return;
      }
      var isMinOver = this.value <= this.min;
      var nowNum = this.value - parseInt(this.step, 10);
      if (isMinOver) {
        this.$emit('wxcStepperValueIsMinOver', { value: this.value });
      } else {
        this.value = nowNum;
        this.resetDisabledStyle();
      }
      // 由于此处已经减step
      if (nowNum <= this.min) {
        this.value = parseInt(this.min, 10);
        this.isLess = true;
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    plusClicked: function plusClicked() {
      if (this.disabled) {
        return;
      }
      var isMaxOver = this.value >= this.max;
      var nowNum = this.value + parseInt(this.step, 10);
      if (isMaxOver) {
        this.$emit('wxcStepperValueIsMaxOver', { value: this.value });
      } else {
        this.value = nowNum;
        this.resetDisabledStyle();
      }
      // 由于此处已经加step
      if (nowNum >= this.max) {
        this.value = parseInt(this.max, 10);
        this.isOver = true;
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    onInput: function onInput(e) {
      this.correctInputValue(e.value);
    },
    onBlur: function onBlur(e) {
      this.correctInputValue(e.value);
    },
    correctInputValue: function correctInputValue(v) {
      if (/^[1-9]\d{0,}$/.test(v) && parseInt(v, 10) >= this.min && parseInt(v, 10) <= this.max) {
        this.value = parseInt(v, 10);
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    resetDisabledStyle: function resetDisabledStyle() {
      this.isLess = false;
      this.isOver = false;
    }
  }
};

/***/ }),
/* 344 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-stepper"]
  }, [_c('div', {
    staticClass: ["stepper-minus"],
    attrs: {
      "ariaLabel": "减数",
      "accessible": true
    },
    on: {
      "click": _vm.minusClicked
    }
  }, [_c('text', {
    staticClass: ["stepper-icon"],
    style: {
      color: _vm.isLess ? '#cccccc' : '#666666'
    }
  }, [_vm._v("-")])]), _c('input', {
    staticClass: ["stepper-input"],
    style: _vm.disableStyle,
    attrs: {
      "type": "number",
      "value": _vm.valueString,
      "disabled": _vm.disabled || _vm.readOnly
    },
    on: {
      "input": _vm.onInput,
      "blur": _vm.onBlur
    }
  }), _c('div', {
    staticClass: ["stepper-plus"],
    attrs: {
      "ariaLabel": "加数",
      "accessible": true
    },
    on: {
      "click": _vm.plusClicked
    }
  }, [_c('text', {
    staticClass: ["stepper-icon"],
    style: {
      color: _vm.isOver ? '#cccccc' : '#666666'
    }
  }, [_vm._v("+")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(346);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(347)
)

/* script */
__vue_exports__ = __webpack_require__(348)

/* template */
var __vue_template__ = __webpack_require__(349)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-tab-page/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-23d7b6cd"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 347 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-tab-page": {
    "width": "750"
  },
  "tab-title-list": {
    "flexDirection": "row"
  },
  "title-item": {
    "justifyContent": "center",
    "alignItems": "center",
    "borderBottomStyle": "solid"
  },
  "border-bottom": {
    "position": "absolute",
    "bottom": 0
  },
  "tab-page-wrap": {
    "width": "750",
    "overflow": "hidden"
  },
  "tab-container": {
    "flex": 1,
    "flexDirection": "row",
    "position": "absolute"
  },
  "tab-text": {
    "lines": 1,
    "textOverflow": "ellipsis"
  }
}

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _weexBindingx = __webpack_require__(3);

var _weexBindingx2 = _interopRequireDefault(_weexBindingx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
var animation = weex.requireModule('animation');
var swipeBack = weex.requireModule('swipeBack');

exports.default = {
  props: {
    tabTitles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    panDist: {
      type: Number,
      default: 200
    },
    spmC: {
      type: [String, Number],
      default: ''
    },
    titleUseSlot: {
      type: Boolean,
      default: false
    },
    tabStyles: {
      type: Object,
      default: function _default() {
        return {
          bgColor: '#FFFFFF',
          titleColor: '#666666',
          activeTitleColor: '#3D3D3D',
          activeBgColor: '#FFFFFF',
          isActiveTitleBold: true,
          iconWidth: 70,
          iconHeight: 70,
          width: 160,
          height: 120,
          fontSize: 24,
          hasActiveBottom: true,
          activeBottomColor: '#FFC900',
          activeBottomWidth: 120,
          activeBottomHeight: 6,
          textPaddingLeft: 10,
          textPaddingRight: 10,
          leftOffset: 0
        };
      }
    },
    titleType: {
      type: String,
      default: 'icon'
    },
    tabPageHeight: {
      type: [String, Number],
      default: 1334
    },
    isTabView: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    wrapBgColor: {
      type: String,
      default: '#f2f3f4'
    }
  },
  data: function data() {
    return {
      currentPage: 0,
      gesToken: 0,
      isMoving: false,
      startTime: 0,
      deltaX: 0,
      translateX: 0
    };
  },
  created: function created() {
    var titleType = this.titleType,
        tabStyles = this.tabStyles;

    if (titleType === 'iconFont' && tabStyles.iconFontUrl) {
      dom.addRule('fontFace', {
        'fontFamily': "wxcIconFont",
        'src': 'url(' + tabStyles.iconFontUrl + ')'
      });
    }
  },
  mounted: function mounted() {
    if (swipeBack && swipeBack.forbidSwipeBack) {
      swipeBack.forbidSwipeBack(true);
    }
    if (_utils2.default.env.supportsEBForIos() && this.isTabView) {
      var tabPageEl = this.$refs['tab-page-wrap'];
      _weexBindingx2.default.prepare && _weexBindingx2.default.prepare({
        anchor: tabPageEl.ref,
        eventType: 'pan'
      });
    }
  },

  methods: {
    next: function next() {
      var page = this.currentPage;
      if (page < this.tabTitles.length - 1) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    startHandler: function startHandler() {
      if (_utils2.default.env.supportsEBForIos() && this.isTabView) {
        this.bindExp(this.$refs['tab-page-wrap']);
      }
    },
    bindExp: function bindExp(element) {
      var _this = this;

      if (element && element.ref) {

        if (this.isMoving && this.gesToken !== 0) {
          _weexBindingx2.default.unbind({
            eventType: 'pan',
            token: this.gesToken
          });
          this.gesToken = 0;
          return;
        }

        var tabElement = this.$refs['tab-container'];
        var currentPage = this.currentPage,
            panDist = this.panDist;

        var dist = currentPage * 750;

        // x-dist
        var props = [{
          element: tabElement.ref,
          property: 'transform.translateX',
          expression: 'x-' + dist
        }];

        var gesTokenObj = _weexBindingx2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: props
        }, function (e) {
          var deltaX = e.deltaX,
              state = e.state;

          if (state === 'end') {
            if (deltaX < -panDist) {
              _this.next();
            } else if (deltaX > panDist) {
              _this.prev();
            } else {
              _this.setPage(currentPage);
            }
          }
        });
        this.gesToken = gesTokenObj.token;
      }
    },
    setPage: function setPage(page) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!this.isTabView) {
        this.jumpOut(url);
        return;
      }
      if (this.isMoving === true) {
        return;
      }
      this.isMoving = true;
      var previousPage = this.currentPage;
      var currentTabEl = this.$refs['wxc-tab-title-' + page][0];
      var width = this.tabStyles.width;

      var appearNum = parseInt(750 / width);
      var tabsNum = this.tabTitles.length;
      var offset = page > appearNum ? -(750 - width) / 2 : -width * 2;

      if (appearNum < tabsNum) {
        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
          offset: offset, animated: animated
        });

        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
          offset: -width * page,
          animated: animated
        });
      }

      this.isMoving = false;
      this.currentPage = page;
      this._animateTransformX(page, animated);
      this.$emit('wxcTabPageCurrentTabSelected', { page: page });
    },
    jumpOut: function jumpOut(url) {
      url && _utils2.default.goToH5Page(url);
    },
    _animateTransformX: function _animateTransformX(page, animated) {
      var duration = this.duration,
          timingFunction = this.timingFunction;

      var computedDur = animated ? duration : 0.00001;
      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: computedDur,
        timingFunction: timingFunction,
        delay: 0
      }, function () {});
    }
  }
};

/***/ }),
/* 349 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-tab-page"],
    style: {
      height: (_vm.tabPageHeight) + 'px',
      backgroundColor: _vm.wrapBgColor
    }
  }, [_c('scroller', {
    ref: "tab-title-list",
    staticClass: ["tab-title-list"],
    style: {
      backgroundColor: _vm.tabStyles.bgColor,
      height: (_vm.tabStyles.height) + 'px',
      paddingLeft: _vm.tabStyles.leftOffset + 'px'
    },
    attrs: {
      "showScrollbar": false,
      "scrollDirection": "horizontal",
      "dataSpm": _vm.spmC
    }
  }, _vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: ["title-item"],
      style: {
        width: _vm.tabStyles.width + 'px',
        height: _vm.tabStyles.height + 'px',
        backgroundColor: _vm.currentPage === index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor
      },
      attrs: {
        "accessible": true,
        "ariaLabel": ("" + (v.title?v.title:'标签'+index))
      },
      on: {
        "click": function($event) {
          _vm.setPage(index, v.url)
        }
      }
    }, [(_vm.titleType === 'icon' && !_vm.titleUseSlot) ? _c('image', {
      style: {
        width: _vm.tabStyles.iconWidth + 'px',
        height: _vm.tabStyles.iconHeight + 'px'
      },
      attrs: {
        "src": _vm.currentPage === index ? v.activeIcon : v.icon
      }
    }) : _vm._e(), (_vm.titleType === 'iconFont' && v.codePoint && !_vm.titleUseSlot) ? _c('text', {
      staticClass: ["icon-font"],
      style: {
        fontFamily: 'wxcIconFont',
        fontSize: _vm.tabStyles.iconFontSize + 'px',
        color: _vm.currentPage === index ? _vm.tabStyles.activeIconFontColor : _vm.tabStyles.iconFontColor
      }
    }, [_vm._v(_vm._s(v.codePoint))]) : _vm._e(), (!_vm.titleUseSlot) ? _c('text', {
      staticClass: ["tab-text"],
      style: {
        fontSize: _vm.tabStyles.fontSize + 'px',
        fontWeight: (_vm.currentPage === index && _vm.tabStyles.isActiveTitleBold) ? 'bold' : 'normal',
        color: _vm.currentPage === index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: _vm.tabStyles.textPaddingLeft + 'px',
        paddingRight: _vm.tabStyles.textPaddingRight + 'px'
      }
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), (_vm.tabStyles.hasActiveBottom && !_vm.titleUseSlot) ? _c('div', {
      staticClass: ["border-bottom"],
      style: {
        width: _vm.tabStyles.activeBottomWidth + 'px',
        left: (_vm.tabStyles.width - _vm.tabStyles.activeBottomWidth) / 2 + 'px',
        height: _vm.tabStyles.activeBottomHeight + 'px',
        backgroundColor: _vm.currentPage === index ? _vm.tabStyles.activeBottomColor : 'transparent'
      }
    }) : _vm._e(), (_vm.titleUseSlot) ? _vm._t(("tab-title-" + index)) : _vm._e()], 2)
  })), _c('div', {
    ref: "tab-page-wrap",
    staticClass: ["tab-page-wrap"],
    style: {
      height: (_vm.tabPageHeight - _vm.tabStyles.height) + 'px'
    },
    on: {
      "horizontalpan": _vm.startHandler
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: ["tab-container"]
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(351);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(352)
)

/* script */
__vue_exports__ = __webpack_require__(353)

/* template */
var __vue_template__ = __webpack_require__(354)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-tab-bar/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-54580b2b"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 352 */
/***/ (function(module, exports) {

module.exports = {
  "wxc-tab-page": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "tab-title-list": {
    "flexDirection": "row",
    "justifyContent": "space-around"
  },
  "title-item": {
    "justifyContent": "center",
    "alignItems": "center",
    "borderBottomStyle": "solid"
  },
  "tab-page-wrap": {
    "width": "750",
    "flex": 1,
    "overflow": "hidden"
  },
  "tab-container": {
    "flex": 1,
    "flexDirection": "row",
    "position": "absolute"
  },
  "tab-text": {
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "desc-tag": {
    "position": "absolute",
    "top": "10",
    "right": "20",
    "borderBottomRightRadius": "14",
    "borderBottomLeftRadius": 0,
    "borderTopLeftRadius": "14",
    "borderTopRightRadius": "14",
    "backgroundColor": "#FF5E00",
    "height": "26",
    "alignItems": "center",
    "justifyContent": "center",
    "paddingLeft": "6",
    "paddingRight": "6"
  },
  "dot": {
    "width": "12",
    "height": "12",
    "borderBottomRightRadius": "12",
    "borderBottomLeftRadius": "12",
    "borderTopLeftRadius": "12",
    "borderTopRightRadius": "12",
    "position": "absolute",
    "top": "10",
    "right": "40",
    "backgroundColor": "#FF5E00"
  },
  "desc-text": {
    "fontSize": "18",
    "color": "#ffffff"
  }
}

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
var animation = weex.requireModule('animation');
exports.default = {
  props: {
    tabTitles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    tabStyles: {
      type: Object,
      default: function _default() {
        return {
          bgColor: '#FFFFFF',
          titleColor: '#666666',
          activeTitleColor: '#3D3D3D',
          activeBgColor: '#FFFFFF',
          isActiveTitleBold: true,
          iconWidth: 70,
          iconHeight: 70,
          width: 160,
          height: 120,
          fontSize: 24,
          activeBottomColor: '#FFC900',
          activeBottomWidth: 120,
          activeBottomHeight: 6,
          textPaddingLeft: 10,
          textPaddingRight: 10
        };
      }
    },
    titleType: {
      type: String,
      default: 'icon'
    },
    titleUseSlot: {
      type: Boolean,
      default: false
    },
    isTabView: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    wrapBgColor: {
      type: String,
      default: '#f2f3f4'
    }
  },
  data: function data() {
    return {
      currentPage: 0,
      translateX: 0
    };
  },
  created: function created() {
    var titleType = this.titleType,
        tabStyles = this.tabStyles;

    if (titleType === 'iconFont' && tabStyles.iconFontUrl) {
      dom.addRule('fontFace', {
        'fontFamily': "wxcIconFont",
        'src': 'url(\'' + tabStyles.iconFontUrl + '\')'
      });
    }
    this.isIPhoneX = _utils2.default.env.isIPhoneX();
  },

  methods: {
    next: function next() {
      var page = this.currentPage;
      if (page < this.tabTitles.length - 1) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    setPage: function setPage(page) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!this.isTabView) {
        this.jumpOut(url);
        return;
      }
      var previousPage = this.currentPage;
      var currentTabEl = this.$refs['wxc-tab-title-' + page][0];
      var width = this.tabStyles.width;

      var appearNum = parseInt(750 / width);
      var tabsNum = this.tabTitles.length;
      var offset = page > appearNum ? -(750 - width) / 2 : -width * 2;

      if (appearNum < tabsNum) {
        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
          offset: offset, animated: animated
        });

        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
          offset: -width * page,
          animated: animated
        });
      }

      this.currentPage = page;
      this._animateTransformX(page, animated);
      this.$emit('wxcTabBarCurrentTabSelected', { page: page });
    },
    jumpOut: function jumpOut(url) {
      url && _utils2.default.goToH5Page(url);
    },
    _animateTransformX: function _animateTransformX(page, animated) {
      var duration = this.duration,
          timingFunction = this.timingFunction;

      var computedDur = animated ? duration : 0.00001;
      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: computedDur,
        timingFunction: timingFunction,
        delay: 0
      }, function () {});
    }
  }
};

/***/ }),
/* 354 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wxc-tab-page"],
    style: {
      backgroundColor: _vm.wrapBgColor
    }
  }, [_c('div', {
    ref: "tab-page-wrap",
    staticClass: ["tab-page-wrap"]
  }, [_c('div', {
    ref: "tab-container",
    staticClass: ["tab-container"]
  }, [_vm._t("default")], 2)]), _c('div', {
    staticClass: ["tab-title-list"],
    style: {
      backgroundColor: _vm.tabStyles.bgColor,
      height: (_vm.tabStyles.height + (_vm.isIPhoneX ? 78 : 0)) + 'px',
      paddingBottom: _vm.isIPhoneX ? '78px' : '0'
    }
  }, _vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: ["title-item"],
      style: {
        width: _vm.tabStyles.width + 'px',
        height: _vm.tabStyles.height + 'px',
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor
      },
      attrs: {
        "accessible": true,
        "ariaLabel": ("" + (v.title?v.title:'标签'+index))
      },
      on: {
        "click": function($event) {
          _vm.setPage(index, v.url)
        }
      }
    }, [(_vm.titleType === 'icon' && !_vm.titleUseSlot) ? _c('image', {
      style: {
        width: _vm.tabStyles.iconWidth + 'px',
        height: _vm.tabStyles.iconHeight + 'px'
      },
      attrs: {
        "src": _vm.currentPage == index ? v.activeIcon : v.icon
      }
    }) : _vm._e(), (_vm.titleType === 'iconFont' && v.codePoint && !_vm.titleUseSlot) ? _c('text', {
      style: {
        fontFamily: 'wxcIconFont',
        fontSize: _vm.tabStyles.iconFontSize + 'px',
        marginBottom: _vm.tabStyles.iconFontMarginBottom ? (_vm.tabStyles.iconFontMarginBottom + 'px') : '8px',
        color: _vm.currentPage == index ? _vm.tabStyles.activeIconFontColor : _vm.tabStyles.iconFontColor
      }
    }, [_vm._v(_vm._s(v.codePoint))]) : _vm._e(), (!_vm.titleUseSlot) ? _c('text', {
      staticClass: ["tab-text"],
      style: {
        fontSize: _vm.tabStyles.fontSize + 'px',
        fontWeight: (_vm.currentPage == index && _vm.tabStyles.isActiveTitleBold) ? 'bold' : 'normal',
        color: _vm.currentPage == index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: _vm.tabStyles.textPaddingLeft + 'px',
        paddingRight: _vm.tabStyles.textPaddingRight + 'px'
      }
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), (v.badge && !_vm.titleUseSlot) ? _c('div', {
      staticClass: ["desc-tag"]
    }, [_c('text', {
      staticClass: ["desc-text"]
    }, [_vm._v(_vm._s(v.badge))])]) : _vm._e(), (v.dot && !v.badge && !_vm.titleUseSlot) ? _c('div', {
      staticClass: ["dot"]
    }) : _vm._e(), (_vm.titleUseSlot) ? _vm._t(("tab-title-" + index)) : _vm._e()], 2)
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(356);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(357)
)

/* script */
__vue_exports__ = __webpack_require__(358)

/* template */
var __vue_template__ = __webpack_require__(359)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/node_modules/weex-ui/packages/wxc-tag/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-609f66ac"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 357 */
/***/ (function(module, exports) {

module.exports = {
  "tag-item": {
    "height": "24",
    "justifyContent": "center",
    "alignItems": "center",
    "paddingBottom": "2"
  },
  "tag-border": {
    "borderBottomLeftRadius": "4",
    "borderBottomRightRadius": "4",
    "borderTopLeftRadius": "4",
    "borderTopRightRadius": "4"
  },
  "tag-hollow": {
    "borderWidth": "1"
  },
  "tag-image": {
    "height": "24"
  },
  "tag-special": {
    "borderWidth": "1",
    "flexDirection": "row"
  },
  "left-image": {
    "width": "20",
    "height": "20"
  },
  "tag-left": {
    "width": "24",
    "height": "24",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "tag-text": {
    "fontSize": "20",
    "height": "22",
    "lineHeight": "22",
    "paddingLeft": "6",
    "paddingRight": "6"
  }
}

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    type: {
      type: String,
      default: 'solid'
    },
    value: {
      type: [String, Number],
      default: '测试测试'
    },
    tagColor: {
      type: String,
      default: '#ff5000'
    },
    fontColor: {
      type: String,
      default: '#333333'
    },
    specialIcon: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
  computed: {
    showSolid: function showSolid() {
      var type = this.type,
          value = this.value;

      return type === 'solid' && value !== '';
    },
    showHollow: function showHollow() {
      var type = this.type,
          value = this.value;

      return type === 'hollow' && value !== '';
    },
    showSpecial: function showSpecial() {
      var type = this.type,
          value = this.value,
          specialIcon = this.specialIcon;

      return type === 'special' && value !== '' && specialIcon !== '';
    },
    showImage: function showImage() {
      var type = this.type,
          img = this.img;

      return type === 'image' && img !== '';
    },
    tagTextStyle: function tagTextStyle() {
      var tagColor = this.tagColor,
          showSolid = this.showSolid;

      return showSolid ? { backgroundColor: tagColor } : { borderColor: tagColor };
    }
  },
  data: function data() {
    return {
      imgWidth: 90
    };
  },
  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var width = e.size.naturalWidth;
        var height = e.size.naturalHeight;
        this.imgWidth = width * (24 / height);
      }
    }
  }
};

/***/ }),
/* 359 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.showSolid || _vm.showHollow) ? _c('div', {
    class: ['tag-item', 'tag-border', _vm.showHollow && 'tag-hollow'],
    style: _vm.tagTextStyle
  }, [_c('text', {
    staticClass: ["tag-text"],
    style: {
      color: _vm.fontColor
    }
  }, [_vm._v(_vm._s(_vm.value))])]) : _vm._e(), (_vm.showImage) ? _c('image', {
    staticClass: ["tag-image"],
    style: {
      width: _vm.imgWidth + 'px'
    },
    attrs: {
      "src": _vm.img,
      "ariaHidden": true
    },
    on: {
      "load": _vm.onLoad
    }
  }) : _vm._e(), (_vm.showSpecial) ? _c('div', {
    staticClass: ["tag-special", "tag-border"],
    style: {
      borderColor: _vm.tagColor
    },
    attrs: {
      "accessible": true,
      "ariaLabel": _vm.value
    }
  }, [_c('div', {
    staticClass: ["tag-left"],
    style: {
      backgroundColor: _vm.tagColor
    }
  }, [_c('image', {
    staticClass: ["left-image"],
    attrs: {
      "src": _vm.specialIcon
    }
  })]), _c('text', {
    staticClass: ["tag-text"],
    style: {
      color: _vm.fontColor
    }
  }, [_vm._v(_vm._s(_vm.value))])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = function () {
  return this;
}() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(373);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = ( false ? "undefined" : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}(
// In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this;
}() || Function("return this")());
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ }),
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(390);
var ieee754 = __webpack_require__(391);
var isArray = __webpack_require__(392);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by guoshuyu on 2017/11/15.
 */

var CLIENT_ID = exports.CLIENT_ID = "ff9e3ed8f7f34d615551";

var CLIENT_SECRET = exports.CLIENT_SECRET = "114314c7cd4502902fdb3ecbadaa40454f8305ef";

var ACCESS_KEY = exports.ACCESS_KEY = "V-8fqeyK7oW8wXIqEIi92CZ-ymENQfoEYcqExXAK";
var SECRET_KEY = exports.SECRET_KEY = "JhopiwQ-uynvHG_LF3DhafvAjXvZK3yYG612Kej_";
var QN_HOST = exports.QN_HOST = "http://osvlwlt4g.bkt.clouddn.com/";
var SCOPE = exports.SCOPE = "carguo";

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0; i < l; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(8);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _buffer = __webpack_require__(388);

var _api = __webpack_require__(19);

var _api2 = _interopRequireDefault(_api);

var _address = __webpack_require__(22);

var _address2 = _interopRequireDefault(_address);

var _constant = __webpack_require__(2);

var Constant = _interopRequireWildcard(_constant);

var _storageUtils = __webpack_require__(9);

var _ignoreConfig = __webpack_require__(389);

var ignoreConfig = _interopRequireWildcard(_ignoreConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 初始化用户信息
 */
var initUserInfo = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var token, res;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _storageUtils.getCache)(Constant.TOKEN_KEY);

                    case 2:
                        token = _context.sent;
                        _context.next = 5;
                        return getUserInfoLocal();

                    case 5:
                        res = _context.sent;
                        return _context.abrupt('return', {
                            result: res.result && token !== null,
                            data: res.data
                        });

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function initUserInfo() {
        return _ref.apply(this, arguments);
    };
}();

/**
 * 获取本地登录用户信息
 */
var getUserInfoLocal = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var userText, res;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _storageUtils.getCache)(Constant.USER_INFO);

                    case 2:
                        userText = _context2.sent;

                        if (!userText) {
                            _context2.next = 8;
                            break;
                        }

                        res = JSON.parse(userText);
                        return _context2.abrupt('return', {
                            result: true,
                            data: res
                        });

                    case 8:
                        return _context2.abrupt('return', {
                            result: false
                        });

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getUserInfoLocal() {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * 登录
 */
var doLogin = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(userName, password) {
        var base64Str, requestParams, res;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log("user " + userName + " pw " + password);
                        base64Str = (0, _buffer.Buffer)(userName + ":" + password).toString('base64');
                        _context3.next = 4;
                        return (0, _storageUtils.setCache)(Constant.USER_NAME_KEY, userName);

                    case 4:
                        _context3.next = 6;
                        return (0, _storageUtils.setCache)(Constant.USER_BASIC_CODE, base64Str);

                    case 6:
                        requestParams = {
                            scopes: ['user', 'repo', 'gist', 'notifications'],
                            note: "admin_script",
                            client_id: ignoreConfig.CLIENT_ID,
                            client_secret: ignoreConfig.CLIENT_SECRET
                        };

                        _api2.default.clearAuthorization();
                        _context3.next = 10;
                        return _api2.default.netFetch(_address2.default.getAuthorization(), 'POST', requestParams, true);

                    case 10:
                        res = _context3.sent;

                        if (res && res.result) {
                            (0, _storageUtils.setCache)(Constant.PW_KEY, password);
                        }
                        return _context3.abrupt('return', res);

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function doLogin(_x, _x2) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * 获取用户详细信息
 */
var getUserInfoDao = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(userName) {
        var res, countRes, starred, totalInfo;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        res = void 0;

                        if (!(!userName || userName === undefined)) {
                            _context4.next = 7;
                            break;
                        }

                        _context4.next = 4;
                        return _api2.default.netFetch(_address2.default.getMyUserInfo());

                    case 4:
                        res = _context4.sent;
                        _context4.next = 10;
                        break;

                    case 7:
                        _context4.next = 9;
                        return _api2.default.netFetch(_address2.default.getUserInfo(userName));

                    case 9:
                        res = _context4.sent;

                    case 10:
                        if (!(res && res.result)) {
                            _context4.next = 21;
                            break;
                        }

                        _context4.next = 13;
                        return getUserStaredCountNet(res.data.login);

                    case 13:
                        countRes = _context4.sent;
                        starred = "---";

                        if (countRes.result) {
                            starred = countRes.data;
                        }
                        totalInfo = Object.assign({}, res.data, { starred: starred });

                        if (!userName || userName === undefined) {
                            (0, _storageUtils.setCache)(Constant.USER_INFO, JSON.stringify(totalInfo));
                        }
                        return _context4.abrupt('return', {
                            result: true,
                            data: totalInfo
                        });

                    case 21:
                        return _context4.abrupt('return', {
                            result: false,
                            data: res.data
                        });

                    case 22:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function getUserInfoDao(_x3) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * 在header中提起stared count
 */
var getUserStaredCountNet = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(userName) {
        var res, link, indexStart, indexEnd, count;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _api2.default.netFetch(_address2.default.userStar(userName) + "&per_page=1");

                    case 2:
                        res = _context5.sent;

                        if (!(res && res.result && res.headers && res.headers.link)) {
                            _context5.next = 21;
                            break;
                        }

                        _context5.prev = 4;
                        link = res.headers.link;

                        if (!(link && typeof link === 'string')) {
                            _context5.next = 12;
                            break;
                        }

                        indexStart = link.lastIndexOf("page=") + 5;
                        indexEnd = link.lastIndexOf(">");

                        if (!(indexStart >= 0 && indexEnd >= 0)) {
                            _context5.next = 12;
                            break;
                        }

                        count = link.substring(indexStart, indexEnd);
                        return _context5.abrupt('return', {
                            result: true,
                            data: count
                        });

                    case 12:
                        return _context5.abrupt('return', {
                            result: true
                        });

                    case 15:
                        _context5.prev = 15;
                        _context5.t0 = _context5['catch'](4);

                        console.log(_context5.t0);

                    case 18:
                        return _context5.abrupt('return', {
                            result: false
                        });

                    case 21:
                        return _context5.abrupt('return', {
                            result: false
                        });

                    case 22:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[4, 15]]);
    }));

    return function getUserStaredCountNet(_x4) {
        return _ref5.apply(this, arguments);
    };
}();

exports.default = {
    doLogin: doLogin,
    getUserInfoDao: getUserInfoDao,
    initUserInfo: initUserInfo,
    getUserInfoLocal: getUserInfoLocal
};

/***/ }),
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(430)
)

/* script */
__vue_exports__ = __webpack_require__(431)

/* template */
var __vue_template__ = __webpack_require__(433)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/src/components/LoginPage.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-05316a58"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),
/* 430 */
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "alignItems": "center",
    "justifyContent": "center"
  },
  "input": {
    "marginLeft": "106",
    "marginRight": "106",
    "fontSize": "30",
    "marginTop": "30",
    "minWidth": "600",
    "borderRadius": "12",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "color": "#666666",
    "alignItems": "center",
    "justifyContent": "center",
    "borderWidth": "2",
    "borderStyle": "solid",
    "borderColor": "#41B883"
  },
  "logo": {
    "width": "424",
    "height": "200",
    "alignItems": "center",
    "justifyContent": "center"
  }
}

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _weexUi = __webpack_require__(20);

var _buffer = __webpack_require__(388);

var _user = __webpack_require__(393);

var _user2 = _interopRequireDefault(_user);

var _constant = __webpack_require__(2);

var Constant = _interopRequireWildcard(_constant);

var _commonUtils = __webpack_require__(432);

var _ignoreConfig = __webpack_require__(389);

var ignoreConfig = _interopRequireWildcard(_ignoreConfig);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule('modal');

exports.default = {
    components: { WxcButton: _weexUi.WxcButton, WxcLoading: _weexUi.WxcLoading },
    data: function data() {
        return {
            logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
            username: "",
            password: "",
            isLoading: false,
            loadingText: "处理中···"
        };
    },

    computed: {
        tipData: function tipData() {
            var login = 'wait your login';
            if (this.$store.state.user.userInfo.login) {
                login = this.$store.state.user.userInfo.login;
            }
            return login;
        }
    },
    methods: {
        onUserNameChange: function onUserNameChange(event) {
            this.username = event.value;
        },
        onPWChange: function onPWChange(event) {
            this.password = event.value;
        },
        onLogin: function onLogin() {
            var _this = this;

            var username = this.username;
            var password = this.password;
            if ((0, _commonUtils.isEmptyString)(username)) {
                modal.toast({
                    message: "用户名不能为空"
                });
                return;
            }
            if ((0, _commonUtils.isEmptyString)(password)) {
                modal.toast({ message: "密码不能为空" });
                return;
            }
            this.isLoading = true;
            this.$store.dispatch('doLogin', {
                username: username,
                password: password,
                resultCallback: function resultCallback(res) {
                    _this.isLoading = false;
                    if (res && res.result) {
                        _this.reset("/main");
                    }
                    console.info("resultCallback", res);
                }
            });
        }
    }
};

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isEmptyString = isEmptyString;
/**
 * 是否为空字符串
 */
function isEmptyString(value) {
    if (!value || value === undefined || value.length === 0) {
        return true;
    }
    return false;
}

/***/ }),
/* 433 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('image', {
    staticClass: ["logo"],
    attrs: {
      "src": _vm.logo
    }
  }), _c('input', {
    ref: "username",
    staticClass: ["input"],
    attrs: {
      "placeholder": "用户名",
      "value": _vm.username
    },
    on: {
      "input": _vm.onUserNameChange
    }
  }), _c('input', {
    ref: "password",
    staticClass: ["input"],
    attrs: {
      "type": "password",
      "placeholder": "密码",
      "value": _vm.password
    },
    on: {
      "input": _vm.onPWChange
    }
  }), _c('wxc-button', {
    attrs: {
      "text": "登录",
      "type": "red",
      "btnStyle": {
        flex: '1',
        width: '620px',
        marginTop: '30px',
        marginBottom: '30px'
      }
    },
    on: {
      "wxcButtonClicked": _vm.onLogin
    }
  }), _c('text', [_vm._v(_vm._s("UserName: " + _vm.tipData))]), _c('wxc-loading', {
    attrs: {
      "show": _vm.isLoading,
      "loadingText": _vm.loadingText,
      "interval": 100
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);