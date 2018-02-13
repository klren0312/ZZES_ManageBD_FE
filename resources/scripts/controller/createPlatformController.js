app.controller("createPlatformController", function($scope, $log, $http, $state) {
    //返回函数
    $scope.goback = function() {
        $state.go("platformAudit")
    }
    $scope.save = function() {
        var createplaturl = $scope.ROOTURL + '/platforms/insert'
        var databody = '{"PlatID":"' + $scope.PlatID + '","PlatType":"' + $scope.PlatType + '","PlatURL":"' + $scope.PlatURL + '","PlatPort":"' + $scope.PlatPort + '","PlatName":"' + $scope.PlatPort + '","PlatDesc":"' + $scope.PlatDesc + '","Phone":"' + $scope.Phone + '","Email":"' + $scope.Email + '","Linkman":"' + $scope.Linkman + '"}'
        $http({
            method: "post",
            url: createplaturl,
            header: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req)
            if (req.data.retCode === "0001") {
                $state.go("platformAudit")
            }
        })
    }
})