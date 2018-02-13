app.controller("equipmentManageController", function($scope, $log, $state, $http) {

    $scope.reset = function() {
        $scope.keywords = ""
        $scope.area = ""
        $scope.product = ""
        $scope.platform = ""
        $scope.status = ""
        $scope.online = ""
    }
    $scope.data
    var url = $scope.ROOTURL + "/devices"
    $http({
        method: 'get',
        url: url,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $scope.personinfos = req.data.retBody.data.platforms

        // 设置分页相关数据
        $scope.setPage($scope.personinfos)
    })
    $scope.search = function() {
        var url = $scope.ROOTURL + "/devices?keyword=" + $scope.product + "&page=0&pageSize=10"
        $http({
            method: 'get',
            url: url,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $scope.personinfos = req.data.retBody.data.platforms

            // 设置分页相关数据
            $scope.setPage($scope.personinfos)
        })
    }

    // 多选框全选功能 
    $scope.selectAll = function() {
        if ($scope.selectedAll) {
            $scope.selected = true
        } else {
            $scope.selected = false
        }
    }

    // 查看详情
    $scope.watchDetails = function(x) {
        // $log.log(x)
        $state.go("equipmentDetails", {
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
        option.fileName = '设备列表'
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
    $scope.allexport = ['udeviceId', 'fkPlatid', 'DeviceName', 'ModelID', 'NetMode', 'deviceStatus']


})