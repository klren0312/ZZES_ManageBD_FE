app.directive('infoData', function() {
    return {
        scope: {
            id: "@",
            infodata: "="
        },
        restrict: 'E',
        template: '<div class="info-data-charts"></div>',
        replace: true,
        link: function($scope, element, attrs, controller) {
            var option = {
                color: ['#00688B', '#00FF7F'],
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                // 图例  
                legend: {
                    data: ['指令上报', '指令下发']
                },
                // 横轴坐标轴  
                xAxis: [{
                    type: 'category',
                    data: $scope.infodata.date
                }],
                // 纵轴坐标轴  
                yAxis: [{
                    type: 'value'
                }],
                // 数据内容数组  
                series: [{
                    name: '指令上报',
                    type: 'line',
                    data: $scope.infodata.upperInfo
                }, {
                    name: '指令下发',
                    type: 'line',
                    data: $scope.infodata.lowerInfo
                }]
            };
            var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
            myChart.setOption(option);
        }
    }
})