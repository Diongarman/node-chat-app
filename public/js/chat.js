var socket = io();



function scrollToBottom () {

    //selectors
    var messages = jQuery('#message-log');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }

};

socket.on('newLocationMessage', function (locationMessage) {
    
    var formattedTime = moment(locationMessage.createdAt).format('h:mm a')
    var template = jQuery('#messageLocation-template').html();

    var html = Mustache.render(template, {
        from: locationMessage.from,
        url: locationMessage.url,
        createdAt: formattedTime
    });

    
    jQuery('#message-log').append(html)
    scrollToBottom();

});




socket.on('connect', function ()  {
    var params = jQuery.deparam(window.location.search);
    
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';

        } else {
            console.log('No error');
        }
    });

});

socket.on('disconnect', function () {
    console.log('disconnected from server.');
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });


    jQuery('#message-log').append(html);
    scrollToBottom();
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {

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

