app.controller("msgDetailsController", function($scope, $log, $state) {
    $scope.goback = function() {
        $state.go("msgManage");
    }
})