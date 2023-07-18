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

const gameState = {
  "hello": {players: [
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

/**
 * ------------- socket setup -------------
 */

const userToSocketMap: Map<string, Socket> = new Map();
const socketIDtoSocketMap: Map<string, Socket> = new Map();
export const getSocketFromUser = (userId: string) => (userToSocketMap[userId]);
export const setSocketFromUser = (userId: string, socketId: string) => {
  userToSocketMap.set(userId, socketIDtoSocketMap[socketId]);
}

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socketIDtoSocketMap[socket.id] = socket;

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