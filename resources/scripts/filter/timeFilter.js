// 过滤器，将时间戳解析成正常时间
app.filter('currentDate', function() {
    return function(origintime) {
        var date = new Date(origintime).toLocaleString()
        return date
    }
})