 loginApp.controller('loginCtrl', function($scope, $log, $cookies, $http, $location, toastr) {
     // 登录按钮点击事件
     $scope.login = function() {
         //只有通过表单空检测，才能请求api
         if ($scope.whitecheck()) {
             $scope.loginhttp();
         } else {
             toastr.error("错误", "不可为空！")
         }
         // 判断是否选中记住密码
         if ($scope.rememberuser) {
             $scope.remember();
             $log.log("进行remember");
         }
     }

     // 页面初始化
     $scope.username = $cookies.get('username');
     $scope.password = $cookies.get('password');
     $scope.pageinit = function() {
         $scope.autoinput();
         $log.log("当前页面url" + $location.absUrl());
     }

     // 账户自动填充
     $scope.autoinput = function() {
         $scope.username = $cookies.get('username');
         $scope.password = $cookies.get('password');
         //  $scope.username = localStorage.getItem('remname');
         //  $scope.password = localStorage.getItem('rempwd');
     }

     // 空检测 通过flag来标记检验通过的表单
     // 若两个表单都通过则为2，其余数字都是不通过
     $scope.whitecheck = function() {
         $log.log("进行whitecheck");
         var flag = 0;
         if (!$scope.username) {
             $scope.username_required = true;
             flag--;
         } else {
             $scope.username_required = false;
             flag++;
         }
         if (!$scope.password) {
             $scope.password_required = true;
             flag--;
         } else {
             $scope.password_required = false;
             flag++;
         }
         if (flag >= 2) {
             return true
         } else {
             return false
         }
     }

     // cookie remember功能
     $scope.remember = function() {
         //  localStorage.setItem('remname', $scope.username);
         //  localStorage.setItem('rempwd', $scope.password);
         $cookies.put('rempwd', $scope.password);
         $cookies.put('remname', $scope.username);
     }

     // 发送登录请求 
     // 成功登录的返回值为{"retCode":"0008","retInfo":"","retBody":{"AccessToken":#TOKEN}}
     $scope.loginhttp = function() {
         //  var data = '{"username": "' + $scope.username + '", "password": "' + $scope.password + '" }';
         var data = 'username=' + $scope.username + '&password=' + $scope.password;
         $log.log("即将发送的数据： " + data); //测试发送的json数据
         $http({
             method: 'post',
             url: 'http://127.0.0.1:8083/console/loginOk',
             data: data,
             headers: {
                 "content-type": "application/x-www-form-urlencoded"
             },
             withCredentials: true //!跨域带cookies
         }).then(function(data) {
             $log.log("服务器返回的状态数据： " + JSON.stringify(data));
             $log.log("登录状态码: " + data.data.retCode);
             if (data.data.retCode === "3000") {
                 var notification = new Notification(data.data.retInfo, {
                     "body": "请重新输入"
                 });
             } else if (data.data.retCode === "0008") {
                 $log.log("token:" + data.data.retBody.AccessToken);
                 localStorage.clear();
                 localStorage.setItem("username", $scope.username);
                 //  localStorage.setItem("password", $scope.password);
                 localStorage.setItem("AccessToken", data.data.retBody.AccessToken);
                 window.location.href = 'index.html#!/home';
             }
         })
     }
 })