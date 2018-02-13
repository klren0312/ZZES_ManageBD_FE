app.controller("roleDetailsController", function($scope, $state, $log, $http, $stateParams) {
    $scope.goback = function() {
        $state.go("roleManage");
    }
    var data = $stateParams.role;
    // 请求信息
    var roleurl = $scope.ROOTURL + "/role/select/" + data
    $http({
            method: "get",
            url: roleurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("role:")
            $log.log(req);
            var info = req.data.retBody
            var permissions = []
            for (var i = 0, len = info.length; i < len; i++) {
                permissions.push(info[i].permissionId)
            }
            $log.log(permissions)
                // 遍历出权限到数组
            for (i = 0, len = permissions.length; i < len; i++) {
                $scope.oncheck(permissions[i])
                $log.log(permissions[i])
            }
            $scope.rolename = info[0].role
            $scope.roledescription = info[0].description
        })
        // 获取数据库权限 在前端进行勾选
    $scope.oncheck = function(n) {
            $log.log("ok oncheck？")
            switch (n) {
                case "1":
                    $scope.select1 = true;
                    $scope.result.push(1)
                    break;
                case "2":
                    $scope.select2 = true;
                    $scope.result.push(2)
                    break;
                case "3":
                    $scope.select3 = true;
                    $scope.result.push(3)
                    break;
                case "4":
                    $scope.select4 = true;
                    $scope.result.push(4)
                    break;
                case "5":
                    $scope.select5 = true;
                    $scope.result.push(5)
                    break;
                case "6":
                    $scope.select6 = true;
                    $scope.result.push(6)
                    break;
                case "7":
                    $scope.select7 = true;
                    $scope.result.push(7)
                    break;
                case "8":
                    $scope.select8 = true;
                    $scope.result.push(8)
                    break;
                case "9":
                    $scope.select9 = true;
                    $scope.result.push(9)
                    break;
                case "10":
                    $scope.select10 = true;

                    $scope.result.push(10)
                    break;
            }
        }
        //树状图设置
        // 多选框全选功能 
    $scope.selectAll = function() {
            if ($scope.selectedAll) {

                $scope.result = [] //先清空数组
                $scope.allcheck(true)
                    // 将所有序号填入result数组中
                $scope.result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            } else {
                // 取消选择，则清空数组
                $scope.result = []
                $scope.allcheck(false)
                $scope.selected = false;
            }
        }
        // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
            console.log(id)
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
        //*保存 
    $scope.save = function() {
        var roleDetailsurl = $scope.ROOTURL + "/role/update";
        var databody = '{"Header":{},"Body":{"role": "' + $scope.rolename + '","description": "' + $scope.roledescription + '","permissionId": [' + $scope.result + ']}}';
        $http({
            method: "put",
            url: roleDetailsurl,
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("details: ");
            $log.log(req)
            if (req.data.retCode === "0001") {
                $state.go("roleManage")
            } else { //打印出错
                $scope.errorinfo = req.data.retInfo;
            }
        })
    }


    //*全部选上或者全部不选择
    $scope.allcheck = function(check) {
        $scope.select1 = check;
        $scope.select2 = check;
        $scope.select3 = check;
        $scope.select4 = check;
        $scope.select5 = check;
        $scope.select6 = check;
        $scope.select7 = check;
        $scope.select8 = check;
        $scope.select9 = check;
        $scope.select10 = check;
    }

})