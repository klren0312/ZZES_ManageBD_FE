//在线状态过滤器
app.filter('onlineStatus', function() {
    return function(status) {
        var realStatus = ""
        if (0 == status) {
            realStatus = "离线"
        } else if (1 == status) {
            realStatus = "在线"
        }
        return realStatus
    }
})