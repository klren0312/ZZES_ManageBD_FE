 app.directive('outlineEquipment', function() {
     return {
         scope: {
             id: "@",
             offlinedata: "="
         },
         restrict: 'E',
         template: '<div class="outline-equipment-charts"></div>',
         replace: true,
         link: function($scope, element, attrs, controller) {
             var option = {
                 color: ['#46BEF2', '#7E8BC6'],
                 tooltip: {
                     trigger: 'axis',
                     axisPointer: { // 坐标轴指示器，坐标轴触发有效
                         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                     }
                 },
                 legend: {
                     data: ['离线设备', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.offlinedata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '离线设备',
                     },
                     {
                         type: 'value',
                         name: '环比',
                         axisLabel: {
                             formatter: '{value} %'
                         }
                     }
                 ],
                 dataZoom: [{
                     type: 'inside',
                     start: 0,
                     end: 100
                 }, {
                     start: 0,
                     end: 10,
                     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                     handleSize: '80%',
                     handleStyle: {
                         color: '#fff',
                         shadowBlur: 3,
                         shadowColor: 'rgba(0, 0, 0, 0.6)',
                         shadowOffsetX: 2,
                         shadowOffsetY: 2
                     }
                 }],
                 series: [{
                     name: '离线设备',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.offlinedata.offLineDevice
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.offlinedata.offLineDeviceRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
             $scope.$watch('offlinedata', function(newData, oldData) {
                 $scope.offlinedata = newData
                 myChart.setOption({
                     series: [{
                         name: '离线设备',
                         type: 'bar',
                         barWidth: '60%',
                         data: $scope.offlinedata.offLineDevice
                     }, {
                         name: '环比',
                         type: 'line',
                         barWidth: '60%',
                         yAxisIndex: 1,
                         data: $scope.offlinedata.offLineDeviceRatio
                     }]
                 });
             });
         }
     };
 });