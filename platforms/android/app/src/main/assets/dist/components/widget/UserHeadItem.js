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
/******/ 	return __webpack_require__(__webpack_require__.s = 489);
/******/ })
/************************************************************************/
/******/ ({

/***/ 364:
/***/ (function(module, exports) {

module.exports = {
  "user-icon": {
    "width": "140",
    "height": "140",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "70",
    "marginRight": "20"
  },
  "card-wrapper": {
    "width": "750",
    "backgroundColor": "#3c3f41",
    "borderBottomLeftRadius": "15",
    "borderBottomRightRadius": "15",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "boxShadow": "0 0 10px rgba(0, 0, 0, 0.80)"
  },
  "bottom-container": {
    "flexDirection": "row",
    "width": "720",
    "marginTop": "20",
    "borderTopWidth": "1",
    "borderColor": "rgba(255,255,255,0.7)",
    "paddingTop": "10"
  },
  "bottom-item": {
    "flex": 1,
    "alignItems": "center",
    "justifyContent": "center"
  },
  "bottom-item-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "28",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 1,
    "WebkitBoxOrient": "vertical"
  },
  "bottom-item-value": {
    "color": "rgba(255,255,255,0.7)",
    "fontSize": "28",
    "marginTop": "10",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 1,
    "WebkitBoxOrient": "vertical"
  },
  "bottom-item-line": {
    "borderColor": "rgba(255,255,255,0.7)",
    "borderRightWidth": "1"
  },
  "des-text": {
    "color": "rgba(255,255,255,0.7)",
    "fontSize": "28",
    "flex": 1,
    "marginTop": "20"
  },
  "link-text": {
    "fontFamily": "'wxcIconFont'",
    "fontSize": "23",
    "color": "rgba(0,111,255,0.6)",
    "flex": 1,
    "marginTop": "20"
  },
  "location-text": {
    "fontSize": "23",
    "fontFamily": "'wxcIconFont'",
    "color": "rgba(255,255,255,0.9)"
  },
  "org-text": {
    "fontSize": "23",
    "fontFamily": "'wxcIconFont'",
    "color": "rgba(255,255,255,0.9)"
  },
  "name-text": {
    "fontSize": "20",
    "color": "rgba(255,255,255,0.6)"
  },
  "user-text": {
    "fontWeight": "bold",
    "fontSize": "40",
    "color": "rgba(255,255,255,1)"
  },
  "card-user-wrapper": {
    "alignItems": "center",
    "marginBottom": "15"
  }
}

/***/ }),

/***/ 365:
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

var dom = weex.requireModule('dom');
exports.default = {
    name: "repository-item",
    props: {
        itemValue: {
            type: Object, default: function _default() {
                return { ex: {} };
            }
        }
    },
    components: {},
    methods: {},
    created: function created() {
        dom.addRule('fontFace', {
            'fontFamily': "wxcIconFont",
            'src': 'url(\'../../static/font/iconfont.ttf\')'
        });
    }
};

/***/ }),

/***/ 366:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["card-wrapper"]
  }, [_c('div', {
    staticClass: ["card-user-wrapper"],
    staticStyle: {
      flexDirection: "row"
    }
  }, [(_vm.itemValue.ex.userPic) ? _c('image', {
    staticClass: ["user-icon"],
    attrs: {
      "src": _vm.itemValue.ex.userPic
    }
  }) : _vm._e(), _c('div', {
    staticStyle: {
      flex: "1"
    }
  }, [_c('text', {
    staticClass: ["user-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.user))]), _c('text', {
    staticClass: ["name-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.name))]), _c('text', {
    staticClass: ["org-text"]
  }, [_vm._v(_vm._s('\ue63e ' + (_vm.itemValue.ex.org ? _vm.itemValue.ex.org : ' ')))]), _c('text', {
    staticClass: ["location-text"]
  }, [_vm._v(_vm._s('\ue7e6 ' + (_vm.itemValue.ex.location ? _vm.itemValue.ex.location : ' ')))])])]), _c('text', {
    staticClass: ["link-text"]
  }, [_vm._v(_vm._s('\ue670 ' + (_vm.itemValue.ex.link ? _vm.itemValue.ex.link : ' ')))]), _c('text', {
    staticClass: ["des-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.des))]), _c('div', {
    staticClass: ["bottom-container"]
  }, [_c('div', {
    staticClass: ["bottom-item", "bottom-item-line"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("仓库"))]), _c('text', {
    staticClass: ["bottom-item-value"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.repos ? _vm.itemValue.ex.repos : '---'))])]), _c('div', {
    staticClass: ["bottom-item", "bottom-item-line"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("粉丝"))]), _c('text', {
    staticClass: ["bottom-item-value"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.follower ? _vm.itemValue.ex.follower : '---'))])]), _c('div', {
    staticClass: ["bottom-item", "bottom-item-line"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("关注"))]), _c('text', {
    staticClass: ["bottom-item-value"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.followed ? _vm.itemValue.ex.followed : '---'))])]), _c('div', {
    staticClass: ["bottom-item", "bottom-item-line"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("星标"))]), _c('text', {
    staticClass: ["bottom-item-value"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.star ? _vm.itemValue.ex.star : '---'))])]), _c('div', {
    staticClass: ["bottom-item"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("荣耀"))]), _c('text', {
    staticClass: ["bottom-item-value"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.stared ? _vm.itemValue.ex.stared : '---'))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(364)
)

/* script */
__vue_exports__ = __webpack_require__(365)

/* template */
var __vue_template__ = __webpack_require__(366)
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
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/src/components/widget/UserHeadItem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-58da07e5"
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


/***/ })

/******/ });