//过滤器，转换成绑定设备数量
app.filter('bindnum', function() {
    return function(bindarr) {
        var bindnum = bindarr.length
        return bindnum
    }
})
/**
 *比较符号过滤器
 * 0——=/
 * 1——=
 * 2——>
 * 3——<
 * 4——>=
 * 5——<=
 */
app.filter('compareType', function() {
    return function(compare) {
        var result = ""
        if ("00" === compare) {
            result = "≠"
        } else if ("01" === compare) {
            result = "="
        } else if ("02" === compare) {
            result = "＞"
        } else if ("03" === compare) {
            result = "＜"
        } else if ("04" === compare) {
            result = "≥"
        } else if ("05" === compare) {
            result = "≤"
        }
        return result
    }
})
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
// 过滤器，将时间戳解析成正常时间
app.filter('logtime', function() {
    return function(origintime) {
        var date = new Date(origintime * 1000).toLocaleString()
        return date
    }
})
// 过滤器，将null 改为N/A
app.filter('nullToNA', function() {
    return function(thenull) {
        if (thenull === null) {
            return "N/A"
        } else {
            return thenull
        }
    }
})
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
//平台类型过滤器
app.filter('platformType', function() {
    return function(platform) {
        var result = ""
        if ("00" == platform) {
            result = "智能家电行业公共服务平台"
        } else if ("01" == platform) {
            result = "智能家电厂商服务平台"
        } else if ("02" == platform) {
            result = "其它行业应用服务平台"
        } else if ("03" == platform) {
            result = "其它行业支撑平台"
        }
        return result
    }
})
// 过滤器，将时间戳解析成正常时间
app.filter('currentDate', function() {
    return function(origintime) {
        var date = new Date(origintime).toLocaleString()
        return date
    }
})