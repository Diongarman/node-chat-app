var socket = io();

var locationCoords, centralPark;

function initMap() {

    var map, marker, infoWindow;

    map = new google.maps.Map(
        document.getElementById('map'), {center: centralPark, zoom: 12});

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
        map.panTo(centralPark);
    };

    
};


function loadScript(location) {
    var apiKey = 'AIzaSyA-KafGeMGeEcjgfWA1BeljNhpj5-6cnVU';
    var script = document.createElement('script');
    script.type = 'text/javascript';
    locationCoords = location.coords;
    centralPark = {lat:52.583331, lng:-0.249999};
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31&callback=initMap`;
    
    /*
    var div = jQuery('<div id="map"></div>');
    div.append(script);
    var li = jQuery('<li></li>');
    li.append(div)
    jQuery('#message-log').append(div);
*/
    
    /*
    var div = jQuery('<div id="map"></div>');
    div.css( "height", "33%" );
    div.css( "width", "33%" );
    jQuery('body').css("height", "100%");
    jQuery('body').css("margin", "40%");
    jQuery('body').css("padding", "0");
    jQuery('html').css("height", "100%");
    jQuery('html').css("margin", "40%");
    jQuery('html').css("padding", "0");
    var li = jQuery('<li></li>');
    li.append(div);
    jQuery('#message-log').append(li);
    */

   document.body.appendChild(script);

};



socket.on('newLocationMessage', function (locationMessage) {

    console.log(locationMessage.coords);
    loadScript(locationMessage);
      

});





socket.on('connect', function ()  {
    console.log('connected to server.');


});

socket.on('disconnect', function () {
    console.log('disconnected from server.');
});


socket.on('newMessage', function (message) {
    console.log('New message: ', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#message-log').append(li)
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        
        socket.emit('createLocationMessage', {
            lat:position.coords.latitude,
            long: position.coords.longitude
        });
    }, function () {
        alert('unable to fetch location.');
    });
});

