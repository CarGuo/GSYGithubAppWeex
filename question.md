

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

11、多页面打开失败之
```
android.os.FileUriExposedException
在你的Application中添加：
if (Build.VERSION.SDK_INT>=18) {
StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
StrictMode.setVmPolicy(builder.build());
builder.detectFileUriExposure();
}
```
```
ActivityNotFoundException
 <activity
                android:name=".xxxxxx"
                android:label="@string/app_name"
                android:screenOrientation="portrait"
                android:theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android:name="com.taobao.android.intent.action.WEEX"/>

                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="com.taobao.android.intent.category.WEEX"/>
                <action android:name="android.intent.action.VIEW"/>

                <data android:scheme="http"/>
                <data android:scheme="https"/>
                <data android:scheme="file"/>
                <data android:scheme="wxpage" />
            </intent-filter>
        </activity>
```

12、多页面生成js是，需要指定.vue后缀的import

13、多个entry文件生成多页面

14、如果是webstorm，记得对.temp dist node_modules platforms几个文件夹设置excluded，避免一直indexing和硬盘资源消耗

15、@viewappear="onappear"  @viewdisappear ="ondisappear" 类似onPause和onResume