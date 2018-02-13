app.controller("createRoleController", function($scope, $log, $http, $state) {
    $scope.goback = function() {
        $state.go("roleManage");
    }

    // 权限保存
    $scope.save = function() {
        var saveurl = $scope.ROOTURL + '/role/insert'

        function createRole() {
            var databody = '{"Role": "' + $scope.rolename + '","Description":"' + $scope.roledescription + '","permissionId":[' + $scope.result + ']}';
            $log.log(databody)
            $http({
                method: "post",
                url: saveurl,
                headers: {
                    "content-type": "application/json"
                },
                data: databody,
                withCredentials: true //!跨域带cookies
            }).then(function(req) {
                $log.log('save:')
                $log.log(req)
                if (req.data.retCode === "0001") {
                    $state.go("roleManage")
                } else {
                    $scope.inputError = true
                    $scope.errorinfo = req.data.retInfo;
                }
            })
        }

        createRole()

    }

    // 树状图设置
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

    // 选择框
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

    //?全部选上或者全部不选择 暂时就这样
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