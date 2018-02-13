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
app.controller("createMemberController", function($scope, $http, $log, $state) {
    $scope.goback = function() {
            $state.go("memberManage");
        }
        // 请求角色下拉
    $scope.getAllRole = function() {
            var roleurl = $scope.ROOTURL + "/member/role/choices";
            $http({
                method: "get",
                url: roleurl,
                headers: {
                    "content-type": "application/json"
                },
                withCredentials: true //!跨域带cookies
            }).then(function(req) {
                $log.log("role:")
                $log.log(req)
                $scope.roles = req.data.retBody.retBody
            })
        }
        // 保存操作
    $scope.save = function() {
        var saveurl = $scope.ROOTURL + '/member/insert'
        var databody = '{"Role": "' + $scope.memberrole.role + '","UserName": "' + $scope.memberlogin + '","Realname":"' + $scope.membername + '","Email":"' + $scope.memberemail + '","Phone":"' + $scope.memberphone + '","Password":"' + $scope.memberpwd + '"}'
        $http({
            method: "post",
            url: saveurl,
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("save:")
            $log.log(req)
            if (req.data.retCode === "0001") {
                $state.error = false
                $scope.errorinfo = ""
                $state.go("memberManage")
            } else {
                $scope.error = true
                $scope.errorinfo = "参数不可为空";
            }
        })
    }
    $scope.getAllRole()
})
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
app.controller("createRoleController", function($scope, $log, $http, $state) {
    $scope.goback = function() {
        $state.go("roleManage");
    }

    // 权限保存
    $scope.save = function() {
        var saveurl = $scope.ROOTURL + '/role/insert'

        function createRole() {
            var databody = '{"Role": "' + $scope.rolename + '","Description":"' + $scope.roledescription + '","permissionId":[' + $scope.result + ']}';
            $log.log(databody)
            $http({
                method: "post",
                url: saveurl,
                headers: {
                    "content-type": "application/json"
                },
                data: databody,
                withCredentials: true //!跨域带cookies
            }).then(function(req) {
                $log.log('save:')
                $log.log(req)
                if (req.data.retCode === "0001") {
                    $state.go("roleManage")
                } else {
                    $scope.inputError = true
                    $scope.errorinfo = req.data.retInfo;
                }
            })
        }

        createRole()

    }

    // 树状图设置
    // 多选框全选功能 
    $scope.selectAll = function() {
        if ($scope.selectedAll) {

            $scope.result = [] //先清空数组
            $scope.allcheck(true)

            // 将所有序号填入result数组中
            $scope.result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        } else {
            // 取消选择，则清空数组
            $scope.result = []
            $scope.allcheck(false)
            $scope.selected = false;
        }
    }

    // 选择框
    $scope.result = [];
    $scope.select = function(id, event) {
        console.log(id)
        console.log(action)

        var action = event.target;
        if (action.checked) {
            if ($scope.result.indexOf(id) == -1) {
                $scope.result.push(id);
            }
        } else {
            var idx = $scope.result.indexOf(id);
            if (idx != -1) {
                $scope.result.splice(idx, 1);
            }
        }
    }

    //?全部选上或者全部不选择 暂时就这样
    $scope.allcheck = function(check) {
        $scope.select1 = check;
        $scope.select2 = check;
        $scope.select3 = check;
        $scope.select4 = check;
        $scope.select5 = check;
        $scope.select6 = check;
        $scope.select7 = check;
        $scope.select8 = check;
        $scope.select9 = check;
        $scope.select10 = check;
    }
})
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
app.controller("equipmentManageController", function($scope, $log, $state, $http) {

    $scope.reset = function() {
        $scope.keywords = ""
        $scope.area = ""
        $scope.product = ""
        $scope.platform = ""
        $scope.status = ""
        $scope.online = ""
    }
    $scope.data
    var url = $scope.ROOTURL + "/devices"
    $http({
        method: 'get',
        url: url,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $scope.personinfos = req.data.retBody.data.platforms

        // 设置分页相关数据
        $scope.setPage($scope.personinfos)
    })
    $scope.search = function() {
        var url = $scope.ROOTURL + "/devices?keyword=" + $scope.product + "&page=0&pageSize=10"
        $http({
            method: 'get',
            url: url,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $scope.personinfos = req.data.retBody.data.platforms

            // 设置分页相关数据
            $scope.setPage($scope.personinfos)
        })
    }

    // 多选框全选功能 
    $scope.selectAll = function() {
        if ($scope.selectedAll) {
            $scope.selected = true
        } else {
            $scope.selected = false
        }
    }

    // 查看详情
    $scope.watchDetails = function(x) {
        // $log.log(x)
        $state.go("equipmentDetails", {
            id: x
        }, {
            reload: true
        })
    }



    // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
        console.log(event)
        console.log(action)

        var action = event.target;
        if (action.checked) {
            if ($scope.result.indexOf(id) == -1) {
                $scope.result.push(id);
            }
        } else {
            var idx = $scope.result.indexOf(id);
            if (idx != -1) {
                $scope.result.splice(idx, 1);
            }
        }
    }

    /**
     * 选择导出excel
     * 
     * @param paramFilter 选择参数数组
     */
    $scope.exportExcel = function(paramFilter) {
        var option = {}
        option.fileName = '设备列表'
        option.datas = [{
            sheetData: $scope.personinfos,
            sheetName: 'sheet',
            sheetFilter: paramFilter,
            sheetHeader: paramFilter,
        }]
        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }

    //整体导出
    $scope.allexport = ['udeviceId', 'fkPlatid', 'DeviceName', 'ModelID', 'NetMode', 'deviceStatus']


})
app.controller("equipmentMapController", function($scope, $log) {
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 14,
        center: [118.302726, 32.222777]
    });

    //坐标点数组，坐标+说明
    var lnglats = [
        { "position": [118.301724, 32.221402], "product": "欧科" },
        { "position": [118.301681, 32.221334], "product": "小明灯" },
        { "position": [118.301917, 32.221647], "product": "凡家" },
        { "position": [118.30233, 32.221389], "product": "空净一号机" },
        { "position": [118.301799, 32.221112], "product": "科瑞报警主机" },
        { "position": [118.301949, 32.221271], "product": "萤石探测器网关" },
        { "position": [118.302147, 32.221507], "product": "智能窗帘" },
        { "position": [118.301643, 32.221616], "product": "智能开窗器" },
        { "position": [118.302244, 32.22138], "product": "智能升降衣架" },
        { "position": [118.301648, 32.221212], "product": "智能门铃" },
        { "position": [118.30174, 32.221316], "product": "净水器" },
        { "position": [118.302239, 32.221393], "product": "全向红外中继器" },
        { "position": [118.301713, 32.221484], "product": "单向红外中继器" },
        { "position": [118.301729, 32.221371], "product": "扬子空调" }
    ];
    var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -20) });
    //轮询标点
    for (var i = 0, marker; i < lnglats.length; i++) {
        console.log(lnglats[i].position)
        var marker = new AMap.Marker({
            position: lnglats[i].position,
            map: map
        });
        marker.content = lnglats[i].product;
        marker.on('click', markerClick);
        marker.emit('click', { target: marker });
    }

    function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
    }
    map.setFitView();
})
app.controller("faultRecordController", function($scope, $log) {
    $("#date1").datetimepicker()
    $("#date2").datetimepicker()

    // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
        console.log(event)
        console.log(action)

        var action = event.target;
        if (action.checked) {
            if ($scope.result.indexOf(id) == -1) {
                $scope.result.push(id);
            }
        } else {
            var idx = $scope.result.indexOf(id);
            if (idx != -1) {
                $scope.result.splice(idx, 1);
            }
        }
    }

    /**
     * 选择导出excel
     * TODO:等待接口
     * @param paramFilter 选择参数数组
     */
    // $scope.exportExcel = function(paramFilter) {
    //     var option = {}
    //     option.fileName = '设备列表'
    //     option.datas = [{
    //         sheetData: $scope.personinfos,
    //         sheetName: 'sheet',
    //         sheetFilter: paramFilter,
    //         sheetHeader: paramFilter,
    //     }]
    //     var toExcel = new ExportJsonExcel(option);
    //     toExcel.saveExcel();
    // }

    //整体导出
    $scope.allexport = ['udeviceId', 'fkPlatid', 'DeviceName', 'ModelID', 'NetMode', 'deviceStatus']

})
app.controller("feedbackController", function($scope, $http, $log) {
    $scope.msgManages = [{}];

    $scope.sendMsg = function() {
        $log.log("in push");
        var date = new Date().toLocaleString();
        $scope.msgManages.push({
            msgheader: $scope.pushHeader,
            msgcontent: $scope.pushContent,
            pushobject: $scope.pushObject,
            pushtime: date
        })
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
        $scope.startDate = picker.startDate.format('YYYY-MM-DD')
        $scope.endDate = picker.endDate.format('YYYY-MM-DD')
        $log.log($scope.startDate)
        $log.log($scope.endDate)
    });
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });


    // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
        console.log(event)
        console.log(action)

        var action = event.target;
        if (action.checked) {
            if ($scope.result.indexOf(id) == -1) {
                $scope.result.push(id);
            }
        } else {
            var idx = $scope.result.indexOf(id);
            if (idx != -1) {
                $scope.result.splice(idx, 1);
            }
        }
    }

    /**
     * 请求反馈数据
     */

    $scope.feedbacklists = [{
            "updateAt": 1482311744000,
            "LoginName": "zenhome-user-1",
            "Mobile": "18826408880",
            "title": "使用反馈",
            "content": "场景设置非常方便，触发灵敏"
        },
        {
            "updateAt": 1482376194000,
            "LoginName": "zenhome-user-1",
            "Mobile": "18826408881",
            "title": "使用反馈",
            "content": "支持的智能电器很多，很方便"
        },
        {
            "updateAt": 1493973321000,
            "LoginName": "zenhome-user-朱",
            "Mobile": "13717690008",
            "title": "使用反馈",
            "content": "买了很多家电，发现都能接入众家云，好棒"
        },
        {
            "updateAt": 1493973322000,
            "LoginName": "zenhome-user-朱",
            "Mobile": "13717690008",
            "title": "使用反馈",
            "content": "App很方便，可以连接多个品牌设备，操作便利大大提升。"
        },
        {
            "updateAt": 1500627417000,
            "LoginName": "程若红",
            "Mobile": "18855091239",
            "title": "使用反馈",
            "content": "有很多实用的功能，供用户使用"
        },
        {
            "updateAt": 1503970441000,
            "LoginName": "gaowy",
            "Mobile": "18109692808",
            "title": "使用反馈",
            "content": "一个App控制家中所有，很方便"
        }
    ]



    /**
     * 选择导出excel
     * TODO:等待接口
     * @param paramFilter 选择参数数组
     */
    // $scope.exportExcel = function(paramFilter) {
    //     var option = {}
    //     option.fileName = '设备列表'
    //     option.datas = [{
    //         sheetData: $scope.personinfos,
    //         sheetName: 'sheet',
    //         sheetFilter: paramFilter,
    //         sheetHeader: paramFilter,
    //     }]
    //     var toExcel = new ExportJsonExcel(option);
    //     toExcel.saveExcel();
    // }

    //整体导出
    $scope.allexport = ['udeviceId', 'fkPlatid', 'DeviceName', 'ModelID', 'NetMode', 'deviceStatus']
})
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
app.controller('homeController', function($scope, $log, $http) {

    $http({
        method: "get",
        url: $scope.ROOTURL + '/register',
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("all the data:")
        var allArr = req.data.retBody
        var newArr = []
        for (var len = allArr.length, i = len - 1, j = 0; i >= len - 7; i--, j++) {
            newArr[j] = allArr[i]
        }
        console.log(newArr)
        $scope.newEquip = []
        $scope.activeEquip = []

        $scope.newPeo = []
        $scope.activePeo = []
        $scope.allPeo = []

        $scope.upperInfo = []
        $scope.lowerInfo = []
        $scope.allInfo = []

        $scope.date = []
        for (var i = 0; i < 7; i++) {
            /**
             * 设备
             */
            $scope.newEquip[i] = newArr[i].online_device_yesterday
            $scope.activeEquip[i] = newArr[i].active_device_yesterday


            /**
             * 用户
             */
            $scope.newPeo[i] = newArr[i].final_yesterdaynew
            $scope.activePeo[i] = newArr[i].active_user
            $scope.allPeo[i] = newArr[i].final_user

            /**
             * 信息上报下达
             */
            $scope.upperInfo[i] = newArr[i].yesterday_upper_instructions
            $scope.lowerInfo[i] = newArr[i].yesterday_lower__instructions
            $scope.allInfo[i] = parseInt(newArr[i].yesterday_upper_instructions) + parseInt(newArr[i].yesterday_lower__instructions)

            $scope.date[i] = newArr[i].timestamp
        }
        $scope.allEquip = parseInt($scope.newEquip) + parseInt($scope.activeEquip)

        //设备分析所要数据
        //由于数据是从最新到之前，所以要倒序变成之前到最新 reverse()将数组倒序
        // $log.log($scope.date.reverse())
        $scope.equipdata = {}
        $scope.equipdata.newEquip = $scope.newEquip.reverse()
        $scope.equipdata.date = $scope.date.reverse()
        $scope.equipdata.activeEquip = $scope.activeEquip.reverse()
        $log.log($scope.equipdata)

        //用户分析所要数据
        $scope.userdata = {}
        $scope.userdata.newPeo = $scope.newPeo.reverse()
        $scope.userdata.activePeo = $scope.activePeo.reverse()
        $scope.userdata.date = $scope.date.reverse()

        //信息上报所要数据
        $scope.infodata = {}
        $scope.infodata.upperInfo = $scope.upperInfo.reverse()
        $scope.infodata.lowerInfo = $scope.lowerInfo.reverse()
        $scope.infodata.allInfo = $scope.allInfo.reverse()
        $scope.infodata.date = $scope.date.reverse()

    })
})



// 全国设备覆盖情况
app.controller('equipment-coverage', function($scope, $log) {
    $log.log("in the equipment-coverage charts");
    $scope.first = "杭州";
    $scope.firstData = "2930";
    $scope.second = "北京";
    $scope.secondData = "2693";
    $scope.third = "广州";
    $scope.thirdData = "1806";
    $scope.data = [
        { name: '北京', value: 2693 },
        { name: '天津', value: 1000 },
        { name: '上海', value: 1000 },
        { name: '重庆', value: 1000 },
        { name: '河北', value: 1000 },
        { name: '河南', value: 1000 },
        { name: '云南', value: 1000 },
        { name: '辽宁', value: 1000 },
        { name: '黑龙江', value: 1000 },
        { name: '湖南', value: 1000 },
        { name: '安徽', value: 1600 },
        { name: '山东', value: 1000 },
        { name: '新疆', value: 100 },
        { name: '江苏', value: 1500 },
        { name: '浙江', value: 2930 },
        { name: '江西', value: 1000 },
        { name: '湖北', value: 1000 },
        { name: '广西', value: 1000 },
        { name: '甘肃', value: 10 },
        { name: '山西', value: 1000 },
        { name: '内蒙古', value: 1000 },
        { name: '陕西', value: 1000 },
        { name: '吉林', value: 1000 },
        { name: '福建', value: 1000 },
        { name: '贵州', value: 1000 },
        { name: '广东', value: 1806 },
        { name: '青海', value: 10 },
        { name: '西藏', value: 10 },
        { name: '四川', value: 1000 },
        { name: '宁夏', value: 10 },
        { name: '海南', value: 1000 },
        { name: '台湾', value: 1000 },
        { name: '香港', value: 1000 },
        { name: '澳门', value: 1000 }
    ];
})

// 接入设备类目占比
app.controller('percentage-equipment', function($scope, $log) {
    $log.log("in the percentage-equipment charts");
    $scope.data = [
        { value: 1548, name: '安防' },
        { value: 310, name: '影院' },
        { value: 234, name: '照明' },
        { value: 135, name: '暖通空调' },
        { value: 334, name: '对讲' }
    ];

})

// percentage-usershare
// 用户分享占比
app.controller('percentage-usershare', function($scope, $log) {
    $log.log("in the percentage-usershare charts");
    $scope.data = [3398, 2091];

})
app.controller("indexCtrl", function($scope, $http, $log, $state, Excel, $timeout, $cookies) {

    //*url封装119.29.144.39
    $scope.ROOTURL = "http://127.0.0.1:8083/console"
    // $scope.ROOTURL = "http://119.29.144.39:8083/console"
   

    //*获取AccessToken
    $scope.AccessToken = localStorage.getItem("AccessToken");
  
    /**
     * 请求角色数据
     */
    $http({
        method: "get",
        url: $scope.ROOTURL + '/admin/show',
        headers: {
            "AccessToken": $scope.AccessToken
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $scope.Name = req.data.retBody.Name
        localStorage.setItem("roleName", $scope.Name)
    })

    
    // 用于页头显示
    $scope.username = localStorage.getItem('username');
    //退出登录点击事件
    $scope.logout = function() {
        $scope.logouthttp();
    }

    // localStorage.setItem("AccessToken", "test")
    //*判断是否登录
    //?通过AccessToken 
    if (localStorage.getItem("AccessToken")) {
        $scope.userCheck = true;
        $log.log("ok?");
    } else {
        $log.log("no?");
        $scope.userCheck = false;
        alert("请登录");
        location.href = "login.html";
    }

    /**
     * 
     * HTTP请求登出api
     * 从localStroage中获取AccessToken，添加到请求头中
     */
    $scope.logouthttp = function() {
        var AccessToken = localStorage.getItem("AccessToken");
        // 封装信息
        var databody = '{"Header":{"AccessToken":"' + AccessToken + '"},"Body":{}}';
        $log.log("退出信息：" + databody);
        $http({
            method: 'post',
            url: $scope.ROOTURL + '/admin/logout',
            data: databody,
            headers: { "content-type": "application/json" },
            withCredentials: true //!跨域带cookies
        }).then(function(data) {
            $log.log("退出登录状态码:" + data.data.retCode);
            if (data.data.retCode === "0010") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("AccessToken");
                localStorage.removeItem("roleName");
                window.location.href = 'login.html';
            }
        })
    }

    /**
     * EXCEL导出功能
     */
    $scope.exportToExcel = function(tableId, sheetname) {
        $log.log("excel开始生成");
        var exportHref = Excel.tableToExcel(tableId, sheetname);
        $timeout(function() {
            location.href = exportHref;
        }, 100);
    }

    /**
     * 分页函数
     * 传入数据数组
     */
    $scope.setPage = function(databody) {
        $scope.pageSize = 10;
        $scope.pages = Math.ceil(databody.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > $scope.pageSize ? $scope.pageSize : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        // 设置表格数据源
        $scope.setData = function() {
            // 通过当前页数筛选出表格当前显示数据
            $scope.items = databody.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize))
        }
        $scope.items = databody.slice(0, $scope.pageSize);
        // 分页数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        /**
         * 
         *  打印当前选中页的索引
         */
        $scope.selectPage = function(page) {
            // 不能小于1，大于最大值
            if (page < 1 || page > $scope.pages) return;
            // 最多显示5个分页
            if (page > 2) {
                // 因为只显示5个页数，大于2页开始分页转换
                var newPageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newPageList.push(i + 1);
                }
                $scope.pageList = newPageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            // $log.log("选择的页：" + page);
        };
        // 设置选中页样式
        $scope.isActivePage = function(page) {
            return $scope.selPage == page;
        };
        // 上一页点击事件
        $scope.Previous = function() {
                $scope.selectPage($scope.selPage - 1);
            }
            // 下一页点击事件
        $scope.Next = function() {
            $scope.selectPage($scope.selPage + 1);
        }
    }

})
app.controller("memberDetailsController", function($scope, $state, $log, $http, $stateParams) {
    $scope.goback = function() {
        $state.go("memberManage");
    }
    var data = $stateParams.member
    $log.log(data)

    //请求成员信息
    $scope.getMemberInfo = function() {
            var memberurl = $scope.ROOTURL + "/member/select/" + data;
            $http({
                method: "get",
                url: memberurl,
                headers: {
                    "content-type": "application/json"
                }
            }).then(function(req) {
                $log.log("member:")
                $log.log(req)
                var info = req.data.retBody
                $scope.defaultrole = info.Name
                $scope.memberlogin = info.UserName
                $scope.memberpwd = info.Password
                $scope.membername = info.Realname
                $scope.memberphone = info.Phone
                $scope.memberemail = info.Email
                $scope.registdate = info.reportTime
                $scope.logindate = info.recentTime
            })
        }
        // 请求角色下拉
    $scope.getAllRole = function() {
        var roleurl = $scope.ROOTURL + "/member/role/choices";
        $http({
            method: "get",
            url: roleurl,
            headers: {
                "content-type": "application/json"
            }
        }).then(function(req) {
            $log.log("role:")
            $log.log(req)
            $scope.roles = req.data.retBody.retBody
        })
    }


    //FIXME:保存信息 权限暂时为固定值
    $scope.save = function() {
        var saveurl = $scope.ROOTURL + "/member/update"
            /**
             * 判断角色是否为空
             * 若为空则为当前角色
             * 若不为空则为选择的角色
             */
        if ($scope.memberrole == undefined) {
            $scope.role = $scope.defaultrole;
        } else {
            $scope.role = $scope.memberrole.role
        }

        var databody = '{"Header":{},"Body":{"Role": "' + $scope.role + '","UserName": "' + $scope.memberlogin + '","Password": "' + $scope.memberpwd + '","Realname": "' + $scope.membername + '","Phone": "' + $scope.memberphone + '","Email": "' + $scope.memberemail + '"}}'
        $http({
            method: "put",
            url: saveurl,
            header: {
                "content-type": "application/json"
            },
            data: databody
        }).then(function(req) {
            $log.log("member:")
            $log.log(req)
            if (req.data.retCode) {
                $state.go("memberManage")
            }
        })
    }

    $scope.getAllRole()
    $scope.getMemberInfo()

})
app.controller("memberManageController", function($log, $scope, $state, $http) {
    $scope.create = function() {
            $state.go("createMember");
        }
        /**
         * 参数传递
         * x --- 电话号码
         */
    $scope.see = function(x) {
        $log.log(x);
        // var jsonStr = angular.toJson(x)
        // $log.log("json" + jsonStr)
        $state.go("memberDetails", {
            member: x
        }, {
            reload: true
        })
    }

    // 多选框全选功能
    $scope.selectAll = function() {
            if ($scope.selectedAll) {
                $scope.result = [] //先清空数组
                $scope.selected = true;
                // 将所有序号循环到result数组中
                for (var i = 0, len = $scope.memberManages.users.length; i < len; i++) {
                    $scope.result.push($scope.memberManages.users[i].uid);
                }
            } else {
                // 取消选择，则清空数组
                $scope.result = []
                $scope.selected = false;
            }
        }
        // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
            console.log(event)
            console.log(action)

            var action = event.target;
            if (action.checked) {
                if ($scope.result.indexOf(id) == -1) {
                    $scope.result.push(id);
                }
            } else {
                var idx = $scope.result.indexOf(id);
                if (idx != -1) {
                    $scope.result.splice(idx, 1);
                }
            }
        }
        // 删除成员
    $scope.delete = function(result) {
            var delurl = $scope.ROOTURL + '/member/delete';
            $log.log(result)
            var databody = '{"ids":[' + result + ']}'
                // var databody = '{"ids":[7]}'
                // "ids":["7"]
            $log.log(databody);
            $http({
                method: "delete",
                url: delurl,
                headers: {
                    "content-type": "application/json"
                },
                data: databody,
                withCredentials: true //!跨域带cookies
            }).then(function(req) {
                $log.log("del:")
                $log.log(req);
                if (req.data.retCode === "0001") {
                    $state.reload();
                }
            })
        }
        // FIXME:请求成员列表 AccessToken暂时为固定值
    var memberurl = $scope.ROOTURL + "/member?audit=0&page=0&pageSize=10";
    $http({
        method: "get",
        url: memberurl,
        headers: {
            "content-type": "application/json",
            "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log("member: ");
        $log.log(req)
        var member = req.data.retBody
        $scope.memberManages = member
        $scope.setPage($scope.memberManages.users)
    })


})
app.controller("msgDetailsController", function($scope, $log, $state) {
    $scope.goback = function() {
        $state.go("msgManage");
    }
})
app.controller("msgManageController", function($scope, $log) {
    $scope.msgManages = [{}];
    //时间组件
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ' + picker.endDate.format('YYYY-MM-DD'));
        $scope.startDate = picker.startDate.format('YYYY-MM-DD')
        $scope.endDate = picker.endDate.format('YYYY-MM-DD')
        $log.log($scope.startDate)
        $log.log($scope.endDate)
    });
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

    $scope.sendMsg = function() {
        $log.log("in push");
        var date = new Date().toLocaleString();
        $scope.msgManages.push({
            msgheader: $scope.pushHeader,
            msgcontent: $scope.pushContent,
            pushobject: $scope.pushObject,
            pushtime: date
        })
    }

    $("#left").datetimepicker();
    $("#right").datetimepicker();
})
app.controller('personManageController', function($scope, $state, $http, $log) {
    $scope.id = 1;
    var personurl = $scope.ROOTURL + "/users";
    $http({
        method: "get",
        url: personurl,
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $log.log(req.data.retBody.uUserList)
        $scope.personinfos = req.data.retBody.uUserList;
        $scope.setPage($scope.personinfos)
    })

    $scope.search = function() {
        var personurl = $scope.ROOTURL + "/users?keyword=阿门&page=0&pageSize=10";
        $http({
            method: "get",
            url: personurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log(req.data.retBody.uUserList)
            $scope.personinfos = req.data.retBody.uUserList;
            $scope.setPage($scope.personinfos)
        })
    }

    // 重置函数
    $scope.reset = function() {
        $scope.keywords = "";
        $scope.area = "";
        $scope.sex = "";
        $scope.devicebind = "";
        $scope.liveness = "";

    }

    // 多选框全选功能 
    $scope.selectAll = function() {
        if ($scope.selectedAll) {
            $scope.selected = true;
        } else {
            $scope.selected = false;
        }
    }

    /**
     * 查看详细
     * @param x 用户id
     */
    $scope.watchDetails = function(x) {
        $log.log("id" + x)
        $state.go("userDetails", {
            id: x
        }, {
            reload: true
        })
    }

    // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
        console.log(event)
        console.log(action)

        var action = event.target;
        if (action.checked) {
            if ($scope.result.indexOf(id) == -1) {
                $scope.result.push(id);
            }
        } else {
            var idx = $scope.result.indexOf(id);
            if (idx != -1) {
                $scope.result.splice(idx, 1);
            }
        }
    }

    /**
     * 选择导出excel
     * 
     * @param paramFilter 选择参数数组
     */
    $scope.exportExcel = function(paramFilter) {
        var option = {}
        option.fileName = '用户列表'
        option.datas = [{
            sheetData: $scope.personinfos,
            sheetName: 'sheet',
            sheetFilter: paramFilter,
            sheetHeader: paramFilter,
        }]
        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }

    //整体导出
    $scope.allexport = ['uplatId', 'UserID', 'LoginName', 'Mobile', 'createAt', 'updateAt']
})
app.controller("platformAuditController", function($scope, $http, $log, $state) {
    $state.go("platformAudit.notAudit")
    $scope.showBtn = true

    // 已审核
    $scope.hasAuditBtn = function() {
        $state.go("platformAudit.hasAudit")
        $scope.showBtn = false
    }

    // 未审核
    $scope.notAuditBtn = function() {
        $state.go("platformAudit.notAudit")
        $scope.showBtn = true
    }


    // 删除平台
    $scope.delete = function(result) {
        var delurl = $scope.ROOTURL + '/platforms/delete';
        $log.log(result)
        var databody = '{"ids":[' + result + ']}'
        $log.log(databody);
        $http({
            method: "delete",
            url: delurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": $scope.AccessToken
            },
            withCredentials: true, //!跨域带cookies
            data: databody,
        }).then(function(req) {
            $log.log("del:")
            $log.log(req);
            if (req.data.retCode === "0001") {
                $state.reload();
            } else {
                alert("DEL ERROR")
            }
        })
    }

    // 创建平台
    $scope.createPlatform = function() {
        $state.go("createPlatform")
    }


})

