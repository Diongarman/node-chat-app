var socket = io();


socket.on('newLocationMessage', function (locationMessage) {
    
    var formattedTime = moment(locationMessage.createdAt).format('h:mm a')
    var template = jQuery('#messageLocation-template').html();

    var html = Mustache.render(template, {
        from: locationMessage.from,
        url: locationMessage.url,
        createdAt: formattedTime
    });

    
    jQuery('#message-log').append(html)

});




socket.on('connect', function ()  {
    console.log('connected to server.');


});

socket.on('disconnect', function () {
    console.log('disconnected from server.');
});


socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });


    jQuery('#message-log').append(html)
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

