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
    jQuery('#message-log').append(li);

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

    messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.prop('disabled', true).text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.prop('disabled', false).text('Send location')
        socket.emit('createLocationMessage', {
            lat:position.coords.latitude,
            long: position.coords.longitude
        });
    }, function () {
        locationButton.prop('disabled', false).text('Send location')
        alert('unable to fetch location.');
    });
});

