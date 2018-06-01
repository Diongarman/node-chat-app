var locationCoords, centralPark;

function initMap() {

    var map, marker, infoWindow;

    map = new google.maps.Map(
        document.getElementById('map'), {center: locationCoords, zoom: 12});

    marker = new google.maps.Marker({position: locationCoords, map: map});

    // Create info window content.
    var content = document.createElement('div');
    content.textContent = 'new renderer ';
    var zoomInButton = document.createElement('button');
    zoomInButton.textContent = 'zoom in';
    content.appendChild(zoomInButton);

      // Create open an info window attached to the marker.
    infoWindow = new google.maps.InfoWindow({content: content});
    infoWindow.open(map, marker);

      // When the zoom-in button is clicked, zoom in and pan to the Opera House.
// The zoom and pan animations are smoother with the new renderer.
    zoomInButton.onclick = function() {
        map.setZoom(Math.max(15, map.getZoom() + 1));
        map.panTo(locationCoords);
    };



    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
    });
    
    function placeMarker(position, map) {
        var marker = new google.maps.Marker({
            position: position,
            map: map
        });
        map.panTo(position);
    }

    
};


function loadScript(location) {
    var apiKey = 'AIzaSyA-KafGeMGeEcjgfWA1BeljNhpj5-6cnVU';
    var script = document.createElement('script');
    script.type = 'text/javascript';
    locationCoords = location.coords;
    centralPark = {lat:52.583331, lng:-0.249999};
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31&callback=initMap`;
    document.body.appendChild(script);

};


socket.on('newLocationMessage', function (locationMessage) {

    console.log(locationMessage.coords);

    if(jQuery('#map').is(':empty')) {
        loadScript(locationMessage);
    } else {
        //add another marker and calculate route
    }
    
      

});