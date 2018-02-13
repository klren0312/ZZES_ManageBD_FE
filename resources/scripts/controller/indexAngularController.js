app.controller("indexCtrl", function($scope, $http, $log, $state, Excel, $timeout, $cookies) {

    //*url封装 
    $scope.ROOTURL = "http://127.0.0.1:8083/console"
    //*获取AccessToken
    $scope.AccessToken = localStorage.getItem("AccessToken");
  
    /**
     * 请求角色数据
     */
    $http({
        method: "get",
        url: $scope.ROOTURL + '/admin/show',
        headers: {
            "AccessToken": $scope.AccessToken
        },
        withCredentials: true //!跨域带cookies
    }).then(function(req) {
        $scope.Name = req.data.retBody.Name
        localStorage.setItem("roleName", $scope.Name)
    })

    
    // 用于页头显示
    $scope.username = localStorage.getItem('username');
    //退出登录点击事件
    $scope.logout = function() {
        $scope.logouthttp();
    }

    // localStorage.setItem("AccessToken", "test")
    //*判断是否登录
    //?通过AccessToken 
    if (localStorage.getItem("AccessToken")) {
        $scope.userCheck = true;
        $log.log("ok?");
    } else {
        $log.log("no?");
        $scope.userCheck = false;
        alert("请登录");
        location.href = "login.html";
    }

    /**
     * 
     * HTTP请求登出api
     * 从localStroage中获取AccessToken，添加到请求头中
     */
    $scope.logouthttp = function() {
        var AccessToken = localStorage.getItem("AccessToken");
        // 封装信息
        var databody = '{"Header":{"AccessToken":"' + AccessToken + '"},"Body":{}}';
        $log.log("退出信息：" + databody);
        $http({
            method: 'post',
            url: $scope.ROOTURL + '/admin/logout',
            data: databody,
            headers: { "content-type": "application/json" },
            withCredentials: true //!跨域带cookies
        }).then(function(data) {
            $log.log("退出登录状态码:" + data.data.retCode);
            if (data.data.retCode === "0010") {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("AccessToken");
                localStorage.removeItem("roleName");
                window.location.href = 'login.html';
            }
        })
    }

    /**
     * EXCEL导出功能
     */
    $scope.exportToExcel = function(tableId, sheetname) {
        $log.log("excel开始生成");
        var exportHref = Excel.tableToExcel(tableId, sheetname);
        $timeout(function() {
            location.href = exportHref;
        }, 100);
    }

    /**
     * 分页函数
     * 传入数据数组
     */
    $scope.setPage = function(databody) {
        $scope.pageSize = 10;
        $scope.pages = Math.ceil(databody.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > $scope.pageSize ? $scope.pageSize : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        // 设置表格数据源
        $scope.setData = function() {
            // 通过当前页数筛选出表格当前显示数据
            $scope.items = databody.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize))
        }
        $scope.items = databody.slice(0, $scope.pageSize);
        // 分页数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        /**
         * 
         *  打印当前选中页的索引
         */
        $scope.selectPage = function(page) {
            // 不能小于1，大于最大值
            if (page < 1 || page > $scope.pages) return;
            // 最多显示5个分页
            if (page > 2) {
                // 因为只显示5个页数，大于2页开始分页转换
                var newPageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newPageList.push(i + 1);
                }
                $scope.pageList = newPageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            // $log.log("选择的页：" + page);
        };
        // 设置选中页样式
        $scope.isActivePage = function(page) {
            return $scope.selPage == page;
        };
        // 上一页点击事件
        $scope.Previous = function() {
                $scope.selectPage($scope.selPage - 1);
            }
            // 下一页点击事件
        $scope.Next = function() {
            $scope.selectPage($scope.selPage + 1);
        }
    }

})