 app.directive('userAnalysis', function() {
     return {
         scope: {
             id: "@",
             userdata: "="
         },
         restrict: 'E',
         template: '<div class="user-analysis-charts"></div>',
         replace: true,
         link: function($scope, element, attrs, controller) {
             var option = {
                 color: ['#7EC856', '#F9BF00'],
                 // 提示框，鼠标悬浮交互时的信息提示  
                 tooltip: {
                     show: true,
                     trigger: 'item'
                 },
                 // 图例  
                 legend: {
                     data: ['新增用户', '活跃用户']
                 },
                 // 横轴坐标轴  
                 xAxis: [{
                     type: 'category',
                     data: $scope.userdata.date
                 }],
                 // 纵轴坐标轴  
                 yAxis: [{
                     type: 'value'
                 }],
                 // 数据内容数组  
                 series: [{
                     name: '新增用户',
                     type: 'line',
                     data: $scope.userdata.newPeo
                 }, {
                     name: '活跃用户',
                     type: 'line',
                     data: $scope.userdata.activePeo
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });