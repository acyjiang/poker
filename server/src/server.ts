import GameManager from './game';
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
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

/**
 * ------------- Game state manager -------------
 */

export const gameManager = new GameManager();

/**
 * ------------- socket setup -------------
 */

export const socketIDtoSocketMap: Map<string, Socket> = new Map();

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socketIDtoSocketMap[socket.id] = socket;

  socket.on('ingress', function(gameId) {
    gameManager.joinGame(socket.id, gameId);
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

/**
 * ------------- listen on port -------------
 */

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});