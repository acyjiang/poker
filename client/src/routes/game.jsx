import React, { useState, useEffect, useContext } from "react";
import "../styles.css";
import Player from "../components/player";
import PlayingCard from "../components/card";
import { Button, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { BACKEND_URL } from "../config";

export default function GamePage() {
  const socket = useLoaderData();

  const [players, setPlayers] = useState([]);
  const [community, setCommunity] = useState([]);
  const displayCommunity = community.concat([undefined, undefined, undefined, undefined, undefined]).slice(0, 5);

  socket.on('state', (state) => {
    setCommunity(state.community);
    setPlayers(state.players);
  });

  const handleSit = (idx) => {
    socket.emit("sit", idx);
  }

  const handleStartGame = () => {
    socket.emit("start");
  }

  return (
    <>
      <Container display="flex">
        {players.map((player, idx) => (
          <Player key={`player${idx}`} data={player} onSit = {() => handleSit(idx)}/>
        ))}
      </Container>
      <Container display="flex">
        {displayCommunity.map((card, idx) => (
          <PlayingCard key={`community${idx}`} data={card} />
        ))}
      </Container>
      <Button onClick={handleStartGame}>Start Game</Button>
    </>
  );
}

export function gameLoader({ params }) {
  const socket = socketIOClient(BACKEND_URL);
  socket.emit('ingress', params.gameId);
  return socket;
}
