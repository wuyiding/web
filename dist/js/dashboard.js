/**
 * Created by yangwei on 02/06/16.
 */
var map = new AMap.Map('amap',{
    zoom: 13,
    center: [126.640839,45.751149]
});

AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
    var toolBar = new AMap.ToolBar();
    var scale = new AMap.Scale();
    map.addControl(toolBar);
    map.addControl(scale);
})

//var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

var imgClass = "img-circle";
var circleImageOffset = new AMap.Pixel(-18, -18);
var bigImageOffset = new AMap.Pixel(-40,-40);

var image1 = new Image(36,36);
image1.src = "http://localhost/sites/ssmhtml/dist/img/user3-128x128.jpg";
image1.className = imgClass;

var marker1 = new AMap.Marker({
    map:map,
    position: [126.640839,45.751149],
    content: image1,
    offset: circleImageOffset
});
marker1.on("mouseover", function(){
    image1.width = 80;
    image1.height = 80;
    marker1.setContent(image1);
    marker1.setOffset(bigImageOffset);
});
marker1.on("mouseout", function(){
    image1.width = 36;
    image1.height = 36;
    marker1.setContent(image1);
    marker1.setOffset(circleImageOffset);
});

var image2 = new Image(36,36);
image2.src = "http://localhost/sites/ssmhtml/dist/img/user5-128x128.jpg";
image2.className = imgClass;

var marker2 = new AMap.Marker({
    map:map,
    position: [126.633919,45.748695],
    content:image2,
    offset: circleImageOffset
});

marker2.on("mouseover", function(){
    image2.width = 80;
    image2.height = 80;
    marker2.setContent(image2);
    marker2.setOffset(bigImageOffset);
});
marker2.on("mouseout", function(){
    image2.width = 36;
    image2.height = 36;
    marker2.setContent(image2);
    marker2.setOffset(circleImageOffset);
});

var image3 = new Image(36,36);
image3.src = "http://localhost/sites/ssmhtml/dist/img/user7-128x128.jpg";
image3.className = imgClass;

var marker3 = new AMap.Marker({
    map:map,
    position: [126.695391,45.746416],
    content:image3,
    offset: circleImageOffset
});

marker3.on("mouseover", function(){
    image3.width = 80;
    image3.height = 80;
    marker3.setContent(image3);
    marker3.setOffset(bigImageOffset);
});
marker3.on("mouseout", function(){
    image3.width = 36;
    image3.height = 36;
    marker3.setContent(image3);
    marker3.setOffset(circleImageOffset);
});
//
//function markerClick(e) {
//    infoWindow.setContent(e.target.content);
//    infoWindow.open(map, e.target.getPosition());
//}
