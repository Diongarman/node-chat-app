const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath, {}))

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', {
        from:'dion',
        text:'Where\'s Ricky?',
        createdAt:123
    });

    socket.on('createMessage', (messageFromClient) => {
        console.log('new message from client: ', messageFromClient)
        socket.emit('newMessage', messageFromClient)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(port , () => {
    console.log(`app is running on port ${port}`);

});