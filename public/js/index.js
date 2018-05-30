var socket = io();

socket.on('connect', function ()  {
    console.log('connected to server.');

    socket.emit('createMessage', {
        to: 'tom',
        text: 'gotti gotti'
    })
});

socket.on('disconnect', function () {
    console.log('disconnected from server.');
});


socket.on('newMessage', function (email) {
    console.log('New email: ', email);
});