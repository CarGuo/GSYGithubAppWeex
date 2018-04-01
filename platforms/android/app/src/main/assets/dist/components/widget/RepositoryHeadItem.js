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
/******/ 	return __webpack_require__(__webpack_require__.s = 479);
/******/ })
/************************************************************************/
/******/ ({

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(480)
)

/* script */
__vue_exports__ = __webpack_require__(481)

/* template */
var __vue_template__ = __webpack_require__(482)
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
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/src/components/widget/RepositoryHeadItem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-113679a4"
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

/***/ 480:
/***/ (function(module, exports) {

module.exports = {
  "bottom-item-text": {
    "fontSize": "23",
    "fontFamily": "'wxcIconFont'",
    "color": "rgba(255,255,255,0.7)",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 1,
    "WebkitBoxOrient": "vertical"
  },
  "bottom-container": {
    "flexDirection": "row",
    "width": "700",
    "marginTop": "20",
    "borderTopWidth": "1",
    "borderColor": "rgba(255,255,255,0.7)",
    "paddingTop": "10"
  },
  "bottom-item": {
    "paddingTop": "10",
    "paddingBottom": "10",
    "flex": 1,
    "alignItems": "center",
    "justifyContent": "center"
  },
  "bottom-item-line": {
    "borderColor": "rgba(255,255,255,0.7)",
    "borderRightWidth": "1"
  },
  "repo-text": {
    "color": "rgba(227,227,227,0.4)",
    "fontSize": "25",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 1,
    "marginRight": "20",
    "WebkitBoxOrient": "vertical"
  },
  "time-text": {
    "color": "rgba(227,227,227,0.5)",
    "fontSize": "25",
    "flex": 1
  },
  "content-text": {
    "color": "rgba(227,227,227,0.7)",
    "fontSize": "28",
    "fontWeight": "bold"
  },
  "card-wrapper": {
    "width": "710",
    "backgroundColor": "#3c3f41",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "marginTop": "20",
    "borderRadius": "15",
    "boxShadow": "0 0 10px rgba(0, 0, 0, 0.90)"
  },
  "card-user-wrapper": {
    "alignItems": "center"
  },
  "name-text": {
    "color": "rgba(255,255,255,0.9)",
    "fontSize": "34",
    "fontWeight": "bold"
  },
  "control-container": {
    "backgroundColor": "#3c3f41",
    "width": "710",
    "flexDirection": "row",
    "marginTop": "30",
    "marginBottom": "30",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "15",
    "paddingTop": "10",
    "paddingRight": "20",
    "paddingBottom": "10",
    "paddingLeft": "20",
    "boxShadow": "0 0 10px rgba(0, 0, 0, 0.90)"
  },
  "control-text": {
    "flex": 1,
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "color": "rgba(255,255,255,0.9)",
    "fontSize": "26",
    "display": "-webkit-box",
    "whiteSpace": "normal !important",
    "WebkitBoxOrient": "vertical"
  }
}

/***/ }),

/***/ 481:
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
    methods: {
        onCardClick: function onCardClick() {
            this.onItemClick && this.onItemClick(this.itemIndex);
        },
        imageClick: function imageClick() {
            if (!this.itemValue.ex.display_login) {
                return;
            }
            this.jumpWithParams("UserInfoPage", { userName: this.itemValue.ex.display_login });
        },
        onControlClick: function onControlClick(index) {
            this.selectIndex = index;
            this.onItemClick && this.onItemClick(0, index);
        }
    },
    data: function data() {
        return {
            selectIndex: 1
        };
    },
    created: function created() {
        dom.addRule('fontFace', {
            'fontFamily': "wxcIconFont",
            'src': 'url(\'../../static/font/iconfont.ttf\')'
        });
    }
};

/***/ }),

/***/ 482:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: ["card-wrapper"]
  }, [_c('div', {
    staticClass: ["card-user-wrapper"],
    staticStyle: {
      flexDirection: "row"
    }
  }, [_c('text', {
    staticClass: ["name-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.userName))]), _c('text', {
    staticClass: ["name-text"]
  }, [_vm._v(_vm._s(" / "))]), _c('text', {
    staticClass: ["name-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.reposName))])]), _c('div', {
    staticStyle: {
      flexDirection: "row",
      marginTop: "20px"
    }
  }, [_c('text', {
    staticClass: ["repo-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.language))]), _c('text', {
    staticClass: ["repo-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.size ? ((_vm.itemValue.size / 1024).toFixed(2) + "M") : ' '))]), _c('text', {
    staticClass: ["repo-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.license ? _vm.itemValue.license.name : ""))])]), _c('text', {
    staticClass: ["content-text"],
    staticStyle: {
      flex: "1",
      marginTop: "20px"
    }
  }, [_vm._v(_vm._s(_vm.itemValue.description))]), _c('text', {
    staticClass: ["time-text"],
    staticStyle: {
      flex: "1",
      marginTop: "20px",
      marginBottom: "20px"
    }
  }, [_vm._v(_vm._s(_vm.itemValue.infoText))]), _c('div', {
    staticClass: ["bottom-container"]
  }, [_c('div', {
    staticClass: ["bottom-item", "bottom-item-line"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("\ue643 " + (_vm.itemValue.watchers_count ? _vm.itemValue.watchers_count : '---')))])]), _c('div', {
    staticClass: ["bottom-item", "bottom-item-line"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("\ue67e " + (_vm.itemValue.forks_count ? _vm.itemValue.forks_count : '---')))])]), _c('div', {
    staticClass: ["bottom-item", "bottom-item-line"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("\ue681 " + (_vm.itemValue.subscribers_count ? _vm.itemValue.subscribers_count : '---')))])]), _c('div', {
    staticClass: ["bottom-item"]
  }, [_c('text', {
    staticClass: ["bottom-item-text"]
  }, [_vm._v(_vm._s("\ue661 " + (_vm.itemValue.open_issues_count ? _vm.itemValue.open_issues_count : '---')))])])])]), _c('div', {
    staticClass: ["control-container"]
  }, [_c('text', {
    staticClass: ["control-text"],
    style: {
      color: (_vm.selectIndex === 1) ? '#FFFFFF' : '#AAAAAA'
    },
    on: {
      "click": function () {
        _vm.onControlClick(1)
      }
    }
  }, [_vm._v(_vm._s(' 动态 '))]), _c('text', {
    staticClass: ["control-text"],
    style: {
      color: (_vm.selectIndex === 2) ? '#FFFFFF' : '#AAAAAA'
    },
    on: {
      "click": function () {
        _vm.onControlClick(2)
      }
    }
  }, [_vm._v(_vm._s(' 提交 '))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });