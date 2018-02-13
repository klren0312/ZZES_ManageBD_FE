app.controller("feedbackController", function($scope, $http, $log) {
    $scope.msgManages = [{}];

    $scope.sendMsg = function() {
        $log.log("in push");
        var date = new Date().toLocaleString();
        $scope.msgManages.push({
            msgheader: $scope.pushHeader,
            msgcontent: $scope.pushContent,
            pushobject: $scope.pushObject,
            pushtime: date
        })
    }

    //时间组件
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ' + picker.endDate.format('YYYY-MM-DD'));
        $scope.startDate = picker.startDate.format('YYYY-MM-DD')
        $scope.endDate = picker.endDate.format('YYYY-MM-DD')
        $log.log($scope.startDate)
        $log.log($scope.endDate)
    });
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });


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
     * 请求反馈数据
     */

    $scope.feedbacklists = [{
            "updateAt": 1482311744000,
            "LoginName": "zenhome-user-1",
            "Mobile": "18826408880",
            "title": "使用反馈",
            "content": "场景设置非常方便，触发灵敏"
        },
        {
            "updateAt": 1482376194000,
            "LoginName": "zenhome-user-1",
            "Mobile": "18826408881",
            "title": "使用反馈",
            "content": "支持的智能电器很多，很方便"
        },
        {
            "updateAt": 1493973321000,
            "LoginName": "zenhome-user-朱",
            "Mobile": "13717690008",
            "title": "使用反馈",
            "content": "买了很多家电，发现都能接入，好棒"
        },
        {
            "updateAt": 1493973322000,
            "LoginName": "zenhome-user-朱",
            "Mobile": "13717690008",
            "title": "使用反馈",
            "content": "App很方便，可以连接多个品牌设备，操作便利大大提升。"
        },
        {
            "updateAt": 1500627417000,
            "LoginName": "程若红",
            "Mobile": "18855091239",
            "title": "使用反馈",
            "content": "有很多实用的功能，供用户使用"
        },
        {
            "updateAt": 1503970441000,
            "LoginName": "gaowy",
            "Mobile": "18109692808",
            "title": "使用反馈",
            "content": "一个App控制家中所有，很方便"
        }
    ]



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