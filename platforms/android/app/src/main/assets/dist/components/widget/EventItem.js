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
/******/ 	return __webpack_require__(__webpack_require__.s = 468);
/******/ })
/************************************************************************/
/******/ ({

/***/ 361:
/***/ (function(module, exports) {

module.exports = {
  "user-icon": {
    "marginRight": "20",
    "width": "50",
    "height": "50",
    "alignItems": "center",
    "justifyContent": "center",
    "borderRadius": "25"
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
    "marginBottom": "20"
  },
  "des-text": {
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
    "fontWeight": "bold"
  },
  "name-text": {
    "color": "rgba(13,13,13,0.6)",
    "fontSize": "30",
    "fontWeight": "bold"
  }
}

/***/ }),

/***/ 362:
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

exports.default = {
    props: {
        itemValue: {
            type: Object, default: function _default() {
                return { ex: {} };
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
        }
    },
    data: function data() {
        return {};
    }
};

/***/ }),

/***/ 363:
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
  }, [(_vm.itemValue.ex.avatar_url) ? _c('image', {
    staticClass: ["user-icon"],
    attrs: {
      "src": _vm.itemValue.ex.avatar_url
    },
    on: {
      "click": _vm.imageClick
    }
  }) : _vm._e(), _c('text', {
    staticClass: ["name-text"],
    staticStyle: {
      flex: "1"
    }
  }, [_vm._v(_vm._s(_vm.itemValue.ex.display_login))]), _c('text', {
    staticClass: ["des-text"]
  }, [_vm._v(_vm._s(_vm._f("resolveTime")(_vm.itemValue.ex.created_at)))])]), _c('text', {
    staticClass: ["content-text"],
    staticStyle: {
      flex: "1",
      marginBottom: "20px"
    }
  }, [_vm._v(_vm._s(_vm.itemValue.ex.actionStr))]), _c('text', {
    staticClass: ["des-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.des))])])
},"@render":function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["card-wrapper"],
    attrs: {
      "@isComponentRoot": true,
      "@templateId": _vm._uid,
      "@componentProps": _vm.$props || {}
    },
    on: {
      "click": function($event) {
        this.onCardClick()
      }
    }
  }, [_c('div', {
    staticClass: ["card-user-wrapper"],
    staticStyle: {
      flexDirection: "row"
    }
  }, [_c('image', {
    staticClass: ["user-icon"],
    attrs: {
      "src": {
        "@binding": "itemValue.ex.avatar_url"
      },
      "[[match]]": "itemValue.ex.avatar_url"
    },
    on: {
      "click": function($event) {
        this.imageClick()
      }
    }
  }), _c('text', {
    staticClass: ["name-text"],
    staticStyle: {
      flex: "1"
    },
    attrs: {
      "value": {
        "@binding": "itemValue.ex.display_login"
      }
    }
  }), _c('text', {
    staticClass: ["des-text"],
    attrs: {
      "value": {
        "@binding": "_f(\"resolveTime\")(itemValue.ex.created_at)"
      }
    }
  })]), _c('text', {
    staticClass: ["content-text"],
    staticStyle: {
      flex: "1",
      marginBottom: "20px"
    },
    attrs: {
      "value": {
        "@binding": "itemValue.ex.actionStr"
      }
    }
  }), _c('text', {
    staticClass: ["des-text"],
    attrs: {
      "value": {
        "@binding": "itemValue.ex.des"
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(361)
)

/* script */
__vue_exports__ = __webpack_require__(362)

/* template */
var __vue_template__ = __webpack_require__(363)
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
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/src/components/widget/EventItem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__["@render"] = __vue_template__["@render"]
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-36d460f6"
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