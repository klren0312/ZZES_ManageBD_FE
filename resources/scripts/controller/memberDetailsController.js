app.controller("memberDetailsController", function($scope, $state, $log, $http, $stateParams) {
    $scope.goback = function() {
        $state.go("memberManage");
    }
    var data = $stateParams.member
    $log.log(data)

    //请求成员信息
    $scope.getMemberInfo = function() {
            var memberurl = $scope.ROOTURL + "/member/select/" + data;
            $http({
                method: "get",
                url: memberurl,
                headers: {
                    "content-type": "application/json"
                }
            }).then(function(req) {
                $log.log("member:")
                $log.log(req)
                var info = req.data.retBody
                $scope.defaultrole = info.Name
                $scope.memberlogin = info.UserName
                $scope.memberpwd = info.Password
                $scope.membername = info.Realname
                $scope.memberphone = info.Phone
                $scope.memberemail = info.Email
                $scope.registdate = info.reportTime
                $scope.logindate = info.recentTime
            })
        }
        // 请求角色下拉
    $scope.getAllRole = function() {
        var roleurl = $scope.ROOTURL + "/member/role/choices";
        $http({
            method: "get",
            url: roleurl,
            headers: {
                "content-type": "application/json"
            }
        }).then(function(req) {
            $log.log("role:")
            $log.log(req)
            $scope.roles = req.data.retBody.retBody
        })
    }


    //FIXME:保存信息 权限暂时为固定值
    $scope.save = function() {
        var saveurl = $scope.ROOTURL + "/member/update"
            /**
             * 判断角色是否为空
             * 若为空则为当前角色
             * 若不为空则为选择的角色
             */
        if ($scope.memberrole == undefined) {
            $scope.role = $scope.defaultrole;
        } else {
            $scope.role = $scope.memberrole.role
        }

        var databody = '{"Header":{},"Body":{"Role": "' + $scope.role + '","UserName": "' + $scope.memberlogin + '","Password": "' + $scope.memberpwd + '","Realname": "' + $scope.membername + '","Phone": "' + $scope.memberphone + '","Email": "' + $scope.memberemail + '"}}'
        $http({
            method: "put",
            url: saveurl,
            header: {
                "content-type": "application/json"
            },
            data: databody
        }).then(function(req) {
            $log.log("member:")
            $log.log(req)
            if (req.data.retCode) {
                $state.go("memberManage")
            }
        })
    }

    $scope.getAllRole()
    $scope.getMemberInfo()

})