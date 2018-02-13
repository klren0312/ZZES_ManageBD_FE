 app.directive('equipmentAnalysis', function() {
     return {
         scope: {
             id: "@",
             equipdata: "="
         },
         restrict: 'E',
         template: '<div class="equipment-analysis-charts"></div>',

         link: function($scope, element, attrs, controller) {
             console.log($scope.equipdata)
             var option = {
                 color: ['#9966FF', '#0099FF'],
                 // 提示框，鼠标悬浮交互时的信息提示  
                 tooltip: {
                     show: true,
                     trigger: 'item'
                 },
                 // 图例  
                 legend: {
                     data: ['在线设备', '活跃设备']
                 },
                 // 横轴坐标轴  
                 xAxis: [{
                     type: 'category',
                     data: $scope.equipdata.date
                 }],
                 // 纵轴坐标轴  
                 yAxis: [{
                     type: 'value'
                 }],
                 // 数据内容数组  
                 series: [{
                     name: '在线设备',
                     type: 'line',
                     data: $scope.equipdata.newEquip
                 }, {
                     name: '活跃设备',
                     type: 'line',
                     data: $scope.equipdata.activeEquip
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });