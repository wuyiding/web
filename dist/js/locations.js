/**
 * Created by yangwei on 03/06/16.
 */
var app = angular.module('locationsApp', []);

app.controller('locationsController',[ '$http', '$scope', function($http, $scope){

    //var newMarker;

    var map = new AMap.Map('amap',{
        zoom: 13,
        center: [123.43445650000001,41.7761643]
    });

    AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
        var toolBar = new AMap.ToolBar();
        var scale = new AMap.Scale();
        map.addControl(toolBar);
        map.addControl(scale);
    });

    //自定义图标的偏移量
    var image = new Image(35,35);
    image.src = "dist/img/new_marker_2.png"
    var image_plus = new Image(35,35);
    image_plus.src = "dist/img/new_marker_plus_2.png"
    var customPinOffset = new AMap.Pixel(-15, -30);

    var myKey = "442d94fa6e5b698ce3190c9a766047b0";
    $scope.searching = "";
    $scope.address = "";
    $scope.locations = [];
    $scope.province = "";
    $scope.city = "";
    $scope.district = "";
    $scope.street = "";
    $scope.number = "";
    $scope.building = "";
    $scope.zipcode = "";

    /**
     * 地理位置正向搜索
     */
    $scope.search = function() {
        $http.get("http://restapi.amap.com/v3/geocode/geo?key="
            + myKey + "&address="
            + $scope.searching + "&city=")
            .then(function(response) {
                //console.log(response.data);
                if(response.data.status == 1) {
                    $scope.location = response.data.geocodes[0];
                    console.log($scope.location);
                    var coordinates = $scope.location.location.split(",");
                    map.clearMap();
                    map.setCenter(coordinates);

                    var newMarker = new AMap.Marker({
                        map:map,
                        position: coordinates,
                        content: image,
                        offset: customPinOffset,
                        animation: "AMAP_ANIMATION_DROP"
                    });
                    newMarker.on("mouseover", function(){
                        newMarker.setContent(image_plus);
                    });
                    newMarker.on("mouseout", function(){
                        newMarker.setContent(image);
                    });
                    newMarker.on("click", function(){
                        var mini_map = new AMap.Map('mini-map',{
                            zoom: 15,
                            center: coordinates,
                            dragEnable: false,
                            zoomEnable: false
                        });

                        var miniMapMarker = new AMap.Marker({
                            map:mini_map,
                            position: coordinates,
                            animation: "AMAP_ANIMATION_DROP"
                        });

                        $('#new-location-modal').modal('show')
                    });

                    $scope.reSearch(coordinates[0], coordinates[1], false);

                }else {
                    console.log('地理位置搜索失败');
                }
            }, function() {
                console.log('网络请求搜索失败');
            });
    }

    /**
     * 地理位置逆向搜索
     * @param lng
     * @param lat
     * @param changable
     */
    $scope.reSearch = function(lng, lat, changable) {
        $http.get("http://restapi.amap.com/v3/geocode/regeo?key="
         + myKey + "&location="
         + lng + "," + lat
         + "&poitype=&radius=&extensions=all&batch=false&roadlevel=")
            .then(function(response) {
                console.log(response.data);
                if(response.data.status == 1) {
                    console.log(response.data.regeocode);
                    $scope.province = response.data.regeocode.addressComponent.province;
                    $scope.city = response.data.regeocode.addressComponent.city;
                    $scope.district = response.data.regeocode.addressComponent.district;
                    $scope.street = response.data.regeocode.addressComponent.streetNumber.street +
                        response.data.regeocode.addressComponent.streetNumber.number;
                    $scope.address = $scope.province +
                        $scope.city + $scope.district +
                        $scope.street

                    if(changable) {
                        $scope.building = response.data.regeocode.addressComponent.building.name;
                        $scope.searching = $scope.address;
                        if($scope.building.length > 0) {
                            $scope.searching = $scope.searching + ", " + $scope.building;
                        }
                    }else {
                        $scope.building = $scope.searching;
                    }

                }else {
                    console.log('反地理位置搜索失败');
                }
            }, function() {
                console.log('网络请求搜索失败');
            });
    }

    /**
     * 为地图注册click事件获取鼠标点击出的经纬度坐标
     */
    var clickEventListener = map.on('click', function(e) {
        var lng = e.lnglat.getLng();
        var lat = e.lnglat.getLat();
        map.clearMap();
        map.setCenter([lng, lat]);
        var setMarker = new AMap.Marker({
            map:map,
            position: [lng, lat],
            content: image,
            offset: customPinOffset,
            animation: "AMAP_ANIMATION_DROP"
        });
        setMarker.on("mouseover", function(){
            setMarker.setContent(image_plus);
        });
        setMarker.on("mouseout", function(){
            setMarker.setContent(image);
        });
        setMarker.on("click", function(){
            var mini_map = new AMap.Map('mini-map',{
                zoom: 15,
                center: [lng, lat],
                dragEnable: false,
                zoomEnable: false
            });

            var miniMapMarker = new AMap.Marker({
                map:mini_map,
                position: [lng, lat],
                animation: "AMAP_ANIMATION_DROP"
            });

            $('#new-location-modal').modal('show')
        });
        $scope.reSearch(lng, lat, true);
    });

    /**
     * 让搜索输入框响应回车时间
     */
    angular.element("#search-text").keypress(function(){
        if ( event.which == 13 ) {
            $scope.search();
        }
    });

    /**
     * 打开分配销售窗口
     */
    $scope.openSalesModal = function() {
        $('#assign-modal').modal('show');
    }

    /**
     * 任务窗口
     */
    $scope.openTaskModal = function () {
        $('#todo-modal').modal('show');
    }

    /**
     * 打开地理位置编辑窗口
     */
    $scope.openLocationModal = function(lng, lat, name) {
        console.log(lng);
        console.log(lat);
        console.log(name);
        $scope.reSearch(lng, lat, false);
        $scope.building = name;

        var mini_map = new AMap.Map('mini-map',{
            zoom: 15,
            center: [lng, lat],
            dragEnable: false,
            zoomEnable: false
        });

        var miniMapMarker = new AMap.Marker({
            map:mini_map,
            position: [lng, lat],
            animation: "AMAP_ANIMATION_DROP"
        });

        $('#new-location-modal').modal('show')
    }
}]);
