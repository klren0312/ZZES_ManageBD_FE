 app.directive('errorEquipment', function() {
     return {
         scope: {
             id: "@",
             data: "="
         },
         restrict: 'E',
         template: '<div class="error-equipment-charts"></div>',
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
                     data: ['故障设备', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: ['07/20', '07/21', '07/22', '07/23', '07/24', '07/25', '07/26', '07/27'],
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                     type: 'value'
                 }],
                 series: [{
                     name: '故障设备',
                     type: 'bar',
                     barWidth: '60%',
                     data: [323, 112, 323, 422, 111, 523, 233, 432]
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     data: [323, 112, 323, 422, 111, 523, 233, 432]
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });