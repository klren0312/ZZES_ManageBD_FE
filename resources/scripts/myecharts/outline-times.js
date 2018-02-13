 app.directive('outlineTimes', function() {
     return {
         scope: {
             id: "@",
             legend: "=",
             date: "=",
             endup: "=",
             endupdifference: "="
         },
         restrict: 'E',
         template: '<div class="outline-times-charts"></div>',
         replace: true,
         link: function($scope, element, attrs, controller) {
             var option = {
                 color: ['#B6A2DE', '#2EC7C9'],
                 tooltip: {
                     trigger: 'axis',
                     axisPointer: { // 坐标轴指示器，坐标轴触发有效
                         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                     }
                 },
                 legend: {
                     data: ['离线次数', '增长率'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.date,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '离线次数',
                     },
                     {
                         type: 'value',
                         name: '增长率',
                         axisLabel: {
                             formatter: '{value} %'
                         }
                     }
                 ],
                 series: [{
                     name: '离线次数',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.endup
                 }, {
                     name: '增长率',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.endupdifference
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });