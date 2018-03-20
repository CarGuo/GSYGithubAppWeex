import Vue from 'vue'
import weex from 'weex-vue-render'

weex.init(Vue)

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except entry.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!entry(\.js)?$)/)
srcContext.keys().forEach(srcContext)
