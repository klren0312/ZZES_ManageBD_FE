 app.directive('percentageUsershare', function() {
     return {
         scope: {
             id: "@",
             data: "="
         },
         restrict: 'E',
         template: '<div class="percentage-usershare-charts"></div>',
         replace: true,
         link: function($scope, element, attrs, controller) {
             var option = {
                 color: ['#3398DB', '#9999FF'],
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
                     data: ['设备', '场景'],
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                     type: 'value'
                 }],
                 series: [{
                     name: '',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.data
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });