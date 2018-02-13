 app.directive('clickFun', function() {
     return {
         scope: {
             id: "@",
             legend: "=",
             item: "=",
             date: "="
         },
         restrict: 'E',
         template: '<div class="click-fun-charts"></div>',
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
                     data: ['点击功能项', '增长率'],
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
                         name: '点击功能项',
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
                     name: '点击功能项',
                     type: 'bar',
                     barWidth: '60%',
                     data: [5, 3, 2, 2, 1, 5, 2]
                 }, {
                     name: '增长率',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: [5, -2, -1, 0, -1, 4, -3]
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });