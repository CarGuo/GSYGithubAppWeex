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
/******/ 	return __webpack_require__(__webpack_require__.s = 483);
/******/ })
/************************************************************************/
/******/ ({

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(484)
)

/* script */
__vue_exports__ = __webpack_require__(485)

/* template */
var __vue_template__ = __webpack_require__(486)
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
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/src/components/widget/RepositoryItem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-dd0c67b8"
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

/***/ 484:
/***/ (function(module, exports) {

module.exports = {
  "user-icon": {
    "width": "70",
    "height": "70",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "35",
    "marginRight": "20"
  },
  "card-wrapper": {
    "width": "700",
    "backgroundColor": "#FFFFFF",
    "borderRadius": "10",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "boxShadow": "0 0 10px rgba(211, 210, 210, 0.50)"
  },
  "card-user-wrapper": {
    "alignItems": "center",
    "marginBottom": "15"
  },
  "type-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "28",
    "marginTop": "-50",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 3,
    "WebkitBoxOrient": "vertical"
  },
  "user-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "28",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 3,
    "WebkitBoxOrient": "vertical"
  },
  "content-text": {
    "color": "rgba(13,13,13,0.6)",
    "fontSize": "28",
    "fontWeight": "bold",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 3,
    "WebkitBoxOrient": "vertical"
  },
  "repo-text": {
    "color": "rgba(13,13,13,0.6)",
    "fontSize": "30",
    "fontWeight": "bold"
  },
  "icon-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "28",
    "flex": 1,
    "fontFamily": "'wxcIconFont'",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 2,
    "WebkitBoxOrient": "vertical"
  }
}

/***/ }),

/***/ 485:
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

var dom = weex.requireModule('dom');
exports.default = {
    name: "repository-item",
    props: {
        defaultIcon1: { type: String, default: '\uE643 ' },
        defaultIcon2: { type: String, default: '\uE67E ' },
        defaultIcon3: { type: String, default: '\uE661 ' },
        itemValue: {
            type: Object, default: function _default() {
                return { ex: {} };
            }
        },
        itemIndex: { type: Number, default: -1 },
        onItemClick: { type: Function }
    },

    computed: {
        icon1: function icon1() {
            return this.itemValue.ex.icon1 ? this.itemValue.ex.icon1 : this.defaultIcon1;
        },
        icon2: function icon2() {
            return this.itemValue.ex.icon2 ? this.itemValue.ex.icon2 : this.defaultIcon2;
        },
        icon3: function icon3() {
            return this.itemValue.ex.icon3 ? this.itemValue.ex.icon3 : this.defaultIcon3;
        }
    },
    components: {},
    methods: {
        onCardClick: function onCardClick() {
            this.onItemClick && this.onItemClick(this.itemIndex);
        },
        imageClick: function imageClick() {
            if (!this.itemValue.ex.userName) {
                return;
            }
            this.jumpWithParams("UserInfoPage", { userName: this.itemValue.ex.userName });
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

/***/ 486:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["card-wrapper"],
    on: {
      "click": _vm.onCardClick
    }
  }, [_c('div', {
    staticClass: ["card-user-wrapper"],
    staticStyle: {
      flexDirection: "row"
    }
  }, [(_vm.itemValue.ex.userPic) ? _c('image', {
    staticClass: ["user-icon"],
    attrs: {
      "src": _vm.itemValue.ex.userPic
    },
    on: {
      "click": _vm.imageClick
    }
  }) : _vm._e(), _c('div', {
    staticStyle: {
      flex: "1"
    }
  }, [_c('text', {
    staticClass: ["repo-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.repoName))]), _c('text', {
    staticClass: ["user-text"],
    style: {
      flex: 1,
      fontFamily: 'wxcIconFont',
      fontSize: '10px',
    }
  }, [_vm._v("\n                " + _vm._s('\ue63e ' + _vm.itemValue.ex.userName))])]), _c('text', {
    staticClass: ["type-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.type))])]), _c('div', {
    directives: [{
      name: "html",
      rawName: "v-html",
      value: (_vm.itemValue.ex.content),
      expression: "itemValue.ex.content"
    }],
    staticClass: ["content-text"],
    staticStyle: {
      flex: "1",
      marginBottom: "20px"
    }
  }), _c('div', {
    staticStyle: {
      flexDirection: "row",
      width: "690px",
      overflow: "hidden"
    }
  }, [_c('text', {
    staticClass: ["icon-text"]
  }, [_vm._v(_vm._s(_vm.icon1 + _vm.itemValue.ex.icon1t))]), _c('text', {
    staticClass: ["icon-text"]
  }, [_vm._v(_vm._s(_vm.icon2 + _vm.itemValue.ex.icon2t))]), _c('text', {
    staticClass: ["icon-text"]
  }, [_vm._v(_vm._s(_vm.icon3 + _vm.itemValue.ex.icon3t))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });