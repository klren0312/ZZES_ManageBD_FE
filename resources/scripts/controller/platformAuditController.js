app.controller("platformAuditController", function($scope, $http, $log, $state) {
    $state.go("platformAudit.notAudit")
    $scope.showBtn = true

    // 已审核
    $scope.hasAuditBtn = function() {
        $state.go("platformAudit.hasAudit")
        $scope.showBtn = false
    }

    // 未审核
    $scope.notAuditBtn = function() {
        $state.go("platformAudit.notAudit")
        $scope.showBtn = true
    }


    // 删除平台
    $scope.delete = function(result) {
        var delurl = $scope.ROOTURL + '/platforms/delete';
        $log.log(result)
        var databody = '{"ids":[' + result + ']}'
        $log.log(databody);
        $http({
            method: "delete",
            url: delurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": $scope.AccessToken
            },
            withCredentials: true, //!跨域带cookies
            data: databody,
        }).then(function(req) {
            $log.log("del:")
            $log.log(req);
            if (req.data.retCode === "0001") {
                $state.reload();
            } else {
                alert("DEL ERROR")
            }
        })
    }

    // 创建平台
    $scope.createPlatform = function() {
        $state.go("createPlatform")
    }


})

app.controller("notAuditController", function($http, $scope, $log, $state) {
    var platformurl = $scope.ROOTURL + '/platforms/unreviewed'
    $http({
        method: 'get',
        url: platformurl,
        header: {
            "content-type": "application/json",
            "AccessToken": $scope.AccessToken
        },
        withCredentials: true, //!跨域带cookies
    }).then(function(req) {
        $log.log(req.data.retBody.platforms)
        $scope.platforms = req.data.retBody.platforms
        $scope.setPage($scope.platforms)
    })

    //获取到平台id
    $scope.push = function(id) {
        // $log.log("platid:" + id)
        $scope.platid = id
    }

    //审核按钮点击事件
    $scope.auditPlat = function() {
        var auditPlatUrl = $scope.ROOTURL + '/platforms/' + $scope.platid + '/1'
        $http({
            method: "put",
            url: auditPlatUrl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            // $log.log(req.data)
            if (req.data.retCode == '0001') {
                $state.reload()
            }
        })
    }

    // 多选框全选功能 
    $scope.selectAll = function() {
        if ($scope.selectedAll) {
            $scope.result = [] //先清空数组
            $scope.selected = true;
            // 将所有序号循环到result数组中
            for (var i = 0, len = $scope.roleManages.sysRoles.length; i < len; i++) {
                $scope.result.push($scope.roleManages.sysRoles[i].id);
            }
        } else {
            // 取消选择，则清空数组
            $scope.result = []
            $scope.selected = false;
        }
    }

    // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
        console.log(event)
        console.log(action)

        var action = event.target;
        if (action.checked) {
            if ($scope.result.indexOf(id) == -1) {
                $scope.result.push(id);
            }
        } else {
            var idx = $scope.result.indexOf(id);
            if (idx != -1) {
                $scope.result.splice(idx, 1);
            }
        }
    }


    $(".auditbtn").click(function() {
        $(".auditbtn").removeClass('auditbtnactive')
        $(this).addClass('auditbtnactive')
    })

    //查看跳转按钮
    $scope.watchdetails = function(x) {
        $log.log(x)
        $state.go("platformDetails", {
            platformid: x
        }, {
            reload: true
        })
    }
})


app.controller("hasAuditController", function($scope, $log, $http, $state) {
    var platformurl = $scope.ROOTURL + '/platforms'
    $http({
        method: 'get',
        url: platformurl,
        header: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        // $log.log(req.data.retBody.platforms)
        $scope.platforms = req.data.retBody.platforms
        $scope.setPage($scope.platforms)
    })

    //获取平台id
    $scope.push = function(id) {
        $scope.platid = id
    }

    //禁用平台
    $scope.banPlat = function() {
        var banurl = $scope.ROOTURL + '/platforms/' + $scope.platid + '/3'
        $http({
            method: "put",
            url: banurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode == "0001") {
                $state.reload()
            }
        })
    }

    //启用平台
    $scope.openPlat = function() {
        var openurl = $scope.ROOTURL + '/platforms/' + $scope.platid + '/2'
        $http({
            method: "put",
            url: openurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode == "0001") {
                $state.reload()
            }
        })
    }

    //查看跳转按钮
    $scope.watchdetails = function(x) {

        $state.go("hasPlatDetails", {
            platformid: x
        }, {
            reload: true
        })
    }
})