import GameManager from './game';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { router } from './api';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use("/api", router);

const port = process.env.PORT || 8080;

const gameManager = new GameManager();

const gameState = {
  0: {players: [
    {
      name: 'A',
      cards: ["Kc", "Ac"],
      stack: 400,
      betsize: 10}, 
    {
      name: 'B',
      cards: ["Tc", "9c"],
      stack: 400,
      betsize: 10}
  ], community: ["6d", "4d", "4s", "3s", "4h"]}
}

io.on('connection', (socket) => {
  console.log('user connected');

  socket.emit("FromAPI", "hello");

  socket.on('connect to game', function(num) {
    socket.emit("update game state", gameState[num]);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});