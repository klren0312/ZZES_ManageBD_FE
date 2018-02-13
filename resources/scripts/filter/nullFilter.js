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