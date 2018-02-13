app.controller('addSceneController', function($scope, $http, $log, $state) {
    $scope.goback = function() {
        $state.go("sceneManage")
    }
    $scope.selectDefault = "false"

    /**
     * 
     * 请求大类 
     */
    var cateurl = $scope.ROOTURL + '/scene/devicecategory';
    $http({
        method: "get",
        url: cateurl,
        headers: {
            "content-type": "application/json",
            "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("category:")
        $log.log(req.data.retBody.DeviceCategory)
        $scope.categorys = req.data.retBody.DeviceCategory
    })

    /**
     *  根据大类来获取设备列表
     * @param x 设备类别id
     */
    $scope.changeType = function(x) {
        $log.log(x.id)
        var devdefurl = $scope.ROOTURL + '/scene/devicedefinition/' + x.id
        $http({
            method: "get",
            url: devdefurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("devicedefinition:")
            $log.log(req.data.retBody.DeviceDefinitionList)
            $scope.devicedefinitions = req.data.retBody.DeviceDefinitionList
        })
    }

    /**
     * 设备选择后触发函数
     * @param x 设备id
     */
    $scope.changeDev = function(x) {
        $log.log(x)
        $scope.devdefinitionid = x
        var devdetailurl = $scope.ROOTURL + '/scene/devicedetail/' + x
        $http({
            method: "get",
            url: devdetailurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("devdetails:")
            $scope.devicedetails = req.data.retBody.DeviceDetail.properties
            $log.log($scope.devicedetails)
        })
    }

    /**
     * @brief 参数选择后，动态显示值选项
     * @param x 参数值 
     */
    $scope.changeParam = function(x) {
        $scope.parameter = x.attrName

        $scope.type = x.dataType
        $log.log($scope.type)
        $scope.data_ranges = eval(x.dataRange)
        $log.log($scope.data_ranges)

    }

    // 条件相关处理
    $scope.judges = []
    var judgesarr = $scope.judges
    $scope.judgelen = judgesarr.length

    /**
     * 条件添加按钮点击事件
     */
    $scope.pushJudge = function() {
        var equipment = $scope.category.category + "    " + $scope.devicedefinition.deviceName;
        var value = $scope.devicedetail.attr_name + "    " + $scope.selectvalue;
        $scope.judges.push({
            equipment: equipment,
            value: value
        })
        $scope.judgelen = judgesarr.length + 1
        var judgeurl = $scope.ROOTURL + '/scene/createrule'

        //判断数据类型
        if ($scope.type == "number") {
            var databody = '{"groupId":' + $scope.sceneGroupId + ',"triggerRule":{"parameter":"' + $scope.parameter + '","operator":"' + $scope.selectvalue + '","value":"' + $scope.data_ranges + '","desp":"' + $scope.selectText + '","definitionId":' + $scope.devdefinitionid + '}}'
        } else {
            var databody = '{"groupId":' + $scope.sceneGroupId + ',"triggerRule":{"parameter":"' + $scope.parameter + '","operator":"0","value":"' + $scope.selectvalue + '","desp":"' + $scope.selectText + '","definitionId":' + $scope.devdefinitionid + '}}'
        }

        // $log.log(databody)
        $http({
            method: "post",
            url: judgeurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            console.log(req)
            if (req.data.retCode === "0001") {
                updateScene()
            }
        })
    }

    // 动作相关处理
    $scope.actions = []
    var actionarr = $scope.actions
    $scope.actionlen = actionarr.length

    /**
     *  动作添加按钮点击事件
     */
    $scope.pushAction = function() {
        var equipment = $scope.category.category + "    " + $scope.devicedefinition.deviceName;
        var value = $scope.devicedetail.attr_name + "    " + $scope.selectvalue;
        $scope.actions.push({
            equipment: equipment,
            value: value
        })
        $scope.actionlen = actionarr.length + 1
        var actionurl = $scope.ROOTURL + '/scene/createdeviceaction'
        if ($scope.type == "number") {
            var databody = '{"groupId":' + $scope.sceneGroupId + ',"deviceAction":{"parameter":"' + $scope.parameter + '","operator":"' + $scope.selectvalue + '","value":"' + $scope.datarange + '","delay":"00","definitionId":' + $scope.devdefinitionid + '}}'
        } else {
            var databody = '{"groupId":' + $scope.sceneGroupId + ',"deviceAction":{"parameter":"' + $scope.parameter + '","operator":"0","value":"' + $scope.selectvalue + '","delay":"00","definitionId":' + $scope.devdefinitionid + '}}'
        }

        $log.log("action:" + databody)
        $http({
            method: "post",
            url: actionurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            console.log(req)
            if (req.data.retCode === "0001") {
                updateScene()
            }
        })
    }

    /**
     * 回收变量+获取规则组id
     * 
     * @param x 规则组id
     */
    $scope.clear = function(x) {
        $scope.category = null
        $scope.devicedefinition = null
        $scope.devicedetail = null
        $scope.selectvalue = null

        // 规则组id
        $log.log("sceneGroupId:" + x)
        $scope.sceneGroupId = x
    }

    /**
     * 场景名称保存
     */
    $scope.viewTheAdd = false
    $scope.saveScene = function() {
        var saveSceneUrl = $scope.ROOTURL + '/scene/createscene'
        var databody = '{"name":"' + $scope.scene + '"}'
        $http({
            method: "post",
            url: saveSceneUrl,
            headers: {
                "content-type": "application/json",
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req.data.retCode)
            if (req.data.retCode == "0001") {
                $scope.sceneid = req.data.retBody.scene.id
                $scope.viewTheAdd = true
            } else {
                $log.log("err")
            }
        })
    }

    /**
     * 新增场景组功能
     */

    $scope.addSceneGroup = function() {
        var addSceneGroupurl = $scope.ROOTURL + '/scene/createrulegroup'
        var databody = '{"sceneId":' + $scope.sceneid + ',"triggerRuleGroup":{"desp":"' + $scope.sceneGroupDesc + '","isDefault":' + $scope.selectDefault + '}}'
        $http({
            method: "post",
            url: addSceneGroupurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req.data.retBody.ruleGroup.id)
            if (req.data.retCode === "0001") {

                updateScene()
            }
        })
    }

    /**
     * @brief 删除场景
     * data 为当前场景id，是全局变量
     */
    $scope.deleteScene = function() {
        var delsceneurl = $scope.ROOTURL + "/scene/delscene/" + $scope.sceneid
        $http({
            method: "delete",
            url: delsceneurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode === "0001") {
                $state.go("sceneManage")
            } else {
                alert("DEL ERROR")
            }
        })
    }

    /**
     * @brief 删除条件
     * 
     * @param id 条件id
     */
    $scope.judgesDel = function(id) {
        var deljudgesurl = $scope.ROOTURL + "/scene/delrule/" + id
        $http({
            method: "delete",
            url: deljudgesurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode === "0001") {
                updateScene()
            } else {
                alert("DEL ERROR")
            }
        })

    }

    /**
     * @brief 删除动作
     * 
     * @param id 动作id
     */
    $scope.actionsDel = function(id) {
        var delactionurl = $scope.ROOTURL + "/scene/delaction/" + id
        $http({
            method: "delete",
            url: delactionurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode === "0001") {
                updateScene()
            } else {
                alert("DEL ERROR")
            }
        })
    }

    /**
     * 删除规则组
     * 
     * @param x 规则组id
     * 
     */
    $scope.deleteSceneGroup = function(id) {
        var delSceneGroupurl = $scope.ROOTURL + "/scene/delrulegroup/" + id
        $http({
            method: "delete",
            url: delSceneGroupurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req)
            if (req.data.retCode === "0001") {
                updateScene()
            }
        })
    }

    /**
     * @brief 数组转对象
     * @param 数组
     * @return 对象
     */
    function arrToObject(arr) {
        var paramobj = {};
        arr.forEach(function(v, i) {
            paramobj[v.id] = v;
        })
        return paramobj
    }

    /**
     * 重新载入规则
     * 
     */
    function updateScene() {
        var scenelisturl = $scope.ROOTURL + '/scene/scenedetaillist'
        $http({
            method: "get",
            url: scenelisturl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            var myarr = req.data.retBody
            var myobj = arrToObject(myarr)
            $log.log(myobj[$scope.sceneid])
            $scope.sceneDetails = myobj[$scope.sceneid].ruleGroupDetailList
        })
    }
})