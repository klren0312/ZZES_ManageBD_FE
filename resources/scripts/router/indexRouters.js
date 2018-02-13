app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    // 主页路由 
        .state("home", {
        url: "/home",
        templateUrl: "home.html"
    })

    //平台审核
    .state("platformAudit", {
        url: "/platformAudit",
        templateUrl: "platformAudit.html"
    })

    //已审核平台分页
    .state("platformAudit.hasAudit", {
        url: "/hasAudit",
        templateUrl: "childPages/platformAudit/hasAudit.html"
    })

    //未审核平台分页
    .state("platformAudit.notAudit", {
        url: "/notAudit",
        templateUrl: "childPages/platformAudit/notAudit.html"
    })

    // 平台详情
    .state("platformDetails", {
        url: "/platformDetails/:platformid",
        templateUrl: "platformDetails.html"
    })

    // 已审核平台详情
    .state("hasPlatDetails", {
        url: "/hasPlatDetails/:platformid",
        templateUrl: "hasPlatformDetails.html",
    })

    //创建平台
    .state("createPlatform", {
        url: "/createPlatform",
        templateUrl: "createPlatform.html"
    })

    // 设备管理路由
    .state("equipmentManage", {
        url: "/equipmentManage",
        templateUrl: "equipmentManage.html"
    })

    // 设备详情路由
    .state("equipmentDetails", {
        url: "/equipmentDetails/:id",
        templateUrl: "equipmentDetails.html",
        controller: function($state) {
            $state.go("equipmentDetails.baseinfo")
        }
    })

    // 设备详情下的五个分页路由
    .state("equipmentDetails.baseinfo", {
        url: "/equipbaseinfo",
        templateUrl: "childPages/equipmentDetails/baseinfo.html",
    })

    .state("equipmentDetails.bindinfo", {
        url: "/equipbindinfo",
        templateUrl: "childPages/equipmentDetails/bindinfo.html"
    })

    .state("equipmentDetails.errorinfo", {
        url: "/equiperrorinfo",
        templateUrl: "childPages/equipmentDetails/errorinfo.html"
    })

    .state("equipmentDetails.equipmentlog", {
        url: "/equipmentlog",
        templateUrl: "childPages/equipmentDetails/equipmentlog.html",
        controller: "equipmentlogController"
    })

    .state("equipmentDetails.runanalysis", {
        url: "/runanalysis",
        templateUrl: "childPages/equipmentDetails/runanalysis.html"
    })

    // 数据分析-使用概况路由
    .state("dataUseSurvey", {
        url: "/dataUseSurvey",
        templateUrl: "dataUseSurvey.html"
    })

    // 数据分析-设备分析
    .state("dataEquAnalysis", {
        url: "/dataEquAnalysis",
        templateUrl: "dataEquAnalysis.html"
    })


    // 数据分析-用户分析路由
    .state("dataUserAnalysis", {
        url: "/dataUserAnalysis",
        templateUrl: "dataUserAnalysis.html",
        controller: function($state) {
            $state.go("dataUserAnalysis.newUser")
        }
    })

    // 用户分析五个图表分页路由
    // .state("dataUserAnalysis.newUser", {
    //     url: "/newuser",
    //     templateUrl: "childPages/dataUserAnalysis/newUser.html"
    // })

    // .state("dataUserAnalysis.activeUser", {
    //     url: "/activeuser",
    //     templateUrl: "childPages/dataUserAnalysis/activeUser.html"
    // })

    // .state("dataUserAnalysis.shareUser", {
    //     url: "/shareuser",
    //     templateUrl: "childPages/dataUserAnalysis/shareUser.html"
    // })

    // .state("dataUserAnalysis.timeUser", {
    //     url: "/timeUser",
    //     templateUrl: "childPages/dataUserAnalysis/timeUser.html"
    // })

    // .state("dataUserAnalysis.bindUser", {
    //     url: "/bindUser",
    //     templateUrl: "childPages/dataUserAnalysis/bindUser.html"
    // })

    // 故障记录路由
    .state("faultRecord", {
        url: "/faultRecord",
        templateUrl: "faultRecord.html"
    })

    // 意见反馈路由
    .state("feedback", {
        url: "/feedback",
        templateUrl: "feedback.html"
    })

    // 角色管理路由
    .state("roleManage", {
        url: "/roleManage",
        templateUrl: "roleManage.html"
    })

    // 创建角色路由
    .state("createRole", {
        url: "/createRole",
        templateUrl: "createRole.html"
    })

    // 角色详情路由
    .state("roleDetails", {
        url: "/roleDetails/:role",
        templateUrl: "roleDetails.html"
    })

    // 成员管理路由
    .state("memberManage", {
        url: "/memberManage",
        templateUrl: "memberManage.html"
    })

    // 创建成员路由
    .state("createMember", {
        url: "/createMember",
        templateUrl: "createMember.html"
    })

    // 成员详情路由
    .state("memberDetails", {
        url: "/memberDetails/:member",
        templateUrl: "memberDetails.html"
    })

    //验证码生成路由
    .state("verificationCode", {
        url: "/verificationCode",
        templateUrl: "verificationCode.html"
    })

    // 消息管理路由
    .state("msgManage", {
        url: "/msgManage",
        templateUrl: "msgManage.html"
    })

    // 消息详情路由
    .state("msgDetails", {
        url: '/msgDetails',
        templateUrl: "msgDetails.html"
    })

    // 用户管理路由
    .state("personManage", {
        url: "/personManage",
        templateUrl: "personManage.html"
    })

    // 设备地图路由
    .state("equipmentMap", {
        url: "/equipmentMap",
        templateUrl: "equipmentMap.html"
    })

    // 场景管理路由
    .state("sceneManage", {
        url: "/sceneManage",
        templateUrl: "sceneManage.html"
    })

    // 场景详情路由
    .state("sceneDetails", {
        url: "/sceneDetails/:sceneid",
        templateUrl: "sceneDetails.html"
    })

    // 添加场景路由
    .state("addScene", {
        url: '/addScene',
        templateUrl: "addScene.html"
    })

    // 用户详情路由
    .state("userDetails", {
        url: "/userDetails/:id",
        templateUrl: "userDetails.html",
        controller: function($state) {
            $state.go("userDetails.baseinfo")
        }
    })

    // 用户详情下的5个分页
    .state("userDetails.baseinfo", {
        url: "/baseinfo",
        templateUrl: "childPages/userDetails/baseinfo.html",
    })

    .state("userDetails.bindinfo", {
        url: "/bindinfo",
        templateUrl: "childPages/userDetails/bindinfo.html",
    })

    .state("userDetails.sceneinfo", {
        url: "/sceneinfo",
        templateUrl: "childPages/userDetails/sceneinfo.html",
    })

    .state("userDetails.sharerecord", {
        url: "/sharerecord",
        templateUrl: "childPages/userDetails/sharerecord.html",
    })

    .state("userDetails.aftersale", {
        url: "/aftersale",
        templateUrl: "childPages/userDetails/aftersale.html",
    })

    // $urlRouterProvider.otherwise('/');
})