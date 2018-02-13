 app.directive('accessEquipment', function() {
     return {
         scope: {
             id: "@",
             joindata: "="
         },
         restrict: 'E',
         template: '<div class="access-equipment-charts"></div>',
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
                     data: ['接入设备', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.joindata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '接入设备',
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
                     name: '接入设备',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.joindata.joinDevice
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.joindata.joinDeviceRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
             $scope.$watch('joindata', function(newData, oldData) {
                 $scope.joindata = newData
                 myChart.setOption({
                     xAxis: [{
                         type: 'category',
                         data: $scope.joindata.timestamp,
                         axisTick: {
                             alignWithLabel: true
                         }
                     }],
                     series: [{
                         name: '接入设备',
                         type: 'bar',
                         barWidth: '60%',
                         data: $scope.joindata.joinDevice
                     }, {
                         name: '环比',
                         type: 'line',
                         barWidth: '60%',
                         yAxisIndex: 1,
                         data: $scope.joindata.joinDeviceRatio
                     }]
                 });
             });
         }
     };
 });
 app.directive('activeEquipment', function() {
     return {
         scope: {
             id: "@",
             activedata: "="
         },
         restrict: 'E',
         template: '<div class="active-equipment-charts"></div>',
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
                     data: ['活跃设备', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.activedata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '活跃设备',
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
                     name: '活跃设备',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.activedata.activeDevice
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.activedata.activeDeviceRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
 app.directive('activeUser', function() {
     return {
         scope: {
             id: "@",
             activedata: "="
         },
         restrict: 'E',
         template: '<div class="active-user-charts"></div>',
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
                     data: ['活跃用户', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.activedata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '活跃用户',
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
                     name: '活跃用户',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.activedata.activeUsers
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.activedata.activeUsersRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
 app.directive('bindEquipment', function() {
     return {
         scope: {
             id: "@",
             bindingdata: "="
         },
         restrict: 'E',
         template: '<div class="bind-equipment-charts"></div>',
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
                     data: ['绑定设备', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.bindingdata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '绑定设备',
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
                     name: '绑定设备',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.bindingdata.bindingDevice
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.bindingdata.bindingDeviceRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
 app.directive('bindUser', function() {
     return {
         scope: {
             id: "@",
             bindingdata: "="
         },
         restrict: 'E',
         template: '<div class="bind-user-charts"></div>',
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
                     data: ['已绑定设备用户', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.bindingdata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '已绑定设备用户',
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
                     name: '已绑定设备用户',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.bindingdata.bindingUsers
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.bindingdata.bindingUsersRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
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
app.directive('infoData', function() {
    return {
        scope: {
            id: "@",
            infodata: "="
        },
        restrict: 'E',
        template: '<div class="info-data-charts"></div>',
        replace: true,
        link: function($scope, element, attrs, controller) {
            var option = {
                color: ['#00688B', '#00FF7F'],
                // 提示框，鼠标悬浮交互时的信息提示  
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                // 图例  
                legend: {
                    data: ['指令上报', '指令下发']
                },
                // 横轴坐标轴  
                xAxis: [{
                    type: 'category',
                    data: $scope.infodata.date
                }],
                // 纵轴坐标轴  
                yAxis: [{
                    type: 'value'
                }],
                // 数据内容数组  
                series: [{
                    name: '指令上报',
                    type: 'line',
                    data: $scope.infodata.upperInfo
                }, {
                    name: '指令下发',
                    type: 'line',
                    data: $scope.infodata.lowerInfo
                }]
            };
            var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
            myChart.setOption(option);
        }
    }
})
 app.directive('newUser', function() {
     return {
         scope: {
             id: "@",
             newdata: "="
         },
         restrict: 'E',
         template: '<div class="new-user-charts"></div>',
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
                     data: ['新用户数', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.newdata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '新用户数',
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
                     name: '新用户数',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.newdata.newUsers
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.newdata.newUsersRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
             $scope.$watch('newdata', function(newData, oldData) {
                 $scope.newdata = newData
                 myChart.setOption({
                     xAxis: [{
                         type: 'category',
                         data: $scope.newdata.timestamp,
                         axisTick: {
                             alignWithLabel: true
                         }
                     }],
                     series: [{
                         name: '新用户数',
                         type: 'bar',
                         barWidth: '60%',
                         data: $scope.newdata.newUsers
                     }, {
                         name: '环比',
                         type: 'line',
                         barWidth: '60%',
                         yAxisIndex: 1,
                         data: $scope.newdata.newUsersRatio
                     }]
                 });
             });
         }
     };
 });
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
 app.directive('outlineTimes', function() {
     return {
         scope: {
             id: "@",
             legend: "=",
             date: "=",
             endup: "=",
             endupdifference: "="
         },
         restrict: 'E',
         template: '<div class="outline-times-charts"></div>',
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
                     data: ['离线次数', '增长率'],
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
                         name: '离线次数',
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
                     name: '离线次数',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.endup
                 }, {
                     name: '增长率',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.endupdifference
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
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
 app.directive('runTimes', function() {
     return {
         scope: {
             id: "@",
             legend: "=",
             date: "=",
             startup: "=",
             startupdifference: "=",
         },
         restrict: 'E',
         template: '<div class="run-times-charts"></div>',
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
                     data: ['启动次数', '增长率'],
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
                         name: '启动次数',
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
                     name: '启动次数',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.startup
                 }, {
                     name: '增长率',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.startupdifference
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
 app.directive('shareUser', function() {
     return {
         scope: {
             id: "@",
             sharedata: "="
         },
         restrict: 'E',
         template: '<div class="share-user-charts"></div>',
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
                     data: ['分享绑定', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.sharedata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '分享绑定',
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
                     name: '分享绑定',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.sharedata.shareUsers
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.sharedata.shareUsersRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
 app.directive('startTime', function() {
     return {
         scope: {
             id: "@",
             legend: "=",
             date: "=",
             everyday: "=",
             difference: "="
         },
         restrict: 'E',
         template: '<div class="start-time-charts"></div>',
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
                     data: ['启动时长', '增长率'],
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
                         name: '启动时长',
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
                     name: '启动时长',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.everyday
                 }, {
                     name: '增长率',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.difference
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
 app.directive('timeUser', function() {
     return {
         scope: {
             id: "@",
             employdata: "="
         },
         restrict: 'E',
         template: '<div class="time-user-charts"></div>',
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
                     data: ['人均使用时长', '环比'],
                 },
                 grid: {
                     left: '3%',
                     right: '4%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis: [{
                     type: 'category',
                     data: $scope.employdata.timestamp,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }],
                 yAxis: [{
                         type: 'value',
                         name: '人均使用时长',
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
                     name: '人均使用时长',
                     type: 'bar',
                     barWidth: '60%',
                     data: $scope.employdata.employUsers
                 }, {
                     name: '环比',
                     type: 'line',
                     barWidth: '60%',
                     yAxisIndex: 1,
                     data: $scope.employdata.employUsersRatio
                 }]
             };
             var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
             myChart.setOption(option);
         }
     };
 });
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