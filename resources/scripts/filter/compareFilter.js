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