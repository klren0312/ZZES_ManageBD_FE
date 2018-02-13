//过滤器，转换成绑定设备数量
app.filter('bindnum', function() {
    return function(bindarr) {
        var bindnum = bindarr.length
        return bindnum
    }
})