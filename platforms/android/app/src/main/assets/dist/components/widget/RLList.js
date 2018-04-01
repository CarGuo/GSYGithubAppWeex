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
/******/ 	return __webpack_require__(__webpack_require__.s = 478);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
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

/***/ 367:
/***/ (function(module, exports) {

module.exports = {
  "loading": {
    "marginTop": "20",
    "width": "750",
    "display": "flex",
    "MsFlexAlign": "center",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "alignItems": "center"
  },
  "refresh": {
    "width": "750",
    "height": "200",
    "display": "flex",
    "MsFlexAlign": "center",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "alignItems": "center"
  },
  "indicator-text": {
    "color": "#888888",
    "fontSize": "42",
    "textAlign": "center"
  },
  "indicator": {
    "marginTop": "16",
    "height": "40",
    "width": "40",
    "color": "#0000FF"
  },
  "indicator-loadmore": {
    "marginTop": "16",
    "height": "40",
    "width": "40",
    "color": "#0000FF"
  },
  "header": {
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "panel": {
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "marginTop": "30"
  },
  "list": {
    "height": "1334"
  }
}

/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constant = __webpack_require__(2);

var Constant = _interopRequireWildcard(_constant);

var _EventItem = __webpack_require__(369);

var _EventItem2 = _interopRequireDefault(_EventItem);

var _RepositoryItem = __webpack_require__(495);

var _RepositoryItem2 = _interopRequireDefault(_RepositoryItem);

var _RepositoryHeadItem = __webpack_require__(496);

var _RepositoryHeadItem2 = _interopRequireDefault(_RepositoryHeadItem);

var _IssueItem = __webpack_require__(497);

var _IssueItem2 = _interopRequireDefault(_IssueItem);

var _UserHeadItem = __webpack_require__(370);

var _UserHeadItem2 = _interopRequireDefault(_UserHeadItem);

var _FileItem = __webpack_require__(498);

var _FileItem2 = _interopRequireDefault(_FileItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

Vue.component('EventItem', _EventItem2.default); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

Vue.component('RepositoryItem', _RepositoryItem2.default);
Vue.component('UserHeadItem', _UserHeadItem2.default);
Vue.component('RepositoryHeadItem', _RepositoryHeadItem2.default);
Vue.component('IssueItem', _IssueItem2.default);
Vue.component('FileItem', _FileItem2.default);

exports.default = {
    props: {
        listItemName: { type: String },
        forRefresh: { type: Function },
        forLoadMore: { type: Function },
        itemClick: { type: Function },
        headerClick: { type: Function },
        listData: { type: Array },
        headerComponent: { type: String },
        headerData: { type: Object },
        bottomEmpty: { type: String, default: ' 200px' }
    },
    data: function data() {
        return {
            refreshing: false,
            loadinging: false,
            needRefresh: true,
            needLoadMore: true
        };
    },

    computed: {
        dataList: function dataList() {
            return this.listData;
        },
        refreshDisplay: function refreshDisplay() {
            var display = this.refreshing === true && this.needRefresh === true ? 'show' : 'hide';
            return display;
        },
        loadingDisplay: function loadingDisplay() {
            var display = this.loadinging === true && this.needLoadMore === true ? {
                height: '200px',
                overflow: 'hidden'
            } : { height: '1px', overflow: 'hidden' };
            return display;
        }
    },
    methods: {
        loadMore: function loadMore() {
            var _this = this;

            if (this.refreshing || this.loadinging) {
                return;
            }
            if (this.needLoadMore === false) {
                return;
            }

            this.loadinging = true;
            setTimeout(function () {
                _this.forLoadMore && _this.forLoadMore();
            }, 300);
        },
        onRefresh: function onRefresh() {
            var _this2 = this;

            if (this.refreshing || this.loadinging) {
                return;
            }
            if (this.needRefresh === false) {
                return;
            }
            this.refreshing = true;
            setTimeout(function () {
                _this2.forRefresh && _this2.forRefresh();
            }, 300);
        },
        showRefresh: function showRefresh() {
            this.refreshing = true;
        },
        stopLoadMore: function stopLoadMore() {
            this.loadinging = false;
        },
        stopRefresh: function stopRefresh() {
            this.refreshing = false;
        },
        setNeedLoadMore: function setNeedLoadMore() {
            this.needLoadMore = true;
        },
        setNeedRefresh: function setNeedRefresh() {
            this.needRefresh = true;
        },
        setNotNeedLoadMore: function setNotNeedLoadMore() {
            this.needLoadMore = false;
        },
        setNotNeedRefresh: function setNotNeedRefresh() {
            this.needRefresh = false;
        }
    }
};

/***/ }),

/***/ 369:
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


/***/ }),

/***/ 370:
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


/***/ }),

