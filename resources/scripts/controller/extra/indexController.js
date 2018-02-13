app.controller("indexCtrl", function($scope, $cookies, $http, $log) {
    $scope.username = localStorage.getItem('username');
    // 退出登录点击事件
    $scope.logout = function() {
            $scope.logouthttp();
        }
        // HTTP请求登出api
    $scope.logouthttp = function() {
        var AccessToken = localStorage.getItem("AccessToken");
        // 封装信息
        var databody = '{"Header":{"AccessToken":"' + AccessToken + '"},"Body":{}}';
        $log.log("退出信息：" + databody);
        //post请求
        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function json(response) {
            return response.json();
        }
        fetch("http://test-web.zencloud.net.cn/console/admin/logout", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: databody,
            })
            .then(status)
            .then(json)
            .then(function(data) {
                $log.log("退出登录状态码:" + data.retCode);
                if (data.retCode === "0001") {
                    localStorage.removeItem("username");
                    localStorage.removeItem("password");
                    localStorage.removeItem("AccessToken");
                    window.location.href = 'login.html';
                }
            })

    }
})