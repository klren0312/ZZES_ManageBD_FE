app.controller("dataUserAnalysisController", function($scope, $state, $log, $http) {
    /**
     * 图表切换事件
     */
    $scope.newFlag = true
    $scope.activeFlag = false
    $scope.shareFlag = false
    $scope.employFlag = false
    $scope.bindingFlag = false
    $scope.new = function() {
        $scope.newFlag = true
        $scope.activeFlag = false
        $scope.shareFlag = false
        $scope.employFlag = false
        $scope.bindingFlag = false
    }
    $scope.active = function() {
        $scope.newFlag = false
        $scope.activeFlag = true
        $scope.shareFlag = false
        $scope.employFlag = false
        $scope.bindingFlag = false
    }
    $scope.share = function() {
        $scope.newFlag = false
        $scope.activeFlag = false
        $scope.shareFlag = true
        $scope.employFlag = false
        $scope.bindingFlag = false
    }
    $scope.employ = function() {
        $scope.newFlag = false
        $scope.activeFlag = false
        $scope.shareFlag = false
        $scope.employFlag = true
        $scope.bindingFlag = false
    }
    $scope.bind = function() {
        $scope.newFlag = false
        $scope.activeFlag = false
        $scope.shareFlag = false
        $scope.employFlag = false
        $scope.bindingFlag = true
    }

    /**
     * 请求用户分析数据
     * 
     * @param product 产品名
     * @param place 城市地区
     * @param time 时间数组，[开始,结束]
     * @example '{"category":"大家电","region":"北京","time":["2017-10-01","2017-10-31"]}'
     */

    function getUserAnalysis(product, place, time) {
        var databody = '{"category":"' + product + '","region":"' + place + '","time":' + time + '}'
        $http({
            method: "post",
            url: $scope.ROOTURL + '/analysis/usersslect',
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            //底部表格数据获取
            $scope.personinfos = req.data.retBody
            $scope.setPage($scope.personinfos)

            //图表数据获取
            var arr = req.data.retBody
            $scope.timestamp = []
            $scope.newUsers = []
            $scope.newUsersRatio = []
            $scope.activeUsers = []
            $scope.activeUsersRatio = []
            $scope.shareUsers = []
            $scope.shareUsersRatio = []
            $scope.employUsers = []
            $scope.employUsersRatio = []
            $scope.bindingUsers = []
            $scope.bindingUsersRatio = []

            $scope.newNum = 0
            $scope.activeNum = 0
            $scope.shareNum = 0
            $scope.employNum = 0
            $scope.bindingNum = 0
            for (var i = 0, len = arr.length; i < len; i++) {
                $scope.timestamp[i] = arr[i].timestamp
                $scope.newUsers[i] = arr[i].new_users
                $scope.newUsersRatio[i] = parseFloat(arr[i].active_users_ratio.split("%")[0])
                $scope.newNum += arr[i].new_users

                $scope.activeUsers[i] = arr[i].active_users
                $scope.activeUsersRatio[i] = parseFloat(arr[i].active_users_ratio.split("%")[0])
                $scope.activeNum += arr[i].active_users

                $scope.shareUsers[i] = arr[i].share_users
                $scope.shareUsersRatio[i] = parseFloat(arr[i].share_users_ratio.split("%")[0])
                $scope.shareNum += arr[i].share_users

                $scope.employUsers[i] = arr[i].employ_users
                $scope.employUsersRatio[i] = parseFloat(arr[i].employ_users_ratio.split("%")[0])
                $scope.employNum += arr[i].employ_users

                $scope.bindingUsers[i] = arr[i].binding_users
                $scope.bindingUsersRatio[i] = parseFloat(arr[i].binding_users_ratio.split("%")[0])
                $scope.bindingNum += arr[i].binding_users
            }

            //新用户数
            $scope.newdata = {}
            $scope.newdata.timestamp = $scope.timestamp
            $scope.newdata.newUsers = $scope.newUsers
            $scope.newdata.newUsersRatio = $scope.newUsersRatio

            //活跃用户数
            $scope.activedata = {}
            $scope.activedata.timestamp = $scope.timestamp
            $scope.activedata.activeUsers = $scope.activeUsers
            $scope.activedata.activeUsersRatio = $scope.activeUsersRatio

            //分享绑定次数
            $scope.sharedata = {}
            $scope.sharedata.timestamp = $scope.timestamp
            $scope.sharedata.shareUsers = $scope.shareUsers
            $scope.sharedata.shareUsersRatio = $scope.shareUsersRatio

            //人均使用时长
            $scope.employdata = {}
            $scope.employdata.timestamp = $scope.timestamp
            $scope.employdata.employUsers = $scope.employUsers
            $scope.employdata.employUsersRatio = $scope.employUsersRatio

            //已绑定设备用户数
            $scope.bindingdata = {}
            $scope.bindingdata.timestamp = $scope.timestamp
            $scope.bindingdata.bindingUsers = $scope.bindingUsers
            $scope.bindingdata.bindingUsersRatio = $scope.bindingUsersRatio
        })
    }


    /**
     * 导出csv
     * 根据当前选项来导出csv
     */
    $scope.getCsv = function() {
        var time = eval($scope.time)
        window.open('http://localhost:8083/console/analysis/csv/' + $scope.product + '/' + $scope.place + '/' + time[0] + ',' + time[1])
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
        $scope.time = '["' + picker.startDate.format('YYYY-MM-DD') + '","' + picker.endDate.format('YYYY-MM-DD') + '"]'
        getUserAnalysis($scope.product, $scope.place, $scope.time)
        $(".datebtn").removeClass('selectbtnactive')
    });
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

    //请求数据，访问默认数据
    $scope.product = "大家电"
    $scope.place = "北京"
    $scope.time = '["2017-10-01", "2017-10-31"]'
    getUserAnalysis($scope.product, $scope.place, $scope.time)

    //查询选择按钮样式切换
    //查询选择按钮样式切换 
    //产品按钮
    $(".productbtn").click(function() {
        // console.log($(this).text())
        $scope.product = $(this).text()
        getUserAnalysis($scope.product, $scope.place, $scope.time)
        $(".productbtn").removeClass('selectbtnactive')
        $(this).addClass('selectbtnactive')
    })

    //地区按钮
    $(".placebtn").click(function() {
        $scope.place = $(this).text()
        getUserAnalysis($scope.product, $scope.place, $scope.time)
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
        getUserAnalysis($scope.product, $scope.place, $scope.time)
        $(".datebtn").removeClass('selectbtnactive')
        $(this).addClass('selectbtnactive')
    })

    //图表部分样式切换
    $(".chartsbtn").click(function() {
        $(".chartsbtn").removeClass("chartsbtnactive")
        $(this).addClass('chartsbtnactive')
    })
})