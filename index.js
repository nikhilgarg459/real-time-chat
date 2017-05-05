var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var logger = require('morgan');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.sendFile(__dirname + 'public/index1.html');
});



io.on('connection',function(socket){
    console.log("User connected");
    socket.broadcast.emit('hi');
    socket.on('disconnect',function(){
        console.log("User disconnected");
    });

    socket.on('chat message', function(msg){
        console.log("message ", msg);
        io.emit('chat message', msg);
    });

});

server.listen(3000,function(){
    console.log("Listening on port 3000");
});