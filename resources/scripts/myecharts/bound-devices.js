 app.directive('boundDevices', function() {
     return {
         scope: {
             id: "@",
             data: "="
         },
         restrict: 'E',
         template: '<div class="bound-devices-charts"></div>',
         replace: true,
         link: function($scope, element, attrs, controller) {

             var option = {
                 color: ['#3398DB'],
                 tooltip: {
                     trigger: 'axis',
                     axisPointer: { // 坐标轴指示器，坐标轴触发有效
                         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                     }
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: ['1-3台', '4-6台', '7-9台', '10-12台', '12台以上'],
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                     type: 'value'
                 }],
                 series: [{
                     name: '直接访问',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.data
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
             $scope.$watch('data', function(n, o) {
                 $scope.data = n
                 myChart.setOption({
                     series: [{
                         name: '直接访问',
                         type: 'bar',
                         barWidth: '60%',
                         data: $scope.data
                     }]
                 });
             });
         }
     };
 });