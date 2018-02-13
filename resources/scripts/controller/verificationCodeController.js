app.controller('verificationCodeController',function($scope,$http,toastr,$state){
  $scope.VERIFYURL = 'http://119.29.144.39:8083'
  /**
   * 获取验证码
   */
  function getVerification(){
    $http({
      method:'get',
      url:$scope.VERIFYURL + '/verification/select',
    }).then(function(res){
      $scope.setPage(res.data.retBody)
    })
  }
  getVerification()
  /**
   * 创建验证码
   */
  $scope.create = function(){
    if($scope.day === undefined||$scope.day === ''||$scope.day === null){
      toastr.error("错误", "请选择天数！")
    }else{
      $http({
        method:'post',
        url:$scope.VERIFYURL + '/verification/create/'+$scope.day,
        headers:{
          "content-type":"application/json"
        }
      }).then(function(res){
        if(res.data.retInfo === 'fail'){
          toastr.error(res.data.retInfo)
        }else{
          toastr.success("验证码生成成功！")
          getVerification()
        }
      })
    }
  }
 

  /**
   * 获取选择功能
   */
  $scope.result = [];
  $scope.select = function(id, event) {
      var action = event.target;
      if (action.checked) {
          if ($scope.result.indexOf(id) == -1) {
              $scope.result.push(id);
          }
      } else {
          var idx = $scope.result.indexOf(id);
          if (idx != -1) {
              $scope.result.splice(idx, 1);
          }
      }
  }
  /**
   * 删除验证码
   */
  $scope.delete = function(result){
    var databody =  '{"numids":[' + result + ']}'
    console.log(databody)
    $http({
      method:'delete',
      url:$scope.VERIFYURL + '/verification/efficacy/delete',
      headers:{
        "content-type":"application/json"
      },
      data:databody
    }).then(function(res){
      if(res.data.retInfo === 'fail'){
        toastr.error(res.data.retInfo)
      }else{
        toastr.success("验证码删除成功！")
        getVerification()
      }
    })
  }
 

})