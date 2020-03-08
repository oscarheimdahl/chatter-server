require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(cors);
app.get('/', (req, res) => {
  console.log('/////');
  res.json({ response: 'I am alive' }).status(200);
  res.end();
});

let clients = 0;
io.on('connection', function(socket) {
  clients++;
  io.emit('users-changed', socket.client.conn.server.clientsCount);
  socket.on('message', function(msg) {
    socket.broadcast.emit('message', {
      content: msg.content,
      username: msg.username
    });
  });
  socket.on('disconnect', function() {
    clients--;
    io.emit('users-changed', socket.client.conn.server.clientsCount);
  });
});

http.listen(process.env.PORT, function() {
  console.log('listening on 4444');
});

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
