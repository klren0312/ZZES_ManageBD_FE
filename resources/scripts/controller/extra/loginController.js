 loginApp.controller('loginCtrl', function($scope, $log, $http, $location) {
     // 登录按钮点击事件
     $scope.login = function() {
             //只有通过表单空检测，才能请求api
             if ($scope.whitecheck()) {
                 $scope.loginhttp();
             }
             // 判断是否选中记住密码
             if ($scope.rememberuser) {
                 $scope.remember();
                 $log.log("进行remember");
             }
         }
         // 页面初始化
     $scope.pageinit = function() {
             $log.log($cookies.get("loginflag"));
             $scope.autoinput();
             $log.log("当前页面url" + $location.absUrl());
         }
         // 账户自动填充
     $scope.autoinput = function() {
             // $cookies.put('username', "klren");
             // $cookies.put('password', "zzes");
             $scope.username = $cookies.get('username');
             $scope.password = $cookies.get('password');
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
                 return true;
             } else {
                 false
             }
         }
         // cookie remember功能
     $scope.remember = function() {
             $cookies.put('username', $scope.username);
             $cookies.put('password', $scope.password);

         }
         // 发送登录请求 
         // 成功登录的返回值为{"retCode":"0008","retInfo":"","retBody":{"AccessToken":#TOKEN}}
     $scope.loginhttp = function() {
         //封装信息
         var data = '{"Name": "' + $scope.username + '", "Password": "' + $scope.password + '" }';
         $log.log("即将发送的数据： " + data); //测试发送的json数据

         function status(response) {
             if (response.status >= 200 && response.status < 300) {
                 return Promise.resolve(response);
             } else {
                 return Promise.reject(new Error(response.statusText));
             }
         }

         function json(response) {
             return response.json();
         }
         // post请求 
         fetch("http://test-web.zencloud.net.cn/console/admin/login", {
                 method: 'post',
                 body: data,
                 headers: {
                     "Content-Type": "application/json"
                 }
             })
             .then(status)
             .then(json)
             .then(function(data) {
                 $log.log("服务器返回的状态数据： " + JSON.stringify(data));
                 $log.log("登录状态码: " + data.retCode);
                 $log.log("token:" + data.retBody.AccessToken);
                 if (data.retCode === "0008") {
                     // $cookies.put("loginflag", "ok"); //将登陆flag标志存入cookie
                     // $cookies.put("AccessToken", data.retBody.token); //将token存入cookie
                     // alert("登陆成功！！！");
                     localStorage.clear();
                     localStorage.setItem("username", $scope.username);
                     localStorage.setItem("password", $scope.password);
                     localStorage.setItem("AccessToken", data.retBody.AccessToken);
                     window.location.href = 'index.html';
                 } else {
                     alert(data.data.retInfo);
                 }
             })
     }
 })