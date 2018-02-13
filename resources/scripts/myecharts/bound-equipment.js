 app.directive('boundEquipment', function() {
     return {
         scope: {
             id: "@",
             data: "="
         },
         restrict: 'E',
         template: '<div class="bound-euipment-charts"></div>',
         replace: true,
         link: function($scope, element, attrs, controller) {
             var hideStyle = {
                 normal: {
                     color: '#fff', //未完成的圆环的颜色
                     label: {
                         show: false
                     },
                     labelLine: {
                         show: false
                     }
                 },
                 emphasis: {
                     show: false
                 }
             }
             var option = {
                 color: ['#2EC7C9', '#B6A2DE', '#5AB1EF'],
                 backgroundColor: '#fff',
                 legend: {
                     data: ['已绑定多个品牌设备', '跨品牌绑定有点难度', '还是单一品牌绑定'],
                     orient: "vertical",
                     left: "20",
                     top: "15"
                 },
                 series: [{
                     name: 'Line 1',
                     type: 'pie',
                     clockWise: true, //顺时针
                     radius: [120, 140],
                     label: {
                         normal: {
                             show: false,
                             position: 'inside'
                         }
                     },
                     labelLine: {
                         normal: {
                             show: false
                         }
                     },
                     hoverAnimation: false,
                     data: [{
                         value: $scope.data[0],
                         name: '已绑定多个品牌设备'
                     }, {
                         value: 25,
                         name: 'hide',
                         itemStyle: hideStyle
                     }]
                 }, {
                     name: 'Line 2',
                     type: 'pie',
                     clockWise: true, //顺时针
                     radius: [90, 110],
                     label: {
                         normal: {
                             show: false,
                             position: 'inside'
                         }
                     },
                     labelLine: {
                         normal: {
                             show: false
                         }
                     },
                     hoverAnimation: false,
                     data: [{
                         value: $scope.data[1],
                         name: '跨品牌绑定有点难度'
                     }, {
                         value: 35,
                         name: 'hide',
                         itemStyle: hideStyle
                     }]
                 }, {
                     name: 'Line 3',
                     type: 'pie',
                     clockWise: true, //顺时针
                     radius: [60, 80],
                     label: {
                         normal: {
                             show: false,
                             position: 'inside'
                         }
                     },
                     labelLine: {
                         normal: {
                             show: false
                         }
                     },
                     hoverAnimation: false,
                     data: [{
                         value: $scope.data[3],
                         name: '还是单一品牌绑定'
                     }, {
                         value: 45,
                         name: 'hide',
                         itemStyle: hideStyle
                     }]
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
             $scope.$watch('data', function(n, o) {
                 $scope.data = n
                 myChart.setOption({
                     series: [{
                         name: 'Line 1',
                         type: 'pie',
                         clockWise: true, //顺时针
                         radius: [120, 140],
                         label: {
                             normal: {
                                 show: false,
                                 position: 'inside'
                             }
                         },
                         labelLine: {
                             normal: {
                                 show: false
                             }
                         },
                         hoverAnimation: false,
                         data: [{
                             value: $scope.data[0],
                             name: '已绑定多个品牌设备'
                         }, {
                             value: 25,
                             name: 'hide',
                             itemStyle: hideStyle
                         }]
                     }, {
                         name: 'Line 2',
                         type: 'pie',
                         clockWise: true, //顺时针
                         radius: [90, 110],
                         label: {
                             normal: {
                                 show: false,
                                 position: 'inside'
                             }
                         },
                         labelLine: {
                             normal: {
                                 show: false
                             }
                         },
                         hoverAnimation: false,
                         data: [{
                             value: $scope.data[1],
                             name: '跨品牌绑定有点难度'
                         }, {
                             value: 35,
                             name: 'hide',
                             itemStyle: hideStyle
                         }]
                     }, {
                         name: 'Line 3',
                         type: 'pie',
                         clockWise: true, //顺时针
                         radius: [60, 80],
                         label: {
                             normal: {
                                 show: false,
                                 position: 'inside'
                             }
                         },
                         labelLine: {
                             normal: {
                                 show: false
                             }
                         },
                         hoverAnimation: false,
                         data: [{
                             value: $scope.data[2],
                             name: '还是单一品牌绑定'
                         }, {
                             value: 45,
                             name: 'hide',
                             itemStyle: hideStyle
                         }]
                     }]
                 });
             });
         }
     };
 });