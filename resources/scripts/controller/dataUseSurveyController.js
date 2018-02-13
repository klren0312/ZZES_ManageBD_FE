app.controller("dataUseSurveyController", function($scope, $state, $http, $log) {

    $scope.dataAnalysis = "数据分析：用户对家居智能设备接受程度高，市场普及不断扩大。";




})

/**
 * 场景热点控制器
 */
app.controller("sceneHotController", function($scope, $http, $log) {
    /**
     * 获取场景热度排名
     */
    function arrToObject(arr) {
        var paramobj = {};
        arr.forEach(function(v, i) {
            paramobj[v.id] = v;
        })
        return paramobj
    }
    $http({
        method: "get",
        url: $scope.ROOTURL + '/analysis/heat',
        headers: {
            "content-type": "application/json"
        }
    }).then(function(req) {
        // $log.log(req.data.retBody)
        $scope.sceneHotInfo = req.data.retBody
        $scope.sceneHotObj = arrToObject(req.data.retBody)
        $scope.scene_heat_one = req.data.retBody[req.data.retBody.length - 1].scene_heat_one
        $scope.scene_heat_two = req.data.retBody[req.data.retBody.length - 1].scene_heat_two
        $scope.scene_heat_three = req.data.retBody[req.data.retBody.length - 1].scene_heat_three
        $scope.scene_heat_four = req.data.retBody[req.data.retBody.length - 1].scene_heat_four
        $scope.scene_heat_five = req.data.retBody[req.data.retBody.length - 1].scene_heat_five
        $scope.scene_heat_six = req.data.retBody[req.data.retBody.length - 1].scene_heat_six
        $scope.scene_heat_seven = req.data.retBody[req.data.retBody.length - 1].scene_heat_seven
        $scope.scene_heat_eight = req.data.retBody[req.data.retBody.length - 1].scene_heat_eight
        $scope.scene_heat_nine = req.data.retBody[req.data.retBody.length - 1].scene_heat_nine
        $scope.scene_heat_ten = req.data.retBody[req.data.retBody.length - 1].scene_heat_ten
    })

    /**
     * 场景月份切换函数
     */
    $scope.sceneChange = function(id) {
        // $log.log(id)
        // $log.log($scope.sceneHotObj[id])
        $scope.scene_heat_one = $scope.sceneHotObj[id].scene_heat_one
        $scope.scene_heat_two = $scope.sceneHotObj[id].scene_heat_two
        $scope.scene_heat_three = $scope.sceneHotObj[id].scene_heat_three
        $scope.scene_heat_four = $scope.sceneHotObj[id].scene_heat_four
        $scope.scene_heat_five = $scope.sceneHotObj[id].scene_heat_five
        $scope.scene_heat_six = $scope.sceneHotObj[id].scene_heat_six
        $scope.scene_heat_seven = $scope.sceneHotObj[id].scene_heat_seven
        $scope.scene_heat_eight = $scope.sceneHotObj[id].scene_heat_eight
        $scope.scene_heat_nine = $scope.sceneHotObj[id].scene_heat_nine
        $scope.scene_heat_ten = $scope.sceneHotObj[id].scene_heat_ten
    }
})

/**
 * 用户绑定设备占比控制器
 */
app.controller("userBoundController", function($scope, $http, $log) {
    /**
     * 获取用户绑定设备数占比
     */
    function arrToObject(arr) {
        var paramobj = {};
        arr.forEach(function(v, i) {
            paramobj[v.id] = v;
        })
        return paramobj
    }
    $http({
        method: "get",
        url: $scope.ROOTURL + "/analysis/userbinding",
        headers: {
            "content-type": "application/json"
        }
    }).then(function(req) {
        // $log.log(req.data.retBody)
        $scope.userBoundArr = req.data.retBody
        $scope.userBoundObj = arrToObject(req.data.retBody)
        var arr = []
        arr[0] = $scope.userBoundArr[$scope.userBoundArr.length - 1].one_three
        arr[1] = $scope.userBoundArr[$scope.userBoundArr.length - 1].four_six
        arr[2] = $scope.userBoundArr[$scope.userBoundArr.length - 1].seven_nine
        arr[3] = $scope.userBoundArr[$scope.userBoundArr.length - 1].ten_twelve
        arr[4] = $scope.userBoundArr[$scope.userBoundArr.length - 1].twelve_above
        $scope.data = arr
            // $log.log($scope.data)
    })

    /**
     * 用户绑定设备月份切换函数
     */
    $scope.userBoundChange = function(id) {
        var arr = []
        arr[0] = $scope.userBoundObj[id].one_three
        arr[1] = $scope.userBoundObj[id].four_six
        arr[2] = $scope.userBoundObj[id].seven_nine
        arr[3] = $scope.userBoundObj[id].ten_twelve
        arr[4] = $scope.userBoundObj[id].twelve_above
        $scope.data = arr
            // $log.log($scope.data)
    }
})

