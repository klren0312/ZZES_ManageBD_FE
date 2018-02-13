app.controller("memberManageController", function($log, $scope, $state, $http) {
    $scope.create = function() {
            $state.go("createMember");
        }
        /**
         * 参数传递
         * x --- 电话号码
         */
    $scope.see = function(x) {
        $log.log(x);
        // var jsonStr = angular.toJson(x)
        // $log.log("json" + jsonStr)
        $state.go("memberDetails", {
            member: x
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
                for (var i = 0, len = $scope.memberManages.users.length; i < len; i++) {
                    $scope.result.push($scope.memberManages.users[i].uid);
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
        // 删除成员
    $scope.delete = function(result) {
            var delurl = $scope.ROOTURL + '/member/delete';
            $log.log(result)
            var databody = '{"ids":[' + result + ']}'
                // var databody = '{"ids":[7]}'
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
                    $state.reload();
                }
            })
        }
        // FIXME:请求成员列表 AccessToken暂时为固定值
    var memberurl = $scope.ROOTURL + "/member?audit=0&page=0&pageSize=10";
    $http({
        method: "get",
        url: memberurl,
        headers: {
            "content-type": "application/json",
            "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("member: ");
        $log.log(req)
        var member = req.data.retBody
        $scope.memberManages = member
        $scope.setPage($scope.memberManages.users)
    })


})