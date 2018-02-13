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