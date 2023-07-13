import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { useLoaderData } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import socketIOClient from 'socket.io-client';
import Player from '../components/Player';


export default function GamePage() {
  const socket = socketIOClient(BACKEND_URL);

  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Player/>
      </header>
    </div>
  );
}

export async function gameLoader() {
  return null;
}