app.controller("notAuditController", function($http, $scope, $log, $state) {
    var platformurl = $scope.ROOTURL + '/platforms/unreviewed'
    $http({
        method: 'get',
        url: platformurl,
        header: {
            "content-type": "application/json",
            "AccessToken": $scope.AccessToken
        },
        withCredentials: true, //!跨域带cookies
    }).then(function(req) {
        $log.log(req.data.retBody.platforms)
        $scope.platforms = req.data.retBody.platforms
        $scope.setPage($scope.platforms)
    })

    //获取到平台id
    $scope.push = function(id) {
        // $log.log("platid:" + id)
        $scope.platid = id
    }

    //审核按钮点击事件
    $scope.auditPlat = function() {
        var auditPlatUrl = $scope.ROOTURL + '/platforms/' + $scope.platid + '/1'
        $http({
            method: "put",
            url: auditPlatUrl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            // $log.log(req.data)
            if (req.data.retCode == '0001') {
                $state.reload()
            }
        })
    }

    // 多选框全选功能 
    $scope.selectAll = function() {
        if ($scope.selectedAll) {
            $scope.result = [] //先清空数组
            $scope.selected = true;
            // 将所有序号循环到result数组中
            for (var i = 0, len = $scope.roleManages.sysRoles.length; i < len; i++) {
                $scope.result.push($scope.roleManages.sysRoles[i].id);
            }
        } else {
            // 取消选择，则清空数组
            $scope.result = []
            $scope.selected = false;
        }
    }

    // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
        console.log(event)
        console.log(action)

        var action = event.target;
        if (action.checked) {
            if ($scope.result.indexOf(id) == -1) {
                $scope.result.push(id);
            }
        } else {
            var idx = $scope.result.indexOf(id);
            if (idx != -1) {
                $scope.result.splice(idx, 1);
            }
        }
    }


    $(".auditbtn").click(function() {
        $(".auditbtn").removeClass('auditbtnactive')
        $(this).addClass('auditbtnactive')
    })

    //查看跳转按钮
    $scope.watchdetails = function(x) {
        $log.log(x)
        $state.go("platformDetails", {
            platformid: x
        }, {
            reload: true
        })
    }
})


