app.controller("hasPlatformDetailsController", function($scope, $log, $http, $stateParams, $state) {
    // 返回到列表
    $scope.goback = function() {
        $state.go("platformAudit")
    }

    // 获取传来的平台id
    var platformid = $stateParams.platformid
    $log.log("平台id  " + $stateParams.platformid)

    /**
     * @brief 数组转对象
     * @param arr 数组
     * @return paramobj 对象
     */
    function arrToObject(arr) {
        var paramobj = {};
        arr.forEach(function(v, i) {
            paramobj[v.id] = v;
        })
        return paramobj
    }

    // 获取平台详情数据,并显示
    var platformurl = $scope.ROOTURL + "/platforms"
    $http({
        method: "get",
        url: platformurl,
        headers: {
            "content-type": "application/json",
            "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        var arr = req.data.retBody.platforms
        var platobj = arrToObject(arr)
        $log.log(platobj[platformid])
        var data = platobj[platformid]
        $scope.uplatId = data.uplatId
        $scope.PlatID = data.PlatID
        $scope.PlatType = data.PlatType
        $scope.PlatURL = data.PlatURL
        $scope.PlatPort = data.PlatPort
        $scope.PlatName = data.PlatName
        $scope.PlatDesc = data.PlatDesc
        $scope.Linkman = data.Linkman
        $scope.Phone = data.Phone
        $scope.Email = data.Email
    })

    //保存更新
    $scope.save = function() {
        var updateplaturl = $scope.ROOTURL + '/platforms/update'
        var databody = '{"Header":{},"Body":{"id":' + platformid + ',"PlatID":"' + $scope.PlatID + '","PlatType":"' + $scope.PlatType + '","PlatURL":"' + $scope.PlatURL + '","PlatPort":"' + $scope.PlatPort + '","PlatName":"' + $scope.PlatName + '","PlatDesc":"' + $scope.PlatDesc + '","Phone":"' + $scope.Phone + '","Email":"' + $scope.Email + '","Linkman":"' + $scope.Linkman + '"}}'
        $log.log(databody)
        $http({
            method: 'put',
            url: updateplaturl,
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode === "0001") {
                $state.go("platformAudit");
            } else {
                alert("DEL ERROR")
            }
        })
    }
})