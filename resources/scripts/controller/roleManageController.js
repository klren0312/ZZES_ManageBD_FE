app.controller("roleManageController", function($state, $scope, $http, $log) {
    $scope.create = function() {
        $state.go("createRole");
    }

    // 查看传参
    $scope.see = function(x) {
        $log.log(x);
        // var jsonStr = angular.toJson(x)
        // $log.log("json:" + jsonStr)
        $state.go("roleDetails", {
            role: x
        }, {
            reload: true
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

    // 删除角色
    $scope.delete = function(result) {
        var delurl = $scope.ROOTURL + '/role/delete';
 
        var databody = '{"ids":["' + result + '"]}'
            // "ids":["7"]
        $log.log(databody);
        $http({
            method: "delete",
            url: delurl,
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("del:")
            $log.log(req);
            if (req.data.retCode === "0001") {
                getData()
            }
        })
    }
    getData()

    function getData() {
        // FIXME:请求角色列表 AccessToken后期需要获取
        var roleurl = $scope.ROOTURL + "/role?audit=0&page=0&pageSize=10";
        $http({
            method: "get",
            url: roleurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("role: ");
            $log.log(req.data.retBody.sysRoles)
            var role = req.data.retBody;
            $scope.roleManages = role;
            $scope.setPage($scope.roleManages.sysRoles)
        })
    }


})