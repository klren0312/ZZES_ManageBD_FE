//过滤器，将日志类型转换为中文
app.filter('logtype', function() {
    return function(log) {
        switch (log) {
            case "dev_offline":
                log = "设备下线"
                break;
            case "dev_online":
                log = "设备上线"
                break;
            case "dev_re_online":
                log = "设备重连"
                break;
            default:
                break;
        }
        return log
    }
})