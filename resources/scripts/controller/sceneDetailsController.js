app.controller('sceneDetailsController', function($scope, $log, $state, $http, $stateParams) {
    $scope.goback = function() {
        $state.go("sceneManage")
    }

    //获取到传来的场景id
    var data = $stateParams.sceneid;
    $log.log(data)



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
     * @brief 获取场景详情数据
     * 
     */
    var scenelisturl = $scope.ROOTURL + '/scene/scenedetaillist';
    $http({
        method: 'get',
        url: scenelisturl,
        headers: {
            "content-type": "application/json",
            "AccessToken": $scope.AccessToken
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $scope.scenes = req.data.retBody
        $log.log("devDetails:")
        var myarr = req.data.retBody
        $log.log(myarr)
        var myobj = arrToObject(myarr)
        $log.log("转化后的对象：")
        $log.log(myobj)

        // 场景名称
        $scope.scenename = myobj[data].name
            //整体数组
        $scope.sceneDetails = myobj[data].ruleGroupDetailList
        $log.log("whole arr")
        $log.log($scope.sceneDetails)

    })

    //请求大类
    var cateurl = $scope.ROOTURL + '/scene/devicecategory';
    $http({
        method: "get",
        url: cateurl,
        headers: {
            "content-type": "application/json",
            "AccessToken": $scope.AccessToken
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("category:")
        $log.log(req.data.retBody.DeviceCategory)
        $scope.categorys = req.data.retBody.DeviceCategory
    })

    /**
     * @brief 根据大类来获取设备列表
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
                "AccessToken": $scope.AccessToken
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("devicedefinition:")
            $log.log(req.data.retBody.DeviceDefinitionList)
            $scope.devicedefinitions = req.data.retBody.DeviceDefinitionList
        })
    }

    /**
     * @brief 设备选择后触发函数
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
                "AccessToken": $scope.AccessToken
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("devdetails:")
            $log.log(req.data.retBody.DeviceDetail.properties)
            $scope.devicedetails = req.data.retBody.DeviceDetail.properties
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
        if ($scope.type === "int") {

            $scope.data_ranges = JSON.parse(x.dataRange)
        } else {
            $scope.data_ranges = eval(x.dataRange)
        }
        $log.log($scope.data_ranges)
    }

    // 条件相关处理
    $scope.judges = []
    var judgesarr = $scope.judges
    $scope.judgelen = judgesarr.length

    /**
     * @brief 条件添加按钮点击事件
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
        if ($scope.type == "int") {
            var databody = '{"groupId":' + $scope.sceneGroupId + ',"triggerRule":{"parameter":"' + $scope.parameter + '","operator":"' + $scope.selectvalue + '","value":"' + $scope.theSelectValue + '","desp":"' + $scope.selectText + '","definitionId":' + $scope.devdefinitionid + '}}'
        } else {
            var databody = '{"groupId":' + $scope.sceneGroupId + ',"triggerRule":{"parameter":"' + $scope.parameter + '","operator":"0","value":"' + $scope.selectvalue + '","desp":"' + $scope.selectText + '","definitionId":' + $scope.devdefinitionid + '}}'
        }
        $log.log(databody)
        $http({
            method: "post",
            url: judgeurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": $scope.AccessToken
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            console.log(req)
            if (req.data.retCode === "0001") {
                $state.reload()
            }
        })
    }

    // 动作相关处理
    $scope.actions = []
    var actionarr = $scope.actions
    $scope.actionlen = actionarr.length

    /**
     * @brief 动作添加按钮点击事件
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
        if ($scope.type == "int") {
            var databody = '{"groupId":' + $scope.sceneGroupId + ',"deviceAction":{"parameter":"' + $scope.parameter + '","operator":"' + $scope.selectvalue + '","value":"' + $scope.theSelectValue + '","delay":"00","definitionId":' + $scope.devdefinitionid + '}}'
        } else {
            var databody = '{"groupId":' + $scope.sceneGroupId + ',"deviceAction":{"parameter":"' + $scope.parameter + '","operator":"0","value":"' + $scope.selectvalue + '","delay":"00","definitionId":' + $scope.devdefinitionid + '}}'
        }
        $log.log("action:")
        $log.log(databody)
        $http({
            method: "post",
            url: actionurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": $scope.AccessToken
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            console.log(req)
            if (req.data.retCode === "0001") {
                $state.reload()
            }
        })
    }

    /**
     * @brief 回收变量
     * 
     * @param x 场景规则组id
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
     * @brief 删除场景
     * data 为当前场景id，是全局变量
     */
    $scope.deleteScene = function() {
        var delsceneurl = $scope.ROOTURL + "/scene/delscene/" + data
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
                $state.reload()
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
                $state.reload()
            } else {
                alert("DEL ERROR")
            }
        })
    }

    /**
     * 新增场景组功能
     */
    $scope.addSceneGroup = function() {
        var addSceneGroupurl = $scope.ROOTURL + '/scene/createrulegroup'
        var databody = '{"sceneId":' + data + ',"triggerRuleGroup":{"desp":"' + $scope.sceneGroupDesc + '","isDefault":' + $scope.selectDefault + '}}'
        $http({
            method: "post",
            url: addSceneGroupurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": $scope.AccessToken
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req.data.retBody.ruleGroup.id)
            if (req.data.retCode === "0001") {
                $state.reload()
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
                "AccessToken": $scope.AccessToken
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req)
            $state.reload()
        })
    }
})