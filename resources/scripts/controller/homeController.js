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