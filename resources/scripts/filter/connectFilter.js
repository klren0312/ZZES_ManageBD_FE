//连接方式过滤器
app.filter('connectType', function() {
    return function(methods) {
        var connect = ""
        if (1 == methods) {
            connect = "WIFI"
        } else if (null == methods) {
            connect = "N/A"
        } else {
            connect = "Other"
        }
        return connect
    }
})