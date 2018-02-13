app.controller("dataEquAnalysisController", function($scope, $state, $log, $http) {


    /**
     * 请求设备分析数据
     * 
     * @param product 产品名
     * @param place 城市地区
     * @param time 时间数组，[开始,结束]
     */
    function getEquAnalysis(product, place, time) {
        var databody = '{"category":"' + product + '","region":"' + place + '","time":' + time + '}'
        $http({
            method: "post",
            url: $scope.ROOTURL + '/analysis/deviceselect',
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            //底部表格数据获取
            $scope.personinfos = req.data.retBody
            $scope.setPage($scope.personinfos)

            //图表数据获取
            var arr = req.data.retBody
            $scope.timestamp = []
            $scope.joinDevice = []
            $scope.joinDeviceRatio = []
            $scope.activeDevice = []
            $scope.activeDeviceRatio = []
            $scope.offLineDevice = []
            $scope.offLineDeviceRatio = []
            $scope.bindingDevice = []
            $scope.bindingDeviceRatio = []

            $scope.joinNum = 0
            $scope.activeNum = 0
            $scope.offlineNum = 0
            $scope.bindingNum = 0

            for (var i = 0, len = arr.length; i < len; i++) {
                $scope.timestamp[i] = arr[i].timestamp
                $scope.joinDevice[i] = arr[i].join_device
                $scope.joinDeviceRatio[i] = parseFloat(arr[i].join_device_ratio.split("%")[0])
                $scope.joinNum += arr[i].join_device

                $scope.activeDevice[i] = arr[i].active_device
                $scope.activeDeviceRatio[i] = parseFloat(arr[i].active_device_ratio.split("%")[0])
                $scope.activeNum += arr[i].active_device

                $scope.offLineDevice[i] = arr[i].off_line_device
                $scope.offLineDeviceRatio[i] = parseFloat(arr[i].off_line_device_ratio.split("%")[0])
                $scope.offlineNum += arr[i].off_line_device

                $scope.bindingDevice[i] = arr[i].binding_device
                $scope.bindingDeviceRatio[i] = parseFloat(arr[i].binding_device_ratio.split("%")[0])
                $scope.bindingNum += arr[i].binding_device
            }

            //接入设备数
            $scope.joindata = {}
            $scope.joindata.timestamp = $scope.timestamp
            $scope.joindata.joinDevice = $scope.joinDevice
            $scope.joindata.joinDeviceRatio = $scope.joinDeviceRatio

            //活跃设备数
            $scope.activedata = {}
            $scope.activedata.timestamp = $scope.timestamp
            $scope.activedata.activeDevice = $scope.activeDevice
            $scope.activedata.activeDeviceRatio = $scope.activeDeviceRatio

            //离线设备数
            $scope.offlinedata = {}
            $scope.offlinedata.timestamp = $scope.timestamp
            $scope.offlinedata.offLineDevice = $scope.offLineDevice
            $scope.offlinedata.offLineDeviceRatio = $scope.offLineDeviceRatio

            //绑定设备数
            $scope.bindingdata = {}
            $scope.bindingdata.timestamp = $scope.timestamp
            $scope.bindingdata.bindingDevice = $scope.bindingDevice
            $scope.bindingdata.bindingDeviceRatio = $scope.bindingDeviceRatio
        })
    }

    /**
     * 图表切换事件
     */
    $scope.joinFlag = true;
    $scope.activeFlag = false;
    $scope.offlineFlag = false;
    $scope.bindingFlag = false;
    $scope.access = function(show) {
        $scope.joinFlag = true;
        $scope.activeFlag = false;
        $scope.offlineFlag = false;
        $scope.bindingFlag = false;
    }
    $scope.active = function(show) {
        $scope.activeFlag = true;
        $scope.joinFlag = false;
        $scope.offlineFlag = false;
        $scope.bindingFlag = false;
    }
    $scope.outline = function(show) {
        $scope.offlineFlag = true;
        $scope.activeFlag = false;
        $scope.joinFlag = false;
        $scope.bindingFlag = false;
    }
    $scope.bind = function(show) {
        $scope.bindingFlag = true;
        $scope.activeFlag = false;
        $scope.joinFlag = false;
        $scope.offlineFlag = false;
    }

    /**
     * 导出csv
     * 根据当前选项来导出csv
     */
    $scope.getCsv = function() {
        var time = eval($scope.time)
        window.open('http://localhost:8083/console/analysis/csv/' + $scope.product + '/' + $scope.place + '/' + time[0] + ',' + time[1])
    }

    /**
     * 时间组件
     */
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    /**
     * 时间选择器选择后，请求数据
     */
    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ' + picker.endDate.format('YYYY-MM-DD'));
        $scope.time = '["' + picker.startDate.format('YYYY-MM-DD') + '","' + picker.endDate.format('YYYY-MM-DD') + '"]'
        getEquAnalysis($scope.product, $scope.place, $scope.time)
        $(".datebtn").removeClass('selectbtnactive')
    });
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

    //请求数据，访问默认数据
    $scope.product = "大家电"
    $scope.place = "北京"
    $scope.time = '["2017-10-01", "2017-10-31"]'
    getEquAnalysis($scope.product, $scope.place, $scope.time)

    //查询选择按钮样式切换 
    //产品按钮
    $(".productbtn").click(function() {
        // console.log($(this).text())
        $scope.product = $(this).text()
        getEquAnalysis($scope.product, $scope.place, $scope.time)
        $(".productbtn").removeClass('selectbtnactive')
        $(this).addClass('selectbtnactive')
    })

    //地区按钮
    $(".placebtn").click(function() {
        $scope.place = $(this).text()
        getEquAnalysis($scope.product, $scope.place, $scope.time)
        $(".placebtn").removeClass('selectbtnactive')
        $(this).addClass('selectbtnactive')
    })

    //时间区间按钮
    $(".datebtn").click(function() {
        console.log($(this).text())
        if ($(this).text() === "上一周") {
            $scope.time = '["2017-10-25", "2017-10-31"]'
        } else if ($(this).text() === "上一个月") {
            $scope.time = '["2017-10-01", "2017-10-31"]'
        }
        getEquAnalysis($scope.product, $scope.place, $scope.time)
        $(".datebtn").removeClass('selectbtnactive')
        $(this).addClass('selectbtnactive')
    })

    //图表部分样式切换
    $(".chartsbtn").click(function() {
        $(".chartsbtn").removeClass("chartsbtnactive")
        $(this).addClass('chartsbtnactive')
    })



})