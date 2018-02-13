var express = require('express');

app = express();


//设置所有路由无限制访问，不需要跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

//登录
app.post('/console/admin/login', function(req, res) {

    var data = "";
    req.on("data", function(chunk) {
        data += chunk;
    })
    req.on("end", function() {
        data = JSON.parse(data);
        if (data.username === "小" && data.password === "Qi520") {
            res.send('{"retCode": "0008","retInfo": "success","retBody":{"token":"#TOKEN"} }')
        } else {
            res.send('{"retCode": "0002","retInfo": "error" }')
        }

    })
})

//退出登录
app.post('/console/admin/logout', function(req, res) {
    var data = "";
    req.on("data", function() {
        data += chunk;
    })
    req.on("end", function() {
        if (data.header.token === '#TOKEN') {
            res.send('{"retCode": "0001", "retInfo": "success" }')
        } else {
            res.send('{"retCode": "0002","retInfo": "error" }')
        }
    })
})

//端口：3000
var server = app.listen(3000, function() {


    console.log("127.0.0.1:3000");
})