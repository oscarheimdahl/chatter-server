require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const db = require('./db.js');

app.use(cors());
app.get('/allmessages', async function(req, res) {
  const messages = await db.getAll();
  res.json(messages).status(200);
});

io.on('connection', function(socket) {
  io.emit('users-changed', socket.client.conn.server.clientsCount);
  socket.on('message', function(msg) {
    socket.broadcast.emit('message', msg);
    db.save(msg);
  });
  socket.on('disconnect', function() {
    io.emit('users-changed', socket.client.conn.server.clientsCount);
  });
});

http.listen(process.env.PORT, function() {
  console.log('listening on 4444');
});

// app.listen(process.env.PORT, function() {
//   console.log('App listening on ' + process.env.PORT);
// });
