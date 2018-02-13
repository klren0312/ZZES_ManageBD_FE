app.controller("faultRecordController", function($scope, $log) {
    $("#date1").datetimepicker()
    $("#date2").datetimepicker()

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
     * TODO:等待接口
     * @param paramFilter 选择参数数组
     */
    // $scope.exportExcel = function(paramFilter) {
    //     var option = {}
    //     option.fileName = '设备列表'
    //     option.datas = [{
    //         sheetData: $scope.personinfos,
    //         sheetName: 'sheet',
    //         sheetFilter: paramFilter,
    //         sheetHeader: paramFilter,
    //     }]
    //     var toExcel = new ExportJsonExcel(option);
    //     toExcel.saveExcel();
    // }

    //整体导出
    $scope.allexport = ['udeviceId', 'fkPlatid', 'DeviceName', 'ModelID', 'NetMode', 'deviceStatus']

})