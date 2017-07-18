$(function(){

  // In an application that uses Viewer:
  var viewer = new Cesium.Viewer('cesium', {
      baseLayerPicker : false,
      terrainProvider : new Cesium.CesiumTerrainProvider({
          url : '//assets.agi.com/stk-terrain/world'
      })
  });
  
  // Cesium default 表示部品非表示
  document.getElementsByClassName('cesium-viewer-geocoderContainer')[0].style.display = "none";
  document.getElementsByClassName('cesium-viewer-animationContainer')[0].style.display = "none";
  document.getElementsByClassName('cesium-viewer-timelineContainer')[0].style.display = "none";
  document.getElementsByClassName('cesium-viewer-fullscreenContainer')[0].style.display = "none";
  
  
  
  // --- Draw PNG ---
  var layers = viewer.scene.imageryLayers;
  var ly_arr = [];
  var area = Cesium.Rectangle.fromDegrees(139.9571, 36.0973,  139.9721, 36.1045);
  
  // get images.
  var data = [];
  var length = $('#fileNameList input').length;
  for (var i=0; i<length; i++) {
    data.push($('#fileNameList #fn' + i).val());
  }
  
  // create layers.
  for (var i=0; data[i]; i++) {
    var imgfile = "/images/" + data[i];
    var stip = new Cesium.SingleTileImageryProvider({url : imgfile, rectangle : area});
    ly_arr.push(layers.addImageryProvider(stip));
    ly_arr[ly_arr.length - 1].show = false;
    ly_arr[ly_arr.length - 1].alpha = 0.5;
  }
  
  // fly to point.
  if (layers.length >= 2) {
    viewer.flyTo(layers.get(1));
  }
  
  // show layers.
  var TIMER_INU = 1000; // msec
  var CHANGE_LAYER_NUM = 2;
  var cnt = 0;
  timer_dot = setInterval(function(){
  
    ly_arr[cnt].show = true;
    if (cnt >= CHANGE_LAYER_NUM) {
      ly_arr[cnt - CHANGE_LAYER_NUM].show = false;
    }
    console.log("timer call ... cnt=" + cnt);
  
    cnt++;
    if (cnt >= ly_arr.length) {
      if (timer_dot != null) {
        clearInterval(timer_dot);
        timer_dot = null;
      }
    }
  }, TIMER_INU);
  
  
  
  // --- Draw Text ---
  var e = viewer.entities.add({
      position : Cesium.Cartesian3.fromDegrees(139.957, 36.1044),
      point : {
          color : Cesium.Color.SKYBLUE,
          pixelSize : 10,
          outlineColor : Cesium.Color.YELLOW,
          outlineWidth : 3,
          heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
      },
      label : {
          text : 'Flood Point: 南石下駅付近\nLonLat      : 139.957, 36.1044',
          font : '14pt sans-serif',
          heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
          horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
          verticalOrigin : Cesium.VerticalOrigin.BASELINE,
          fillColor : Cesium.Color.BLACK,
          showBackground : true,
          backgroundColor : new Cesium.Color(1, 1, 1, 0.7),
          backgroundPadding : new Cesium.Cartesian2(8, 4),
          disableDepthTestDistance : Number.POSITIVE_INFINITY // draws the label in front of terrain
      }
  });

  $('#fileNameList').remove();

});

