 app.directive('percentageEquipment', function() {
     return {
         scope: {
             id: "@",
             data: "="
         },
         restrict: 'E',
         template: '<div class="percentage-equipment-charts"></div>',
         replace: true,
         link: function($scope, element, attrs, controller) {
             var option = {
                 color: ['#1BB2D8', '#038CC4', '#75ABD0', '#AFD6DD', '#1790CF'],
                 tooltip: {
                     trigger: 'item',
                     formatter: "{a} <br/>{b}占比 : {c} ({d}%)"
                 },
                 series: [{
                     name: '',
                     type: 'pie',
                     radius: '55%',
                     center: ['50%', '60%'],
                     data: $scope.data,
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });