app.controller('personManageController', function($scope, $state, $http, $log) {
    $scope.id = 1;
    var personurl = $scope.ROOTURL + "/users";
    $http({
        method: "get",
        url: personurl,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log(req.data.retBody.uUserList)
        $scope.personinfos = req.data.retBody.uUserList;
        $scope.setPage($scope.personinfos)
    })

    $scope.search = function() {
        var personurl = $scope.ROOTURL + "/users?keyword=阿门&page=0&pageSize=10";
        $http({
            method: "get",
            url: personurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req.data.retBody.uUserList)
            $scope.personinfos = req.data.retBody.uUserList;
            $scope.setPage($scope.personinfos)
        })
    }

    // 重置函数
    $scope.reset = function() {
        $scope.keywords = "";
        $scope.area = "";
        $scope.sex = "";
        $scope.devicebind = "";
        $scope.liveness = "";

    }

    // 多选框全选功能 
    $scope.selectAll = function() {
        if ($scope.selectedAll) {
            $scope.selected = true;
        } else {
            $scope.selected = false;
        }
    }

    /**
     * 查看详细
     * @param x 用户id
     */
    $scope.watchDetails = function(x) {
        $log.log("id" + x)
        $state.go("userDetails", {
            id: x
        }, {
            reload: true
        })
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

    /**
     * 选择导出excel
     * 
     * @param paramFilter 选择参数数组
     */
    $scope.exportExcel = function(paramFilter) {
        var option = {}
        option.fileName = '用户列表'
        option.datas = [{
            sheetData: $scope.personinfos,
            sheetName: 'sheet',
            sheetFilter: paramFilter,
            sheetHeader: paramFilter,
        }]
        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }

    //整体导出
    $scope.allexport = ['uplatId', 'UserID', 'LoginName', 'Mobile', 'createAt', 'updateAt']
})