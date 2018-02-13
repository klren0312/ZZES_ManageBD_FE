var app = angular.module('myApp', ['ui.router'])

app.controller('myCtrl', function($scope, $state, $log, $http) {

    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    $scope.view = function() {

        var url = "http://test-web.zencloud.net.cn/console/devices?keyword='" + $scope.product + "'&page=0&pageSize=10";
        $log.log("即将发送的数据： " + url); //测试发送的json数据
        $http({
            method: 'GET',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(data) {

            $scope.data = data.data.retBody.data.platforms;
            $log.log("服务器返回的状态数据： " + JSON.stringify($scope.data));
            //分页总数
            $scope.pageSize = 5;
            $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            $scope.pageList = [];
            $scope.selPage = 1;
            //设置表格数据源(分页)
            $scope.setData = function() {
                $scope.equipments = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize)); //通过当前页数筛选出表格当前显示数据
            }
            $scope.equipments = $scope.data.slice(0, $scope.pageSize);
            //分页要repeat的数组
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
            //打印当前选中页索引
            $scope.selectPage = function(page) {
                //不能小于1大于最大
                if (page < 1 || page > $scope.pages) return;
                //最多显示分页数5
                if (page > 2) {
                    //因为只显示5个页数，大于2页开始分页转换
                    var newpageList = [];
                    for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                        newpageList.push(i + 1);
                    }
                    $scope.pageList = newpageList;
                }
                $scope.selPage = page;
                $scope.setData();
                $scope.isActivePage(page);
                console.log("选择的页：" + page);
            };
            //设置当前选中页样式
            $scope.isActivePage = function(page) {
                return $scope.selPage == page;
            };
            //上一页
            $scope.Previous = function() {
                    $scope.selectPage($scope.selPage - 1);
                }
                //下一页
            $scope.Next = function() {
                $scope.selectPage($scope.selPage + 1);
            };

        });
    }
});

app.config(function($stateProvider) {

    $stateProvider
        .state('itDetail', {
            url: '/itDetail/:udeviceId',
            templateUrl: 'itDetail.html',
            controller: 'itDetailCtrl'
        })

});

app.controller('itDetailCtrl', function($scope, $stateParams, $log, $http) {
    $scope.udeviceId = $stateParams.udeviceId;

    var url = "http://test-web.zencloud.net.cn/console/devices/" + $scope.udeviceId + "/base?page=0&pageSize=2";

    $log.log("即将发送的数据： " + url); //测试发送的json数据

    $http({
        method: 'GET',
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(data) {

        $scope.equipment = data.data.retBody.data.map.properties;

        $log.log("服务器返回的状态数据： " + JSON.stringify($scope.equipment));
    })
});