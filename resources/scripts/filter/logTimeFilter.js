// 过滤器，将时间戳解析成正常时间
app.filter('logtime', function() {
    return function(origintime) {
        var date = new Date(origintime * 1000).toLocaleString()
        return date
    }
})