var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var logger = require('morgan');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.get("/",function(req,res){
    res.sendFile(__dirname + 'index1.html');
});


// Chatroom

var numUsers = 0;

io.on('connection',function(socket){
    var addedUser = false;
    socket.broadcast.emit('hi');
   
   socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });

    socket.on('add user', function(username){
        if(addedUser) return;

         // we store the username in the socket session for this client
         socket.username = username;
         username;
         ++numUsers;
         addedUser = true;
         socket.emit('login', {
             numUsers: numUsers
         });
         console.log(username + " connected");

         socket.broadcast.emit('user joined', {
             username: socket.username,
             numUsers: numUsers
         });
    });

    // when the client emits 'add user', this listens and executes

});

server.listen(3000,function(){
    console.log("Listening on port 3000");
});