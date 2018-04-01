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
/******/ 	return __webpack_require__(__webpack_require__.s = 469);
/******/ })
/************************************************************************/
/******/ ({

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(470)
)

/* script */
__vue_exports__ = __webpack_require__(471)

/* template */
var __vue_template__ = __webpack_require__(472)
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
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/src/components/widget/FileItem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-48096b96"
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

/***/ 470:
/***/ (function(module, exports) {

module.exports = {
  "card-wrapper": {
    "alignItems": "center",
    "flexDirection": "row",
    "height": "80",
    "width": "720",
    "backgroundColor": "#FFFFFF",
    "borderRadius": "10",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "boxShadow": "0 0 10px rgba(211, 210, 210, 0.50)"
  },
  "icon-text": {
    "color": "rgba(97,97,97,1)",
    "fontSize": "30",
    "fontFamily": "'wxcIconFont'",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 1,
    "WebkitBoxOrient": "vertical"
  },
  "arrow-text": {
    "color": "rgb(43,43,43)",
    "fontSize": "30",
    "fontFamily": "'wxcIconFont'",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 1,
    "WebkitBoxOrient": "vertical"
  },
  "content-text": {
    "color": "rgba(97,97,97,1)",
    "fontSize": "28",
    "display": "-webkit-box",
    "overflow": "hidden",
    "flex": 1,
    "marginLeft": "30",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 1,
    "WebkitBoxOrient": "vertical"
  }
}

/***/ }),

/***/ 471:
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

var dom = weex.requireModule('dom');
exports.default = {
    props: {
        itemValue: {
            type: Object, default: function _default() {
                return {};
            }
        },
        itemIndex: { type: Number, default: -1 },
        onItemClick: { type: Function }
    },
    components: {},
    data: function data() {
        return {
            fileStyle: {
                height: '80px',
                width: '720px',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 0 0px rgba(0, 0, 0, 0)'
            }
        };
    },

    methods: {
        onCardClick: function onCardClick() {
            this.onItemClick && this.onItemClick(this.itemIndex);
        }
    },
    created: function created() {
        dom.addRule('fontFace', {
            'fontFamily': "wxcIconFont",
            'src': 'url(\'../../static/font/iconfont.ttf\')'
        });
    }
};

/***/ }),

/***/ 472:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["card-wrapper"],
    style: _vm.itemValue.type !== 'file' ? {} : _vm.fileStyle,
    on: {
      "click": _vm.onCardClick
    }
  }, [_c('text', {
    staticClass: ["icon-text"],
    style: _vm.itemValue.type !== 'file' ? {
      color: '#3c3f41'
    } : {}
  }, [_vm._v(_vm._s(_vm.itemValue.type !== 'file' ? '\ue793' : '\uea77'))]), _c('text', {
    staticClass: ["content-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.name))]), (_vm.itemValue.type !== 'file') ? _c('text', {
    staticClass: ["arrow-text"]
  }, [_vm._v(_vm._s('\ue610'))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });