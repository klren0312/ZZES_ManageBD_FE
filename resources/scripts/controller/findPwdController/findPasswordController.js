findApp.controller("findCtrl", function($scope, $log, $state, toastr, $http) {
 
    $scope.ROOTURL = 'http://127.0.0.1:8083/console'
    if (undefined === $scope.username) {
        $scope.username = "未知用户";
    }

    // $scope.firstnext = function() {
    //     $log.log($scope.finduser);
    //     $state.go("page2");
    // }

    // $scope.secondnext = function() {
    //     $state.go("page3");
    // }     

    // $scope.thirdnext = function() {
    //     $state.go("page4");
    // }

})

findApp.controller("findPage1Controller", function($scope, $log, $state, $http, toastr) {
    // alert($scope.identycode)
    $scope.firstnext = function() {
        $http({
            method: "post",
            url: 'http://127.0.0.1:8083/console/admin/contrastcode?verification=' + $scope.identycode,
            headers: {},
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req.data)
            if (req.data.valid == true) {
                if ($scope.finduser !== undefined) {
                    $http({
                        method: "get",
                        url: $scope.ROOTURL + "/admin/selecusers/" + $scope.finduser,
                        headers: {
                            "content-type": "application/json"
                        }
                    }).then(function(req) {
                        $log.log(req.data)
                        if (req.data.retCode === "0001") {
                            $state.go("page2", {
                                phone: req.data.retBody.Phone + ',' + $scope.finduser + ',' + req.data.retBody.uid
                            }, {
                                reload: true
                            })
                        } else if (req.data.retCode === "3003") {
                            toastr.error("错误", req.data.retInfo)
                            state.reload()
                        }


                    })
                }
            } else {
                toastr.error("错误", "请重新输入验证码")
                $state.reload()
            }
        })
    }
})


findApp.controller("findPage2Controller", function($scope, $http, $state, $log, toastr, $stateParams) {
    var userinfo = $stateParams.phone
    $scope.phone = userinfo.split(",")[0]
    $scope.name = userinfo.split(",")[1]
    var uid = userinfo.split(",")[2]
    $log.log($scope.phone)
    $log.log($scope.name)
        /**
         * 获取手机验证码
         */
    $scope.getAuthCode = function() {
        var databody = '{"Header":{},"Body":{"Phone": "' + $scope.phone + '"}}'
        $http({
            method: "post",
            url: $scope.ROOTURL + "/admin/authcode",
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req.data)
            if (req.data.retCode === "0001") {
                $("#authcode").disabled = true
            } else if (req.data.retCode === "2002") {
                toastr.error("错误", req.data.retInfo)
            }
        })
    }

    /**
     * 校验手机验证码，正确则跳转
     */
    $scope.secondnext = function() {
        var databody = '{"Header":{},"Body":{"AuthCode": "' + $scope.authcode + '","Phone":"' + $scope.phone + '"}}'
        $http({
            method: "post",
            url: $scope.ROOTURL + "/admin/efficacy",
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req.data)
            if (req.data.retCode === "0001") {
                $state.go("page3", {
                    uid: uid
                }, {
                    reload: true
                })
            } else {
                toastr.error("错误", "验证码错误")
            }
        })
    }
})

findApp.controller("findPage3Controller", function($scope, $state, toastr, $http, $log, $stateParams) {
    var uid = $stateParams.uid
    $scope.thirdnext = function() {
        if ($scope.newpwd === $scope.renewpwd && $scope.newpwd.length !== 0) {
            var databody = '{"Header":{},"Body":{"uid":' + uid + ',"Password":"' + $scope.newpwd + '"}}'
            $http({
                method: "put",
                url: $scope.ROOTURL + "/admin/find",
                headers: {
                    "content-type": "application/json"
                },
                data: databody,
                withCredentials: true //!跨域带cookies
            }).then(function(req) {
                $log.log(req.data)
                if (req.data.retCode === "0001") {
                    $state.go("page4")
                } else {
                    toastr.error("错误", "密码不一致")
                }
            })
        } else {
            toastr.error("错误", "密码不一致")
        }
    }


})