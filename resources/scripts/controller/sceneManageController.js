app.controller('sceneManageController', function($scope, $log, $http, $state) {
    $scope.addScene = function() {
            $state.go("addScene");
        }
        /**
         * @brief 跳转到场景详情
         * @param 场景id
         */
    $scope.watchDetails = function(x) {
            $log.log("in the watch")
            $state.go("sceneDetails", {
                sceneid: x
            }, {
                reload: true
            });
        }
        //请求场景列表
    var scenelisturl = $scope.ROOTURL + '/scene/scenedetaillist';
    $http({
        method: 'get',
        url: scenelisturl,
        headers: {
            "content-type": "application/json",
            "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log(req.data.retBody)
        $scope.scenes = req.data.retBody
    })

    /**
     * @brief 删除场景
     * @param id 场景id
     */
    $scope.deleteScene = function(id) {
        $log.log("delok" + id)
        var delsceneurl = $scope.ROOTURL + "/scene/delscene/" + id
        $http({
            method: "delete",
            url: delsceneurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode === "0001") {
                $state.reload()
            }
        })
    }

    /**
     * @brief 获取场景id
     * 
     * @param x 场景id
     */
    $scope.setId = function(x) {
        $log.log(x)
        $scope.sceneId = x
    }
})