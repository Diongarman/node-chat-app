const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message.js');
var {isRealString} = require('./utils/validation.js')
var {Users} = require('./utils/users.js');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath, {}));

var Users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected.');



    socket.on('join', (params, callback) => {


        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }
        socket.join(params.room);
        //below line is just a check that a user with this id isn't already in the room
        Users.removeUser(socket.id);
        Users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', Users.getUserList(params.room));


        socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', ` ${params.name} has joined chat.`));

        callback();

    });

    socket.on('createMessage', (messageFromClient, callback) => {

        var user = Users.fetchUser(socket.id);

        if (user && isRealString(messageFromClient.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, messageFromClient.text))
        }

        callback();
    });

    socket.on('createLocationMessage', (locationFromClient) => {
        var user = Users.fetchUser(socket.id);


        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, locationFromClient.lat, locationFromClient.long));

        };
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        
        var leavingUser = Users.removeUser(socket.id);

        if (leavingUser) {
            io.to(leavingUser.room).emit('updateUserList', Users.getUserList(leavingUser.room));
            io.to(leavingUser.room).emit('newMessage', generateMessage('admin', ` ${leavingUser.name} has left chat.`));
        }
    });
});



server.listen(port , () => {
    console.log(`app is running on port ${port}`);

});