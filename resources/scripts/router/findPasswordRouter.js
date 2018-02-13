findApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("page1", {
            url: "/page1",
            templateUrl: "childPages/findPwd/page-1.html"
        })
        .state("page2", {
            url: "/page2/:phone",
            templateUrl: "childPages/findPwd/page-2.html"
        })
        .state("page3", {
            url: "/page3/:uid",
            templateUrl: "childPages/findPwd/page-3.html"
        })
        .state("page4", {
            url: "/page4",
            templateUrl: "childPages/findPwd/page-4.html"
        })
    $urlRouterProvider.otherwise('/page1');
})