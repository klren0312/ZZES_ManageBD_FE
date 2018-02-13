 app.directive('equipmentCoverage', function() {
     return {
         scope: {
             id: "@",
             data: "="
         },
         restrict: 'E',
         template: '<div class="equipment-coverage-map"></div>',
         replace: true,
         link: function($scope, element, attrs, controller) {
             var option = {
                 color: [''],
                 title: {
                     text: '',
                     left: 'center'
                 },
                 tooltip: {
                     trigger: 'item'
                 },
                 visualMap: {
                     min: 0,
                     max: 2500,
                     left: 'left',
                     top: 'bottom',
                     text: ['高', '低'], // 文本，默认为数值文本
                     calculable: true
                 },
                 series: [{
                     name: 'alltheChina',
                     type: 'map',
                     mapType: 'china',
                     roam: false,
                     label: {},
                     data: $scope.data,
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });