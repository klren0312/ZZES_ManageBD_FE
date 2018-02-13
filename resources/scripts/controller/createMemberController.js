app.controller("createMemberController", function($scope, $http, $log, $state) {
    $scope.goback = function() {
            $state.go("memberManage");
        }
        // 请求角色下拉
    $scope.getAllRole = function() {
            var roleurl = $scope.ROOTURL + "/member/role/choices";
            $http({
                method: "get",
                url: roleurl,
                headers: {
                    "content-type": "application/json"
                },
                withCredentials: true //!跨域带cookies
            }).then(function(req) {
                $log.log("role:")
                $log.log(req)
                $scope.roles = req.data.retBody.retBody
            })
        }
        // 保存操作
    $scope.save = function() {
        var saveurl = $scope.ROOTURL + '/member/insert'
        var databody = '{"Role": "' + $scope.memberrole.role + '","UserName": "' + $scope.memberlogin + '","Realname":"' + $scope.membername + '","Email":"' + $scope.memberemail + '","Phone":"' + $scope.memberphone + '","Password":"' + $scope.memberpwd + '"}'
        $http({
            method: "post",
            url: saveurl,
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("save:")
            $log.log(req)
            if (req.data.retCode === "0001") {
                $state.error = false
                $scope.errorinfo = ""
                $state.go("memberManage")
            } else {
                $scope.error = true
                $scope.errorinfo = "参数不可为空";
            }
        })
    }
    $scope.getAllRole()
})