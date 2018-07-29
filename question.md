
* 1、关于weex.requireModule(包括插件weex-ui)中，在全局获取返回null的原因，
是因为entry.js中的router对象,不能用import 和 export default，只能用require 和 module.exports 配合。

* 2、es6一些语法问题，如async和await，可以用"babel-plugin-transform-runtime"，在.babelrc中设置。

```
{
  "presets": [
    "es2015",
    "stage-0"
  ],
  "plugins": [ [
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

* 3、export default 和require混合使用的时候，会多一个default对象，比如this.$store.default.state这样才对的问题。

* 4、自定义的js文件类中，不能使用全局的weex.requireModule。

* 5、和weex-ui的tabbar结合，list必须有高度，或者overflow为scroll才能滑动，而且overflow的位置必须是不会影响其他页面的。

* 6、全屏默认height 1334 和 width 750，但是记得减去32大概高度的statusbar。

* 7、list的loadmore，必须给list设置高度样式，才能在web中正常触发。

* 8、text的</text>结束标签换行，在debug下可能会出现样式问题。

* 9、生命周期在web中与android等不同，比如activated等。

* 10、()=> {}对于this可能获取存在的不同，尽量用function(){}。

* 11、多页即创建多个类似entry.js的入口文件，在webpack下配置weex的打开生成文件，用于navigator跳转，通过url传值。

* 12、android多页面打开失败

android.os.FileUriExposedException问题：

```
在你的Application中添加：
if (Build.VERSION.SDK_INT>=18) {
StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
StrictMode.setVmPolicy(builder.build());
builder.detectFileUriExposure();
}
```

ActivityNotFoundException问题：

```
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

* 13、多页面生成js是，需要指定.vue后缀的import

* 14、如果是webstorm，记得对.temp dist node_modules platforms几个文件夹，右键设置excluded，避免一直indexing和硬盘资源消耗。

* 15、@viewappear="onappear"  @viewdisappear ="ondisappear" 类似onPause和onResume

* 16、ios看log，可以先增加

```
-(void)redirectConsoleLog{
#ifdef DEBUG
    NSString *documentDir = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0];
    NSLog(@"documentPath : %@",documentDir);

    //重定向NSLog
    NSString* logPath = [documentDir stringByAppendingPathComponent:@"console.log"];
    freopen([logPath fileSystemRepresentation], "a+", stderr);
#endif
}
```

```
//调用
[self redirectConsoleLog];
```

然后在Devices下，找到对应的模拟器号码，在再Application下，搜索console.log，跟踪

```
tail -f
/Users/your name/Library/Developer/CoreSimulator/Devices/FDEACA11-D84E-4E8F-A6B8-26239559A928/data/Containers/Data/Application/9394D6CC-6B4A-4200-A13D-0CBE6F2BB67A/Documents/console.log
```

* 17、ios的坐标点是从状态栏（其实是导航栏，但是导航栏没用的话）开始算的，所以多页面下的需要有marginTop：一般32，如果是iPhoneX的话，还需要多44高度。

* 18、目前官方0.19.0系列的tag使用还有问题。