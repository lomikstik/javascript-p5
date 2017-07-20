var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

var io = socket(server);

console.log("Cancer is the most cancerous thing");

io.sockets.on('connection', newConnection);

function newConnection (socket) {
    console.log(socket.id);
    socket.on('derp', derpMsg);
    
    function derpMsg (data) {
        socket.broadcast.emit('derp', data);
    }
}