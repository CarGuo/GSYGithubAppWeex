

1、关于weex.requireModule(包括插件weex-ui)中，在全局获取返回null的原因，
是因为entry.js中的router对象不能用import 和 export default，只能用require 和  module.exports 配合。

2、es6一些语法问题，可以用"babel-plugin-transform-runtime"，在.babelrc中设置
```
{
  "presets": [
    "es2015",
    "stage-0"
  ],
  "plugins": [  [
    "component",
    {
      "libraryName": "weex-ui",
      "libDir": "packages",
      "style": false
    }
  ],[
    "transform-runtime",
    {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }
  ]]
}
```

3、export default 和require混合使用的时候，会多一个default对象，比如this.$store.default.state这样才对的问题

4、自定义的js文件类中，不能使用全局的weex.requireModule

5、和tabber结合是，list必须有高度或者overflow为scroll才能滑动，而且overflow的位置必须是不会影响其他页面的

6、height 1334 和 width 750

7、list的loadmore，必须给list设置高度样式，才能在web中正常触发

8、text的</text>结束标签换行导致样式有问题

9、生命周期在web中与android等不同，比如activated等

10、()=> {}对于this可能获取存在的不同，尽量用function(){}