app.controller("hasAuditController", function($scope, $log, $http, $state) {
    var platformurl = $scope.ROOTURL + '/platforms'
    $http({
        method: 'get',
        url: platformurl,
        header: {
            "content-type": "application/json"
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        // $log.log(req.data.retBody.platforms)
        $scope.platforms = req.data.retBody.platforms
        $scope.setPage($scope.platforms)
    })

    //获取平台id
    $scope.push = function(id) {
        $scope.platid = id
    }

    //禁用平台
    $scope.banPlat = function() {
        var banurl = $scope.ROOTURL + '/platforms/' + $scope.platid + '/3'
        $http({
            method: "put",
            url: banurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode == "0001") {
                $state.reload()
            }
        })
    }

    //启用平台
    $scope.openPlat = function() {
        var openurl = $scope.ROOTURL + '/platforms/' + $scope.platid + '/2'
        $http({
            method: "put",
            url: openurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            if (req.data.retCode == "0001") {
                $state.reload()
            }
        })
    }

    //查看跳转按钮
    $scope.watchdetails = function(x) {

        $state.go("hasPlatDetails", {
            platformid: x
        }, {
            reload: true
        })
    }
})
app.controller("platformDetailsController", function($scope, $log, $http, $state, $stateParams) {
    // 返回到列表
    $scope.goback = function() {
        $state.go("platformAudit")
    }

    // 获取传来的平台id
    var platformid = $stateParams.platformid
    $log.log("平台id  " + $stateParams.platformid)

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
    // 获取平台详情数据,并显示
    var platformurl = $scope.ROOTURL + "/platforms/unreviewed"
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

    // 删除平台
    $scope.delete = function() {
        var delurl = $scope.ROOTURL + '/platforms/delete';
        $log.log(platformid)
        var databody = '{"ids":["' + platformid + '"]}'
            // "ids":["7"]
        $log.log(databody);
        $http({
            method: "delete",
            url: delurl,
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("del:")
            $log.log(req);
            if (req.data.retCode === "0001") {
                $state.go("platformAudit");
            } else {
                alert("DEL ERROR")
            }
        })
    }

    //保存更新
    $scope.save = function() {
        var updateplaturl = $scope.ROOTURL + '/platforms/update'
            // var databody = '{"Header":{},"Body":{"id":' + platformid + ',"PlatID":"' + $scope.PlatID + '","PlatType":"' + $scope.PlatType + '","PlatURL":"' + $scope.PlatURL + '","PlatPort":"' + $scope.PlatPort + '","PlatName":"' + $scope.PlatName + '","PlatDesc":"' + $scope.PlatDesc + '","Phone":"' + $scope.Phone + '","Email":"' + $scope.Email + '","Linkman":"' + $scope.Linkman + '"}'
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
app.controller("roleDetailsController", function($scope, $state, $log, $http, $stateParams) {
    $scope.goback = function() {
        $state.go("roleManage");
    }
    var data = $stateParams.role;
    // 请求信息
    var roleurl = $scope.ROOTURL + "/role/select/" + data
    $http({
            method: "get",
            url: roleurl,
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("role:")
            $log.log(req);
            var info = req.data.retBody
            var permissions = []
            for (var i = 0, len = info.length; i < len; i++) {
                permissions.push(info[i].permissionId)
            }
            $log.log(permissions)
                // 遍历出权限到数组
            for (i = 0, len = permissions.length; i < len; i++) {
                $scope.oncheck(permissions[i])
                $log.log(permissions[i])
            }
            $scope.rolename = info[0].role
            $scope.roledescription = info[0].description
        })
        // 获取数据库权限 在前端进行勾选
    $scope.oncheck = function(n) {
            $log.log("ok oncheck？")
            switch (n) {
                case "1":
                    $scope.select1 = true;
                    $scope.result.push(1)
                    break;
                case "2":
                    $scope.select2 = true;
                    $scope.result.push(2)
                    break;
                case "3":
                    $scope.select3 = true;
                    $scope.result.push(3)
                    break;
                case "4":
                    $scope.select4 = true;
                    $scope.result.push(4)
                    break;
                case "5":
                    $scope.select5 = true;
                    $scope.result.push(5)
                    break;
                case "6":
                    $scope.select6 = true;
                    $scope.result.push(6)
                    break;
                case "7":
                    $scope.select7 = true;
                    $scope.result.push(7)
                    break;
                case "8":
                    $scope.select8 = true;
                    $scope.result.push(8)
                    break;
                case "9":
                    $scope.select9 = true;
                    $scope.result.push(9)
                    break;
                case "10":
                    $scope.select10 = true;

                    $scope.result.push(10)
                    break;
            }
        }
        //树状图设置
        // 多选框全选功能 
    $scope.selectAll = function() {
            if ($scope.selectedAll) {

                $scope.result = [] //先清空数组
                $scope.allcheck(true)
                    // 将所有序号填入result数组中
                $scope.result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            } else {
                // 取消选择，则清空数组
                $scope.result = []
                $scope.allcheck(false)
                $scope.selected = false;
            }
        }
        // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
            console.log(id)
            console.log(action)

            var action = event.target;
            if (action.checked) {
                if ($scope.result.indexOf(id) == -1) {
                    $scope.result.push(id);
                }
            } else {
                var idx = $scope.result.indexOf(id);
                if (idx != -1) {
                    $scope.result.splice(idx, 1);
                }
            }
        }
        //*保存 
    $scope.save = function() {
        var roleDetailsurl = $scope.ROOTURL + "/role/update";
        var databody = '{"Header":{},"Body":{"role": "' + $scope.rolename + '","description": "' + $scope.roledescription + '","permissionId": [' + $scope.result + ']}}';
        $http({
            method: "put",
            url: roleDetailsurl,
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("details: ");
            $log.log(req)
            if (req.data.retCode === "0001") {
                $state.go("roleManage")
            } else { //打印出错
                $scope.errorinfo = req.data.retInfo;
            }
        })
    }


    //*全部选上或者全部不选择
    $scope.allcheck = function(check) {
        $scope.select1 = check;
        $scope.select2 = check;
        $scope.select3 = check;
        $scope.select4 = check;
        $scope.select5 = check;
        $scope.select6 = check;
        $scope.select7 = check;
        $scope.select8 = check;
        $scope.select9 = check;
        $scope.select10 = check;
    }

})
app.controller("roleManageController", function($state, $scope, $http, $log) {
    $scope.create = function() {
        $state.go("createRole");
    }

    // 查看传参
    $scope.see = function(x) {
        $log.log(x);
        // var jsonStr = angular.toJson(x)
        // $log.log("json:" + jsonStr)
        $state.go("roleDetails", {
            role: x
        }, {
            reload: true
        })
    }

    // 多选框全选功能 
    $scope.selectAll = function() {
        if ($scope.selectedAll) {
            $scope.result = [] //先清空数组
            $scope.selected = true;
            // 将所有序号循环到result数组中
            for (var i = 0, len = $scope.roleManages.sysRoles.length; i < len; i++) {
                $scope.result.push($scope.roleManages.sysRoles[i].id);
            }
        } else {
            // 取消选择，则清空数组
            $scope.result = []
            $scope.selected = false;
        }
    }

    // 获取选择功能
    $scope.result = [];
    $scope.select = function(id, event) {
        console.log(event)
        console.log(action)

        var action = event.target;
        if (action.checked) {
            if ($scope.result.indexOf(id) == -1) {
                $scope.result.push(id);
            }
        } else {
            var idx = $scope.result.indexOf(id);
            if (idx != -1) {
                $scope.result.splice(idx, 1);
            }
        }
    }

    // 删除角色
    $scope.delete = function(result) {
        var delurl = $scope.ROOTURL + '/role/delete';
 
        var databody = '{"ids":["' + result + '"]}'
            // "ids":["7"]
        $log.log(databody);
        $http({
            method: "delete",
            url: delurl,
            headers: {
                "content-type": "application/json"
            },
            data: databody,
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("del:")
            $log.log(req);
            if (req.data.retCode === "0001") {
                getData()
            }
        })
    }
    getData()

    function getData() {
        // FIXME:请求角色列表 AccessToken后期需要获取
        var roleurl = $scope.ROOTURL + "/role?audit=0&page=0&pageSize=10";
        $http({
            method: "get",
            url: roleurl,
            headers: {
                "content-type": "application/json",
                "AccessToken": "eyJhbGciOiJIUzUxMiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiIwMSIsImV4cGlyIjoxNDk4MTE1Nzg3MzgyLCJpc3MiOiIifQ.G_4eRhKHlwsolTcm3hsuEju6H-Zdu1jI7PXjNQOKlA65MQ8ow3KP3Suzpz__qeo_hJhMpT011hwX7_XN5y65jg"
            },
            withCredentials: true //!跨域带cookies
        }).then(function(req) {
            $log.log("role: ");
            $log.log(req.data.retBody.sysRoles)
            var role = req.data.retBody;
            $scope.roleManages = role;
            $scope.setPage($scope.roleManages.sysRoles)
        })
    }


})
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
app.controller('verificationCodeController',function($scope,$http,toastr,$state){
  $scope.VERIFYURL = 'http://119.29.144.39:8083'
  /**
   * 获取验证码
   */
  function getVerification(){
    $http({
      method:'get',
      url:$scope.VERIFYURL + '/verification/select',
    }).then(function(res){
      $scope.setPage(res.data.retBody)
    })
  }
  getVerification()
  /**
   * 创建验证码
   */
  $scope.create = function(){
    if($scope.day === undefined||$scope.day === ''||$scope.day === null){
      toastr.error("错误", "请选择天数！")
    }else{
      $http({
        method:'post',
        url:$scope.VERIFYURL + '/verification/create/'+$scope.day,
        headers:{
          "content-type":"application/json"
        }
      }).then(function(res){
        if(res.data.retInfo === 'fail'){
          toastr.error(res.data.retInfo)
        }else{
          toastr.success("验证码生成成功！")
          getVerification()
        }
      })
    }
  }
 

  /**
   * 获取选择功能
   */
  $scope.result = [];
  $scope.select = function(id, event) {
      var action = event.target;
      if (action.checked) {
          if ($scope.result.indexOf(id) == -1) {
              $scope.result.push(id);
          }
      } else {
          var idx = $scope.result.indexOf(id);
          if (idx != -1) {
              $scope.result.splice(idx, 1);
          }
      }
  }
  /**
   * 删除验证码
   */
  $scope.delete = function(result){
    var databody =  '{"numids":[' + result + ']}'
    console.log(databody)
    $http({
      method:'delete',
      url:$scope.VERIFYURL + '/verification/efficacy/delete',
      headers:{
        "content-type":"application/json"
      },
      data:databody
    }).then(function(res){
      if(res.data.retInfo === 'fail'){
        toastr.error(res.data.retInfo)
      }else{
        toastr.success("验证码删除成功！")
        getVerification()
      }
    })
  }
 

})