app.controller("msgManageController", function($scope, $log) {
    $scope.msgManages = [{}];
    //时间组件
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ' + picker.endDate.format('YYYY-MM-DD'));
        $scope.startDate = picker.startDate.format('YYYY-MM-DD')
        $scope.endDate = picker.endDate.format('YYYY-MM-DD')
        $log.log($scope.startDate)
        $log.log($scope.endDate)
    });
    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

    $scope.sendMsg = function() {
        $log.log("in push");
        var date = new Date().toLocaleString();
        $scope.msgManages.push({
            msgheader: $scope.pushHeader,
            msgcontent: $scope.pushContent,
            pushobject: $scope.pushObject,
            pushtime: date
        })
    }

    $("#left").datetimepicker();
    $("#right").datetimepicker();
})