/**
 * 各产品分类接入设备排行控制器
 */
app.controller("productController", function($scope, $http, $log) {
    /**
     * 获取用户绑定设备数占比
     */
    function arrToObject(arr) {
        var paramobj = {};
        arr.forEach(function(v, i) {
            paramobj[v.timestamp] = v;
        })
        return paramobj
    }
    $http({
        method: "get",
        url: $scope.ROOTURL + '/ranking',
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        //获取wifi前十
        var oriarr = req.data.retBody
        var arr = []
        var timearr = []
        var finalarr = []
        for (var len = oriarr.length, i = len - 1, j = 0; i >= len - 7; i--, j++) {
            arr[j] = oriarr[i].yesterday_new_bluetooth_device
            var newarr = arr[j].split(',')
            var rankarr = []
            for (var k = 0, newlen = newarr.length; k < newlen; k++) {
                var splitarr = newarr[k].split(':')
                var obj1 = {}
                obj1.name = splitarr[0]
                obj1.num = splitarr[1]
                rankarr[k] = obj1
            }
            timearr[j] = oriarr[i].timestamp
            var obj2 = {}
            obj2.rank = rankarr
            obj2.timestamp = timearr[j]
            finalarr[j] = obj2
        }
        $scope.rankArr = finalarr
        $scope.rankObj = arrToObject($scope.rankArr)
        $scope.realArr = $scope.rankArr[$scope.rankArr.length - 1].rank

    })

    $scope.rankChange = function(time) {
        $scope.realArr = $scope.rankObj[time].rank
        $log.log($scope.realArr)

    }
})


/**
 * 跨品牌设备绑定情况控制器
 */
app.controller("brandBoundController", function($http, $scope, $log) {
    /**
     * 获取跨品牌设备绑定情况
     */
    function arrToObject(arr) {
        var paramobj = {};
        arr.forEach(function(v, i) {
            paramobj[v.id] = v;
        })
        return paramobj
    }
    $http({
        method: "get",
        url: $scope.ROOTURL + "/analysis/devicebinding",
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $scope.brandBoundArr = req.data.retBody
        $scope.brandBoundObj = arrToObject(req.data.retBody)
        var arr = []
        arr[0] = $scope.brandBoundArr[$scope.brandBoundArr.length - 1].already_binding
        arr[1] = $scope.brandBoundArr[$scope.brandBoundArr.length - 1].difficulty_binding
        arr[2] = $scope.brandBoundArr[$scope.brandBoundArr.length - 1].one_binding
        $scope.data = arr
    })

    /**
     * 跨品牌设备绑定情况月份切换函数
     */
    $scope.brandBoundChange = function(id) {
        var arr = []
        arr[0] = $scope.brandBoundObj[id].already_binding
        arr[1] = $scope.brandBoundObj[id].difficulty_binding
        arr[2] = $scope.brandBoundObj[id].one_binding
        $scope.data = arr
    }
})

/**
 * 扫码与分享控制器
 */
app.controller("scanShareController", function($scope, $log, $http) {

    /**
     * 获取扫码与绑定
     */
    function arrToObject(arr) {
        var paramobj = {};
        arr.forEach(function(v, i) {
            paramobj[v.id] = v;
        })
        return paramobj
    }
    $http({
        method: "get",
        url: $scope.ROOTURL + '/analysis/scanshare',
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $scope.scanShareArr = req.data.retBody
        $scope.scanShareObj = arrToObject(req.data.retBody)
        var arr = []
        arr[0] = $scope.scanShareArr[$scope.scanShareArr.length - 1].scan_binding
        arr[1] = $scope.scanShareArr[$scope.scanShareArr.length - 1].share_binding
        $scope.scannum = Array.from({ length: arr[0] }, (n, i) => i);
        $scope.sharenum = Array.from({ length: arr[1] }, (n, i) => i);
    })
    $scope.scanShareChange = function(id) {
        var arr = []
        arr[0] = $scope.scanShareObj[id].scan_binding
        arr[1] = $scope.scanShareObj[id].share_binding
        $scope.scannum = Array.from({ length: arr[0] }, (n, i) => i);
        $scope.sharenum = Array.from({ length: arr[1] }, (n, i) => i);
    }

})