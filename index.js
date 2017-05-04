var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    console.log("User connected");
    
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