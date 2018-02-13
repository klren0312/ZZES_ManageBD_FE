personCenterApp.controller("perCtrl", function($scope, $log, $http, toastr) {
    $scope.username = localStorage.getItem("username");
    $scope.ROOTURL = 'http://1270.0.0.1:8083/console'
    $scope.roleName = localStorage.getItem("roleName")

    /**
     * 
     * HTTP请求登出api
     * 从localStroage中获取AccessToken，添加到请求头中
     */
    $scope.logouthttp = function() {
        var AccessToken = localStorage.getItem("AccessToken");
        // 封装信息
        var databody = '{"Header":{"AccessToken":"' + AccessToken + '"},"Body":{}}';
        $log.log("退出信息：" + databody);
        $http({
            method: 'post',
            url: $scope.ROOTURL + '/admin/logout',
            data: databody,
            headers: { "content-type": "application/json" },
        }).then(function(data) {
            $log.log("退出登录状态码:" + data.data.retCode);
            if (data.data.retCode === "0001") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("AccessToken");
                localStorage.removeItem("roleName")
                window.location.href = 'login.html';
            }
        })
    }
})

personCenterApp.controller("changePwdController", function($scope, $log, $http, toastr) {
    $scope.savePassword = function() {
        $log.log($scope.oldPassword + "  " +
            $scope.newPassword + "  " +
            $scope.renewPassword
        );
        var AccessToken = localStorage.getItem("AccessToken")
        if ($scope.newPassword === $scope.renewPassword && $scope.oldPassword != undefined && $scope.newPassword != undefined && $scope.renewPassword != undefined) {
            //TODO:注意修改URL
            var changePwdUrl = $scope.ROOTURL + "/admin/alter"
            var databody = '{"Header":{"AccessToken":"' + AccessToken + '"},"Body":{"Password": "' + $scope.oldPassword + '","NewPwd": "' + $scope.newPassword + '"}}'
            $http({
                method: "put",
                url: changePwdUrl,
                headers: {
                    "content-type": "application/json"
                },
                data: databody
            }).then(function(req) {
                $log.log(req.data)
                if (req.data.retInfo === "success") {
                    // alert("密码更改成功！")
                    toastr.success('成功', '密码更新成功!');
                    $scope.oldPassword = ""
                    $scope.newPassword = ""
                    $scope.renewPassword = ""
                } else if (req.data.retCode === "3000") {
                    toastr.error(req.data.retInfo)
                }
            })
        } else {
            toastr.error("错误", "密码为空或不一致！")
        }
    }
})

personCenterApp.controller("personalMsgController", function($scope, $log, $http, toastr) {
    $scope.username = localStorage.getItem("username");

    var AccessToken = localStorage.getItem("AccessToken");
    $http({
        method: "get",
        url: $scope.ROOTURL + '/admin/show',
        headers: {
            "AccessToken": AccessToken
        }
    }).then(function(req) {
        $log.log(req.data.retBody)
        $scope.Name = req.data.retBody.Name
        $scope.Realname = req.data.retBody.Realname
        $scope.Phone = parseInt(req.data.retBody.Phone)
        $scope.Email = req.data.retBody.Email
        $scope.password = req.data.retBody.Password;
        $scope.time = req.data.retBody.reportTime;
    })
    $scope.save = function() {
        var databody = '{"Header":{},"Body":{"Realname": "' + $scope.Realname + '","Phone": "' + $scope.Phone + '","Email":"' + $scope.Email + '"}}'
        $http({
            method: "put",
            url: $scope.ROOTURL + "/admin/usersalter",
            headers: {
                "content-type": "application/json",
                "AccessToken": AccessToken
            },
            data: databody
        }).then(function(req) {
            $log.log(req.data)
            if (req.data.retCode === "0001") {
                toastr.success('成功', '个人信息更新成功!');
            } else if (req.data.retCode === "2003") {
                toastr.error('错误', req.data.retInfo);
            } else if (req.data.retCode === "1000") {
                toastr.error('错误', req.data.retInfo);
            }
        })
    }
})