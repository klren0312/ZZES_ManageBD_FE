 personCenterApp.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
         .state("personalMsg", {
             url: "/personalMsg",
             templateUrl: "personalMsg.html"
         })
         .state("changePwd", {
             url: "/changePwd",
             templateUrl: "changePwd.html"
         })
     $urlRouterProvider.otherwise('/personalMsg');
 })