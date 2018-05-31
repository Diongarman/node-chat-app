const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message.js');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath, {}))

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined chat.'));

    socket.on('createMessage', (messageFromClient, callback) => {
        console.log('new message from client: ', messageFromClient)
        io.emit('newMessage', generateMessage(messageFromClient.from, messageFromClient.text))
        callback('This is acknowledgement of receipt from the server');
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(port , () => {
    console.log(`app is running on port ${port}`);

});