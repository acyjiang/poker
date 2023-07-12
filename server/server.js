const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
const port = process.env.PORT || 8080;

app.get('/', function(req, res) {
   res.send('hello');
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.emit("FromAPI", "hello");
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
})

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});