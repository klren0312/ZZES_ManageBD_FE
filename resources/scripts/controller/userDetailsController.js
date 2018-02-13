/**
 * NOTE:使用$routeParams获取带参路由的参数
 * ui-router 使用$stateParams来获取带参路由的参数
 */
app.controller('userDetailsController', function($scope, $http, Excel, $log, $timeout, $stateParams, $state) {
    $scope.baseinfo = function() {
        $state.go("userDetails.baseinfo");
    }
    $scope.bindinfo = function() {
        $state.go("userDetails.bindinfo");
    }
    $scope.sceneinfo = function() {
        $state.go("userDetails.sceneinfo");
    }
    $scope.sharerecord = function() {
        $state.go("userDetails.sharerecord");
    }
    $scope.aftersale = function() {
        $state.go("userDetails.aftersale");
    }
    $scope.exportToExcel = function(tableId, sheetname) {
        $log.log("excel开始生成");
        var exportHref = Excel.tableToExcel(tableId, sheetname);
        $timeout(function() {
            location.href = exportHref;
        }, 100);
    }

    /**
     * @brief 数组转对象
     * @param 数组
     * @return 对象
     */
    function arrToObject(arr) {
        var paramobj = {};
        arr.forEach(function(v, i) {
            paramobj[v.LoginName] = v;
        })
        return paramobj
    }

    //获取用户登录名称
    var user = $stateParams.id; //测试是否传值

    /**
     * 获取用户基本信息
     */
    $http({
        method: "get",
        url: $scope.ROOTURL + "/users?keyword=阿门&page=0&pageSize=10",
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        // $log.log(req.data.retBody.uUserList)
        var personArr = req.data.retBody.uUserList;
        var personObj = arrToObject(personArr)
        $scope.userdetails = personObj[user]
    })

    //按钮样式固定
    $(".userdetails-selectbtn").click(function() {
        $(".userdetails-selectbtn").removeClass("userdetails-selectbtn-active")
        $(this).addClass("userdetails-selectbtn-active")
    })

})

/**
 * 基本信息
 */
app.controller("baseinfoController", function($http, $log, $scope, $stateParams) {

})

/**
 * TODO: 关联信息
 * "gizDevId": 8, 
 * "gizUserId": 24,
 * "uuserId": 133
 */
app.controller("binduserinfoController", function($http, $log, $scope) {
    $log.log($scope.userdetails.gizDevBinds)
    $log.log("uplatid" + $scope.userdetails.uplatId)

    /**
     * 请求关联设备
     * @param uplatid,p1,p2,p3
     */
    function getAllBind(arr) {
        var allarr = []
        var j = 0;
        for (var i = 0, len = arr.length; i < len; i++) {

            $http({
                method: "get",
                url: $scope.ROOTURL + '/users/relevance/' + $scope.userdetails.uplatId + '/?giz=' + arr[i].gizDevId,
                headers: {
                    "content-type": "application/json"
                }
            }).then(function(req) {
                allarr[j] = req.data.retBody
                j++
            })
        }
        if (i == arr.length) {
            $log.log(allarr)
            $scope.allBindDevs = allarr
        }
    }
    var bindarr = $scope.userdetails.gizDevBinds
    getAllBind(bindarr)


})

/**
 * 场景信息
 */
app.controller("sceneinfoController", function($log, $http, $scope) {
    $http({
        method: "get",
        url: $scope.ROOTURL + "/scene/scenedetaillist",
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log(req.data.retBody)
        $scope.scenes = req.data.retBody
    })
})

/**
 * TODO: 分享记录
 */

// FIXME: 售后反馈控制器 user信息暂时为固定
app.controller("aftersaleController", function($scope, $http, $log) {
    $scope.user = "12324324234";
    var url = $scope.ROOTURL + '/users/' + $scope.user + '/feedbacks?page=0&pageSize=10'
    $scope.id = 0;
    $http({
        method: 'get',
        url: url,
        headers: { "content-type": "application/json" },
        withCredentials: true //!跨域带cookies
    }).then(function(data) {
        $log.log(JSON.stringify(data));
        // $log.log(data.data.retBody.data.feedbackList);
        $scope.feedbacks = data.data.retBody.data.feedbackList;
        var arr = $scope.feedbacks;
        $scope.len = arr.length;
        $scope.setPage($scope.feedbacks)
    })

})