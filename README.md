# 互联通子系统：管理后台前端

--- 

# 一、开发环境
## 1.开发工具

 - Visual Studio Code(编辑器)
 - Gulp(打包工具)


## 2.使用到的第三方库

CSS库：
 - bootstrap 3.3.5
 - BootSideMenu 侧边栏
 - font-awesome 字符

JavaScript库：
 - Angularjs 1.6.5
  - Angular-ui-router 路由库
  - Angular-cookies cookie操作
  - Angular-animate 动画
  - Angular-toastr 弹框提示
 - jQuery 3.2.1
  - jquery.daterangepicker 日历组件
 - Bootstrap 3.3.5
 - BootSideMenu 侧边栏
 - JsonExportExcel json转EXCEL
 - ECharts 图表

## 3.Gulp 安装与使用
### 1）安装NodeJS
访问http://nodejs.cn/下载

### 2）安装cnpm
>[淘宝npm镜像](https://npm.taobao.org/)

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 3）全局安装gulp
```shell
cnpm install -g gulp
```

### 4）在项目里安装好gulp相关包
>相关包可以查看 `package.json` 文件

在项目内进行下面的命令,即可将项目中使用到的依赖包安装
```shell
cnpm install
```

### 5）gulp配置
>具体配置可以查看 `gulpfile.js` 文件

### 6）使用gulp
>执行gulp任务 一般格式 `gulp 任务名`

在文件中可以看到
```javascript
gulp.task('default', ['browserSync', 'watch', 'devidewatch'])
```

`default`意思就是默认的任务，运行时可以直接项目下执行以下命令，即可
默认的任务，实现的是controller文件的融合，以及文件修改监测与浏览器自动刷新
```shell
gulp
```

# 二、项目整体

 - 根据查看`resources/scripts/app`中的文件，可以看到分为四个主页面：登录，找回密码，主页，个人中心
 - css样式基本对应当前页面都会在`resources/mystyle`有对应的css，如果找不到可以使用浏览器开发者工具找到对应的。


## 1.目录记录 
```
├── file                        axure导出页面的css
├── childPage                   分页面
    |—— dataEquAnalysis         设备分析分页
    |—— dataUserAnalysis        用户分析分页
    |—— equipmentDetails        设备详情分页      
    |—— findPwd                 找回密码分页      
    |—— userDetails             用户详情分页 
    |—— platformAudit           平台审核分页 
├── images                      各个页面所用的图片
├── resources                   js，css，字体，图片
    |—— mystyle                 自己的css
    |—— datepicker              日期组件
    |—— toastr                  angular 弹窗组件      
    |—— script                  自己的js
       |—— app                  angular 初始化
       |—— controller           angular 控制器 
       |—— router               angular 路由
       |—— filter               angular 过滤器
       |—— myecharts            angular echarts 图表组件
       |—— service              angular 服务
├── package.json                npm配置  
├── gulpfile.js                 gulp配置
├── login.html                  登录页面
├── index.html                  根页面
├── personCenter.html           用户中心
├── personalMsg.html            用户信息
├── changePwd.html              修改密码
├── home.html                   主页
├── personManage.html           用户管理
├── userDetails.html            用户详情
├── sceneManage.html            场景管理
├── sceneDetails.html           场景详情
├── addScene.html               添加场景
├── equipmentManage.html        设备管理
├── equipmentDetails.html       设备详情
├── equipmentMap.html           设备地图
├── faultRecord.html            故障记录
├── feedback.html               意见反馈
├── msgManage.html              消息管理
├── msgDetails.html             消息详情
├── roleManage.html             角色管理
├── createRole.html             创建角色
├── roleDetails.html            角色详情
├── memberManage.html           成员管理
├── createMember.html           创建成员
├── memberDetails.html          成员详情
├── dataUseSurvey.html          数据分析-使用概况
├── dataEquAnalysis.html        数据分析-设备分析
├── dataUserAnalysis.html       数据分析-用户分析
├── platformAudi.html           平台审核
├── createPlatform.html         创建平台
├── platformDetails.html        未审核平台详情
├── hasPlatformDetails.html     已审核平台详情
禹翔测试相关页面
├──test-lyx-e.html
├──test-lyx-e1.html
├──test-lyx-e2.html
├──test-lyx-e3.html
├──test-lyx-e4.html
├──test-lyx-login.html
├──test-lyx2.html
├──itDetail.html
```

## 2.Angular相关

 - 控制器大部分命名都是以`页面名+controller`
 - 路由二级路由都放在了对应的一级路由的下面,具体查看`resources/scripts/router/indexRouters.js`
 - $scope变量，$log日志打印，$http网络请求，$state路由，$stateParam路由传参等等
 - angular-ui-router需要在app中引入，可查看`resources/scripts/app/indexAngularController.js`

## 3.场景相关逻辑
### 1）场景添加页面
>场景添加，是分开添加的，先新建场景名称，保存一下，返回场景id；然后新建规则组，保存一下，返回规则组id；然后新建规则，新建动作。


 - 保存场景名称后，自动隐藏了保存场景按钮
 - 由于之前的显示都是直接请求场景详情来进行显示的，所以新建及保存，但是之后再加个保存场景并返回，也只是提升体验

### 2）场景详情

 - 场景详情中添加规则组，规则和动作逻辑也是一样的

### 3）场景各设备属性显示形式

 - bool 单选框形式
 - enum 下拉框形式
 - int/float 比较符号+数字+备注形式


### 4）场景比较符号对照

 - 00 为 ≠
 - 01 为 ＝
 - 02 为 ＞
 - 03 为 ＜
 - 04 为 ≥
 - 05 为 ≤


## 2.登录相关
### 1）登录
登录后，会获取到AccessToken，将其存入localStorage中
```javascript
localStorage.setItem("AccessToken","yourtoken")
```

### 2）登录判断
如果没有登录，访问其他页面，会出现登录提示弹窗，并重定向到登录界面

# 三、代码片段
## 1.angular初始化
```javascript
var app = angular.module("ng-app中的名称", ['引入的一些服务']);
```

## 2.angular controller控制器
```javascript
app.controller("ng-controller中的名称", function(用到的一些功能) {}
```

## 3.angular filter过滤器
```javascript
app.filter('外部使用需要的名称', function() {
    return function(过滤的东西) {
        ......
        return 过滤后的东西
    }
})
```
使用方式，直接html中用
{{变量 | 过滤器里设置的名称}


## 4.HTTP请求api
1）主url放在了根页面的控制器
```javascript
$scope.ROOTURL = "http://192.168.1.228:8083/console"
```

2）请求基本结构
```javascript
$http({
      method:"请求方式",
      url:"请求url",
      headers:{
            请求头
      },
      data:"请求body"
}).then(function(req){
    $log.log(req.data) //后台返回的参数 
})
```

3）跨域带cookie请求
```javascript
$http({
      method:"请求方式",
      url:"请求url",
      headers:{
            请求头
      },
      data:"请求body",
      withCredentials:true //!注意此处，用于跨域带cookie请求
}).then(function(req){
    $log.log(req.data) //后台返回的参数 
})
```

## 5.路由
基本结构
```javascript
.state("路由名", {
    url: "路由url/:带参名",
    templateUrl: "页面名.html",
})
```

在html中调用
```html
<a ui-sref="路由名" >路由访问</a>
```

## 6.双向绑定变量在html中的使用
需要使用`$scope.变量名`

html中使用
{{变量名}}

## 7.Angularjs单选框相关
http://www.jianshu.com/p/8d644980ef96

## 8.Angularjs下拉框联动
http://www.jianshu.com/p/6029829137bb
http://www.jianshu.com/p/fd6b5ccfde3

## 9.分列导出EXCEL（使用json）
paramFilter即为需要导出的列的数组
```javascript
$scope.exportExcel = function(paramFilter) {
      var option = {}
      option.fileName = '设备列表' //导出文件名
      option.datas = [{
          sheetData: $scope.personinfos, //json数据
          sheetName: 'sheet', 
          sheetFilter: paramFilter, //json中的键名，可以选择导出的项目
          sheetHeader: paramFilter, //导出表的表头标题
      }]
      var toExcel = new ExportJsonExcel(option);
      toExcel.saveExcel();
}
```

## 10.高德地图
1）引入js sdk
```html
<script src="http://webapi.amap.com/maps?v=1.3&key=申请自己的高德地图web端key"></script>
<script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>
```

2）初始化
```html
<div id="container"></div>
```
```javascript
var map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: 30,
    center: [118.303072, 32.222022]
});
```

3）增加点标记
根据坐标添加点标记
```javascript
marker = new AMap.Marker({
    icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    position: [118.303072, 32.222022]
});
marker.setMap(map);
```

## 11.数组转对象
将数组转换为对象，可以根据特征值来获取相应的值，比如发现数组中的id使唯一的特征值，则将`paramobj[v.id] = v`即可，然后就可以用`对象名[特征值]`的形式来获取相应的值了
```javascript
function arrToObject(arr) {
    var paramobj = {};
    arr.forEach(function(v, i) {
      paramobj[v.特征值] = v;
    })
    return paramobj
}
```

## 12.ECharts图表
1）使用directive来构建图表组件
下面有些可能理解有错，directive具体说明可以去官方文档（https://docs.segmentfault.com/angularjs~1.6/guide/directive）

2）例如启动次数图表
>其中的`startTime`名称是要再外面调用的需要使用小写+大写形式

```javascript
 app.directive('startTime', function() {
```

3）`restrict`属性，决定再外部调用这个directive的方式
例如
```javascript
restrict:'E'
```
意思就是直接标签调用
其他的属性可以查看

 - 'A' - 只能用属性名调用
 - 'E' - 只能用标签名调用
 - 'C' - 只能用class类名调用
 - 'M' - 只能用注释调用

可以将介个属性联合使用你:

 - 'AEC' - 可以使用属性名，标签名和class类名调用

4）在`scope`属性中，设置需要外部传值的变量
```javascript
scope: {
    id: "@",
    legend: "=",
    date: "=",
    everyday: "=",
    difference: "="
}
```

5）外部调用
```html
<start-time id="startTime" date="date" everyday="everyday" difference="difference" ng-if="startFlag&&date"></start-time>
```

6）`template`属性
设置directive的组件
```javascript
template: '<div class="start-time-charts"></div>'
```

7）`link`属性

1. `scope` Angular 的 scope 对象
2. `element` 是这个directive指令匹配的 jqLite-wrapped 元素（jqLite是Angularjs官方用来代替jQuery的方案，虽然我还是用jQuery）
3. `attr` 是一个键值对hash对象，就是这个directive上的所有属性。比如
```html
<start-time id="startTime" date="date" everyday="everyday" difference="difference" ng-if="startFlag&&date"></start-time>
```
那么attr就是
```javascript
{
    id:'startTime',
    date:'date',
    everyday:'everyday',
    difference:'difference',
    ng-if:'startFlag&&date'
}
```

6）由于图表数据需要请求，所以是异步加载，如果不进行相关操作的话，页面加载时，图表是不会绘制的，因为数据没获取到
所以要使用`ng-if`来判断数据是否获取，如果获取到才加载图表

7）监听数据变化，并刷新
```javascript
$scope.$watch('joindata', function(newData, oldData) {
    $scope.joindata = newData
    myChart.setOption({
        xAxis: [{
            type: 'category',
            data: $scope.joindata.timestamp,
            axisTick: {
                alignWithLabel: true
            }
        }],
        series: [{
            name: '接入设备',
            type: 'bar',
            barWidth: '60%',
            data: $scope.joindata.joinDevice
        }, {
            name: '环比',
            type: 'line',
            barWidth: '60%',
            yAxisIndex: 1,
            data: $scope.joindata.joinDeviceRatio
        }]
    });
});
```

# 四、后台接口
## 1.文档
https://www.showdoc.cc/home/item/show/item_id/1630968

## 2.接口测试工具
`postman`

## 3.后台代码
https://gitlab.gizwits.com/zc_y2y/zencloud-admin-console-j2ee

## 4.打包方法
>因为test容易报错，所以打包的时候用这个命令可以跳过test进行打包

```
mvn clean install -Dmaven.test.skip=true
```

# 五、部署方法
## 1.安装nginx
安装步骤：https://www.jianshu.com/p/1a92ad1586ef
## 2.直接把项目放到`/usr/local/nginx/html/`中
## 3.运行nginx
```
$ /usr/local/nginx/sbin/nginx
```
## 4.直接访问ip即可看到页面 
> username:zzes123,password:zzes123

## 5.nginx相关
```
$ nginx -s stop //stop nginx
$ nginx -t //test nginx config file
$ nginx -s reload //restart nginx
```

---
# 五、ChangeLog

### `2017/7/17` 登录页面的修改，增加了Angularjs的cookies功能，增加了登录表单空检验功能，增加了请求后台登录api功能。首页的侧边导航，可以收缩。
>遇到问题：1. cookie在火狐中可以通过日志一些方式显现，但是在开发者工具中无法查看到cookie。在chrome中获取不到任何数据。
2.bootstrap导航下拉列表中，使用了bootstarp的样式，自动生成了一个箭头，但是无法布局，导致错位


### `2017/7/18` 因为要使用angularjs的路由功能，所以单独把侧边栏和上导航栏分离出来，放到一个公共页面中。将使用过的一些页面名称，文件夹名称改成英文，其他为了防止错乱，暂时不修改。
>知识：1.加载固定内容的脚本，可以前置到文档头部。浏览器的dom按读取到标签顺序解析并执行，所以脚本引用前置使其尽早加载，有加速效果（尤其浏览器首次打开网页，且网页内容较大或者网速不佳时）


### `2017/7/19` 进行首页图表绘制，将angular初始化，控制器，路由，directive组件都分离了出来，防止代码过于冗长。
>遇到问题：1.跨域问题，尝试方法

 - 1）jsonp（post无法进行请求），
 - 2）fetch post失败
 - 3）postMessage post没成功
 - 4）服务端配置跨域


### `2017/7/20` 进行首页修正，个人中心页面，退出功能，用户管理页面（未完成），研究angularjs通过table导出excel的功能。
>遇到问题：1.子路由，暂时还没看，但是看到用户管理页面进入详情页面后，由很多页面的切换，应该要使用子路由
开发分工：https://shimo.im/sheet/8kTMUlCYKQMj2ZNJ/

### `2017/7/21` 进行用户管理页面开发，先可以将列表全部导出成excel，但是无法指定。解决了Angular内置$http请求接口，并将登录请求从fetch改成内置的，这样可以提高兼容性。由于看到用户详情页面需要使用子路由，查阅资料，angular1路由无法满足，于是改用angular-ui-router库来处理，该库可以使用嵌套路由。
>遇到问题：1.ui-router带参传递
2.嵌套子路由的编写
3.excel的指定导出

### `2017/7/22` 修改侧边栏的下拉icon图标，原来图表是在左边，现在改成右边，和设计是一致的了。

### `2017/7/23` 忘记密码页面的制作
>遇到问题：1.功能暂时无法实现

### `2017/7/24` 用户详情分页面开发，使用嵌套路由，以及bootstrap的tab标签页.场景管理页面开发,加入未登录提示和跳转到登录页面功能。
>遇到问题：1.ui-router嵌套路由好像无法嵌套三层
2.使用bootstrap的tab标签页，会于默认路由冲突，于是删除了默认路由，这样刚进首页，会是空白，然后需要点击左边导航相应项，才能进入相应页面。
问题解决：1.解决`问题2`，通过设置登录跳转路径`index.html`=>`index.html#!/home`

### `2017/7/24` 场景管理页面，场景详情页面，场景添加页面，设备地图页面，故障记录页面，意见反馈页面，信息管理页面，信息查看页面。
>遇到问题：1.担心后面请求api后数据之间逻辑出问题

### `2017/7/26` 角色管理，角色详情，创建角色，成员管理，成员详情，创建成员
>知识：树状图的制作，使用的jquery插件jtree

### `2017/7/27` 使用概况，设备分析，用户分析
>遇到问题：1.使用概况页面中的热点图，不知道如何制作，使用定位总是会偏移

### `2017/7/28` 页面基本完成
>修改：1.将记住密码的方式从cookie改成localstorage

### `2017/7/29` 使用gulp打包js
>遇到问题：1.无法使用uglify，报错

### `2017/7/31` gulp进行控制器和图表js的打包，自动监视js，css，html，如有更新就自动给刷新浏览器。进行分页功能的编写，实现设备列表的分页显示
>遇到问题：无法将uglify2集成到gulp里面

### `2017/8/4` 将接口传来的时间戳，使用`new Date(时间戳).toLocaleString()`来解析成正常的时间格式
>遇到问题：树形图相关操作

### `2017/8/7` 进行角色接口和成员接口的对接

### `2017/8/8` 完成权限相关接口的对接，增，删，改，查以及权限树形图的功能实现,完成当前使用到页面的分页功能添加。
>问题解决：1.不再使用第三方jstree库，使用checkbox来代替实现
遇到问题：可能样式无法实现完美

### `2017/8/9` 将一些公用的方法和变量提取出来，例如url，分页函数，excel导出函数。将登录界面重写，原本的界面不是在页面中间。用户列表，成员列表以及权限选择的全选功能实现。
>遇到问题：1.尝试使用gulp对css文件进行压缩，但是样式之间出现冲突，放弃。

### `2017/8/10` 修改相关页面错误，增加第三方日历组件
>遇到问题：1.input date属性的组件只能在chrome下使用，在firefox下没有选择功能
问题解决：input的date只能在chrome中有效，在firefox中无效，所以只能引入第三方日历组件

### `2017/8/16` 测试下拉框联动和单选框动态显示
>遇到问题：1.不知颠倒后台的数据格式，暂时只能按照自己想法来写

### `2017/8/21` 更改场景修改和场景添加的弹框
>遇到问题：1.由于有多种联动，等数据格式出来再看如何实现
 
### `2017/8/25` 对接场景接口，实现场景列表，场景详情，场景添加框的联动显示，以及选择默认设置
>解决问题：场景列表和场景详情的json数据放在一起，使用数组转对象，解决了问题
```javascript
function arrToObject(arr) {
      var paramobj = {};
      arr.forEach(function(v, i) {
            paramobj[v.id] = v;
      })
      return paramobj
}
```

### `2017/8/28` 修改一些页面的按钮点击后样式，修改场景详情对接api
>遇到问题：1.场景添加页面，添加到表格，有bug，无法将枚举数据跟新到表格

### `2017/8/29` 修改场景添加页面的添加到表格bug,对接删除接口
>遇到问题：1.由于场景详情页面的数据过于复杂，暂时不是的如何添加到表格
2.场景列表上的删除，会出现弹框，而弹框在变量作用域之外，所以无法获取到场景id，暂时不知如何解决

### `2017/8/30` 模态框传值，然后删除场景。对接平台管理接口

### `2017/8/31` 对接平台列表接口，创建平台接口，平台详情接口

### `2017/9/1`  修改反馈页面，更改场景增加页面逻辑
>解决问题：1.directive遇到问题：`Error: [$compile:tplrt] Template for directive 'editScene' must have exactly one root element.`，将replace改为false后解决

### `2017/9/4` 修改场景详情和场景增加页面的规则组添加功能，等待接口。修改设备详情中时间的解析，改为过滤器解析时间

### `2017/9/5` 修改场景删除的bug，由于接口改变导致的删除动作现在使用的是动作.修改相关页面的ui.以及在线状态，连接类型的过滤器

### `2017/9/6` 修改左侧导航的样式

### `2017/9/7` 场景添加相关功能基本对接完成。

### `2017/9/8` 场景添加，成功后显示添加规则组按钮。修改场景添加和场景详情的数据表格形式。场景接口对接完成
>遇到问题：1.动作添加接口的delay字段是干嘛的？
解决问题：1.delay是预留的

### `2017/9/11` 场景相关页面和逻辑的修改，平台审核页面的修改，其他页面修改

### `2017/9/12` 平台审核页面修改，以及对接未审核和已审核平台的接口。

### `2017/9/13` 设备日志相关

### `2017/9/14` 修改相关页面样式，等待接口 

### `2017/9/15` 对接设备日志接口

### `2017/9/18` 设备运行图表样式修改

### `2017/9/20` 对接设备详情里的运行分析接口；对接平台审核的审核，禁用和启用接口

### `2017/9/22` 完成纯前端分选项导出EXCEL功能

### `2017/9/26` 文档完善,场景添加按钮隐藏，名称保存之后，把保存场景按钮隐藏 ，并增加保存并退出按钮（其实就是返回的按钮）

### `2017/9/28` 登录接口对接

### `2017/9/29` 对接密码更改接口，验证码获取和验证码校验接口
>解决问题：ajax带cookie请求

### `2017/9/30` 完成获取短信验证码，校验短信验证码，更改密码接口的对接
>解决问题：还是跨域，获取图片验证码和校验验证码的域名要一致，比如localhost和127.0.0.1就是不一样的，会报错

### `2017/10/16` 完成用户列表的更新，完成用户基本信息的更新，修改第三方平台账户为固定值，用户场景显示，用户关联设备

### `2017/10/17` 场景中添加条件和动作中，int，float属性值的操作，使用`type="range"`

### `2017/10/18` 修改运行分析图表显示,首页图表显示
>解决问题：图表和请求的数据是异步的，导致图表加载完毕，数据还没获取到，所以我将数据放到一个对象里面，然后使用ng-if来判断，若有数据则显示图表

### `2017/10/19` 对接使用概况中的数据接口
>解决问题：1）select切换事件，图表切换。使用$scope.$watch来动态监听。之前没使用，导致切换数值不变
2）进度条功能，使用`ng-style="{width:x.num+'%'}"`,来操作css

### `2017/10/23` 对接设备分析接口,对接用户分析接口
>解决问题：1）点击选项就请求，先设定一个默认的值，随后如果选择城市 ，则改变城市的值进行请求。

### `2017/10/24` 售后反馈假数据

### `2017/10/27` js加载优化

### `2017/11/03` 修改服务器地址

### `2017/12/26` 部署方法

### `2018/1/12` 对接验证码生成列表，验证码生成接口

### `2018/1/16` 对接验证码删除接口