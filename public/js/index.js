var socket = io();


socket.on('newLocationMessage', function (locationMessage) {

    console.log(locationMessage);
    var li = jQuery('<li></li>');
    var a = document.createElement('a');
    var linkText = document.createTextNode("my location");
    a.appendChild(linkText);
    a.href = locationMessage.url
    a.target="_blank"
    li.append(a);
    jQuery('#message-log').append(li)




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

