app.controller("equipmentDetailsController", function($scope, $state, $log, $http, $stateParams) {
    $scope.goback = function() {
        $state.go("equipmentManage")
    }


    // 基本信息按钮跳转
    $scope.baseinfo = function() {
        $state.go('equipmentDetails.baseinfo')
    }

    // 关联信息按钮跳转
    $scope.bindinfo = function() {
        $state.go('equipmentDetails.bindinfo')
    }

    // 故障记录按钮跳转
    $scope.errorinfo = function() {
        $state.go('equipmentDetails.errorinfo')
    }

    // 设备日志按钮跳转
    $scope.equipmentlog = function() {
        $state.go('equipmentDetails.equipmentlog')
    }

    // 运行分析按钮跳转
    $scope.runanalysis = function() {
        $state.go('equipmentDetails.runanalysis')
    }

    // 按钮样式固定
    $(".userdetails-selectbtn").click(function() {
        $(".userdetails-selectbtn").removeClass("userdetails-selectbtn-active")
        $(this).addClass("userdetails-selectbtn-active")
    })

    // 解绑按钮点击时间
    $scope.loosebind = function(uuid) {
        $log.log(uuid);
        var looseurl = $scope.ROOTURL + "/devices/loose/" + $stateParams.id + "/" + uuid + "?page=0&pageSize=10";
        var AccessToken = localStorage.getItem("AccessToken");
        var data = '{"Header":{"AccessToken":' + AccessToken + '}}';
        $http({
            method: "put",
            url: looseurl,
            headers: {
                "content-type": "application/json"
            },
            data: data,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req);
        })
    }

    $scope.param = $stateParams.id;
    // 基本信息请求
    var baseurl = $scope.ROOTURL + "/devices/" + $stateParams.id + "/base?page=0&pageSize=10";
    $http({
        method: "get",
        url: baseurl,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("base: ");
        $log.log(req.data.retBody.data.map.properties);
        $scope.basedatas = req.data.retBody.data.map;
    })

    // 运行分析
    $scope.startFlag = true;
    $scope.runFlag = false;
    $scope.outlineFlag = false;
    $scope.clickFlag = false;
    $scope.starttime = function(show) {
        $scope.startFlag = true;
        $scope.runFlag = false;
        $scope.outlineFlag = false;
        $scope.clickFlag = false;
    }
    $scope.runtimes = function(show) {
        $scope.runFlag = true;
        $scope.startFlag = false;
        $scope.outlineFlag = false;
        $scope.clickFlag = false;
    }
    $scope.outlinetimes = function(show) {
        $scope.outlineFlag = true;
        $scope.runFlag = false;
        $scope.startFlag = false;
        $scope.clickFlag = false;
    }
    $scope.clickfun = function(show) {
        $scope.clickFlag = true;
        $scope.runFlag = false;
        $scope.startFlag = false;
        $scope.outlineFlag = false;
    }
})

// 设备日志控制器
app.controller("equipmentlogController", function($scope, $log, $stateParams, $http) {
    var logurl = $scope.ROOTURL + '/devices/log/e29c9f983bae49feb448c5994f7e7afa'
    $http({
        method: "get",
        url: logurl,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("log:")
            // $log.log(req.data.retBody)
        $scope.logdatas = req.data.retBody
        $log.log($scope.logdatas[0].timestamp)
        $scope.$parent.timestamp = $scope.logdatas[0].timestamp
        $scope.setPage($scope.logdatas)
    })

})

// 关联信息控制器
app.controller("bindequipinfoController", function($scope, $http, $log, $stateParams) {
    var bindurl = $scope.ROOTURL + "/devices/" + $stateParams.id + "/relevance?page=0&pageSize=10";
    $http({
        method: "get",
        url: bindurl,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("bind: ");
        $log.log(req.data.retBody.data.relevances)
        var bind = req.data.retBody.data;
        $scope.totalRecord = req.data.retBody.totalRecord
        $scope.binddatas = bind;
        $scope.setPage($scope.binddatas.relevances)
    })
})

// 故障数据控制器
app.controller("errorinfoController", function($scope, $http, $stateParams, $log) {
    var errorurl = $scope.ROOTURL + "/devices/" + $stateParams.id + "/faults?page=0&pageSize=10";
    $http({
        method: "get",
        url: errorurl,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("error: ");
        $log.log(req.data.retBody.data.faults)
        var error = req.data.retBody.data;
        $scope.totalRecord = req.data.retBody.totalRecord
        $scope.errordatas = error;
        $scope.setPage($scope.errordatas.faults)
    })

})

//设备运行分析
app.controller("runanalysisController", function($scope, $http, $state, $stateParams, $log) {
    $(".run-time-analysis").click(function() {
        $(".run-time-analysis").removeClass('run-time-analysisactive')
        $(this).addClass('run-time-analysisactive')
    })
    $(".chartsbtn").click(function() {
        $(".chartsbtn").removeClass('chartsbtnactive')
        $(this).addClass('chartsbtnactive')
    })
    var runanalysisurl = $scope.ROOTURL + '/devices/start/e29c9f983bae49feb448c5994f7e7afa'
    $http({
        method: 'get',
        url: runanalysisurl,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("run")
        $log.log(req.data.retBody)
        $scope.setPage(req.data.retBody)
        var arr = req.data.retBody
        $scope.date = []
        $scope.everyday = []
        $scope.difference = []
        $scope.startup = []
        $scope.startupdifference = []
        $scope.endup = []
        $scope.endupdifference = []
        for (var i = 0, len = arr.length; i < len; i++) {
            $scope.date[i] = new Date(arr[i].timestamp * 1000).toLocaleDateString()
            $scope.everyday[i] = arr[i].everyday
            $scope.difference[i] = arr[i].difference
            $scope.endup[i] = arr[i].endup
            $scope.endupdifference[i] = arr[i].endup_difference
            $scope.startup[i] = arr[i].startup
            $scope.startupdifference[i] = arr[i].startup_difference
        }
        $scope.startupNum = getSum($scope.startup)
        $scope.endupNum = getSum($scope.endup)
        $log.log("every:" + getSum($scope.everyday))
        $log.log($scope.everyday)
        $scope.everydayNum = getSum($scope.everyday)
    })

    /**
     * 求和函数
     */
    function getSum(arr) {
        var sum = 0
        for (var i = 0, len = arr.length; i < len; i++) {
            sum += parseInt(arr[i])
        }
        return sum
    }

    $scope.getCsv = function() {
        window.open("http://localhost:8083/console/devices/csv")
    }


    $scope.data = [78, 79, 78, 78, 78, 78, 78, 78]
    $scope.updata = [0, 1, 1, 1, 1, 1, 1, 1]
})