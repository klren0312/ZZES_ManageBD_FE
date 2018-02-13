app.controller("equipmentMapController", function($scope, $log) {
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 14,
        center: [118.302726, 32.222777]
    });

    //坐标点数组，坐标+说明
    var lnglats = [
        { "position": [118.301724, 32.221402], "product": "欧科" },
        { "position": [118.301681, 32.221334], "product": "小明灯" },
        { "position": [118.301917, 32.221647], "product": "凡家" },
        { "position": [118.30233, 32.221389], "product": "空净一号机" },
        { "position": [118.301799, 32.221112], "product": "科瑞报警主机" },
        { "position": [118.301949, 32.221271], "product": "萤石探测器网关" },
        { "position": [118.302147, 32.221507], "product": "智能窗帘" },
        { "position": [118.301643, 32.221616], "product": "智能开窗器" },
        { "position": [118.302244, 32.22138], "product": "智能升降衣架" },
        { "position": [118.301648, 32.221212], "product": "智能门铃" },
        { "position": [118.30174, 32.221316], "product": "净水器" },
        { "position": [118.302239, 32.221393], "product": "全向红外中继器" },
        { "position": [118.301713, 32.221484], "product": "单向红外中继器" },
        { "position": [118.301729, 32.221371], "product": "扬子空调" }
    ];
    var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -20) });
    //轮询标点
    for (var i = 0, marker; i < lnglats.length; i++) {
        console.log(lnglats[i].position)
        var marker = new AMap.Marker({
            position: lnglats[i].position,
            map: map
        });
        marker.content = lnglats[i].product;
        marker.on('click', markerClick);
        marker.emit('click', { target: marker });
    }

    function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
    }
    map.setFitView();
})