/***/ 371:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list', {
    staticClass: ["list"],
    attrs: {
      "loadmoreoffset": "30"
    },
    on: {
      "loadmore": _vm.loadMore,
      "onloadmore": _vm.loadMore
    }
  }, [_c('refresh', {
    staticClass: ["refresh"],
    attrs: {
      "display": _vm.refreshDisplay
    },
    on: {
      "refresh": _vm.onRefresh
    }
  }, [_c('text', {
    staticClass: ["indicator-text"]
  }, [_vm._v("Refreshing ...")]), _c('loading-indicator', {
    staticClass: ["indicator"]
  })]), _c('cell', {
    staticClass: ["header"],
    appendAsTree: true,
    attrs: {
      "vIf": _vm.headerComponent,
      "append": "tree"
    }
  }, [_c(_vm.headerComponent, {
    tag: "component",
    attrs: {
      "onItemClick": _vm.headerClick,
      "itemValue": _vm.headerData
    }
  })], 1), _vm._l((_vm.dataList), function(rowData, index) {
    return _c('cell', {
      staticClass: ["cell"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('div', {
      staticClass: ["panel"]
    }, [_c(_vm.listItemName, {
      tag: "component",
      attrs: {
        "onItemClick": _vm.itemClick,
        "itemValue": rowData,
        "itemIndex": index
      }
    })], 1)])
  }), _c('cell', {
    staticClass: ["loading"],
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    style: _vm.loadingDisplay
  }, [_c('text', {
    staticClass: ["indicator-text"]
  }, [_vm._v("Loading ...")]), _c('loading-indicator', {
    staticClass: ["indicator-loadmore"]
  })])]), _c('cell', {
    style: {
      height: _vm.bottomEmpty
    },
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    style: {
      height: _vm.bottomEmpty
    }
  })])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

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

/***/ }),

/***/ 474:
/***/ (function(module, exports) {

module.exports = {
  "user-icon": {
    "width": "70",
    "height": "70",
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
    "marginBottom": "15"
  },
  "user-text": {
    "color": "rgba(60,63,65,1)",
    "fontSize": "30",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 3,
    "fontWeight": "bold",
    "WebkitBoxOrient": "vertical"
  },
  "content-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "26",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "marginTop": "15",
    "WebkitLineClamp": 3,
    "WebkitBoxOrient": "vertical"
  },
  "time-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "25",
    "fontFamily": "'wxcIconFont'",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 2,
    "WebkitBoxOrient": "vertical",
    "marginTop": "5"
  },
  "state-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "28",
    "fontFamily": "'wxcIconFont'",
    "display": "-webkit-box",
    "overflow": "hidden",
    "marginLeft": "90",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 2,
    "WebkitBoxOrient": "vertical"
  },
  "comment-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "24",
    "flex": 1,
    "fontFamily": "'wxcIconFont'",
    "display": "-webkit-box",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 2,
    "WebkitBoxOrient": "vertical"
  },
  "number-text": {
    "color": "rgba(97,97,97,0.6)",
    "fontSize": "24",
    "fontFamily": "'wxcIconFont'",
    "display": "-webkit-box",
    "marginLeft": "10",
    "overflow": "hidden",
    "whiteSpace": "normal !important",
    "textOverflow": "ellipsis",
    "wordWrap": "break-word",
    "WebkitLineClamp": 2,
    "WebkitBoxOrient": "vertical"
  }
}

/***/ }),

/***/ 475:
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

var dom = weex.requireModule('dom');
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
        onCardClick: function onCardClick(itemIndex) {
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

/***/ 476:
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
    staticClass: ["user-text"]
  }, [_vm._v("\n                " + _vm._s(_vm.itemValue.ex.userName))]), _c('text', {
    staticClass: ["content-text"]
  }, [_vm._v(_vm._s(_vm.itemValue.ex.content))])]), _c('text', {
    staticClass: ["time-text"]
  }, [_vm._v(_vm._s(_vm._f("resolveTime")(_vm.itemValue.ex.time)))])]), _c('div', {
    staticStyle: {
      flexDirection: "row",
      width: "650px",
      overflow: "hidden",
      alignItems: "center"
    }
  }, [_c('text', {
    staticClass: ["state-text"],
    style: _vm.itemValue.ex.state === 'open' ? {
      'color': 'green'
    } : {
      'color': 'red'
    }
  }, [_vm._v(_vm._s('\ue661 '))]), _c('text', {
    staticClass: ["number-text"]
  }, [_vm._v(_vm._s('  #' + _vm.itemValue.ex.number))]), _c('text', {
    staticClass: ["comment-text"]
  }, [_vm._v(_vm._s('\ue6ba ' + _vm.itemValue.ex.count))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(367)
)

/* script */
__vue_exports__ = __webpack_require__(368)

/* template */
var __vue_template__ = __webpack_require__(371)
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
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/src/components/widget/RLList.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-155fa5ff"
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

/***/ }),

/***/ 495:
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


/***/ }),

/***/ 496:
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


/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(474)
)

/* script */
__vue_exports__ = __webpack_require__(475)

/* template */
var __vue_template__ = __webpack_require__(476)
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
__vue_options__.__file = "/Users/guoshuyu/workspace/weex/GSYGithubApp-Weex/src/components/widget/IssueItem.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-07662f96"
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

/***/ 498:
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


/***/ })

/******/ });