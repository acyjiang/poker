import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles.css';
import { useLoaderData } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import socketIOClient from 'socket.io-client';
import Player from '../components/Player';
import Card from '../components/Card';


export default function GamePage() {

  const [players, setPlayers] = useState([]);
  const [community, setCommunity] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(BACKEND_URL);

    socket.emit('connect to game', 0);

    socket.on('update game state', data => {
      setPlayers(data.players);
      setCommunity(data.community);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className='flex-container'>
          {players.map((player) => (
            <Player key = {player.name} data = {player}/>
          ))}
        </div>
        <div className='flex-container'>
          {community.map((card) => (
            <Card key = {card} data = {card}/>
          ))}
        </div>
      </header>
    </div>
  );
}

export async function gameLoader() {
  return null;
}